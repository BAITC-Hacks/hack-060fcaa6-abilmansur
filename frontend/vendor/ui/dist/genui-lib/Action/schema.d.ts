import { z } from "zod/v4";
/**
 * Shared action prop schema.
 *
 * Tagged as `ActionExpression` so the local react-lang prompt renders the v0.5
 * `Action([@steps...])` expression syntax. The JSON schema (used by `inv
 * generate` and cloud/muse prompt rendering) carries the legacy object
 * contract, which react-lang also accepts at runtime (legacy action path).
 */
export declare const actionPropSchema: z.ZodUnion<readonly [z.ZodObject<{
    type: z.ZodLiteral<"open_url">;
    url: z.ZodString;
}, z.core.$strip>, z.ZodObject<{
    type: z.ZodLiteral<"continue_conversation">;
    context: z.ZodOptional<z.ZodString>;
}, z.core.$strip>, z.ZodObject<{
    type: z.ZodString;
    params: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
}, z.core.$strip>]>;
//# sourceMappingURL=schema.d.ts.map