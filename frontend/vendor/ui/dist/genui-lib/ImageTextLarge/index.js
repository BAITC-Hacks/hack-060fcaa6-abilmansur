"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { defineComponent } from "@inv/lang";
import { ImageTextLarge as InvImageTextLarge } from "../../components/ImageTextLarge";
import { ImageTextLargeSchema } from "./schema";
export * from "./schema";
function ImageTextLargeRenderer({ props }) {
    return (_jsx(InvImageTextLarge, { src: props.src, alt: props.alt, title: props.title, subtitle: props.subtitle }));
}
export const ImageTextLarge = defineComponent({
    name: "ImageTextLarge",
    props: ImageTextLargeSchema,
    description: "A full-width banner image above a bold title and optional subtitle. src must be a real image URL.",
    component: ImageTextLargeRenderer,
});
//# sourceMappingURL=index.js.map