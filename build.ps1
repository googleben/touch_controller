param(
    [switch]$web = $false
)

if (!$web) {
    Set-Location ./touch_controller
    cargo build
    Set-Location ../touch_controller_api
    cargo build
    Set-Location ../touch_controller_plugin_core
    cargo build
    Set-Location ..
}

Set-Location ./touch_controller_plugin_core_frontend
yarn build
Set-Location ../touch_controller_www
yarn build
Set-Location ..
if (!$web) {
    Copy-Item .\target\debug\touch_controller_plugin_core.dll .\plugins\core\
}