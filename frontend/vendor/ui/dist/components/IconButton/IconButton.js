import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Slot, Slottable } from "@radix-ui/react-slot";
import clsx from "clsx";
import { forwardRef } from "react";
const normalIconButtonVariants = {
    primary: "inv-icon-button-primary",
    secondary: "inv-icon-button-secondary",
    tertiary: "inv-icon-button-tertiary",
};
const destructiveIconButtonVariants = {
    primary: "inv-icon-button-destructive-primary",
    secondary: "inv-icon-button-destructive-secondary",
    tertiary: "inv-icon-button-destructive-tertiary",
};
const iconButtonSizes = {
    "3-extra-small": "inv-icon-button-3-extra-small",
    "2-extra-small": "inv-icon-button-2-extra-small",
    "extra-small": "inv-icon-button-extra-small",
    small: "inv-icon-button-small",
    medium: "inv-icon-button-medium",
    large: "inv-icon-button-large",
};
const iconButtonShapes = {
    square: "inv-icon-button-square",
    circle: "inv-icon-button-circle",
};
export const IconButton = forwardRef((props, ref) => {
    const { className, icon, variant = "primary", size = "medium", shape = "square", appearance = "normal", asChild = false, children, ...rest } = props;
    const iconButtonVariants = appearance === "normal" ? normalIconButtonVariants : destructiveIconButtonVariants;
    const Comp = asChild ? Slot : "button";
    return (_jsxs(Comp, { ref: ref, className: clsx("inv-icon-button", iconButtonVariants[variant], iconButtonSizes[size], iconButtonShapes[shape], className), ...rest, children: [_jsx(Slottable, { children: children }), icon && _jsx("span", { className: "inv-icon-button-icon", children: icon })] }));
});
IconButton.displayName = "IconButton";
//# sourceMappingURL=IconButton.js.map