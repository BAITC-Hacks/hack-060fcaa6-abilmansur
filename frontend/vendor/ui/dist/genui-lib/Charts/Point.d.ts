import { z } from "zod/v4";
export declare const PointSchema: z.ZodObject<{
    x: z.ZodNumber;
    y: z.ZodNumber;
    z: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
export declare const Point: import("@inv/lang").DefinedComponent<z.ZodObject<{
    x: z.ZodNumber;
    y: z.ZodNumber;
    z: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>>;
//# sourceMappingURL=Point.d.ts.map