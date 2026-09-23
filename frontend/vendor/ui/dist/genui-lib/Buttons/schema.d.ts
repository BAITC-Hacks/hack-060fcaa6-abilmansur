import { z } from "zod/v4";
export declare const ButtonsSchema: z.ZodObject<{
    buttons: z.ZodArray<z.core.$ZodType<import("@inv/lang-core").SubComponentOf<{
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
    direction: z.ZodOptional<z.ZodEnum<{
        row: "row";
        column: "column";
    }>>;
}, z.core.$strip>;
//# sourceMappingURL=schema.d.ts.map