export { SelectItemSchema } from "./schema";
export declare const SelectItem: import("@inv/lang").DefinedComponent<import("zod").ZodObject<{
    value: import("zod").ZodString;
    label: import("zod").ZodString;
}, import("zod/v4/core").$strip>>;
export declare const Select: import("@inv/lang").DefinedComponent<import("zod").ZodObject<{
    name: import("zod").ZodString;
    items: import("zod").ZodArray<any>;
    placeholder: import("zod").ZodOptional<import("zod").ZodString>;
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
    value: import("zod").ZodType<import("@inv/lang-core").StateField<string | undefined>, unknown, import("zod/v4/core").$ZodTypeInternals<import("@inv/lang-core").StateField<string | undefined>, unknown>>;
    size: import("zod").ZodOptional<import("zod").ZodEnum<{
        small: "small";
        medium: "medium";
        large: "large";
    }>>;
}, import("zod/v4/core").$strip>>;
//# sourceMappingURL=index.d.ts.map