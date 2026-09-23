Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const require_chunk = require("../../chunk-CKQMccvm.cjs");
const require_smallCardBlockUtils = require("../../smallCardBlockUtils-Dpn86fno.cjs");
const require_InlineMarkdownRenderer = require("../../InlineMarkdownRenderer-BVDLD2eH.cjs");
let clsx = require("clsx");
clsx = require_chunk.__toESM(clsx);
let react = require("react");
let react_jsx_runtime = require("react/jsx-runtime");
//#region src/components/OptionCards/OptionCards.tsx
const OptionCards = (0, react.forwardRef)((props, ref) => {
	const { items, selected = [], type = "single", disabled = false, onToggle, className, ...rest } = props;
	const renderableItems = (items ?? []).filter((item) => Boolean(item?.value));
	const rowConfiguration = require_smallCardBlockUtils.getRowConfiguration(renderableItems.length, 3);
	let cardIndex = 0;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		ref,
		className: (0, clsx.default)("inv-option-cards", className),
		role: type === "single" ? "radiogroup" : "group",
		...rest,
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: (0, clsx.default)("inv-option-cards__grid", "inv-option-cards__grid--responsive", renderableItems.length % 2 === 1 && "inv-option-cards__grid--odd-count"),
			children: rowConfiguration.map((itemsInRow, rowIndex) => {
				const rowItems = renderableItems.slice(cardIndex, cardIndex + itemsInRow);
				cardIndex += itemsInRow;
				return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: (0, clsx.default)("inv-option-cards__row", `inv-option-cards__row--${itemsInRow}`),
					children: rowItems.map((item) => {
						const isSelected = selected.includes(item.value);
						const isDisabled = disabled || item.disabled === true;
						const hasTopContent = item.topContent != null;
						const topVariant = item.topContentVariant ?? "icon";
						return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: "inv-option-cards__item",
							children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
								type: "button",
								role: type === "single" ? "radio" : "checkbox",
								"aria-checked": isSelected,
								disabled: isDisabled,
								className: (0, clsx.default)("inv-option-card", isSelected && "inv-option-card--selected", isDisabled && "inv-option-card--disabled"),
								onClick: () => onToggle?.(item.value),
								children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									className: "inv-option-card__content",
									children: [hasTopContent ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
										className: (0, clsx.default)("inv-option-card__top", `inv-option-card__top--${topVariant}`),
										children: item.topContent
									}) : null, /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
										className: "inv-option-card__text",
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
											className: "inv-option-card__title",
											children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_InlineMarkdownRenderer.InlineMarkdownRenderer, { content: item.title })
										}), item.subtitle ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
											className: "inv-option-card__subtitle",
											children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_InlineMarkdownRenderer.InlineMarkdownRenderer, { content: item.subtitle })
										}) : null]
									})]
								})
							})
						}, item.value);
					})
				}, `option-cards-row-${rowIndex}`);
			})
		})
	});
});
OptionCards.displayName = "OptionCards";
//#endregion
exports.OptionCards = OptionCards;

//# sourceMappingURL=index.cjs.map