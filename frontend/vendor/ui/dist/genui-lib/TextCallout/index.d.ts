export { TextCalloutSchema } from "./schema";
export declare const TextCallout: import("@inv/lang").DefinedComponent<import("zod").ZodObject<{
    variant: import("zod").ZodOptional<import("zod").ZodEnum<{
        neutral: "neutral";
        info: "info";
        danger: "danger";
        warning: "warning";
        success: "success";
    }>>;
    title: import("zod").ZodOptional<import("zod").ZodString>;
    description: import("zod").ZodOptional<import("zod").ZodString>;
}, import("zod/v4/core").$strip>>;
//# sourceMappingURL=index.d.ts.map