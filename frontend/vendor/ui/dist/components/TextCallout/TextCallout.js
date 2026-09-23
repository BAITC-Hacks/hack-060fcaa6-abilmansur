import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import clsx from "clsx";
import React from "react";
const variantMap = {
    neutral: "inv-text-callout-neutral",
    info: "inv-text-callout-info",
    warning: "inv-text-callout-warning",
    success: "inv-text-callout-success",
    danger: "inv-text-callout-danger",
};
export const TextCallout = React.forwardRef((props, ref) => {
    const { className, variant = "neutral", title, description, ...rest } = props;
    return (_jsx("div", { ref: ref, className: clsx("inv-text-callout", variantMap[variant], className), ...rest, children: _jsxs("div", { className: "inv-text-callout-content", children: [title && _jsx("span", { className: "inv-text-callout-content-title", children: title }), description && (_jsx("span", { className: "inv-text-callout-content-description", children: description }))] }) }));
});
//# sourceMappingURL=TextCallout.js.map