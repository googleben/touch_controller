try {
    $core_frontend = Start-Job { 
        Set-Location ./touch_controller_plugin_core_frontend
        yarn run watch
    }
    $www = Start-Job { 
        Set-Location ./touch_controller_www
        yarn run watch
    }
    Write-Host "Press any key to stop..."
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
} finally {
    Write-Host "Stopping..."
    Stop-Job $core_frontend
    Remove-Job $core_frontend
    Stop-Job $www
    Remove-Job $www
}