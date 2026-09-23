import { z } from "zod/v4";
export declare const ImageTextLargeSchema: z.ZodObject<{
    src: z.ZodString;
    alt: z.ZodOptional<z.ZodString>;
    title: z.ZodString;
    subtitle: z.ZodOptional<z.ZodString>;
    bold: z.ZodDefault<z.ZodBoolean>;
}, z.core.$strip>;
export type ImageTextLargeProps = z.infer<typeof ImageTextLargeSchema>;
//# sourceMappingURL=schema.d.ts.map