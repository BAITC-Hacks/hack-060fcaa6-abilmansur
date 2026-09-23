import { z } from "zod/v4";
export declare const ContextCardItemSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    title: z.ZodUnion<readonly [z.ZodString, z.core.$ZodType<import("@inv/lang-core").SubComponentOf<{
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
    }>, unknown>>]>;
    body: z.ZodOptional<z.ZodString>;
    bgColor: z.ZodOptional<z.ZodEnum<{
        gray: "gray";
    }>>;
    bgImageSrc: z.ZodOptional<z.ZodString>;
    bgImageAlt: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type ContextCardItemProps = z.infer<typeof ContextCardItemSchema>;
export declare const ContextCardItem: import("@inv/lang").DefinedComponent<z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    title: z.ZodUnion<readonly [z.ZodString, z.core.$ZodType<import("@inv/lang-core").SubComponentOf<{
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
    }>, unknown>>]>;
    body: z.ZodOptional<z.ZodString>;
    bgColor: z.ZodOptional<z.ZodEnum<{
        gray: "gray";
    }>>;
    bgImageSrc: z.ZodOptional<z.ZodString>;
    bgImageAlt: z.ZodOptional<z.ZodString>;
}, z.core.$strip>>;
export declare const ContextCardBlockSchema: z.ZodObject<{
    items: z.ZodArray<z.core.$ZodType<import("@inv/lang-core").SubComponentOf<{
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
    }>, unknown, z.core.$ZodTypeInternals<import("@inv/lang-core").SubComponentOf<{
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
export type ContextCardBlockProps = z.infer<typeof ContextCardBlockSchema>;
//# sourceMappingURL=schema.d.ts.map