"use strict";

import * as React from 'react';
import { Platform, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native';

// This TouchableOpacity has the same staic method of TouchableNativeFeedback
import { jsx as _jsx } from "react/jsx-runtime";
class CustomTouchableOpacity extends React.Component {
  static SelectableBackground = () => ({});
  static SelectableBackgroundBorderless = () => ({});
  static Ripple = (color, borderless) => ({});
  render() {
    return /*#__PURE__*/_jsx(TouchableOpacity, {
      ...this.props,
      children: this.props.children
    });
  }
}
const TouchableComponent = Platform.select({
  web: CustomTouchableOpacity,
  default: Platform.Version <= 20 ? CustomTouchableOpacity : TouchableNativeFeedback
});
export default class TouchableNativeFeedbackSafe extends React.Component {
  static SelectableBackground = TouchableComponent.SelectableBackground;
  static SelectableBackgroundBorderless = TouchableComponent.SelectableBackgroundBorderless;
  static Ripple = TouchableComponent.Ripple;
  render() {
    if (TouchableComponent === TouchableNativeFeedback) {
      return /*#__PURE__*/_jsx(TouchableComponent, {
        ...this.props,
        style: {},
        children: /*#__PURE__*/_jsx(View, {
          style: this.props.style,
          children: this.props.children
        })
      });
    }

    // @ts-ignore: JSX element type 'TouchableComponent' does not have any construct or call signatures
    return /*#__PURE__*/_jsx(TouchableComponent, {
      ...this.props,
      children: this.props.children
    });
  }
}
//# sourceMappingURL=TouchableNativeFeedbackSafe.js.map