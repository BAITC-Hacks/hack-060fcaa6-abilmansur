import { ComponentRenderProps } from "@inv/lang";
export { FormControlSchema } from "./schema";
/**
 * Shared renderer — also used by the chat library's FormControl variant, which
 * accepts a wider set of input components (Chips, OptionCards).
 */
type FormControlRenderProps = ComponentRenderProps<{
    label: string;
    input: unknown;
    hint?: string;
}>;
export declare const FormControlRenderer: ({ props, renderNode }: FormControlRenderProps) => import("react").JSX.Element;
export declare const FormControl: import("@inv/lang").DefinedComponent<import("zod").ZodObject<{
    label: import("zod").ZodString;
    input: import("zod").ZodUnion<readonly [import("zod/v4/core").$ZodType<import("@inv/lang-core").SubComponentOf<{
        name: string;
        value: import("@inv/lang-core").StateField<string | undefined>;
        placeholder?: string | undefined;
        type?: "number" | "text" | "url" | "email" | "password" | undefined;
        rules?: {
            required?: boolean | undefined;
            email?: boolean | undefined;
            url?: boolean | undefined;
            numeric?: boolean | undefined;
            min?: number | undefined;
            max?: number | undefined;
            minLength?: number | undefined;
            maxLength?: number | undefined;
            pattern?: string | undefined;
        } | undefined;
    }>, unknown, import("zod/v4/core").$ZodTypeInternals<import("@inv/lang-core").SubComponentOf<{
        name: string;
        value: import("@inv/lang-core").StateField<string | undefined>;
        placeholder?: string | undefined;
        type?: "number" | "text" | "url" | "email" | "password" | undefined;
        rules?: {
            required?: boolean | undefined;
            email?: boolean | undefined;
            url?: boolean | undefined;
            numeric?: boolean | undefined;
            min?: number | undefined;
            max?: number | undefined;
            minLength?: number | undefined;
            maxLength?: number | undefined;
            pattern?: string | undefined;
        } | undefined;
    }>, unknown>>, import("zod/v4/core").$ZodType<import("@inv/lang-core").SubComponentOf<{
        name: string;
        value: import("@inv/lang-core").StateField<string | undefined>;
        placeholder?: string | undefined;
        rows?: number | undefined;
        rules?: {
            required?: boolean | undefined;
            email?: boolean | undefined;
            url?: boolean | undefined;
            numeric?: boolean | undefined;
            min?: number | undefined;
            max?: number | undefined;
            minLength?: number | undefined;
            maxLength?: number | undefined;
            pattern?: string | undefined;
        } | undefined;
    }>, unknown, import("zod/v4/core").$ZodTypeInternals<import("@inv/lang-core").SubComponentOf<{
        name: string;
        value: import("@inv/lang-core").StateField<string | undefined>;
        placeholder?: string | undefined;
        rows?: number | undefined;
        rules?: {
            required?: boolean | undefined;
            email?: boolean | undefined;
            url?: boolean | undefined;
            numeric?: boolean | undefined;
            min?: number | undefined;
            max?: number | undefined;
            minLength?: number | undefined;
            maxLength?: number | undefined;
            pattern?: string | undefined;
        } | undefined;
    }>, unknown>>, import("zod/v4/core").$ZodType<import("@inv/lang-core").SubComponentOf<{
        name: string;
        items: any[];
        value: import("@inv/lang-core").StateField<string | undefined>;
        placeholder?: string | undefined;
        rules?: {
            required?: boolean | undefined;
            email?: boolean | undefined;
            url?: boolean | undefined;
            numeric?: boolean | undefined;
            min?: number | undefined;
            max?: number | undefined;
            minLength?: number | undefined;
            maxLength?: number | undefined;
            pattern?: string | undefined;
        } | undefined;
        size?: "small" | "medium" | "large" | undefined;
    }>, unknown, import("zod/v4/core").$ZodTypeInternals<import("@inv/lang-core").SubComponentOf<{
        name: string;
        items: any[];
        value: import("@inv/lang-core").StateField<string | undefined>;
        placeholder?: string | undefined;
        rules?: {
            required?: boolean | undefined;
            email?: boolean | undefined;
            url?: boolean | undefined;
            numeric?: boolean | undefined;
            min?: number | undefined;
            max?: number | undefined;
            minLength?: number | undefined;
            maxLength?: number | undefined;
            pattern?: string | undefined;
        } | undefined;
        size?: "small" | "medium" | "large" | undefined;
    }>, unknown>>, import("zod/v4/core").$ZodType<import("@inv/lang-core").SubComponentOf<{
        name: string;
        value: import("@inv/lang-core").StateField<unknown>;
        mode?: "single" | "range" | undefined;
        rules?: {
            required?: boolean | undefined;
            email?: boolean | undefined;
            url?: boolean | undefined;
            numeric?: boolean | undefined;
            min?: number | undefined;
            max?: number | undefined;
            minLength?: number | undefined;
            maxLength?: number | undefined;
            pattern?: string | undefined;
        } | undefined;
    }>, unknown, import("zod/v4/core").$ZodTypeInternals<import("@inv/lang-core").SubComponentOf<{
        name: string;
        value: import("@inv/lang-core").StateField<unknown>;
        mode?: "single" | "range" | undefined;
        rules?: {
            required?: boolean | undefined;
            email?: boolean | undefined;
            url?: boolean | undefined;
            numeric?: boolean | undefined;
            min?: number | undefined;
            max?: number | undefined;
            minLength?: number | undefined;
            maxLength?: number | undefined;
            pattern?: string | undefined;
        } | undefined;
    }>, unknown>>, import("zod/v4/core").$ZodType<import("@inv/lang-core").SubComponentOf<{
        name: string;
        variant: "continuous" | "discrete";
        min: number;
        max: number;
        value: import("@inv/lang-core").StateField<number[] | undefined>;
        step?: number | undefined;
        defaultValue?: number[] | undefined;
        label?: string | undefined;
        rules?: {
            required?: boolean | undefined;
            email?: boolean | undefined;
            url?: boolean | undefined;
            numeric?: boolean | undefined;
            min?: number | undefined;
            max?: number | undefined;
            minLength?: number | undefined;
            maxLength?: number | undefined;
            pattern?: string | undefined;
        } | undefined;
    }>, unknown, import("zod/v4/core").$ZodTypeInternals<import("@inv/lang-core").SubComponentOf<{
        name: string;
        variant: "continuous" | "discrete";
        min: number;
        max: number;
        value: import("@inv/lang-core").StateField<number[] | undefined>;
        step?: number | undefined;
        defaultValue?: number[] | undefined;
        label?: string | undefined;
        rules?: {
            required?: boolean | undefined;
            email?: boolean | undefined;
            url?: boolean | undefined;
            numeric?: boolean | undefined;
            min?: number | undefined;
            max?: number | undefined;
            minLength?: number | undefined;
            maxLength?: number | undefined;
            pattern?: string | undefined;
        } | undefined;
    }>, unknown>>, import("zod/v4/core").$ZodType<import("@inv/lang-core").SubComponentOf<{
        name: string;
        items: any[];
        value: import("@inv/lang-core").StateField<Record<string, boolean> | undefined>;
        rules?: {
            required?: boolean | undefined;
            email?: boolean | undefined;
            url?: boolean | undefined;
            numeric?: boolean | undefined;
            min?: number | undefined;
            max?: number | undefined;
            minLength?: number | undefined;
            maxLength?: number | undefined;
            pattern?: string | undefined;
        } | undefined;
    }>, unknown, import("zod/v4/core").$ZodTypeInternals<import("@inv/lang-core").SubComponentOf<{
        name: string;
        items: any[];
        value: import("@inv/lang-core").StateField<Record<string, boolean> | undefined>;
        rules?: {
            required?: boolean | undefined;
            email?: boolean | undefined;
            url?: boolean | undefined;
            numeric?: boolean | undefined;
            min?: number | undefined;
            max?: number | undefined;
            minLength?: number | undefined;
            maxLength?: number | undefined;
            pattern?: string | undefined;
        } | undefined;
    }>, unknown>>, import("zod/v4/core").$ZodType<import("@inv/lang-core").SubComponentOf<{
        name: string;
        items: import("@inv/lang-core").SubComponentOf<{
            label: string;
            description: string;
            value: string;
        }>[];
        value: import("@inv/lang-core").StateField<string | undefined>;
        defaultValue?: string | undefined;
        rules?: {
            required?: boolean | undefined;
            email?: boolean | undefined;
            url?: boolean | undefined;
            numeric?: boolean | undefined;
            min?: number | undefined;
            max?: number | undefined;
            minLength?: number | undefined;
            maxLength?: number | undefined;
            pattern?: string | undefined;
        } | undefined;
    }>, unknown, import("zod/v4/core").$ZodTypeInternals<import("@inv/lang-core").SubComponentOf<{
        name: string;
        items: import("@inv/lang-core").SubComponentOf<{
            label: string;
            description: string;
            value: string;
        }>[];
        value: import("@inv/lang-core").StateField<string | undefined>;
        defaultValue?: string | undefined;
        rules?: {
            required?: boolean | undefined;
            email?: boolean | undefined;
            url?: boolean | undefined;
            numeric?: boolean | undefined;
            min?: number | undefined;
            max?: number | undefined;
            minLength?: number | undefined;
            maxLength?: number | undefined;
            pattern?: string | undefined;
        } | undefined;
    }>, unknown>>, import("zod/v4/core").$ZodType<import("@inv/lang-core").SubComponentOf<{
        name: string;
        type: "single" | "multiple";
        items: import("@inv/lang-core").SubComponentOf<{
            value: string;
            label: string;
            icon?: import("@inv/lang-core").SubComponentOf<{
                name: string;
                category?: string | undefined;
            }> | undefined;
            disabled?: boolean | undefined;
        }>[];
        rules?: {
            required?: boolean | undefined;
            email?: boolean | undefined;
            url?: boolean | undefined;
            numeric?: boolean | undefined;
            min?: number | undefined;
            max?: number | undefined;
            minLength?: number | undefined;
            maxLength?: number | undefined;
            pattern?: string | undefined;
        } | undefined;
        defaultValue?: string | string[] | undefined;
    }>, unknown, import("zod/v4/core").$ZodTypeInternals<import("@inv/lang-core").SubComponentOf<{
        name: string;
        type: "single" | "multiple";
        items: import("@inv/lang-core").SubComponentOf<{
            value: string;
            label: string;
            icon?: import("@inv/lang-core").SubComponentOf<{
                name: string;
                category?: string | undefined;
            }> | undefined;
            disabled?: boolean | undefined;
        }>[];
        rules?: {
            required?: boolean | undefined;
            email?: boolean | undefined;
            url?: boolean | undefined;
            numeric?: boolean | undefined;
            min?: number | undefined;
            max?: number | undefined;
            minLength?: number | undefined;
            maxLength?: number | undefined;
            pattern?: string | undefined;
        } | undefined;
        defaultValue?: string | string[] | undefined;
    }>, unknown>>, import("zod/v4/core").$ZodType<import("@inv/lang-core").SubComponentOf<{
        name: string;
        type: "single" | "multiple";
        items: import("@inv/lang-core").SubComponentOf<{
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
        }>[];
        rules?: {
            required?: boolean | undefined;
            email?: boolean | undefined;
            url?: boolean | undefined;
            numeric?: boolean | undefined;
            min?: number | undefined;
            max?: number | undefined;
            minLength?: number | undefined;
            maxLength?: number | undefined;
            pattern?: string | undefined;
        } | undefined;
        defaultValue?: string | string[] | undefined;
    }>, unknown, import("zod/v4/core").$ZodTypeInternals<import("@inv/lang-core").SubComponentOf<{
        name: string;
        type: "single" | "multiple";
        items: import("@inv/lang-core").SubComponentOf<{
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
        }>[];
        rules?: {
            required?: boolean | undefined;
            email?: boolean | undefined;
            url?: boolean | undefined;
            numeric?: boolean | undefined;
            min?: number | undefined;
            max?: number | undefined;
            minLength?: number | undefined;
            maxLength?: number | undefined;
            pattern?: string | undefined;
        } | undefined;
        defaultValue?: string | string[] | undefined;
    }>, unknown>>]>;
    hint: import("zod").ZodOptional<import("zod").ZodString>;
}, import("zod/v4/core").$strip>>;
//# sourceMappingURL=index.d.ts.map