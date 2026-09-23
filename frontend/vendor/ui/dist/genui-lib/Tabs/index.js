"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { defineComponent } from "@inv/lang";
import React from "react";
import { z } from "zod/v4";
import { Tabs as InvTabs, TabsContent as InvTabsContent, TabsList as InvTabsList, TabsTrigger as InvTabsTrigger, } from "../../components/Tabs";
import { TabItemSchema } from "./schema";
export { TabItemSchema } from "./schema";
export const TabItem = defineComponent({
    name: "TabItem",
    props: TabItemSchema,
    description: "value is unique id, trigger is tab label, content is array of components",
    component: () => null,
});
/** Shared renderer — also used by the chat library's Tabs variant (wider content union). */
export const TabsRenderer = ({ props, renderNode }) => {
    const items = (props.items ?? []).filter((item) => item?.props?.value != null);
    const [activeTab, setActiveTab] = React.useState("");
    const userHasInteracted = React.useRef(false);
    const prevContentSizes = React.useRef({});
    React.useEffect(() => {
        const first = items[0];
        if (items.length && !activeTab && first) {
            setActiveTab(first.props.value);
        }
    }, [items.length, activeTab]);
    React.useEffect(() => {
        if (userHasInteracted.current)
            return;
        let candidate = null;
        const nextSizes = {};
        for (const item of items) {
            const size = JSON.stringify(item.props.content).length;
            const prevSize = prevContentSizes.current[item.props.value] ?? 0;
            nextSizes[item.props.value] = size;
            if (size > prevSize) {
                candidate = item.props.value;
            }
        }
        prevContentSizes.current = nextSizes;
        if (candidate && candidate !== activeTab) {
            setActiveTab(candidate);
        }
    });
    const handleValueChange = (value) => {
        userHasInteracted.current = true;
        setActiveTab(value);
    };
    if (!items.length)
        return null;
    return (_jsxs(InvTabs, { value: activeTab, onValueChange: handleValueChange, children: [_jsx(InvTabsList, { children: items.map((item) => (_jsx(InvTabsTrigger, { value: item.props.value, text: item.props.trigger }, item.props.value))) }), items.map((item) => (_jsx(InvTabsContent, { value: item.props.value, children: renderNode(item.props.content) }, item.props.value)))] }));
};
export const Tabs = defineComponent({
    name: "Tabs",
    props: z.object({
        items: z.array(TabItem.ref),
    }),
    description: "Tabbed container",
    component: TabsRenderer,
});
//# sourceMappingURL=index.js.map