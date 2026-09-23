import { ComponentRenderProps } from "@inv/lang";
import React from "react";
import { z } from "zod/v4";
type SectionBlockRenderProps = ComponentRenderProps<{
    sections: unknown[];
    isFoldable?: boolean;
}>;
/** Shared renderer — also used by the chat library's SectionBlock variant (wider SectionItem). */
export declare const SectionBlockRenderer: ({ props, renderNode }: SectionBlockRenderProps) => React.JSX.Element;
export declare const SectionBlock: import("@inv/lang").DefinedComponent<z.ZodObject<{
    sections: z.ZodArray<z.core.$ZodType<import("@inv/lang-core").SubComponentOf<{
        value: string;
        trigger: string;
        content: (import("@inv/lang-core").SubComponentOf<{
            alt: string;
            src?: string | undefined;
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
        }> | import("@inv/lang-core").SubComponentOf<{
            text: string;
            size?: "small" | "large" | "default" | "small-heavy" | "large-heavy" | undefined;
        }> | import("@inv/lang-core").SubComponentOf<{
            textMarkdown: string;
            variant?: "clear" | "card" | "sunk" | undefined;
        }> | import("@inv/lang-core").SubComponentOf<{
            title?: string | undefined;
            subtitle?: string | undefined;
        }> | import("@inv/lang-core").SubComponentOf<{
            variant: "error" | "neutral" | "info" | "warning" | "success";
            title: string;
            description: string;
            visible: import("@inv/lang-core").StateField<boolean | undefined>;
        }> | import("@inv/lang-core").SubComponentOf<{
            variant?: "neutral" | "info" | "danger" | "warning" | "success" | undefined;
            title?: string | undefined;
            description?: string | undefined;
        }> | import("@inv/lang-core").SubComponentOf<{
            language: string;
            codeString: string;
        }> | import("@inv/lang-core").SubComponentOf<{
            src: string;
            alt?: string | undefined;
        }> | import("@inv/lang-core").SubComponentOf<{
            images: {
                src: string;
                alt?: string | undefined;
                details?: string | undefined;
            }[];
        }> | import("@inv/lang-core").SubComponentOf<{
            orientation?: "horizontal" | "vertical" | undefined;
            decorative?: boolean | undefined;
        }> | import("@inv/lang-core").SubComponentOf<{
            labels: string[];
            series: {
                category: string;
                values: number[];
            }[];
            variant?: "stacked" | "grouped" | undefined;
            xLabel?: string | undefined;
            yLabel?: string | undefined;
        }> | import("@inv/lang-core").SubComponentOf<{
            labels: string[];
            series: {
                category: string;
                values: number[];
            }[];
        }> | import("@inv/lang-core").SubComponentOf<{
            labels: string[];
            values: number[];
            variant?: "pie" | "donut" | undefined;
            appearance?: "circular" | "semiCircular" | undefined;
        }> | import("@inv/lang-core").SubComponentOf<{
            labels: string[];
            values: number[];
        }> | import("@inv/lang-core").SubComponentOf<{
            labels: string[];
            values: number[];
        }> | import("@inv/lang-core").SubComponentOf<{
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
        }> | import("@inv/lang-core").SubComponentOf<{
            columns: import("@inv/lang-core").SubComponentOf<{
                label: string;
                data: any;
                type?: "string" | "number" | "action" | undefined;
            }>[];
        }> | import("@inv/lang-core").SubComponentOf<{
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
        }> | import("@inv/lang-core").SubComponentOf<{
            items: import("@inv/lang-core").SubComponentOf<{
                title: string;
                details: string;
            }>[];
        }> | import("@inv/lang-core").SubComponentOf<{
            items: import("@inv/lang-core").SubComponentOf<{
                text: string;
            }>[];
        }>)[];
    }>, unknown, z.core.$ZodTypeInternals<import("@inv/lang-core").SubComponentOf<{
        value: string;
        trigger: string;
        content: (import("@inv/lang-core").SubComponentOf<{
            alt: string;
            src?: string | undefined;
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
        }> | import("@inv/lang-core").SubComponentOf<{
            text: string;
            size?: "small" | "large" | "default" | "small-heavy" | "large-heavy" | undefined;
        }> | import("@inv/lang-core").SubComponentOf<{
            textMarkdown: string;
            variant?: "clear" | "card" | "sunk" | undefined;
        }> | import("@inv/lang-core").SubComponentOf<{
            title?: string | undefined;
            subtitle?: string | undefined;
        }> | import("@inv/lang-core").SubComponentOf<{
            variant: "error" | "neutral" | "info" | "warning" | "success";
            title: string;
            description: string;
            visible: import("@inv/lang-core").StateField<boolean | undefined>;
        }> | import("@inv/lang-core").SubComponentOf<{
            variant?: "neutral" | "info" | "danger" | "warning" | "success" | undefined;
            title?: string | undefined;
            description?: string | undefined;
        }> | import("@inv/lang-core").SubComponentOf<{
            language: string;
            codeString: string;
        }> | import("@inv/lang-core").SubComponentOf<{
            src: string;
            alt?: string | undefined;
        }> | import("@inv/lang-core").SubComponentOf<{
            images: {
                src: string;
                alt?: string | undefined;
                details?: string | undefined;
            }[];
        }> | import("@inv/lang-core").SubComponentOf<{
            orientation?: "horizontal" | "vertical" | undefined;
            decorative?: boolean | undefined;
        }> | import("@inv/lang-core").SubComponentOf<{
            labels: string[];
            series: {
                category: string;
                values: number[];
            }[];
            variant?: "stacked" | "grouped" | undefined;
            xLabel?: string | undefined;
            yLabel?: string | undefined;
        }> | import("@inv/lang-core").SubComponentOf<{
            labels: string[];
            series: {
                category: string;
                values: number[];
            }[];
        }> | import("@inv/lang-core").SubComponentOf<{
            labels: string[];
            values: number[];
            variant?: "pie" | "donut" | undefined;
            appearance?: "circular" | "semiCircular" | undefined;
        }> | import("@inv/lang-core").SubComponentOf<{
            labels: string[];
            values: number[];
        }> | import("@inv/lang-core").SubComponentOf<{
            labels: string[];
            values: number[];
        }> | import("@inv/lang-core").SubComponentOf<{
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
        }> | import("@inv/lang-core").SubComponentOf<{
            columns: import("@inv/lang-core").SubComponentOf<{
                label: string;
                data: any;
                type?: "string" | "number" | "action" | undefined;
            }>[];
        }> | import("@inv/lang-core").SubComponentOf<{
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
        }> | import("@inv/lang-core").SubComponentOf<{
            items: import("@inv/lang-core").SubComponentOf<{
                title: string;
                details: string;
            }>[];
        }> | import("@inv/lang-core").SubComponentOf<{
            items: import("@inv/lang-core").SubComponentOf<{
                text: string;
            }>[];
        }>)[];
    }>, unknown>>>;
    isFoldable: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>>;
export {};
//# sourceMappingURL=index.d.ts.map