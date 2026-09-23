"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { defineComponent, useTriggerAction } from "@inv/lang";
import { z } from "zod/v4";
import { FollowUpBlock as InvFollowUpBlock } from "../../components/FollowUpBlock";
import { FollowUpItem as InvFollowUpItem } from "../../components/FollowUpItem";
import { FollowUpItem } from "../FollowUpItem";
export const FollowUpBlock = defineComponent({
    name: "FollowUpBlock",
    props: z.object({
        items: z.array(FollowUpItem.ref),
    }),
    description: "List of clickable follow-up suggestions placed at the end of a response",
    component: ({ props }) => {
        const triggerAction = useTriggerAction();
        const items = (props.items ?? []);
        return (_jsx(InvFollowUpBlock, { children: items.map((item, i) => {
                const text = String(item?.props?.text ?? "");
                return _jsx(InvFollowUpItem, { text: text, onClick: () => triggerAction(text) }, i);
            }) }));
    },
});
//# sourceMappingURL=index.js.map