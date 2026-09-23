import { z } from "zod/v4";
export declare const TagBlockSchema: z.ZodObject<{
    tags: z.ZodArray<z.ZodString>;
    size: z.ZodOptional<z.ZodEnum<{
        sm: "sm";
        md: "md";
        lg: "lg";
    }>>;
}, z.core.$strip>;
//# sourceMappingURL=schema.d.ts.map