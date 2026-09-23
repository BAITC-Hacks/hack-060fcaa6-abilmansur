import { z } from "zod/v4";
export declare const OverviewCardItemSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    top: z.ZodUnion<readonly [z.core.$ZodType<import("@inv/lang-core").SubComponentOf<{
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
    }>, unknown>>]>;
    bottom: z.ZodOptional<z.core.$ZodType<import("@inv/lang-core").SubComponentOf<{
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
    }>, unknown>>>;
}, z.core.$strip>;
export declare const OverviewCardItem: import("@inv/lang").DefinedComponent<z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    top: z.ZodUnion<readonly [z.core.$ZodType<import("@inv/lang-core").SubComponentOf<{
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
    }>, unknown>>]>;
    bottom: z.ZodOptional<z.core.$ZodType<import("@inv/lang-core").SubComponentOf<{
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
    }>, unknown>>>;
}, z.core.$strip>>;
export declare const OverviewCardBlockSchema: z.ZodObject<{
    items: z.ZodArray<z.core.$ZodType<import("@inv/lang-core").SubComponentOf<{
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
    }>, unknown, z.core.$ZodTypeInternals<import("@inv/lang-core").SubComponentOf<{
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
export type OverviewCardItemProps = z.infer<typeof OverviewCardItemSchema>;
export type OverviewCardBlockProps = z.infer<typeof OverviewCardBlockSchema>;
export type OverviewCardItemNode = OverviewCardBlockProps["items"][number];
//# sourceMappingURL=schema.d.ts.map