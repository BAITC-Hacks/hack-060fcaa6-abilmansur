import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import clsx from "clsx";
import { memo } from "react";
import { SourceFaviconImage } from "../SourceFaviconImage";
import { openSourceInNewTab } from "../Sources/SourceContext";
export const CitationItem = memo((props) => {
    const { title, sourceName, onClick, faviconUrl, url } = props;
    const handleClick = () => {
        openSourceInNewTab(url);
        onClick?.();
    };
    const hasUrl = url && url.trim() !== "";
    return (_jsxs("button", { className: clsx("inv-citation-item", {
            "inv-citation-item--has-url": hasUrl,
        }), onClick: handleClick, type: "button", children: [_jsx("div", { className: "inv-citation-item__logo", children: _jsx(SourceFaviconImage, { url: faviconUrl, alt: sourceName, width: 24, height: 24 }) }), _jsxs("div", { className: "inv-citation-item__content", children: [_jsx("div", { className: "inv-citation-item__title", children: title }), _jsx("div", { className: "inv-citation-item__source", children: sourceName })] })] }));
});
CitationItem.displayName = "CitationItem";
//# sourceMappingURL=CitationItem.js.map