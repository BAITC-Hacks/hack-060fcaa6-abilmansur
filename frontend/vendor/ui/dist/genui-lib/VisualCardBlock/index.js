"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { defineComponent, useFormName, useIsStreaming, useTriggerAction, } from "@inv/lang";
import { VisualCardBlock as InvVisualCardBlock } from "../../components/VisualCardBlock";
import { withItemContext } from "../cardActionUtils";
import { renderCardTag } from "../cardTagUtils";
import { VisualCardBlockSchema, } from "./schema";
export * from "./schema";
function VisualCardBlockRenderer({ props, renderNode, }) {
    const triggerAction = useTriggerAction();
    const formName = useFormName();
    const isStreaming = useIsStreaming();
    const items = (props.items ?? []);
    const isClickable = Boolean(props.action) && !isStreaming;
    const handleItemClick = (index) => {
        const item = items[index];
        if (!item || !props.action || isStreaming)
            return;
        const { id, body, tag, bgImageSrc, bgImageAlt } = item.props;
        const bodyValue = body?.props?.value;
        const tagText = tag?.props?.text;
        triggerAction(bodyValue || tagText || id || `Visual card ${index + 1}`, formName, withItemContext(props.action, {
            itemIndex: index,
            itemId: id,
            itemTag: tagText,
            itemBody: bodyValue,
            itemBodySubtext: body?.props?.subtext,
            itemBgImageSrc: bgImageSrc,
            itemBgImageAlt: bgImageAlt,
        }));
    };
    return (_jsx(InvVisualCardBlock, { layout: props.layout ?? "grid", responsive: props.responsive !== false, gap: props.gap, clickable: isClickable, onItemClick: handleItemClick, items: items.map((item, index) => {
            const { id, body, tag, bgImageSrc, bgImageAlt } = item.props;
            return {
                id,
                tag: renderCardTag(tag, `visual-card-tag-${index}`),
                body: body ? renderNode(body) : null,
                bgImageSrc,
                bgImageAlt,
            };
        }) }));
}
export const VisualCardBlock = defineComponent({
    name: "VisualCardBlock",
    props: VisualCardBlockSchema,
    description: "A grid or carousel of photo-first cards: a full-bleed background image with a tag on top and a bold text panel at the bottom; an optional action makes every card clickable.",
    component: VisualCardBlockRenderer,
});
//# sourceMappingURL=index.js.map