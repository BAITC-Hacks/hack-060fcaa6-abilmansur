"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { defineComponent } from "@inv/lang";
import React from "react";
import { z } from "zod/v4";
import { Accordion as InvAccordion, AccordionContent as InvAccordionContent, AccordionItem as InvAccordionItem, AccordionTrigger as InvAccordionTrigger, } from "../../components/Accordion";
import { AccordionItemSchema } from "./schema";
export { AccordionItemSchema } from "./schema";
export const AccordionItem = defineComponent({
    name: "AccordionItem",
    props: AccordionItemSchema,
    description: "value is unique id, trigger is section title",
    component: () => null,
});
/** Shared renderer — also used by the chat library's Accordion variant (wider content union). */
export const AccordionRenderer = ({ props, renderNode }) => {
    const items = props.items ?? [];
    const [openItem, setOpenItem] = React.useState("");
    const userHasInteracted = React.useRef(false);
    const prevItemCount = React.useRef(0);
    // Auto-open: only when a NEW item arrives during streaming
    if (!userHasInteracted.current && items.length > prevItemCount.current) {
        const newest = items[items.length - 1];
        if (newest)
            setOpenItem(newest.props.value);
    }
    prevItemCount.current = items.length;
    const handleValueChange = (value) => {
        userHasInteracted.current = true;
        setOpenItem(value);
    };
    if (!items.length)
        return null;
    return (_jsx(InvAccordion, { type: "single", collapsible: true, value: openItem, onValueChange: handleValueChange, children: items.map((item) => (_jsxs(InvAccordionItem, { value: item.props.value, children: [_jsx(InvAccordionTrigger, { text: item.props.trigger }), _jsx(InvAccordionContent, { children: renderNode(item.props.content) })] }, item.props.value))) }));
};
export const Accordion = defineComponent({
    name: "Accordion",
    props: z.object({
        items: z.array(AccordionItem.ref),
    }),
    description: "Collapsible sections",
    component: AccordionRenderer,
});
//# sourceMappingURL=index.js.map