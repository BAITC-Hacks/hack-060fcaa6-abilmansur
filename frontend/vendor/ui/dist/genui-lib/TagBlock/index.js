"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { defineComponent } from "@inv/lang";
import { Tag as InvTag } from "../../components/Tag";
import { TagBlock as InvTagBlock } from "../../components/TagBlock";
import { asArray } from "../helpers";
import { TagBlockSchema } from "./schema";
export * from "./schema";
export const TagBlock = defineComponent({
    name: "TagBlock",
    props: TagBlockSchema,
    description: "tags is an array of strings; optional size sm | md | lg",
    component: ({ props }) => {
        const tags = asArray(props.tags);
        const size = props.size;
        return (_jsx(InvTagBlock, { children: tags.map((tag, i) => (_jsx(InvTag, { text: tag, size: size }, i))) }));
    },
});
//# sourceMappingURL=index.js.map