import { z } from "zod/v4";
export declare const SnippetCardItemSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    lhs: z.ZodUnion<readonly [z.core.$ZodType<import("@inv/lang-core").SubComponentOf<{
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
    }>, unknown>>]>;
    rhs: z.ZodOptional<z.ZodUnion<readonly [z.core.$ZodType<import("@inv/lang-core").SubComponentOf<{
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
    }>, unknown>>]>>;
}, z.core.$strip>;
export declare const SnippetCardItem: import("@inv/lang").DefinedComponent<z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    lhs: z.ZodUnion<readonly [z.core.$ZodType<import("@inv/lang-core").SubComponentOf<{
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
    }>, unknown>>]>;
    rhs: z.ZodOptional<z.ZodUnion<readonly [z.core.$ZodType<import("@inv/lang-core").SubComponentOf<{
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
    }>, unknown>>]>>;
}, z.core.$strip>>;
export declare const SnippetCardBlockSchema: z.ZodObject<{
    items: z.ZodArray<z.core.$ZodType<import("@inv/lang-core").SubComponentOf<{
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
    }>, unknown, z.core.$ZodTypeInternals<import("@inv/lang-core").SubComponentOf<{
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
    }>, unknown>>>;
    layout: z.ZodDefault<z.ZodEnum<{
        grid: "grid";
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
export type SnippetCardItemProps = z.infer<typeof SnippetCardItemSchema>;
export type SnippetCardBlockProps = z.infer<typeof SnippetCardBlockSchema>;
export type SnippetCardItemNode = SnippetCardBlockProps["items"][number];
//# sourceMappingURL=schema.d.ts.map