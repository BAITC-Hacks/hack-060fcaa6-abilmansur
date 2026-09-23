import type { SubComponentOf } from "@inv/lang";
export * from "./schema";
export declare const ContextCardBlock: import("@inv/lang").DefinedComponent<import("zod").ZodObject<{
    items: import("zod").ZodArray<import("zod/v4/core").$ZodType<SubComponentOf<{
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
    }>, unknown, import("zod/v4/core").$ZodTypeInternals<SubComponentOf<{
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