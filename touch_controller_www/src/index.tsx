import { request } from "https";
import React from "react";
import ReactDOM from "react-dom";

import {PluginScript, GlobalInfo} from "./api";

const loadedPlugins: Record<string, PluginScript> = {};

type ComponentInfo = {
    pluginName: string;
    componentName: string;
    componentProps: any;
}

async function getComponent(pluginName: string, componentName: string): Promise<React.ComponentType> {
    if (typeof loadedPlugins[pluginName] === 'undefined') {
        // let pluginProm: Promise<PluginScript> = fetch("/plugins/"+pluginName+"/index.js")
        //     .then(res => res.text())
        //     .then(text => {
        //         let url = "data:text/javascript;charset=utf-8,"+encodeURIComponent(text);
        //         return import(url);
        //     });
        let loc = window.location;
        let url = "/plugins/"+pluginName+"/index.js";
        let pluginProm = await eval("import(\""+url+"\")");
        let plugin = await pluginProm;
        loadedPlugins[pluginName] = plugin.default;
    }
    return loadedPlugins[pluginName][componentName];
}

function get_websocket_url() {
    let loc = window.location;
    let new_uri = loc.protocol==="https:" ? "wss:" : "ws:";
    new_uri += "//" + loc.host + "/websocket";
    return new_uri;
}

const WEBSOCKET = new WebSocket(get_websocket_url());

const GLOBAL_INFO: GlobalInfo = {getComponent: getComponent, getWebsocket: () => WEBSOCKET};

class View extends React.Component<{globalInfo: GlobalInfo, viewName: string}, {componentInfo?: ComponentInfo, inner?: React.ComponentType}> {
    constructor(props: {globalInfo: GlobalInfo, viewName: string}) {
        super(props);
        this.state = {};
        fetch("/static/views/"+this.props.viewName+".json")
            .then(res => res.json())
            .then(data => this.setComponentInfo(data));
    }
    setComponentInfo(componentInfo: ComponentInfo) {
        this.setState({componentInfo: componentInfo});
        getComponent(componentInfo.pluginName, componentInfo.componentName)
            .then(c => this.setState({inner: c}));
    }
    render() {
        return this.state.inner ? <this.state.inner globalInfo={this.props.globalInfo} {...this.state.componentInfo?.componentProps} /> : <p>Loading...</p>;
    }
}

class App extends React.Component<{}, {width: number, height: number}> {
    constructor(props: {}) {
        super(props);
        this.state = {width: 1920, height: 1080};
    }
    render() {
        return (
            <div style={{width: this.state.width + "px", height: this.state.height + "px"}}>
                <View viewName="default" globalInfo={GLOBAL_INFO} />
            </div>
        );
    }
}
ReactDOM.render(<App />, document.getElementById("app"));