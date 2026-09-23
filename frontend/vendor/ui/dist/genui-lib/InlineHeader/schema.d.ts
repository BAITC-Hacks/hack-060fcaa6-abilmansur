import { z } from "zod/v4";
export declare const InlineHeaderSchema: z.ZodObject<{
    heading: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type InlineHeaderProps = z.infer<typeof InlineHeaderSchema>;
//# sourceMappingURL=schema.d.ts.map