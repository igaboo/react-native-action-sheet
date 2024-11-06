"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = connectActionSheet;
var _hoistNonReactStatics = _interopRequireDefault(require("hoist-non-react-statics"));
var React = _interopRequireWildcard(require("react"));
var _context = require("./context.js");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function connectActionSheet(WrappedComponent) {
  const ConnectedActionSheet = props => {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_context.Consumer, {
      children: ({
        showActionSheetWithOptions
      }) => {
        return /*#__PURE__*/(0, _jsxRuntime.jsx)(WrappedComponent, {
          ...props,
          showActionSheetWithOptions: showActionSheetWithOptions
        });
      }
    });
  };
  return (0, _hoistNonReactStatics.default)(ConnectedActionSheet, WrappedComponent);
}
//# sourceMappingURL=connectActionSheet.js.map