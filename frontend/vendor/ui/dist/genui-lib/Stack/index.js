"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { defineComponent } from "@inv/lang";
import { StackSchema } from "./schema";
export { StackSchema } from "./schema";
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
export const Stack = defineComponent({
    name: "Stack",
    props: StackSchema,
    description: 'Flex container. direction: "row"|"column" (default "column"). gap: "none"|"xs"|"s"|"m"|"l"|"xl"|"2xl" (default "m"). align: "start"|"center"|"end"|"stretch"|"baseline". justify: "start"|"center"|"end"|"between"|"around"|"evenly".',
    component: ({ props, renderNode }) => {
        const justify = props.wrap && props.justify === "between" ? "start" : props.justify;
        return (_jsx("div", { style: {
                display: "flex",
                flexDirection: (props.direction ?? "column"),
                gap: gapMap[props.gap || "m"] || gapMap["m"],
                alignItems: alignMap[props.align],
                justifyContent: justifyMap[justify],
                flexWrap: props.wrap ? "wrap" : undefined,
            }, children: renderNode(props.children) }));
    },
});
//# sourceMappingURL=index.js.map