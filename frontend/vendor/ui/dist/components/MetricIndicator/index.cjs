Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const require_chunk = require("../../chunk-CKQMccvm.cjs");
let clsx = require("clsx");
clsx = require_chunk.__toESM(clsx);
let react = require("react");
let react_jsx_runtime = require("react/jsx-runtime");
//#region src/components/MetricIndicator/MetricIndicator.tsx
const MetricIndicatorBase = (0, react.forwardRef)(({ value, subtext, previousValue, trend, variant, className }, ref) => {
	const isPositive = trend?.direction === "up";
	const isInline = variant === "inline";
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		ref,
		className: (0, clsx.default)("inv-metric-indicator", `inv-metric-indicator--variant-${variant}`, subtext && "inv-metric-indicator--has-subtext", className),
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
			className: "inv-metric-indicator__row",
			children: [
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: "inv-metric-indicator__main-value",
					children: value
				}),
				!isInline && previousValue && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: "inv-metric-indicator__previous-value",
					children: previousValue
				}),
				trend && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: (0, clsx.default)("inv-metric-indicator__trend", isPositive ? "inv-metric-indicator__trend--success" : "inv-metric-indicator__trend--danger"),
					children: [
						isPositive ? "+" : "-",
						trend.value,
						"%"
					]
				}),
				isInline && subtext && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: "inv-metric-indicator__subtext",
					children: subtext
				})
			]
		}), !isInline && subtext && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: "inv-metric-indicator__subtext",
			children: subtext
		})]
	});
});
MetricIndicatorBase.displayName = "MetricIndicatorBase";
/** A headline metric with an optional struck-through previous value, trend and subtext. */
const MetricIndicatorWithStrikethrough = (0, react.forwardRef)((props, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(MetricIndicatorBase, {
	ref,
	...props,
	variant: "with-strikethrough"
}));
MetricIndicatorWithStrikethrough.displayName = "MetricIndicatorWithStrikethrough";
/** A headline metric with trend and subtext rendered on a single line. */
const MetricIndicatorInline = (0, react.forwardRef)((props, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(MetricIndicatorBase, {
	ref,
	...props,
	variant: "inline"
}));
MetricIndicatorInline.displayName = "MetricIndicatorInline";
//#endregion
exports.MetricIndicatorInline = MetricIndicatorInline;
exports.MetricIndicatorWithStrikethrough = MetricIndicatorWithStrikethrough;

//# sourceMappingURL=index.cjs.map