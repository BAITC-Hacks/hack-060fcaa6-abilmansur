"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { defineComponent } from "@inv/lang";
import { Buttons as InvButtons } from "../../components/Buttons";
import { ButtonsSchema } from "./schema";
export { ButtonsSchema } from "./schema";
const directionToVariant = {
    row: "horizontal",
    column: "vertical",
};
export const Buttons = defineComponent({
    name: "Buttons",
    props: ButtonsSchema,
    description: 'Group of Button components. direction: "row" (default) | "column".',
    component: ({ props, renderNode }) => (_jsx(InvButtons, { variant: directionToVariant[props.direction] ?? "horizontal", children: renderNode(props.buttons) })),
});
//# sourceMappingURL=index.js.map