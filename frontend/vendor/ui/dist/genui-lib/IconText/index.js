"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { defineComponent } from "@inv/lang";
import { IconText as InvIconText } from "../../components/IconText";
import { IconTextSchema } from "./schema";
export * from "./schema";
function IconTextRenderer({ props }) {
    return (_jsx(InvIconText, { icon: props.icon.props, iconVariant: props.iconVariant, title: props.title, subtitle: props.subtitle, bold: props.bold, layout: props.layout }));
}
export const IconText = defineComponent({
    name: "IconText",
    props: IconTextSchema,
    description: "An icon badge with a title and optional subtitle, laid out horizontally or vertically. iconVariant sets the badge color.",
    component: IconTextRenderer,
});
//# sourceMappingURL=index.js.map