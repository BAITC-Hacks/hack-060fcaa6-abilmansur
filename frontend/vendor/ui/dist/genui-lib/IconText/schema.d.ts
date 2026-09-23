import { z } from "zod/v4";
export declare const IconTextSchema: z.ZodObject<{
    icon: z.core.$ZodType<import("@inv/lang-core").SubComponentOf<{
        name: string;
        category?: string | undefined;
    }>, unknown, z.core.$ZodTypeInternals<import("@inv/lang-core").SubComponentOf<{
        name: string;
        category?: string | undefined;
    }>, unknown>>;
    iconVariant: z.ZodDefault<z.ZodEnum<{
        filled: "filled";
        neutral: "neutral";
        info: "info";
        danger: "danger";
        warning: "warning";
        success: "success";
        inverted: "inverted";
        soft: "soft";
    }>>;
    iconSize: z.ZodDefault<z.ZodEnum<{
        s: "s";
        sm: "sm";
        md: "md";
        lg: "lg";
        l: "l";
        xs: "xs";
        m: "m";
        xl: "xl";
    }>>;
    title: z.ZodString;
    subtitle: z.ZodOptional<z.ZodString>;
    bold: z.ZodDefault<z.ZodBoolean>;
    layout: z.ZodDefault<z.ZodEnum<{
        horizontal: "horizontal";
        vertical: "vertical";
    }>>;
}, z.core.$strip>;
export type IconTextProps = z.infer<typeof IconTextSchema>;
//# sourceMappingURL=schema.d.ts.map