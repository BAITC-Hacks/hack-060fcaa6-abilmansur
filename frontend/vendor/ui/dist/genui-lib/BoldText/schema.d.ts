import { z } from "zod/v4";
export declare const BoldTextSchema: z.ZodObject<{
    variant: z.ZodDefault<z.ZodEnum<{
        number: "number";
        text: "text";
    }>>;
    value: z.ZodString;
    subtext: z.ZodOptional<z.ZodString>;
    subtextVariant: z.ZodDefault<z.ZodEnum<{
        number: "number";
        text: "text";
        metric: "metric";
    }>>;
    size: z.ZodDefault<z.ZodEnum<{
        sm: "sm";
        md: "md";
        lg: "lg";
        xs: "xs";
    }>>;
}, z.core.$strip>;
export type BoldTextProps = z.infer<typeof BoldTextSchema>;
//# sourceMappingURL=schema.d.ts.map