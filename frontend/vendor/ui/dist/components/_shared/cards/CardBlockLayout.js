import { jsx as _jsx } from "react/jsx-runtime";
import clsx from "clsx";
import { forwardRef, } from "react";
import { getRowConfiguration, useCarouselMask } from "./smallCardBlockUtils";
/** Shared grid/carousel scaffolding for the small and medium card blocks. */
function CardBlockLayoutInner(props, ref) {
    const { size, cardType, items, layout = "grid", responsive = true, maxPerRow, gap, renderItem, itemKey, className, style, ...rest } = props;
    const { scrollRef, maskLeft, maskRight } = useCarouselMask();
    const safeItems = items ?? [];
    const base = `inv-${size}-card-block`;
    const count = safeItems.length;
    const gapStyle = gap
        ? {
            [`--inv-${size}-card-gap`]: typeof gap === "number" ? `${gap}px` : gap,
        }
        : undefined;
    const renderCell = (item, index) => (_jsx("div", { className: layout === "carousel" ? `${base}__carousel-item` : `${base}__item`, children: renderItem(item, index) }, itemKey?.(item, index) ?? `${cardType}-${index}`));
    let rowStartIndex = 0;
    return (_jsx("div", { ref: ref, className: clsx(base, `${base}--${cardType}`, `${base}--${layout}`, className), "data-card-type": cardType, "data-layout": layout, "data-count": count, style: { ...gapStyle, ...style }, ...rest, children: layout === "carousel" ? (_jsx("div", { ref: scrollRef, className: clsx(`${base}__carousel`, responsive && `${base}__carousel--responsive`, maskLeft && `${base}__carousel--mask-left`, maskRight && `${base}__carousel--mask-right`), children: _jsx("div", { className: `${base}__carousel-track`, children: safeItems.map((item, index) => renderCell(item, index)) }) })) : (_jsx("div", { className: clsx(`${base}__grid`, responsive && `${base}__grid--responsive`, responsive && count % 2 === 1 && `${base}__grid--odd-count`), children: getRowConfiguration(count, maxPerRow).map((itemsInRow, rowIndex) => {
                const currentRowStartIndex = rowStartIndex;
                rowStartIndex += itemsInRow;
                return (_jsx("div", { className: clsx(`${base}__row`, `${base}__row--${itemsInRow}`), children: safeItems
                        .slice(currentRowStartIndex, currentRowStartIndex + itemsInRow)
                        .map((item, columnIndex) => renderCell(item, currentRowStartIndex + columnIndex)) }, `${cardType}-row-${rowIndex}`));
            }) })) }));
}
export const CardBlockLayout = forwardRef(CardBlockLayoutInner);
/** Enter/Space keyboard activation for card-like `role="button"` divs. */
export function cardKeyDownHandler(onActivate) {
    return (event) => {
        if (event.key !== "Enter" && event.key !== " ")
            return;
        event.preventDefault();
        onActivate();
    };
}
//# sourceMappingURL=CardBlockLayout.js.map