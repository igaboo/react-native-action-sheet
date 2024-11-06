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
class ActionSheet extends React.Component {
  render() {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      pointerEvents: this.props.pointerEvents,
      style: {
        flex: 1
      },
      children: React.Children.only(this.props.children)
    });
  }
  showActionSheetWithOptions(dataOptions, onSelect) {
    // ...dataOptions include other keys which use in android and web, thats why `Android-Only options` Crash on IOS
    const {
      cancelButtonIndex,
      destructiveButtonIndex,
      options,
      tintColor,
      cancelButtonTintColor,
      disabledButtonIndices
    } = dataOptions;
    const iosOptions = {
      cancelButtonIndex,
      destructiveButtonIndex,
      options,
      tintColor,
      cancelButtonTintColor,
      disabledButtonIndices,
      // A null title or message on iOS causes a crash
      title: dataOptions.title || undefined,
      message: dataOptions.message || undefined,
      anchor: dataOptions.anchor || undefined,
      userInterfaceStyle: dataOptions.userInterfaceStyle || undefined
    };
    // @ts-ignore: Even though ActionSheetIOS supports array of numbers for `destructiveIndex` the types are not yet updated. See https://github.com/facebook/react-native/pull/18254.
    _reactNative.ActionSheetIOS.showActionSheetWithOptions(iosOptions, onSelect);
  }
}
exports.default = ActionSheet;
//# sourceMappingURL=index.ios.js.map