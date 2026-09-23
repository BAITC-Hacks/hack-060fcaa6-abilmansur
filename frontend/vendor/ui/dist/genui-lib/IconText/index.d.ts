export * from "./schema";
export declare const IconText: import("@inv/lang").DefinedComponent<import("zod").ZodObject<{
    icon: import("zod/v4/core").$ZodType<import("@inv/lang-core").SubComponentOf<{
        name: string;
        category?: string | undefined;
    }>, unknown, import("zod/v4/core").$ZodTypeInternals<import("@inv/lang-core").SubComponentOf<{
        name: string;
        category?: string | undefined;
    }>, unknown>>;
    iconVariant: import("zod").ZodDefault<import("zod").ZodEnum<{
        filled: "filled";
        neutral: "neutral";
        info: "info";
        danger: "danger";
        warning: "warning";
        success: "success";
        inverted: "inverted";
        soft: "soft";
    }>>;
    iconSize: import("zod").ZodDefault<import("zod").ZodEnum<{
        s: "s";
        sm: "sm";
        md: "md";
        lg: "lg";
        l: "l";
        xs: "xs";
        m: "m";
        xl: "xl";
    }>>;
    title: import("zod").ZodString;
    subtitle: import("zod").ZodOptional<import("zod").ZodString>;
    bold: import("zod").ZodDefault<import("zod").ZodBoolean>;
    layout: import("zod").ZodDefault<import("zod").ZodEnum<{
        horizontal: "horizontal";
        vertical: "vertical";
    }>>;
}, import("zod/v4/core").$strip>>;
//# sourceMappingURL=index.d.ts.map