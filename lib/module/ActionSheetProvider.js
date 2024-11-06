"use strict";

import * as React from 'react';

// NativeActionSheet will always be custom when on Android/web
import NativeActionSheet from './ActionSheet';
import CustomActionSheet from "./ActionSheet/CustomActionSheet.js";
import { Provider } from "./context.js";
import { jsx as _jsx } from "react/jsx-runtime";
export default /*#__PURE__*/React.forwardRef(function ActionSheetProvider({
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
  const ActionSheet = React.useMemo(() => useCustomActionSheet ? CustomActionSheet : NativeActionSheet, [useCustomActionSheet]);
  return /*#__PURE__*/_jsx(Provider, {
    value: context,
    children: /*#__PURE__*/_jsx(ActionSheet, {
      ref: actionSheetRef,
      useNativeDriver: useNativeDriver,
      children: React.Children.only(children)
    })
  });
});
//# sourceMappingURL=ActionSheetProvider.js.map