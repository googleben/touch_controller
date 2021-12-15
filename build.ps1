cd ./touch_controller
cargo build
cd ../touch_controller_api
cargo build
cd ../touch_controller_plugin_core
cargo build
cd ../touch_controller_plugin_core_frontend
yarn build
cd ../touch_controller_www
yarn build
cd ..
copy .\touch_controller_plugin_core_frontend\dist\index.js .\plugins\core\www\
copy .\target\debug\touch_controller_plugin_core.dll .\plugins\core\
copy .\touch_controller_www\dist\index.js .\www\js