import { jsx as _jsx } from "react/jsx-runtime";
import clsx from "clsx";
import { forwardRef } from "react";
const variants = {
    clear: "inv-switch-group-clear",
    card: "inv-switch-group-card",
    sunk: "inv-switch-group-sunk",
};
const SwitchGroup = forwardRef((props, ref) => {
    const { children, className, style, variant = "clear" } = props;
    return (_jsx("div", { ref: ref, className: clsx("inv-switch-group", variants[variant], className), style: style, children: children }));
});
SwitchGroup.displayName = "SwitchGroup";
export { SwitchGroup };
//# sourceMappingURL=SwitchGroup.js.map