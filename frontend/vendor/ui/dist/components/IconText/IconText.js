import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import clsx from "clsx";
import { forwardRef } from "react";
import { IconTag } from "../IconTag";
import { TextBlockView } from "../TextBlock";
function normalizeIconVariant(variant) {
    switch (variant) {
        case "filled":
        case "soft":
            return "neutral";
        default:
            return variant;
    }
}
/** An icon badge beside (or above) a title with an optional subtitle. */
export const IconText = forwardRef(({ icon, title, subtitle, iconVariant = "neutral", bold = false, layout = "horizontal", className, }, ref) => (_jsxs("div", { ref: ref, className: clsx("inv-icon-text", `inv-icon-text--${layout}`, className), children: [_jsx(IconTag, { icon: icon, variant: normalizeIconVariant(iconVariant), size: "l" }), _jsx("div", { className: "inv-icon-text__content", children: _jsx(TextBlockView, { variant: bold ? "highlight-text-number-subtext" : "text-subtext", primary: title, secondary: subtitle, type: "text", size: layout === "horizontal" ? "xs" : "sm", align: "left" }) })] })));
IconText.displayName = "IconText";
//# sourceMappingURL=IconText.js.map