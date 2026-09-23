import { z } from "zod/v4";
export declare const ChipItemSchema: z.ZodObject<{
    value: z.ZodString;
    label: z.ZodString;
    icon: z.ZodOptional<z.core.$ZodType<import("@inv/lang-core").SubComponentOf<{
        name: string;
        category?: string | undefined;
    }>, unknown, z.core.$ZodTypeInternals<import("@inv/lang-core").SubComponentOf<{
        name: string;
        category?: string | undefined;
    }>, unknown>>>;
    disabled: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>;
export type ChipItemProps = z.infer<typeof ChipItemSchema>;
export declare const ChipItem: import("@inv/lang").DefinedComponent<z.ZodObject<{
    value: z.ZodString;
    label: z.ZodString;
    icon: z.ZodOptional<z.core.$ZodType<import("@inv/lang-core").SubComponentOf<{
        name: string;
        category?: string | undefined;
    }>, unknown, z.core.$ZodTypeInternals<import("@inv/lang-core").SubComponentOf<{
        name: string;
        category?: string | undefined;
    }>, unknown>>>;
    disabled: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>>;
export declare const ChipsSchema: z.ZodObject<{
    name: z.ZodString;
    type: z.ZodDefault<z.ZodEnum<{
        single: "single";
        multiple: "multiple";
    }>>;
    items: z.ZodDefault<z.ZodArray<z.core.$ZodType<import("@inv/lang-core").SubComponentOf<{
        value: string;
        label: string;
        icon?: import("@inv/lang-core").SubComponentOf<{
            name: string;
            category?: string | undefined;
        }> | undefined;
        disabled?: boolean | undefined;
    }>, unknown, z.core.$ZodTypeInternals<import("@inv/lang-core").SubComponentOf<{
        value: string;
        label: string;
        icon?: import("@inv/lang-core").SubComponentOf<{
            name: string;
            category?: string | undefined;
        }> | undefined;
        disabled?: boolean | undefined;
    }>, unknown>>>>;
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
    defaultValue: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>>;
}, z.core.$strip>;
export type ChipsProps = z.infer<typeof ChipsSchema>;
//# sourceMappingURL=schema.d.ts.map