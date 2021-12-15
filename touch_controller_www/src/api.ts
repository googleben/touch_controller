import React from "react";

export type PluginScript = Record<string, React.ComponentType<any>>;

export type GlobalInfo = {
    getComponent: (pluginName: string, componentName: string) => Promise<React.ComponentType<any>>;
    getWebsocket: () => WebSocket;
};