import { jsx as _jsx } from "react/jsx-runtime";
import * as AspectRatio from "@radix-ui/react-aspect-ratio";
import clsx from "clsx";
import { forwardRef, useState } from "react";
const aspectRatioMap = {
    "1:1": 1,
    "3:2": 3 / 2,
    "3:4": 3 / 4,
    "4:3": 4 / 3,
    "16:9": 16 / 9,
};
const scaleMap = {
    fit: "inv-image-fit",
    fill: "inv-image-fill",
};
export const Image = forwardRef((props, ref) => {
    const { src, alt, styles, className, aspectRatio = "3:2", scale = "fill", ...rest } = props;
    const [hasError, setHasError] = useState(false);
    const imageClasses = clsx("inv-image", {
        [`${scaleMap[scale]}`]: scale,
        "inv-image--error": hasError,
    }, className);
    const image = (_jsx("img", { ref: ref, src: src, alt: alt, className: imageClasses, style: styles, onLoad: () => setHasError(false), onError: () => setHasError(true), ...rest }));
    return _jsx(AspectRatio.Root, { ratio: aspectRatioMap[aspectRatio], children: image });
});
Image.displayName = "Image";
//# sourceMappingURL=Image.js.map