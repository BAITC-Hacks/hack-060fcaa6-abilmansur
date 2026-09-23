import { z } from "zod/v4";
export declare const EditableTableSchema: z.ZodObject<{
    name: z.ZodDefault<z.ZodString>;
    columns: z.ZodDefault<z.ZodArray<z.ZodObject<{
        type: z.ZodEnum<{
            number: "number";
            select: "select";
            text: "text";
            url: "url";
            "date-single": "date-single";
        }>;
        key: z.ZodDefault<z.ZodString>;
        header: z.ZodDefault<z.ZodString>;
        width: z.ZodOptional<z.ZodNumber>;
        options: z.ZodOptional<z.ZodArray<z.ZodObject<{
            value: z.ZodString;
            label: z.ZodString;
        }, z.core.$strip>>>;
    }, z.core.$strip>>>;
    data: z.ZodDefault<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        values: z.ZodArray<z.ZodUnion<readonly [z.ZodString, z.ZodNumber]>>;
    }, z.core.$strip>>>;
}, z.core.$strip>;
export type EditableTableProps = z.infer<typeof EditableTableSchema>;
export type EditableTableDataRow = {
    id: string;
    values: (string | number)[];
};
export type EditableTableData = EditableTableDataRow[];
//# sourceMappingURL=schema.d.ts.map