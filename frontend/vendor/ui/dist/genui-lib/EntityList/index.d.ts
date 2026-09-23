export * from "./schema";
export declare const EntityList: import("@inv/lang").DefinedComponent<import("zod").ZodObject<{
    rows: import("zod").ZodDefault<import("zod").ZodArray<import("zod").ZodObject<{
        left: import("zod").ZodString;
        right: import("zod").ZodString;
        rightVariant: import("zod").ZodDefault<import("zod").ZodEnum<{
            number: "number";
            text: "text";
        }>>;
    }, import("zod/v4/core").$strip>>>;
    size: import("zod").ZodDefault<import("zod").ZodEnum<{
        small: "small";
        default: "default";
    }>>;
    header: import("zod").ZodOptional<import("zod").ZodObject<{
        left: import("zod").ZodString;
        right: import("zod").ZodString;
        rightVariant: import("zod").ZodDefault<import("zod").ZodEnum<{
            number: "number";
            text: "text";
        }>>;
    }, import("zod/v4/core").$strip>>;
    footer: import("zod").ZodOptional<import("zod").ZodObject<{
        left: import("zod").ZodString;
        right: import("zod").ZodString;
        rightVariant: import("zod").ZodDefault<import("zod").ZodEnum<{
            number: "number";
            text: "text";
        }>>;
    }, import("zod/v4/core").$strip>>;
}, import("zod/v4/core").$strip>>;
//# sourceMappingURL=index.d.ts.map