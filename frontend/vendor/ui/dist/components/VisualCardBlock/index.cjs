Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const require_chunk = require("../../chunk-CKQMccvm.cjs");
const require_utils = require("../../utils-DcYdyqC-.cjs");
const require_CardBlockLayout = require("../../CardBlockLayout-BToxdo9d.cjs");
let clsx = require("clsx");
clsx = require_chunk.__toESM(clsx);
let lucide_react = require("lucide-react");
let react = require("react");
let react_jsx_runtime = require("react/jsx-runtime");
//#region src/components/VisualCardBlock/VisualCardBlock.tsx
/** A photo-first card: background image with gradient, a tag on top and a body panel at the bottom. */
const VisualCard = (0, react.forwardRef)((props, ref) => {
	const { item, clickable = false, onClick, className } = props;
	const { tag, body, bgImageSrc, bgImageAlt } = item;
	const backgroundImage = require_utils.toCssUrl(bgImageSrc);
	const cardImageStyle = backgroundImage ? { "--inv-visual-card-image": backgroundImage } : void 0;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		ref,
		className: (0, clsx.default)("inv-visual-first-card", clickable ? "inv-visual-first-card--clickable" : "inv-visual-first-card--static", className),
		style: cardImageStyle,
		"aria-label": cardImageStyle ? bgImageAlt : void 0,
		role: clickable ? "button" : void 0,
		tabIndex: clickable ? 0 : void 0,
		onClick: clickable ? onClick : void 0,
		onKeyDown: clickable && onClick ? require_CardBlockLayout.cardKeyDownHandler(onClick) : void 0,
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
			className: "inv-visual-first-card__top",
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: "inv-visual-first-card__tag",
				children: tag ?? null
			}), clickable && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: "inv-visual-first-card__action",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.ChevronRight, { size: 16 })
			})]
		}), body ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: "inv-visual-first-card__bottom",
			children: body
		}) : null]
	});
});
VisualCard.displayName = "VisualCard";
/** A three-per-row grid or carousel of VisualCards. */
const VisualCardBlock = (0, react.forwardRef)((props, ref) => {
	const { items, layout, responsive, gap, clickable = false, onItemClick, className } = props;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_CardBlockLayout.CardBlockLayout, {
		ref,
		size: "medium",
		cardType: "visual-first-card",
		"data-card-type": "VisualCard",
		items,
		layout,
		responsive,
		maxPerRow: 3,
		gap,
		className,
		itemKey: (item, index) => item.id ?? `visual-card-${index}`,
		renderItem: (item, index) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(VisualCard, {
			item,
			clickable,
			onClick: () => onItemClick?.(index)
		})
	});
});
VisualCardBlock.displayName = "VisualCardBlock";
//#endregion
exports.VisualCard = VisualCard;
exports.VisualCardBlock = VisualCardBlock;

//# sourceMappingURL=index.cjs.map