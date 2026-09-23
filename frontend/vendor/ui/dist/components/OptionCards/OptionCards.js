import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import clsx from "clsx";
import { forwardRef } from "react";
import { InlineMarkdownRenderer } from "../InlineMarkdownRenderer";
import { getRowConfiguration } from "../_shared/cards/smallCardBlockUtils";
const OptionCards = forwardRef((props, ref) => {
    const { items, selected = [], type = "single", disabled = false, onToggle, className, ...rest } = props;
    // Items without a value have no stable identity to select or toggle by.
    const renderableItems = (items ?? []).filter((item) => Boolean(item?.value));
    const rowConfiguration = getRowConfiguration(renderableItems.length, 3);
    let cardIndex = 0;
    return (_jsx("div", { ref: ref, className: clsx("inv-option-cards", className), role: type === "single" ? "radiogroup" : "group", ...rest, children: _jsx("div", { className: clsx("inv-option-cards__grid", "inv-option-cards__grid--responsive", renderableItems.length % 2 === 1 && "inv-option-cards__grid--odd-count"), children: rowConfiguration.map((itemsInRow, rowIndex) => {
                const rowItems = renderableItems.slice(cardIndex, cardIndex + itemsInRow);
                cardIndex += itemsInRow;
                return (_jsx("div", { className: clsx("inv-option-cards__row", `inv-option-cards__row--${itemsInRow}`), children: rowItems.map((item) => {
                        const isSelected = selected.includes(item.value);
                        const isDisabled = disabled || item.disabled === true;
                        const hasTopContent = item.topContent != null;
                        const topVariant = item.topContentVariant ?? "icon";
                        return (_jsx("div", { className: "inv-option-cards__item", children: _jsx("button", { type: "button", role: type === "single" ? "radio" : "checkbox", "aria-checked": isSelected, disabled: isDisabled, className: clsx("inv-option-card", isSelected && "inv-option-card--selected", isDisabled && "inv-option-card--disabled"), onClick: () => onToggle?.(item.value), children: _jsxs("div", { className: "inv-option-card__content", children: [hasTopContent ? (_jsx("div", { className: clsx("inv-option-card__top", `inv-option-card__top--${topVariant}`), children: item.topContent })) : null, _jsxs("div", { className: "inv-option-card__text", children: [_jsx("div", { className: "inv-option-card__title", children: _jsx(InlineMarkdownRenderer, { content: item.title }) }), item.subtitle ? (_jsx("div", { className: "inv-option-card__subtitle", children: _jsx(InlineMarkdownRenderer, { content: item.subtitle }) })) : null] })] }) }) }, item.value));
                    }) }, `option-cards-row-${rowIndex}`));
            }) }) }));
});
OptionCards.displayName = "OptionCards";
export { OptionCards };
//# sourceMappingURL=OptionCards.js.map