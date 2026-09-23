export { ModalSchema } from "./schema";
export declare const Modal: import("@inv/lang").DefinedComponent<import("zod").ZodObject<{
    title: import("zod").ZodString;
    open: import("zod").ZodType<import("@inv/lang-core").StateField<boolean | undefined>, unknown, import("zod/v4/core").$ZodTypeInternals<import("@inv/lang-core").StateField<boolean | undefined>, unknown>>;
    children: import("zod").ZodArray<import("zod").ZodUnion<readonly [import("zod/v4/core").$ZodType<import("@inv/lang-core").SubComponentOf<{
        text: string;
        size?: "small" | "large" | "default" | "small-heavy" | "large-heavy" | undefined;
    }>, unknown, import("zod/v4/core").$ZodTypeInternals<import("@inv/lang-core").SubComponentOf<{
        text: string;
        size?: "small" | "large" | "default" | "small-heavy" | "large-heavy" | undefined;
    }>, unknown>>, import("zod/v4/core").$ZodType<import("@inv/lang-core").SubComponentOf<{
        textMarkdown: string;
        variant?: "clear" | "card" | "sunk" | undefined;
    }>, unknown, import("zod/v4/core").$ZodTypeInternals<import("@inv/lang-core").SubComponentOf<{
        textMarkdown: string;
        variant?: "clear" | "card" | "sunk" | undefined;
    }>, unknown>>, import("zod/v4/core").$ZodType<import("@inv/lang-core").SubComponentOf<{
        title?: string | undefined;
        subtitle?: string | undefined;
    }>, unknown, import("zod/v4/core").$ZodTypeInternals<import("@inv/lang-core").SubComponentOf<{
        title?: string | undefined;
        subtitle?: string | undefined;
    }>, unknown>>, import("zod/v4/core").$ZodType<import("@inv/lang-core").SubComponentOf<{
        variant: "error" | "neutral" | "info" | "warning" | "success";
        title: string;
        description: string;
        visible: import("@inv/lang-core").StateField<boolean | undefined>;
    }>, unknown, import("zod/v4/core").$ZodTypeInternals<import("@inv/lang-core").SubComponentOf<{
        variant: "error" | "neutral" | "info" | "warning" | "success";
        title: string;
        description: string;
        visible: import("@inv/lang-core").StateField<boolean | undefined>;
    }>, unknown>>, import("zod/v4/core").$ZodType<import("@inv/lang-core").SubComponentOf<{
        variant?: "neutral" | "info" | "danger" | "warning" | "success" | undefined;
        title?: string | undefined;
        description?: string | undefined;
    }>, unknown, import("zod/v4/core").$ZodTypeInternals<import("@inv/lang-core").SubComponentOf<{
        variant?: "neutral" | "info" | "danger" | "warning" | "success" | undefined;
        title?: string | undefined;
        description?: string | undefined;
    }>, unknown>>, import("zod/v4/core").$ZodType<import("@inv/lang-core").SubComponentOf<{
        language: string;
        codeString: string;
    }>, unknown, import("zod/v4/core").$ZodTypeInternals<import("@inv/lang-core").SubComponentOf<{
        language: string;
        codeString: string;
    }>, unknown>>, import("zod/v4/core").$ZodType<import("@inv/lang-core").SubComponentOf<{
        alt: string;
        src?: string | undefined;
    }>, unknown, import("zod/v4/core").$ZodTypeInternals<import("@inv/lang-core").SubComponentOf<{
        alt: string;
        src?: string | undefined;
    }>, unknown>>, import("zod/v4/core").$ZodType<import("@inv/lang-core").SubComponentOf<{
        src: string;
        alt?: string | undefined;
    }>, unknown, import("zod/v4/core").$ZodTypeInternals<import("@inv/lang-core").SubComponentOf<{
        src: string;
        alt?: string | undefined;
    }>, unknown>>, import("zod/v4/core").$ZodType<import("@inv/lang-core").SubComponentOf<{
        images: {
            src: string;
            alt?: string | undefined;
            details?: string | undefined;
        }[];
    }>, unknown, import("zod/v4/core").$ZodTypeInternals<import("@inv/lang-core").SubComponentOf<{
        images: {
            src: string;
            alt?: string | undefined;
            details?: string | undefined;
        }[];
    }>, unknown>>, import("zod/v4/core").$ZodType<import("@inv/lang-core").SubComponentOf<{
        orientation?: "horizontal" | "vertical" | undefined;
        decorative?: boolean | undefined;
    }>, unknown, import("zod/v4/core").$ZodTypeInternals<import("@inv/lang-core").SubComponentOf<{
        orientation?: "horizontal" | "vertical" | undefined;
        decorative?: boolean | undefined;
    }>, unknown>>, import("zod/v4/core").$ZodType<import("@inv/lang-core").SubComponentOf<{
        labels: string[];
        series: {
            category: string;
            values: number[];
        }[];
        variant?: "stacked" | "grouped" | undefined;
        xLabel?: string | undefined;
        yLabel?: string | undefined;
    }>, unknown, import("zod/v4/core").$ZodTypeInternals<import("@inv/lang-core").SubComponentOf<{
        labels: string[];
        series: {
            category: string;
            values: number[];
        }[];
        variant?: "stacked" | "grouped" | undefined;
        xLabel?: string | undefined;
        yLabel?: string | undefined;
    }>, unknown>>, import("zod/v4/core").$ZodType<import("@inv/lang-core").SubComponentOf<{
        labels: string[];
        series: {
            category: string;
            values: number[];
        }[];
    }>, unknown, import("zod/v4/core").$ZodTypeInternals<import("@inv/lang-core").SubComponentOf<{
        labels: string[];
        series: {
            category: string;
            values: number[];
        }[];
    }>, unknown>>, import("zod/v4/core").$ZodType<import("@inv/lang-core").SubComponentOf<{
        labels: string[];
        values: number[];
        variant?: "pie" | "donut" | undefined;
        appearance?: "circular" | "semiCircular" | undefined;
    }>, unknown, import("zod/v4/core").$ZodTypeInternals<import("@inv/lang-core").SubComponentOf<{
        labels: string[];
        values: number[];
        variant?: "pie" | "donut" | undefined;
        appearance?: "circular" | "semiCircular" | undefined;
    }>, unknown>>, import("zod/v4/core").$ZodType<import("@inv/lang-core").SubComponentOf<{
        labels: string[];
        values: number[];
    }>, unknown, import("zod/v4/core").$ZodTypeInternals<import("@inv/lang-core").SubComponentOf<{
        labels: string[];
        values: number[];
    }>, unknown>>, import("zod/v4/core").$ZodType<import("@inv/lang-core").SubComponentOf<{
        labels: string[];
        values: number[];
    }>, unknown, import("zod/v4/core").$ZodTypeInternals<import("@inv/lang-core").SubComponentOf<{
        labels: string[];
        values: number[];
    }>, unknown>>, import("zod/v4/core").$ZodType<import("@inv/lang-core").SubComponentOf<{
        datasets: {
            name: string;
            points: {
                x: number;
                y: number;
                z?: number | undefined;
            }[];
        }[];
        xLabel?: string | undefined;
        yLabel?: string | undefined;
    }>, unknown, import("zod/v4/core").$ZodTypeInternals<import("@inv/lang-core").SubComponentOf<{
        datasets: {
            name: string;
            points: {
                x: number;
                y: number;
                z?: number | undefined;
            }[];
        }[];
        xLabel?: string | undefined;
        yLabel?: string | undefined;
    }>, unknown>>, import("zod/v4/core").$ZodType<import("@inv/lang-core").SubComponentOf<{
        labels: string[];
        series: {
            category: string;
            values: number[];
        }[];
        variant?: "step" | "linear" | "natural" | undefined;
        xLabel?: string | undefined;
        yLabel?: string | undefined;
        height?: number | undefined;
    }>, unknown, import("zod/v4/core").$ZodTypeInternals<import("@inv/lang-core").SubComponentOf<{
        labels: string[];
        series: {
            category: string;
            values: number[];
        }[];
        variant?: "step" | "linear" | "natural" | undefined;
        xLabel?: string | undefined;
        yLabel?: string | undefined;
        height?: number | undefined;
    }>, unknown>>, import("zod/v4/core").$ZodType<import("@inv/lang-core").SubComponentOf<{
        labels: string[];
        series: {
            category: string;
            values: number[];
        }[];
        variant?: "stacked" | "grouped" | undefined;
        xLabel?: string | undefined;
        yLabel?: string | undefined;
        height?: number | undefined;
    }>, unknown, import("zod/v4/core").$ZodTypeInternals<import("@inv/lang-core").SubComponentOf<{
        labels: string[];
        series: {
            category: string;
            values: number[];
        }[];
        variant?: "stacked" | "grouped" | undefined;
        xLabel?: string | undefined;
        yLabel?: string | undefined;
        height?: number | undefined;
    }>, unknown>>, import("zod/v4/core").$ZodType<import("@inv/lang-core").SubComponentOf<{
        labels: string[];
        series: {
            category: string;
            values: number[];
        }[];
        variant?: "step" | "linear" | "natural" | undefined;
        xLabel?: string | undefined;
        yLabel?: string | undefined;
        height?: number | undefined;
    }>, unknown, import("zod/v4/core").$ZodTypeInternals<import("@inv/lang-core").SubComponentOf<{
        labels: string[];
        series: {
            category: string;
            values: number[];
        }[];
        variant?: "step" | "linear" | "natural" | undefined;
        xLabel?: string | undefined;
        yLabel?: string | undefined;
        height?: number | undefined;
    }>, unknown>>, import("zod/v4/core").$ZodType<import("@inv/lang-core").SubComponentOf<{
        columns: import("@inv/lang-core").SubComponentOf<{
            label: string;
            data: any;
            type?: "string" | "number" | "action" | undefined;
        }>[];
    }>, unknown, import("zod/v4/core").$ZodTypeInternals<import("@inv/lang-core").SubComponentOf<{
        columns: import("@inv/lang-core").SubComponentOf<{
            label: string;
            data: any;
            type?: "string" | "number" | "action" | undefined;
        }>[];
    }>, unknown>>, import("zod/v4/core").$ZodType<import("@inv/lang-core").SubComponentOf<{
        tags: string[];
        size?: "sm" | "md" | "lg" | undefined;
    }>, unknown, import("zod/v4/core").$ZodTypeInternals<import("@inv/lang-core").SubComponentOf<{
        tags: string[];
        size?: "sm" | "md" | "lg" | undefined;
    }>, unknown>>, import("zod/v4/core").$ZodType<import("@inv/lang-core").SubComponentOf<{
        name: string;
        buttons: import("@inv/lang-core").SubComponentOf<{
            buttons: import("@inv/lang-core").SubComponentOf<{
                label: string;
                action?: {
                    type: "open_url";
                    url: string;
                } | {
                    type: "continue_conversation";
                    context?: string | undefined;
                } | {
                    type: string;
                    params?: Record<string, any> | undefined;
                } | undefined;
                variant?: "primary" | "secondary" | "tertiary" | undefined;
                type?: "normal" | "destructive" | undefined;
                size?: "small" | "extra-small" | "medium" | "large" | undefined;
            }>[];
            direction?: "row" | "column" | undefined;
        }>;
        fields: import("@inv/lang-core").SubComponentOf<{
            label: string;
            input: import("@inv/lang-core").SubComponentOf<{
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
            }> | import("@inv/lang-core").SubComponentOf<{
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
            }> | import("@inv/lang-core").SubComponentOf<{
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
            }> | import("@inv/lang-core").SubComponentOf<{
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
            }> | import("@inv/lang-core").SubComponentOf<{
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
            }> | import("@inv/lang-core").SubComponentOf<{
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
            }> | import("@inv/lang-core").SubComponentOf<{
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
            }> | import("@inv/lang-core").SubComponentOf<{
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
            }> | import("@inv/lang-core").SubComponentOf<{
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
            }>;
            hint?: string | undefined;
        }>[];
    }>, unknown, import("zod/v4/core").$ZodTypeInternals<import("@inv/lang-core").SubComponentOf<{
        name: string;
        buttons: import("@inv/lang-core").SubComponentOf<{
            buttons: import("@inv/lang-core").SubComponentOf<{
                label: string;
                action?: {
                    type: "open_url";
                    url: string;
                } | {
                    type: "continue_conversation";
                    context?: string | undefined;
                } | {
                    type: string;
                    params?: Record<string, any> | undefined;
                } | undefined;
                variant?: "primary" | "secondary" | "tertiary" | undefined;
                type?: "normal" | "destructive" | undefined;
                size?: "small" | "extra-small" | "medium" | "large" | undefined;
            }>[];
            direction?: "row" | "column" | undefined;
        }>;
        fields: import("@inv/lang-core").SubComponentOf<{
            label: string;
            input: import("@inv/lang-core").SubComponentOf<{
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
            }> | import("@inv/lang-core").SubComponentOf<{
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
            }> | import("@inv/lang-core").SubComponentOf<{
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
            }> | import("@inv/lang-core").SubComponentOf<{
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
            }> | import("@inv/lang-core").SubComponentOf<{
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
            }> | import("@inv/lang-core").SubComponentOf<{
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
            }> | import("@inv/lang-core").SubComponentOf<{
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
            }> | import("@inv/lang-core").SubComponentOf<{
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
            }> | import("@inv/lang-core").SubComponentOf<{
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
            }>;
            hint?: string | undefined;
        }>[];
    }>, unknown>>, import("zod/v4/core").$ZodType<import("@inv/lang-core").SubComponentOf<{
        buttons: import("@inv/lang-core").SubComponentOf<{
            label: string;
            action?: {
                type: "open_url";
                url: string;
            } | {
                type: "continue_conversation";
                context?: string | undefined;
            } | {
                type: string;
                params?: Record<string, any> | undefined;
            } | undefined;
            variant?: "primary" | "secondary" | "tertiary" | undefined;
            type?: "normal" | "destructive" | undefined;
            size?: "small" | "extra-small" | "medium" | "large" | undefined;
        }>[];
        direction?: "row" | "column" | undefined;
    }>, unknown, import("zod/v4/core").$ZodTypeInternals<import("@inv/lang-core").SubComponentOf<{
        buttons: import("@inv/lang-core").SubComponentOf<{
            label: string;
            action?: {
                type: "open_url";
                url: string;
            } | {
                type: "continue_conversation";
                context?: string | undefined;
            } | {
                type: string;
                params?: Record<string, any> | undefined;
            } | undefined;
            variant?: "primary" | "secondary" | "tertiary" | undefined;
            type?: "normal" | "destructive" | undefined;
            size?: "small" | "extra-small" | "medium" | "large" | undefined;
        }>[];
        direction?: "row" | "column" | undefined;
    }>, unknown>>, import("zod/v4/core").$ZodType<import("@inv/lang-core").SubComponentOf<{
        name: string;
        icon: import("@inv/lang-core").SubComponentOf<{
            name: string;
            category?: string | undefined;
        }>;
        action?: {
            type: "open_url";
            url: string;
        } | {
            type: "continue_conversation";
            context?: string | undefined;
        } | {
            type: string;
            params?: Record<string, any> | undefined;
        } | undefined;
        variant?: "primary" | "secondary" | "tertiary" | undefined;
        size?: "small" | "extra-small" | "medium" | "large" | undefined;
        shape?: "circle" | "square" | undefined;
    }>, unknown, import("zod/v4/core").$ZodTypeInternals<import("@inv/lang-core").SubComponentOf<{
        name: string;
        icon: import("@inv/lang-core").SubComponentOf<{
            name: string;
            category?: string | undefined;
        }>;
        action?: {
            type: "open_url";
            url: string;
        } | {
            type: "continue_conversation";
            context?: string | undefined;
        } | {
            type: string;
            params?: Record<string, any> | undefined;
        } | undefined;
        variant?: "primary" | "secondary" | "tertiary" | undefined;
        size?: "small" | "extra-small" | "medium" | "large" | undefined;
        shape?: "circle" | "square" | undefined;
    }>, unknown>>, import("zod/v4/core").$ZodType<import("@inv/lang-core").SubComponentOf<{
        items: import("@inv/lang-core").SubComponentOf<{
            title: string;
            details: string;
        }>[];
    }>, unknown, import("zod/v4/core").$ZodTypeInternals<import("@inv/lang-core").SubComponentOf<{
        items: import("@inv/lang-core").SubComponentOf<{
            title: string;
            details: string;
        }>[];
    }>, unknown>>, import("zod/v4/core").$ZodType<import("@inv/lang-core").SubComponentOf<{
        heading: string;
        description?: string | undefined;
    }>, unknown, import("zod/v4/core").$ZodTypeInternals<import("@inv/lang-core").SubComponentOf<{
        heading: string;
        description?: string | undefined;
    }>, unknown>>, import("zod/v4/core").$ZodType<import("@inv/lang-core").SubComponentOf<{
        rows: {
            left: string;
            right: string;
            rightVariant: "number" | "text";
        }[];
        size: "small" | "default";
        header?: {
            left: string;
            right: string;
            rightVariant: "number" | "text";
        } | undefined;
        footer?: {
            left: string;
            right: string;
            rightVariant: "number" | "text";
        } | undefined;
    }>, unknown, import("zod/v4/core").$ZodTypeInternals<import("@inv/lang-core").SubComponentOf<{
        rows: {
            left: string;
            right: string;
            rightVariant: "number" | "text";
        }[];
        size: "small" | "default";
        header?: {
            left: string;
            right: string;
            rightVariant: "number" | "text";
        } | undefined;
        footer?: {
            left: string;
            right: string;
            rightVariant: "number" | "text";
        } | undefined;
    }>, unknown>>, import("zod/v4/core").$ZodType<import("@inv/lang-core").SubComponentOf<{
        name: string;
        columns: {
            type: "number" | "select" | "text" | "url" | "date-single";
            key: string;
            header: string;
            width?: number | undefined;
            options?: {
                value: string;
                label: string;
            }[] | undefined;
        }[];
        data: {
            id: string;
            values: (string | number)[];
        }[];
    }>, unknown, import("zod/v4/core").$ZodTypeInternals<import("@inv/lang-core").SubComponentOf<{
        name: string;
        columns: {
            type: "number" | "select" | "text" | "url" | "date-single";
            key: string;
            header: string;
            width?: number | undefined;
            options?: {
                value: string;
                label: string;
            }[] | undefined;
        }[];
        data: {
            id: string;
            values: (string | number)[];
        }[];
    }>, unknown>>, import("zod/v4/core").$ZodType<import("@inv/lang-core").SubComponentOf<{
        items: import("@inv/lang-core").SubComponentOf<{
            lhs: import("@inv/lang-core").SubComponentOf<{
                icon: import("@inv/lang-core").SubComponentOf<{
                    name: string;
                    category?: string | undefined;
                }>;
                iconVariant: "filled" | "neutral" | "info" | "danger" | "warning" | "success" | "inverted" | "soft";
                iconSize: "s" | "sm" | "md" | "lg" | "l" | "xs" | "m" | "xl";
                title: string;
                bold: boolean;
                layout: "horizontal" | "vertical";
                subtitle?: string | undefined;
            }> | import("@inv/lang-core").SubComponentOf<{
                src: string;
                title: string;
                bold: boolean;
                layout: "horizontal" | "vertical";
                alt?: string | undefined;
                subtitle?: string | undefined;
                imageSize?: number | undefined;
            }>;
            id?: string | undefined;
            rhs?: import("@inv/lang-core").SubComponentOf<{
                variant: "number" | "text";
                value: string;
                subtextVariant: "number" | "text" | "metric";
                size: "sm" | "md" | "lg" | "xs";
                subtext?: string | undefined;
            }> | import("@inv/lang-core").SubComponentOf<{
                variant: "number" | "text";
                value: string;
                subtextVariant: "number" | "text" | "metric";
                size: "sm" | "md" | "lg" | "xs";
                subtext?: string | undefined;
            }> | undefined;
        }>[];
        layout: "grid";
        responsive: boolean;
        action?: {
            type: "open_url";
            url: string;
        } | {
            type: "continue_conversation";
            context?: string | undefined;
        } | {
            type: string;
            params?: Record<string, any> | undefined;
        } | undefined;
        gap?: string | number | undefined;
    }>, unknown, import("zod/v4/core").$ZodTypeInternals<import("@inv/lang-core").SubComponentOf<{
        items: import("@inv/lang-core").SubComponentOf<{
            lhs: import("@inv/lang-core").SubComponentOf<{
                icon: import("@inv/lang-core").SubComponentOf<{
                    name: string;
                    category?: string | undefined;
                }>;
                iconVariant: "filled" | "neutral" | "info" | "danger" | "warning" | "success" | "inverted" | "soft";
                iconSize: "s" | "sm" | "md" | "lg" | "l" | "xs" | "m" | "xl";
                title: string;
                bold: boolean;
                layout: "horizontal" | "vertical";
                subtitle?: string | undefined;
            }> | import("@inv/lang-core").SubComponentOf<{
                src: string;
                title: string;
                bold: boolean;
                layout: "horizontal" | "vertical";
                alt?: string | undefined;
                subtitle?: string | undefined;
                imageSize?: number | undefined;
            }>;
            id?: string | undefined;
            rhs?: import("@inv/lang-core").SubComponentOf<{
                variant: "number" | "text";
                value: string;
                subtextVariant: "number" | "text" | "metric";
                size: "sm" | "md" | "lg" | "xs";
                subtext?: string | undefined;
            }> | import("@inv/lang-core").SubComponentOf<{
                variant: "number" | "text";
                value: string;
                subtextVariant: "number" | "text" | "metric";
                size: "sm" | "md" | "lg" | "xs";
                subtext?: string | undefined;
            }> | undefined;
        }>[];
        layout: "grid";
        responsive: boolean;
        action?: {
            type: "open_url";
            url: string;
        } | {
            type: "continue_conversation";
            context?: string | undefined;
        } | {
            type: string;
            params?: Record<string, any> | undefined;
        } | undefined;
        gap?: string | number | undefined;
    }>, unknown>>, import("zod/v4/core").$ZodType<import("@inv/lang-core").SubComponentOf<{
        items: import("@inv/lang-core").SubComponentOf<{
            top: import("@inv/lang-core").SubComponentOf<{
                variant: "number" | "text";
                value: string;
                subtextVariant: "number" | "text" | "metric";
                size: "sm" | "md" | "lg" | "xs";
                subtext?: string | undefined;
            }> | import("@inv/lang-core").SubComponentOf<{
                icon: import("@inv/lang-core").SubComponentOf<{
                    name: string;
                    category?: string | undefined;
                }>;
                iconVariant: "filled" | "neutral" | "info" | "danger" | "warning" | "success" | "inverted" | "soft";
                iconSize: "s" | "sm" | "md" | "lg" | "l" | "xs" | "m" | "xl";
                title: string;
                bold: boolean;
                layout: "horizontal" | "vertical";
                subtitle?: string | undefined;
            }> | import("@inv/lang-core").SubComponentOf<{
                src: string;
                title: string;
                bold: boolean;
                layout: "horizontal" | "vertical";
                alt?: string | undefined;
                subtitle?: string | undefined;
                imageSize?: number | undefined;
            }>;
            id?: string | undefined;
            bottom?: import("@inv/lang-core").SubComponentOf<{
                value: string;
                subtext?: string | undefined;
                trend?: {
                    direction: "up" | "down";
                    value: number;
                } | undefined;
            }> | undefined;
        }>[];
        layout: "grid" | "carousel";
        responsive: boolean;
        action?: {
            type: "open_url";
            url: string;
        } | {
            type: "continue_conversation";
            context?: string | undefined;
        } | {
            type: string;
            params?: Record<string, any> | undefined;
        } | undefined;
        gap?: string | number | undefined;
    }>, unknown, import("zod/v4/core").$ZodTypeInternals<import("@inv/lang-core").SubComponentOf<{
        items: import("@inv/lang-core").SubComponentOf<{
            top: import("@inv/lang-core").SubComponentOf<{
                variant: "number" | "text";
                value: string;
                subtextVariant: "number" | "text" | "metric";
                size: "sm" | "md" | "lg" | "xs";
                subtext?: string | undefined;
            }> | import("@inv/lang-core").SubComponentOf<{
                icon: import("@inv/lang-core").SubComponentOf<{
                    name: string;
                    category?: string | undefined;
                }>;
                iconVariant: "filled" | "neutral" | "info" | "danger" | "warning" | "success" | "inverted" | "soft";
                iconSize: "s" | "sm" | "md" | "lg" | "l" | "xs" | "m" | "xl";
                title: string;
                bold: boolean;
                layout: "horizontal" | "vertical";
                subtitle?: string | undefined;
            }> | import("@inv/lang-core").SubComponentOf<{
                src: string;
                title: string;
                bold: boolean;
                layout: "horizontal" | "vertical";
                alt?: string | undefined;
                subtitle?: string | undefined;
                imageSize?: number | undefined;
            }>;
            id?: string | undefined;
            bottom?: import("@inv/lang-core").SubComponentOf<{
                value: string;
                subtext?: string | undefined;
                trend?: {
                    direction: "up" | "down";
                    value: number;
                } | undefined;
            }> | undefined;
        }>[];
        layout: "grid" | "carousel";
        responsive: boolean;
        action?: {
            type: "open_url";
            url: string;
        } | {
            type: "continue_conversation";
            context?: string | undefined;
        } | {
            type: string;
            params?: Record<string, any> | undefined;
        } | undefined;
        gap?: string | number | undefined;
    }>, unknown>>, import("zod/v4/core").$ZodType<import("@inv/lang-core").SubComponentOf<{
        items: import("@inv/lang-core").SubComponentOf<{
            title: string | import("@inv/lang-core").SubComponentOf<{
                text: string;
                icon?: import("@inv/lang-core").SubComponentOf<{
                    name: string;
                    category?: string | undefined;
                }> | undefined;
                size?: "sm" | "md" | "lg" | undefined;
                variant?: "neutral" | "info" | "danger" | "warning" | "success" | undefined;
            }>;
            id?: string | undefined;
            body?: string | undefined;
            bgColor?: "gray" | undefined;
            bgImageSrc?: string | undefined;
            bgImageAlt?: string | undefined;
        }>[];
        layout: "grid" | "carousel";
        responsive: boolean;
        action?: {
            type: "open_url";
            url: string;
        } | {
            type: "continue_conversation";
            context?: string | undefined;
        } | {
            type: string;
            params?: Record<string, any> | undefined;
        } | undefined;
        gap?: string | number | undefined;
    }>, unknown, import("zod/v4/core").$ZodTypeInternals<import("@inv/lang-core").SubComponentOf<{
        items: import("@inv/lang-core").SubComponentOf<{
            title: string | import("@inv/lang-core").SubComponentOf<{
                text: string;
                icon?: import("@inv/lang-core").SubComponentOf<{
                    name: string;
                    category?: string | undefined;
                }> | undefined;
                size?: "sm" | "md" | "lg" | undefined;
                variant?: "neutral" | "info" | "danger" | "warning" | "success" | undefined;
            }>;
            id?: string | undefined;
            body?: string | undefined;
            bgColor?: "gray" | undefined;
            bgImageSrc?: string | undefined;
            bgImageAlt?: string | undefined;
        }>[];
        layout: "grid" | "carousel";
        responsive: boolean;
        action?: {
            type: "open_url";
            url: string;
        } | {
            type: "continue_conversation";
            context?: string | undefined;
        } | {
            type: string;
            params?: Record<string, any> | undefined;
        } | undefined;
        gap?: string | number | undefined;
    }>, unknown>>, import("zod/v4/core").$ZodType<import("@inv/lang-core").SubComponentOf<{
        items: import("@inv/lang-core").SubComponentOf<{
            body: (import("@inv/lang-core").SubComponentOf<{
                alt: string;
                src?: string | undefined;
            }> | import("@inv/lang-core").SubComponentOf<{
                variant: "number" | "text";
                value: string;
                subtextVariant: "number" | "text" | "metric";
                size: "sm" | "md" | "lg" | "xs";
                subtext?: string | undefined;
            }> | import("@inv/lang-core").SubComponentOf<{
                variant: "number" | "text";
                value: string;
                subtextVariant: "number" | "text" | "metric";
                size: "sm" | "md" | "lg" | "xs";
                subtext?: string | undefined;
            }> | import("@inv/lang-core").SubComponentOf<{
                value: string;
                subtext?: string | undefined;
                trend?: {
                    direction: "up" | "down";
                    value: number;
                } | undefined;
            }> | import("@inv/lang-core").SubComponentOf<{
                icon: import("@inv/lang-core").SubComponentOf<{
                    name: string;
                    category?: string | undefined;
                }>;
                iconVariant: "filled" | "neutral" | "info" | "danger" | "warning" | "success" | "inverted" | "soft";
                iconSize: "s" | "sm" | "md" | "lg" | "l" | "xs" | "m" | "xl";
                title: string;
                bold: boolean;
                layout: "horizontal" | "vertical";
                subtitle?: string | undefined;
            }> | import("@inv/lang-core").SubComponentOf<{
                labels: string[];
                series: {
                    category: string;
                    values: number[];
                }[];
                variant?: "step" | "linear" | "natural" | undefined;
                xLabel?: string | undefined;
                yLabel?: string | undefined;
                height?: number | undefined;
            }> | import("@inv/lang-core").SubComponentOf<{
                labels: string[];
                series: {
                    category: string;
                    values: number[];
                }[];
                variant?: "stacked" | "grouped" | undefined;
                xLabel?: string | undefined;
                yLabel?: string | undefined;
                height?: number | undefined;
            }> | import("@inv/lang-core").SubComponentOf<{
                labels: string[];
                series: {
                    category: string;
                    values: number[];
                }[];
                variant?: "step" | "linear" | "natural" | undefined;
                xLabel?: string | undefined;
                yLabel?: string | undefined;
                height?: number | undefined;
            }> | import("@inv/lang-core").SubComponentOf<{
                items: import("@inv/lang-core").SubComponentOf<{
                    title: string;
                    subtitle?: string | undefined;
                    image?: {
                        src: string;
                        alt: string;
                    } | undefined;
                    actionLabel?: string | undefined;
                    action?: {
                        type: "open_url";
                        url: string;
                    } | {
                        type: "continue_conversation";
                        context?: string | undefined;
                    } | {
                        type: string;
                        params?: Record<string, any> | undefined;
                    } | undefined;
                }>[];
                variant?: "number" | "image" | undefined;
                size?: "small" | "default" | undefined;
            }> | import("@inv/lang-core").SubComponentOf<{
                tags: string[];
                size?: "sm" | "md" | "lg" | undefined;
            }> | import("@inv/lang-core").SubComponentOf<{
                rows: {
                    left: string;
                    right: string;
                    rightVariant: "number" | "text";
                }[];
                size: "small" | "default";
                header?: {
                    left: string;
                    right: string;
                    rightVariant: "number" | "text";
                } | undefined;
                footer?: {
                    left: string;
                    right: string;
                    rightVariant: "number" | "text";
                } | undefined;
            }>)[];
            id?: string | undefined;
            header?: import("@inv/lang-core").SubComponentOf<{
                alt: string;
                src?: string | undefined;
            }> | import("@inv/lang-core").SubComponentOf<{
                variant: "number" | "text";
                value: string;
                subtextVariant: "number" | "text" | "metric";
                size: "sm" | "md" | "lg" | "xs";
                subtext?: string | undefined;
            }> | import("@inv/lang-core").SubComponentOf<{
                icon: import("@inv/lang-core").SubComponentOf<{
                    name: string;
                    category?: string | undefined;
                }>;
                iconVariant: "filled" | "neutral" | "info" | "danger" | "warning" | "success" | "inverted" | "soft";
                iconSize: "s" | "sm" | "md" | "lg" | "l" | "xs" | "m" | "xl";
                title: string;
                bold: boolean;
                layout: "horizontal" | "vertical";
                subtitle?: string | undefined;
            }> | import("@inv/lang-core").SubComponentOf<{
                src: string;
                title: string;
                bold: boolean;
                layout: "horizontal" | "vertical";
                alt?: string | undefined;
                subtitle?: string | undefined;
                imageSize?: number | undefined;
            }> | import("@inv/lang-core").SubComponentOf<{
                src: string;
                title: string;
                bold: boolean;
                alt?: string | undefined;
                subtitle?: string | undefined;
            }> | undefined;
            footer?: {
                price?: import("@inv/lang-core").SubComponentOf<{
                    variant: "number" | "text";
                    value: string;
                    subtextVariant: "number" | "text" | "metric";
                    size: "sm" | "md" | "lg" | "xs";
                    subtext?: string | undefined;
                }> | import("@inv/lang-core").SubComponentOf<{
                    value: string;
                    subtext?: string | undefined;
                    previousValue?: string | undefined;
                    trend?: {
                        direction: "up" | "down";
                        value: number;
                    } | undefined;
                }> | undefined;
                button?: import("@inv/lang-core").SubComponentOf<{
                    label: string;
                    action?: {
                        type: "open_url";
                        url: string;
                    } | {
                        type: "continue_conversation";
                        context?: string | undefined;
                    } | {
                        type: string;
                        params?: Record<string, any> | undefined;
                    } | undefined;
                    variant?: "primary" | "secondary" | "tertiary" | undefined;
                    type?: "normal" | "destructive" | undefined;
                    size?: "small" | "extra-small" | "medium" | "large" | undefined;
                }> | undefined;
            } | undefined;
        }>[];
        layout: "grid" | "carousel";
        responsive: boolean;
        action?: {
            type: "open_url";
            url: string;
        } | {
            type: "continue_conversation";
            context?: string | undefined;
        } | {
            type: string;
            params?: Record<string, any> | undefined;
        } | undefined;
        gap?: string | number | undefined;
    }>, unknown, import("zod/v4/core").$ZodTypeInternals<import("@inv/lang-core").SubComponentOf<{
        items: import("@inv/lang-core").SubComponentOf<{
            body: (import("@inv/lang-core").SubComponentOf<{
                alt: string;
                src?: string | undefined;
            }> | import("@inv/lang-core").SubComponentOf<{
                variant: "number" | "text";
                value: string;
                subtextVariant: "number" | "text" | "metric";
                size: "sm" | "md" | "lg" | "xs";
                subtext?: string | undefined;
            }> | import("@inv/lang-core").SubComponentOf<{
                variant: "number" | "text";
                value: string;
                subtextVariant: "number" | "text" | "metric";
                size: "sm" | "md" | "lg" | "xs";
                subtext?: string | undefined;
            }> | import("@inv/lang-core").SubComponentOf<{
                value: string;
                subtext?: string | undefined;
                trend?: {
                    direction: "up" | "down";
                    value: number;
                } | undefined;
            }> | import("@inv/lang-core").SubComponentOf<{
                icon: import("@inv/lang-core").SubComponentOf<{
                    name: string;
                    category?: string | undefined;
                }>;
                iconVariant: "filled" | "neutral" | "info" | "danger" | "warning" | "success" | "inverted" | "soft";
                iconSize: "s" | "sm" | "md" | "lg" | "l" | "xs" | "m" | "xl";
                title: string;
                bold: boolean;
                layout: "horizontal" | "vertical";
                subtitle?: string | undefined;
            }> | import("@inv/lang-core").SubComponentOf<{
                labels: string[];
                series: {
                    category: string;
                    values: number[];
                }[];
                variant?: "step" | "linear" | "natural" | undefined;
                xLabel?: string | undefined;
                yLabel?: string | undefined;
                height?: number | undefined;
            }> | import("@inv/lang-core").SubComponentOf<{
                labels: string[];
                series: {
                    category: string;
                    values: number[];
                }[];
                variant?: "stacked" | "grouped" | undefined;
                xLabel?: string | undefined;
                yLabel?: string | undefined;
                height?: number | undefined;
            }> | import("@inv/lang-core").SubComponentOf<{
                labels: string[];
                series: {
                    category: string;
                    values: number[];
                }[];
                variant?: "step" | "linear" | "natural" | undefined;
                xLabel?: string | undefined;
                yLabel?: string | undefined;
                height?: number | undefined;
            }> | import("@inv/lang-core").SubComponentOf<{
                items: import("@inv/lang-core").SubComponentOf<{
                    title: string;
                    subtitle?: string | undefined;
                    image?: {
                        src: string;
                        alt: string;
                    } | undefined;
                    actionLabel?: string | undefined;
                    action?: {
                        type: "open_url";
                        url: string;
                    } | {
                        type: "continue_conversation";
                        context?: string | undefined;
                    } | {
                        type: string;
                        params?: Record<string, any> | undefined;
                    } | undefined;
                }>[];
                variant?: "number" | "image" | undefined;
                size?: "small" | "default" | undefined;
            }> | import("@inv/lang-core").SubComponentOf<{
                tags: string[];
                size?: "sm" | "md" | "lg" | undefined;
            }> | import("@inv/lang-core").SubComponentOf<{
                rows: {
                    left: string;
                    right: string;
                    rightVariant: "number" | "text";
                }[];
                size: "small" | "default";
                header?: {
                    left: string;
                    right: string;
                    rightVariant: "number" | "text";
                } | undefined;
                footer?: {
                    left: string;
                    right: string;
                    rightVariant: "number" | "text";
                } | undefined;
            }>)[];
            id?: string | undefined;
            header?: import("@inv/lang-core").SubComponentOf<{
                alt: string;
                src?: string | undefined;
            }> | import("@inv/lang-core").SubComponentOf<{
                variant: "number" | "text";
                value: string;
                subtextVariant: "number" | "text" | "metric";
                size: "sm" | "md" | "lg" | "xs";
                subtext?: string | undefined;
            }> | import("@inv/lang-core").SubComponentOf<{
                icon: import("@inv/lang-core").SubComponentOf<{
                    name: string;
                    category?: string | undefined;
                }>;
                iconVariant: "filled" | "neutral" | "info" | "danger" | "warning" | "success" | "inverted" | "soft";
                iconSize: "s" | "sm" | "md" | "lg" | "l" | "xs" | "m" | "xl";
                title: string;
                bold: boolean;
                layout: "horizontal" | "vertical";
                subtitle?: string | undefined;
            }> | import("@inv/lang-core").SubComponentOf<{
                src: string;
                title: string;
                bold: boolean;
                layout: "horizontal" | "vertical";
                alt?: string | undefined;
                subtitle?: string | undefined;
                imageSize?: number | undefined;
            }> | import("@inv/lang-core").SubComponentOf<{
                src: string;
                title: string;
                bold: boolean;
                alt?: string | undefined;
                subtitle?: string | undefined;
            }> | undefined;
            footer?: {
                price?: import("@inv/lang-core").SubComponentOf<{
                    variant: "number" | "text";
                    value: string;
                    subtextVariant: "number" | "text" | "metric";
                    size: "sm" | "md" | "lg" | "xs";
                    subtext?: string | undefined;
                }> | import("@inv/lang-core").SubComponentOf<{
                    value: string;
                    subtext?: string | undefined;
                    previousValue?: string | undefined;
                    trend?: {
                        direction: "up" | "down";
                        value: number;
                    } | undefined;
                }> | undefined;
                button?: import("@inv/lang-core").SubComponentOf<{
                    label: string;
                    action?: {
                        type: "open_url";
                        url: string;
                    } | {
                        type: "continue_conversation";
                        context?: string | undefined;
                    } | {
                        type: string;
                        params?: Record<string, any> | undefined;
                    } | undefined;
                    variant?: "primary" | "secondary" | "tertiary" | undefined;
                    type?: "normal" | "destructive" | undefined;
                    size?: "small" | "extra-small" | "medium" | "large" | undefined;
                }> | undefined;
            } | undefined;
        }>[];
        layout: "grid" | "carousel";
        responsive: boolean;
        action?: {
            type: "open_url";
            url: string;
        } | {
            type: "continue_conversation";
            context?: string | undefined;
        } | {
            type: string;
            params?: Record<string, any> | undefined;
        } | undefined;
        gap?: string | number | undefined;
    }>, unknown>>, import("zod/v4/core").$ZodType<import("@inv/lang-core").SubComponentOf<{
        items: import("@inv/lang-core").SubComponentOf<{
            body: import("@inv/lang-core").SubComponentOf<{
                variant: "number" | "text";
                value: string;
                subtextVariant: "number" | "text" | "metric";
                size: "sm" | "md" | "lg" | "xs";
                subtext?: string | undefined;
            }>;
            id?: string | undefined;
            bgImageSrc?: string | undefined;
            tag?: import("@inv/lang-core").SubComponentOf<{
                text: string;
                icon?: import("@inv/lang-core").SubComponentOf<{
                    name: string;
                    category?: string | undefined;
                }> | undefined;
                size?: "sm" | "md" | "lg" | undefined;
                variant?: "neutral" | "info" | "danger" | "warning" | "success" | undefined;
            }> | undefined;
            bgImageAlt?: string | undefined;
        }>[];
        layout: "grid" | "carousel";
        responsive: boolean;
        action?: {
            type: "open_url";
            url: string;
        } | {
            type: "continue_conversation";
            context?: string | undefined;
        } | {
            type: string;
            params?: Record<string, any> | undefined;
        } | undefined;
        gap?: string | number | undefined;
    }>, unknown, import("zod/v4/core").$ZodTypeInternals<import("@inv/lang-core").SubComponentOf<{
        items: import("@inv/lang-core").SubComponentOf<{
            body: import("@inv/lang-core").SubComponentOf<{
                variant: "number" | "text";
                value: string;
                subtextVariant: "number" | "text" | "metric";
                size: "sm" | "md" | "lg" | "xs";
                subtext?: string | undefined;
            }>;
            id?: string | undefined;
            bgImageSrc?: string | undefined;
            tag?: import("@inv/lang-core").SubComponentOf<{
                text: string;
                icon?: import("@inv/lang-core").SubComponentOf<{
                    name: string;
                    category?: string | undefined;
                }> | undefined;
                size?: "sm" | "md" | "lg" | undefined;
                variant?: "neutral" | "info" | "danger" | "warning" | "success" | undefined;
            }> | undefined;
            bgImageAlt?: string | undefined;
        }>[];
        layout: "grid" | "carousel";
        responsive: boolean;
        action?: {
            type: "open_url";
            url: string;
        } | {
            type: "continue_conversation";
            context?: string | undefined;
        } | {
            type: string;
            params?: Record<string, any> | undefined;
        } | undefined;
        gap?: string | number | undefined;
    }>, unknown>>]>>;
    size: import("zod").ZodOptional<import("zod").ZodEnum<{
        sm: "sm";
        md: "md";
        lg: "lg";
    }>>;
}, import("zod/v4/core").$strip>>;
//# sourceMappingURL=index.d.ts.map