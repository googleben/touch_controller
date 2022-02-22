import React from "react";

function get_websocket_url() {
    let loc = window.location;
    let new_uri = loc.protocol==="https:" ? "wss:" : "ws:";
    new_uri += "//" + loc.host + "/websocket";
    return new_uri;
}

const WEBSOCKET = new WebSocket(get_websocket_url());

export const globalInfo: GlobalInfo = {getComponent: getComponent, getWebsocket: () => WEBSOCKET};

const loadedPlugins: Record<string, PluginScript | null> = {};

let pluginCache: Promise<string[]> | null = null;

let viewCache: Promise<string[]> | null = null;

export function sendAction(action: object) {
    WEBSOCKET.send(JSON.stringify(action));
}

export async function getPluginList(): Promise<string[]> {
    if (pluginCache === null) {
        const prom = fetch("/plugin_list").then(res => res.json());
        pluginCache = prom;
        return await prom;
    }
    else return await pluginCache;
}

export async function getViewList(): Promise<string[]> {
    if (viewCache === null) {
        const prom = fetch("/view_list").then(res => res.json());
        viewCache = prom;
        return await prom;
    }
    else return await viewCache;
}

export async function getPlugin(pluginName: string): Promise<PluginScript | null> {
    if (typeof loadedPlugins[pluginName] === 'undefined') {
        let url = "/plugins/"+pluginName+"/index.js";
        let pluginProm = await eval("import(\""+url+"\")");
        let plugin: {default: PluginScript} = await pluginProm;
        if (plugin === undefined || plugin.default === undefined) loadedPlugins[pluginName] = null;
        else {
            loadedPlugins[pluginName] = plugin.default;
            if (typeof plugin.default.css !== "undefined") {
                let css = plugin.default.css;
                if (css.kind === "inline") {
                    let style = document.createElement("style");
                    style.innerHTML = css.data;
                    document.head.appendChild(style);
                } else {
                    let link = document.createElement("link");
                    link.setAttribute("rel", "stylesheet");
                    link.setAttribute("href", css.data);
                    document.head.appendChild(link);
                }
            }
        }
    }
    return loadedPlugins[pluginName];
}

export async function putView(viewName: string, viewData: ViewInfo): Promise<"ok" | string> {
    return fetch("/static/views/"+viewName, {method: "PUT", body: JSON.stringify(viewData, null, 2)})
        .then(async (res) => res.ok ? "ok" : JSON.stringify(await res.json()))
        .catch(r => r.toString())
}

export async function getView(viewName: string): Promise<ViewInfo | string> {
    return fetch("/static/views/"+viewName+".json")
                .then(res => {
                    if (!res.ok) throw new Error(`${res.status}, ${res.statusText}`);
                    return res.json();
                })
                .then(data => {
                    if (typeof data !== "object") throw new Error("View data not an object");
                    let err: string[] = [];
                    if (typeof data.pluginName !== "string") err.push("View data must have member \"pluginName\" of type string");
                    if (typeof data.componentName !== "string") err.push("View data must have member \"componentName\" of type string");
                    if (typeof data.componentProps !== "object") err.push("View data must have member \"componentProps\" of type object");
                    if (err.length != 0) throw new Error(err.join("; "));
                    return data;
                })
                .catch(r => r);
}

export async function getComponent(pluginName: string, componentName: string): Promise<React.ComponentType | "No such plugin" | "No such component"> {
    let plugin = await getPlugin(pluginName);
    if (plugin === null) return "No such plugin";
    let tmp: React.ComponentType<any> | undefined = plugin.components[componentName];
    return tmp ?? "No such component";
}

export type PluginScript = {
    components: Record<string, React.ComponentType<any>>,
    componentEditors: Record<string, React.ComponentType<any>>,
    css?: {kind: "inline" | "link", data: string}
};

export type GlobalInfo = {
    getComponent: (pluginName: string, componentName: string) => Promise<React.ComponentType<any> | "No such component" | "No such plugin">;
    getWebsocket: () => WebSocket;
};

export class Loading extends React.Component<{}> {
    render() {
        return <p>Loading...</p>
    }
}

export class ErrorBoundary extends React.Component<{}, {hasError: boolean}> {
    constructor(props: {}) {
        super(props);
        this.state = {hasError: false};
    }
    static getDerivedStateFromError() {
        return {hasError: true};
    }
    componentDidCatch(error: any, errorInfo: any) {
        console.error("Error boundary caught error: " + error+" info: "+errorInfo);
    }
    render() {
        if (this.state.hasError) return <>Error caught!</>;
        return this.props.children;
    }
}

export type ViewInfo = {
    pluginName: string;
    componentName: string;
    componentProps: any;
}

class ViewInner extends React.Component<{viewData: ViewInfo, overrideProps: any}, {inner: null | React.ComponentType | "No such component" | "No such plugin"}> {
    constructor(props: {viewData: ViewInfo, overrideProps: any}) {
        super(props);
        this.state = {inner: null};
        this.getComponent(props.viewData.pluginName, props.viewData.componentName)
    }
    getComponent(pluginName: string, componentName: string) {
        globalInfo.getComponent(pluginName, componentName)
            .then(c => this.setState({inner: c}));
    }
    componentDidUpdate(prevProps: {viewData: ViewInfo}) {
        if (prevProps.viewData.pluginName !== this.props.viewData.pluginName || prevProps.viewData.componentName !== this.props.viewData.componentName) {
            this.setState({inner: null});
            getComponent(this.props.viewData.pluginName, this.props.viewData.componentName);
        }
    }
    render() {
        if (this.state.inner === null) {
            return <Loading />
        } else if (this.state.inner === "No such component" || this.state.inner === "No such plugin") {
            return <p>Could not load component "{this.props.viewData.componentName}" from plugin "{this.props.viewData.pluginName}": {this.state.inner}</p>
        }
        return <this.state.inner {...this.props.viewData.componentProps} />;
    }
}

export type ViewProps = {viewName: string, overrideProps?: any} | {viewData: ViewInfo};

export class View extends React.Component<ViewProps, {viewData: null | ViewInfo, error: string | null}> {
    constructor(props: ViewProps) {
        super(props);
        if ("viewData" in this.props) {
            this.state = {viewData: this.props.viewData, error: null};
        } else {
            this.state = {viewData: null, error: null};
            getView(this.props.viewName)
                .then(r => {
                    if (typeof r === "string") this.setState({error: r});
                    else this.setState({viewData: r});
                });
        }
    }
    setViewData(viewData: ViewInfo) {
        this.setState({viewData: viewData});
    }
    render() {
        if (this.state.error !== null) return <p>Error loading view: "{this.state.error}"</p>;
        if (this.state.viewData === null) return <Loading />;
        return <ViewInner viewData={this.state.viewData} overrideProps={"overrideProps" in this.props ? this.props.overrideProps : undefined} />;
    }
}