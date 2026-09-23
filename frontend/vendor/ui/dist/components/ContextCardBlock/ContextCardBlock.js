import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import clsx from "clsx";
import { ChevronRight } from "lucide-react";
import { forwardRef } from "react";
import { InlineMarkdownRenderer } from "../InlineMarkdownRenderer";
import { CardBlockLayout, cardKeyDownHandler } from "../_shared/cards/CardBlockLayout";
import { toCssUrl } from "../_shared/utils";
/** A compact tinted card with a title (text or tag) and a bold markdown body. */
export const ContextCard = forwardRef((props, ref) => {
    const { item, clickable = false, onClick, className } = props;
    const { title, body, bgColor, bgImageSrc, bgImageAlt } = item;
    const backgroundImage = toCssUrl(bgImageSrc);
    const variant = backgroundImage ? "image" : bgColor;
    const titleContent = title == null || title === "" ? null : typeof title === "string" ? (_jsx("span", { className: "inv-context-card__title-text", children: title })) : (_jsx("div", { className: "inv-context-card__tag-wrapper", children: _jsx("div", { className: "inv-context-card__tag", children: title }) }));
    return (_jsx("div", { ref: ref, className: clsx("inv-context-card", clickable ? "inv-context-card--clickable" : "inv-context-card--static", variant && `inv-context-card--variant-${variant}`, className), style: backgroundImage ? { backgroundImage } : undefined, "aria-label": backgroundImage ? bgImageAlt : undefined, role: clickable ? "button" : undefined, tabIndex: clickable ? 0 : undefined, onClick: clickable ? onClick : undefined, onKeyDown: clickable && onClick ? cardKeyDownHandler(onClick) : undefined, children: _jsxs("div", { className: "inv-context-card__vertical", children: [_jsxs("div", { className: "inv-context-card__slot inv-context-card__slot--top", children: [titleContent, clickable && (_jsx("div", { className: "inv-context-card__chevron", "aria-hidden": "true", children: _jsx(ChevronRight, { size: 16 }) }))] }), body && (_jsx("div", { className: "inv-context-card__slot inv-context-card__slot--bottom", children: _jsx("div", { className: "inv-context-card__body-text", children: _jsx(InlineMarkdownRenderer, { content: body }) }) }))] }) }));
});
ContextCard.displayName = "ContextCard";
/** A grid or carousel of ContextCards (uses the small card block layout). */
export const ContextCardBlock = forwardRef((props, ref) => {
    const { items, layout, responsive, gap, clickable = false, onItemClick, className } = props;
    return (_jsx(CardBlockLayout, { ref: ref, size: "small", cardType: "context-card", "data-card-type": "ContextCard", items: items, layout: layout, responsive: responsive, maxPerRow: 3, gap: gap, className: className, itemKey: (item, index) => item.id ?? `context-card-${index}`, renderItem: (item, index) => (_jsx(ContextCard, { item: item, clickable: clickable, onClick: () => onItemClick?.(index) })) }));
});
ContextCardBlock.displayName = "ContextCardBlock";
//# sourceMappingURL=ContextCardBlock.js.map