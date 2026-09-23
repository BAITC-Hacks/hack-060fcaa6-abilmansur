Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const require_chunk = require("../../chunk-CKQMccvm.cjs");
let clsx = require("clsx");
clsx = require_chunk.__toESM(clsx);
let react = require("react");
let react_jsx_runtime = require("react/jsx-runtime");
//#region src/components/Chips/Chips.tsx
const Chips = (0, react.forwardRef)((props, ref) => {
	const { items, selected = [], type = "multiple", disabled = false, onToggle, className, ...rest } = props;
	const renderableItems = (items ?? []).filter((item) => Boolean(item?.value));
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		ref,
		className: (0, clsx.default)("inv-chips", className),
		role: "listbox",
		"aria-multiselectable": type === "multiple",
		...rest,
		children: renderableItems.map((item) => {
			const isSelected = selected.includes(item.value);
			const isDisabled = disabled || item.disabled === true;
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
				type: "button",
				role: "option",
				"aria-selected": isSelected,
				disabled: isDisabled,
				className: (0, clsx.default)("inv-chip-item", isSelected && "inv-chip-item--selected", isDisabled && "inv-chip-item--disabled"),
				onClick: () => onToggle?.(item.value),
				children: [item.icon ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					className: "inv-chip-item__icon",
					children: item.icon
				}) : null, /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					className: "inv-chip-item__text",
					children: item.label
				})]
			}, item.value);
		})
	});
});
Chips.displayName = "Chips";
//#endregion
exports.Chips = Chips;

//# sourceMappingURL=index.cjs.map