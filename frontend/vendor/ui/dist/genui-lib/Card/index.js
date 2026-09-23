"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { defineComponent } from "@inv/lang";
import { Card as InvCard } from "../../components/Card";
import { CardSchema } from "./schema";
export { CardSchema } from "./schema";
const gapMap = {
    none: "0",
    xs: "var(--inv-space-xs)",
    s: "var(--inv-space-s)",
    m: "var(--inv-space-m)",
    l: "var(--inv-space-l)",
    xl: "var(--inv-space-xl)",
    "2xl": "var(--inv-space-2xl)",
};
const alignMap = {
    start: "flex-start",
    center: "center",
    end: "flex-end",
    stretch: "stretch",
    baseline: "baseline",
};
const justifyMap = {
    start: "flex-start",
    center: "center",
    end: "flex-end",
    between: "space-between",
    around: "space-around",
    evenly: "space-evenly",
};
export const Card = defineComponent({
    name: "Card",
    props: CardSchema,
    description: 'Styled container. variant: "card" (default, elevated) | "sunk" (recessed) | "clear" (transparent). Always full width. Accepts all Stack flex params (default: direction "column"). Cards flex to share space in row/wrap layouts.',
    component: ({ props, renderNode }) => (_jsx(InvCard, { variant: props.variant ?? "card", width: "full", style: {
            flex: 1,
            minWidth: 0,
            display: "flex",
            flexDirection: props.direction || "column",
            flexWrap: props.wrap ? "wrap" : "nowrap",
            gap: gapMap[props.gap || "m"] || gapMap["m"],
            alignItems: alignMap[props.align || "stretch"] || "stretch",
            justifyContent: justifyMap[props.justify || "start"] || "flex-start",
        }, children: renderNode(props.children) })),
});
//# sourceMappingURL=index.js.map