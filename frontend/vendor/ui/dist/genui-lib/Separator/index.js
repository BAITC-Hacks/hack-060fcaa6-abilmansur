"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { defineComponent } from "@inv/lang";
import { Separator as InvSeparator } from "../../components/Separator";
import { SeparatorSchema } from "./schema";
export * from "./schema";
export const Separator = defineComponent({
    name: "Separator",
    props: SeparatorSchema,
    description: "Visual divider between content sections",
    component: ({ props }) => (_jsx(InvSeparator, { orientation: props.orientation, decorative: props.decorative })),
});
//# sourceMappingURL=index.js.map