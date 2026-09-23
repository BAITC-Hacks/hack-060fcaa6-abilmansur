import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import clsx from "clsx";
import { forwardRef, useRef, useState } from "react";
import { useResponsiveContainer } from "../../hooks/useResponsiveContainer";
export const ImageBlock = forwardRef(({ src, alt, className, imageLoading, ...rest }, ref) => {
    const [isImageLoading, setIsImageLoading] = useState(imageLoading ?? true);
    const [hasError, setHasError] = useState(false);
    const containerRef = useRef(null);
    const { breakpoint } = useResponsiveContainer(containerRef);
    const isMobile = breakpoint === "mobile";
    if (!src)
        return null;
    return (_jsxs("div", { ref: (node) => {
            containerRef.current = node;
            if (typeof ref === "function")
                ref(node);
            else if (ref)
                ref.current = node;
        }, className: clsx("inv-image-block-wrapper", {
            "inv-image-block-wrapper--mobile": isMobile,
            "inv-image-block-wrapper--error": hasError,
        }, className), style: src && !hasError ? { "--bg-image": `url(${src})` } : undefined, ...rest, children: [_jsx("img", { src: src, alt: alt, className: clsx("inv-image-block-image", {
                    "inv-image-block-image--mobile": isMobile,
                    "inv-image-block-image--error": hasError,
                }), onLoad: () => {
                    setIsImageLoading(false);
                    setHasError(false);
                }, onError: () => {
                    setIsImageLoading(false);
                    setHasError(true);
                } }), isImageLoading && _jsx("div", { className: "inv-image-block-loader" })] }));
});
ImageBlock.displayName = "ImageBlock";
//# sourceMappingURL=ImageBlock.js.map