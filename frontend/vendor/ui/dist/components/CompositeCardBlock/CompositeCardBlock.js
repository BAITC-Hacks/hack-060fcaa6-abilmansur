import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import clsx from "clsx";
import { forwardRef } from "react";
import { CardBlockLayout, cardKeyDownHandler } from "../_shared/cards/CardBlockLayout";
/** A bordered card with header, stacked body content and a price/button footer. */
export const CompositeCard = forwardRef((props, ref) => {
    const { item, clickable = false, onClick, className } = props;
    const { header, body, footer } = item;
    const bodyItems = body ?? [];
    const hasFooter = Boolean(footer?.price || footer?.button);
    return (_jsx("div", { className: "inv-composite-card__wrapper", children: _jsxs("div", { ref: ref, className: clsx("inv-composite-card", clickable ? "inv-composite-card--clickable" : "inv-composite-card--static", className), role: clickable ? "button" : undefined, tabIndex: clickable ? 0 : undefined, onClick: clickable ? onClick : undefined, onKeyDown: clickable && onClick ? cardKeyDownHandler(onClick) : undefined, children: [header && _jsx("div", { className: "inv-composite-card__header", children: header }), bodyItems.length > 0 && _jsx("div", { className: "inv-composite-card__body", children: bodyItems }), hasFooter && (_jsx("div", { className: "inv-composite-card__footer", children: _jsxs("div", { className: "inv-composite-card__footer-content", children: [footer?.price ?? null, footer?.button ?? null] }) }))] }) }));
});
CompositeCard.displayName = "CompositeCard";
/** A two-per-row grid or carousel of CompositeCards. */
export const CompositeCardBlock = forwardRef((props, ref) => {
    const { items, layout, responsive, gap, clickable = false, onItemClick, className } = props;
    return (_jsx(CardBlockLayout, { ref: ref, size: "medium", cardType: "composite-card", "data-card-type": "CompositeCard", items: items, layout: layout, responsive: responsive, maxPerRow: 2, gap: gap, className: className, itemKey: (item, index) => {
            const itemId = item.id?.trim();
            return itemId ? `composite-card-${itemId}-${index}` : `composite-card-${index}`;
        }, renderItem: (item, index) => (_jsx(CompositeCard, { item: item, clickable: clickable, onClick: () => onItemClick?.(index) })) }));
});
CompositeCardBlock.displayName = "CompositeCardBlock";
//# sourceMappingURL=CompositeCardBlock.js.map