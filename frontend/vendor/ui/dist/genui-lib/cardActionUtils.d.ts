import type { ActionPlan } from "@inv/lang";
export type LegacyCardAction = {
    type: string;
    params: Record<string, unknown>;
};
/**
 * Merge per-item click context (itemIndex, itemId, itemTitle, ...) into a card
 * block's `action` prop. Item context wins on
 * key clash.
 *
 * - Legacy `{ type?, params? }` (and the bare `{ url }` / `{ context }` shapes):
 *   returns `{ type, params }` with url/context/params and item context merged.
 * - `ActionPlan` (`{ steps }`): returns a copy whose ToAssistant steps get the
 *   item context appended to their `context` string (react-lang forwards only
 *   `step.context` to the host for that step type); other steps untouched.
 * - `undefined`: returns a ContinueConversation action carrying the item context.
 */
export declare function withItemContext(action: unknown, itemContext: Record<string, unknown>): ActionPlan | LegacyCardAction;
//# sourceMappingURL=cardActionUtils.d.ts.map