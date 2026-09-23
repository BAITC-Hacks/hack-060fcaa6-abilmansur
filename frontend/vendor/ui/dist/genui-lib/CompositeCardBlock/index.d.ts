import type { SubComponentOf } from "@inv/lang";
export * from "./schema";
export declare const CompositeCardBlock: import("@inv/lang").DefinedComponent<import("zod").ZodObject<{
    items: import("zod").ZodArray<import("zod/v4/core").$ZodType<SubComponentOf<{
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
    }>, unknown, import("zod/v4/core").$ZodTypeInternals<SubComponentOf<{
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
    }>, unknown>>>;
    layout: import("zod").ZodDefault<import("zod").ZodEnum<{
        grid: "grid";
        carousel: "carousel";
    }>>;
    responsive: import("zod").ZodDefault<import("zod").ZodBoolean>;
    action: import("zod").ZodOptional<import("zod").ZodUnion<readonly [import("zod").ZodObject<{
        type: import("zod").ZodLiteral<"open_url">;
        url: import("zod").ZodString;
    }, import("zod/v4/core").$strip>, import("zod").ZodObject<{
        type: import("zod").ZodLiteral<"continue_conversation">;
        context: import("zod").ZodOptional<import("zod").ZodString>;
    }, import("zod/v4/core").$strip>, import("zod").ZodObject<{
        type: import("zod").ZodString;
        params: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>>;
    }, import("zod/v4/core").$strip>]>>;
    gap: import("zod").ZodOptional<import("zod").ZodUnion<readonly [import("zod").ZodNumber, import("zod").ZodString]>>;
}, import("zod/v4/core").$strip>>;
//# sourceMappingURL=index.d.ts.map