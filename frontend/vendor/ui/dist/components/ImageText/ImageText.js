import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import clsx from "clsx";
import { forwardRef } from "react";
import { TextBlockView } from "../TextBlock";
/** A small square image beside (or above) a title with an optional subtitle. */
export const ImageText = forwardRef(({ title, subtitle, src, alt, bold = false, layout = "horizontal", imageSize, className }, ref) => {
    const altText = alt ?? title;
    const size = imageSize ?? (layout === "horizontal" ? 40 : undefined);
    return (_jsxs("div", { ref: ref, className: clsx("inv-image-text", `inv-image-text--${layout}`, className), children: [_jsx("div", { className: "inv-image-text__image-container", style: size ? { width: size, height: size } : undefined, children: _jsx("img", { className: "inv-image-text__image", src: src, alt: altText }) }), _jsx("div", { className: "inv-image-text__content", children: _jsx(TextBlockView, { variant: bold ? "highlight-text-number-subtext" : "text-subtext", primary: title, secondary: subtitle, type: "text", size: layout === "horizontal" ? "xs" : "sm", align: "left" }) })] }));
});
ImageText.displayName = "ImageText";
//# sourceMappingURL=ImageText.js.map