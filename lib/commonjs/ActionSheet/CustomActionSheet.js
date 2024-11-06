"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _ActionGroup = _interopRequireDefault(require("./ActionGroup.js"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const OPACITY_ANIMATION_IN_TIME = 225;
const OPACITY_ANIMATION_OUT_TIME = 195;
const EASING_OUT = _reactNative.Easing.bezier(0.25, 0.46, 0.45, 0.94);
const EASING_IN = _reactNative.Easing.out(EASING_OUT);
const ESCAPE_KEY = 'Escape';

// Has same API as https://facebook.github.io/react-native/docs/actionsheetios.html
class CustomActionSheet extends React.Component {
  _actionSheetHeight = 360;
  state = {
    isVisible: false,
    isAnimating: false,
    options: null,
    onSelect: null,
    overlayOpacity: new _reactNative.Animated.Value(0),
    sheetOpacity: new _reactNative.Animated.Value(0)
  };
  _deferAfterAnimation = undefined;
  componentDidMount() {
    if (_reactNative.Platform.OS === 'web') {
      document.addEventListener('keydown', this._handleWebKeyDown);
    }
  }
  componentWillUnmount() {
    if (_reactNative.Platform.OS === 'web') {
      document.removeEventListener('keydown', this._handleWebKeyDown);
    }
  }
  _handleWebKeyDown = event => {
    if (event.key === ESCAPE_KEY && this.state.isVisible) {
      event.preventDefault();
      this._selectCancelButton();
    }
  };
  _setActionSheetHeight = ({
    nativeEvent
  }) => this._actionSheetHeight = nativeEvent.layout.height;
  render() {
    const {
      isVisible,
      overlayOpacity,
      options
    } = this.state;
    const useModal = options ? options.autoFocus || options.useModal === true : false;
    const overlay = isVisible ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Animated.View, {
      style: [styles.overlay, {
        opacity: overlayOpacity
      }]
    }) : null;

    // While the sheet is visible, hide the rest of the app's content from screen readers.
    const appContent = /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: styles.flexContainer,
      importantForAccessibility: isVisible ? 'no-hide-descendants' : 'auto',
      children: React.Children.only(this.props.children)
    });
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      pointerEvents: this.props.pointerEvents,
      style: styles.flexContainer,
      children: [appContent, isVisible && !useModal && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
        children: [overlay, this._renderSheet()]
      }), isVisible && useModal && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.Modal, {
        animationType: "none",
        transparent: true,
        onRequestClose: this._selectCancelButton,
        children: [overlay, this._renderSheet()]
      })]
    });
  }
  _renderSheet() {
    const {
      options,
      isAnimating,
      sheetOpacity
    } = this.state;
    if (!options) {
      return null;
    }
    const {
      options: optionsArray,
      icons,
      tintIcons,
      destructiveButtonIndex,
      disabledButtonIndices,
      destructiveColor,
      textStyle,
      tintColor,
      title,
      titleTextStyle,
      message,
      messageTextStyle,
      autoFocus,
      showSeparators,
      containerStyle,
      separatorStyle,
      cancelButtonIndex,
      cancelButtonTintColor,
      rippleColor
    } = options;
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableWithoutFeedback, {
      importantForAccessibility: "yes",
      onPress: this._selectCancelButton,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Animated.View, {
        needsOffscreenAlphaCompositing: isAnimating,
        style: [styles.sheetContainer, {
          opacity: sheetOpacity,
          transform: [{
            translateY: sheetOpacity.interpolate({
              inputRange: [0, 1],
              outputRange: [this._actionSheetHeight, 0]
            })
          }]
        }],
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
          style: styles.sheet,
          onLayout: this._setActionSheetHeight,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ActionGroup.default, {
            options: optionsArray,
            icons: icons,
            tintIcons: tintIcons === undefined ? true : tintIcons,
            cancelButtonIndex: cancelButtonIndex,
            cancelButtonTintColor: cancelButtonTintColor,
            destructiveButtonIndex: destructiveButtonIndex,
            destructiveColor: destructiveColor,
            disabledButtonIndices: disabledButtonIndices,
            onSelect: this._onSelect,
            startIndex: 0,
            length: optionsArray.length,
            textStyle: textStyle || {},
            tintColor: tintColor,
            title: title || undefined,
            titleTextStyle: titleTextStyle,
            message: message || undefined,
            messageTextStyle: messageTextStyle,
            autoFocus: autoFocus,
            showSeparators: showSeparators,
            containerStyle: containerStyle,
            separatorStyle: separatorStyle,
            rippleColor: rippleColor
          })
        })
      })
    });
  }
  showActionSheetWithOptions = (options, onSelect) => {
    const {
      isVisible,
      overlayOpacity,
      sheetOpacity
    } = this.state;
    const {
      useNativeDriver = true
    } = this.props;
    if (isVisible) {
      this._deferAfterAnimation = this.showActionSheetWithOptions.bind(this, options, onSelect);
      return;
    }
    this.setState({
      options,
      onSelect,
      isVisible: true,
      isAnimating: true
    });
    overlayOpacity.setValue(0);
    sheetOpacity.setValue(0);
    _reactNative.Animated.parallel([_reactNative.Animated.timing(overlayOpacity, {
      toValue: 0.32,
      easing: EASING_OUT,
      duration: OPACITY_ANIMATION_IN_TIME,
      useNativeDriver
    }), _reactNative.Animated.timing(sheetOpacity, {
      toValue: 1,
      easing: EASING_OUT,
      duration: OPACITY_ANIMATION_IN_TIME,
      useNativeDriver
    })]).start(result => {
      if (result.finished) {
        this.setState({
          isAnimating: false
        });
        this._deferAfterAnimation = undefined;
      }
    });
    // @ts-ignore: Argument of type '"actionSheetHardwareBackPress"' is not assignable to parameter of type '"hardwareBackPress"'
    _reactNative.BackHandler.addEventListener('actionSheetHardwareBackPress', this._selectCancelButton);
  };
  _selectCancelButton = () => {
    const {
      options
    } = this.state;
    if (!options) {
      return false;
    }
    if (typeof options.cancelButtonIndex === 'undefined') {
      return false;
    } else if (typeof options.cancelButtonIndex === 'number') {
      return this._onSelect(options.cancelButtonIndex);
    } else {
      return this._animateOut();
    }
  };
  _onSelect = index => {
    const {
      isAnimating,
      onSelect
    } = this.state;
    if (isAnimating) {
      return false;
    }
    if (onSelect) {
      this._deferAfterAnimation = onSelect.bind(this, index);
    }
    return this._animateOut();
  };
  _animateOut = () => {
    const {
      isAnimating,
      overlayOpacity,
      sheetOpacity
    } = this.state;
    const {
      useNativeDriver = true
    } = this.props;
    if (isAnimating) {
      return false;
    }

    // @ts-ignore: Argument of type '"actionSheetHardwareBackPress"' is not assignable to parameter of type '"hardwareBackPress"'
    _reactNative.BackHandler.removeEventListener('actionSheetHardwareBackPress', this._selectCancelButton);
    this.setState({
      isAnimating: true
    });
    _reactNative.Animated.parallel([_reactNative.Animated.timing(overlayOpacity, {
      toValue: 0,
      easing: EASING_IN,
      duration: OPACITY_ANIMATION_OUT_TIME,
      useNativeDriver
    }), _reactNative.Animated.timing(sheetOpacity, {
      toValue: 0,
      easing: EASING_IN,
      duration: OPACITY_ANIMATION_OUT_TIME,
      useNativeDriver
    })]).start(result => {
      if (result.finished) {
        this.setState({
          isVisible: false,
          isAnimating: false
        });
        if (this._deferAfterAnimation) {
          this._deferAfterAnimation();
        }
      }
    });
    return true;
  };
}
exports.default = CustomActionSheet;
const styles = _reactNative.StyleSheet.create({
  flexContainer: {
    flex: 1
  },
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'black'
  },
  sheetContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    backgroundColor: 'transparent',
    alignItems: 'flex-end',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  sheet: {
    flex: 1,
    backgroundColor: 'transparent'
  }
});
//# sourceMappingURL=CustomActionSheet.js.map