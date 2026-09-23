export { SwitchItemSchema } from "./schema";
export declare const SwitchItem: import("@inv/lang").DefinedComponent<import("zod").ZodObject<{
    label: import("zod").ZodOptional<import("zod").ZodString>;
    description: import("zod").ZodOptional<import("zod").ZodString>;
    name: import("zod").ZodString;
    defaultChecked: import("zod").ZodOptional<import("zod").ZodBoolean>;
}, import("zod/v4/core").$strip>>;
export declare const SwitchGroup: import("@inv/lang").DefinedComponent<import("zod").ZodObject<{
    name: import("zod").ZodString;
    items: import("zod").ZodArray<any>;
    variant: import("zod").ZodOptional<import("zod").ZodEnum<{
        clear: "clear";
        card: "card";
        sunk: "sunk";
    }>>;
    value: import("zod").ZodType<import("@inv/lang-core").StateField<Record<string, boolean> | undefined>, unknown, import("zod/v4/core").$ZodTypeInternals<import("@inv/lang-core").StateField<Record<string, boolean> | undefined>, unknown>>;
}, import("zod/v4/core").$strip>>;
//# sourceMappingURL=index.d.ts.map