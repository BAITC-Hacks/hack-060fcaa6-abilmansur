import { z } from "zod/v4";
export { StepsItemSchema } from "./schema";
export declare const StepsItem: import("@inv/lang").DefinedComponent<z.ZodObject<{
    title: z.ZodString;
    details: z.ZodString;
}, z.core.$strip>>;
export declare const Steps: import("@inv/lang").DefinedComponent<z.ZodObject<{
    items: z.ZodArray<z.core.$ZodType<import("@inv/lang-core").SubComponentOf<{
        title: string;
        details: string;
    }>, unknown, z.core.$ZodTypeInternals<import("@inv/lang-core").SubComponentOf<{
        title: string;
        details: string;
    }>, unknown>>>;
}, z.core.$strip>>;
//# sourceMappingURL=index.d.ts.map