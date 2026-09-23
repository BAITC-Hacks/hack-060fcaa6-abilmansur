import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import clsx from "clsx";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";
import { IconButton } from "../../../IconButton";
export const ScrollButtonsHorizontal = React.memo(({ dataWidth, effectiveWidth, canScrollLeft, canScrollRight, isSideBarTooltipOpen, onScrollLeft, onScrollRight, }) => {
    if (dataWidth <= effectiveWidth) {
        return null;
    }
    return (_jsxs("div", { className: "inv-chart-horizontal-scroll-buttons-container", children: [_jsx(IconButton, { className: clsx("inv-chart-horizontal-scroll-button inv-chart-horizontal-scroll-button--left", {
                    "inv-chart-horizontal-scroll-button--disabled": !canScrollLeft,
                }), icon: _jsx(ChevronLeft, {}), variant: "secondary", onClick: onScrollLeft, size: "2-extra-small", disabled: !canScrollLeft, "aria-label": "Scroll left" }), _jsx(IconButton, { className: clsx("inv-chart-horizontal-scroll-button inv-chart-horizontal-scroll-button--right", {
                    "inv-chart-horizontal-scroll-button--disabled": !canScrollRight,
                    "inv-chart-horizontal-scroll-button--SideBarTooltip": isSideBarTooltipOpen,
                }), icon: _jsx(ChevronRight, {}), variant: "secondary", size: "2-extra-small", onClick: onScrollRight, disabled: !canScrollRight, "aria-label": "Scroll right" })] }));
});
ScrollButtonsHorizontal.displayName = "ScrollButtonsHorizontal";
//# sourceMappingURL=ScrollButtonsHorizontal.js.map