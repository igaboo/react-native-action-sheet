"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _TouchableNativeFeedbackSafe = _interopRequireDefault(require("./TouchableNativeFeedbackSafe.js"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const BLACK_54PC_TRANSPARENT = '#0000008a';
const BLACK_87PC_TRANSPARENT = '#000000de';
const DESTRUCTIVE_COLOR = '#d32f2f';

/**
 * Can be used as a React ref for a component to auto-focus for accessibility on render.
 * @param ref The component to auto-focus
 */
const focusViewOnRender = ref => {
  if (ref) {
    const reactTag = (0, _reactNative.findNodeHandle)(ref);
    if (reactTag) {
      if (_reactNative.Platform.OS === 'android') {
        // @ts-ignore: sendAccessibilityEvent is missing from @types/react-native
        _reactNative.UIManager.sendAccessibilityEvent(reactTag,
        // @ts-ignore: AccessibilityEventTypes is missing from @types/react-native
        _reactNative.UIManager.AccessibilityEventTypes.typeViewFocused);
      } else {
        _reactNative.AccessibilityInfo.setAccessibilityFocus(reactTag);
      }
    }
  }
};
const isIndexDestructive = (index, destructiveIndex) => {
  if (Array.isArray(destructiveIndex)) {
    return destructiveIndex.includes(index);
  }
  return index === destructiveIndex;
};
const isIndexDisabled = (index, disabledButtonIndices = []) => {
  return disabledButtonIndices.includes(index);
};
class ActionGroup extends React.Component {
  static defaultProps = {
    title: null,
    message: null,
    showSeparators: false,
    tintIcons: true,
    textStyle: {},
    rippleColor: 'rgba(180, 180, 180, 1)'
  };
  render() {
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: [styles.groupContainer, this.props.containerStyle],
      children: [this._renderTitleContent(), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.ScrollView, {
        children: this._renderOptionViews()
      })]
    });
  }
  _renderRowSeparator = key => {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: [styles.rowSeparator, this.props.separatorStyle]
    }, `separator-${key}`);
  };
  _renderTitleContent = () => {
    const {
      title,
      titleTextStyle,
      message,
      messageTextStyle,
      showSeparators
    } = this.props;
    if (!title && !message) {
      return null;
    }
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
        style: [styles.titleContainer, {
          paddingBottom: showSeparators ? 24 : 16
        }],
        children: [!!title && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
          style: [styles.title, titleTextStyle],
          children: title
        }), !!message && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
          style: [styles.message, messageTextStyle],
          children: message
        })]
      }), !!showSeparators && this._renderRowSeparator('title')]
    });
  };
  _renderIconElement = (iconSource, color) => {
    const {
      tintIcons
    } = this.props;
    if (!iconSource) {
      return null;
    }
    if (typeof iconSource === 'number') {
      const iconStyle = [styles.icon, {
        tintColor: tintIcons ? color : undefined
      }];
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Image, {
        fadeDuration: 0,
        source: iconSource,
        resizeMode: "contain",
        style: iconStyle
      });
    } else {
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
        style: styles.icon,
        children: iconSource
      });
    }
  };
  _renderOptionViews = () => {
    const {
      options,
      icons,
      cancelButtonIndex,
      cancelButtonTintColor,
      destructiveButtonIndex,
      disabledButtonIndices,
      destructiveColor = DESTRUCTIVE_COLOR,
      onSelect,
      startIndex,
      length,
      textStyle,
      tintColor,
      autoFocus,
      showSeparators,
      rippleColor
    } = this.props;
    const optionViews = [];
    const nativeFeedbackBackground = _TouchableNativeFeedbackSafe.default.Ripple(rippleColor || 'rgba(180, 180, 180, 1)', false);
    for (let i = startIndex; i < startIndex + length; i++) {
      const defaultColor = tintColor ? tintColor : (textStyle || {}).color || BLACK_87PC_TRANSPARENT;
      const disabled = isIndexDisabled(i, disabledButtonIndices);
      const isCancelButton = i === cancelButtonIndex;
      const color = isIndexDestructive(i, destructiveButtonIndex) ? destructiveColor : isCancelButton ? cancelButtonTintColor || defaultColor : defaultColor;
      const iconSource = icons != null ? icons[i] : null;
      optionViews.push(/*#__PURE__*/(0, _jsxRuntime.jsxs)(_TouchableNativeFeedbackSafe.default, {
        ref: autoFocus && i === 0 ? focusViewOnRender : undefined,
        pressInDelay: 0,
        background: nativeFeedbackBackground,
        disabled: disabled,
        onPress: () => onSelect(i),
        style: [styles.button, disabled && styles.disabledButton],
        accessibilityRole: "button",
        accessibilityLabel: options[i],
        children: [this._renderIconElement(iconSource, color), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
          style: [styles.text, textStyle, {
            color
          }],
          children: options[i]
        })]
      }, i));
      if (showSeparators && i < startIndex + length - 1) {
        optionViews.push(this._renderRowSeparator(i));
      }
    }
    return optionViews;
  };
}
exports.default = ActionGroup;
const styles = _reactNative.StyleSheet.create({
  button: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    height: 56,
    paddingHorizontal: 16
  },
  disabledButton: {
    opacity: 0.5
  },
  groupContainer: {
    backgroundColor: '#ffffff',
    overflow: 'hidden'
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 32,
    justifyContent: 'center'
  },
  message: {
    marginTop: 12,
    fontSize: 14,
    color: BLACK_54PC_TRANSPARENT,
    textAlignVertical: 'center'
  },
  rowSeparator: {
    backgroundColor: '#dddddd',
    height: 1,
    width: '100%'
  },
  text: {
    fontSize: 16,
    color: BLACK_87PC_TRANSPARENT,
    textAlignVertical: 'center'
  },
  title: {
    fontSize: 16,
    color: BLACK_54PC_TRANSPARENT,
    textAlignVertical: 'center'
  },
  titleContainer: {
    alignItems: 'flex-start',
    padding: 16,
    paddingTop: 24
  }
});
//# sourceMappingURL=ActionGroup.js.map