import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import clsx from "clsx";
import { useCallback, useMemo, useState } from "react";
import { Button } from "../Button";
import { GalleryModal } from "./GalleryModal";
const MAX_GRID_IMAGES = 5;
const getLayoutClassName = (imageCount) => {
    switch (imageCount) {
        case 1:
            return "inv-gallery--single";
        case 2:
            return "inv-gallery--double";
        case 3:
            return "inv-gallery--triple";
        case 4:
            return "inv-gallery--quad";
        default:
            return "inv-gallery--default";
    }
};
export const ImageGallery = ({ images }) => {
    const [showAll, setShowAll] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    // Memoize layout class to prevent recalculation
    const layoutClass = useMemo(() => getLayoutClassName(images.length), [images.length]);
    // Memoize whether to show button
    const shouldShowButton = useMemo(() => images.length > MAX_GRID_IMAGES, [images.length]);
    // Memoize visible images
    const visibleImages = useMemo(() => images.slice(0, MAX_GRID_IMAGES), [images]);
    // Memoize callbacks
    const toggleShowAll = useCallback(() => {
        setShowAll((prev) => !prev);
    }, []);
    const handleImageClick = useCallback((index) => {
        setSelectedImageIndex(index);
        setShowAll(true);
    }, []);
    const setSelectedImageIndexMemoized = useCallback((index) => {
        setSelectedImageIndex(index);
    }, []);
    return (_jsxs("div", { className: clsx("inv-gallery", layoutClass), children: [_jsxs("div", { className: "inv-gallery__grid", children: [visibleImages.map((image, index) => (_jsx("div", { className: clsx("inv-gallery__image", index === 0 && "inv-gallery__image--main"), onClick: () => handleImageClick(index), children: _jsx("img", { src: image.src, alt: image.alt || `Gallery image ${index + 1}` }) }, index))), shouldShowButton && (_jsx("div", { className: "inv-gallery__show-all-button", children: _jsx(Button, { variant: "primary", size: "small", onClick: toggleShowAll, children: "Show All" }) }))] }), showAll && (_jsx(GalleryModal, { images: images, selectedImageIndex: selectedImageIndex, setSelectedImageIndex: setSelectedImageIndexMemoized, onClose: toggleShowAll }))] }));
};
//# sourceMappingURL=ImageGallery.js.map