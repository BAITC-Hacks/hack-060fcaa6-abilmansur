import React from "react";
export interface ImageItem {
    src: string;
    alt?: string;
    details?: string;
}
export interface InvGalleryProps {
    images: ImageItem[];
}
export declare const ImageGallery: React.FC<InvGalleryProps>;
//# sourceMappingURL=ImageGallery.d.ts.map