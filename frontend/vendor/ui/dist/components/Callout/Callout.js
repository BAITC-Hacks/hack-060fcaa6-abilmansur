import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import clsx from "clsx";
import React from "react";
const variantMap = {
    info: "inv-callout-info",
    danger: "inv-callout-danger",
    warning: "inv-callout-warning",
    success: "inv-callout-success",
    neutral: "inv-callout-neutral",
};
export const Callout = React.forwardRef((props, ref) => {
    const { className, variant = "neutral", title, description, duration, style, ...rest } = props;
    const dismissStyle = duration
        ? { ...style, "--callout-duration": `${duration}ms` }
        : style;
    return (_jsxs("div", { ref: ref, className: clsx("inv-callout", variantMap[variant], duration && "inv-callout-autodismiss", className), style: dismissStyle, ...rest, children: [title && _jsx("span", { className: "inv-callout-title", children: title }), description && _jsx("span", { className: "inv-callout-description", children: description })] }));
});
//# sourceMappingURL=Callout.js.map