import { reactive } from "@inv/lang";
import { z } from "zod/v4";
import { rulesSchema } from "../rules";
export const SelectItemSchema = z.object({
    value: z.string(),
    label: z.string(),
});
export function createSelectSchema(SelectItem) {
    return z.object({
        name: z.string(),
        items: z.array(SelectItem.ref),
        placeholder: z.string().optional(),
        rules: rulesSchema,
        value: reactive(z.string().optional()),
        size: z.enum(["small", "medium", "large"]).optional(),
    });
}
//# sourceMappingURL=schema.js.map