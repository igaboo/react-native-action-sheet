"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var React = _interopRequireWildcard(require("react"));
var _ActionSheet = _interopRequireDefault(require("./ActionSheet"));
var _CustomActionSheet = _interopRequireDefault(require("./ActionSheet/CustomActionSheet.js"));
var _context = require("./context.js");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
// NativeActionSheet will always be custom when on Android/web
var _default = exports.default = /*#__PURE__*/React.forwardRef(function ActionSheetProvider({
  children,
  useNativeDriver,
  useCustomActionSheet = false
}, ref) {
  const actionSheetRef = React.useRef(null);
  const context = React.useMemo(() => ({
    showActionSheetWithOptions: (options, callback) => {
      if (actionSheetRef.current) {
        actionSheetRef.current.showActionSheetWithOptions(options, callback);
      }
    }
  }), [actionSheetRef]);
  React.useImperativeHandle(ref, () => ({
    // backwards compatible with 13.x before context was being passed right on the ref
    getContext: () => context,
    showActionSheetWithOptions: context.showActionSheetWithOptions
  }), [context]);
  const ActionSheet = React.useMemo(() => useCustomActionSheet ? _CustomActionSheet.default : _ActionSheet.default, [useCustomActionSheet]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_context.Provider, {
    value: context,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(ActionSheet, {
      ref: actionSheetRef,
      useNativeDriver: useNativeDriver,
      children: React.Children.only(children)
    })
  });
});
//# sourceMappingURL=ActionSheetProvider.js.map