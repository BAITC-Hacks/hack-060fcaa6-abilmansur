export { ButtonsSchema } from "./schema";
export declare const Buttons: import("@inv/lang").DefinedComponent<import("zod").ZodObject<{
    buttons: import("zod").ZodArray<import("zod/v4/core").$ZodType<import("@inv/lang-core").SubComponentOf<{
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
    }>, unknown, import("zod/v4/core").$ZodTypeInternals<import("@inv/lang-core").SubComponentOf<{
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
    direction: import("zod").ZodOptional<import("zod").ZodEnum<{
        row: "row";
        column: "column";
    }>>;
}, import("zod/v4/core").$strip>>;
//# sourceMappingURL=index.d.ts.map