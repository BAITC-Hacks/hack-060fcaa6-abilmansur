import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import clsx from "clsx";
import { forwardRef } from "react";
const MetricIndicatorBase = forwardRef(({ value, subtext, previousValue, trend, variant, className }, ref) => {
    const isPositive = trend?.direction === "up";
    const isInline = variant === "inline";
    return (_jsxs("div", { ref: ref, className: clsx("inv-metric-indicator", `inv-metric-indicator--variant-${variant}`, subtext && "inv-metric-indicator--has-subtext", className), children: [_jsxs("div", { className: "inv-metric-indicator__row", children: [_jsx("div", { className: "inv-metric-indicator__main-value", children: value }), !isInline && previousValue && (_jsx("div", { className: "inv-metric-indicator__previous-value", children: previousValue })), trend && (_jsxs("div", { className: clsx("inv-metric-indicator__trend", isPositive
                            ? "inv-metric-indicator__trend--success"
                            : "inv-metric-indicator__trend--danger"), children: [isPositive ? "+" : "-", trend.value, "%"] })), isInline && subtext && _jsx("div", { className: "inv-metric-indicator__subtext", children: subtext })] }), !isInline && subtext && _jsx("div", { className: "inv-metric-indicator__subtext", children: subtext })] }));
});
MetricIndicatorBase.displayName = "MetricIndicatorBase";
/** A headline metric with an optional struck-through previous value, trend and subtext. */
export const MetricIndicatorWithStrikethrough = forwardRef((props, ref) => _jsx(MetricIndicatorBase, { ref: ref, ...props, variant: "with-strikethrough" }));
MetricIndicatorWithStrikethrough.displayName = "MetricIndicatorWithStrikethrough";
/** A headline metric with trend and subtext rendered on a single line. */
export const MetricIndicatorInline = forwardRef((props, ref) => _jsx(MetricIndicatorBase, { ref: ref, ...props, variant: "inline" }));
MetricIndicatorInline.displayName = "MetricIndicatorInline";
//# sourceMappingURL=MetricIndicator.js.map