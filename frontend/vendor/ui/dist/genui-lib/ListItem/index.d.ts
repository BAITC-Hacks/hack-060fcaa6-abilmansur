import { z } from "zod/v4";
export declare const ListItem: import("@inv/lang").DefinedComponent<z.ZodObject<{
    title: z.ZodString;
    subtitle: z.ZodOptional<z.ZodString>;
    image: z.ZodOptional<z.ZodObject<{
        src: z.ZodString;
        alt: z.ZodString;
    }, z.core.$strip>>;
    actionLabel: z.ZodOptional<z.ZodString>;
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
}, z.core.$strip>>;
//# sourceMappingURL=index.d.ts.map