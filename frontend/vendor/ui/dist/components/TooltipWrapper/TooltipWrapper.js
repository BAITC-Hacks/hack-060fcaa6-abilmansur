import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as Tooltip from "@radix-ui/react-tooltip";
import clsx from "clsx";
import React, { cloneElement, isValidElement, useLayoutEffect, useRef, useState } from "react";
import { useTheme } from "../ThemeProvider";
export const TooltipWrapper = ({ tooltipHeading, tooltipContent, children, className, side = "bottom", align = "start", sideOffset = 5, alignOffset = 0, delayDuration = 100, showOnlyWhenTruncated = false, headingSelector, contentSelector, }) => {
    const { portalThemeClassName } = useTheme();
    const triggerRef = useRef(null);
    const [isHeadingTruncated, setIsHeadingTruncated] = useState(false);
    const [isContentTruncated, setIsContentTruncated] = useState(false);
    const child = React.Children.only(children);
    const triggerWithRef = isValidElement(child) && showOnlyWhenTruncated
        ? cloneElement(child, { ref: triggerRef })
        : children;
    useLayoutEffect(() => {
        const measure = () => {
            if (triggerRef.current) {
                const { children: childNodes } = triggerRef.current;
                const elements = Array.from(childNodes);
                const headingEl = headingSelector
                    ? (triggerRef.current.querySelector(headingSelector) ?? undefined)
                    : tooltipHeading
                        ? elements[0]
                        : undefined;
                const contentEl = contentSelector
                    ? (triggerRef.current.querySelector(contentSelector) ?? undefined)
                    : tooltipContent
                        ? tooltipHeading
                            ? elements[1]
                            : elements[elements.length - 1]
                        : undefined;
                if (headingEl) {
                    const isNowTruncated = headingEl.scrollWidth > headingEl.clientWidth ||
                        headingEl.scrollHeight > headingEl.clientHeight;
                    if (isNowTruncated !== isHeadingTruncated) {
                        setIsHeadingTruncated(isNowTruncated);
                    }
                }
                else if (isHeadingTruncated) {
                    setIsHeadingTruncated(false);
                }
                if (contentEl) {
                    const isNowTruncated = contentEl.scrollWidth > contentEl.clientWidth ||
                        contentEl.scrollHeight > contentEl.clientHeight;
                    if (isNowTruncated !== isContentTruncated) {
                        setIsContentTruncated(isNowTruncated);
                    }
                }
                else if (isContentTruncated) {
                    setIsContentTruncated(false);
                }
            }
        };
        if (showOnlyWhenTruncated) {
            measure();
            const resizeObserver = new ResizeObserver(measure);
            const trigger = triggerRef.current;
            if (trigger) {
                resizeObserver.observe(trigger);
            }
            return () => {
                if (trigger) {
                    resizeObserver.unobserve(trigger);
                }
            };
        }
        return undefined;
    }, [
        children,
        showOnlyWhenTruncated,
        isHeadingTruncated,
        isContentTruncated,
        tooltipHeading,
        tooltipContent,
        headingSelector,
        contentSelector,
    ]);
    const displayTooltipHeading = showOnlyWhenTruncated
        ? isHeadingTruncated
            ? tooltipHeading
            : undefined
        : tooltipHeading;
    const displayTooltipContent = showOnlyWhenTruncated
        ? isContentTruncated
            ? tooltipContent
            : undefined
        : tooltipContent;
    const hasContent = displayTooltipHeading || displayTooltipContent;
    if (!hasContent) {
        return _jsx(_Fragment, { children: triggerWithRef });
    }
    return (_jsx(Tooltip.Provider, { children: _jsxs(Tooltip.Root, { delayDuration: delayDuration, children: [_jsx(Tooltip.Trigger, { asChild: true, children: triggerWithRef }), _jsx(Tooltip.Portal, { children: _jsx(Tooltip.Content, { className: clsx("inv-tooltip-content", portalThemeClassName, className), side: side, align: align, sideOffset: sideOffset, alignOffset: alignOffset, children: _jsxs("div", { className: "inv-tooltip-body", children: [displayTooltipHeading && (_jsx("span", { className: "inv-tooltip-heading", children: displayTooltipHeading })), displayTooltipContent && (_jsx("span", { className: "inv-tooltip-text-content", children: displayTooltipContent }))] }) }) })] }) }));
};
//# sourceMappingURL=TooltipWrapper.js.map