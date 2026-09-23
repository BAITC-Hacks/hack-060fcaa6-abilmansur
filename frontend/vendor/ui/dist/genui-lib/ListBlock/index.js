"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { defineComponent, useTriggerAction } from "@inv/lang";
import { ChevronRight } from "lucide-react";
import { z } from "zod/v4";
import { ListBlock as InvListBlock } from "../../components/ListBlock";
import { ListItem as InvListItem } from "../../components/ListItem";
import { ListItem } from "../ListItem";
export const ListBlock = defineComponent({
    name: "ListBlock",
    props: z.object({
        items: z.array(ListItem.ref),
        variant: z.enum(["number", "image"]).optional(),
        size: z.enum(["default", "small"]).optional(),
    }),
    description: "A list of items with number or image indicators. Each item can optionally have an action. size small renders a compact list.",
    component: ({ props }) => {
        const triggerAction = useTriggerAction();
        const items = (props.items ?? []);
        const variant = props.variant ?? "number";
        const size = props.size ?? "default";
        const listHasSubtitle = items.some((item) => !!item?.props?.subtitle);
        return (_jsx(InvListBlock, { variant: variant, size: size, children: items.map((item, index) => {
                const title = String(item?.props?.title ?? "");
                const subtitle = item?.props?.subtitle ? String(item.props.subtitle) : undefined;
                const image = item?.props?.image;
                const actionLabel = item?.props?.actionLabel ? String(item.props.actionLabel) : undefined;
                const action = item?.props?.action;
                const hasAction = !!action;
                const handleClick = hasAction
                    ? () => triggerAction(title, undefined, action)
                    : undefined;
                return (_jsx(InvListItem, { title: title, subtitle: subtitle, listHasSubtitle: listHasSubtitle, image: variant === "image" ? image : undefined, actionLabel: hasAction ? actionLabel : undefined, actionIcon: hasAction ? _jsx(ChevronRight, { size: 16 }) : undefined, onClick: handleClick }, index));
            }) }));
    },
});
//# sourceMappingURL=index.js.map