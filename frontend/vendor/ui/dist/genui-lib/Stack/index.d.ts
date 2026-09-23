export { StackSchema } from "./schema";
export declare const Stack: import("@inv/lang").DefinedComponent<import("zod").ZodObject<{
    children: import("zod").ZodArray<import("zod").ZodAny>;
    direction: import("zod").ZodOptional<import("zod").ZodEnum<{
        row: "row";
        column: "column";
    }>>;
    gap: import("zod").ZodOptional<import("zod").ZodEnum<{
        s: "s";
        none: "none";
        l: "l";
        xs: "xs";
        m: "m";
        xl: "xl";
        "2xl": "2xl";
    }>>;
    align: import("zod").ZodOptional<import("zod").ZodEnum<{
        center: "center";
        end: "end";
        baseline: "baseline";
        stretch: "stretch";
        start: "start";
    }>>;
    justify: import("zod").ZodOptional<import("zod").ZodEnum<{
        center: "center";
        end: "end";
        start: "start";
        between: "between";
        around: "around";
        evenly: "evenly";
    }>>;
    wrap: import("zod").ZodOptional<import("zod").ZodBoolean>;
}, import("zod/v4/core").$strip>>;
//# sourceMappingURL=index.d.ts.map