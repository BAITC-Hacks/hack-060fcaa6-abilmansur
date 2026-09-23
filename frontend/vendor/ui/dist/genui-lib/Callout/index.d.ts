export { CalloutSchema } from "./schema";
export declare const Callout: import("@inv/lang").DefinedComponent<import("zod").ZodObject<{
    variant: import("zod").ZodEnum<{
        error: "error";
        neutral: "neutral";
        info: "info";
        warning: "warning";
        success: "success";
    }>;
    title: import("zod").ZodString;
    description: import("zod").ZodString;
    visible: import("zod").ZodType<import("@inv/lang-core").StateField<boolean | undefined>, unknown, import("zod/v4/core").$ZodTypeInternals<import("@inv/lang-core").StateField<boolean | undefined>, unknown>>;
}, import("zod/v4/core").$strip>>;
//# sourceMappingURL=index.d.ts.map