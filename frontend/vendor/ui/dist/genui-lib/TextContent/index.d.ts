export { TextContentSchema } from "./schema";
export declare const TextContent: import("@inv/lang").DefinedComponent<import("zod").ZodObject<{
    text: import("zod").ZodString;
    size: import("zod").ZodOptional<import("zod").ZodEnum<{
        small: "small";
        large: "large";
        default: "default";
        "small-heavy": "small-heavy";
        "large-heavy": "large-heavy";
    }>>;
}, import("zod/v4/core").$strip>>;
//# sourceMappingURL=index.d.ts.map