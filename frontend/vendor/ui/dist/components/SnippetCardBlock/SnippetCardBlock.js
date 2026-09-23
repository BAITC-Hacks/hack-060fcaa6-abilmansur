import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import clsx from "clsx";
import { ChevronRight } from "lucide-react";
import { forwardRef } from "react";
import { CardBlockLayout, cardKeyDownHandler } from "../_shared/cards/CardBlockLayout";
import { TooltipWrapper } from "../TooltipWrapper";
const TEXT_BLOCK_HEADING_SELECTOR = ".inv-text-block__primary";
const TEXT_BLOCK_CONTENT_SELECTOR = ".inv-text-block__secondary";
const SnippetCardBlock = forwardRef((props, ref) => {
    const { items, responsive = true, gap, clickable = false, onItemClick, className, ...rest } = props;
    const isClickable = clickable && Boolean(onItemClick);
    return (_jsx(CardBlockLayout, { ref: ref, size: "small", cardType: "value-card", "data-card-type": "SnippetCard", items: items ?? [], layout: "grid", responsive: responsive, maxPerRow: 2, gap: gap, className: className, itemKey: (item, index) => item.id ?? `snippet-card-${index}`, renderItem: (item, index) => (_jsxs("div", { className: clsx("inv-value-card", !isClickable && "inv-value-card--static", isClickable && "inv-value-card--clickable"), role: isClickable ? "button" : undefined, tabIndex: isClickable ? 0 : undefined, onClick: isClickable ? () => onItemClick?.(item, index) : undefined, onKeyDown: isClickable ? cardKeyDownHandler(() => onItemClick?.(item, index)) : undefined, children: [item.lhs != null && (_jsx(TooltipWrapper, { tooltipHeading: item.lhsTooltip?.heading, tooltipContent: item.lhsTooltip?.content, showOnlyWhenTruncated: true, headingSelector: TEXT_BLOCK_HEADING_SELECTOR, contentSelector: TEXT_BLOCK_CONTENT_SELECTOR, children: _jsx("div", { className: "inv-value-card__lhs", children: item.lhs }) })), _jsx("div", { className: "inv-value-card__rhs", children: item.rhs != null ? (_jsx(TooltipWrapper, { tooltipHeading: item.rhsTooltip?.heading, tooltipContent: item.rhsTooltip?.content, showOnlyWhenTruncated: true, headingSelector: TEXT_BLOCK_HEADING_SELECTOR, contentSelector: TEXT_BLOCK_CONTENT_SELECTOR, children: _jsx("div", { className: "inv-value-card__rhs-content", children: item.rhs }) })) : (isClickable && (_jsx("div", { className: "inv-value-card__chevron", "aria-hidden": "true", children: _jsx(ChevronRight, { size: 14 }) }))) })] })), ...rest }));
});
SnippetCardBlock.displayName = "SnippetCardBlock";
export { SnippetCardBlock };
//# sourceMappingURL=SnippetCardBlock.js.map