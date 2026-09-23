import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import clsx from "clsx";
import { forwardRef } from "react";
const Chips = forwardRef((props, ref) => {
    const { items, selected = [], type = "multiple", disabled = false, onToggle, className, ...rest } = props;
    // Items without a value have no stable identity to select or toggle by.
    const renderableItems = (items ?? []).filter((item) => Boolean(item?.value));
    return (_jsx("div", { ref: ref, className: clsx("inv-chips", className), role: "listbox", "aria-multiselectable": type === "multiple", ...rest, children: renderableItems.map((item) => {
            const isSelected = selected.includes(item.value);
            const isDisabled = disabled || item.disabled === true;
            return (_jsxs("button", { type: "button", role: "option", "aria-selected": isSelected, disabled: isDisabled, className: clsx("inv-chip-item", isSelected && "inv-chip-item--selected", isDisabled && "inv-chip-item--disabled"), onClick: () => onToggle?.(item.value), children: [item.icon ? _jsx("span", { className: "inv-chip-item__icon", children: item.icon }) : null, _jsx("span", { className: "inv-chip-item__text", children: item.label })] }, item.value));
        }) }));
});
Chips.displayName = "Chips";
export { Chips };
//# sourceMappingURL=Chips.js.map