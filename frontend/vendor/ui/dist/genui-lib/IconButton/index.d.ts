export * from "./schema";
export declare const IconButton: import("@inv/lang").DefinedComponent<import("zod").ZodObject<{
    name: import("zod").ZodString;
    icon: import("zod/v4/core").$ZodType<import("@inv/lang-core").SubComponentOf<{
        name: string;
        category?: string | undefined;
    }>, unknown, import("zod/v4/core").$ZodTypeInternals<import("@inv/lang-core").SubComponentOf<{
        name: string;
        category?: string | undefined;
    }>, unknown>>;
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
    size: import("zod").ZodOptional<import("zod").ZodEnum<{
        small: "small";
        "extra-small": "extra-small";
        medium: "medium";
        large: "large";
    }>>;
    shape: import("zod").ZodOptional<import("zod").ZodEnum<{
        circle: "circle";
        square: "square";
    }>>;
}, import("zod/v4/core").$strip>>;
//# sourceMappingURL=index.d.ts.map