import { z } from "zod/v4";
export declare const ImageTextSchema: z.ZodObject<{
    src: z.ZodString;
    alt: z.ZodOptional<z.ZodString>;
    title: z.ZodString;
    subtitle: z.ZodOptional<z.ZodString>;
    bold: z.ZodDefault<z.ZodBoolean>;
    layout: z.ZodDefault<z.ZodEnum<{
        horizontal: "horizontal";
        vertical: "vertical";
    }>>;
    imageSize: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
export type ImageTextProps = z.infer<typeof ImageTextSchema>;
//# sourceMappingURL=schema.d.ts.map