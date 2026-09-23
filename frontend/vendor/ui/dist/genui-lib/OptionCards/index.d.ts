import { type SubComponentOf } from "@inv/lang";
export * from "./schema";
export declare const OptionCards: import("@inv/lang").DefinedComponent<import("zod").ZodObject<{
    name: import("zod").ZodString;
    type: import("zod").ZodDefault<import("zod").ZodEnum<{
        single: "single";
        multiple: "multiple";
    }>>;
    items: import("zod").ZodDefault<import("zod").ZodArray<import("zod/v4/core").$ZodType<SubComponentOf<{
        value: string;
        title: string;
        subtitle?: string | undefined;
        topContent?: SubComponentOf<{
            name: string;
            category?: string | undefined;
        }> | SubComponentOf<{
            alt: string;
            src?: string | undefined;
        }> | undefined;
        disabled?: boolean | undefined;
    }>, unknown, import("zod/v4/core").$ZodTypeInternals<SubComponentOf<{
        value: string;
        title: string;
        subtitle?: string | undefined;
        topContent?: SubComponentOf<{
            name: string;
            category?: string | undefined;
        }> | SubComponentOf<{
            alt: string;
            src?: string | undefined;
        }> | undefined;
        disabled?: boolean | undefined;
    }>, unknown>>>>;
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
    defaultValue: import("zod").ZodOptional<import("zod").ZodUnion<readonly [import("zod").ZodString, import("zod").ZodArray<import("zod").ZodString>]>>;
}, import("zod/v4/core").$strip>>;
//# sourceMappingURL=index.d.ts.map