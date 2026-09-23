"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { defineComponent } from "@inv/lang";
import { EntityList as InvEntityList } from "../../components/EntityList";
import { asArray } from "../helpers";
import { EntityListSchema } from "./schema";
export * from "./schema";
function EntityListRenderer({ props }) {
    return (_jsx(InvEntityList, { rows: asArray(props.rows), size: props.size, header: props.header, footer: props.footer }));
}
export const EntityList = defineComponent({
    name: "EntityList",
    props: EntityListSchema,
    description: "Two-column key/value rows (left label, right value). size 'default' supports optional header and footer rows; rightVariant 'number' uses tabular numbers.",
    component: EntityListRenderer,
});
//# sourceMappingURL=index.js.map