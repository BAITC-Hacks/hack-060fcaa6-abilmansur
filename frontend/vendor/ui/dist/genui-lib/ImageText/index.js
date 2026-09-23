"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { defineComponent } from "@inv/lang";
import { ImageText as InvImageText } from "../../components/ImageText";
import { ImageTextSchema } from "./schema";
export * from "./schema";
function ImageTextRenderer({ props }) {
    return (_jsx(InvImageText, { src: props.src, alt: props.alt, title: props.title, subtitle: props.subtitle, bold: props.bold, layout: props.layout, imageSize: props.imageSize }));
}
export const ImageText = defineComponent({
    name: "ImageText",
    props: ImageTextSchema,
    description: "A small square image (thumbnail/avatar) with a title and optional subtitle. src must be a real image URL.",
    component: ImageTextRenderer,
});
//# sourceMappingURL=index.js.map