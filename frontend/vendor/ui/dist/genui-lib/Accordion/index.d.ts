import { ComponentRenderProps, type SubComponentOf } from "@inv/lang";
import React from "react";
import { z } from "zod/v4";
export { AccordionItemSchema } from "./schema";
export declare const AccordionItem: import("@inv/lang").DefinedComponent<z.ZodObject<{
    value: z.ZodString;
    trigger: z.ZodString;
    content: z.ZodArray<z.ZodUnion<readonly [z.core.$ZodType<SubComponentOf<{
        text: string;
        size?: "small" | "large" | "default" | "small-heavy" | "large-heavy" | undefined;
    }>, unknown, z.core.$ZodTypeInternals<SubComponentOf<{
        text: string;
        size?: "small" | "large" | "default" | "small-heavy" | "large-heavy" | undefined;
    }>, unknown>>, z.core.$ZodType<SubComponentOf<{
        textMarkdown: string;
        variant?: "clear" | "card" | "sunk" | undefined;
    }>, unknown, z.core.$ZodTypeInternals<SubComponentOf<{
        textMarkdown: string;
        variant?: "clear" | "card" | "sunk" | undefined;
    }>, unknown>>, z.core.$ZodType<SubComponentOf<{
        title?: string | undefined;
        subtitle?: string | undefined;
    }>, unknown, z.core.$ZodTypeInternals<SubComponentOf<{
        title?: string | undefined;
        subtitle?: string | undefined;
    }>, unknown>>, z.core.$ZodType<SubComponentOf<{
        variant: "error" | "neutral" | "info" | "warning" | "success";
        title: string;
        description: string;
        visible: import("@inv/lang-core").StateField<boolean | undefined>;
    }>, unknown, z.core.$ZodTypeInternals<SubComponentOf<{
        variant: "error" | "neutral" | "info" | "warning" | "success";
        title: string;
        description: string;
        visible: import("@inv/lang-core").StateField<boolean | undefined>;
    }>, unknown>>, z.core.$ZodType<SubComponentOf<{
        variant?: "neutral" | "info" | "danger" | "warning" | "success" | undefined;
        title?: string | undefined;
        description?: string | undefined;
    }>, unknown, z.core.$ZodTypeInternals<SubComponentOf<{
        variant?: "neutral" | "info" | "danger" | "warning" | "success" | undefined;
        title?: string | undefined;
        description?: string | undefined;
    }>, unknown>>, z.core.$ZodType<SubComponentOf<{
        language: string;
        codeString: string;
    }>, unknown, z.core.$ZodTypeInternals<SubComponentOf<{
        language: string;
        codeString: string;
    }>, unknown>>, z.core.$ZodType<SubComponentOf<{
        alt: string;
        src?: string | undefined;
    }>, unknown, z.core.$ZodTypeInternals<SubComponentOf<{
        alt: string;
        src?: string | undefined;
    }>, unknown>>, z.core.$ZodType<SubComponentOf<{
        src: string;
        alt?: string | undefined;
    }>, unknown, z.core.$ZodTypeInternals<SubComponentOf<{
        src: string;
        alt?: string | undefined;
    }>, unknown>>, z.core.$ZodType<SubComponentOf<{
        images: {
            src: string;
            alt?: string | undefined;
            details?: string | undefined;
        }[];
    }>, unknown, z.core.$ZodTypeInternals<SubComponentOf<{
        images: {
            src: string;
            alt?: string | undefined;
            details?: string | undefined;
        }[];
    }>, unknown>>, z.core.$ZodType<SubComponentOf<{
        orientation?: "horizontal" | "vertical" | undefined;
        decorative?: boolean | undefined;
    }>, unknown, z.core.$ZodTypeInternals<SubComponentOf<{
        orientation?: "horizontal" | "vertical" | undefined;
        decorative?: boolean | undefined;
    }>, unknown>>, z.core.$ZodType<SubComponentOf<{
        labels: string[];
        series: {
            category: string;
            values: number[];
        }[];
        variant?: "stacked" | "grouped" | undefined;
        xLabel?: string | undefined;
        yLabel?: string | undefined;
    }>, unknown, z.core.$ZodTypeInternals<SubComponentOf<{
        labels: string[];
        series: {
            category: string;
            values: number[];
        }[];
        variant?: "stacked" | "grouped" | undefined;
        xLabel?: string | undefined;
        yLabel?: string | undefined;
    }>, unknown>>, z.core.$ZodType<SubComponentOf<{
        labels: string[];
        series: {
            category: string;
            values: number[];
        }[];
    }>, unknown, z.core.$ZodTypeInternals<SubComponentOf<{
        labels: string[];
        series: {
            category: string;
            values: number[];
        }[];
    }>, unknown>>, z.core.$ZodType<SubComponentOf<{
        labels: string[];
        values: number[];
        variant?: "pie" | "donut" | undefined;
        appearance?: "circular" | "semiCircular" | undefined;
    }>, unknown, z.core.$ZodTypeInternals<SubComponentOf<{
        labels: string[];
        values: number[];
        variant?: "pie" | "donut" | undefined;
        appearance?: "circular" | "semiCircular" | undefined;
    }>, unknown>>, z.core.$ZodType<SubComponentOf<{
        labels: string[];
        values: number[];
    }>, unknown, z.core.$ZodTypeInternals<SubComponentOf<{
        labels: string[];
        values: number[];
    }>, unknown>>, z.core.$ZodType<SubComponentOf<{
        labels: string[];
        values: number[];
    }>, unknown, z.core.$ZodTypeInternals<SubComponentOf<{
        labels: string[];
        values: number[];
    }>, unknown>>, z.core.$ZodType<SubComponentOf<{
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
    }>, unknown, z.core.$ZodTypeInternals<SubComponentOf<{
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
    }>, unknown>>, z.core.$ZodType<SubComponentOf<{
        labels: string[];
        series: {
            category: string;
            values: number[];
        }[];
        variant?: "step" | "linear" | "natural" | undefined;
        xLabel?: string | undefined;
        yLabel?: string | undefined;
        height?: number | undefined;
    }>, unknown, z.core.$ZodTypeInternals<SubComponentOf<{
        labels: string[];
        series: {
            category: string;
            values: number[];
        }[];
        variant?: "step" | "linear" | "natural" | undefined;
        xLabel?: string | undefined;
        yLabel?: string | undefined;
        height?: number | undefined;
    }>, unknown>>, z.core.$ZodType<SubComponentOf<{
        labels: string[];
        series: {
            category: string;
            values: number[];
        }[];
        variant?: "stacked" | "grouped" | undefined;
        xLabel?: string | undefined;
        yLabel?: string | undefined;
        height?: number | undefined;
    }>, unknown, z.core.$ZodTypeInternals<SubComponentOf<{
        labels: string[];
        series: {
            category: string;
            values: number[];
        }[];
        variant?: "stacked" | "grouped" | undefined;
        xLabel?: string | undefined;
        yLabel?: string | undefined;
        height?: number | undefined;
    }>, unknown>>, z.core.$ZodType<SubComponentOf<{
        labels: string[];
        series: {
            category: string;
            values: number[];
        }[];
        variant?: "step" | "linear" | "natural" | undefined;
        xLabel?: string | undefined;
        yLabel?: string | undefined;
        height?: number | undefined;
    }>, unknown, z.core.$ZodTypeInternals<SubComponentOf<{
        labels: string[];
        series: {
            category: string;
            values: number[];
        }[];
        variant?: "step" | "linear" | "natural" | undefined;
        xLabel?: string | undefined;
        yLabel?: string | undefined;
        height?: number | undefined;
    }>, unknown>>, z.core.$ZodType<SubComponentOf<{
        columns: SubComponentOf<{
            label: string;
            data: any;
            type?: "string" | "number" | "action" | undefined;
        }>[];
    }>, unknown, z.core.$ZodTypeInternals<SubComponentOf<{
        columns: SubComponentOf<{
            label: string;
            data: any;
            type?: "string" | "number" | "action" | undefined;
        }>[];
    }>, unknown>>, z.core.$ZodType<SubComponentOf<{
        tags: string[];
        size?: "sm" | "md" | "lg" | undefined;
    }>, unknown, z.core.$ZodTypeInternals<SubComponentOf<{
        tags: string[];
        size?: "sm" | "md" | "lg" | undefined;
    }>, unknown>>, z.core.$ZodType<SubComponentOf<{
        name: string;
        buttons: SubComponentOf<{
            buttons: SubComponentOf<{
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
        fields: SubComponentOf<{
            label: string;
            input: SubComponentOf<{
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
            }> | SubComponentOf<{
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
            }> | SubComponentOf<{
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
            }> | SubComponentOf<{
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
            }> | SubComponentOf<{
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
            }> | SubComponentOf<{
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
            }> | SubComponentOf<{
                name: string;
                items: SubComponentOf<{
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
            }> | SubComponentOf<{
                name: string;
                type: "single" | "multiple";
                items: SubComponentOf<{
                    value: string;
                    label: string;
                    icon?: SubComponentOf<{
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
            }> | SubComponentOf<{
                name: string;
                type: "single" | "multiple";
                items: SubComponentOf<{
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
    }>, unknown, z.core.$ZodTypeInternals<SubComponentOf<{
        name: string;
        buttons: SubComponentOf<{
            buttons: SubComponentOf<{
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
        fields: SubComponentOf<{
            label: string;
            input: SubComponentOf<{
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
            }> | SubComponentOf<{
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
            }> | SubComponentOf<{
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
            }> | SubComponentOf<{
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
            }> | SubComponentOf<{
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
            }> | SubComponentOf<{
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
            }> | SubComponentOf<{
                name: string;
                items: SubComponentOf<{
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
            }> | SubComponentOf<{
                name: string;
                type: "single" | "multiple";
                items: SubComponentOf<{
                    value: string;
                    label: string;
                    icon?: SubComponentOf<{
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
            }> | SubComponentOf<{
                name: string;
                type: "single" | "multiple";
                items: SubComponentOf<{
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
    }>, unknown>>, z.core.$ZodType<SubComponentOf<{
        buttons: SubComponentOf<{
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
    }>, unknown, z.core.$ZodTypeInternals<SubComponentOf<{
        buttons: SubComponentOf<{
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
    }>, unknown>>, z.core.$ZodType<SubComponentOf<{
        name: string;
        icon: SubComponentOf<{
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
    }>, unknown, z.core.$ZodTypeInternals<SubComponentOf<{
        name: string;
        icon: SubComponentOf<{
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
    }>, unknown>>, z.core.$ZodType<SubComponentOf<{
        items: SubComponentOf<{
            title: string;
            details: string;
        }>[];
    }>, unknown, z.core.$ZodTypeInternals<SubComponentOf<{
        items: SubComponentOf<{
            title: string;
            details: string;
        }>[];
    }>, unknown>>, z.core.$ZodType<SubComponentOf<{
        heading: string;
        description?: string | undefined;
    }>, unknown, z.core.$ZodTypeInternals<SubComponentOf<{
        heading: string;
        description?: string | undefined;
    }>, unknown>>, z.core.$ZodType<SubComponentOf<{
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
    }>, unknown, z.core.$ZodTypeInternals<SubComponentOf<{
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
    }>, unknown>>, z.core.$ZodType<SubComponentOf<{
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
    }>, unknown, z.core.$ZodTypeInternals<SubComponentOf<{
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
    }>, unknown>>, z.core.$ZodType<SubComponentOf<{
        items: SubComponentOf<{
            lhs: SubComponentOf<{
                icon: SubComponentOf<{
                    name: string;
                    category?: string | undefined;
                }>;
                iconVariant: "filled" | "neutral" | "info" | "danger" | "warning" | "success" | "inverted" | "soft";
                iconSize: "s" | "sm" | "md" | "lg" | "l" | "xs" | "m" | "xl";
                title: string;
                bold: boolean;
                layout: "horizontal" | "vertical";
                subtitle?: string | undefined;
            }> | SubComponentOf<{
                src: string;
                title: string;
                bold: boolean;
                layout: "horizontal" | "vertical";
                alt?: string | undefined;
                subtitle?: string | undefined;
                imageSize?: number | undefined;
            }>;
            id?: string | undefined;
            rhs?: SubComponentOf<{
                variant: "number" | "text";
                value: string;
                subtextVariant: "number" | "text" | "metric";
                size: "sm" | "md" | "lg" | "xs";
                subtext?: string | undefined;
            }> | SubComponentOf<{
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
    }>, unknown, z.core.$ZodTypeInternals<SubComponentOf<{
        items: SubComponentOf<{
            lhs: SubComponentOf<{
                icon: SubComponentOf<{
                    name: string;
                    category?: string | undefined;
                }>;
                iconVariant: "filled" | "neutral" | "info" | "danger" | "warning" | "success" | "inverted" | "soft";
                iconSize: "s" | "sm" | "md" | "lg" | "l" | "xs" | "m" | "xl";
                title: string;
                bold: boolean;
                layout: "horizontal" | "vertical";
                subtitle?: string | undefined;
            }> | SubComponentOf<{
                src: string;
                title: string;
                bold: boolean;
                layout: "horizontal" | "vertical";
                alt?: string | undefined;
                subtitle?: string | undefined;
                imageSize?: number | undefined;
            }>;
            id?: string | undefined;
            rhs?: SubComponentOf<{
                variant: "number" | "text";
                value: string;
                subtextVariant: "number" | "text" | "metric";
                size: "sm" | "md" | "lg" | "xs";
                subtext?: string | undefined;
            }> | SubComponentOf<{
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
    }>, unknown>>, z.core.$ZodType<SubComponentOf<{
        items: SubComponentOf<{
            top: SubComponentOf<{
                variant: "number" | "text";
                value: string;
                subtextVariant: "number" | "text" | "metric";
                size: "sm" | "md" | "lg" | "xs";
                subtext?: string | undefined;
            }> | SubComponentOf<{
                icon: SubComponentOf<{
                    name: string;
                    category?: string | undefined;
                }>;
                iconVariant: "filled" | "neutral" | "info" | "danger" | "warning" | "success" | "inverted" | "soft";
                iconSize: "s" | "sm" | "md" | "lg" | "l" | "xs" | "m" | "xl";
                title: string;
                bold: boolean;
                layout: "horizontal" | "vertical";
                subtitle?: string | undefined;
            }> | SubComponentOf<{
                src: string;
                title: string;
                bold: boolean;
                layout: "horizontal" | "vertical";
                alt?: string | undefined;
                subtitle?: string | undefined;
                imageSize?: number | undefined;
            }>;
            id?: string | undefined;
            bottom?: SubComponentOf<{
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
    }>, unknown, z.core.$ZodTypeInternals<SubComponentOf<{
        items: SubComponentOf<{
            top: SubComponentOf<{
                variant: "number" | "text";
                value: string;
                subtextVariant: "number" | "text" | "metric";
                size: "sm" | "md" | "lg" | "xs";
                subtext?: string | undefined;
            }> | SubComponentOf<{
                icon: SubComponentOf<{
                    name: string;
                    category?: string | undefined;
                }>;
                iconVariant: "filled" | "neutral" | "info" | "danger" | "warning" | "success" | "inverted" | "soft";
                iconSize: "s" | "sm" | "md" | "lg" | "l" | "xs" | "m" | "xl";
                title: string;
                bold: boolean;
                layout: "horizontal" | "vertical";
                subtitle?: string | undefined;
            }> | SubComponentOf<{
                src: string;
                title: string;
                bold: boolean;
                layout: "horizontal" | "vertical";
                alt?: string | undefined;
                subtitle?: string | undefined;
                imageSize?: number | undefined;
            }>;
            id?: string | undefined;
            bottom?: SubComponentOf<{
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
    }>, unknown>>, z.core.$ZodType<SubComponentOf<{
        items: SubComponentOf<{
            title: string | SubComponentOf<{
                text: string;
                icon?: SubComponentOf<{
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
    }>, unknown, z.core.$ZodTypeInternals<SubComponentOf<{
        items: SubComponentOf<{
            title: string | SubComponentOf<{
                text: string;
                icon?: SubComponentOf<{
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
    }>, unknown>>, z.core.$ZodType<SubComponentOf<{
        items: SubComponentOf<{
            body: (SubComponentOf<{
                alt: string;
                src?: string | undefined;
            }> | SubComponentOf<{
                variant: "number" | "text";
                value: string;
                subtextVariant: "number" | "text" | "metric";
                size: "sm" | "md" | "lg" | "xs";
                subtext?: string | undefined;
            }> | SubComponentOf<{
                variant: "number" | "text";
                value: string;
                subtextVariant: "number" | "text" | "metric";
                size: "sm" | "md" | "lg" | "xs";
                subtext?: string | undefined;
            }> | SubComponentOf<{
                value: string;
                subtext?: string | undefined;
                trend?: {
                    direction: "up" | "down";
                    value: number;
                } | undefined;
            }> | SubComponentOf<{
                icon: SubComponentOf<{
                    name: string;
                    category?: string | undefined;
                }>;
                iconVariant: "filled" | "neutral" | "info" | "danger" | "warning" | "success" | "inverted" | "soft";
                iconSize: "s" | "sm" | "md" | "lg" | "l" | "xs" | "m" | "xl";
                title: string;
                bold: boolean;
                layout: "horizontal" | "vertical";
                subtitle?: string | undefined;
            }> | SubComponentOf<{
                labels: string[];
                series: {
                    category: string;
                    values: number[];
                }[];
                variant?: "step" | "linear" | "natural" | undefined;
                xLabel?: string | undefined;
                yLabel?: string | undefined;
                height?: number | undefined;
            }> | SubComponentOf<{
                labels: string[];
                series: {
                    category: string;
                    values: number[];
                }[];
                variant?: "stacked" | "grouped" | undefined;
                xLabel?: string | undefined;
                yLabel?: string | undefined;
                height?: number | undefined;
            }> | SubComponentOf<{
                labels: string[];
                series: {
                    category: string;
                    values: number[];
                }[];
                variant?: "step" | "linear" | "natural" | undefined;
                xLabel?: string | undefined;
                yLabel?: string | undefined;
                height?: number | undefined;
            }> | SubComponentOf<{
                items: SubComponentOf<{
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
            }> | SubComponentOf<{
                tags: string[];
                size?: "sm" | "md" | "lg" | undefined;
            }> | SubComponentOf<{
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
            header?: SubComponentOf<{
                alt: string;
                src?: string | undefined;
            }> | SubComponentOf<{
                variant: "number" | "text";
                value: string;
                subtextVariant: "number" | "text" | "metric";
                size: "sm" | "md" | "lg" | "xs";
                subtext?: string | undefined;
            }> | SubComponentOf<{
                icon: SubComponentOf<{
                    name: string;
                    category?: string | undefined;
                }>;
                iconVariant: "filled" | "neutral" | "info" | "danger" | "warning" | "success" | "inverted" | "soft";
                iconSize: "s" | "sm" | "md" | "lg" | "l" | "xs" | "m" | "xl";
                title: string;
                bold: boolean;
                layout: "horizontal" | "vertical";
                subtitle?: string | undefined;
            }> | SubComponentOf<{
                src: string;
                title: string;
                bold: boolean;
                layout: "horizontal" | "vertical";
                alt?: string | undefined;
                subtitle?: string | undefined;
                imageSize?: number | undefined;
            }> | SubComponentOf<{
                src: string;
                title: string;
                bold: boolean;
                alt?: string | undefined;
                subtitle?: string | undefined;
            }> | undefined;
            footer?: {
                price?: SubComponentOf<{
                    variant: "number" | "text";
                    value: string;
                    subtextVariant: "number" | "text" | "metric";
                    size: "sm" | "md" | "lg" | "xs";
                    subtext?: string | undefined;
                }> | SubComponentOf<{
                    value: string;
                    subtext?: string | undefined;
                    previousValue?: string | undefined;
                    trend?: {
                        direction: "up" | "down";
                        value: number;
                    } | undefined;
                }> | undefined;
                button?: SubComponentOf<{
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
    }>, unknown, z.core.$ZodTypeInternals<SubComponentOf<{
        items: SubComponentOf<{
            body: (SubComponentOf<{
                alt: string;
                src?: string | undefined;
            }> | SubComponentOf<{
                variant: "number" | "text";
                value: string;
                subtextVariant: "number" | "text" | "metric";
                size: "sm" | "md" | "lg" | "xs";
                subtext?: string | undefined;
            }> | SubComponentOf<{
                variant: "number" | "text";
                value: string;
                subtextVariant: "number" | "text" | "metric";
                size: "sm" | "md" | "lg" | "xs";
                subtext?: string | undefined;
            }> | SubComponentOf<{
                value: string;
                subtext?: string | undefined;
                trend?: {
                    direction: "up" | "down";
                    value: number;
                } | undefined;
            }> | SubComponentOf<{
                icon: SubComponentOf<{
                    name: string;
                    category?: string | undefined;
                }>;
                iconVariant: "filled" | "neutral" | "info" | "danger" | "warning" | "success" | "inverted" | "soft";
                iconSize: "s" | "sm" | "md" | "lg" | "l" | "xs" | "m" | "xl";
                title: string;
                bold: boolean;
                layout: "horizontal" | "vertical";
                subtitle?: string | undefined;
            }> | SubComponentOf<{
                labels: string[];
                series: {
                    category: string;
                    values: number[];
                }[];
                variant?: "step" | "linear" | "natural" | undefined;
                xLabel?: string | undefined;
                yLabel?: string | undefined;
                height?: number | undefined;
            }> | SubComponentOf<{
                labels: string[];
                series: {
                    category: string;
                    values: number[];
                }[];
                variant?: "stacked" | "grouped" | undefined;
                xLabel?: string | undefined;
                yLabel?: string | undefined;
                height?: number | undefined;
            }> | SubComponentOf<{
                labels: string[];
                series: {
                    category: string;
                    values: number[];
                }[];
                variant?: "step" | "linear" | "natural" | undefined;
                xLabel?: string | undefined;
                yLabel?: string | undefined;
                height?: number | undefined;
            }> | SubComponentOf<{
                items: SubComponentOf<{
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
            }> | SubComponentOf<{
                tags: string[];
                size?: "sm" | "md" | "lg" | undefined;
            }> | SubComponentOf<{
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
            header?: SubComponentOf<{
                alt: string;
                src?: string | undefined;
            }> | SubComponentOf<{
                variant: "number" | "text";
                value: string;
                subtextVariant: "number" | "text" | "metric";
                size: "sm" | "md" | "lg" | "xs";
                subtext?: string | undefined;
            }> | SubComponentOf<{
                icon: SubComponentOf<{
                    name: string;
                    category?: string | undefined;
                }>;
                iconVariant: "filled" | "neutral" | "info" | "danger" | "warning" | "success" | "inverted" | "soft";
                iconSize: "s" | "sm" | "md" | "lg" | "l" | "xs" | "m" | "xl";
                title: string;
                bold: boolean;
                layout: "horizontal" | "vertical";
                subtitle?: string | undefined;
            }> | SubComponentOf<{
                src: string;
                title: string;
                bold: boolean;
                layout: "horizontal" | "vertical";
                alt?: string | undefined;
                subtitle?: string | undefined;
                imageSize?: number | undefined;
            }> | SubComponentOf<{
                src: string;
                title: string;
                bold: boolean;
                alt?: string | undefined;
                subtitle?: string | undefined;
            }> | undefined;
            footer?: {
                price?: SubComponentOf<{
                    variant: "number" | "text";
                    value: string;
                    subtextVariant: "number" | "text" | "metric";
                    size: "sm" | "md" | "lg" | "xs";
                    subtext?: string | undefined;
                }> | SubComponentOf<{
                    value: string;
                    subtext?: string | undefined;
                    previousValue?: string | undefined;
                    trend?: {
                        direction: "up" | "down";
                        value: number;
                    } | undefined;
                }> | undefined;
                button?: SubComponentOf<{
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
    }>, unknown>>, z.core.$ZodType<SubComponentOf<{
        items: SubComponentOf<{
            body: SubComponentOf<{
                variant: "number" | "text";
                value: string;
                subtextVariant: "number" | "text" | "metric";
                size: "sm" | "md" | "lg" | "xs";
                subtext?: string | undefined;
            }>;
            id?: string | undefined;
            bgImageSrc?: string | undefined;
            tag?: SubComponentOf<{
                text: string;
                icon?: SubComponentOf<{
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
    }>, unknown, z.core.$ZodTypeInternals<SubComponentOf<{
        items: SubComponentOf<{
            body: SubComponentOf<{
                variant: "number" | "text";
                value: string;
                subtextVariant: "number" | "text" | "metric";
                size: "sm" | "md" | "lg" | "xs";
                subtext?: string | undefined;
            }>;
            id?: string | undefined;
            bgImageSrc?: string | undefined;
            tag?: SubComponentOf<{
                text: string;
                icon?: SubComponentOf<{
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
}, z.core.$strip>>;
type AccordionRenderProps = ComponentRenderProps<{
    items: SubComponentOf<{
        value: string;
        trigger: string;
        content: unknown[];
    }>[];
}>;
/** Shared renderer — also used by the chat library's Accordion variant (wider content union). */
export declare const AccordionRenderer: ({ props, renderNode }: AccordionRenderProps) => React.JSX.Element | null;
export declare const Accordion: import("@inv/lang").DefinedComponent<z.ZodObject<{
    items: z.ZodArray<z.core.$ZodType<SubComponentOf<{
        value: string;
        trigger: string;
        content: (SubComponentOf<{
            alt: string;
            src?: string | undefined;
        }> | SubComponentOf<{
            labels: string[];
            series: {
                category: string;
                values: number[];
            }[];
            variant?: "step" | "linear" | "natural" | undefined;
            xLabel?: string | undefined;
            yLabel?: string | undefined;
            height?: number | undefined;
        }> | SubComponentOf<{
            labels: string[];
            series: {
                category: string;
                values: number[];
            }[];
            variant?: "stacked" | "grouped" | undefined;
            xLabel?: string | undefined;
            yLabel?: string | undefined;
            height?: number | undefined;
        }> | SubComponentOf<{
            labels: string[];
            series: {
                category: string;
                values: number[];
            }[];
            variant?: "step" | "linear" | "natural" | undefined;
            xLabel?: string | undefined;
            yLabel?: string | undefined;
            height?: number | undefined;
        }> | SubComponentOf<{
            tags: string[];
            size?: "sm" | "md" | "lg" | undefined;
        }> | SubComponentOf<{
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
        }> | SubComponentOf<{
            buttons: SubComponentOf<{
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
        }> | SubComponentOf<{
            text: string;
            size?: "small" | "large" | "default" | "small-heavy" | "large-heavy" | undefined;
        }> | SubComponentOf<{
            textMarkdown: string;
            variant?: "clear" | "card" | "sunk" | undefined;
        }> | SubComponentOf<{
            title?: string | undefined;
            subtitle?: string | undefined;
        }> | SubComponentOf<{
            variant: "error" | "neutral" | "info" | "warning" | "success";
            title: string;
            description: string;
            visible: import("@inv/lang-core").StateField<boolean | undefined>;
        }> | SubComponentOf<{
            variant?: "neutral" | "info" | "danger" | "warning" | "success" | undefined;
            title?: string | undefined;
            description?: string | undefined;
        }> | SubComponentOf<{
            language: string;
            codeString: string;
        }> | SubComponentOf<{
            src: string;
            alt?: string | undefined;
        }> | SubComponentOf<{
            images: {
                src: string;
                alt?: string | undefined;
                details?: string | undefined;
            }[];
        }> | SubComponentOf<{
            orientation?: "horizontal" | "vertical" | undefined;
            decorative?: boolean | undefined;
        }> | SubComponentOf<{
            labels: string[];
            series: {
                category: string;
                values: number[];
            }[];
            variant?: "stacked" | "grouped" | undefined;
            xLabel?: string | undefined;
            yLabel?: string | undefined;
        }> | SubComponentOf<{
            labels: string[];
            series: {
                category: string;
                values: number[];
            }[];
        }> | SubComponentOf<{
            labels: string[];
            values: number[];
            variant?: "pie" | "donut" | undefined;
            appearance?: "circular" | "semiCircular" | undefined;
        }> | SubComponentOf<{
            labels: string[];
            values: number[];
        }> | SubComponentOf<{
            labels: string[];
            values: number[];
        }> | SubComponentOf<{
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
        }> | SubComponentOf<{
            columns: SubComponentOf<{
                label: string;
                data: any;
                type?: "string" | "number" | "action" | undefined;
            }>[];
        }> | SubComponentOf<{
            name: string;
            buttons: SubComponentOf<{
                buttons: SubComponentOf<{
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
            fields: SubComponentOf<{
                label: string;
                input: SubComponentOf<{
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
                }> | SubComponentOf<{
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
                }> | SubComponentOf<{
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
                }> | SubComponentOf<{
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
                }> | SubComponentOf<{
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
                }> | SubComponentOf<{
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
                }> | SubComponentOf<{
                    name: string;
                    items: SubComponentOf<{
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
                }> | SubComponentOf<{
                    name: string;
                    type: "single" | "multiple";
                    items: SubComponentOf<{
                        value: string;
                        label: string;
                        icon?: SubComponentOf<{
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
                }> | SubComponentOf<{
                    name: string;
                    type: "single" | "multiple";
                    items: SubComponentOf<{
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
        }> | SubComponentOf<{
            items: SubComponentOf<{
                title: string;
                details: string;
            }>[];
        }> | SubComponentOf<{
            name: string;
            icon: SubComponentOf<{
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
        }> | SubComponentOf<{
            heading: string;
            description?: string | undefined;
        }> | SubComponentOf<{
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
        }> | SubComponentOf<{
            items: SubComponentOf<{
                lhs: SubComponentOf<{
                    icon: SubComponentOf<{
                        name: string;
                        category?: string | undefined;
                    }>;
                    iconVariant: "filled" | "neutral" | "info" | "danger" | "warning" | "success" | "inverted" | "soft";
                    iconSize: "s" | "sm" | "md" | "lg" | "l" | "xs" | "m" | "xl";
                    title: string;
                    bold: boolean;
                    layout: "horizontal" | "vertical";
                    subtitle?: string | undefined;
                }> | SubComponentOf<{
                    src: string;
                    title: string;
                    bold: boolean;
                    layout: "horizontal" | "vertical";
                    alt?: string | undefined;
                    subtitle?: string | undefined;
                    imageSize?: number | undefined;
                }>;
                id?: string | undefined;
                rhs?: SubComponentOf<{
                    variant: "number" | "text";
                    value: string;
                    subtextVariant: "number" | "text" | "metric";
                    size: "sm" | "md" | "lg" | "xs";
                    subtext?: string | undefined;
                }> | SubComponentOf<{
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
        }> | SubComponentOf<{
            items: SubComponentOf<{
                top: SubComponentOf<{
                    variant: "number" | "text";
                    value: string;
                    subtextVariant: "number" | "text" | "metric";
                    size: "sm" | "md" | "lg" | "xs";
                    subtext?: string | undefined;
                }> | SubComponentOf<{
                    icon: SubComponentOf<{
                        name: string;
                        category?: string | undefined;
                    }>;
                    iconVariant: "filled" | "neutral" | "info" | "danger" | "warning" | "success" | "inverted" | "soft";
                    iconSize: "s" | "sm" | "md" | "lg" | "l" | "xs" | "m" | "xl";
                    title: string;
                    bold: boolean;
                    layout: "horizontal" | "vertical";
                    subtitle?: string | undefined;
                }> | SubComponentOf<{
                    src: string;
                    title: string;
                    bold: boolean;
                    layout: "horizontal" | "vertical";
                    alt?: string | undefined;
                    subtitle?: string | undefined;
                    imageSize?: number | undefined;
                }>;
                id?: string | undefined;
                bottom?: SubComponentOf<{
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
        }> | SubComponentOf<{
            items: SubComponentOf<{
                title: string | SubComponentOf<{
                    text: string;
                    icon?: SubComponentOf<{
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
        }> | SubComponentOf<{
            items: SubComponentOf<{
                body: (SubComponentOf<{
                    alt: string;
                    src?: string | undefined;
                }> | SubComponentOf<{
                    variant: "number" | "text";
                    value: string;
                    subtextVariant: "number" | "text" | "metric";
                    size: "sm" | "md" | "lg" | "xs";
                    subtext?: string | undefined;
                }> | SubComponentOf<{
                    variant: "number" | "text";
                    value: string;
                    subtextVariant: "number" | "text" | "metric";
                    size: "sm" | "md" | "lg" | "xs";
                    subtext?: string | undefined;
                }> | SubComponentOf<{
                    value: string;
                    subtext?: string | undefined;
                    trend?: {
                        direction: "up" | "down";
                        value: number;
                    } | undefined;
                }> | SubComponentOf<{
                    icon: SubComponentOf<{
                        name: string;
                        category?: string | undefined;
                    }>;
                    iconVariant: "filled" | "neutral" | "info" | "danger" | "warning" | "success" | "inverted" | "soft";
                    iconSize: "s" | "sm" | "md" | "lg" | "l" | "xs" | "m" | "xl";
                    title: string;
                    bold: boolean;
                    layout: "horizontal" | "vertical";
                    subtitle?: string | undefined;
                }> | SubComponentOf<{
                    labels: string[];
                    series: {
                        category: string;
                        values: number[];
                    }[];
                    variant?: "step" | "linear" | "natural" | undefined;
                    xLabel?: string | undefined;
                    yLabel?: string | undefined;
                    height?: number | undefined;
                }> | SubComponentOf<{
                    labels: string[];
                    series: {
                        category: string;
                        values: number[];
                    }[];
                    variant?: "stacked" | "grouped" | undefined;
                    xLabel?: string | undefined;
                    yLabel?: string | undefined;
                    height?: number | undefined;
                }> | SubComponentOf<{
                    labels: string[];
                    series: {
                        category: string;
                        values: number[];
                    }[];
                    variant?: "step" | "linear" | "natural" | undefined;
                    xLabel?: string | undefined;
                    yLabel?: string | undefined;
                    height?: number | undefined;
                }> | SubComponentOf<{
                    items: SubComponentOf<{
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
                }> | SubComponentOf<{
                    tags: string[];
                    size?: "sm" | "md" | "lg" | undefined;
                }> | SubComponentOf<{
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
                header?: SubComponentOf<{
                    alt: string;
                    src?: string | undefined;
                }> | SubComponentOf<{
                    variant: "number" | "text";
                    value: string;
                    subtextVariant: "number" | "text" | "metric";
                    size: "sm" | "md" | "lg" | "xs";
                    subtext?: string | undefined;
                }> | SubComponentOf<{
                    icon: SubComponentOf<{
                        name: string;
                        category?: string | undefined;
                    }>;
                    iconVariant: "filled" | "neutral" | "info" | "danger" | "warning" | "success" | "inverted" | "soft";
                    iconSize: "s" | "sm" | "md" | "lg" | "l" | "xs" | "m" | "xl";
                    title: string;
                    bold: boolean;
                    layout: "horizontal" | "vertical";
                    subtitle?: string | undefined;
                }> | SubComponentOf<{
                    src: string;
                    title: string;
                    bold: boolean;
                    layout: "horizontal" | "vertical";
                    alt?: string | undefined;
                    subtitle?: string | undefined;
                    imageSize?: number | undefined;
                }> | SubComponentOf<{
                    src: string;
                    title: string;
                    bold: boolean;
                    alt?: string | undefined;
                    subtitle?: string | undefined;
                }> | undefined;
                footer?: {
                    price?: SubComponentOf<{
                        variant: "number" | "text";
                        value: string;
                        subtextVariant: "number" | "text" | "metric";
                        size: "sm" | "md" | "lg" | "xs";
                        subtext?: string | undefined;
                    }> | SubComponentOf<{
                        value: string;
                        subtext?: string | undefined;
                        previousValue?: string | undefined;
                        trend?: {
                            direction: "up" | "down";
                            value: number;
                        } | undefined;
                    }> | undefined;
                    button?: SubComponentOf<{
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
        }> | SubComponentOf<{
            items: SubComponentOf<{
                body: SubComponentOf<{
                    variant: "number" | "text";
                    value: string;
                    subtextVariant: "number" | "text" | "metric";
                    size: "sm" | "md" | "lg" | "xs";
                    subtext?: string | undefined;
                }>;
                id?: string | undefined;
                bgImageSrc?: string | undefined;
                tag?: SubComponentOf<{
                    text: string;
                    icon?: SubComponentOf<{
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
        }>)[];
    }>, unknown, z.core.$ZodTypeInternals<SubComponentOf<{
        value: string;
        trigger: string;
        content: (SubComponentOf<{
            alt: string;
            src?: string | undefined;
        }> | SubComponentOf<{
            labels: string[];
            series: {
                category: string;
                values: number[];
            }[];
            variant?: "step" | "linear" | "natural" | undefined;
            xLabel?: string | undefined;
            yLabel?: string | undefined;
            height?: number | undefined;
        }> | SubComponentOf<{
            labels: string[];
            series: {
                category: string;
                values: number[];
            }[];
            variant?: "stacked" | "grouped" | undefined;
            xLabel?: string | undefined;
            yLabel?: string | undefined;
            height?: number | undefined;
        }> | SubComponentOf<{
            labels: string[];
            series: {
                category: string;
                values: number[];
            }[];
            variant?: "step" | "linear" | "natural" | undefined;
            xLabel?: string | undefined;
            yLabel?: string | undefined;
            height?: number | undefined;
        }> | SubComponentOf<{
            tags: string[];
            size?: "sm" | "md" | "lg" | undefined;
        }> | SubComponentOf<{
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
        }> | SubComponentOf<{
            buttons: SubComponentOf<{
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
        }> | SubComponentOf<{
            text: string;
            size?: "small" | "large" | "default" | "small-heavy" | "large-heavy" | undefined;
        }> | SubComponentOf<{
            textMarkdown: string;
            variant?: "clear" | "card" | "sunk" | undefined;
        }> | SubComponentOf<{
            title?: string | undefined;
            subtitle?: string | undefined;
        }> | SubComponentOf<{
            variant: "error" | "neutral" | "info" | "warning" | "success";
            title: string;
            description: string;
            visible: import("@inv/lang-core").StateField<boolean | undefined>;
        }> | SubComponentOf<{
            variant?: "neutral" | "info" | "danger" | "warning" | "success" | undefined;
            title?: string | undefined;
            description?: string | undefined;
        }> | SubComponentOf<{
            language: string;
            codeString: string;
        }> | SubComponentOf<{
            src: string;
            alt?: string | undefined;
        }> | SubComponentOf<{
            images: {
                src: string;
                alt?: string | undefined;
                details?: string | undefined;
            }[];
        }> | SubComponentOf<{
            orientation?: "horizontal" | "vertical" | undefined;
            decorative?: boolean | undefined;
        }> | SubComponentOf<{
            labels: string[];
            series: {
                category: string;
                values: number[];
            }[];
            variant?: "stacked" | "grouped" | undefined;
            xLabel?: string | undefined;
            yLabel?: string | undefined;
        }> | SubComponentOf<{
            labels: string[];
            series: {
                category: string;
                values: number[];
            }[];
        }> | SubComponentOf<{
            labels: string[];
            values: number[];
            variant?: "pie" | "donut" | undefined;
            appearance?: "circular" | "semiCircular" | undefined;
        }> | SubComponentOf<{
            labels: string[];
            values: number[];
        }> | SubComponentOf<{
            labels: string[];
            values: number[];
        }> | SubComponentOf<{
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
        }> | SubComponentOf<{
            columns: SubComponentOf<{
                label: string;
                data: any;
                type?: "string" | "number" | "action" | undefined;
            }>[];
        }> | SubComponentOf<{
            name: string;
            buttons: SubComponentOf<{
                buttons: SubComponentOf<{
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
            fields: SubComponentOf<{
                label: string;
                input: SubComponentOf<{
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
                }> | SubComponentOf<{
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
                }> | SubComponentOf<{
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
                }> | SubComponentOf<{
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
                }> | SubComponentOf<{
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
                }> | SubComponentOf<{
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
                }> | SubComponentOf<{
                    name: string;
                    items: SubComponentOf<{
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
                }> | SubComponentOf<{
                    name: string;
                    type: "single" | "multiple";
                    items: SubComponentOf<{
                        value: string;
                        label: string;
                        icon?: SubComponentOf<{
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
                }> | SubComponentOf<{
                    name: string;
                    type: "single" | "multiple";
                    items: SubComponentOf<{
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
        }> | SubComponentOf<{
            items: SubComponentOf<{
                title: string;
                details: string;
            }>[];
        }> | SubComponentOf<{
            name: string;
            icon: SubComponentOf<{
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
        }> | SubComponentOf<{
            heading: string;
            description?: string | undefined;
        }> | SubComponentOf<{
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
        }> | SubComponentOf<{
            items: SubComponentOf<{
                lhs: SubComponentOf<{
                    icon: SubComponentOf<{
                        name: string;
                        category?: string | undefined;
                    }>;
                    iconVariant: "filled" | "neutral" | "info" | "danger" | "warning" | "success" | "inverted" | "soft";
                    iconSize: "s" | "sm" | "md" | "lg" | "l" | "xs" | "m" | "xl";
                    title: string;
                    bold: boolean;
                    layout: "horizontal" | "vertical";
                    subtitle?: string | undefined;
                }> | SubComponentOf<{
                    src: string;
                    title: string;
                    bold: boolean;
                    layout: "horizontal" | "vertical";
                    alt?: string | undefined;
                    subtitle?: string | undefined;
                    imageSize?: number | undefined;
                }>;
                id?: string | undefined;
                rhs?: SubComponentOf<{
                    variant: "number" | "text";
                    value: string;
                    subtextVariant: "number" | "text" | "metric";
                    size: "sm" | "md" | "lg" | "xs";
                    subtext?: string | undefined;
                }> | SubComponentOf<{
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
        }> | SubComponentOf<{
            items: SubComponentOf<{
                top: SubComponentOf<{
                    variant: "number" | "text";
                    value: string;
                    subtextVariant: "number" | "text" | "metric";
                    size: "sm" | "md" | "lg" | "xs";
                    subtext?: string | undefined;
                }> | SubComponentOf<{
                    icon: SubComponentOf<{
                        name: string;
                        category?: string | undefined;
                    }>;
                    iconVariant: "filled" | "neutral" | "info" | "danger" | "warning" | "success" | "inverted" | "soft";
                    iconSize: "s" | "sm" | "md" | "lg" | "l" | "xs" | "m" | "xl";
                    title: string;
                    bold: boolean;
                    layout: "horizontal" | "vertical";
                    subtitle?: string | undefined;
                }> | SubComponentOf<{
                    src: string;
                    title: string;
                    bold: boolean;
                    layout: "horizontal" | "vertical";
                    alt?: string | undefined;
                    subtitle?: string | undefined;
                    imageSize?: number | undefined;
                }>;
                id?: string | undefined;
                bottom?: SubComponentOf<{
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
        }> | SubComponentOf<{
            items: SubComponentOf<{
                title: string | SubComponentOf<{
                    text: string;
                    icon?: SubComponentOf<{
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
        }> | SubComponentOf<{
            items: SubComponentOf<{
                body: (SubComponentOf<{
                    alt: string;
                    src?: string | undefined;
                }> | SubComponentOf<{
                    variant: "number" | "text";
                    value: string;
                    subtextVariant: "number" | "text" | "metric";
                    size: "sm" | "md" | "lg" | "xs";
                    subtext?: string | undefined;
                }> | SubComponentOf<{
                    variant: "number" | "text";
                    value: string;
                    subtextVariant: "number" | "text" | "metric";
                    size: "sm" | "md" | "lg" | "xs";
                    subtext?: string | undefined;
                }> | SubComponentOf<{
                    value: string;
                    subtext?: string | undefined;
                    trend?: {
                        direction: "up" | "down";
                        value: number;
                    } | undefined;
                }> | SubComponentOf<{
                    icon: SubComponentOf<{
                        name: string;
                        category?: string | undefined;
                    }>;
                    iconVariant: "filled" | "neutral" | "info" | "danger" | "warning" | "success" | "inverted" | "soft";
                    iconSize: "s" | "sm" | "md" | "lg" | "l" | "xs" | "m" | "xl";
                    title: string;
                    bold: boolean;
                    layout: "horizontal" | "vertical";
                    subtitle?: string | undefined;
                }> | SubComponentOf<{
                    labels: string[];
                    series: {
                        category: string;
                        values: number[];
                    }[];
                    variant?: "step" | "linear" | "natural" | undefined;
                    xLabel?: string | undefined;
                    yLabel?: string | undefined;
                    height?: number | undefined;
                }> | SubComponentOf<{
                    labels: string[];
                    series: {
                        category: string;
                        values: number[];
                    }[];
                    variant?: "stacked" | "grouped" | undefined;
                    xLabel?: string | undefined;
                    yLabel?: string | undefined;
                    height?: number | undefined;
                }> | SubComponentOf<{
                    labels: string[];
                    series: {
                        category: string;
                        values: number[];
                    }[];
                    variant?: "step" | "linear" | "natural" | undefined;
                    xLabel?: string | undefined;
                    yLabel?: string | undefined;
                    height?: number | undefined;
                }> | SubComponentOf<{
                    items: SubComponentOf<{
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
                }> | SubComponentOf<{
                    tags: string[];
                    size?: "sm" | "md" | "lg" | undefined;
                }> | SubComponentOf<{
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
                header?: SubComponentOf<{
                    alt: string;
                    src?: string | undefined;
                }> | SubComponentOf<{
                    variant: "number" | "text";
                    value: string;
                    subtextVariant: "number" | "text" | "metric";
                    size: "sm" | "md" | "lg" | "xs";
                    subtext?: string | undefined;
                }> | SubComponentOf<{
                    icon: SubComponentOf<{
                        name: string;
                        category?: string | undefined;
                    }>;
                    iconVariant: "filled" | "neutral" | "info" | "danger" | "warning" | "success" | "inverted" | "soft";
                    iconSize: "s" | "sm" | "md" | "lg" | "l" | "xs" | "m" | "xl";
                    title: string;
                    bold: boolean;
                    layout: "horizontal" | "vertical";
                    subtitle?: string | undefined;
                }> | SubComponentOf<{
                    src: string;
                    title: string;
                    bold: boolean;
                    layout: "horizontal" | "vertical";
                    alt?: string | undefined;
                    subtitle?: string | undefined;
                    imageSize?: number | undefined;
                }> | SubComponentOf<{
                    src: string;
                    title: string;
                    bold: boolean;
                    alt?: string | undefined;
                    subtitle?: string | undefined;
                }> | undefined;
                footer?: {
                    price?: SubComponentOf<{
                        variant: "number" | "text";
                        value: string;
                        subtextVariant: "number" | "text" | "metric";
                        size: "sm" | "md" | "lg" | "xs";
                        subtext?: string | undefined;
                    }> | SubComponentOf<{
                        value: string;
                        subtext?: string | undefined;
                        previousValue?: string | undefined;
                        trend?: {
                            direction: "up" | "down";
                            value: number;
                        } | undefined;
                    }> | undefined;
                    button?: SubComponentOf<{
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
        }> | SubComponentOf<{
            items: SubComponentOf<{
                body: SubComponentOf<{
                    variant: "number" | "text";
                    value: string;
                    subtextVariant: "number" | "text" | "metric";
                    size: "sm" | "md" | "lg" | "xs";
                    subtext?: string | undefined;
                }>;
                id?: string | undefined;
                bgImageSrc?: string | undefined;
                tag?: SubComponentOf<{
                    text: string;
                    icon?: SubComponentOf<{
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
        }>)[];
    }>, unknown>>>;
}, z.core.$strip>>;
//# sourceMappingURL=index.d.ts.map