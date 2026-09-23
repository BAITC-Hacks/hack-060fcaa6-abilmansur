import { z } from "zod/v4";
export declare const BarChartCondensedSchema: z.ZodObject<{
    labels: z.ZodArray<z.ZodString>;
    series: z.ZodArray<z.ZodObject<{
        category: z.ZodString;
        values: z.ZodArray<z.ZodNumber>;
    }, z.core.$strip>>;
    variant: z.ZodOptional<z.ZodEnum<{
        stacked: "stacked";
        grouped: "grouped";
    }>>;
    xLabel: z.ZodOptional<z.ZodString>;
    yLabel: z.ZodOptional<z.ZodString>;
    height: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
export declare const BarChartCondensed: import("@inv/lang").DefinedComponent<z.ZodObject<{
    labels: z.ZodArray<z.ZodString>;
    series: z.ZodArray<z.ZodObject<{
        category: z.ZodString;
        values: z.ZodArray<z.ZodNumber>;
    }, z.core.$strip>>;
    variant: z.ZodOptional<z.ZodEnum<{
        stacked: "stacked";
        grouped: "grouped";
    }>>;
    xLabel: z.ZodOptional<z.ZodString>;
    yLabel: z.ZodOptional<z.ZodString>;
    height: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>>;
//# sourceMappingURL=BarChartCondensed.d.ts.map