import { z } from "zod/v4";
export declare const EntityListRowSchema: z.ZodObject<{
    left: z.ZodString;
    right: z.ZodString;
    rightVariant: z.ZodDefault<z.ZodEnum<{
        number: "number";
        text: "text";
    }>>;
}, z.core.$strip>;
export declare const EntityListSchema: z.ZodObject<{
    rows: z.ZodDefault<z.ZodArray<z.ZodObject<{
        left: z.ZodString;
        right: z.ZodString;
        rightVariant: z.ZodDefault<z.ZodEnum<{
            number: "number";
            text: "text";
        }>>;
    }, z.core.$strip>>>;
    size: z.ZodDefault<z.ZodEnum<{
        small: "small";
        default: "default";
    }>>;
    header: z.ZodOptional<z.ZodObject<{
        left: z.ZodString;
        right: z.ZodString;
        rightVariant: z.ZodDefault<z.ZodEnum<{
            number: "number";
            text: "text";
        }>>;
    }, z.core.$strip>>;
    footer: z.ZodOptional<z.ZodObject<{
        left: z.ZodString;
        right: z.ZodString;
        rightVariant: z.ZodDefault<z.ZodEnum<{
            number: "number";
            text: "text";
        }>>;
    }, z.core.$strip>>;
}, z.core.$strip>;
export type EntityListRow = z.infer<typeof EntityListRowSchema>;
export type EntityListProps = z.infer<typeof EntityListSchema>;
//# sourceMappingURL=schema.d.ts.map