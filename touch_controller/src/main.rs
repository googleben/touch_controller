#![feature(once_cell)]

extern crate touch_controller_api;

use core::future;
use std::{collections::HashMap, fs::{DirEntry, read_dir}, lazy::SyncLazy, path::{Path, PathBuf}, sync::{Arc, Mutex, RwLock}};

use abi_stable::{library::RootModule, marker_type::ErasedObject, std_types::RArc};
use actix_files::{FilesService, NamedFile};
use actix_web::{App, HttpRequest, HttpResponse, HttpServer, dev::{ServiceRequest, ServiceResponse}, get, web, Error};
use actix_service::Service;
use actix_web_actors::ws;
use futures_core::future::LocalBoxFuture;
use touch_controller_api::{TouchControllerPlugin_Ref, WebsocketActionObj};
use serde::{Serialize, Deserialize};
use actix::{Actor, StreamHandler};

use anyhow::{Context, Result};
mod plugins;
use plugins::scan_for_plugins;

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

#[get("/plugins/{plugin_name}/{tail:.*}")]
async fn plugin_static_file(req: HttpRequest, info: actix_web::web::Path<(String, PathBuf)>) -> std::io::Result<HttpResponse> {
    let plugin_name = &info.0;
    let tail = &info.1;
    let folder_path = {
        let dirs = STATE.static_file_dirs.read().unwrap();
        if let Some(p) = dirs.get(plugin_name) {
            p.clone()
        } else {
            return Ok(actix_web::HttpResponse::NotFound().finish());
        }
    }.canonicalize()?;
    let path = folder_path.join(tail).canonicalize()?;
    if !path.is_file() {
        return Ok(actix_web::HttpResponse::NotFound().finish());
    }
    if !path.starts_with(&folder_path) {
        println!("{:?} {:?}", path, &folder_path);
        return Ok(actix_web::HttpResponse::Forbidden().finish());
    }
    let named_file = NamedFile::open(path)?;
    Ok(named_file.into_response(&req))
}
#[get("/")]
async fn index() -> HttpResponse {
    HttpResponse::Ok()
        .content_type("text/html")
        .body("<html><head><title>Touch Controller></title></head><body><div id=\"app\"></div><script src=\"/static/js/index.js\"></script></body></html>".to_owned())
}

struct AppWebsocket;
impl Actor for AppWebsocket {
    type Context = ws::WebsocketContext<Self>;
}

impl StreamHandler<Result<ws::Message, ws::ProtocolError>> for AppWebsocket {
    fn handle(&mut self, item: Result<ws::Message, ws::ProtocolError>, ctx: &mut Self::Context) {
        println!("websocket {:?}", item);
    }
}

async fn websocket_service(req: HttpRequest, stream: web::Payload) -> Result<HttpResponse, Error> {
    ws::start(AppWebsocket {}, &req, stream)
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    scan_for_plugins().unwrap();
    let www = option_env!("TOUCH_CONTROLLER_WWW").unwrap_or("./www");
    HttpServer::new(move || 
        App::new()
            .route("/websocket", web::get().to(websocket_service))
            .service(index)
            .service(plugin_static_file)
            .service(actix_files::Files::new("/static", www))
    ).bind("127.0.0.1:8080")?
        .run()
        .await
}
