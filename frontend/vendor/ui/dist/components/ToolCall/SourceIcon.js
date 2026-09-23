import { jsx as _jsx } from "react/jsx-runtime";
import { Globe } from "lucide-react";
import { useState } from "react";
/**
 * Favicon for a web-search source, falling back to a globe glyph when the image
 * is missing, fails to load, or resolves to a default 16×16 placeholder.
 *
 * @category Components
 */
export const SourceIcon = ({ src }) => {
    const [failed, setFailed] = useState(false);
    if (!src || failed) {
        return _jsx(Globe, { size: 16, className: "inv-tool-call__icon" });
    }
    return (_jsx("img", { src: src, alt: "", className: "inv-tool-call__source-logo", onLoad: (e) => {
            const img = e.currentTarget;
            // Google's default favicon is 16x16 — treat as missing.
            if (img.naturalWidth <= 16 && img.naturalHeight <= 16) {
                setFailed(true);
            }
        }, onError: () => setFailed(true) }));
};
//# sourceMappingURL=SourceIcon.js.map