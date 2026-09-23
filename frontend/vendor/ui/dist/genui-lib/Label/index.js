"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { defineComponent } from "@inv/lang";
import { Label as InvLabel } from "../../components/Label";
import { LabelSchema } from "./schema";
export { LabelSchema } from "./schema";
export const Label = defineComponent({
    name: "Label",
    props: LabelSchema,
    description: "Text label",
    component: ({ props }) => _jsx(InvLabel, { children: props.text }),
});
//# sourceMappingURL=index.js.map