export * from "./schema";
export declare const ImageText: import("@inv/lang").DefinedComponent<import("zod").ZodObject<{
    src: import("zod").ZodString;
    alt: import("zod").ZodOptional<import("zod").ZodString>;
    title: import("zod").ZodString;
    subtitle: import("zod").ZodOptional<import("zod").ZodString>;
    bold: import("zod").ZodDefault<import("zod").ZodBoolean>;
    layout: import("zod").ZodDefault<import("zod").ZodEnum<{
        horizontal: "horizontal";
        vertical: "vertical";
    }>>;
    imageSize: import("zod").ZodOptional<import("zod").ZodNumber>;
}, import("zod/v4/core").$strip>>;
//# sourceMappingURL=index.d.ts.map