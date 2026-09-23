import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import clsx from "clsx";
import { forwardRef } from "react";
const sizeMap = {
    sm: "inv-tag-sm",
    md: "inv-tag-md",
    lg: "inv-tag-lg",
};
const variantMap = {
    neutral: "inv-tag-neutral",
    info: "inv-tag-info",
    success: "inv-tag-success",
    warning: "inv-tag-warning",
    danger: "inv-tag-danger",
};
export const Tag = forwardRef((props, ref) => {
    const { className, styles, icon, text, size = "md", variant = "neutral", ...rest } = props;
    return (_jsxs("div", { ref: ref, className: clsx("inv-tag", sizeMap[size], variantMap[variant], className), style: styles, ...rest, children: [icon && _jsx("span", { className: "inv-tag-icon", children: icon }), _jsx("span", { className: "inv-tag-text", children: text })] }));
});
Tag.displayName = "Tag";
//# sourceMappingURL=Tag.js.map