"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { defineComponent } from "@inv/lang";
import { TextCallout as InvTextCallout } from "../../components/TextCallout";
import { TextCalloutSchema } from "./schema";
export { TextCalloutSchema } from "./schema";
export const TextCallout = defineComponent({
    name: "TextCallout",
    props: TextCalloutSchema,
    description: "Text callout with variant, title, and description",
    component: ({ props }) => (_jsx(InvTextCallout, { variant: props.variant, title: props.title, description: props.description })),
});
//# sourceMappingURL=index.js.map