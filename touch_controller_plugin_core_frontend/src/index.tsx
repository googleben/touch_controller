import {PluginScript, GlobalInfo} from "../../touch_controller_www/src/api";

import React from "react";

class WebsocketButton extends React.Component<{globalInfo: GlobalInfo, text: string, onClickWs: string}, {}> {
    render(): React.ReactNode {
        let onc = () => {
            this.props.globalInfo.getWebsocket().send(this.props.onClickWs);
        };
        return (<a href="#" style={{padding: "2px", border: "1px solid black", borderRadius: "5px", cursor: "pointer"}}>
            {this.props.text}
        </a>);
    }
}

let ps: PluginScript = {"WebsocketButton": WebsocketButton};

export default ps;