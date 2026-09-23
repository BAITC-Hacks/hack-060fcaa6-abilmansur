"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { defineComponent } from "@inv/lang";
import { Image as InvImage } from "../../components/Image";
import { ImageSchema } from "./schema";
export { ImageSchema } from "./schema";
export const Image = defineComponent({
    name: "Image",
    props: ImageSchema,
    description: "Image with alt text and optional URL",
    component: ({ props }) => (_jsx(InvImage, { src: props.src || "", alt: props.alt })),
});
//# sourceMappingURL=index.js.map