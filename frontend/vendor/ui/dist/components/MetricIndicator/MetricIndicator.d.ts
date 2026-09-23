export interface MetricIndicatorTrend {
    direction: "up" | "down";
    value: number;
}
export interface MetricIndicatorWithStrikethroughProps {
    value: string;
    subtext?: string;
    previousValue?: string;
    trend?: MetricIndicatorTrend;
    className?: string;
}
export interface MetricIndicatorInlineProps {
    value: string;
    subtext?: string;
    trend?: MetricIndicatorTrend;
    className?: string;
}
/** A headline metric with an optional struck-through previous value, trend and subtext. */
export declare const MetricIndicatorWithStrikethrough: import("react").ForwardRefExoticComponent<MetricIndicatorWithStrikethroughProps & import("react").RefAttributes<HTMLDivElement>>;
/** A headline metric with trend and subtext rendered on a single line. */
export declare const MetricIndicatorInline: import("react").ForwardRefExoticComponent<MetricIndicatorInlineProps & import("react").RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=MetricIndicator.d.ts.map