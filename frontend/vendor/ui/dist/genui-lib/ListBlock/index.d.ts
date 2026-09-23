import { z } from "zod/v4";
export declare const ListBlock: import("@inv/lang").DefinedComponent<z.ZodObject<{
    items: z.ZodArray<z.core.$ZodType<import("@inv/lang-core").SubComponentOf<{
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
    }>, unknown, z.core.$ZodTypeInternals<import("@inv/lang-core").SubComponentOf<{
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
    }>, unknown>>>;
    variant: z.ZodOptional<z.ZodEnum<{
        number: "number";
        image: "image";
    }>>;
    size: z.ZodOptional<z.ZodEnum<{
        small: "small";
        default: "default";
    }>>;
}, z.core.$strip>>;
//# sourceMappingURL=index.d.ts.map