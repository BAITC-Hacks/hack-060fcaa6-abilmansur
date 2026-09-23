import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import clsx from "clsx";
import { forwardRef } from "react";
import { TextBlockView } from "../TextBlock";
/** A full-width banner image above a bold title with an optional subtitle. */
export const ImageTextLarge = forwardRef(({ title, subtitle, src, alt, className }, ref) => {
    const altText = alt ?? title;
    return (_jsxs("div", { ref: ref, className: clsx("inv-image-text-large", className), children: [_jsx("div", { className: "inv-image-text-large__image-wrap", children: _jsx("img", { className: "inv-image-text-large__image", src: src, alt: altText }) }), _jsx("div", { className: "inv-image-text-large__content", children: _jsx(TextBlockView, { variant: "highlight-text", primary: title, secondary: subtitle, type: "text", size: "sm", align: "left" }) })] }));
});
ImageTextLarge.displayName = "ImageTextLarge";
//# sourceMappingURL=ImageTextLarge.js.map