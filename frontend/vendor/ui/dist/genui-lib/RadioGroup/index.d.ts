import { z } from "zod/v4";
export { RadioItemSchema } from "./schema";
export declare const RadioItem: import("@inv/lang").DefinedComponent<z.ZodObject<{
    label: z.ZodString;
    description: z.ZodString;
    value: z.ZodString;
}, z.core.$strip>>;
export declare const RadioGroup: import("@inv/lang").DefinedComponent<z.ZodObject<{
    name: z.ZodString;
    items: z.ZodArray<z.core.$ZodType<import("@inv/lang-core").SubComponentOf<{
        label: string;
        description: string;
        value: string;
    }>, unknown, z.core.$ZodTypeInternals<import("@inv/lang-core").SubComponentOf<{
        label: string;
        description: string;
        value: string;
    }>, unknown>>>;
    defaultValue: z.ZodOptional<z.ZodString>;
    rules: z.ZodOptional<z.ZodObject<{
        required: z.ZodOptional<z.ZodBoolean>;
        email: z.ZodOptional<z.ZodBoolean>;
        url: z.ZodOptional<z.ZodBoolean>;
        numeric: z.ZodOptional<z.ZodBoolean>;
        min: z.ZodOptional<z.ZodNumber>;
        max: z.ZodOptional<z.ZodNumber>;
        minLength: z.ZodOptional<z.ZodNumber>;
        maxLength: z.ZodOptional<z.ZodNumber>;
        pattern: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
    value: z.ZodType<import("@inv/lang-core").StateField<string | undefined>, unknown, z.core.$ZodTypeInternals<import("@inv/lang-core").StateField<string | undefined>, unknown>>;
}, z.core.$strip>>;
//# sourceMappingURL=index.d.ts.map