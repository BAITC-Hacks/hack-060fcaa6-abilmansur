import { z } from "zod/v4";
export declare const ButtonSchema: z.ZodObject<{
    label: z.ZodString;
    action: z.ZodOptional<z.ZodUnion<readonly [z.ZodObject<{
        type: z.ZodLiteral<"open_url">;
        url: z.ZodString;
    }, z.core.$strip>, z.ZodObject<{
        type: z.ZodLiteral<"continue_conversation">;
        context: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>, z.ZodObject<{
        type: z.ZodString;
        params: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    }, z.core.$strip>]>>;
    variant: z.ZodOptional<z.ZodEnum<{
        primary: "primary";
        secondary: "secondary";
        tertiary: "tertiary";
    }>>;
    type: z.ZodOptional<z.ZodEnum<{
        normal: "normal";
        destructive: "destructive";
    }>>;
    size: z.ZodOptional<z.ZodEnum<{
        small: "small";
        "extra-small": "extra-small";
        medium: "medium";
        large: "large";
    }>>;
}, z.core.$strip>;
//# sourceMappingURL=schema.d.ts.map