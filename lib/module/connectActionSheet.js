"use strict";

import hoistNonReactStatic from 'hoist-non-react-statics';
import * as React from 'react';
import { Consumer } from "./context.js";
import { jsx as _jsx } from "react/jsx-runtime";
export default function connectActionSheet(WrappedComponent) {
  const ConnectedActionSheet = props => {
    return /*#__PURE__*/_jsx(Consumer, {
      children: ({
        showActionSheetWithOptions
      }) => {
        return /*#__PURE__*/_jsx(WrappedComponent, {
          ...props,
          showActionSheetWithOptions: showActionSheetWithOptions
        });
      }
    });
  };
  return hoistNonReactStatic(ConnectedActionSheet, WrappedComponent);
}
//# sourceMappingURL=connectActionSheet.js.map