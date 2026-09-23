import type { SubComponentOf } from "@inv/lang";
import { z } from "zod/v4";
import type { TagSchema } from "./Tag";
type TagProps = z.infer<typeof TagSchema>;
/** Renders a `Tag` element ref (as used inside card blocks) at the small size. */
export declare function renderCardTag(tag: SubComponentOf<TagProps> | undefined, key?: string): import("react").JSX.Element | null;
export {};
//# sourceMappingURL=cardTagUtils.d.ts.map