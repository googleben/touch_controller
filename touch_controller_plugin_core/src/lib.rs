use std::sync::Arc;

use abi_stable::{export_root_module, marker_type::ErasedObject, prefix_type::PrefixTypeTrait, std_types::{RArc, ROption, RString, RVec, Tuple2}};
use touch_controller_api::{StatelessWebsocketAction, TouchControllerPlugin, TouchControllerPlugin_Ref, WebsocketActionObj};

extern crate touch_controller_api;



pub extern "C" fn get_websocket_actions() -> RVec<Tuple2<RString, WebsocketActionObj>> {
    let mut ans = RVec::new();
    ans.push(Tuple2(RString::from("println"), StatelessWebsocketAction::new(Arc::new(|x| {println!("{:?}", x); ROption::RNone}))));
    ans
}

pub extern "C" fn init() -> RArc<ErasedObject> {unsafe {RArc::new(std::mem::transmute(()))}}

pub extern "C" fn unload(_: RArc<ErasedObject>) {}

#[export_root_module]
pub fn get_library() -> TouchControllerPlugin_Ref {
    TouchControllerPlugin {
        init, get_websocket_actions, unload
    }.leak_into_prefix()
}