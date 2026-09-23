export * from "./schema";
export declare const Tag: import("@inv/lang").DefinedComponent<import("zod").ZodObject<{
    text: import("zod").ZodString;
    icon: import("zod").ZodOptional<import("zod/v4/core").$ZodType<import("@inv/lang-core").SubComponentOf<{
        name: string;
        category?: string | undefined;
    }>, unknown, import("zod/v4/core").$ZodTypeInternals<import("@inv/lang-core").SubComponentOf<{
        name: string;
        category?: string | undefined;
    }>, unknown>>>;
    size: import("zod").ZodOptional<import("zod").ZodEnum<{
        sm: "sm";
        md: "md";
        lg: "lg";
    }>>;
    variant: import("zod").ZodOptional<import("zod").ZodEnum<{
        neutral: "neutral";
        info: "info";
        danger: "danger";
        warning: "warning";
        success: "success";
    }>>;
}, import("zod/v4/core").$strip>>;
//# sourceMappingURL=index.d.ts.map