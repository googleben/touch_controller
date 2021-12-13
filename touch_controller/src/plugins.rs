use std::{collections::HashMap, fs::{DirEntry, read_dir}, path::{Path, PathBuf}, sync::RwLock};

use abi_stable::library::RootModule;
use touch_controller_api::{TouchControllerPlugin_Ref, WebsocketActionObj};

use anyhow::{Context, Result};

use crate::{PluginInfo, PluginLibrary, PluginManifest, STATE};

fn init_plugin_lib(lib: TouchControllerPlugin_Ref, prefix: &str) -> PluginLibrary {
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

pub fn unload_plugin(name: &str) {
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
                    println!("Failed to read dynamic library {} from {}: {}", f, lib_path.to_string_lossy(), e);
                }
            }
        }
        ans
    } else {
        vec!()
    };
    let ans = PluginInfo {
        name: manifest.name,
        author: manifest.author,
        version: manifest.version,
        folder_path: folder.to_owned(),
        folder_name,
        plugins: plugins.into_boxed_slice()
    };
    STATE.plugins.write().unwrap().push(ans);
    Ok(())
}

pub fn scan_for_plugins() -> Result<()> {
    let plugins_folder = PathBuf::from("./plugins");
    if !plugins_folder.is_dir() {return Ok(());}
    for d in plugins_folder.read_dir()? {
        let d = d?;
        if d.path().is_dir() {
            let ans = load_plugin(&d.path());
            match ans {
                Ok(i) => {},
                Err(e) => {
                    println!("Error loading plugin from {}: {}", d.path().to_string_lossy(), e);
                }
            }
        }
    }
    Ok(())
}