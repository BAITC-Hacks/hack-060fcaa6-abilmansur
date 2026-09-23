import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import clsx from "clsx";
import { ChevronRight } from "lucide-react";
import { forwardRef } from "react";
import { CardBlockLayout, cardKeyDownHandler } from "../_shared/cards/CardBlockLayout";
import { MetricIndicatorInline } from "../MetricIndicator";
const OverviewCardBlock = forwardRef((props, ref) => {
    const { items, layout = "grid", responsive = true, gap, clickable = false, onItemClick, className, ...rest } = props;
    const isClickable = clickable && Boolean(onItemClick);
    return (_jsx(CardBlockLayout, { ref: ref, size: "small", cardType: "overview-card", "data-card-type": "OverviewCard", items: items ?? [], layout: layout, responsive: responsive, maxPerRow: 3, gap: gap, className: className, itemKey: (item, index) => item.id ?? `overview-card-${index}`, renderItem: (item, index) => (_jsx("div", { className: clsx("inv-overview-card", isClickable && "inv-overview-card--clickable"), role: isClickable ? "button" : undefined, tabIndex: isClickable ? 0 : undefined, onClick: isClickable ? () => onItemClick?.(item, index) : undefined, onKeyDown: isClickable ? cardKeyDownHandler(() => onItemClick?.(item, index)) : undefined, children: _jsxs("div", { className: "inv-overview-card__vertical", children: [_jsxs("div", { className: "inv-overview-card__top-row", children: [item.top != null && (_jsx("div", { className: "inv-overview-card__slot inv-overview-card__slot--top", children: item.top })), isClickable && (_jsx("div", { className: "inv-overview-card__chevron", "aria-hidden": "true", children: _jsx(ChevronRight, { size: 14 }) }))] }), item.bottom && (_jsx("div", { className: "inv-overview-card__slot inv-overview-card__slot--bottom", children: _jsx(MetricIndicatorInline, { ...item.bottom }) }))] }) })), ...rest }));
});
OverviewCardBlock.displayName = "OverviewCardBlock";
export { OverviewCardBlock };
//# sourceMappingURL=OverviewCardBlock.js.map