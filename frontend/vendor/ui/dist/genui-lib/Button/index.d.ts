export { ButtonSchema } from "./schema";
export declare const Button: import("@inv/lang").DefinedComponent<import("zod").ZodObject<{
    label: import("zod").ZodString;
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
    variant: import("zod").ZodOptional<import("zod").ZodEnum<{
        primary: "primary";
        secondary: "secondary";
        tertiary: "tertiary";
    }>>;
    type: import("zod").ZodOptional<import("zod").ZodEnum<{
        normal: "normal";
        destructive: "destructive";
    }>>;
    size: import("zod").ZodOptional<import("zod").ZodEnum<{
        small: "small";
        "extra-small": "extra-small";
        medium: "medium";
        large: "large";
    }>>;
}, import("zod/v4/core").$strip>>;
//# sourceMappingURL=index.d.ts.map