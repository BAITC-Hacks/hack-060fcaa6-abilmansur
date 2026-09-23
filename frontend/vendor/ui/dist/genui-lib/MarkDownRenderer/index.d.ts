export { MarkDownRendererSchema } from "./schema";
export declare const MarkDownRenderer: import("@inv/lang").DefinedComponent<import("zod").ZodObject<{
    textMarkdown: import("zod").ZodString;
    variant: import("zod").ZodOptional<import("zod").ZodEnum<{
        clear: "clear";
        card: "card";
        sunk: "sunk";
    }>>;
}, import("zod/v4/core").$strip>>;
//# sourceMappingURL=index.d.ts.map