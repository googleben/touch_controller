import React from "react";
export declare type PluginScript = Record<string, React.ComponentType<any>>;
export declare type GlobalInfo = {
    getComponent: (pluginName: string, componentName: string) => Promise<React.ComponentType<any>>;
    getWebsocket: () => WebSocket;
};
