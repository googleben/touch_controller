#![feature(once_cell)]

extern crate touch_controller_api;

use std::convert::From;

use std::fmt::Display;
use std::{collections::HashMap, lazy::SyncLazy, path::{PathBuf}, sync::{RwLock}, ops::Deref, convert::TryFrom};

use abi_stable::{marker_type::ErasedObject, std_types::RArc};
use actix_files::{NamedFile};
use actix_web::{App, HttpRequest, HttpResponse, HttpServer, get, put, web, Error};
use actix_web_actors::ws;

use log::{warn, debug, info, trace, error};
use touch_controller_api::{TouchControllerPlugin_Ref, WebsocketActionObj, RJsonValue};
use serde::{Serialize, Deserialize};
use actix::{Actor, StreamHandler};

use futures_core::stream::Stream;
use futures_util::StreamExt;

use anyhow::{Result};
mod plugins;
use plugins::scan_for_plugins;

use crate::plugins::handle_websocket_message;

#[derive(Serialize, Deserialize)]
struct PluginManifest {
    pub name: String,
    pub author: String,
    pub version: String,
    pub dynamic_libs: Option<Vec<String>>
}

pub struct PluginLibrary {
    pub lib: TouchControllerPlugin_Ref,
    pub state: RArc<ErasedObject>,
    pub registered_websocket_actions: Box<[String]>
}

pub struct PluginInfo {
    //manifest values
    pub name: String,
    pub author: String,
    pub version: String,

    pub folder_path: PathBuf,
    pub folder_name: String,

    pub plugins: Box<[PluginLibrary]>
    
}

pub struct GlobalState {
    pub plugins: RwLock<Vec<PluginInfo>>,
    pub websocket_actions: RwLock<HashMap<String, WebsocketActionObj>>,
    pub static_file_dirs: RwLock<HashMap<String, PathBuf>>
}

//unsafe impl Send for GlobalState {}
//unsafe impl Sync for GlobalState {}

//static mut STATE: *const GlobalState = 0 as *const GlobalState;
pub static STATE: SyncLazy<GlobalState> = SyncLazy::new(|| {
    GlobalState {
        plugins: RwLock::new(Vec::new()),
        websocket_actions: RwLock::new(HashMap::new()),
        static_file_dirs: RwLock::new(HashMap::new())
    }
});

#[get("/plugin_list")]
async fn plugin_list() -> std::io::Result<String> {
    //extremely wasteful string manip here, should be fine
    //unless "/plugin_list" is requested a ton or there are a ton of plugins
    let mut ans = vec!();
    for p in STATE.plugins.read().unwrap().deref() {
        ans.push(format!("\"{}\"", p.folder_name));
    }
    Ok(format!("[{}]", ans.join(",")))
}

#[get("/view_list")]
async fn view_list() -> std::io::Result<String> {
    let mut ans = vec!();
    for f in std::fs::read_dir("./www/views")? {
        let f = f?;
        if !(f.file_type()?.is_file()) {continue;}
        let tmp = f.file_name();
        let tmp = tmp.to_string_lossy();
        if !tmp.ends_with(".json") {continue;}
        ans.push(format!("\"{}\"", tmp.trim_end_matches(".json")));
    }
    Ok(format!("[{}]", ans.join(",")))
}

#[put("/static/views/{view_name}.json")]
async fn put_view(mut payload: actix_web::web::Payload, req: HttpRequest, filename: actix_web::web::Path<(String,)>) -> std::io::Result<String> {
    if filename.0.find('/').is_some() || filename.0.find('\\').is_some() {
        return Err(std::io::Error::new(std::io::ErrorKind::Other, "view name may not contain \"/\" or \"\\\""));
    }
    let mut p = PathBuf::from("./www/views");
    if !p.exists() {
        std::fs::create_dir(&p)?;
    }
    if !p.is_dir() {
        return Err(std::io::Error::new(std::io::ErrorKind::Other, "./views was not a directory"));
    }
    p.push((&filename.0).to_owned() + ".json");
    if p.exists() && !p.is_file() {
        return Err(std::io::Error::new(std::io::ErrorKind::Other, "view exists, but is not a file"));
    }
    let mut body = web::BytesMut::new();
    while let Some(chunk) = payload.next().await {
        if let Ok(chunk) = chunk {
            body.extend_from_slice(&chunk);
        } else {
            return Err(std::io::Error::new(std::io::ErrorKind::Other, "error reading payload"));
        }
    }
    info!("Writing view to {}", p.to_string_lossy());
    std::fs::write(&p, body)?;
    Ok("Successfully wrote view".to_owned())
}

#[get("/plugins/{plugin_name}/{tail:.*}")]
async fn plugin_static_file(req: HttpRequest, info: actix_web::web::Path<(String, PathBuf)>) -> std::io::Result<HttpResponse> {
    let plugin_name = &info.0;
    let tail = &info.1;
    let folder_path = {
        let dirs = STATE.static_file_dirs.read().unwrap();
        if let Some(p) = dirs.get(plugin_name) {
            p.clone()
        } else {
            debug!("Folder not found for plugin: {}", plugin_name);
            return Ok(actix_web::HttpResponse::NotFound().finish());
        }
    }.canonicalize()?;
    let path = folder_path.join(tail).canonicalize()?;
    if !path.is_file() {
        debug!("File not found: {}", path.display());
        return Ok(actix_web::HttpResponse::NotFound().finish());
    }
    if !path.starts_with(&folder_path) {
        warn!("Request for forbidden path: {} -> \"{}\" does not start with \"{}\"", tail.display(), path.display(), folder_path.display());
        return Ok(actix_web::HttpResponse::Forbidden().finish());
    }
    let named_file = NamedFile::open(path)?;
    Ok(named_file.into_response(&req))
}

async fn index() -> HttpResponse {
    HttpResponse::Ok()
        .content_type("text/html")
        .body(r#"
        <html>
        <head>
            <title>Touch Controller</title>
            <script src="/static/js/react.development.js"></script>
            <script src="/static/js/react-dom.development.js"></script>
        </head>
        <body>
            <div id="app"></div>
            <script type="module" src="/static/js/index.js"></script>
        </body>
        </html>"#.to_owned())
}

#[derive(PartialEq, Eq)]
enum WSMultipartType {
    Text, Binary
}

struct AppWebsocket {
    current_multipart: Option<(WSMultipartType, Vec<u8>)>
}
impl Actor for AppWebsocket {
    type Context = ws::WebsocketContext<Self>;
}

impl StreamHandler<Result<ws::Message, ws::ProtocolError>> for AppWebsocket {
    fn handle(&mut self, item: Result<ws::Message, ws::ProtocolError>, ctx: &mut Self::Context) {
        trace!("received websocket: {:?}", item);
        if let Ok(message) = item {
            match message {
                ws::Message::Text(text) => {
                    handle_websocket_message(serde_json::from_str(&text));
                },
                ws::Message::Binary(bytes) => {
                    handle_websocket_message(serde_json::from_slice(&bytes));
                },
                ws::Message::Continuation(i) => {
                    match i {
                        actix_http::ws::Item::FirstText(b) => {
                            self.current_multipart = Some((WSMultipartType::Text, b.to_vec()));
                        },
                        actix_http::ws::Item::FirstBinary(b) => {
                            error!("Cannot handle binary messages currently")
                        },
                        actix_http::ws::Item::Continue(b) => {
                            if let Some((_, b2)) = self.current_multipart.as_mut() {
                                b2.extend(b);
                            } else {
                                error!("Received Item::Continue when no multipart message was in progress");
                            }
                        },
                        actix_http::ws::Item::Last(b) => {
                            if let Some((t, mut b2)) = self.current_multipart.take() {
                                b2.extend(b);
                                if t == WSMultipartType::Text {
                                    handle_websocket_message(serde_json::from_slice(&b2))
                                } else {
                                    error!("Cannot handle binary messages currently")
                                }
                            } else {
                                error!("Received Item::Last when no multipart message was in progress");
                            }
                        },
                    }
                },
                ws::Message::Ping(b) => {
                    ctx.pong(&b);
                },
                ws::Message::Close(r) => {
                    debug!("Websocket closed with reason {:?}", r);
                }
                other => {
                    warn!("Received unhandled websocket case: {:?}", other);
                }
            };
        }
        ctx.text("recv");
    }
}

async fn websocket_service(req: HttpRequest, stream: web::Payload) -> Result<HttpResponse, Error> {
    ws::start(AppWebsocket {current_multipart: None}, &req, stream)
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    log4rs::init_file("log4rs.yml", Default::default()).unwrap();
    scan_for_plugins().unwrap();
    let www = option_env!("TOUCH_CONTROLLER_WWW").unwrap_or("./www");
    HttpServer::new(move || 
        App::new()
            .route("/websocket", web::get().to(websocket_service))
            .route("/", web::get().to(index))
            .route("/editor", web::get().to(index))
            .service(plugin_list)
            .service(view_list)
            .service(plugin_static_file)
            .service(put_view)
            .service(actix_files::Files::new("/static", www))
    ).bind("127.0.0.1:8080")?
        .run()
        .await
}