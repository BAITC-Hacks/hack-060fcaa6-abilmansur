import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as SelectPrimitive from "@radix-ui/react-select";
import clsx from "clsx";
import { Check, ChevronDown } from "lucide-react";
import { createContext, forwardRef, useContext, useEffect, useMemo, useState } from "react";
import { useTheme } from "../ThemeProvider";
const SelectSizeContext = createContext(null);
const useSelectSizeContext = () => useContext(SelectSizeContext);
export const Select = ({ size = "md", ...props }) => {
    const [currentSize, setCurrentSize] = useState(size);
    useEffect(() => {
        setCurrentSize(size);
    }, [size]);
    const contextValue = useMemo(() => ({ size: currentSize, setSize: setCurrentSize }), [currentSize]);
    return (_jsx(SelectSizeContext.Provider, { value: contextValue, children: _jsx(SelectPrimitive.Root, { ...props }) }));
};
export const SelectGroup = forwardRef(({ className, style, ...props }, ref) => (_jsx(SelectPrimitive.Group, { ref: ref, className: clsx("inv-select-group", className), style: style, ...props })));
export const SelectValue = SelectPrimitive.Value;
const sizeMap = {
    sm: "inv-select-trigger-sm",
    md: "inv-select-trigger-md",
    lg: "inv-select-trigger-lg",
};
export const SelectTrigger = forwardRef(({ className, style, children, hideDropdownIcon, size, ...props }, ref) => {
    const sizeContext = useSelectSizeContext();
    const resolvedSize = size ?? sizeContext?.size ?? "md";
    useEffect(() => {
        if (sizeContext && sizeContext.size !== resolvedSize) {
            sizeContext.setSize(resolvedSize);
        }
    }, [resolvedSize, sizeContext]);
    return (_jsxs(SelectPrimitive.Trigger, { ref: ref, className: clsx("inv-select-trigger", sizeMap[resolvedSize], className), style: style, ...props, children: [children, _jsx(SelectPrimitive.Icon, { asChild: true, children: !hideDropdownIcon && _jsx(ChevronDown, { className: "inv-select-trigger-icon" }) })] }));
});
export const SelectContent = forwardRef(({ className, children, position = "popper", ...props }, ref) => {
    const { portalThemeClassName } = useTheme();
    const sizeContext = useSelectSizeContext();
    return (_jsx(SelectPrimitive.Portal, { children: _jsx(SelectPrimitive.Content, { ref: ref, className: clsx("inv-select-content", sizeContext && `inv-select-content-${sizeContext.size}`, className, portalThemeClassName), position: position, sideOffset: 2, ...props, children: _jsx(SelectPrimitive.Viewport, { className: "inv-select-viewport", "data-position": position, children: children }) }) }));
});
export const SelectLabel = forwardRef(({ className, style, ...props }, ref) => (_jsx(SelectPrimitive.Label, { ref: ref, className: clsx("inv-select-label", className), style: style, ...props })));
export const SelectItem = forwardRef(({ className, style, children, showTick = true, textValue, ...props }, ref) => (_jsxs(SelectPrimitive.Item, { ref: ref, className: clsx("inv-select-item", showTick ? "inv-select-item--with-tick" : "inv-select-item--without-tick", className), style: style, ...props, children: [showTick && (_jsx("span", { className: "inv-select-item-check-wrapper", children: _jsx(SelectPrimitive.ItemIndicator, { children: _jsx(Check, { className: "inv-select-item-check-icon" }) }) })), _jsx(SelectPrimitive.ItemText, { className: "inv-select-item-text", children: children }), textValue && _jsx("span", { className: "inv-select-item-text-value", children: textValue })] })));
export const SelectSeparator = forwardRef(({ className, style, ...props }, ref) => (_jsx(SelectPrimitive.Separator, { ref: ref, className: clsx("inv-select-separator", className), style: style, ...props })));
//# sourceMappingURL=Select.js.map