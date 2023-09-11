"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var streampayments_react_1 = require("streampayments-react");
var container_1 = require("../shared/components/container");
var table_1 = __importDefault(require("../shared/components/table"));
var streampay_logo_1 = __importDefault(require("../shared/icons/streampay-logo"));
var MyWidget = function (props) {
    var _a;
    var order = props.order;
    var data = (0, medusa_react_1.useAdminCustomQuery)("/orders/stream-payments/".concat(order.id), ["admin_streampay"]).data;
    if (!order.payments.some(function (p) { return p.provider_id === "streampay"; })) {
        return null;
    }
    return ((0, jsx_runtime_1.jsx)(container_1.Container, __assign({ title: "StreamPayments", icon: (0, jsx_runtime_1.jsx)(streampay_logo_1.default, {}) }, { children: (0, jsx_runtime_1.jsx)("div", __assign({ className: "flex flex-col" }, { children: data && ((_a = data === null || data === void 0 ? void 0 : data.payments) === null || _a === void 0 ? void 0 : _a.length) ? ((0, jsx_runtime_1.jsx)(table_1.default, { payments: data.payments })) : null })) })));
};
exports.config = {
    zone: "order.details.after",
};
exports.default = MyWidget;