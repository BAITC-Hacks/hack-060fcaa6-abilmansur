Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const require_chunk = require("../../chunk-CKQMccvm.cjs");
const require_utils = require("../../utils-DcYdyqC-.cjs");
const require_CardBlockLayout = require("../../CardBlockLayout-BToxdo9d.cjs");
const require_InlineMarkdownRenderer = require("../../InlineMarkdownRenderer-BVDLD2eH.cjs");
let clsx = require("clsx");
clsx = require_chunk.__toESM(clsx);
let lucide_react = require("lucide-react");
let react = require("react");
let react_jsx_runtime = require("react/jsx-runtime");
//#region src/components/ContextCardBlock/ContextCardBlock.tsx
/** A compact tinted card with a title (text or tag) and a bold markdown body. */
const ContextCard = (0, react.forwardRef)((props, ref) => {
	const { item, clickable = false, onClick, className } = props;
	const { title, body, bgColor, bgImageSrc, bgImageAlt } = item;
	const backgroundImage = require_utils.toCssUrl(bgImageSrc);
	const variant = backgroundImage ? "image" : bgColor;
	const titleContent = title == null || title === "" ? null : typeof title === "string" ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
		className: "inv-context-card__title-text",
		children: title
	}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		className: "inv-context-card__tag-wrapper",
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: "inv-context-card__tag",
			children: title
		})
	});
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		ref,
		className: (0, clsx.default)("inv-context-card", clickable ? "inv-context-card--clickable" : "inv-context-card--static", variant && `inv-context-card--variant-${variant}`, className),
		style: backgroundImage ? { backgroundImage } : void 0,
		"aria-label": backgroundImage ? bgImageAlt : void 0,
		role: clickable ? "button" : void 0,
		tabIndex: clickable ? 0 : void 0,
		onClick: clickable ? onClick : void 0,
		onKeyDown: clickable && onClick ? require_CardBlockLayout.cardKeyDownHandler(onClick) : void 0,
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
			className: "inv-context-card__vertical",
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: "inv-context-card__slot inv-context-card__slot--top",
				children: [titleContent, clickable && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: "inv-context-card__chevron",
					"aria-hidden": "true",
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.ChevronRight, { size: 16 })
				})]
			}), body && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: "inv-context-card__slot inv-context-card__slot--bottom",
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: "inv-context-card__body-text",
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_InlineMarkdownRenderer.InlineMarkdownRenderer, { content: body })
				})
			})]
		})
	});
});
ContextCard.displayName = "ContextCard";
/** A grid or carousel of ContextCards (uses the small card block layout). */
const ContextCardBlock = (0, react.forwardRef)((props, ref) => {
	const { items, layout, responsive, gap, clickable = false, onItemClick, className } = props;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_CardBlockLayout.CardBlockLayout, {
		ref,
		size: "small",
		cardType: "context-card",
		"data-card-type": "ContextCard",
		items,
		layout,
		responsive,
		maxPerRow: 3,
		gap,
		className,
		itemKey: (item, index) => item.id ?? `context-card-${index}`,
		renderItem: (item, index) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ContextCard, {
			item,
			clickable,
			onClick: () => onItemClick?.(index)
		})
	});
});
ContextCardBlock.displayName = "ContextCardBlock";
//#endregion
exports.ContextCard = ContextCard;
exports.ContextCardBlock = ContextCardBlock;

//# sourceMappingURL=index.cjs.map