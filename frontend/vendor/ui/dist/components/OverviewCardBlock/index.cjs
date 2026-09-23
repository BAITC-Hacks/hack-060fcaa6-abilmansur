Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const require_chunk = require("../../chunk-CKQMccvm.cjs");
const require_CardBlockLayout = require("../../CardBlockLayout-BToxdo9d.cjs");
const require_components_MetricIndicator_index = require("../MetricIndicator/index.cjs");
let clsx = require("clsx");
clsx = require_chunk.__toESM(clsx);
let lucide_react = require("lucide-react");
let react = require("react");
let react_jsx_runtime = require("react/jsx-runtime");
//#region src/components/OverviewCardBlock/OverviewCardBlock.tsx
const OverviewCardBlock = (0, react.forwardRef)((props, ref) => {
	const { items, layout = "grid", responsive = true, gap, clickable = false, onItemClick, className, ...rest } = props;
	const isClickable = clickable && Boolean(onItemClick);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_CardBlockLayout.CardBlockLayout, {
		ref,
		size: "small",
		cardType: "overview-card",
		"data-card-type": "OverviewCard",
		items: items ?? [],
		layout,
		responsive,
		maxPerRow: 3,
		gap,
		className,
		itemKey: (item, index) => item.id ?? `overview-card-${index}`,
		renderItem: (item, index) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: (0, clsx.default)("inv-overview-card", isClickable && "inv-overview-card--clickable"),
			role: isClickable ? "button" : void 0,
			tabIndex: isClickable ? 0 : void 0,
			onClick: isClickable ? () => onItemClick?.(item, index) : void 0,
			onKeyDown: isClickable ? require_CardBlockLayout.cardKeyDownHandler(() => onItemClick?.(item, index)) : void 0,
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: "inv-overview-card__vertical",
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: "inv-overview-card__top-row",
					children: [item.top != null && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: "inv-overview-card__slot inv-overview-card__slot--top",
						children: item.top
					}), isClickable && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: "inv-overview-card__chevron",
						"aria-hidden": "true",
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.ChevronRight, { size: 14 })
					})]
				}), item.bottom && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: "inv-overview-card__slot inv-overview-card__slot--bottom",
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_components_MetricIndicator_index.MetricIndicatorInline, { ...item.bottom })
				})]
			})
		}),
		...rest
	});
});
OverviewCardBlock.displayName = "OverviewCardBlock";
//#endregion
exports.OverviewCardBlock = OverviewCardBlock;

//# sourceMappingURL=index.cjs.map