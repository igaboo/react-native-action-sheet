"use strict";

import * as React from 'react';
import { AccessibilityInfo, findNodeHandle, Image, Platform, ScrollView, StyleSheet, Text, UIManager, View } from 'react-native';
import TouchableNativeFeedbackSafe from "./TouchableNativeFeedbackSafe.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const BLACK_54PC_TRANSPARENT = '#0000008a';
const BLACK_87PC_TRANSPARENT = '#000000de';
const DESTRUCTIVE_COLOR = '#d32f2f';

/**
 * Can be used as a React ref for a component to auto-focus for accessibility on render.
 * @param ref The component to auto-focus
 */
const focusViewOnRender = ref => {
  if (ref) {
    const reactTag = findNodeHandle(ref);
    if (reactTag) {
      if (Platform.OS === 'android') {
        // @ts-ignore: sendAccessibilityEvent is missing from @types/react-native
        UIManager.sendAccessibilityEvent(reactTag,
        // @ts-ignore: AccessibilityEventTypes is missing from @types/react-native
        UIManager.AccessibilityEventTypes.typeViewFocused);
      } else {
        AccessibilityInfo.setAccessibilityFocus(reactTag);
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
export default class ActionGroup extends React.Component {
  static defaultProps = {
    title: null,
    message: null,
    showSeparators: false,
    tintIcons: true,
    textStyle: {},
    rippleColor: 'rgba(180, 180, 180, 1)'
  };
  render() {
    return /*#__PURE__*/_jsxs(View, {
      style: [styles.groupContainer, this.props.containerStyle],
      children: [this._renderTitleContent(), /*#__PURE__*/_jsx(ScrollView, {
        children: this._renderOptionViews()
      })]
    });
  }
  _renderRowSeparator = key => {
    return /*#__PURE__*/_jsx(View, {
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
    return /*#__PURE__*/_jsxs(View, {
      children: [/*#__PURE__*/_jsxs(View, {
        style: [styles.titleContainer, {
          paddingBottom: showSeparators ? 24 : 16
        }],
        children: [!!title && /*#__PURE__*/_jsx(Text, {
          style: [styles.title, titleTextStyle],
          children: title
        }), !!message && /*#__PURE__*/_jsx(Text, {
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
      return /*#__PURE__*/_jsx(Image, {
        fadeDuration: 0,
        source: iconSource,
        resizeMode: "contain",
        style: iconStyle
      });
    } else {
      return /*#__PURE__*/_jsx(View, {
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
    const nativeFeedbackBackground = TouchableNativeFeedbackSafe.Ripple(rippleColor || 'rgba(180, 180, 180, 1)', false);
    for (let i = startIndex; i < startIndex + length; i++) {
      const defaultColor = tintColor ? tintColor : (textStyle || {}).color || BLACK_87PC_TRANSPARENT;
      const disabled = isIndexDisabled(i, disabledButtonIndices);
      const isCancelButton = i === cancelButtonIndex;
      const color = isIndexDestructive(i, destructiveButtonIndex) ? destructiveColor : isCancelButton ? cancelButtonTintColor || defaultColor : defaultColor;
      const iconSource = icons != null ? icons[i] : null;
      optionViews.push(/*#__PURE__*/_jsxs(TouchableNativeFeedbackSafe, {
        ref: autoFocus && i === 0 ? focusViewOnRender : undefined,
        pressInDelay: 0,
        background: nativeFeedbackBackground,
        disabled: disabled,
        onPress: () => onSelect(i),
        style: [styles.button, disabled && styles.disabledButton],
        accessibilityRole: "button",
        accessibilityLabel: options[i],
        children: [this._renderIconElement(iconSource, color), /*#__PURE__*/_jsx(Text, {
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
const styles = StyleSheet.create({
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