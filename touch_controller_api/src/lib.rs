use std::sync::Arc;

use abi_stable::{StableAbi, erased_types::TD_Opaque, library::RootModule, marker_type::ErasedObject, package_version_strings, sabi_trait, std_types::{RArc, RHashMap, ROption, RString, RVec, Tuple2}};

#[repr(C)]
#[derive(StableAbi)]
pub enum RJsonValue {
    Null,
    Bool(bool),
    Number(u32),
    String(RString),
    Array(RVec<RJsonValue>),
    Object(RHashMap<RString, RJsonValue>)
}

#[repr(C)]
#[derive(StableAbi)]
pub struct RJsonNumber {
    is_i64: bool,
    is_u64: bool,
    is_f64: bool,
    val: u64
}
impl RJsonNumber {
    pub fn is_i64(&self) -> bool {
        self.is_i64
    }
    pub fn is_u64(&self) -> bool {
        self.is_u64
    }
    pub fn is_f64(&self) -> bool {
        self.is_f64
    }
    pub fn as_i64(&self) -> Option<i64> {
        if self.is_i64 {Some(f64::from_bits(self.val) as i64)}
        else {None}
    }
    pub fn as_u64(&self) -> Option<u64> {
        if self.is_u64 {Some(f64::from_bits(self.val) as u64)}
        else {None}
    }
    pub fn as_f64(&self) -> Option<f64> {
        Some(f64::from_bits(self.val))
    }
}

#[sabi_trait]
pub trait WebsocketAction: Sync + Send {
    fn run_action(&mut self, message: RJsonValue) -> ROption<RString>;
}

pub type WebsocketActionObj = WebsocketAction_TO<'static, RArc<()>>;

/// Plugin lifecycle:
/// 1. Plugin is discovered by being a folder inside the `plugins` folder containing a `manifest.json`
/// 2. `manifest.json` is loaded
/// 3. Dynamically linked libraries listed in the manifest are loaded and `init` is run, in the order listed
/// 4. Any extra initialization methods (e.g. `get_websocket_actions`) are run on each library
/// 5. If the plugin needs to be unloaded, the `unload` function is called
#[repr(C)]
#[derive(StableAbi)]
#[sabi(kind(Prefix(prefix_ref="TouchControllerPlugin_Ref")))]
pub struct TouchControllerPlugin {
    /// Should return an object that holds any state needed by other functions in the plugin
    pub init: extern "C" fn() -> RArc<ErasedObject>,
    #[sabi(last_prefix_field)]
    pub get_websocket_actions: extern "C" fn() -> RVec<Tuple2<RString, WebsocketActionObj>>,
    pub unload: extern "C" fn(RArc<ErasedObject>)
}

impl RootModule for TouchControllerPlugin_Ref {
    abi_stable::declare_root_module_statics! {TouchControllerPlugin_Ref}
    const BASE_NAME: &'static str = "touch_controller_plugin";
    const NAME: &'static str = "";
    const VERSION_STRINGS: abi_stable::sabi_types::VersionStrings = package_version_strings!();
}

pub struct StatelessWebsocketAction {
    action: Arc<dyn Fn(RJsonValue) -> ROption<RString> + Sync + Send>
}
impl WebsocketAction for StatelessWebsocketAction {
    fn run_action(&mut self, message: RJsonValue) -> ROption<RString> {
        (self.action)(message)
    }
}
impl StatelessWebsocketAction {
    #[allow(clippy::new_ret_no_self)]
    pub fn new(action: Arc<dyn Fn(RJsonValue) -> ROption<RString> + Sync + Send>) -> WebsocketActionObj {
        WebsocketAction_TO::from_ptr(RArc::new(StatelessWebsocketAction {
            action
        }), TD_Opaque)
    }
}