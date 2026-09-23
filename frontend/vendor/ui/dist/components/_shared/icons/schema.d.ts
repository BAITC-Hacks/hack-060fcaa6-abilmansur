import { z } from "zod/v4";
/**
 * The icon wire contract shared by every surface that embeds an `Icon`
 * (chat + dashboard `Icon` components). Field order is wire-load-bearing
 * (inv-lang binds positionally): `name` first, `category` second — never
 * reorder.
 *
 * Report/presentation blocks intentionally use a flat `iconName` field
 * instead (it shipped positionally before this schema existed here).
 */
export declare const iconPropsSchema: z.ZodObject<{
    name: z.ZodString;
    category: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type IconProps = z.infer<typeof iconPropsSchema>;
//# sourceMappingURL=schema.d.ts.map