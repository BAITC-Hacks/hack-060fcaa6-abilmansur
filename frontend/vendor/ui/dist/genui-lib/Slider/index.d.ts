export { SliderSchema } from "./schema";
export declare const Slider: import("@inv/lang").DefinedComponent<import("zod").ZodObject<{
    name: import("zod").ZodString;
    variant: import("zod").ZodEnum<{
        continuous: "continuous";
        discrete: "discrete";
    }>;
    min: import("zod").ZodNumber;
    max: import("zod").ZodNumber;
    step: import("zod").ZodOptional<import("zod").ZodNumber>;
    defaultValue: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodNumber>>;
    label: import("zod").ZodOptional<import("zod").ZodString>;
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
    value: import("zod").ZodType<import("@inv/lang-core").StateField<number[] | undefined>, unknown, import("zod/v4/core").$ZodTypeInternals<import("@inv/lang-core").StateField<number[] | undefined>, unknown>>;
}, import("zod/v4/core").$strip>>;
//# sourceMappingURL=index.d.ts.map