"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var react_1 = require("react");
var WebsocketButton = /** @class */ (function (_super) {
    __extends(WebsocketButton, _super);
    function WebsocketButton() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WebsocketButton.prototype.render = function () {
        var _this = this;
        var onc = function () {
            _this.props.globalInfo.getWebsocket().send(_this.props.onClickWs);
        };
        return (<a href="#" style={{ padding: "2px", border: "1px solid black", borderRadius: "5px", cursor: "pointer" }}>
            {this.props.text}
        </a>);
    };
    return WebsocketButton;
}(react_1["default"].Component));
var ps = { "WebsocketButton": WebsocketButton };
exports.ps = ps;
