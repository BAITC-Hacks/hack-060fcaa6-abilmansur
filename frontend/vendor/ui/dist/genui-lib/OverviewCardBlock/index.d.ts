export * from "./schema";
export declare const OverviewCardBlock: import("@inv/lang").DefinedComponent<import("zod").ZodObject<{
    items: import("zod").ZodArray<import("zod/v4/core").$ZodType<import("@inv/lang-core").SubComponentOf<{
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
    }>, unknown, import("zod/v4/core").$ZodTypeInternals<import("@inv/lang-core").SubComponentOf<{
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