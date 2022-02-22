import {PluginScript, GlobalInfo, View, ViewProps, sendAction} from "../../touch_controller_www/src/api";
import {Property} from "csstype"
import {globalInfo} from "../../touch_controller_www/src/api";

import React from "react";
import { ComponentEditor, ComponentEditorBaseProps, EditorCheckbox, EditorDropdown, EditorDropdownOptional, EditorList, EditorText, EditorTextOptional, ViewEditor, WrappedComponentEditor } from "../../touch_controller_www/src/editorApi";

interface AutoGridProps {
    gridTemplateColumns: Property.GridTemplateColumns,
    columnGap?: Property.GridColumnGap,
    rowGap?: Property.GridRowGap,
    items: ViewProps[]
}

class AutoGrid extends React.Component<AutoGridProps> {
    render() {
        let ans: any = [];
        let key = 0;
        console.log(this.props);
        for (let i of this.props.items) {
            ans.push(<div key={key}>{<View {...i}/>}</div>);
            key++;
        }
        let columnGap = this.props.columnGap ?? "5px";
        let rowGap = this.props.rowGap ?? "5px";
        return <div style={{display: "grid", gridTemplateColumns: this.props.gridTemplateColumns, columnGap, rowGap}}>
            {ans}
        </div>
    }
}

class AutoGridEditor extends ComponentEditor<ComponentEditorBaseProps, {gridTemplateColumns: string[], columnGap?: string, rowGap?: string, items: WrappedComponentEditor[]}> {
    constructor(props: ComponentEditorBaseProps) {
        super(props);
        let j = props.initialJSON as AutoGridProps;
        this.state = {
            gridTemplateColumns: (j.gridTemplateColumns as string).split(" "),
            columnGap: j.columnGap as (string | undefined),
            rowGap: j.rowGap as (string | undefined),
            items: j.items.map(info => WrappedComponentEditor.safeConstructor(ViewEditor, {initialJSON: info}))
        };
    }
    toJSON() {
        return {
            gridTemplateColumns: this.state.gridTemplateColumns.join(" "),
            columnGap: this.state.columnGap,
            rowGap: this.state.rowGap,
            items: this.state.items.map(e => e.toJSON())
        }
    }
    static getDefaultComponentProps() {
        return {
            gridTemplateColumns: "70px 70px 70x",
            columnGap: "10px",
            rowGap: "10px",
            items: []
        }
    }
    setColumn(colIndex: number, val: string) {
        let cols = Array.of(...this.state.gridTemplateColumns);
        cols[colIndex] = val;
        this.setState({gridTemplateColumns: cols});
    }
    addColumn() {
        let cols = Array.of(...this.state.gridTemplateColumns);
        cols.push(cols.length > 0 ? cols[cols.length - 1] : "70px");
        this.setState({gridTemplateColumns: cols});
    }
    removeColumn(index: number) {
        let cols = Array.of(...this.state.gridTemplateColumns);
        cols.splice(index, 1);
        this.setState({gridTemplateColumns: cols});
    }
    addItem() {
        let items = Array.of(...this.state.items);
        items.push(WrappedComponentEditor.safeConstructor(ViewEditor, {initialJSON: {
            viewData: {
                pluginName: "core",
                componentName: "WebsocketButton",
                componentProps: WebsocketButtonEditor.getDefaultComponentProps()
            }}}));
        this.setState({items});
    }
    removeItem(index: number) {
        let items = Array.of(...this.state.items);
        items.splice(index, 1);
        this.setState({items});
    }
    render() {
        let d = this.state;
        let cols: any = [];
        for (let i = 0; i < d.gridTemplateColumns.length; i++) {
            let c = d.gridTemplateColumns[i];
            cols.push(<EditorText label="Column Width: " text={c} onTextChanged={(t) => {this.setColumn(i, t)}}/>);
        }
        let items = d.items.map(i => i.render());
        return <div>
            Columns:
            <EditorList items={cols} onClickAdd={this.addColumn.bind(this)} onClickRemove={this.removeColumn.bind(this)}/>
            <EditorText text={this.state.columnGap ?? ""} onTextChanged={(t) => this.setState({columnGap: t})} label="Column Gap: "/>
            <EditorText text={this.state.rowGap ?? ""} onTextChanged={(t) => this.setState({rowGap: t})} label="Row Gap: "/>
            Items:
            <EditorList items={items} onClickAdd={this.addItem.bind(this)} onClickRemove={this.removeItem.bind(this)} />
        </div>
    }
}

interface CustomGridProps {
    width?: number,
    height?: number,

}

class CustomGrid extends React.Component<CustomGridProps> {

}

interface IFrameProps {
    url: string;
    width?: string;
    height?: string;
}
class IFrame extends React.Component<IFrameProps> {
    render() {
        return <iframe src={this.props.url} height={this.props.height} width={this.props.width}></iframe>;
    }
}
class IFrameEditor extends ComponentEditor<ComponentEditorBaseProps, IFrameProps> {
    constructor(props: ComponentEditorBaseProps) {
        super(props);
        this.state = props.initialJSON;
    }
    static getDefaultComponentProps(): IFrameProps {
        return {
            url: "https://example.com",
            width: "300",
            height: "300"
        };
    }
    toJSON() {
        return this.state;
    }
    render() {
        return <>
            <EditorText label="url: " text={this.state.url} onTextChanged={nt => this.setState({url: nt})}/>
            <EditorText label="width: " text={this.state.width ?? ""} onTextChanged={nt => this.setState({width: nt})}/>
            <EditorText label="height: " text={this.state.height ?? ""} onTextChanged={nt => this.setState({height: nt})}/>
        </>
    }
}

interface WebsocketButtonTextInfo {
    text: string,
    color: Property.Color,
    fontSize: Property.FontSize,
    font: Property.FontFamily,
    horizontalAlignment: "left" | "center" | "justify" | "right",
    verticalAlignment: "top" | "center" | "bottom",
}
interface WebsocketButtonImageInfo {
    source: string,
    ///if true, the image will be set to fill its container by stretching/shrinking, and the only properties that matter
    ///are imageWidth and imageHeight
    simpleFill?: boolean,
    //if imageWidth and/or imageHeight are set, fit is ignored
    imageWidth?: Property.Width,
    imageHeight?: Property.Height,
    fit?: Property.ObjectFit,
    position?: Property.ObjectPosition,
}

interface WebsocketButtonProps {
    displayKind: "empty" | "text" | "image" | "view",
    width: Property.Width,
    height: Property.Height,
    backgroundColor?: Property.BackgroundColor,
    text?: WebsocketButtonTextInfo,
    image?: WebsocketButtonImageInfo,
    viewProps?: ViewProps,
    customStyle?: React.CSSProperties,
    useDefaultBorder?: boolean,
    onClickWs: string,
    onClickWsData: string
}

interface WebsocketButtonState {
    onClickWsData: object
}

class WebsocketButton extends React.Component<WebsocketButtonProps, WebsocketButtonState> {
    constructor(props: WebsocketButtonProps) {
        super(props);
        this.state = {
            onClickWsData: JSON.parse(props.onClickWsData)
        }
    }
    render(): React.ReactNode {
        let onc = () => {
            sendAction({action: this.props.onClickWs, ...this.state.onClickWsData});
        };
        let elem = <></>;
        if (this.props.displayKind === "text") {
            let text = this.props.text as WebsocketButtonTextInfo;
            let va = text.verticalAlignment;
            let flexAlign = va === "top" ? "flex-start" : va === "bottom" ? "flex-end" : va;
            elem = <div style={{display: "flex", justifyContent: flexAlign, flexDirection: "column", width: "100%", height: "100%"}}>
                <div>
                    <p style={{color: text.color, fontSize: text.fontSize, font: text.font, textAlign: text.horizontalAlignment, padding: "5px"}}>
                        {text.text}
                    </p>
                </div>
            </div>
        } else if (this.props.displayKind === "image") {
            let image = this.props.image as WebsocketButtonImageInfo;
            if (image.simpleFill) {
                elem = <div style={{position: "absolute", width: "100%", height: "100%"}}>
                    <div style={{display: "flex", justifyContent: "center", alignContent: "center", width: "100%", height: "100%"}}>
                        <img src={image.source} style={{width: image.imageWidth ?? "100%", height: image.imageHeight ?? "100%"}} />
                    </div>
                </div>
            } else {
                let style: any = {};
                let hasW = typeof image.imageWidth !== "undefined";
                let hasH = typeof image.imageHeight !== "undefined";
                if (hasW || hasH) {
                    if (hasW) style.width = image.imageWidth;
                    if (hasH) style.height = image.imageHeight;
                } else {
                    if (typeof image.fit !== "undefined") style.objectFit = image.fit;
                }
                if (typeof image.position !== "undefined") style.objectPosition = image.position;
                elem = <div style={{position: "absolute", width: "100%", height: "100%"}}>
                    <img src={image.source} style={style} />
                </div>
            }
        } else if (this.props.displayKind === "view") {
            elem = <View {...this.props.viewProps as any} />
        } else {
            if (this.props.displayKind !== "empty") console.error(`Unknown display kind ${this.props.displayKind}, defaulting to empty`);
        }
        let style: any = {};
        if (typeof this.props.customStyle !== "undefined") {
            style = {...this.props.customStyle};
        }
        if (this.props.useDefaultBorder) {
            style.borderRadius = "5px";
        }
        style.width = this.props.width;
        style.height = this.props.height;
        return <div onClick={onc} className="websocketButton" style={style}>
            {elem}
        </div>;
    }
}

class WebsocketButtonEditor extends ComponentEditor<ComponentEditorBaseProps, WebsocketButtonProps> {
    componentEditor: WrappedComponentEditor | null;
    constructor(props: ComponentEditorBaseProps) {
        super(props);
        this.componentEditor = null;
        this.state = props.initialJSON;
        if (this.state.displayKind === "view") {
            this.componentEditor = WrappedComponentEditor.safeConstructor(ViewEditor, {initialJSON: this.state.viewProps as ViewProps});
        }
    }
    static getDefaultComponentProps(): WebsocketButtonProps {
        return {
            displayKind: "text",
            width: "70px",
            height: "70px",
            text: {
                text: "Hello!",
                color: "#000000",
                fontSize: "16px",
                font: "Ubuntu",
                horizontalAlignment: "center",
                verticalAlignment: "center"
            },
            useDefaultBorder: true,
            onClickWs: "core.println",
            onClickWsData: "{\"message\": \"Hello!\"}"
        }
    }
    toJSON() {
        let ans = {...this.state};
        if (this.state.displayKind === "view") {
            let cj = this.componentEditor?.toJSON();
            ans.viewProps = cj;
        }
        return ans;
    }
    changeKind(newKind: "empty" | "text" | "image" | "view") {
        let text: any = undefined;
        let image = undefined;
        let component: ViewProps | undefined = undefined;
        if (newKind === "text") {
            text = {
                text: "Text",
                color: "black",
                fontSize: "16",
                font: "Arial",
                horizontalAlignment: "center",
                verticalAlignment: "center",
            }
        }
        if (newKind === "image") {
            image = {
                source: "https://upload.wikimedia.org/wikipedia/commons/3/3f/JPEG_example_flower.jpg",
                simpleFill: true,
            }
        }
        if (newKind === "view") {
            component = {
                viewData: {
                    pluginName: "core",
                    componentName: "AutoGrid",
                    componentProps: AutoGridEditor.getDefaultComponentProps()
                }
            }
            this.componentEditor = WrappedComponentEditor.safeConstructor(ViewEditor, {initialJSON: component});
        } else {
            this.componentEditor = null;
        }
        this.setState({
            displayKind: newKind,
            text, image, viewProps: component
        })
    }
    updateText(change: Partial<WebsocketButtonTextInfo>) {
        let tmp = {...this.state.text} as WebsocketButtonTextInfo;
        for (let [k, v] of Object.entries(change)) (tmp as any)[k] = v;
        this.setState({text: tmp});
    };
    updateImage(change: Partial<WebsocketButtonImageInfo>) {
        let tmp = {...this.state.image} as WebsocketButtonImageInfo;
        for (let [k, v] of Object.entries(change)) {
            (tmp as any)[k] = v;
        }
        this.setState({image: tmp});
    }
    render() {
        let inner = <></>;
        if (this.state.displayKind === "text") {
            let t = this.state.text as WebsocketButtonTextInfo;
            inner = <>
                <EditorText label="Text: " text={t.text as string} onTextChanged={nt => this.updateText({text: nt})}/>
                <EditorText label="Color: " text={t.color as string} onTextChanged={nt => this.updateText({color: nt})}/>
                <EditorText label="Font Size: " text={t.fontSize as string} onTextChanged={nt => this.updateText({fontSize: nt})}/>
                <EditorDropdown label="Horizontal Alignment: " value={t.horizontalAlignment} values={["left", "center", "justify", "right"]} onSelectionChanged={nt => this.updateText({horizontalAlignment: nt})} />
                <EditorDropdown label="Vertical Alignment: " value={t.verticalAlignment} values={["top", "center", "bottom"]} onSelectionChanged={nt => this.updateText({verticalAlignment: nt})} />
            </>;
        }
        if (this.state.displayKind === "image") {
            let i = this.state.image as WebsocketButtonImageInfo;
            inner = <>
                <EditorText label="Source: " text={i.source as string} onTextChanged={nt => this.updateImage({source: nt})}/>
                <EditorCheckbox label="Simple Fill: " value={i.simpleFill ?? false} onValueChanged={nv => this.updateImage({simpleFill: nv})} />
                <EditorTextOptional disabled={typeof i.imageWidth === "undefined"} label="Image Width: " text={i.imageWidth as string | undefined ?? ""} onDisabledChanged={nv => this.updateImage({imageWidth: nv ?  undefined : "40px"})} onTextChanged={nt => this.updateImage({imageWidth: nt})}/>
                <EditorTextOptional disabled={typeof i.imageHeight === "undefined"} label="Image Height: " text={i.imageHeight as string | undefined ?? ""} onDisabledChanged={nv => this.updateImage({imageHeight: nv ?  undefined :"40px"})} onTextChanged={nt => this.updateImage({imageHeight: nt})}/>
                <EditorDropdownOptional disabled={typeof i.fit === "undefined"} label="Fit: " value={i.fit} values={["contain", "cover", "fill", "none", "scale-down"]} onDisabledChanged={nv => this.updateImage({fit: nv ?  undefined : "fill"})} onSelectionChanged={nv => this.updateImage({fit: nv})} />
                <EditorTextOptional disabled={typeof i.position === "undefined"} label="Position: " text={i.position as string | undefined ?? ""} onDisabledChanged={nv => this.updateImage({position: nv ?  undefined : "center center"})} onTextChanged={nt => this.updateImage({position: nt})}/>
            </>;
        }
        if (this.state.displayKind === "view") {
            inner = (this.componentEditor as WrappedComponentEditor).render();
        }
        return <div>
            <EditorDropdown label="Button Kind: " value={this.state.displayKind} values={["empty", "text", "image", "component"]} onSelectionChanged={this.changeKind.bind(this)} />
            <EditorText label="Width: " text={this.state.width as string} onTextChanged={nt => this.setState({width: nt})}/>
            <EditorText label="Height: " text={this.state.height as string} onTextChanged={nt => this.setState({height: nt})}/>
            {inner}
            <EditorText label="Websocket Action: " text={this.state.onClickWs as string} onTextChanged={nt => this.setState({onClickWs: nt})}/>
            <EditorText label="Websocket Action Data: " text={this.state.onClickWsData as string} onTextChanged={nt => this.setState({onClickWsData: nt})}/>
        </div>
    }
}

let ps: PluginScript = {
    components: {
        "WebsocketButton": WebsocketButton, 
        "AutoGrid": AutoGrid,
        "IFrame": IFrame
    },
    componentEditors: {
        "AutoGrid": AutoGridEditor,
        "WebsocketButton": WebsocketButtonEditor,
        "IFrame": IFrameEditor
    },
    css: {kind: "link", data: "/plugins/core/core.css"}
};

export default ps;