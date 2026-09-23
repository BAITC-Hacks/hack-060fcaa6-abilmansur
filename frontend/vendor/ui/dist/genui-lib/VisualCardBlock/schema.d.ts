import { z } from "zod/v4";
export declare const VisualCardItemSchema: z.ZodObject<{
    body: z.core.$ZodType<import("@inv/lang-core").SubComponentOf<{
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
    }>, unknown>>;
    id: z.ZodOptional<z.ZodString>;
    bgImageSrc: z.ZodOptional<z.ZodString>;
    tag: z.ZodOptional<z.core.$ZodType<import("@inv/lang-core").SubComponentOf<{
        text: string;
        icon?: import("@inv/lang-core").SubComponentOf<{
            name: string;
            category?: string | undefined;
        }> | undefined;
        size?: "sm" | "md" | "lg" | undefined;
        variant?: "neutral" | "info" | "danger" | "warning" | "success" | undefined;
    }>, unknown, z.core.$ZodTypeInternals<import("@inv/lang-core").SubComponentOf<{
        text: string;
        icon?: import("@inv/lang-core").SubComponentOf<{
            name: string;
            category?: string | undefined;
        }> | undefined;
        size?: "sm" | "md" | "lg" | undefined;
        variant?: "neutral" | "info" | "danger" | "warning" | "success" | undefined;
    }>, unknown>>>;
    bgImageAlt: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type VisualCardItemProps = z.infer<typeof VisualCardItemSchema>;
export declare const VisualCardItem: import("@inv/lang").DefinedComponent<z.ZodObject<{
    body: z.core.$ZodType<import("@inv/lang-core").SubComponentOf<{
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
    }>, unknown>>;
    id: z.ZodOptional<z.ZodString>;
    bgImageSrc: z.ZodOptional<z.ZodString>;
    tag: z.ZodOptional<z.core.$ZodType<import("@inv/lang-core").SubComponentOf<{
        text: string;
        icon?: import("@inv/lang-core").SubComponentOf<{
            name: string;
            category?: string | undefined;
        }> | undefined;
        size?: "sm" | "md" | "lg" | undefined;
        variant?: "neutral" | "info" | "danger" | "warning" | "success" | undefined;
    }>, unknown, z.core.$ZodTypeInternals<import("@inv/lang-core").SubComponentOf<{
        text: string;
        icon?: import("@inv/lang-core").SubComponentOf<{
            name: string;
            category?: string | undefined;
        }> | undefined;
        size?: "sm" | "md" | "lg" | undefined;
        variant?: "neutral" | "info" | "danger" | "warning" | "success" | undefined;
    }>, unknown>>>;
    bgImageAlt: z.ZodOptional<z.ZodString>;
}, z.core.$strip>>;
export declare const VisualCardBlockSchema: z.ZodObject<{
    items: z.ZodArray<z.core.$ZodType<import("@inv/lang-core").SubComponentOf<{
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
    }>, unknown, z.core.$ZodTypeInternals<import("@inv/lang-core").SubComponentOf<{
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
export type VisualCardBlockProps = z.infer<typeof VisualCardBlockSchema>;
//# sourceMappingURL=schema.d.ts.map