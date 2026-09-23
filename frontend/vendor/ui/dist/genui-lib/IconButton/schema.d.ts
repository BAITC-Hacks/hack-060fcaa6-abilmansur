import { z } from "zod/v4";
export declare const IconButtonSchema: z.ZodObject<{
    name: z.ZodString;
    icon: z.core.$ZodType<import("@inv/lang-core").SubComponentOf<{
        name: string;
        category?: string | undefined;
    }>, unknown, z.core.$ZodTypeInternals<import("@inv/lang-core").SubComponentOf<{
        name: string;
        category?: string | undefined;
    }>, unknown>>;
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
    size: z.ZodOptional<z.ZodEnum<{
        small: "small";
        "extra-small": "extra-small";
        medium: "medium";
        large: "large";
    }>>;
    shape: z.ZodOptional<z.ZodEnum<{
        circle: "circle";
        square: "square";
    }>>;
}, z.core.$strip>;
export type IconButtonProps = z.infer<typeof IconButtonSchema>;
//# sourceMappingURL=schema.d.ts.map