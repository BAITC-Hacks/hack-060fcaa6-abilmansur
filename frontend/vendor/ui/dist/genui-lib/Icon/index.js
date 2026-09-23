"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { defineComponent } from "@inv/lang";
import { IconWrapper } from "../../components/_shared/icons";
import { IconSchema } from "./schema";
export * from "./schema";
function IconRenderer({ props }) {
    if (!props.name)
        return null;
    return _jsx(IconWrapper, { name: props.name, category: props.category });
}
export const Icon = defineComponent({
    name: "Icon",
    props: IconSchema,
    description: "A lucide icon by kebab-case name (e.g. 'circle-check'). Optional category picks a topical fallback when the name doesn't resolve.",
    component: IconRenderer,
});
//# sourceMappingURL=index.js.map