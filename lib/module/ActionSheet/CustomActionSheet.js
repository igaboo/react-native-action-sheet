"use strict";

import * as React from 'react';
import { Animated, BackHandler, Easing, Modal, Platform, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import ActionGroup from "./ActionGroup.js";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
const OPACITY_ANIMATION_IN_TIME = 225;
const OPACITY_ANIMATION_OUT_TIME = 195;
const EASING_OUT = Easing.bezier(0.25, 0.46, 0.45, 0.94);
const EASING_IN = Easing.out(EASING_OUT);
const ESCAPE_KEY = 'Escape';

// Has same API as https://facebook.github.io/react-native/docs/actionsheetios.html
export default class CustomActionSheet extends React.Component {
  _actionSheetHeight = 360;
  state = {
    isVisible: false,
    isAnimating: false,
    options: null,
    onSelect: null,
    overlayOpacity: new Animated.Value(0),
    sheetOpacity: new Animated.Value(0)
  };
  _deferAfterAnimation = undefined;
  componentDidMount() {
    if (Platform.OS === 'web') {
      document.addEventListener('keydown', this._handleWebKeyDown);
    }
  }
  componentWillUnmount() {
    if (Platform.OS === 'web') {
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
    const overlay = isVisible ? /*#__PURE__*/_jsx(Animated.View, {
      style: [styles.overlay, {
        opacity: overlayOpacity
      }]
    }) : null;

    // While the sheet is visible, hide the rest of the app's content from screen readers.
    const appContent = /*#__PURE__*/_jsx(View, {
      style: styles.flexContainer,
      importantForAccessibility: isVisible ? 'no-hide-descendants' : 'auto',
      children: React.Children.only(this.props.children)
    });
    return /*#__PURE__*/_jsxs(View, {
      pointerEvents: this.props.pointerEvents,
      style: styles.flexContainer,
      children: [appContent, isVisible && !useModal && /*#__PURE__*/_jsxs(_Fragment, {
        children: [overlay, this._renderSheet()]
      }), isVisible && useModal && /*#__PURE__*/_jsxs(Modal, {
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
    return /*#__PURE__*/_jsx(TouchableWithoutFeedback, {
      importantForAccessibility: "yes",
      onPress: this._selectCancelButton,
      children: /*#__PURE__*/_jsx(Animated.View, {
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
        children: /*#__PURE__*/_jsx(View, {
          style: styles.sheet,
          onLayout: this._setActionSheetHeight,
          children: /*#__PURE__*/_jsx(ActionGroup, {
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
    Animated.parallel([Animated.timing(overlayOpacity, {
      toValue: 0.32,
      easing: EASING_OUT,
      duration: OPACITY_ANIMATION_IN_TIME,
      useNativeDriver
    }), Animated.timing(sheetOpacity, {
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
    BackHandler.addEventListener('actionSheetHardwareBackPress', this._selectCancelButton);
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
    BackHandler.removeEventListener('actionSheetHardwareBackPress', this._selectCancelButton);
    this.setState({
      isAnimating: true
    });
    Animated.parallel([Animated.timing(overlayOpacity, {
      toValue: 0,
      easing: EASING_IN,
      duration: OPACITY_ANIMATION_OUT_TIME,
      useNativeDriver
    }), Animated.timing(sheetOpacity, {
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
const styles = StyleSheet.create({
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