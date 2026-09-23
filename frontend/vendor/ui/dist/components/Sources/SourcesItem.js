import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import clsx from "clsx";
import { memo } from "react";
import { SourceFaviconImage } from "../SourceFaviconImage";
import { openSourceInNewTab } from "./SourceContext";
export const ListedSourceItem = memo((props) => {
    const { title, sourceName, onClick, faviconUrl, url, sourceId } = props;
    const handleClick = () => {
        openSourceInNewTab(url);
        onClick?.();
    };
    const hasUrl = url && url.trim() !== "";
    return (_jsxs("div", { className: clsx("inv-listed-source-item", {
            "inv-listed-source-item--has-url": hasUrl,
        }), onClick: handleClick, role: "button", tabIndex: 0, "data-source-id": sourceId, onKeyDown: (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                handleClick();
            }
        }, children: [_jsxs("div", { className: "inv-listed-source-item__header", children: [_jsx("div", { className: "inv-listed-source-item__logo", children: _jsx(SourceFaviconImage, { url: faviconUrl, alt: sourceName, width: 20, height: 20 }) }), _jsx("span", { className: "inv-listed-source-item__source-name", children: sourceName })] }), _jsx("div", { className: "inv-listed-source-item__title", children: title })] }));
});
ListedSourceItem.displayName = "ListedSourceItem";
//# sourceMappingURL=SourcesItem.js.map