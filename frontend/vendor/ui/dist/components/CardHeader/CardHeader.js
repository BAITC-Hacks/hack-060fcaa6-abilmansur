import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import clsx from "clsx";
import { cloneElement, forwardRef } from "react";
export const CardHeader = forwardRef((props, ref) => {
    const { icon, title, subtitle, actions, className, styles, ...rest } = props;
    return (_jsxs("div", { ref: ref, className: clsx("inv-header", className), style: styles, ...rest, children: [_jsxs("div", { className: "inv-header-top", children: [_jsxs("div", { className: "inv-header-top-left", children: [icon && _jsx("span", { className: "inv-header-top-left-icon", children: icon }), title] }), _jsx("div", { className: "inv-header-top-right", children: Array.isArray(actions)
                            ? actions.map((action, index) => cloneElement(action, { key: index }))
                            : actions })] }), subtitle && _jsx("div", { className: "inv-header-bottom", children: subtitle })] }));
});
CardHeader.displayName = "CardHeader";
//# sourceMappingURL=CardHeader.js.map