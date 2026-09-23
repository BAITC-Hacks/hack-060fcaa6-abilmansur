import { z } from "zod/v4";
export declare const RadialChartSchema: z.ZodObject<{
    labels: z.ZodArray<z.ZodString>;
    values: z.ZodArray<z.ZodNumber>;
}, z.core.$strip>;
export declare const RadialChart: import("@inv/lang").DefinedComponent<z.ZodObject<{
    labels: z.ZodArray<z.ZodString>;
    values: z.ZodArray<z.ZodNumber>;
}, z.core.$strip>>;
//# sourceMappingURL=RadialChart.d.ts.map