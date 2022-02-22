use std::sync::Arc;

use abi_stable::{StableAbi, erased_types::TD_Opaque, library::RootModule, marker_type::ErasedObject, package_version_strings, sabi_trait, std_types::{RArc, RHashMap, ROption, RString, RVec, Tuple2, RBox}};

#[repr(C)]
#[derive(StableAbi, Debug)]
pub enum RJsonValue {
    Null,
    Bool(bool),
    Number(RJsonNumber),
    String(RString),
    Array(RVec<RJsonValue>),
    Object(RHashMap<RString, RJsonValue>)
}

impl From<serde_json::Value> for RJsonValue {
    fn from(v: serde_json::Value) -> Self {
        match v {
            serde_json::Value::Null => RJsonValue::Null,
            serde_json::Value::Bool(b) => RJsonValue::Bool(b),
            serde_json::Value::Number(n) => {
                RJsonValue::Number(
                    if let Some(n) = n.as_f64() {
                        RJsonNumber {
                            is_f64: true,
                            is_i64: false,
                            is_u64: false,
                            val: n.to_bits()
                        }
                    } else if let Some(n) = n.as_u64() {
                        RJsonNumber {
                            is_f64: false,
                            is_i64: n <= (i64::MAX as u64),
                            is_u64: true,
                            val: n
                        }
                    } else {
                        let n = unsafe {n.as_i64().unwrap_unchecked()};
                        RJsonNumber {
                            is_f64: false,
                            is_i64: true,
                            is_u64: false,
                            val: unsafe {std::mem::transmute(n)}
                        }
                    }
                )
            },
            serde_json::Value::String(s) => RJsonValue::String(RString::from(s)),
            serde_json::Value::Array(a) => {
                let mut ans = RVec::with_capacity(a.len());
                for v in a {
                    ans.push(RJsonValue::from(v));
                }
                RJsonValue::Array(ans)
            },
            serde_json::Value::Object(o) => {
                let mut ans = RHashMap::with_capacity(o.len());
                for (k, v) in o {
                    ans.insert(RString::from(k), RJsonValue::from(v));
                }
                RJsonValue::Object(ans)
            }
        }
    }
}

#[repr(C)]
#[derive(StableAbi, Debug)]
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
        if self.is_i64 {Some(unsafe {std::mem::transmute(self.val)})}
        else {None}
    }
    pub fn as_u64(&self) -> Option<u64> {
        if self.is_u64 {Some(self.val)}
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

pub type WebsocketActionObj = WebsocketAction_TO<'static, RBox<()>>;

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
        WebsocketAction_TO::from_ptr(RBox::new(StatelessWebsocketAction {
            action
        }), TD_Opaque)
    }
}