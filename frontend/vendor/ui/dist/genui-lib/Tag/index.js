"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { defineComponent } from "@inv/lang";
import { IconWrapper } from "../../components/_shared/icons";
import { Tag as InvTag } from "../../components/Tag";
import { TagSchema } from "./schema";
export * from "./schema";
export const Tag = defineComponent({
    name: "Tag",
    props: TagSchema,
    description: "Styled tag/badge with optional Icon and variant",
    component: ({ props }) => {
        const icon = props["icon"];
        return (_jsx(InvTag, { text: props.text, icon: icon?.props?.name ? (_jsx(IconWrapper, { name: icon.props.name, category: icon.props.category })) : undefined, size: props.size, variant: props.variant }));
    },
});
//# sourceMappingURL=index.js.map