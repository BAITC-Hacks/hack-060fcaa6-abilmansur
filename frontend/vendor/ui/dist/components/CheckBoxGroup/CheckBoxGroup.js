import { jsx as _jsx } from "react/jsx-runtime";
import clsx from "clsx";
import React from "react";
const variantMap = {
    clear: "inv-checkbox-group-clear",
    card: "inv-checkbox-group-card",
    sunk: "inv-checkbox-group-sunk",
};
const CheckBoxGroup = React.forwardRef((props, ref) => {
    const { children, className, style, variant = "clear" } = props;
    return (_jsx("div", { ref: ref, className: clsx("inv-checkbox-group", variantMap[variant], className), style: style, children: children }));
});
CheckBoxGroup.displayName = "CheckBoxGroup";
export { CheckBoxGroup };
//# sourceMappingURL=CheckBoxGroup.js.map