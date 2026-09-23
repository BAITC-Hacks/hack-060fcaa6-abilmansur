import { jsx as _jsx } from "react/jsx-runtime";
import clsx from "clsx";
import React from "react";
const variantMap = {
    clear: "inv-card-clear",
    card: "inv-card-card",
    sunk: "inv-card-sunk",
};
const widthMap = {
    standard: "inv-card-standard",
    full: "inv-card-full",
};
export const Card = React.forwardRef((props, ref) => {
    const { className, children, variant = "card", width = "standard", ...rest } = props;
    return (_jsx("div", { ref: ref, className: clsx("inv-card", className, variantMap[variant], widthMap[width]), ...rest, children: children }));
});
Card.displayName = "Card";
//# sourceMappingURL=Card.js.map