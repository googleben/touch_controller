import React from "react";
import { ViewInfo, ErrorBoundary, getPlugin, getPluginList, Loading, ViewProps, View, getViewList, putView, getView } from "./api";

export interface ComponentEditorBaseProps {
    initialJSON: any;
}

export class ComponentEditor<P extends ComponentEditorBaseProps, S> extends React.Component<P, S> {
    toJSON(): any {}
}

export class WrappedComponentEditor {
    static nextIndex: number = 0;
    component: React.RefObject<any>;
    typeRef: React.ComponentType<any>;
    props: any;
    index: number;
    private constructor(typeRef: React.ComponentType<any>, props: any) {
        this.typeRef = typeRef;
        this.props = props;
        this.component = React.createRef();
        this.index = WrappedComponentEditor.nextIndex++;
    }
    /**
     * Wrapper for the constructor with generic parameters so that you can ensure your props are the correct type
     */
    static safeConstructor<ComponentType extends React.ComponentType<ComponentProps>, ComponentProps>(typeRef: ComponentType, props: ComponentProps): WrappedComponentEditor {
        return new WrappedComponentEditor(typeRef, props);
    }
    toJSON() {
        return this.component.current.toJSON();
    }
    render() {
        return <ErrorBoundary key={this.index}>
                <this.typeRef ref={this.component} {...this.props}/>
            </ErrorBoundary>;
    }
}

//first key is plugin name, second is component name
export let editorComponents: Record<string, Record<string, React.ComponentType<ComponentEditorBaseProps>>> = {};
let componentsAreLoaded = false;
export async function loadEditorComponents() {
    if (componentsAreLoaded) return;
    let tmp = getPluginList;
    let link = document.createElement("link");
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("href", "/static/css/touch_controller_www.css");
    document.head.appendChild(link);
    let plugins = await tmp();
    for (let name of plugins) {
        let p = await getPlugin(name);
        if (p !== null) editorComponents[name] = p.componentEditors;
    }
    componentsAreLoaded = true;
}

export interface EditorDropdownOptionalProps {
    label?: string;
    values: string[];
    valueLabels?: string[];
    value?: string;
    disabled: boolean;
    onSelectionChanged: (newValue: any) => void;
    onDisabledChanged: (disabled: boolean) => void;
}
export class EditorDropdownOptional extends React.Component<EditorDropdownOptionalProps> {
    handleChange(event: any) {
        let v = (event.target as HTMLSelectElement).value;
        this.props.onSelectionChanged(v);
    }

    render() {
        let options = [];
        for (let i = 0; i < this.props.values.length; i++) {
            let val = this.props.values[i];
            let label = this.props.valueLabels?.[i] ?? val;
            options.push(<option key={i} value={val}>{label}</option>);
        }
        return <div>
            <label>
            <span style={{marginRight: "1ch"}} className="editorButton" onClick={() => this.props.onDisabledChanged(!this.props.disabled)}>{this.props.disabled ? "Enable" : "Disable"}</span>
                {this.props.label ?? ""}
                <select disabled={this.props.disabled} value={this.props.value ?? this.props.values[0]} onChange={(e) => this.handleChange(e)}>
                    {options}
                </select>
            </label>
        </div>
    }
}

export interface EditorDropdownProps {
    label?: string;
    values: string[];
    valueLabels?: string[];
    value?: string;
    onSelectionChanged: (newValue: any) => void;
}
export class EditorDropdown extends React.Component<EditorDropdownProps> {
    handleChange(event: any) {
        let v = (event.target as HTMLSelectElement).value;
        this.props.onSelectionChanged(v);
    }

    render() {
        let options = [];
        for (let i = 0; i < this.props.values.length; i++) {
            let val = this.props.values[i];
            let label = this.props.valueLabels?.[i] ?? val;
            options.push(<option key={i} value={val}>{label}</option>);
        }
        return <div>
            <label>{this.props.label ?? ""}
                <select value={this.props.value ?? this.props.values[0]} onChange={(e) => this.handleChange(e)}>
                    {options}
                </select>
            </label>
        </div>
    }
}


export interface EditorTextOptionalProps {
    text: string,
    disabled: boolean,
    label?: string,
    onTextChanged: (newText: string, oldText: string) => void,
    onDisabledChanged: (disabled: boolean) => void
}
export class EditorTextOptional extends React.Component<EditorTextOptionalProps> {
    handleChange(event: any) {
        let v = (event.target as HTMLSelectElement).value;
        this.props.onTextChanged(v, this.props.text);
    }
    render() {
        return <div>
            <label>
                <span style={{marginRight: "1ch"}} className="editorButton" onClick={() => this.props.onDisabledChanged(!this.props.disabled)}>{this.props.disabled ? "Enable" : "Disable"}</span>
                {this.props.label}
                <input type="text" value={this.props.text} disabled={this.props.disabled ?? false} onChange={this.handleChange.bind(this)}></input>
            </label>
        </div>
    }
}

export interface EditorTextProps {
    text: string,
    label?: string,
    disabled?: boolean,
    onTextChanged: (newText: string, oldText: string) => void
}
export class EditorText extends React.Component<EditorTextProps> {
    handleChange(event: any) {
        let v = (event.target as HTMLSelectElement).value;
        this.props.onTextChanged(v, this.props.text);
    }
    render() {
        let inner = <input type="text" value={this.props.text} disabled={this.props.disabled ?? false} onChange={this.handleChange.bind(this)}></input>
        if (typeof this.props.label === "undefined") {
            return <div>
                {inner}
            </div>
        } else {
            return <div>
                <label>{this.props.label}
                    {inner}
                </label>
            </div>
        }
    }
}

export interface EditorCheckboxProps {
    label?: string,
    value: boolean,
    onValueChanged: (newValue: boolean) => void
}
export class EditorCheckbox extends React.Component<EditorCheckboxProps> {
    handleChange(event: any) {
        let v = (event.target as HTMLInputElement).checked;
        this.props.onValueChanged(v);
    }
    render() {
        let inner = <input type="checkbox" onChange={this.handleChange} checked={this.props.value}></input>
        if (typeof this.props.label === "undefined") {
            return <div>{inner}</div>;
        } else {
            return <div>
                <label>{this.props.label}
                    {inner}
                </label>
            </div>
        }
    }
}

interface ViewEditorProps extends ComponentEditorBaseProps {
    onlyInlineData?: boolean;
}

export class ViewEditor extends ComponentEditor<ViewEditorProps, {p: ViewProps}> {
    inner: WrappedComponentEditor | null;
    inlineState?: ViewProps;
    predefinedState?: ViewProps;
    viewList?: string[];
    constructor(props: ViewEditorProps) {
        super(props);
        let j: ViewProps = this.props.initialJSON;
        this.state = {p: {...j}};
        if ("viewData" in j) {
            this.inner = WrappedComponentEditor.safeConstructor(editorComponents[j.viewData.pluginName][j.viewData.componentName], 
                {initialJSON: j.viewData.componentProps});
        }
        else this.inner = null;
    }

    setPlugin(pluginName: string) {
        this.setComponent(Object.keys(editorComponents[pluginName])[0], pluginName);
    }

    setComponent(componentName: string, pluginName?: string) {
        if ("viewName" in this.state.p) {
            return;
        }
        let d = this.state.p.viewData;
        if (componentName == d.componentName && (typeof pluginName !== "undefined" || pluginName === d.pluginName)) {
            return;
        } 
        let c = editorComponents[pluginName ?? d.pluginName][componentName];
        let getDefault = (c as any).getDefaultComponentProps;
        let componentProps = {};
        if (typeof getDefault !== "undefined") {
            componentProps = getDefault();
        }
        this.inner = WrappedComponentEditor.safeConstructor(editorComponents[pluginName ?? d.pluginName][componentName], {initialJSON: componentProps});
        this.setState({p: {viewData: {pluginName: pluginName ?? d.pluginName, componentName, componentProps}}});
    }

    switchType() {
        if ("viewName" in this.state.p) {
            this.predefinedState = {...this.state.p};
            let j;
            if (typeof this.inlineState !== "undefined") j = {...this.inlineState} as any;
            else j = {viewData: {
                    componentName: "AutoGrid",
                    pluginName: "core",
                    componentProps: {
                        gridTemplateColumns: "70px 70px 70px",
                        columnGap: "10px",
                        rowGap: "10px",
                        items: []
                    }
                }
            };

            this.inner = WrappedComponentEditor.safeConstructor(editorComponents[j.viewData.pluginName][j.viewData.componentName], 
                {initialJSON: j.viewData.componentProps});
            this.setState({p: j});
            
        } else {
            this.inlineState = {...this.state.p};
            if (typeof this.predefinedState !== "undefined") this.setState({p: this.predefinedState});
            else this.setState({p: {viewName: "default"}});
        }
    }

    render() {
        let inner: any;
        if ("viewName" in this.state.p) {
            if (typeof this.viewList === "undefined") {
                getViewList().then(v => {
                    this.viewList = v;
                    this.forceUpdate();
                });
                inner = <Loading />
            } else {
                let n = this.state.p.viewName;
                inner = <>
                    <EditorDropdown label="View: " value={n} values={this.viewList} onSelectionChanged={n => this.setState({p: {viewName: n}})} />
                </>
            }
        } else {
            let d = this.state.p.viewData;
            let pluginList = Object.keys(editorComponents);
            let componentList = Object.keys(editorComponents[d.pluginName]);
            inner = <>
                <EditorDropdown label="Plugin: " value={d.pluginName} values={pluginList} onSelectionChanged={this.setPlugin.bind(this)} />
                <EditorDropdown label="Component: " value={d.componentName} values={componentList} onSelectionChanged={this.setComponent.bind(this)} />
                <div className="editorLayer">
                    <EditorHideable name={" "+d.pluginName+"->"+d.componentName} fontSize="20px">
                        {this.inner?.render()}
                    </EditorHideable>
                </div>
            </>;
        }
        return <div>
            <span className="editorButton" onClick={() => this.switchType()}>Switch to {"viewName" in this.state.p ? "inline" : "predefined"}</span>
            <br/>
            {inner}
        </div>
    }

    toJSON() {
        let ans = {...this.state.p};
        if ("viewData" in this.state.p) (ans as any).viewData.componentProps = this.inner?.toJSON();
        return ans;
    }
}

export interface EditorHideableProps {
    name: string | JSX.Element;
    fontSize?: string;
}

export class EditorHideable extends React.Component<EditorHideableProps, {isOpen: boolean}> {
    constructor(props: EditorHideableProps) {
        super(props);
        this.state = {isOpen: true};
    }
    render() {
        return <div>
            <p style={{fontSize: this.props.fontSize ?? "inherit"}} className="editorHideableTitle" onClick={() => this.setState({isOpen: !this.state.isOpen})}>{this.state.isOpen ? "▾" : "▸"}{this.props.name}</p>
            <div className={this.state.isOpen ? "editorHideable" : "editorHideable hidden"} style={{maxHeight: this.state.isOpen ? "100%" : "0"}}>{this.props.children}</div>
        </div>
    }
}

export interface EditorListProps<ItemType> {
    onClickAdd: () => void,
    onClickRemove: (index: number, item: ItemType) => void,
    onClickMoveUp?: (index: number, item: ItemType) => void,
    onClickMoveDown?: (index: number, item: ItemType) => void,
    items: ItemType[]
}

export class EditorList<ItemType> extends React.Component<EditorListProps<ItemType>> {
    render() {
        let items: any = [];
        let numberWidth = (this.props.items.length.toString().length + 1) + "ch";
        for (let i = 0; i < this.props.items.length; i++) {
            let curr = this.props.items[i];
            items.push(<div key={i} style={{marginBottom: ".5em", marginTop: i==0 ? "inherit" : "1em", display: "flex"}}>
                <div style={{width: numberWidth, marginRight: "-.5em", paddingTop: ".5em"}}>
                    {i+"."}
                </div>
                <div className="editorLayer">
                    {typeof this.props.onClickMoveUp !== "undefined" ? <span className="editorButton" onClick={() => (this.props.onClickMoveUp as any)(i, curr)}>^</span> : <></>}
                    {typeof this.props.onClickMoveDown !== "undefined" ? <span className="editorButton" onClick={() => (this.props.onClickMoveDown as any)(i, curr)}>v</span> : <></>}
                    <span className="editorButton" style={{backgroundColor: "red"}} onClick={() => this.props.onClickRemove(i, curr)}>X</span>
                    <div style={{marginTop: ".5em"}}>
                        {curr}
                    </div>
                </div>
            </div>)
        }
        return <div className="editorLayer">
            <span className="editorButton" style={{backgroundColor: "green"}} onClick={() => this.props.onClickAdd()}>+</span>
            <br/>
            {items}
        </div>
    }
}

export interface EditorState {
    viewJson: ViewProps;
    componentsAreLoaded: boolean;
    viewList: string[];
    currentView: string;
    error: null | string;
    savingPopup: null | string;
}

export interface EditorSettings {
    resolution: [number, number]
}

export class Editor extends React.Component<{}, EditorState> {
    inner: WrappedComponentEditor;
    constructor(props: {}) {
        super(props);
        this.state = {
            viewJson: {
                viewData: {
                    componentName: "AutoGrid", 
                    pluginName: "core", 
                    componentProps: {
                        gridTemplateColumns: "70px 70px 70px",
                        columnGap: "10px",
                        rowGap: "10px",
                        items: []
                    }
                }
            }, 
            componentsAreLoaded: false,
            viewList: [],
            currentView: "default",
            error: null,
            savingPopup: null
        };
        this.inner = WrappedComponentEditor.safeConstructor(ViewEditor, {initialJSON: this.state.viewJson});
        loadEditorComponents().then(() => this.setState({componentsAreLoaded: true}));
        getViewList().then(viewList => this.setState({viewList}));
    }

    refresh() {
        let vj = this.inner.toJSON();
        this.inner = WrappedComponentEditor.safeConstructor(ViewEditor, {initialJSON: vj})
        this.setState({viewJson: vj});
    }

    loadView() {
        getView(this.state.currentView)
            .then(r => {
                if (typeof r === "string") this.setState({error: r});
                else {
                    let tmp = {viewData: r};
                    this.inner = WrappedComponentEditor.safeConstructor(ViewEditor, {initialJSON: tmp});
                    this.setState({viewJson: tmp, error: null});
                };
            });
    }

    saveView(viewName?: string) {
        if (typeof viewName === "undefined") {
            viewName = this.state.currentView;
        }
        let vj: ViewProps = this.inner.toJSON();
        if ("viewName" in vj) throw new Error("Top level editor can't be view reference");
        putView(viewName+".json", vj.viewData);
    }

    openSaveAsModal() {
        this.setState({savingPopup: this.state.currentView});
    }

    closeSaveAsModal() {
        this.setState({savingPopup: null});
    }

    saveAsModalSaveButton() {
        let viewName = this.state.savingPopup as string;
        if (viewName.length == 0) {
            alert("File name can't be empty!");
            return;
        }
        if (viewName.match(/[/\\]/g) !== null) {
            alert("File name can't contain \"/\" or \"\\\"!");
            return;
        }
        let hadView = false;
        for (let i of this.state.viewList) {
            if (i.toLowerCase() === viewName.toLowerCase()) {
                viewName = i;
                hadView = true;
                break;
            }
        }
        let ns: any = {currentView: viewName};
        if (!hadView) {
            let tmp = [...this.state.viewList];
            tmp.push(viewName);
            ns.viewList = tmp;
        }
        this.saveView(viewName);
        this.setState(ns);
        this.closeSaveAsModal();
    }

    render() {
        if (!this.state.componentsAreLoaded) return <Loading />
        if ("viewName" in this.state.viewJson) return <>View must be inline</>;
        return <>
            <div style={{display: "flex", overflowX: "auto", minHeight: "100%"}}>
                <div style={{width: "1280px", height: "720px", flexShrink: 0, paddingTop: "1em", overflow: "auto"}}>
                    <View viewData={this.state.viewJson.viewData} key={JSON.stringify([this.state.viewJson.viewData.componentName, this.state.viewJson.viewData.componentProps])} />
                </div>
                <div style={{borderLeft: "1px solid white", minHeight: "100%", paddingLeft: "1em", flexShrink: 1, flexGrow: 1, boxSizing: "border-box", minWidth: "700px", overflowX: "hidden", paddingTop: "1em"}}>
                    <div style={{marginBottom:".5em"}}>
                        <span onClick={() => this.refresh()} className="editorButton" style={{paddingTop: "5px", paddingBottom: "5px"}}>Refresh Preview</span>
                        &nbsp;
                        Current view:&nbsp;
                        <select value={this.state.currentView} onChange={e => this.setState({currentView: e.target.value})}>
                            {this.state.viewList.map(v => <option value={v} key={v}>{v}</option>)}
                        </select>
                        &nbsp;
                        <span onClick={() => this.loadView()} className="editorButton" style={{paddingTop: "5px", paddingBottom: "5px"}}>Load View</span>
                        &nbsp;
                        <span onClick={() => this.saveView()} className="editorButton" style={{paddingTop: "5px", paddingBottom: "5px"}}>Save View</span>
                        &nbsp;
                        <span onClick={() => this.openSaveAsModal()} className="editorButton" style={{paddingTop: "5px", paddingBottom: "5px"}}>Save View As...</span>
                    </div>
                    {this.state.error===null?<></>:<div>Error loading view: {this.state.error}</div>}
                    {this.inner.render()}
                </div>
            </div>
            {this.state.savingPopup !== null ? <div className="modal" onClick={e => {if ((e.target as HTMLElement).className==="modal")this.closeSaveAsModal()}}>
                <div className="modal-content">
                    <div className="modal-title">
                        <h1 style={{margin: "10px 0"}}>Save view as...</h1>
                    </div>
                    <div className="modal-body">
                        <label>
                            View name:&nbsp;
                            <input type="text" onChange={e => this.setState({savingPopup: e.target.value})} value={this.state.savingPopup}></input>
                        </label>
                        <br/>
                        <br/>
                        <span onClick={() => this.saveAsModalSaveButton()} className="editorButton" style={{backgroundColor: "green", float: "right"}}>Save</span>
                        <span onClick={() => this.closeSaveAsModal()} className="editorButton" style={{backgroundColor: "red", float: "left"}}>Cancel</span>
                        
                    </div>
                </div>
            </div>:<></>}
        </>
    }
}