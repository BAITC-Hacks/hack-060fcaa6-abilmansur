Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const require_chunk = require("../../chunk-CKQMccvm.cjs");
const require_CardBlockLayout = require("../../CardBlockLayout-BToxdo9d.cjs");
const require_components_TooltipWrapper_index = require("../TooltipWrapper/index.cjs");
let clsx = require("clsx");
clsx = require_chunk.__toESM(clsx);
let lucide_react = require("lucide-react");
let react = require("react");
let react_jsx_runtime = require("react/jsx-runtime");
//#region src/components/SnippetCardBlock/SnippetCardBlock.tsx
const TEXT_BLOCK_HEADING_SELECTOR = ".inv-text-block__primary";
const TEXT_BLOCK_CONTENT_SELECTOR = ".inv-text-block__secondary";
const SnippetCardBlock = (0, react.forwardRef)((props, ref) => {
	const { items, responsive = true, gap, clickable = false, onItemClick, className, ...rest } = props;
	const isClickable = clickable && Boolean(onItemClick);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_CardBlockLayout.CardBlockLayout, {
		ref,
		size: "small",
		cardType: "value-card",
		"data-card-type": "SnippetCard",
		items: items ?? [],
		layout: "grid",
		responsive,
		maxPerRow: 2,
		gap,
		className,
		itemKey: (item, index) => item.id ?? `snippet-card-${index}`,
		renderItem: (item, index) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
			className: (0, clsx.default)("inv-value-card", !isClickable && "inv-value-card--static", isClickable && "inv-value-card--clickable"),
			role: isClickable ? "button" : void 0,
			tabIndex: isClickable ? 0 : void 0,
			onClick: isClickable ? () => onItemClick?.(item, index) : void 0,
			onKeyDown: isClickable ? require_CardBlockLayout.cardKeyDownHandler(() => onItemClick?.(item, index)) : void 0,
			children: [item.lhs != null && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_components_TooltipWrapper_index.TooltipWrapper, {
				tooltipHeading: item.lhsTooltip?.heading,
				tooltipContent: item.lhsTooltip?.content,
				showOnlyWhenTruncated: true,
				headingSelector: TEXT_BLOCK_HEADING_SELECTOR,
				contentSelector: TEXT_BLOCK_CONTENT_SELECTOR,
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: "inv-value-card__lhs",
					children: item.lhs
				})
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: "inv-value-card__rhs",
				children: item.rhs != null ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_components_TooltipWrapper_index.TooltipWrapper, {
					tooltipHeading: item.rhsTooltip?.heading,
					tooltipContent: item.rhsTooltip?.content,
					showOnlyWhenTruncated: true,
					headingSelector: TEXT_BLOCK_HEADING_SELECTOR,
					contentSelector: TEXT_BLOCK_CONTENT_SELECTOR,
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: "inv-value-card__rhs-content",
						children: item.rhs
					})
				}) : isClickable && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: "inv-value-card__chevron",
					"aria-hidden": "true",
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.ChevronRight, { size: 14 })
				})
			})]
		}),
		...rest
	});
});
SnippetCardBlock.displayName = "SnippetCardBlock";
//#endregion
exports.SnippetCardBlock = SnippetCardBlock;

//# sourceMappingURL=index.cjs.map