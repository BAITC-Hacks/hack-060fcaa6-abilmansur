export { CheckBoxItemSchema } from "./schema";
export declare const CheckBoxItem: import("@inv/lang").DefinedComponent<import("zod").ZodObject<{
    label: import("zod").ZodString;
    description: import("zod").ZodString;
    name: import("zod").ZodString;
    defaultChecked: import("zod").ZodOptional<import("zod").ZodBoolean>;
}, import("zod/v4/core").$strip>>;
export declare const CheckBoxGroup: import("@inv/lang").DefinedComponent<import("zod").ZodObject<{
    name: import("zod").ZodString;
    items: import("zod").ZodArray<any>;
    rules: import("zod").ZodOptional<import("zod").ZodObject<{
        required: import("zod").ZodOptional<import("zod").ZodBoolean>;
        email: import("zod").ZodOptional<import("zod").ZodBoolean>;
        url: import("zod").ZodOptional<import("zod").ZodBoolean>;
        numeric: import("zod").ZodOptional<import("zod").ZodBoolean>;
        min: import("zod").ZodOptional<import("zod").ZodNumber>;
        max: import("zod").ZodOptional<import("zod").ZodNumber>;
        minLength: import("zod").ZodOptional<import("zod").ZodNumber>;
        maxLength: import("zod").ZodOptional<import("zod").ZodNumber>;
        pattern: import("zod").ZodOptional<import("zod").ZodString>;
    }, import("zod/v4/core").$strip>>;
    value: import("zod").ZodType<import("@inv/lang-core").StateField<Record<string, boolean> | undefined>, unknown, import("zod/v4/core").$ZodTypeInternals<import("@inv/lang-core").StateField<Record<string, boolean> | undefined>, unknown>>;
}, import("zod/v4/core").$strip>>;
//# sourceMappingURL=index.d.ts.map