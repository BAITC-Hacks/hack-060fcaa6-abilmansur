import { defineComponent } from "@inv/lang";
import { z } from "zod/v4";
import { Icon } from "../Icon";
import { Image } from "../Image";
import { rulesSchema } from "../rules";
export const OptionCardSchema = z.object({
    value: z.string(),
    title: z.string(),
    subtitle: z.string().optional(),
    topContent: z.union([Icon.ref, Image.ref]).optional(),
    disabled: z.boolean().optional(),
});
export const OptionCard = defineComponent({
    name: "OptionCard",
    props: OptionCardSchema,
    description: "A single selectable card inside an OptionCards group, with a value, title, optional subtitle and an optional Icon or Image on top.",
    component: () => null,
});
export const OptionCardsSchema = z.object({
    name: z.string(),
    type: z.enum(["single", "multiple"]).default("single"),
    items: z.array(OptionCard.ref).default([]),
    rules: rulesSchema,
    defaultValue: z.union([z.string(), z.array(z.string())]).optional(),
});
//# sourceMappingURL=schema.js.map