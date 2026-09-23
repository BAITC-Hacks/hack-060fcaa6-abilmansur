import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import clsx from "clsx";
import { ChevronRight } from "lucide-react";
import { forwardRef } from "react";
import { CardBlockLayout, cardKeyDownHandler } from "../_shared/cards/CardBlockLayout";
import { toCssUrl } from "../_shared/utils";
/** A photo-first card: background image with gradient, a tag on top and a body panel at the bottom. */
export const VisualCard = forwardRef((props, ref) => {
    const { item, clickable = false, onClick, className } = props;
    const { tag, body, bgImageSrc, bgImageAlt } = item;
    const backgroundImage = toCssUrl(bgImageSrc);
    const cardImageStyle = backgroundImage
        ? { "--inv-visual-card-image": backgroundImage }
        : undefined;
    return (_jsxs("div", { ref: ref, className: clsx("inv-visual-first-card", clickable ? "inv-visual-first-card--clickable" : "inv-visual-first-card--static", className), style: cardImageStyle, "aria-label": cardImageStyle ? bgImageAlt : undefined, role: clickable ? "button" : undefined, tabIndex: clickable ? 0 : undefined, onClick: clickable ? onClick : undefined, onKeyDown: clickable && onClick ? cardKeyDownHandler(onClick) : undefined, children: [_jsxs("div", { className: "inv-visual-first-card__top", children: [_jsx("div", { className: "inv-visual-first-card__tag", children: tag ?? null }), clickable && (_jsx("div", { className: "inv-visual-first-card__action", "aria-hidden": "true", children: _jsx(ChevronRight, { size: 16 }) }))] }), body ? _jsx("div", { className: "inv-visual-first-card__bottom", children: body }) : null] }));
});
VisualCard.displayName = "VisualCard";
/** A three-per-row grid or carousel of VisualCards. */
export const VisualCardBlock = forwardRef((props, ref) => {
    const { items, layout, responsive, gap, clickable = false, onItemClick, className } = props;
    return (_jsx(CardBlockLayout, { ref: ref, size: "medium", cardType: "visual-first-card", "data-card-type": "VisualCard", items: items, layout: layout, responsive: responsive, maxPerRow: 3, gap: gap, className: className, itemKey: (item, index) => item.id ?? `visual-card-${index}`, renderItem: (item, index) => (_jsx(VisualCard, { item: item, clickable: clickable, onClick: () => onItemClick?.(index) })) }));
});
VisualCardBlock.displayName = "VisualCardBlock";
//# sourceMappingURL=VisualCardBlock.js.map