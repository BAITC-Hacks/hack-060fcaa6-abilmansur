"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { defineComponent } from "@inv/lang";
import { MarkDownRenderer as InvMarkDownRenderer } from "../../components/MarkDownRenderer";
import { MarkDownRendererSchema } from "./schema";
export { MarkDownRendererSchema } from "./schema";
export const MarkDownRenderer = defineComponent({
    name: "MarkDownRenderer",
    props: MarkDownRendererSchema,
    description: "Renders markdown text with optional container variant",
    component: ({ props }) => (_jsx(InvMarkDownRenderer, { textMarkdown: props.textMarkdown, variant: props.variant })),
});
//# sourceMappingURL=index.js.map