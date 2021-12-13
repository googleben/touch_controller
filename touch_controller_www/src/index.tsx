import { request } from "https";
import React from "react";

type PluginScript = Record<string, React.ComponentType>;

const loadedPlugins: Record<string, PluginScript> = {};

type ComponentInfo = {
    pluginName: string;
    componentName: string;
    componentProps: any;
}

async function getComponent(pluginName: string, componentName: string): Promise<React.ComponentType> {
    if (typeof loadedPlugins[pluginName] === 'undefined') {
        let pluginProm: Promise<PluginScript> = import("/plugins/"+pluginName+"/index.ts");
        let plugin = await pluginProm;
        loadedPlugins[pluginName] = plugin;
    }
    return loadedPlugins[pluginName][componentName];
}

type GlobalInfo = {
    getComponent: (pluginName: string, componentName: string) => Promise<React.ComponentType>;
};

const GLOBAL_INFO: GlobalInfo = {getComponent: getComponent};

class View extends React.Component<{globalInfo: GlobalInfo, viewName: string}, {componentInfo?: ComponentInfo, inner?: React.ComponentType}> {
    constructor(props: {globalInfo: GlobalInfo, viewName: string}) {
        super(props);
        this.state = {};
        fetch("/views/"+this.props.viewName)
            .then(res => res.json())
            .then(data => this.setComponentInfo(data));
    }
    setComponentInfo(componentInfo: ComponentInfo) {
        this.setState({componentInfo: componentInfo});
        getComponent(componentInfo.pluginName, componentInfo.componentName)
            .then(c => this.setState({inner: c}));
    }
    render() {
        return this.state.inner ? <this.state.inner {...this.state.componentInfo?.componentProps} /> : <p>Loading...</p>;
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
                <View viewName="home" globalInfo={GLOBAL_INFO} />
            </div>
        );
    }
}