export * from "./schema";
export declare const EditableTable: import("@inv/lang").DefinedComponent<import("zod").ZodObject<{
    name: import("zod").ZodDefault<import("zod").ZodString>;
    columns: import("zod").ZodDefault<import("zod").ZodArray<import("zod").ZodObject<{
        type: import("zod").ZodEnum<{
            number: "number";
            select: "select";
            text: "text";
            url: "url";
            "date-single": "date-single";
        }>;
        key: import("zod").ZodDefault<import("zod").ZodString>;
        header: import("zod").ZodDefault<import("zod").ZodString>;
        width: import("zod").ZodOptional<import("zod").ZodNumber>;
        options: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodObject<{
            value: import("zod").ZodString;
            label: import("zod").ZodString;
        }, import("zod/v4/core").$strip>>>;
    }, import("zod/v4/core").$strip>>>;
    data: import("zod").ZodDefault<import("zod").ZodArray<import("zod").ZodObject<{
        id: import("zod").ZodString;
        values: import("zod").ZodArray<import("zod").ZodUnion<readonly [import("zod").ZodString, import("zod").ZodNumber]>>;
    }, import("zod/v4/core").$strip>>>;
}, import("zod/v4/core").$strip>>;
//# sourceMappingURL=index.d.ts.map