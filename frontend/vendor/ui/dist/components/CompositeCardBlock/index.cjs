Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const require_chunk = require("../../chunk-CKQMccvm.cjs");
const require_CardBlockLayout = require("../../CardBlockLayout-BToxdo9d.cjs");
let clsx = require("clsx");
clsx = require_chunk.__toESM(clsx);
let react = require("react");
let react_jsx_runtime = require("react/jsx-runtime");
//#region src/components/CompositeCardBlock/CompositeCardBlock.tsx
/** A bordered card with header, stacked body content and a price/button footer. */
const CompositeCard = (0, react.forwardRef)((props, ref) => {
	const { item, clickable = false, onClick, className } = props;
	const { header, body, footer } = item;
	const bodyItems = body ?? [];
	const hasFooter = Boolean(footer?.price || footer?.button);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		className: "inv-composite-card__wrapper",
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
			ref,
			className: (0, clsx.default)("inv-composite-card", clickable ? "inv-composite-card--clickable" : "inv-composite-card--static", className),
			role: clickable ? "button" : void 0,
			tabIndex: clickable ? 0 : void 0,
			onClick: clickable ? onClick : void 0,
			onKeyDown: clickable && onClick ? require_CardBlockLayout.cardKeyDownHandler(onClick) : void 0,
			children: [
				header && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: "inv-composite-card__header",
					children: header
				}),
				bodyItems.length > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: "inv-composite-card__body",
					children: bodyItems
				}),
				hasFooter && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: "inv-composite-card__footer",
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: "inv-composite-card__footer-content",
						children: [footer?.price ?? null, footer?.button ?? null]
					})
				})
			]
		})
	});
});
CompositeCard.displayName = "CompositeCard";
/** A two-per-row grid or carousel of CompositeCards. */
const CompositeCardBlock = (0, react.forwardRef)((props, ref) => {
	const { items, layout, responsive, gap, clickable = false, onItemClick, className } = props;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_CardBlockLayout.CardBlockLayout, {
		ref,
		size: "medium",
		cardType: "composite-card",
		"data-card-type": "CompositeCard",
		items,
		layout,
		responsive,
		maxPerRow: 2,
		gap,
		className,
		itemKey: (item, index) => {
			const itemId = item.id?.trim();
			return itemId ? `composite-card-${itemId}-${index}` : `composite-card-${index}`;
		},
		renderItem: (item, index) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(CompositeCard, {
			item,
			clickable,
			onClick: () => onItemClick?.(index)
		})
	});
});
CompositeCardBlock.displayName = "CompositeCardBlock";
//#endregion
exports.CompositeCard = CompositeCard;
exports.CompositeCardBlock = CompositeCardBlock;

//# sourceMappingURL=index.cjs.map