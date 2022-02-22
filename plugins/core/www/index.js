import * as __WEBPACK_EXTERNAL_MODULE__static_js_api_js_479ea85d__ from "/static/js/api.js";
import * as __WEBPACK_EXTERNAL_MODULE__static_js_editorApi_js_0dcbd57d__ from "/static/js/editorApi.js";
/******/ var __webpack_modules__ = ({

/***/ "./node_modules/react/index.js":
/*!*************************************!*\
  !*** ./node_modules/react/index.js ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



if (false) {} else {
  module.exports = __webpack_require__(/*! ./cjs/react.development.js */ "./cjs/react.development.js");
}


/***/ }),

/***/ "../../touch_controller_www/src/api":
/*!************************************!*\
  !*** external "/static/js/api.js" ***!
  \************************************/
/***/ ((module) => {

var x = y => { var x = {}; __webpack_require__.d(x, y); return x; }
var y = x => () => x
module.exports = __WEBPACK_EXTERNAL_MODULE__static_js_api_js_479ea85d__;

/***/ }),

/***/ "../../touch_controller_www/src/editorApi":
/*!******************************************!*\
  !*** external "/static/js/editorApi.js" ***!
  \******************************************/
/***/ ((module) => {

var x = y => { var x = {}; __webpack_require__.d(x, y); return x; }
var y = x => () => x
module.exports = __WEBPACK_EXTERNAL_MODULE__static_js_editorApi_js_0dcbd57d__;

/***/ }),

/***/ "./cjs/react.development.js":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

module.exports = React;

/***/ })

/******/ });
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __webpack_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	var cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		// no module.id needed
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/compat get default export */
/******/ (() => {
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = (module) => {
/******/ 		var getter = module && module.__esModule ?
/******/ 			() => (module['default']) :
/******/ 			() => (module);
/******/ 		__webpack_require__.d(getter, { a: getter });
/******/ 		return getter;
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/define property getters */
/******/ (() => {
/******/ 	// define getter functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ (() => {
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ })();
/******/ 
/******/ /* webpack/runtime/make namespace object */
/******/ (() => {
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ })();
/******/ 
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!***********************!*\
  !*** ./src/index.tsx ***!
  \***********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _touch_controller_www_src_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../touch_controller_www/src/api */ "../../touch_controller_www/src/api");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _touch_controller_www_src_editorApi__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../touch_controller_www/src/editorApi */ "../../touch_controller_www/src/editorApi");



class AutoGrid extends (react__WEBPACK_IMPORTED_MODULE_1___default().Component) {
    render() {
        let ans = [];
        let key = 0;
        console.log(this.props);
        for (let i of this.props.items) {
            ans.push(react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", { key: key }, react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_touch_controller_www_src_api__WEBPACK_IMPORTED_MODULE_0__.View, { ...i })));
            key++;
        }
        let columnGap = this.props.columnGap ?? "5px";
        let rowGap = this.props.rowGap ?? "5px";
        return react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", { style: { display: "grid", gridTemplateColumns: this.props.gridTemplateColumns, columnGap, rowGap } }, ans);
    }
}
class AutoGridEditor extends _touch_controller_www_src_editorApi__WEBPACK_IMPORTED_MODULE_2__.ComponentEditor {
    constructor(props) {
        super(props);
        let j = props.initialJSON;
        this.state = {
            gridTemplateColumns: j.gridTemplateColumns.split(" "),
            columnGap: j.columnGap,
            rowGap: j.rowGap,
            items: j.items.map(info => _touch_controller_www_src_editorApi__WEBPACK_IMPORTED_MODULE_2__.WrappedComponentEditor.safeConstructor(_touch_controller_www_src_editorApi__WEBPACK_IMPORTED_MODULE_2__.ViewEditor, { initialJSON: info }))
        };
    }
    toJSON() {
        return {
            gridTemplateColumns: this.state.gridTemplateColumns.join(" "),
            columnGap: this.state.columnGap,
            rowGap: this.state.rowGap,
            items: this.state.items.map(e => e.toJSON())
        };
    }
    static getDefaultComponentProps() {
        return {
            gridTemplateColumns: "70px 70px 70x",
            columnGap: "10px",
            rowGap: "10px",
            items: []
        };
    }
    setColumn(colIndex, val) {
        let cols = Array.of(...this.state.gridTemplateColumns);
        cols[colIndex] = val;
        this.setState({ gridTemplateColumns: cols });
    }
    addColumn() {
        let cols = Array.of(...this.state.gridTemplateColumns);
        cols.push(cols.length > 0 ? cols[cols.length - 1] : "70px");
        this.setState({ gridTemplateColumns: cols });
    }
    removeColumn(index) {
        let cols = Array.of(...this.state.gridTemplateColumns);
        cols.splice(index, 1);
        this.setState({ gridTemplateColumns: cols });
    }
    addItem() {
        let items = Array.of(...this.state.items);
        items.push(_touch_controller_www_src_editorApi__WEBPACK_IMPORTED_MODULE_2__.WrappedComponentEditor.safeConstructor(_touch_controller_www_src_editorApi__WEBPACK_IMPORTED_MODULE_2__.ViewEditor, { initialJSON: {
                viewData: {
                    pluginName: "core",
                    componentName: "WebsocketButton",
                    componentProps: WebsocketButtonEditor.getDefaultComponentProps()
                }
            } }));
        this.setState({ items });
    }
    removeItem(index) {
        let items = Array.of(...this.state.items);
        items.splice(index, 1);
        this.setState({ items });
    }
    render() {
        let d = this.state;
        let cols = [];
        for (let i = 0; i < d.gridTemplateColumns.length; i++) {
            let c = d.gridTemplateColumns[i];
            cols.push(react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_touch_controller_www_src_editorApi__WEBPACK_IMPORTED_MODULE_2__.EditorText, { label: "Column Width: ", text: c, onTextChanged: (t) => { this.setColumn(i, t); } }));
        }
        let items = d.items.map(i => i.render());
        return react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", null,
            "Columns:",
            react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_touch_controller_www_src_editorApi__WEBPACK_IMPORTED_MODULE_2__.EditorList, { items: cols, onClickAdd: this.addColumn.bind(this), onClickRemove: this.removeColumn.bind(this) }),
            react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_touch_controller_www_src_editorApi__WEBPACK_IMPORTED_MODULE_2__.EditorText, { text: this.state.columnGap ?? "", onTextChanged: (t) => this.setState({ columnGap: t }), label: "Column Gap: " }),
            react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_touch_controller_www_src_editorApi__WEBPACK_IMPORTED_MODULE_2__.EditorText, { text: this.state.rowGap ?? "", onTextChanged: (t) => this.setState({ rowGap: t }), label: "Row Gap: " }),
            "Items:",
            react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_touch_controller_www_src_editorApi__WEBPACK_IMPORTED_MODULE_2__.EditorList, { items: items, onClickAdd: this.addItem.bind(this), onClickRemove: this.removeItem.bind(this) }));
    }
}
class CustomGrid extends (react__WEBPACK_IMPORTED_MODULE_1___default().Component) {
}
class IFrame extends (react__WEBPACK_IMPORTED_MODULE_1___default().Component) {
    render() {
        return react__WEBPACK_IMPORTED_MODULE_1___default().createElement("iframe", { src: this.props.url, height: this.props.height, width: this.props.width });
    }
}
class IFrameEditor extends _touch_controller_www_src_editorApi__WEBPACK_IMPORTED_MODULE_2__.ComponentEditor {
    constructor(props) {
        super(props);
        this.state = props.initialJSON;
    }
    static getDefaultComponentProps() {
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
        return react__WEBPACK_IMPORTED_MODULE_1___default().createElement((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), null,
            react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_touch_controller_www_src_editorApi__WEBPACK_IMPORTED_MODULE_2__.EditorText, { label: "url: ", text: this.state.url, onTextChanged: nt => this.setState({ url: nt }) }),
            react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_touch_controller_www_src_editorApi__WEBPACK_IMPORTED_MODULE_2__.EditorText, { label: "width: ", text: this.state.width ?? "", onTextChanged: nt => this.setState({ width: nt }) }),
            react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_touch_controller_www_src_editorApi__WEBPACK_IMPORTED_MODULE_2__.EditorText, { label: "height: ", text: this.state.height ?? "", onTextChanged: nt => this.setState({ height: nt }) }));
    }
}
class WebsocketButton extends (react__WEBPACK_IMPORTED_MODULE_1___default().Component) {
    constructor(props) {
        super(props);
        this.state = {
            onClickWsData: JSON.parse(props.onClickWsData)
        };
    }
    render() {
        let onc = () => {
            (0,_touch_controller_www_src_api__WEBPACK_IMPORTED_MODULE_0__.sendAction)({ action: this.props.onClickWs, ...this.state.onClickWsData });
        };
        let elem = react__WEBPACK_IMPORTED_MODULE_1___default().createElement((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), null);
        if (this.props.displayKind === "text") {
            let text = this.props.text;
            let va = text.verticalAlignment;
            let flexAlign = va === "top" ? "flex-start" : va === "bottom" ? "flex-end" : va;
            elem = react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", { style: { display: "flex", justifyContent: flexAlign, flexDirection: "column", width: "100%", height: "100%" } },
                react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", null,
                    react__WEBPACK_IMPORTED_MODULE_1___default().createElement("p", { style: { color: text.color, fontSize: text.fontSize, font: text.font, textAlign: text.horizontalAlignment, padding: "5px" } }, text.text)));
        }
        else if (this.props.displayKind === "image") {
            let image = this.props.image;
            if (image.simpleFill) {
                elem = react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", { style: { position: "absolute", width: "100%", height: "100%" } },
                    react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", { style: { display: "flex", justifyContent: "center", alignContent: "center", width: "100%", height: "100%" } },
                        react__WEBPACK_IMPORTED_MODULE_1___default().createElement("img", { src: image.source, style: { width: image.imageWidth ?? "100%", height: image.imageHeight ?? "100%" } })));
            }
            else {
                let style = {};
                let hasW = typeof image.imageWidth !== "undefined";
                let hasH = typeof image.imageHeight !== "undefined";
                if (hasW || hasH) {
                    if (hasW)
                        style.width = image.imageWidth;
                    if (hasH)
                        style.height = image.imageHeight;
                }
                else {
                    if (typeof image.fit !== "undefined")
                        style.objectFit = image.fit;
                }
                if (typeof image.position !== "undefined")
                    style.objectPosition = image.position;
                elem = react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", { style: { position: "absolute", width: "100%", height: "100%" } },
                    react__WEBPACK_IMPORTED_MODULE_1___default().createElement("img", { src: image.source, style: style }));
            }
        }
        else if (this.props.displayKind === "view") {
            elem = react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_touch_controller_www_src_api__WEBPACK_IMPORTED_MODULE_0__.View, { ...this.props.viewProps });
        }
        else {
            if (this.props.displayKind !== "empty")
                console.error(`Unknown display kind ${this.props.displayKind}, defaulting to empty`);
        }
        let style = {};
        if (typeof this.props.customStyle !== "undefined") {
            style = { ...this.props.customStyle };
        }
        if (this.props.useDefaultBorder) {
            style.borderRadius = "5px";
        }
        style.width = this.props.width;
        style.height = this.props.height;
        return react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", { onClick: onc, className: "websocketButton", style: style }, elem);
    }
}
class WebsocketButtonEditor extends _touch_controller_www_src_editorApi__WEBPACK_IMPORTED_MODULE_2__.ComponentEditor {
    componentEditor;
    constructor(props) {
        super(props);
        this.componentEditor = null;
        this.state = props.initialJSON;
        if (this.state.displayKind === "view") {
            this.componentEditor = _touch_controller_www_src_editorApi__WEBPACK_IMPORTED_MODULE_2__.WrappedComponentEditor.safeConstructor(_touch_controller_www_src_editorApi__WEBPACK_IMPORTED_MODULE_2__.ViewEditor, { initialJSON: this.state.viewProps });
        }
    }
    static getDefaultComponentProps() {
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
        };
    }
    toJSON() {
        let ans = { ...this.state };
        if (this.state.displayKind === "view") {
            let cj = this.componentEditor?.toJSON();
            ans.viewProps = cj;
        }
        return ans;
    }
    changeKind(newKind) {
        let text = undefined;
        let image = undefined;
        let component = undefined;
        if (newKind === "text") {
            text = {
                text: "Text",
                color: "black",
                fontSize: "16",
                font: "Arial",
                horizontalAlignment: "center",
                verticalAlignment: "center",
            };
        }
        if (newKind === "image") {
            image = {
                source: "https://upload.wikimedia.org/wikipedia/commons/3/3f/JPEG_example_flower.jpg",
                simpleFill: true,
            };
        }
        if (newKind === "view") {
            component = {
                viewData: {
                    pluginName: "core",
                    componentName: "AutoGrid",
                    componentProps: AutoGridEditor.getDefaultComponentProps()
                }
            };
            this.componentEditor = _touch_controller_www_src_editorApi__WEBPACK_IMPORTED_MODULE_2__.WrappedComponentEditor.safeConstructor(_touch_controller_www_src_editorApi__WEBPACK_IMPORTED_MODULE_2__.ViewEditor, { initialJSON: component });
        }
        else {
            this.componentEditor = null;
        }
        this.setState({
            displayKind: newKind,
            text, image, viewProps: component
        });
    }
    updateText(change) {
        let tmp = { ...this.state.text };
        for (let [k, v] of Object.entries(change))
            tmp[k] = v;
        this.setState({ text: tmp });
    }
    ;
    updateImage(change) {
        let tmp = { ...this.state.image };
        for (let [k, v] of Object.entries(change)) {
            tmp[k] = v;
        }
        this.setState({ image: tmp });
    }
    render() {
        let inner = react__WEBPACK_IMPORTED_MODULE_1___default().createElement((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), null);
        if (this.state.displayKind === "text") {
            let t = this.state.text;
            inner = react__WEBPACK_IMPORTED_MODULE_1___default().createElement((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), null,
                react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_touch_controller_www_src_editorApi__WEBPACK_IMPORTED_MODULE_2__.EditorText, { label: "Text: ", text: t.text, onTextChanged: nt => this.updateText({ text: nt }) }),
                react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_touch_controller_www_src_editorApi__WEBPACK_IMPORTED_MODULE_2__.EditorText, { label: "Color: ", text: t.color, onTextChanged: nt => this.updateText({ color: nt }) }),
                react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_touch_controller_www_src_editorApi__WEBPACK_IMPORTED_MODULE_2__.EditorText, { label: "Font Size: ", text: t.fontSize, onTextChanged: nt => this.updateText({ fontSize: nt }) }),
                react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_touch_controller_www_src_editorApi__WEBPACK_IMPORTED_MODULE_2__.EditorDropdown, { label: "Horizontal Alignment: ", value: t.horizontalAlignment, values: ["left", "center", "justify", "right"], onSelectionChanged: nt => this.updateText({ horizontalAlignment: nt }) }),
                react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_touch_controller_www_src_editorApi__WEBPACK_IMPORTED_MODULE_2__.EditorDropdown, { label: "Vertical Alignment: ", value: t.verticalAlignment, values: ["top", "center", "bottom"], onSelectionChanged: nt => this.updateText({ verticalAlignment: nt }) }));
        }
        if (this.state.displayKind === "image") {
            let i = this.state.image;
            inner = react__WEBPACK_IMPORTED_MODULE_1___default().createElement((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), null,
                react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_touch_controller_www_src_editorApi__WEBPACK_IMPORTED_MODULE_2__.EditorText, { label: "Source: ", text: i.source, onTextChanged: nt => this.updateImage({ source: nt }) }),
                react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_touch_controller_www_src_editorApi__WEBPACK_IMPORTED_MODULE_2__.EditorCheckbox, { label: "Simple Fill: ", value: i.simpleFill ?? false, onValueChanged: nv => this.updateImage({ simpleFill: nv }) }),
                react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_touch_controller_www_src_editorApi__WEBPACK_IMPORTED_MODULE_2__.EditorTextOptional, { disabled: typeof i.imageWidth === "undefined", label: "Image Width: ", text: i.imageWidth ?? "", onDisabledChanged: nv => this.updateImage({ imageWidth: nv ? undefined : "40px" }), onTextChanged: nt => this.updateImage({ imageWidth: nt }) }),
                react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_touch_controller_www_src_editorApi__WEBPACK_IMPORTED_MODULE_2__.EditorTextOptional, { disabled: typeof i.imageHeight === "undefined", label: "Image Height: ", text: i.imageHeight ?? "", onDisabledChanged: nv => this.updateImage({ imageHeight: nv ? undefined : "40px" }), onTextChanged: nt => this.updateImage({ imageHeight: nt }) }),
                react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_touch_controller_www_src_editorApi__WEBPACK_IMPORTED_MODULE_2__.EditorDropdownOptional, { disabled: typeof i.fit === "undefined", label: "Fit: ", value: i.fit, values: ["contain", "cover", "fill", "none", "scale-down"], onDisabledChanged: nv => this.updateImage({ fit: nv ? undefined : "fill" }), onSelectionChanged: nv => this.updateImage({ fit: nv }) }),
                react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_touch_controller_www_src_editorApi__WEBPACK_IMPORTED_MODULE_2__.EditorTextOptional, { disabled: typeof i.position === "undefined", label: "Position: ", text: i.position ?? "", onDisabledChanged: nv => this.updateImage({ position: nv ? undefined : "center center" }), onTextChanged: nt => this.updateImage({ position: nt }) }));
        }
        if (this.state.displayKind === "view") {
            inner = this.componentEditor.render();
        }
        return react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", null,
            react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_touch_controller_www_src_editorApi__WEBPACK_IMPORTED_MODULE_2__.EditorDropdown, { label: "Button Kind: ", value: this.state.displayKind, values: ["empty", "text", "image", "component"], onSelectionChanged: this.changeKind.bind(this) }),
            react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_touch_controller_www_src_editorApi__WEBPACK_IMPORTED_MODULE_2__.EditorText, { label: "Width: ", text: this.state.width, onTextChanged: nt => this.setState({ width: nt }) }),
            react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_touch_controller_www_src_editorApi__WEBPACK_IMPORTED_MODULE_2__.EditorText, { label: "Height: ", text: this.state.height, onTextChanged: nt => this.setState({ height: nt }) }),
            inner,
            react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_touch_controller_www_src_editorApi__WEBPACK_IMPORTED_MODULE_2__.EditorText, { label: "Websocket Action: ", text: this.state.onClickWs, onTextChanged: nt => this.setState({ onClickWs: nt }) }),
            react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_touch_controller_www_src_editorApi__WEBPACK_IMPORTED_MODULE_2__.EditorText, { label: "Websocket Action Data: ", text: this.state.onClickWsData, onTextChanged: nt => this.setState({ onClickWsData: nt }) }));
    }
}
let ps = {
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
    css: { kind: "link", data: "/plugins/core/core.css" }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ps);

})();

var __webpack_exports__default = __webpack_exports__["default"];
export { __webpack_exports__default as default };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFJLENBQUMsUUFBUSxDQUFDLEVBQUMsTUFBTSxFQUFFLEVBQUUsRUFBQyxDQUFDLEdBQUc7WUFDbEgsS0FBSztZQUNOLDJEQUFDLDJFQUFVLElBQUMsS0FBSyxFQUFDLG9CQUFvQixFQUFDLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQW1CLEVBQUUsYUFBYSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFDLFNBQVMsRUFBRSxFQUFFLEVBQUMsQ0FBQyxHQUFHO1lBQ25JLDJEQUFDLDJFQUFVLElBQUMsS0FBSyxFQUFDLHlCQUF5QixFQUFDLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQXVCLEVBQUUsYUFBYSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFDLGFBQWEsRUFBRSxFQUFFLEVBQUMsQ0FBQyxHQUFHLENBQzlJO0lBQ1YsQ0FBQztDQUNKO0FBRUQsSUFBSSxFQUFFLEdBQWlCO0lBQ25CLFVBQVUsRUFBRTtRQUNSLGlCQUFpQixFQUFFLGVBQWU7UUFDbEMsVUFBVSxFQUFFLFFBQVE7UUFDcEIsUUFBUSxFQUFFLE1BQU07S0FDbkI7SUFDRCxnQkFBZ0IsRUFBRTtRQUNkLFVBQVUsRUFBRSxjQUFjO1FBQzFCLGlCQUFpQixFQUFFLHFCQUFxQjtRQUN4QyxRQUFRLEVBQUUsWUFBWTtLQUN6QjtJQUNELEdBQUcsRUFBRSxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLHdCQUF3QixFQUFDO0NBQ3RELENBQUM7QUFFRixpRUFBZSxFQUFFLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3QvaW5kZXguanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIG1vZHVsZSBcIi9zdGF0aWMvanMvYXBpLmpzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIG1vZHVsZSBcIi9zdGF0aWMvanMvZWRpdG9yQXBpLmpzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHJvb3QgXCJSZWFjdFwiIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHN4Il0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAncHJvZHVjdGlvbicpIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2Nqcy9yZWFjdC5wcm9kdWN0aW9uLm1pbi5qcycpO1xufSBlbHNlIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2Nqcy9yZWFjdC5kZXZlbG9wbWVudC5qcycpO1xufVxuIiwidmFyIHggPSB5ID0+IHsgdmFyIHggPSB7fTsgX193ZWJwYWNrX3JlcXVpcmVfXy5kKHgsIHkpOyByZXR1cm4geDsgfVxudmFyIHkgPSB4ID0+ICgpID0+IHhcbm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9fc3RhdGljX2pzX2FwaV9qc180NzllYTg1ZF9fOyIsInZhciB4ID0geSA9PiB7IHZhciB4ID0ge307IF9fd2VicGFja19yZXF1aXJlX18uZCh4LCB5KTsgcmV0dXJuIHg7IH1cbnZhciB5ID0geCA9PiAoKSA9PiB4XG5tb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfX3N0YXRpY19qc19lZGl0b3JBcGlfanNfMGRjYmQ1N2RfXzsiLCJtb2R1bGUuZXhwb3J0cyA9IFJlYWN0OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQge1BsdWdpblNjcmlwdCwgR2xvYmFsSW5mbywgVmlldywgVmlld1Byb3BzLCBzZW5kQWN0aW9ufSBmcm9tIFwiLi4vLi4vdG91Y2hfY29udHJvbGxlcl93d3cvc3JjL2FwaVwiO1xyXG5pbXBvcnQge1Byb3BlcnR5fSBmcm9tIFwiY3NzdHlwZVwiXHJcbmltcG9ydCB7Z2xvYmFsSW5mb30gZnJvbSBcIi4uLy4uL3RvdWNoX2NvbnRyb2xsZXJfd3d3L3NyYy9hcGlcIjtcclxuXHJcbmltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50RWRpdG9yLCBDb21wb25lbnRFZGl0b3JCYXNlUHJvcHMsIEVkaXRvckNoZWNrYm94LCBFZGl0b3JEcm9wZG93biwgRWRpdG9yRHJvcGRvd25PcHRpb25hbCwgRWRpdG9yTGlzdCwgRWRpdG9yVGV4dCwgRWRpdG9yVGV4dE9wdGlvbmFsLCBWaWV3RWRpdG9yLCBXcmFwcGVkQ29tcG9uZW50RWRpdG9yIH0gZnJvbSBcIi4uLy4uL3RvdWNoX2NvbnRyb2xsZXJfd3d3L3NyYy9lZGl0b3JBcGlcIjtcclxuXHJcbmludGVyZmFjZSBBdXRvR3JpZFByb3BzIHtcclxuICAgIGdyaWRUZW1wbGF0ZUNvbHVtbnM6IFByb3BlcnR5LkdyaWRUZW1wbGF0ZUNvbHVtbnMsXHJcbiAgICBjb2x1bW5HYXA/OiBQcm9wZXJ0eS5HcmlkQ29sdW1uR2FwLFxyXG4gICAgcm93R2FwPzogUHJvcGVydHkuR3JpZFJvd0dhcCxcclxuICAgIGl0ZW1zOiBWaWV3UHJvcHNbXVxyXG59XHJcblxyXG5jbGFzcyBBdXRvR3JpZCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxBdXRvR3JpZFByb3BzPiB7XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgbGV0IGFuczogYW55ID0gW107XHJcbiAgICAgICAgbGV0IGtleSA9IDA7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5wcm9wcyk7XHJcbiAgICAgICAgZm9yIChsZXQgaSBvZiB0aGlzLnByb3BzLml0ZW1zKSB7XHJcbiAgICAgICAgICAgIGFucy5wdXNoKDxkaXYga2V5PXtrZXl9Pns8VmlldyB7Li4uaX0vPn08L2Rpdj4pO1xyXG4gICAgICAgICAgICBrZXkrKztcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGNvbHVtbkdhcCA9IHRoaXMucHJvcHMuY29sdW1uR2FwID8/IFwiNXB4XCI7XHJcbiAgICAgICAgbGV0IHJvd0dhcCA9IHRoaXMucHJvcHMucm93R2FwID8/IFwiNXB4XCI7XHJcbiAgICAgICAgcmV0dXJuIDxkaXYgc3R5bGU9e3tkaXNwbGF5OiBcImdyaWRcIiwgZ3JpZFRlbXBsYXRlQ29sdW1uczogdGhpcy5wcm9wcy5ncmlkVGVtcGxhdGVDb2x1bW5zLCBjb2x1bW5HYXAsIHJvd0dhcH19PlxyXG4gICAgICAgICAgICB7YW5zfVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBBdXRvR3JpZEVkaXRvciBleHRlbmRzIENvbXBvbmVudEVkaXRvcjxDb21wb25lbnRFZGl0b3JCYXNlUHJvcHMsIHtncmlkVGVtcGxhdGVDb2x1bW5zOiBzdHJpbmdbXSwgY29sdW1uR2FwPzogc3RyaW5nLCByb3dHYXA/OiBzdHJpbmcsIGl0ZW1zOiBXcmFwcGVkQ29tcG9uZW50RWRpdG9yW119PiB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wczogQ29tcG9uZW50RWRpdG9yQmFzZVByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIGxldCBqID0gcHJvcHMuaW5pdGlhbEpTT04gYXMgQXV0b0dyaWRQcm9wcztcclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICBncmlkVGVtcGxhdGVDb2x1bW5zOiAoai5ncmlkVGVtcGxhdGVDb2x1bW5zIGFzIHN0cmluZykuc3BsaXQoXCIgXCIpLFxyXG4gICAgICAgICAgICBjb2x1bW5HYXA6IGouY29sdW1uR2FwIGFzIChzdHJpbmcgfCB1bmRlZmluZWQpLFxyXG4gICAgICAgICAgICByb3dHYXA6IGoucm93R2FwIGFzIChzdHJpbmcgfCB1bmRlZmluZWQpLFxyXG4gICAgICAgICAgICBpdGVtczogai5pdGVtcy5tYXAoaW5mbyA9PiBXcmFwcGVkQ29tcG9uZW50RWRpdG9yLnNhZmVDb25zdHJ1Y3RvcihWaWV3RWRpdG9yLCB7aW5pdGlhbEpTT046IGluZm99KSlcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgdG9KU09OKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGdyaWRUZW1wbGF0ZUNvbHVtbnM6IHRoaXMuc3RhdGUuZ3JpZFRlbXBsYXRlQ29sdW1ucy5qb2luKFwiIFwiKSxcclxuICAgICAgICAgICAgY29sdW1uR2FwOiB0aGlzLnN0YXRlLmNvbHVtbkdhcCxcclxuICAgICAgICAgICAgcm93R2FwOiB0aGlzLnN0YXRlLnJvd0dhcCxcclxuICAgICAgICAgICAgaXRlbXM6IHRoaXMuc3RhdGUuaXRlbXMubWFwKGUgPT4gZS50b0pTT04oKSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgZ2V0RGVmYXVsdENvbXBvbmVudFByb3BzKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGdyaWRUZW1wbGF0ZUNvbHVtbnM6IFwiNzBweCA3MHB4IDcweFwiLFxyXG4gICAgICAgICAgICBjb2x1bW5HYXA6IFwiMTBweFwiLFxyXG4gICAgICAgICAgICByb3dHYXA6IFwiMTBweFwiLFxyXG4gICAgICAgICAgICBpdGVtczogW11cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBzZXRDb2x1bW4oY29sSW5kZXg6IG51bWJlciwgdmFsOiBzdHJpbmcpIHtcclxuICAgICAgICBsZXQgY29scyA9IEFycmF5Lm9mKC4uLnRoaXMuc3RhdGUuZ3JpZFRlbXBsYXRlQ29sdW1ucyk7XHJcbiAgICAgICAgY29sc1tjb2xJbmRleF0gPSB2YWw7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Z3JpZFRlbXBsYXRlQ29sdW1uczogY29sc30pO1xyXG4gICAgfVxyXG4gICAgYWRkQ29sdW1uKCkge1xyXG4gICAgICAgIGxldCBjb2xzID0gQXJyYXkub2YoLi4udGhpcy5zdGF0ZS5ncmlkVGVtcGxhdGVDb2x1bW5zKTtcclxuICAgICAgICBjb2xzLnB1c2goY29scy5sZW5ndGggPiAwID8gY29sc1tjb2xzLmxlbmd0aCAtIDFdIDogXCI3MHB4XCIpO1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2dyaWRUZW1wbGF0ZUNvbHVtbnM6IGNvbHN9KTtcclxuICAgIH1cclxuICAgIHJlbW92ZUNvbHVtbihpbmRleDogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IGNvbHMgPSBBcnJheS5vZiguLi50aGlzLnN0YXRlLmdyaWRUZW1wbGF0ZUNvbHVtbnMpO1xyXG4gICAgICAgIGNvbHMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtncmlkVGVtcGxhdGVDb2x1bW5zOiBjb2xzfSk7XHJcbiAgICB9XHJcbiAgICBhZGRJdGVtKCkge1xyXG4gICAgICAgIGxldCBpdGVtcyA9IEFycmF5Lm9mKC4uLnRoaXMuc3RhdGUuaXRlbXMpO1xyXG4gICAgICAgIGl0ZW1zLnB1c2goV3JhcHBlZENvbXBvbmVudEVkaXRvci5zYWZlQ29uc3RydWN0b3IoVmlld0VkaXRvciwge2luaXRpYWxKU09OOiB7XHJcbiAgICAgICAgICAgIHZpZXdEYXRhOiB7XHJcbiAgICAgICAgICAgICAgICBwbHVnaW5OYW1lOiBcImNvcmVcIixcclxuICAgICAgICAgICAgICAgIGNvbXBvbmVudE5hbWU6IFwiV2Vic29ja2V0QnV0dG9uXCIsXHJcbiAgICAgICAgICAgICAgICBjb21wb25lbnRQcm9wczogV2Vic29ja2V0QnV0dG9uRWRpdG9yLmdldERlZmF1bHRDb21wb25lbnRQcm9wcygpXHJcbiAgICAgICAgICAgIH19fSkpO1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2l0ZW1zfSk7XHJcbiAgICB9XHJcbiAgICByZW1vdmVJdGVtKGluZGV4OiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgaXRlbXMgPSBBcnJheS5vZiguLi50aGlzLnN0YXRlLml0ZW1zKTtcclxuICAgICAgICBpdGVtcy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2l0ZW1zfSk7XHJcbiAgICB9XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgbGV0IGQgPSB0aGlzLnN0YXRlO1xyXG4gICAgICAgIGxldCBjb2xzOiBhbnkgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGQuZ3JpZFRlbXBsYXRlQ29sdW1ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgYyA9IGQuZ3JpZFRlbXBsYXRlQ29sdW1uc1tpXTtcclxuICAgICAgICAgICAgY29scy5wdXNoKDxFZGl0b3JUZXh0IGxhYmVsPVwiQ29sdW1uIFdpZHRoOiBcIiB0ZXh0PXtjfSBvblRleHRDaGFuZ2VkPXsodCkgPT4ge3RoaXMuc2V0Q29sdW1uKGksIHQpfX0vPik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBpdGVtcyA9IGQuaXRlbXMubWFwKGkgPT4gaS5yZW5kZXIoKSk7XHJcbiAgICAgICAgcmV0dXJuIDxkaXY+XHJcbiAgICAgICAgICAgIENvbHVtbnM6XHJcbiAgICAgICAgICAgIDxFZGl0b3JMaXN0IGl0ZW1zPXtjb2xzfSBvbkNsaWNrQWRkPXt0aGlzLmFkZENvbHVtbi5iaW5kKHRoaXMpfSBvbkNsaWNrUmVtb3ZlPXt0aGlzLnJlbW92ZUNvbHVtbi5iaW5kKHRoaXMpfS8+XHJcbiAgICAgICAgICAgIDxFZGl0b3JUZXh0IHRleHQ9e3RoaXMuc3RhdGUuY29sdW1uR2FwID8/IFwiXCJ9IG9uVGV4dENoYW5nZWQ9eyh0KSA9PiB0aGlzLnNldFN0YXRlKHtjb2x1bW5HYXA6IHR9KX0gbGFiZWw9XCJDb2x1bW4gR2FwOiBcIi8+XHJcbiAgICAgICAgICAgIDxFZGl0b3JUZXh0IHRleHQ9e3RoaXMuc3RhdGUucm93R2FwID8/IFwiXCJ9IG9uVGV4dENoYW5nZWQ9eyh0KSA9PiB0aGlzLnNldFN0YXRlKHtyb3dHYXA6IHR9KX0gbGFiZWw9XCJSb3cgR2FwOiBcIi8+XHJcbiAgICAgICAgICAgIEl0ZW1zOlxyXG4gICAgICAgICAgICA8RWRpdG9yTGlzdCBpdGVtcz17aXRlbXN9IG9uQ2xpY2tBZGQ9e3RoaXMuYWRkSXRlbS5iaW5kKHRoaXMpfSBvbkNsaWNrUmVtb3ZlPXt0aGlzLnJlbW92ZUl0ZW0uYmluZCh0aGlzKX0gLz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIH1cclxufVxyXG5cclxuaW50ZXJmYWNlIEN1c3RvbUdyaWRQcm9wcyB7XHJcbiAgICB3aWR0aD86IG51bWJlcixcclxuICAgIGhlaWdodD86IG51bWJlcixcclxuXHJcbn1cclxuXHJcbmNsYXNzIEN1c3RvbUdyaWQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8Q3VzdG9tR3JpZFByb3BzPiB7XHJcblxyXG59XHJcblxyXG5pbnRlcmZhY2UgSUZyYW1lUHJvcHMge1xyXG4gICAgdXJsOiBzdHJpbmc7XHJcbiAgICB3aWR0aD86IHN0cmluZztcclxuICAgIGhlaWdodD86IHN0cmluZztcclxufVxyXG5jbGFzcyBJRnJhbWUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8SUZyYW1lUHJvcHM+IHtcclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gPGlmcmFtZSBzcmM9e3RoaXMucHJvcHMudXJsfSBoZWlnaHQ9e3RoaXMucHJvcHMuaGVpZ2h0fSB3aWR0aD17dGhpcy5wcm9wcy53aWR0aH0+PC9pZnJhbWU+O1xyXG4gICAgfVxyXG59XHJcbmNsYXNzIElGcmFtZUVkaXRvciBleHRlbmRzIENvbXBvbmVudEVkaXRvcjxDb21wb25lbnRFZGl0b3JCYXNlUHJvcHMsIElGcmFtZVByb3BzPiB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wczogQ29tcG9uZW50RWRpdG9yQmFzZVByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSBwcm9wcy5pbml0aWFsSlNPTjtcclxuICAgIH1cclxuICAgIHN0YXRpYyBnZXREZWZhdWx0Q29tcG9uZW50UHJvcHMoKTogSUZyYW1lUHJvcHMge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHVybDogXCJodHRwczovL2V4YW1wbGUuY29tXCIsXHJcbiAgICAgICAgICAgIHdpZHRoOiBcIjMwMFwiLFxyXG4gICAgICAgICAgICBoZWlnaHQ6IFwiMzAwXCJcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgdG9KU09OKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiA8PlxyXG4gICAgICAgICAgICA8RWRpdG9yVGV4dCBsYWJlbD1cInVybDogXCIgdGV4dD17dGhpcy5zdGF0ZS51cmx9IG9uVGV4dENoYW5nZWQ9e250ID0+IHRoaXMuc2V0U3RhdGUoe3VybDogbnR9KX0vPlxyXG4gICAgICAgICAgICA8RWRpdG9yVGV4dCBsYWJlbD1cIndpZHRoOiBcIiB0ZXh0PXt0aGlzLnN0YXRlLndpZHRoID8/IFwiXCJ9IG9uVGV4dENoYW5nZWQ9e250ID0+IHRoaXMuc2V0U3RhdGUoe3dpZHRoOiBudH0pfS8+XHJcbiAgICAgICAgICAgIDxFZGl0b3JUZXh0IGxhYmVsPVwiaGVpZ2h0OiBcIiB0ZXh0PXt0aGlzLnN0YXRlLmhlaWdodCA/PyBcIlwifSBvblRleHRDaGFuZ2VkPXtudCA9PiB0aGlzLnNldFN0YXRlKHtoZWlnaHQ6IG50fSl9Lz5cclxuICAgICAgICA8Lz5cclxuICAgIH1cclxufVxyXG5cclxuaW50ZXJmYWNlIFdlYnNvY2tldEJ1dHRvblRleHRJbmZvIHtcclxuICAgIHRleHQ6IHN0cmluZyxcclxuICAgIGNvbG9yOiBQcm9wZXJ0eS5Db2xvcixcclxuICAgIGZvbnRTaXplOiBQcm9wZXJ0eS5Gb250U2l6ZSxcclxuICAgIGZvbnQ6IFByb3BlcnR5LkZvbnRGYW1pbHksXHJcbiAgICBob3Jpem9udGFsQWxpZ25tZW50OiBcImxlZnRcIiB8IFwiY2VudGVyXCIgfCBcImp1c3RpZnlcIiB8IFwicmlnaHRcIixcclxuICAgIHZlcnRpY2FsQWxpZ25tZW50OiBcInRvcFwiIHwgXCJjZW50ZXJcIiB8IFwiYm90dG9tXCIsXHJcbn1cclxuaW50ZXJmYWNlIFdlYnNvY2tldEJ1dHRvbkltYWdlSW5mbyB7XHJcbiAgICBzb3VyY2U6IHN0cmluZyxcclxuICAgIC8vL2lmIHRydWUsIHRoZSBpbWFnZSB3aWxsIGJlIHNldCB0byBmaWxsIGl0cyBjb250YWluZXIgYnkgc3RyZXRjaGluZy9zaHJpbmtpbmcsIGFuZCB0aGUgb25seSBwcm9wZXJ0aWVzIHRoYXQgbWF0dGVyXHJcbiAgICAvLy9hcmUgaW1hZ2VXaWR0aCBhbmQgaW1hZ2VIZWlnaHRcclxuICAgIHNpbXBsZUZpbGw/OiBib29sZWFuLFxyXG4gICAgLy9pZiBpbWFnZVdpZHRoIGFuZC9vciBpbWFnZUhlaWdodCBhcmUgc2V0LCBmaXQgaXMgaWdub3JlZFxyXG4gICAgaW1hZ2VXaWR0aD86IFByb3BlcnR5LldpZHRoLFxyXG4gICAgaW1hZ2VIZWlnaHQ/OiBQcm9wZXJ0eS5IZWlnaHQsXHJcbiAgICBmaXQ/OiBQcm9wZXJ0eS5PYmplY3RGaXQsXHJcbiAgICBwb3NpdGlvbj86IFByb3BlcnR5Lk9iamVjdFBvc2l0aW9uLFxyXG59XHJcblxyXG5pbnRlcmZhY2UgV2Vic29ja2V0QnV0dG9uUHJvcHMge1xyXG4gICAgZGlzcGxheUtpbmQ6IFwiZW1wdHlcIiB8IFwidGV4dFwiIHwgXCJpbWFnZVwiIHwgXCJ2aWV3XCIsXHJcbiAgICB3aWR0aDogUHJvcGVydHkuV2lkdGgsXHJcbiAgICBoZWlnaHQ6IFByb3BlcnR5LkhlaWdodCxcclxuICAgIGJhY2tncm91bmRDb2xvcj86IFByb3BlcnR5LkJhY2tncm91bmRDb2xvcixcclxuICAgIHRleHQ/OiBXZWJzb2NrZXRCdXR0b25UZXh0SW5mbyxcclxuICAgIGltYWdlPzogV2Vic29ja2V0QnV0dG9uSW1hZ2VJbmZvLFxyXG4gICAgdmlld1Byb3BzPzogVmlld1Byb3BzLFxyXG4gICAgY3VzdG9tU3R5bGU/OiBSZWFjdC5DU1NQcm9wZXJ0aWVzLFxyXG4gICAgdXNlRGVmYXVsdEJvcmRlcj86IGJvb2xlYW4sXHJcbiAgICBvbkNsaWNrV3M6IHN0cmluZyxcclxuICAgIG9uQ2xpY2tXc0RhdGE6IHN0cmluZ1xyXG59XHJcblxyXG5pbnRlcmZhY2UgV2Vic29ja2V0QnV0dG9uU3RhdGUge1xyXG4gICAgb25DbGlja1dzRGF0YTogb2JqZWN0XHJcbn1cclxuXHJcbmNsYXNzIFdlYnNvY2tldEJ1dHRvbiBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxXZWJzb2NrZXRCdXR0b25Qcm9wcywgV2Vic29ja2V0QnV0dG9uU3RhdGU+IHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzOiBXZWJzb2NrZXRCdXR0b25Qcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICBvbkNsaWNrV3NEYXRhOiBKU09OLnBhcnNlKHByb3BzLm9uQ2xpY2tXc0RhdGEpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmVuZGVyKCk6IFJlYWN0LlJlYWN0Tm9kZSB7XHJcbiAgICAgICAgbGV0IG9uYyA9ICgpID0+IHtcclxuICAgICAgICAgICAgc2VuZEFjdGlvbih7YWN0aW9uOiB0aGlzLnByb3BzLm9uQ2xpY2tXcywgLi4udGhpcy5zdGF0ZS5vbkNsaWNrV3NEYXRhfSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBsZXQgZWxlbSA9IDw+PC8+O1xyXG4gICAgICAgIGlmICh0aGlzLnByb3BzLmRpc3BsYXlLaW5kID09PSBcInRleHRcIikge1xyXG4gICAgICAgICAgICBsZXQgdGV4dCA9IHRoaXMucHJvcHMudGV4dCBhcyBXZWJzb2NrZXRCdXR0b25UZXh0SW5mbztcclxuICAgICAgICAgICAgbGV0IHZhID0gdGV4dC52ZXJ0aWNhbEFsaWdubWVudDtcclxuICAgICAgICAgICAgbGV0IGZsZXhBbGlnbiA9IHZhID09PSBcInRvcFwiID8gXCJmbGV4LXN0YXJ0XCIgOiB2YSA9PT0gXCJib3R0b21cIiA/IFwiZmxleC1lbmRcIiA6IHZhO1xyXG4gICAgICAgICAgICBlbGVtID0gPGRpdiBzdHlsZT17e2Rpc3BsYXk6IFwiZmxleFwiLCBqdXN0aWZ5Q29udGVudDogZmxleEFsaWduLCBmbGV4RGlyZWN0aW9uOiBcImNvbHVtblwiLCB3aWR0aDogXCIxMDAlXCIsIGhlaWdodDogXCIxMDAlXCJ9fT5cclxuICAgICAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPHAgc3R5bGU9e3tjb2xvcjogdGV4dC5jb2xvciwgZm9udFNpemU6IHRleHQuZm9udFNpemUsIGZvbnQ6IHRleHQuZm9udCwgdGV4dEFsaWduOiB0ZXh0Lmhvcml6b250YWxBbGlnbm1lbnQsIHBhZGRpbmc6IFwiNXB4XCJ9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAge3RleHQudGV4dH1cclxuICAgICAgICAgICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnByb3BzLmRpc3BsYXlLaW5kID09PSBcImltYWdlXCIpIHtcclxuICAgICAgICAgICAgbGV0IGltYWdlID0gdGhpcy5wcm9wcy5pbWFnZSBhcyBXZWJzb2NrZXRCdXR0b25JbWFnZUluZm87XHJcbiAgICAgICAgICAgIGlmIChpbWFnZS5zaW1wbGVGaWxsKSB7XHJcbiAgICAgICAgICAgICAgICBlbGVtID0gPGRpdiBzdHlsZT17e3Bvc2l0aW9uOiBcImFic29sdXRlXCIsIHdpZHRoOiBcIjEwMCVcIiwgaGVpZ2h0OiBcIjEwMCVcIn19PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3tkaXNwbGF5OiBcImZsZXhcIiwganVzdGlmeUNvbnRlbnQ6IFwiY2VudGVyXCIsIGFsaWduQ29udGVudDogXCJjZW50ZXJcIiwgd2lkdGg6IFwiMTAwJVwiLCBoZWlnaHQ6IFwiMTAwJVwifX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPXtpbWFnZS5zb3VyY2V9IHN0eWxlPXt7d2lkdGg6IGltYWdlLmltYWdlV2lkdGggPz8gXCIxMDAlXCIsIGhlaWdodDogaW1hZ2UuaW1hZ2VIZWlnaHQgPz8gXCIxMDAlXCJ9fSAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc3R5bGU6IGFueSA9IHt9O1xyXG4gICAgICAgICAgICAgICAgbGV0IGhhc1cgPSB0eXBlb2YgaW1hZ2UuaW1hZ2VXaWR0aCAhPT0gXCJ1bmRlZmluZWRcIjtcclxuICAgICAgICAgICAgICAgIGxldCBoYXNIID0gdHlwZW9mIGltYWdlLmltYWdlSGVpZ2h0ICE9PSBcInVuZGVmaW5lZFwiO1xyXG4gICAgICAgICAgICAgICAgaWYgKGhhc1cgfHwgaGFzSCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChoYXNXKSBzdHlsZS53aWR0aCA9IGltYWdlLmltYWdlV2lkdGg7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGhhc0gpIHN0eWxlLmhlaWdodCA9IGltYWdlLmltYWdlSGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGltYWdlLmZpdCAhPT0gXCJ1bmRlZmluZWRcIikgc3R5bGUub2JqZWN0Rml0ID0gaW1hZ2UuZml0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBpbWFnZS5wb3NpdGlvbiAhPT0gXCJ1bmRlZmluZWRcIikgc3R5bGUub2JqZWN0UG9zaXRpb24gPSBpbWFnZS5wb3NpdGlvbjtcclxuICAgICAgICAgICAgICAgIGVsZW0gPSA8ZGl2IHN0eWxlPXt7cG9zaXRpb246IFwiYWJzb2x1dGVcIiwgd2lkdGg6IFwiMTAwJVwiLCBoZWlnaHQ6IFwiMTAwJVwifX0+XHJcbiAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9e2ltYWdlLnNvdXJjZX0gc3R5bGU9e3N0eWxlfSAvPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMucHJvcHMuZGlzcGxheUtpbmQgPT09IFwidmlld1wiKSB7XHJcbiAgICAgICAgICAgIGVsZW0gPSA8VmlldyB7Li4udGhpcy5wcm9wcy52aWV3UHJvcHMgYXMgYW55fSAvPlxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLmRpc3BsYXlLaW5kICE9PSBcImVtcHR5XCIpIGNvbnNvbGUuZXJyb3IoYFVua25vd24gZGlzcGxheSBraW5kICR7dGhpcy5wcm9wcy5kaXNwbGF5S2luZH0sIGRlZmF1bHRpbmcgdG8gZW1wdHlgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHN0eWxlOiBhbnkgPSB7fTtcclxuICAgICAgICBpZiAodHlwZW9mIHRoaXMucHJvcHMuY3VzdG9tU3R5bGUgIT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgc3R5bGUgPSB7Li4udGhpcy5wcm9wcy5jdXN0b21TdHlsZX07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnByb3BzLnVzZURlZmF1bHRCb3JkZXIpIHtcclxuICAgICAgICAgICAgc3R5bGUuYm9yZGVyUmFkaXVzID0gXCI1cHhcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgc3R5bGUud2lkdGggPSB0aGlzLnByb3BzLndpZHRoO1xyXG4gICAgICAgIHN0eWxlLmhlaWdodCA9IHRoaXMucHJvcHMuaGVpZ2h0O1xyXG4gICAgICAgIHJldHVybiA8ZGl2IG9uQ2xpY2s9e29uY30gY2xhc3NOYW1lPVwid2Vic29ja2V0QnV0dG9uXCIgc3R5bGU9e3N0eWxlfT5cclxuICAgICAgICAgICAge2VsZW19XHJcbiAgICAgICAgPC9kaXY+O1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBXZWJzb2NrZXRCdXR0b25FZGl0b3IgZXh0ZW5kcyBDb21wb25lbnRFZGl0b3I8Q29tcG9uZW50RWRpdG9yQmFzZVByb3BzLCBXZWJzb2NrZXRCdXR0b25Qcm9wcz4ge1xyXG4gICAgY29tcG9uZW50RWRpdG9yOiBXcmFwcGVkQ29tcG9uZW50RWRpdG9yIHwgbnVsbDtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzOiBDb21wb25lbnRFZGl0b3JCYXNlUHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnRFZGl0b3IgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSBwcm9wcy5pbml0aWFsSlNPTjtcclxuICAgICAgICBpZiAodGhpcy5zdGF0ZS5kaXNwbGF5S2luZCA9PT0gXCJ2aWV3XCIpIHtcclxuICAgICAgICAgICAgdGhpcy5jb21wb25lbnRFZGl0b3IgPSBXcmFwcGVkQ29tcG9uZW50RWRpdG9yLnNhZmVDb25zdHJ1Y3RvcihWaWV3RWRpdG9yLCB7aW5pdGlhbEpTT046IHRoaXMuc3RhdGUudmlld1Byb3BzIGFzIFZpZXdQcm9wc30pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHN0YXRpYyBnZXREZWZhdWx0Q29tcG9uZW50UHJvcHMoKTogV2Vic29ja2V0QnV0dG9uUHJvcHMge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGRpc3BsYXlLaW5kOiBcInRleHRcIixcclxuICAgICAgICAgICAgd2lkdGg6IFwiNzBweFwiLFxyXG4gICAgICAgICAgICBoZWlnaHQ6IFwiNzBweFwiLFxyXG4gICAgICAgICAgICB0ZXh0OiB7XHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkhlbGxvIVwiLFxyXG4gICAgICAgICAgICAgICAgY29sb3I6IFwiIzAwMDAwMFwiLFxyXG4gICAgICAgICAgICAgICAgZm9udFNpemU6IFwiMTZweFwiLFxyXG4gICAgICAgICAgICAgICAgZm9udDogXCJVYnVudHVcIixcclxuICAgICAgICAgICAgICAgIGhvcml6b250YWxBbGlnbm1lbnQ6IFwiY2VudGVyXCIsXHJcbiAgICAgICAgICAgICAgICB2ZXJ0aWNhbEFsaWdubWVudDogXCJjZW50ZXJcIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB1c2VEZWZhdWx0Qm9yZGVyOiB0cnVlLFxyXG4gICAgICAgICAgICBvbkNsaWNrV3M6IFwiY29yZS5wcmludGxuXCIsXHJcbiAgICAgICAgICAgIG9uQ2xpY2tXc0RhdGE6IFwie1xcXCJtZXNzYWdlXFxcIjogXFxcIkhlbGxvIVxcXCJ9XCJcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICB0b0pTT04oKSB7XHJcbiAgICAgICAgbGV0IGFucyA9IHsuLi50aGlzLnN0YXRlfTtcclxuICAgICAgICBpZiAodGhpcy5zdGF0ZS5kaXNwbGF5S2luZCA9PT0gXCJ2aWV3XCIpIHtcclxuICAgICAgICAgICAgbGV0IGNqID0gdGhpcy5jb21wb25lbnRFZGl0b3I/LnRvSlNPTigpO1xyXG4gICAgICAgICAgICBhbnMudmlld1Byb3BzID0gY2o7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBhbnM7XHJcbiAgICB9XHJcbiAgICBjaGFuZ2VLaW5kKG5ld0tpbmQ6IFwiZW1wdHlcIiB8IFwidGV4dFwiIHwgXCJpbWFnZVwiIHwgXCJ2aWV3XCIpIHtcclxuICAgICAgICBsZXQgdGV4dDogYW55ID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIGxldCBpbWFnZSA9IHVuZGVmaW5lZDtcclxuICAgICAgICBsZXQgY29tcG9uZW50OiBWaWV3UHJvcHMgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgaWYgKG5ld0tpbmQgPT09IFwidGV4dFwiKSB7XHJcbiAgICAgICAgICAgIHRleHQgPSB7XHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIlRleHRcIixcclxuICAgICAgICAgICAgICAgIGNvbG9yOiBcImJsYWNrXCIsXHJcbiAgICAgICAgICAgICAgICBmb250U2l6ZTogXCIxNlwiLFxyXG4gICAgICAgICAgICAgICAgZm9udDogXCJBcmlhbFwiLFxyXG4gICAgICAgICAgICAgICAgaG9yaXpvbnRhbEFsaWdubWVudDogXCJjZW50ZXJcIixcclxuICAgICAgICAgICAgICAgIHZlcnRpY2FsQWxpZ25tZW50OiBcImNlbnRlclwiLFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChuZXdLaW5kID09PSBcImltYWdlXCIpIHtcclxuICAgICAgICAgICAgaW1hZ2UgPSB7XHJcbiAgICAgICAgICAgICAgICBzb3VyY2U6IFwiaHR0cHM6Ly91cGxvYWQud2lraW1lZGlhLm9yZy93aWtpcGVkaWEvY29tbW9ucy8zLzNmL0pQRUdfZXhhbXBsZV9mbG93ZXIuanBnXCIsXHJcbiAgICAgICAgICAgICAgICBzaW1wbGVGaWxsOiB0cnVlLFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChuZXdLaW5kID09PSBcInZpZXdcIikge1xyXG4gICAgICAgICAgICBjb21wb25lbnQgPSB7XHJcbiAgICAgICAgICAgICAgICB2aWV3RGF0YToge1xyXG4gICAgICAgICAgICAgICAgICAgIHBsdWdpbk5hbWU6IFwiY29yZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudE5hbWU6IFwiQXV0b0dyaWRcIixcclxuICAgICAgICAgICAgICAgICAgICBjb21wb25lbnRQcm9wczogQXV0b0dyaWRFZGl0b3IuZ2V0RGVmYXVsdENvbXBvbmVudFByb3BzKClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudEVkaXRvciA9IFdyYXBwZWRDb21wb25lbnRFZGl0b3Iuc2FmZUNvbnN0cnVjdG9yKFZpZXdFZGl0b3IsIHtpbml0aWFsSlNPTjogY29tcG9uZW50fSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5jb21wb25lbnRFZGl0b3IgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgZGlzcGxheUtpbmQ6IG5ld0tpbmQsXHJcbiAgICAgICAgICAgIHRleHQsIGltYWdlLCB2aWV3UHJvcHM6IGNvbXBvbmVudFxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgICB1cGRhdGVUZXh0KGNoYW5nZTogUGFydGlhbDxXZWJzb2NrZXRCdXR0b25UZXh0SW5mbz4pIHtcclxuICAgICAgICBsZXQgdG1wID0gey4uLnRoaXMuc3RhdGUudGV4dH0gYXMgV2Vic29ja2V0QnV0dG9uVGV4dEluZm87XHJcbiAgICAgICAgZm9yIChsZXQgW2ssIHZdIG9mIE9iamVjdC5lbnRyaWVzKGNoYW5nZSkpICh0bXAgYXMgYW55KVtrXSA9IHY7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dGV4dDogdG1wfSk7XHJcbiAgICB9O1xyXG4gICAgdXBkYXRlSW1hZ2UoY2hhbmdlOiBQYXJ0aWFsPFdlYnNvY2tldEJ1dHRvbkltYWdlSW5mbz4pIHtcclxuICAgICAgICBsZXQgdG1wID0gey4uLnRoaXMuc3RhdGUuaW1hZ2V9IGFzIFdlYnNvY2tldEJ1dHRvbkltYWdlSW5mbztcclxuICAgICAgICBmb3IgKGxldCBbaywgdl0gb2YgT2JqZWN0LmVudHJpZXMoY2hhbmdlKSkge1xyXG4gICAgICAgICAgICAodG1wIGFzIGFueSlba10gPSB2O1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtpbWFnZTogdG1wfSk7XHJcbiAgICB9XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgbGV0IGlubmVyID0gPD48Lz47XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuZGlzcGxheUtpbmQgPT09IFwidGV4dFwiKSB7XHJcbiAgICAgICAgICAgIGxldCB0ID0gdGhpcy5zdGF0ZS50ZXh0IGFzIFdlYnNvY2tldEJ1dHRvblRleHRJbmZvO1xyXG4gICAgICAgICAgICBpbm5lciA9IDw+XHJcbiAgICAgICAgICAgICAgICA8RWRpdG9yVGV4dCBsYWJlbD1cIlRleHQ6IFwiIHRleHQ9e3QudGV4dCBhcyBzdHJpbmd9IG9uVGV4dENoYW5nZWQ9e250ID0+IHRoaXMudXBkYXRlVGV4dCh7dGV4dDogbnR9KX0vPlxyXG4gICAgICAgICAgICAgICAgPEVkaXRvclRleHQgbGFiZWw9XCJDb2xvcjogXCIgdGV4dD17dC5jb2xvciBhcyBzdHJpbmd9IG9uVGV4dENoYW5nZWQ9e250ID0+IHRoaXMudXBkYXRlVGV4dCh7Y29sb3I6IG50fSl9Lz5cclxuICAgICAgICAgICAgICAgIDxFZGl0b3JUZXh0IGxhYmVsPVwiRm9udCBTaXplOiBcIiB0ZXh0PXt0LmZvbnRTaXplIGFzIHN0cmluZ30gb25UZXh0Q2hhbmdlZD17bnQgPT4gdGhpcy51cGRhdGVUZXh0KHtmb250U2l6ZTogbnR9KX0vPlxyXG4gICAgICAgICAgICAgICAgPEVkaXRvckRyb3Bkb3duIGxhYmVsPVwiSG9yaXpvbnRhbCBBbGlnbm1lbnQ6IFwiIHZhbHVlPXt0Lmhvcml6b250YWxBbGlnbm1lbnR9IHZhbHVlcz17W1wibGVmdFwiLCBcImNlbnRlclwiLCBcImp1c3RpZnlcIiwgXCJyaWdodFwiXX0gb25TZWxlY3Rpb25DaGFuZ2VkPXtudCA9PiB0aGlzLnVwZGF0ZVRleHQoe2hvcml6b250YWxBbGlnbm1lbnQ6IG50fSl9IC8+XHJcbiAgICAgICAgICAgICAgICA8RWRpdG9yRHJvcGRvd24gbGFiZWw9XCJWZXJ0aWNhbCBBbGlnbm1lbnQ6IFwiIHZhbHVlPXt0LnZlcnRpY2FsQWxpZ25tZW50fSB2YWx1ZXM9e1tcInRvcFwiLCBcImNlbnRlclwiLCBcImJvdHRvbVwiXX0gb25TZWxlY3Rpb25DaGFuZ2VkPXtudCA9PiB0aGlzLnVwZGF0ZVRleHQoe3ZlcnRpY2FsQWxpZ25tZW50OiBudH0pfSAvPlxyXG4gICAgICAgICAgICA8Lz47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmRpc3BsYXlLaW5kID09PSBcImltYWdlXCIpIHtcclxuICAgICAgICAgICAgbGV0IGkgPSB0aGlzLnN0YXRlLmltYWdlIGFzIFdlYnNvY2tldEJ1dHRvbkltYWdlSW5mbztcclxuICAgICAgICAgICAgaW5uZXIgPSA8PlxyXG4gICAgICAgICAgICAgICAgPEVkaXRvclRleHQgbGFiZWw9XCJTb3VyY2U6IFwiIHRleHQ9e2kuc291cmNlIGFzIHN0cmluZ30gb25UZXh0Q2hhbmdlZD17bnQgPT4gdGhpcy51cGRhdGVJbWFnZSh7c291cmNlOiBudH0pfS8+XHJcbiAgICAgICAgICAgICAgICA8RWRpdG9yQ2hlY2tib3ggbGFiZWw9XCJTaW1wbGUgRmlsbDogXCIgdmFsdWU9e2kuc2ltcGxlRmlsbCA/PyBmYWxzZX0gb25WYWx1ZUNoYW5nZWQ9e252ID0+IHRoaXMudXBkYXRlSW1hZ2Uoe3NpbXBsZUZpbGw6IG52fSl9IC8+XHJcbiAgICAgICAgICAgICAgICA8RWRpdG9yVGV4dE9wdGlvbmFsIGRpc2FibGVkPXt0eXBlb2YgaS5pbWFnZVdpZHRoID09PSBcInVuZGVmaW5lZFwifSBsYWJlbD1cIkltYWdlIFdpZHRoOiBcIiB0ZXh0PXtpLmltYWdlV2lkdGggYXMgc3RyaW5nIHwgdW5kZWZpbmVkID8/IFwiXCJ9IG9uRGlzYWJsZWRDaGFuZ2VkPXtudiA9PiB0aGlzLnVwZGF0ZUltYWdlKHtpbWFnZVdpZHRoOiBudiA/ICB1bmRlZmluZWQgOiBcIjQwcHhcIn0pfSBvblRleHRDaGFuZ2VkPXtudCA9PiB0aGlzLnVwZGF0ZUltYWdlKHtpbWFnZVdpZHRoOiBudH0pfS8+XHJcbiAgICAgICAgICAgICAgICA8RWRpdG9yVGV4dE9wdGlvbmFsIGRpc2FibGVkPXt0eXBlb2YgaS5pbWFnZUhlaWdodCA9PT0gXCJ1bmRlZmluZWRcIn0gbGFiZWw9XCJJbWFnZSBIZWlnaHQ6IFwiIHRleHQ9e2kuaW1hZ2VIZWlnaHQgYXMgc3RyaW5nIHwgdW5kZWZpbmVkID8/IFwiXCJ9IG9uRGlzYWJsZWRDaGFuZ2VkPXtudiA9PiB0aGlzLnVwZGF0ZUltYWdlKHtpbWFnZUhlaWdodDogbnYgPyAgdW5kZWZpbmVkIDpcIjQwcHhcIn0pfSBvblRleHRDaGFuZ2VkPXtudCA9PiB0aGlzLnVwZGF0ZUltYWdlKHtpbWFnZUhlaWdodDogbnR9KX0vPlxyXG4gICAgICAgICAgICAgICAgPEVkaXRvckRyb3Bkb3duT3B0aW9uYWwgZGlzYWJsZWQ9e3R5cGVvZiBpLmZpdCA9PT0gXCJ1bmRlZmluZWRcIn0gbGFiZWw9XCJGaXQ6IFwiIHZhbHVlPXtpLmZpdH0gdmFsdWVzPXtbXCJjb250YWluXCIsIFwiY292ZXJcIiwgXCJmaWxsXCIsIFwibm9uZVwiLCBcInNjYWxlLWRvd25cIl19IG9uRGlzYWJsZWRDaGFuZ2VkPXtudiA9PiB0aGlzLnVwZGF0ZUltYWdlKHtmaXQ6IG52ID8gIHVuZGVmaW5lZCA6IFwiZmlsbFwifSl9IG9uU2VsZWN0aW9uQ2hhbmdlZD17bnYgPT4gdGhpcy51cGRhdGVJbWFnZSh7Zml0OiBudn0pfSAvPlxyXG4gICAgICAgICAgICAgICAgPEVkaXRvclRleHRPcHRpb25hbCBkaXNhYmxlZD17dHlwZW9mIGkucG9zaXRpb24gPT09IFwidW5kZWZpbmVkXCJ9IGxhYmVsPVwiUG9zaXRpb246IFwiIHRleHQ9e2kucG9zaXRpb24gYXMgc3RyaW5nIHwgdW5kZWZpbmVkID8/IFwiXCJ9IG9uRGlzYWJsZWRDaGFuZ2VkPXtudiA9PiB0aGlzLnVwZGF0ZUltYWdlKHtwb3NpdGlvbjogbnYgPyAgdW5kZWZpbmVkIDogXCJjZW50ZXIgY2VudGVyXCJ9KX0gb25UZXh0Q2hhbmdlZD17bnQgPT4gdGhpcy51cGRhdGVJbWFnZSh7cG9zaXRpb246IG50fSl9Lz5cclxuICAgICAgICAgICAgPC8+O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5zdGF0ZS5kaXNwbGF5S2luZCA9PT0gXCJ2aWV3XCIpIHtcclxuICAgICAgICAgICAgaW5uZXIgPSAodGhpcy5jb21wb25lbnRFZGl0b3IgYXMgV3JhcHBlZENvbXBvbmVudEVkaXRvcikucmVuZGVyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiA8ZGl2PlxyXG4gICAgICAgICAgICA8RWRpdG9yRHJvcGRvd24gbGFiZWw9XCJCdXR0b24gS2luZDogXCIgdmFsdWU9e3RoaXMuc3RhdGUuZGlzcGxheUtpbmR9IHZhbHVlcz17W1wiZW1wdHlcIiwgXCJ0ZXh0XCIsIFwiaW1hZ2VcIiwgXCJjb21wb25lbnRcIl19IG9uU2VsZWN0aW9uQ2hhbmdlZD17dGhpcy5jaGFuZ2VLaW5kLmJpbmQodGhpcyl9IC8+XHJcbiAgICAgICAgICAgIDxFZGl0b3JUZXh0IGxhYmVsPVwiV2lkdGg6IFwiIHRleHQ9e3RoaXMuc3RhdGUud2lkdGggYXMgc3RyaW5nfSBvblRleHRDaGFuZ2VkPXtudCA9PiB0aGlzLnNldFN0YXRlKHt3aWR0aDogbnR9KX0vPlxyXG4gICAgICAgICAgICA8RWRpdG9yVGV4dCBsYWJlbD1cIkhlaWdodDogXCIgdGV4dD17dGhpcy5zdGF0ZS5oZWlnaHQgYXMgc3RyaW5nfSBvblRleHRDaGFuZ2VkPXtudCA9PiB0aGlzLnNldFN0YXRlKHtoZWlnaHQ6IG50fSl9Lz5cclxuICAgICAgICAgICAge2lubmVyfVxyXG4gICAgICAgICAgICA8RWRpdG9yVGV4dCBsYWJlbD1cIldlYnNvY2tldCBBY3Rpb246IFwiIHRleHQ9e3RoaXMuc3RhdGUub25DbGlja1dzIGFzIHN0cmluZ30gb25UZXh0Q2hhbmdlZD17bnQgPT4gdGhpcy5zZXRTdGF0ZSh7b25DbGlja1dzOiBudH0pfS8+XHJcbiAgICAgICAgICAgIDxFZGl0b3JUZXh0IGxhYmVsPVwiV2Vic29ja2V0IEFjdGlvbiBEYXRhOiBcIiB0ZXh0PXt0aGlzLnN0YXRlLm9uQ2xpY2tXc0RhdGEgYXMgc3RyaW5nfSBvblRleHRDaGFuZ2VkPXtudCA9PiB0aGlzLnNldFN0YXRlKHtvbkNsaWNrV3NEYXRhOiBudH0pfS8+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICB9XHJcbn1cclxuXHJcbmxldCBwczogUGx1Z2luU2NyaXB0ID0ge1xyXG4gICAgY29tcG9uZW50czoge1xyXG4gICAgICAgIFwiV2Vic29ja2V0QnV0dG9uXCI6IFdlYnNvY2tldEJ1dHRvbiwgXHJcbiAgICAgICAgXCJBdXRvR3JpZFwiOiBBdXRvR3JpZCxcclxuICAgICAgICBcIklGcmFtZVwiOiBJRnJhbWVcclxuICAgIH0sXHJcbiAgICBjb21wb25lbnRFZGl0b3JzOiB7XHJcbiAgICAgICAgXCJBdXRvR3JpZFwiOiBBdXRvR3JpZEVkaXRvcixcclxuICAgICAgICBcIldlYnNvY2tldEJ1dHRvblwiOiBXZWJzb2NrZXRCdXR0b25FZGl0b3IsXHJcbiAgICAgICAgXCJJRnJhbWVcIjogSUZyYW1lRWRpdG9yXHJcbiAgICB9LFxyXG4gICAgY3NzOiB7a2luZDogXCJsaW5rXCIsIGRhdGE6IFwiL3BsdWdpbnMvY29yZS9jb3JlLmNzc1wifVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgcHM7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9