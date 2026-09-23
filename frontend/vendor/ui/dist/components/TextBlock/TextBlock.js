import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import clsx from "clsx";
import { forwardRef } from "react";
import { InlineMarkdownRenderer } from "../InlineMarkdownRenderer";
/**
 * Low-level text primitive for card content: a primary line with optional
 * secondary/tertiary lines. `variant`, `size`, `type` and `align` control
 * emphasis, spacing and number styling.
 */
export const TextBlockView = forwardRef(({ primary, secondary, tertiary, variant = "title-text", type = "text", size = "sm", align = "left", secondaryMaxLines, secondaryTone, className, }, ref) => {
    const secondaryClassName = clsx("inv-text-block__secondary", secondaryTone && `inv-text-block__secondary--${secondaryTone}`);
    const secondaryStyle = secondaryMaxLines !== undefined
        ? {
            display: "-webkit-box",
            WebkitLineClamp: secondaryMaxLines,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
        }
        : undefined;
    return (_jsxs("div", { ref: ref, className: clsx("inv-text-block", `inv-text-block--${variant}`, `inv-text-block--size-${size}`, `inv-text-block--align-${align}`, `inv-text-block--type-${type}`, className), children: [_jsx(InlineMarkdownRenderer, { content: primary, className: "inv-text-block__primary" }), secondary &&
                (secondaryStyle ? (
                // The line-clamp style needs its own block element — the markdown
                // renderer has no style passthrough.
                _jsx("div", { className: secondaryClassName, style: secondaryStyle, children: _jsx(InlineMarkdownRenderer, { content: secondary }) })) : (_jsx(InlineMarkdownRenderer, { content: secondary, className: secondaryClassName }))), tertiary && (_jsx(InlineMarkdownRenderer, { content: tertiary, className: "inv-text-block__tertiary" }))] }));
});
TextBlockView.displayName = "TextBlockView";
//# sourceMappingURL=TextBlock.js.map