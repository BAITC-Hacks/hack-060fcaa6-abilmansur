import { z } from "zod/v4";
export declare const CalloutSchema: z.ZodObject<{
    variant: z.ZodEnum<{
        error: "error";
        neutral: "neutral";
        info: "info";
        warning: "warning";
        success: "success";
    }>;
    title: z.ZodString;
    description: z.ZodString;
    visible: z.ZodType<import("@inv/lang-core").StateField<boolean | undefined>, unknown, z.core.$ZodTypeInternals<import("@inv/lang-core").StateField<boolean | undefined>, unknown>>;
}, z.core.$strip>;
//# sourceMappingURL=schema.d.ts.map