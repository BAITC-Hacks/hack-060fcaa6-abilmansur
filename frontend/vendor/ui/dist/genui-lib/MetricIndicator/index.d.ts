export * from "./schema";
export declare const MetricIndicatorWithStrikethrough: import("@inv/lang").DefinedComponent<import("zod").ZodObject<{
    value: import("zod").ZodString;
    subtext: import("zod").ZodOptional<import("zod").ZodString>;
    previousValue: import("zod").ZodOptional<import("zod").ZodString>;
    trend: import("zod").ZodOptional<import("zod").ZodObject<{
        direction: import("zod").ZodEnum<{
            up: "up";
            down: "down";
        }>;
        value: import("zod").ZodNumber;
    }, import("zod/v4/core").$strip>>;
}, import("zod/v4/core").$strip>>;
export declare const MetricIndicatorInline: import("@inv/lang").DefinedComponent<import("zod").ZodObject<{
    value: import("zod").ZodString;
    subtext: import("zod").ZodOptional<import("zod").ZodString>;
    trend: import("zod").ZodOptional<import("zod").ZodObject<{
        direction: import("zod").ZodEnum<{
            up: "up";
            down: "down";
        }>;
        value: import("zod").ZodNumber;
    }, import("zod/v4/core").$strip>>;
}, import("zod/v4/core").$strip>>;
//# sourceMappingURL=index.d.ts.map