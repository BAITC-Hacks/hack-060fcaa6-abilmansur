import { jsxs as _jsxs } from "react/jsx-runtime";
import clsx from "clsx";
import { forwardRef } from "react";
const normalVariantMap = {
    primary: "inv-button-base-primary",
    secondary: "inv-button-base-secondary",
    tertiary: "inv-button-base-tertiary",
};
const destructiveVariantMap = {
    primary: "inv-button-base-destructive-primary",
    secondary: "inv-button-base-destructive-secondary",
    tertiary: "inv-button-base-destructive-tertiary",
};
const sizeMap = {
    "extra-small": "inv-button-base-extra-small",
    small: "inv-button-base-small",
    medium: "inv-button-base-medium",
    large: "inv-button-base-large",
};
export const Button = forwardRef(({ children, variant = "primary", size = "medium", iconLeft, iconRight, className, buttonType = "normal", ...props }, ref) => {
    const variantMap = buttonType === "destructive" ? destructiveVariantMap : normalVariantMap;
    return (_jsxs("button", { ref: ref, className: clsx("inv-button-base", variantMap[variant], sizeMap[size], className), ...props, children: [iconLeft, children, iconRight] }));
});
Button.displayName = "Button";
//# sourceMappingURL=Button.js.map