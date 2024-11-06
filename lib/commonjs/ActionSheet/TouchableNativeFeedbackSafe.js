"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
// This TouchableOpacity has the same staic method of TouchableNativeFeedback
class CustomTouchableOpacity extends React.Component {
  static SelectableBackground = () => ({});
  static SelectableBackgroundBorderless = () => ({});
  static Ripple = (color, borderless) => ({});
  render() {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
      ...this.props,
      children: this.props.children
    });
  }
}
const TouchableComponent = _reactNative.Platform.select({
  web: CustomTouchableOpacity,
  default: _reactNative.Platform.Version <= 20 ? CustomTouchableOpacity : _reactNative.TouchableNativeFeedback
});
class TouchableNativeFeedbackSafe extends React.Component {
  static SelectableBackground = TouchableComponent.SelectableBackground;
  static SelectableBackgroundBorderless = TouchableComponent.SelectableBackgroundBorderless;
  static Ripple = TouchableComponent.Ripple;
  render() {
    if (TouchableComponent === _reactNative.TouchableNativeFeedback) {
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(TouchableComponent, {
        ...this.props,
        style: {},
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
          style: this.props.style,
          children: this.props.children
        })
      });
    }

    // @ts-ignore: JSX element type 'TouchableComponent' does not have any construct or call signatures
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(TouchableComponent, {
      ...this.props,
      children: this.props.children
    });
  }
}
exports.default = TouchableNativeFeedbackSafe;
//# sourceMappingURL=TouchableNativeFeedbackSafe.js.map