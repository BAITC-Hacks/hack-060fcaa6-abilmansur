export * from "./schema";
export declare const BoldText: import("@inv/lang").DefinedComponent<import("zod").ZodObject<{
    variant: import("zod").ZodDefault<import("zod").ZodEnum<{
        number: "number";
        text: "text";
    }>>;
    value: import("zod").ZodString;
    subtext: import("zod").ZodOptional<import("zod").ZodString>;
    subtextVariant: import("zod").ZodDefault<import("zod").ZodEnum<{
        number: "number";
        text: "text";
        metric: "metric";
    }>>;
    size: import("zod").ZodDefault<import("zod").ZodEnum<{
        sm: "sm";
        md: "md";
        lg: "lg";
        xs: "xs";
    }>>;
}, import("zod/v4/core").$strip>>;
//# sourceMappingURL=index.d.ts.map