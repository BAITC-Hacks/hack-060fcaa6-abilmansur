"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { defineComponent } from "@inv/lang";
import { z } from "zod/v4";
import { MarkDownRenderer } from "../../components/MarkDownRenderer";
import { Steps as InvSteps, StepsItem as InvStepsItem } from "../../components/Steps";
import { StepsItemSchema } from "./schema";
export { StepsItemSchema } from "./schema";
export const StepsItem = defineComponent({
    name: "StepsItem",
    props: StepsItemSchema,
    description: "title and details text for one step",
    component: () => null,
});
export const Steps = defineComponent({
    name: "Steps",
    props: z.object({
        items: z.array(StepsItem.ref),
    }),
    description: "Step-by-step guide",
    component: ({ props, renderNode }) => {
        const items = props.items ?? [];
        return (_jsx(InvSteps, { children: items.map((item, i) => {
                const details = item.props.details;
                const detailsContent = typeof details === "string" ? (_jsx(MarkDownRenderer, { textMarkdown: details })) : renderNode(details);
                return (_jsx(InvStepsItem, { number: i + 1, title: item.props.title, details: detailsContent }, i));
            }) }));
    },
});
//# sourceMappingURL=index.js.map