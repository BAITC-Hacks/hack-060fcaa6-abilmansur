import { z } from "zod/v4";
export declare const CompositeCardBodyItemSchema: z.ZodUnion<readonly [z.core.$ZodType<import("@inv/lang-core").SubComponentOf<{
    variant: "number" | "text";
    value: string;
    subtextVariant: "number" | "text" | "metric";
    size: "sm" | "md" | "lg" | "xs";
    subtext?: string | undefined;
}>, unknown, z.core.$ZodTypeInternals<import("@inv/lang-core").SubComponentOf<{
    variant: "number" | "text";
    value: string;
    subtextVariant: "number" | "text" | "metric";
    size: "sm" | "md" | "lg" | "xs";
    subtext?: string | undefined;
}>, unknown>>, z.core.$ZodType<import("@inv/lang-core").SubComponentOf<{
    variant: "number" | "text";
    value: string;
    subtextVariant: "number" | "text" | "metric";
    size: "sm" | "md" | "lg" | "xs";
    subtext?: string | undefined;
}>, unknown, z.core.$ZodTypeInternals<import("@inv/lang-core").SubComponentOf<{
    variant: "number" | "text";
    value: string;
    subtextVariant: "number" | "text" | "metric";
    size: "sm" | "md" | "lg" | "xs";
    subtext?: string | undefined;
}>, unknown>>, z.core.$ZodType<import("@inv/lang-core").SubComponentOf<{
    value: string;
    subtext?: string | undefined;
    trend?: {
        direction: "up" | "down";
        value: number;
    } | undefined;
}>, unknown, z.core.$ZodTypeInternals<import("@inv/lang-core").SubComponentOf<{
    value: string;
    subtext?: string | undefined;
    trend?: {
        direction: "up" | "down";
        value: number;
    } | undefined;
}>, unknown>>, z.core.$ZodType<import("@inv/lang-core").SubComponentOf<{
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
}>, unknown, z.core.$ZodTypeInternals<import("@inv/lang-core").SubComponentOf<{
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
}>, unknown>>, z.core.$ZodType<import("@inv/lang-core").SubComponentOf<{
    alt: string;
    src?: string | undefined;
}>, unknown, z.core.$ZodTypeInternals<import("@inv/lang-core").SubComponentOf<{
    alt: string;
    src?: string | undefined;
}>, unknown>>, z.core.$ZodType<import("@inv/lang-core").SubComponentOf<{
    labels: string[];
    series: {
        category: string;
        values: number[];
    }[];
    variant?: "step" | "linear" | "natural" | undefined;
    xLabel?: string | undefined;
    yLabel?: string | undefined;
    height?: number | undefined;
}>, unknown, z.core.$ZodTypeInternals<import("@inv/lang-core").SubComponentOf<{
    labels: string[];
    series: {
        category: string;
        values: number[];
    }[];
    variant?: "step" | "linear" | "natural" | undefined;
    xLabel?: string | undefined;
    yLabel?: string | undefined;
    height?: number | undefined;
}>, unknown>>, z.core.$ZodType<import("@inv/lang-core").SubComponentOf<{
    labels: string[];
    series: {
        category: string;
        values: number[];
    }[];
    variant?: "stacked" | "grouped" | undefined;
    xLabel?: string | undefined;
    yLabel?: string | undefined;
    height?: number | undefined;
}>, unknown, z.core.$ZodTypeInternals<import("@inv/lang-core").SubComponentOf<{
    labels: string[];
    series: {
        category: string;
        values: number[];
    }[];
    variant?: "stacked" | "grouped" | undefined;
    xLabel?: string | undefined;
    yLabel?: string | undefined;
    height?: number | undefined;
}>, unknown>>, z.core.$ZodType<import("@inv/lang-core").SubComponentOf<{
    labels: string[];
    series: {
        category: string;
        values: number[];
    }[];
    variant?: "step" | "linear" | "natural" | undefined;
    xLabel?: string | undefined;
    yLabel?: string | undefined;
    height?: number | undefined;
}>, unknown, z.core.$ZodTypeInternals<import("@inv/lang-core").SubComponentOf<{
    labels: string[];
    series: {
        category: string;
        values: number[];
    }[];
    variant?: "step" | "linear" | "natural" | undefined;
    xLabel?: string | undefined;
    yLabel?: string | undefined;
    height?: number | undefined;
}>, unknown>>, z.core.$ZodType<import("@inv/lang-core").SubComponentOf<{
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
}>, unknown, z.core.$ZodTypeInternals<import("@inv/lang-core").SubComponentOf<{
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
}>, unknown>>, z.core.$ZodType<import("@inv/lang-core").SubComponentOf<{
    tags: string[];
    size?: "sm" | "md" | "lg" | undefined;
}>, unknown, z.core.$ZodTypeInternals<import("@inv/lang-core").SubComponentOf<{
    tags: string[];
    size?: "sm" | "md" | "lg" | undefined;
}>, unknown>>, z.core.$ZodType<import("@inv/lang-core").SubComponentOf<{
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
}>, unknown, z.core.$ZodTypeInternals<import("@inv/lang-core").SubComponentOf<{
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
}>, unknown>>]>;
export declare const CompositeCardFooterSchema: z.ZodObject<{
    price: z.ZodOptional<z.ZodUnion<readonly [z.core.$ZodType<import("@inv/lang-core").SubComponentOf<{
        variant: "number" | "text";
        value: string;
        subtextVariant: "number" | "text" | "metric";
        size: "sm" | "md" | "lg" | "xs";
        subtext?: string | undefined;
    }>, unknown, z.core.$ZodTypeInternals<import("@inv/lang-core").SubComponentOf<{
        variant: "number" | "text";
        value: string;
        subtextVariant: "number" | "text" | "metric";
        size: "sm" | "md" | "lg" | "xs";
        subtext?: string | undefined;
    }>, unknown>>, z.core.$ZodType<import("@inv/lang-core").SubComponentOf<{
        value: string;
        subtext?: string | undefined;
        previousValue?: string | undefined;
        trend?: {
            direction: "up" | "down";
            value: number;
        } | undefined;
    }>, unknown, z.core.$ZodTypeInternals<import("@inv/lang-core").SubComponentOf<{
        value: string;
        subtext?: string | undefined;
        previousValue?: string | undefined;
        trend?: {
            direction: "up" | "down";
            value: number;
        } | undefined;
    }>, unknown>>]>>;
    button: z.ZodOptional<z.core.$ZodType<import("@inv/lang-core").SubComponentOf<{
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
    }>, unknown, z.core.$ZodTypeInternals<import("@inv/lang-core").SubComponentOf<{
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
    }>, unknown>>>;
}, z.core.$strip>;
export declare const CompositeCardItemSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    header: z.ZodOptional<z.ZodUnion<readonly [z.core.$ZodType<import("@inv/lang-core").SubComponentOf<{
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
    }>, unknown, z.core.$ZodTypeInternals<import("@inv/lang-core").SubComponentOf<{
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
    }>, unknown>>, z.core.$ZodType<import("@inv/lang-core").SubComponentOf<{
        src: string;
        title: string;
        bold: boolean;
        layout: "horizontal" | "vertical";
        alt?: string | undefined;
        subtitle?: string | undefined;
        imageSize?: number | undefined;
    }>, unknown, z.core.$ZodTypeInternals<import("@inv/lang-core").SubComponentOf<{
        src: string;
        title: string;
        bold: boolean;
        layout: "horizontal" | "vertical";
        alt?: string | undefined;
        subtitle?: string | undefined;
        imageSize?: number | undefined;
    }>, unknown>>, z.core.$ZodType<import("@inv/lang-core").SubComponentOf<{
        src: string;
        title: string;
        bold: boolean;
        alt?: string | undefined;
        subtitle?: string | undefined;
    }>, unknown, z.core.$ZodTypeInternals<import("@inv/lang-core").SubComponentOf<{
        src: string;
        title: string;
        bold: boolean;
        alt?: string | undefined;
        subtitle?: string | undefined;
    }>, unknown>>, z.core.$ZodType<import("@inv/lang-core").SubComponentOf<{
        variant: "number" | "text";
        value: string;
        subtextVariant: "number" | "text" | "metric";
        size: "sm" | "md" | "lg" | "xs";
        subtext?: string | undefined;
    }>, unknown, z.core.$ZodTypeInternals<import("@inv/lang-core").SubComponentOf<{
        variant: "number" | "text";
        value: string;
        subtextVariant: "number" | "text" | "metric";
        size: "sm" | "md" | "lg" | "xs";
        subtext?: string | undefined;
    }>, unknown>>, z.core.$ZodType<import("@inv/lang-core").SubComponentOf<{
        alt: string;
        src?: string | undefined;
    }>, unknown, z.core.$ZodTypeInternals<import("@inv/lang-core").SubComponentOf<{
        alt: string;
        src?: string | undefined;
    }>, unknown>>]>>;
    body: z.ZodDefault<z.ZodArray<z.ZodUnion<readonly [z.core.$ZodType<import("@inv/lang-core").SubComponentOf<{
        variant: "number" | "text";
        value: string;
        subtextVariant: "number" | "text" | "metric";
        size: "sm" | "md" | "lg" | "xs";
        subtext?: string | undefined;
    }>, unknown, z.core.$ZodTypeInternals<import("@inv/lang-core").SubComponentOf<{
        variant: "number" | "text";
        value: string;
        subtextVariant: "number" | "text" | "metric";
        size: "sm" | "md" | "lg" | "xs";
        subtext?: string | undefined;
    }>, unknown>>, z.core.$ZodType<import("@inv/lang-core").SubComponentOf<{
        variant: "number" | "text";
        value: string;
        subtextVariant: "number" | "text" | "metric";
        size: "sm" | "md" | "lg" | "xs";
        subtext?: string | undefined;
    }>, unknown, z.core.$ZodTypeInternals<import("@inv/lang-core").SubComponentOf<{
        variant: "number" | "text";
        value: string;
        subtextVariant: "number" | "text" | "metric";
        size: "sm" | "md" | "lg" | "xs";
        subtext?: string | undefined;
    }>, unknown>>, z.core.$ZodType<import("@inv/lang-core").SubComponentOf<{
        value: string;
        subtext?: string | undefined;
        trend?: {
            direction: "up" | "down";
            value: number;
        } | undefined;
    }>, unknown, z.core.$ZodTypeInternals<import("@inv/lang-core").SubComponentOf<{
        value: string;
        subtext?: string | undefined;
        trend?: {
            direction: "up" | "down";
            value: number;
        } | undefined;
    }>, unknown>>, z.core.$ZodType<import("@inv/lang-core").SubComponentOf<{
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
    }>, unknown, z.core.$ZodTypeInternals<import("@inv/lang-core").SubComponentOf<{
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
    }>, unknown>>, z.core.$ZodType<import("@inv/lang-core").SubComponentOf<{
        alt: string;
        src?: string | undefined;
    }>, unknown, z.core.$ZodTypeInternals<import("@inv/lang-core").SubComponentOf<{
        alt: string;
        src?: string | undefined;
    }>, unknown>>, z.core.$ZodType<import("@inv/lang-core").SubComponentOf<{
        labels: string[];
        series: {
            category: string;
            values: number[];
        }[];
        variant?: "step" | "linear" | "natural" | undefined;
        xLabel?: string | undefined;
        yLabel?: string | undefined;
        height?: number | undefined;
    }>, unknown, z.core.$ZodTypeInternals<import("@inv/lang-core").SubComponentOf<{
        labels: string[];
        series: {
            category: string;
            values: number[];
        }[];
        variant?: "step" | "linear" | "natural" | undefined;
        xLabel?: string | undefined;
        yLabel?: string | undefined;
        height?: number | undefined;
    }>, unknown>>, z.core.$ZodType<import("@inv/lang-core").SubComponentOf<{
        labels: string[];
        series: {
            category: string;
            values: number[];
        }[];
        variant?: "stacked" | "grouped" | undefined;
        xLabel?: string | undefined;
        yLabel?: string | undefined;
        height?: number | undefined;
    }>, unknown, z.core.$ZodTypeInternals<import("@inv/lang-core").SubComponentOf<{
        labels: string[];
        series: {
            category: string;
            values: number[];
        }[];
        variant?: "stacked" | "grouped" | undefined;
        xLabel?: string | undefined;
        yLabel?: string | undefined;
        height?: number | undefined;
    }>, unknown>>, z.core.$ZodType<import("@inv/lang-core").SubComponentOf<{
        labels: string[];
        series: {
            category: string;
            values: number[];
        }[];
        variant?: "step" | "linear" | "natural" | undefined;
        xLabel?: string | undefined;
        yLabel?: string | undefined;
        height?: number | undefined;
    }>, unknown, z.core.$ZodTypeInternals<import("@inv/lang-core").SubComponentOf<{
        labels: string[];
        series: {
            category: string;
            values: number[];
        }[];
        variant?: "step" | "linear" | "natural" | undefined;
        xLabel?: string | undefined;
        yLabel?: string | undefined;
        height?: number | undefined;
    }>, unknown>>, z.core.$ZodType<import("@inv/lang-core").SubComponentOf<{
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
    }>, unknown, z.core.$ZodTypeInternals<import("@inv/lang-core").SubComponentOf<{
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
    }>, unknown>>, z.core.$ZodType<import("@inv/lang-core").SubComponentOf<{
        tags: string[];
        size?: "sm" | "md" | "lg" | undefined;
    }>, unknown, z.core.$ZodTypeInternals<import("@inv/lang-core").SubComponentOf<{
        tags: string[];
        size?: "sm" | "md" | "lg" | undefined;
    }>, unknown>>, z.core.$ZodType<import("@inv/lang-core").SubComponentOf<{
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
    }>, unknown, z.core.$ZodTypeInternals<import("@inv/lang-core").SubComponentOf<{
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
    }>, unknown>>]>>>;
    footer: z.ZodOptional<z.ZodObject<{
        price: z.ZodOptional<z.ZodUnion<readonly [z.core.$ZodType<import("@inv/lang-core").SubComponentOf<{
            variant: "number" | "text";
            value: string;
            subtextVariant: "number" | "text" | "metric";
            size: "sm" | "md" | "lg" | "xs";
            subtext?: string | undefined;
        }>, unknown, z.core.$ZodTypeInternals<import("@inv/lang-core").SubComponentOf<{
            variant: "number" | "text";
            value: string;
            subtextVariant: "number" | "text" | "metric";
            size: "sm" | "md" | "lg" | "xs";
            subtext?: string | undefined;
        }>, unknown>>, z.core.$ZodType<import("@inv/lang-core").SubComponentOf<{
            value: string;
            subtext?: string | undefined;
            previousValue?: string | undefined;
            trend?: {
                direction: "up" | "down";
                value: number;
            } | undefined;
        }>, unknown, z.core.$ZodTypeInternals<import("@inv/lang-core").SubComponentOf<{
            value: string;
            subtext?: string | undefined;
            previousValue?: string | undefined;
            trend?: {
                direction: "up" | "down";
                value: number;
            } | undefined;
        }>, unknown>>]>>;
        button: z.ZodOptional<z.core.$ZodType<import("@inv/lang-core").SubComponentOf<{
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
        }>, unknown, z.core.$ZodTypeInternals<import("@inv/lang-core").SubComponentOf<{
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
        }>, unknown>>>;
    }, z.core.$strip>>;
}, z.core.$strip>;
export type CompositeCardItemProps = z.infer<typeof CompositeCardItemSchema>;
export declare const CompositeCardItem: import("@inv/lang").DefinedComponent<z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    header: z.ZodOptional<z.ZodUnion<readonly [z.core.$ZodType<import("@inv/lang-core").SubComponentOf<{
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
    }>, unknown, z.core.$ZodTypeInternals<import("@inv/lang-core").SubComponentOf<{
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
    }>, unknown>>, z.core.$ZodType<import("@inv/lang-core").SubComponentOf<{
        src: string;
        title: string;
        bold: boolean;
        layout: "horizontal" | "vertical";
        alt?: string | undefined;
        subtitle?: string | undefined;
        imageSize?: number | undefined;
    }>, unknown, z.core.$ZodTypeInternals<import("@inv/lang-core").SubComponentOf<{
        src: string;
        title: string;
        bold: boolean;
        layout: "horizontal" | "vertical";
        alt?: string | undefined;
        subtitle?: string | undefined;
        imageSize?: number | undefined;
    }>, unknown>>, z.core.$ZodType<import("@inv/lang-core").SubComponentOf<{
        src: string;
        title: string;
        bold: boolean;
        alt?: string | undefined;
        subtitle?: string | undefined;
    }>, unknown, z.core.$ZodTypeInternals<import("@inv/lang-core").SubComponentOf<{
        src: string;
        title: string;
        bold: boolean;
        alt?: string | undefined;
        subtitle?: string | undefined;
    }>, unknown>>, z.core.$ZodType<import("@inv/lang-core").SubComponentOf<{
        variant: "number" | "text";
        value: string;
        subtextVariant: "number" | "text" | "metric";
        size: "sm" | "md" | "lg" | "xs";
        subtext?: string | undefined;
    }>, unknown, z.core.$ZodTypeInternals<import("@inv/lang-core").SubComponentOf<{
        variant: "number" | "text";
        value: string;
        subtextVariant: "number" | "text" | "metric";
        size: "sm" | "md" | "lg" | "xs";
        subtext?: string | undefined;
    }>, unknown>>, z.core.$ZodType<import("@inv/lang-core").SubComponentOf<{
        alt: string;
        src?: string | undefined;
    }>, unknown, z.core.$ZodTypeInternals<import("@inv/lang-core").SubComponentOf<{
        alt: string;
        src?: string | undefined;
    }>, unknown>>]>>;
    body: z.ZodDefault<z.ZodArray<z.ZodUnion<readonly [z.core.$ZodType<import("@inv/lang-core").SubComponentOf<{
        variant: "number" | "text";
        value: string;
        subtextVariant: "number" | "text" | "metric";
        size: "sm" | "md" | "lg" | "xs";
        subtext?: string | undefined;
    }>, unknown, z.core.$ZodTypeInternals<import("@inv/lang-core").SubComponentOf<{
        variant: "number" | "text";
        value: string;
        subtextVariant: "number" | "text" | "metric";
        size: "sm" | "md" | "lg" | "xs";
        subtext?: string | undefined;
    }>, unknown>>, z.core.$ZodType<import("@inv/lang-core").SubComponentOf<{
        variant: "number" | "text";
        value: string;
        subtextVariant: "number" | "text" | "metric";
        size: "sm" | "md" | "lg" | "xs";
        subtext?: string | undefined;
    }>, unknown, z.core.$ZodTypeInternals<import("@inv/lang-core").SubComponentOf<{
        variant: "number" | "text";
        value: string;
        subtextVariant: "number" | "text" | "metric";
        size: "sm" | "md" | "lg" | "xs";
        subtext?: string | undefined;
    }>, unknown>>, z.core.$ZodType<import("@inv/lang-core").SubComponentOf<{
        value: string;
        subtext?: string | undefined;
        trend?: {
            direction: "up" | "down";
            value: number;
        } | undefined;
    }>, unknown, z.core.$ZodTypeInternals<import("@inv/lang-core").SubComponentOf<{
        value: string;
        subtext?: string | undefined;
        trend?: {
            direction: "up" | "down";
            value: number;
        } | undefined;
    }>, unknown>>, z.core.$ZodType<import("@inv/lang-core").SubComponentOf<{
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
    }>, unknown, z.core.$ZodTypeInternals<import("@inv/lang-core").SubComponentOf<{
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
    }>, unknown>>, z.core.$ZodType<import("@inv/lang-core").SubComponentOf<{
        alt: string;
        src?: string | undefined;
    }>, unknown, z.core.$ZodTypeInternals<import("@inv/lang-core").SubComponentOf<{
        alt: string;
        src?: string | undefined;
    }>, unknown>>, z.core.$ZodType<import("@inv/lang-core").SubComponentOf<{
        labels: string[];
        series: {
            category: string;
            values: number[];
        }[];
        variant?: "step" | "linear" | "natural" | undefined;
        xLabel?: string | undefined;
        yLabel?: string | undefined;
        height?: number | undefined;
    }>, unknown, z.core.$ZodTypeInternals<import("@inv/lang-core").SubComponentOf<{
        labels: string[];
        series: {
            category: string;
            values: number[];
        }[];
        variant?: "step" | "linear" | "natural" | undefined;
        xLabel?: string | undefined;
        yLabel?: string | undefined;
        height?: number | undefined;
    }>, unknown>>, z.core.$ZodType<import("@inv/lang-core").SubComponentOf<{
        labels: string[];
        series: {
            category: string;
            values: number[];
        }[];
        variant?: "stacked" | "grouped" | undefined;
        xLabel?: string | undefined;
        yLabel?: string | undefined;
        height?: number | undefined;
    }>, unknown, z.core.$ZodTypeInternals<import("@inv/lang-core").SubComponentOf<{
        labels: string[];
        series: {
            category: string;
            values: number[];
        }[];
        variant?: "stacked" | "grouped" | undefined;
        xLabel?: string | undefined;
        yLabel?: string | undefined;
        height?: number | undefined;
    }>, unknown>>, z.core.$ZodType<import("@inv/lang-core").SubComponentOf<{
        labels: string[];
        series: {
            category: string;
            values: number[];
        }[];
        variant?: "step" | "linear" | "natural" | undefined;
        xLabel?: string | undefined;
        yLabel?: string | undefined;
        height?: number | undefined;
    }>, unknown, z.core.$ZodTypeInternals<import("@inv/lang-core").SubComponentOf<{
        labels: string[];
        series: {
            category: string;
            values: number[];
        }[];
        variant?: "step" | "linear" | "natural" | undefined;
        xLabel?: string | undefined;
        yLabel?: string | undefined;
        height?: number | undefined;
    }>, unknown>>, z.core.$ZodType<import("@inv/lang-core").SubComponentOf<{
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
    }>, unknown, z.core.$ZodTypeInternals<import("@inv/lang-core").SubComponentOf<{
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
    }>, unknown>>, z.core.$ZodType<import("@inv/lang-core").SubComponentOf<{
        tags: string[];
        size?: "sm" | "md" | "lg" | undefined;
    }>, unknown, z.core.$ZodTypeInternals<import("@inv/lang-core").SubComponentOf<{
        tags: string[];
        size?: "sm" | "md" | "lg" | undefined;
    }>, unknown>>, z.core.$ZodType<import("@inv/lang-core").SubComponentOf<{
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
    }>, unknown, z.core.$ZodTypeInternals<import("@inv/lang-core").SubComponentOf<{
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
    }>, unknown>>]>>>;
    footer: z.ZodOptional<z.ZodObject<{
        price: z.ZodOptional<z.ZodUnion<readonly [z.core.$ZodType<import("@inv/lang-core").SubComponentOf<{
            variant: "number" | "text";
            value: string;
            subtextVariant: "number" | "text" | "metric";
            size: "sm" | "md" | "lg" | "xs";
            subtext?: string | undefined;
        }>, unknown, z.core.$ZodTypeInternals<import("@inv/lang-core").SubComponentOf<{
            variant: "number" | "text";
            value: string;
            subtextVariant: "number" | "text" | "metric";
            size: "sm" | "md" | "lg" | "xs";
            subtext?: string | undefined;
        }>, unknown>>, z.core.$ZodType<import("@inv/lang-core").SubComponentOf<{
            value: string;
            subtext?: string | undefined;
            previousValue?: string | undefined;
            trend?: {
                direction: "up" | "down";
                value: number;
            } | undefined;
        }>, unknown, z.core.$ZodTypeInternals<import("@inv/lang-core").SubComponentOf<{
            value: string;
            subtext?: string | undefined;
            previousValue?: string | undefined;
            trend?: {
                direction: "up" | "down";
                value: number;
            } | undefined;
        }>, unknown>>]>>;
        button: z.ZodOptional<z.core.$ZodType<import("@inv/lang-core").SubComponentOf<{
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
        }>, unknown, z.core.$ZodTypeInternals<import("@inv/lang-core").SubComponentOf<{
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
        }>, unknown>>>;
    }, z.core.$strip>>;
}, z.core.$strip>>;
export declare const CompositeCardBlockSchema: z.ZodObject<{
    items: z.ZodArray<z.core.$ZodType<import("@inv/lang-core").SubComponentOf<{
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
    }>, unknown, z.core.$ZodTypeInternals<import("@inv/lang-core").SubComponentOf<{
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
    }>, unknown>>>;
    layout: z.ZodDefault<z.ZodEnum<{
        grid: "grid";
        carousel: "carousel";
    }>>;
    responsive: z.ZodDefault<z.ZodBoolean>;
    action: z.ZodOptional<z.ZodUnion<readonly [z.ZodObject<{
        type: z.ZodLiteral<"open_url">;
        url: z.ZodString;
    }, z.core.$strip>, z.ZodObject<{
        type: z.ZodLiteral<"continue_conversation">;
        context: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>, z.ZodObject<{
        type: z.ZodString;
        params: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    }, z.core.$strip>]>>;
    gap: z.ZodOptional<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>>;
}, z.core.$strip>;
export type CompositeCardBlockProps = z.infer<typeof CompositeCardBlockSchema>;
//# sourceMappingURL=schema.d.ts.map