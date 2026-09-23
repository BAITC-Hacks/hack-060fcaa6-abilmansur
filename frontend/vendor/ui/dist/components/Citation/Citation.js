import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as Tooltip from "@radix-ui/react-tooltip";
import clsx from "clsx";
import { memo } from "react";
import { usePinnableTooltip } from "../_shared/hooks";
import { IconWrapper } from "../_shared/icons";
import { useTheme } from "../ThemeProvider";
import { CitationItem } from "./CitationItem";
const MultiCitation = memo((props) => {
    const { sources } = props;
    const { portalThemeClassName } = useTheme();
    const { isOpen, handleMouseEnter, handleMouseLeave, handleTriggerClick, handleContentClick, closeTooltip, getPointerDownOutsideHandler, } = usePinnableTooltip();
    return (_jsx("span", { className: "inv-citation-container", children: _jsx(Tooltip.Provider, { children: _jsxs(Tooltip.Root, { open: isOpen, children: [_jsx(Tooltip.Trigger, { asChild: true, children: _jsx("button", { type: "button", className: "inv-citation", "aria-label": "Citations", onClick: handleTriggerClick, onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave, children: _jsx(IconWrapper, { name: "globe", size: 12 }) }) }), _jsx(Tooltip.Portal, { children: _jsx(Tooltip.Content, { side: "bottom", align: "start", sideOffset: 4, alignOffset: -8, className: clsx("inv-citation-tooltip", portalThemeClassName), onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave, onClick: handleContentClick, onPointerDownOutside: getPointerDownOutsideHandler(".inv-citation"), children: _jsx("div", { className: "inv-citation-tooltip__content", children: sources.map((itemProps, index) => {
                                    const { key: _key, ...rest } = itemProps;
                                    return _jsx(CitationItem, { ...rest, onClick: closeTooltip }, index);
                                }) }) }) })] }) }) }));
});
MultiCitation.displayName = "MultiCitation";
/**
 * Inline citation trigger: a small globe button that opens a pinnable tooltip
 * listing the cited sources.
 */
export const Citation = memo((props) => {
    const { sources } = props;
    if (!sources || sources.length === 0) {
        return null;
    }
    return _jsx(MultiCitation, { ...props });
});
Citation.displayName = "Citation";
//# sourceMappingURL=Citation.js.map