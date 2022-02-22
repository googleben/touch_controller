use std::{path::{Path, PathBuf}};

use abi_stable::library::RootModule;
use log::{info, warn, error, debug};
use touch_controller_api::{TouchControllerPlugin_Ref, RJsonValue};

use anyhow::{Context, Result};

use crate::{PluginInfo, PluginLibrary, PluginManifest, STATE};

fn init_plugin_lib(lib: TouchControllerPlugin_Ref, prefix: &str) -> PluginLibrary {
    debug!("init_plugin_lib running for prefix \"{}\"", prefix);
    let state = lib.init()();
    let ws_actions = lib.get_websocket_actions()();
    let mut registered_websocket_actions = Vec::with_capacity(ws_actions.len());
    {
        let mut actions = STATE.websocket_actions.write().unwrap();
        for a in ws_actions {
            let name = a.0;
            let func = a.1;
            let final_name = format!("{}.{}", prefix, name);
            actions.insert(final_name.clone(), func);
            registered_websocket_actions.push(final_name);
        }
    }
    PluginLibrary {
        lib, state, registered_websocket_actions: registered_websocket_actions.into_boxed_slice()
    }
}

#[allow(dead_code)]
pub fn unload_plugin(name: &str) {
    debug!("Unloading plugin \"{}\"", name);
    let plugin = {
        let mut all = STATE.plugins.write().unwrap();
        let mut ind = 0; 
        for (i, p) in all.iter().enumerate() {
            if p.name == name {
                ind = i;
            }
            if i == all.len() {
                return;
            }
        }
        all.remove(ind)
    };
    let mut ws_actions = STATE.websocket_actions.write().unwrap();
    for p in plugin.plugins.iter() {
        if let Some(unload) = p.lib.unload() {
            unload(p.state.clone());
        }
        for wsa in p.registered_websocket_actions.iter() {
            ws_actions.remove(wsa);
        }
    }
    debug!("Done unloading plugin \"{}\"", name);
}

pub fn load_plugin(folder: &Path) -> Result<()> {
    let manifest_path = folder.to_path_buf().join("manifest.json");
    let manifest = std::fs::read(&manifest_path).with_context(|| format!("Failed to read manifest.json from \"{}\"", manifest_path.to_string_lossy()))?;
    let manifest: PluginManifest = serde_json::from_slice(&manifest)?;
    let folder_name = folder.file_name().with_context(|| {format!("Could not get the file name for {}", folder.to_string_lossy())})?.to_string_lossy().into_owned();
    let plugins = if let Some(files) = manifest.dynamic_libs {
        let mut ans = Vec::with_capacity(files.len());
        for f in files {
            let lib_path = folder.to_path_buf().join(&f);
            let lib = TouchControllerPlugin_Ref::load_from_file(&lib_path);
            match lib {
                Ok(lib) => {
                    ans.push(init_plugin_lib(lib, &folder_name));
                },
                Err(e) => {
                    error!("Failed to read dynamic library {} from {}: {}", f, lib_path.to_string_lossy(), e);
                }
            }
        }
        ans
    } else {
        vec!()
    };
    let num_plugins = plugins.len();
    let ans = PluginInfo {
        name: manifest.name.clone(),
        author: manifest.author,
        version: manifest.version.clone(),
        folder_path: folder.to_owned(),
        folder_name,
        plugins: plugins.into_boxed_slice()
    };
    STATE.plugins.write().unwrap().push(ans);
    let mut www_dir = folder.to_owned();
    www_dir.push("www");
    if www_dir.is_dir() {
        STATE.static_file_dirs.write().unwrap().insert(manifest.name.clone(), www_dir);
    }
    info!(r#"Loaded plugin "{}" version "{}" with {} native libraries"#, manifest.name, manifest.version, num_plugins);
    Ok(())
}

pub fn scan_for_plugins() -> Result<()> {
    let plugins_folder = PathBuf::from("./plugins");
    info!("Scanning for plugins in \"{}\"...", plugins_folder.canonicalize().unwrap().display());
    if !plugins_folder.is_dir() {
        warn!("Plugins \"directory\" reported as not a directory! Does it exist?");
        return Ok(());
    }
    let mut num_loaded = 0;
    for d in plugins_folder.read_dir()? {
        let d = d?;
        if d.path().is_dir() {
            let ans = load_plugin(&d.path());
            match ans {
                Ok(_) => {num_loaded+=1},
                Err(e) => {
                    error!("Error loading plugin from {}: {}", d.path().to_string_lossy(), e);
                }
            }
        }
    }
    info!("Loaded {} plugins", num_loaded);
    Ok(())
}

pub fn handle_websocket_message(message: serde_json::Result<serde_json::Value>) {
    if let Ok(v) = message {
        let v = RJsonValue::from(v);
        let action_name = match &v {
            RJsonValue::Object(o) => {
                if let Some(action_name) = o.get("action") {
                    if let RJsonValue::String(action_name) = action_name {
                        action_name.to_string()
                    } else {
                        error!("Action name not string in json from websocket");
                        return;
                    }
                } else {
                    error!("No action name in json from websocket");
                    return;
                }
            },
            _ => {
                error!("Json from websocket not an Object");
                return;
            }
        };
        let mut actions = STATE.websocket_actions.write().unwrap();
        if let Some(action) = actions.get_mut(&action_name) {
            action.run_action(v);
        } else {
            error!("No such websocket action \"{}\"", action_name);
        }
    } else {
        error!("Error parsing json from websocket: {}", message.unwrap_err());
    }
}