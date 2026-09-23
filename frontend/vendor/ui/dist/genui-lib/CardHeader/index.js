"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { defineComponent } from "@inv/lang";
import { CardHeader as InvCardHeader } from "../../components/CardHeader";
import { CardHeaderSchema } from "./schema";
export { CardHeaderSchema } from "./schema";
export const CardHeader = defineComponent({
    name: "CardHeader",
    props: CardHeaderSchema,
    description: "Header with optional title and subtitle",
    component: ({ props }) => _jsx(InvCardHeader, { title: props.title, subtitle: props.subtitle }),
});
//# sourceMappingURL=index.js.map