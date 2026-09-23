import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import clsx from "clsx";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { memo, useCallback, useRef, useState } from "react";
import { Carousel, CarouselContent, CarouselItem } from "../Carousel";
import { IconButton } from "../IconButton";
import { ListedSourceItem } from "./SourcesItem";
export const ListedSources = memo((props) => {
    const sources = props.sources ?? [];
    const ref = useRef(null);
    const [scroll, setScroll] = useState({ left: false, right: false });
    const handleScrollLeftEnabled = useCallback((enabled) => {
        setScroll((prev) => ({ ...prev, left: enabled }));
    }, []);
    const handleScrollRightEnabled = useCallback((enabled) => {
        setScroll((prev) => ({ ...prev, right: enabled }));
    }, []);
    if (!sources.length)
        return null;
    // Show buttons only if there's overflow (can scroll left or right)
    const hasOverflow = scroll.left || scroll.right;
    return (_jsxs("div", { className: "inv-listed-sources", children: [_jsxs("div", { className: "inv-listed-sources-header", children: [_jsx("span", { className: "inv-listed-sources-header__title", children: "Sources" }), hasOverflow && (_jsxs("div", { className: "inv-listed-sources-header__buttons", children: [_jsx(IconButton, { variant: "secondary", size: "small", onClick: () => ref.current?.scroll("left"), disabled: !scroll.left, icon: _jsx(ChevronLeft, {}) }), _jsx(IconButton, { variant: "secondary", size: "small", onClick: () => ref.current?.scroll("right"), disabled: !scroll.right, icon: _jsx(ChevronRight, {}) })] }))] }), _jsx(Carousel, { variant: "sunk", ref: ref, showButtons: false, onScrollLeftEnabled: handleScrollLeftEnabled, onScrollRightEnabled: handleScrollRightEnabled, children: _jsx(CarouselContent, { children: sources.map((item, index) => {
                        const { key: _key, ...rest } = item;
                        return (_jsx(CarouselItem, { className: clsx("inv-listed-sources-item-container", {
                                "inv-listed-sources-item-container--has-url": item.url,
                            }), children: _jsx(ListedSourceItem, { ...rest, sourceId: index }) }, item.url ?? index));
                    }) }) })] }));
});
ListedSources.displayName = "ListedSources";
//# sourceMappingURL=ListedSources.js.map