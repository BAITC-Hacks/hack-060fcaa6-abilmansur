import type { SubComponentOf } from "@inv/lang";
export * from "./schema";
export declare const VisualCardBlock: import("@inv/lang").DefinedComponent<import("zod").ZodObject<{
    items: import("zod").ZodArray<import("zod/v4/core").$ZodType<SubComponentOf<{
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
    }>, unknown, import("zod/v4/core").$ZodTypeInternals<SubComponentOf<{
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