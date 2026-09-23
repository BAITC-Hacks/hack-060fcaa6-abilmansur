"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { defineComponent } from "@inv/lang";
import { ImageGallery as InvImageGallery } from "../../components/ImageGallery";
import { ImageGallerySchema } from "./schema";
export { ImageGallerySchema } from "./schema";
export const ImageGallery = defineComponent({
    name: "ImageGallery",
    props: ImageGallerySchema,
    description: "Gallery grid of images with modal preview",
    component: ({ props }) => {
        const images = Array.isArray(props.images) ? props.images : [];
        if (!images.length)
            return null;
        return (_jsx(InvImageGallery, { images: images }));
    },
});
//# sourceMappingURL=index.js.map