import { defineComponent } from "@inv/lang";
import { z } from "zod/v4";
import { Icon } from "../Icon";
import { rulesSchema } from "../rules";
export const ChipItemSchema = z.object({
    value: z.string(),
    label: z.string(),
    icon: z.optional(Icon.ref),
    disabled: z.boolean().optional(),
});
export const ChipItem = defineComponent({
    name: "ChipItem",
    props: ChipItemSchema,
    description: "A single selectable chip inside a Chips group, with a value, label and optional icon.",
    component: () => null,
});
export const ChipsSchema = z.object({
    name: z.string(),
    type: z.enum(["single", "multiple"]).default("multiple"),
    items: z.array(ChipItem.ref).default([]),
    rules: rulesSchema,
    defaultValue: z.union([z.string(), z.array(z.string())]).optional(),
});
//# sourceMappingURL=schema.js.map