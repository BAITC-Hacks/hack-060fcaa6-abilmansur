"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { defineComponent } from "@inv/lang";
import { MetricIndicatorInline as InvMetricIndicatorInline, MetricIndicatorWithStrikethrough as InvMetricIndicatorWithStrikethrough, } from "../../components/MetricIndicator";
import { MetricIndicatorInlineSchema, MetricIndicatorWithStrikethroughSchema, } from "./schema";
export * from "./schema";
function MetricIndicatorWithStrikethroughRenderer({ props, }) {
    return (_jsx(InvMetricIndicatorWithStrikethrough, { value: props.value, subtext: props.subtext, previousValue: props.previousValue, trend: props.trend }));
}
function MetricIndicatorInlineRenderer({ props, }) {
    return (_jsx(InvMetricIndicatorInline, { value: props.value, subtext: props.subtext, trend: props.trend }));
}
export const MetricIndicatorWithStrikethrough = defineComponent({
    name: "MetricIndicatorWithStrikethrough",
    props: MetricIndicatorWithStrikethroughSchema,
    description: "Headline metric value with an optional struck-through previousValue, a +/- percentage trend, and subtext below.",
    component: MetricIndicatorWithStrikethroughRenderer,
});
export const MetricIndicatorInline = defineComponent({
    name: "MetricIndicatorInline",
    props: MetricIndicatorInlineSchema,
    description: "Headline metric value with an optional +/- percentage trend and subtext, all on one line.",
    component: MetricIndicatorInlineRenderer,
});
//# sourceMappingURL=index.js.map