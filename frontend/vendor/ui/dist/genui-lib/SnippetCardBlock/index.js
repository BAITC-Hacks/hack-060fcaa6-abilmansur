"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { defineComponent, useFormName, useIsStreaming, useTriggerAction, } from "@inv/lang";
import { SnippetCardBlock as InvSnippetCardBlock } from "../../components/SnippetCardBlock";
import { withItemContext } from "../cardActionUtils";
import { SnippetCardBlockSchema, } from "./schema";
export * from "./schema";
function getStringProp(node, key) {
    const props = typeof node === "object" && node !== null && "props" in node
        ? node.props
        : undefined;
    const value = props?.[key];
    return typeof value === "string" ? value : undefined;
}
function SnippetCardBlockRenderer({ props, renderNode, }) {
    const triggerAction = useTriggerAction();
    const formName = useFormName();
    const isStreaming = useIsStreaming();
    const items = (props.items ?? []);
    const isClickable = Boolean(props.action) && !isStreaming;
    const handleItemClick = (item, index) => {
        if (!props.action || isStreaming)
            return;
        const { id, lhs, rhs } = item.props;
        const label = getStringProp(lhs, "title") ?? id ?? `Snippet card ${index + 1}`;
        triggerAction(label, formName, withItemContext(props.action, {
            itemIndex: index,
            itemId: id,
            itemTitle: getStringProp(lhs, "title"),
            itemSubtitle: getStringProp(lhs, "subtitle"),
            itemValue: getStringProp(rhs, "value"),
        }));
    };
    return (_jsx(InvSnippetCardBlock, { responsive: props.responsive !== false, gap: props.gap, clickable: isClickable, onItemClick: isClickable
            ? (_item, index) => {
                const item = items[index];
                if (item)
                    handleItemClick(item, index);
            }
            : undefined, items: items.map((item) => {
            const { id, lhs, rhs } = item.props;
            return {
                id,
                lhs: renderNode(lhs),
                rhs: rhs ? renderNode({ ...rhs, props: { ...rhs.props, size: "xs" } }) : undefined,
                lhsTooltip: {
                    heading: getStringProp(lhs, "title"),
                    content: getStringProp(lhs, "subtitle"),
                },
                rhsTooltip: {
                    heading: getStringProp(rhs, "value"),
                    content: getStringProp(rhs, "subtext"),
                },
            };
        }) }));
}
export const SnippetCardBlock = defineComponent({
    name: "SnippetCardBlock",
    props: SnippetCardBlockSchema,
    description: "A responsive grid of compact label/value cards (2 per row) for showing several short facts side by side; optionally clickable with a shared action.",
    component: SnippetCardBlockRenderer,
});
//# sourceMappingURL=index.js.map