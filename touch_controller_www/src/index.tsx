import { request } from "https";
import React from "react";
import ReactDOM from "react-dom";

import {GlobalInfo, View, getComponent} from "./api";
import { Editor } from "./editorApi";


class App extends React.Component<{}, {width: number, height: number}> {
    constructor(props: {}) {
        super(props);
        this.state = {width: 1920, height: 1080};
    }
    render() {
        if (window.location.href.includes("/editor")) {
            return <Editor />
        }
        return (
            <div style={{width: this.state.width + "px", height: this.state.height + "px"}}>
                <View viewName="default"/>
            </div>
        );
    }
}
ReactDOM.render(<App />, document.getElementById("app"));