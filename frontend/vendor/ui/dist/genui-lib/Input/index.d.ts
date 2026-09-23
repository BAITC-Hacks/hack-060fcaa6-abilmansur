export { InputSchema } from "./schema";
export declare const Input: import("@inv/lang").DefinedComponent<import("zod").ZodObject<{
    name: import("zod").ZodString;
    placeholder: import("zod").ZodOptional<import("zod").ZodString>;
    type: import("zod").ZodOptional<import("zod").ZodEnum<{
        number: "number";
        text: "text";
        url: "url";
        email: "email";
        password: "password";
    }>>;
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
}, import("zod/v4/core").$strip>>;
//# sourceMappingURL=index.d.ts.map