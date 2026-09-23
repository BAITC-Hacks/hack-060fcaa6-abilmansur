import { z } from "zod/v4";
export declare const MetricIndicatorTrendSchema: z.ZodObject<{
    direction: z.ZodEnum<{
        up: "up";
        down: "down";
    }>;
    value: z.ZodNumber;
}, z.core.$strip>;
export declare const MetricIndicatorWithStrikethroughSchema: z.ZodObject<{
    value: z.ZodString;
    subtext: z.ZodOptional<z.ZodString>;
    previousValue: z.ZodOptional<z.ZodString>;
    trend: z.ZodOptional<z.ZodObject<{
        direction: z.ZodEnum<{
            up: "up";
            down: "down";
        }>;
        value: z.ZodNumber;
    }, z.core.$strip>>;
}, z.core.$strip>;
export declare const MetricIndicatorInlineSchema: z.ZodObject<{
    value: z.ZodString;
    subtext: z.ZodOptional<z.ZodString>;
    trend: z.ZodOptional<z.ZodObject<{
        direction: z.ZodEnum<{
            up: "up";
            down: "down";
        }>;
        value: z.ZodNumber;
    }, z.core.$strip>>;
}, z.core.$strip>;
export type MetricIndicatorTrend = z.infer<typeof MetricIndicatorTrendSchema>;
export type MetricIndicatorWithStrikethroughProps = z.infer<typeof MetricIndicatorWithStrikethroughSchema>;
export type MetricIndicatorInlineProps = z.infer<typeof MetricIndicatorInlineSchema>;
//# sourceMappingURL=schema.d.ts.map