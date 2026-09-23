import { z } from "zod/v4";
export declare const OptionCardSchema: z.ZodObject<{
    value: z.ZodString;
    title: z.ZodString;
    subtitle: z.ZodOptional<z.ZodString>;
    topContent: z.ZodOptional<z.ZodUnion<readonly [z.core.$ZodType<import("@inv/lang-core").SubComponentOf<{
        name: string;
        category?: string | undefined;
    }>, unknown, z.core.$ZodTypeInternals<import("@inv/lang-core").SubComponentOf<{
        name: string;
        category?: string | undefined;
    }>, unknown>>, z.core.$ZodType<import("@inv/lang-core").SubComponentOf<{
        alt: string;
        src?: string | undefined;
    }>, unknown, z.core.$ZodTypeInternals<import("@inv/lang-core").SubComponentOf<{
        alt: string;
        src?: string | undefined;
    }>, unknown>>]>>;
    disabled: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>;
export type OptionCardProps = z.infer<typeof OptionCardSchema>;
export type OptionCardTopContent = NonNullable<OptionCardProps["topContent"]>;
export declare const OptionCard: import("@inv/lang").DefinedComponent<z.ZodObject<{
    value: z.ZodString;
    title: z.ZodString;
    subtitle: z.ZodOptional<z.ZodString>;
    topContent: z.ZodOptional<z.ZodUnion<readonly [z.core.$ZodType<import("@inv/lang-core").SubComponentOf<{
        name: string;
        category?: string | undefined;
    }>, unknown, z.core.$ZodTypeInternals<import("@inv/lang-core").SubComponentOf<{
        name: string;
        category?: string | undefined;
    }>, unknown>>, z.core.$ZodType<import("@inv/lang-core").SubComponentOf<{
        alt: string;
        src?: string | undefined;
    }>, unknown, z.core.$ZodTypeInternals<import("@inv/lang-core").SubComponentOf<{
        alt: string;
        src?: string | undefined;
    }>, unknown>>]>>;
    disabled: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>>;
export declare const OptionCardsSchema: z.ZodObject<{
    name: z.ZodString;
    type: z.ZodDefault<z.ZodEnum<{
        single: "single";
        multiple: "multiple";
    }>>;
    items: z.ZodDefault<z.ZodArray<z.core.$ZodType<import("@inv/lang-core").SubComponentOf<{
        value: string;
        title: string;
        subtitle?: string | undefined;
        topContent?: import("@inv/lang-core").SubComponentOf<{
            name: string;
            category?: string | undefined;
        }> | import("@inv/lang-core").SubComponentOf<{
            alt: string;
            src?: string | undefined;
        }> | undefined;
        disabled?: boolean | undefined;
    }>, unknown, z.core.$ZodTypeInternals<import("@inv/lang-core").SubComponentOf<{
        value: string;
        title: string;
        subtitle?: string | undefined;
        topContent?: import("@inv/lang-core").SubComponentOf<{
            name: string;
            category?: string | undefined;
        }> | import("@inv/lang-core").SubComponentOf<{
            alt: string;
            src?: string | undefined;
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
export type OptionCardsProps = z.infer<typeof OptionCardsSchema>;
//# sourceMappingURL=schema.d.ts.map