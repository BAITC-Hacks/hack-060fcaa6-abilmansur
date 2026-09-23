import { z } from "zod/v4";
export const InlineHeaderSchema = z.object({
    heading: z.string(),
    description: z.string().optional(),
});
//# sourceMappingURL=schema.js.map