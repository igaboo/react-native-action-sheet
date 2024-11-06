"use strict";

import * as React from 'react';
import { ActionSheetIOS, View } from 'react-native';
import { jsx as _jsx } from "react/jsx-runtime";
export default class ActionSheet extends React.Component {
  render() {
    return /*#__PURE__*/_jsx(View, {
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
    ActionSheetIOS.showActionSheetWithOptions(iosOptions, onSelect);
  }
}
//# sourceMappingURL=index.ios.js.map