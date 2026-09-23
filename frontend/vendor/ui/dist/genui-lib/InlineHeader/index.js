"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { defineComponent } from "@inv/lang";
import { InlineHeader as InvInlineHeader } from "../../components/InlineHeader";
import { InlineHeaderSchema } from "./schema";
export * from "./schema";
function InlineHeaderRenderer({ props }) {
    return _jsx(InvInlineHeader, { heading: props.heading, description: props.description });
}
export const InlineHeader = defineComponent({
    name: "InlineHeader",
    props: InlineHeaderSchema,
    description: "Compact section heading with an optional one-line description, for use inside cards.",
    component: InlineHeaderRenderer,
});
//# sourceMappingURL=index.js.map