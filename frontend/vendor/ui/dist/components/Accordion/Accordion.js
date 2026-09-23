import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import clsx from "clsx";
import { ChevronDownIcon } from "lucide-react";
import { forwardRef } from "react";
const variantMap = {
    clear: "inv-accordion-clear",
    card: "inv-accordion-card",
    sunk: "inv-accordion-sunk",
};
export const Accordion = forwardRef(({ className, style, variant = "clear", ...props }, ref) => (_jsx(AccordionPrimitive.Root, { ref: ref, className: clsx("inv-accordion", variantMap[variant], className), style: style, ...props })));
export const AccordionItem = forwardRef(({ className, style, value, ...props }, ref) => (_jsx(AccordionPrimitive.Item, { ref: ref, className: clsx("inv-accordion-item", className), style: style, value: value, ...props })));
export const AccordionTrigger = forwardRef(({ className, style, text, icon, ...props }, ref) => (_jsx(AccordionPrimitive.Header, { className: clsx("inv-accordion-header"), children: _jsxs(AccordionPrimitive.Trigger, { ref: ref, className: clsx("inv-accordion-trigger", className), style: style, ...props, children: [_jsxs("div", { className: "inv-accordion-trigger-content", children: [icon && _jsx("span", { className: "inv-accordion-trigger-content-icon", children: icon }), text] }), _jsx(ChevronDownIcon, { className: "inv-accordion-trigger-icon" })] }) })));
export const AccordionContent = forwardRef(({ className, style, children, ...props }, ref) => (_jsx(AccordionPrimitive.Content, { ref: ref, className: clsx("inv-accordion-content", className), style: style, ...props, children: _jsx("div", { className: "inv-accordion-content-wrapper", children: children }) })));
//# sourceMappingURL=Accordion.js.map