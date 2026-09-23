"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { defineComponent } from "@inv/lang";
import { ImageBlock as InvImageBlock } from "../../components/ImageBlock";
import { ImageBlockSchema } from "./schema";
export { ImageBlockSchema } from "./schema";
export const ImageBlock = defineComponent({
    name: "ImageBlock",
    props: ImageBlockSchema,
    description: "Image block with loading state",
    component: ({ props }) => (_jsx(InvImageBlock, { src: props.src, alt: props.alt })),
});
//# sourceMappingURL=index.js.map