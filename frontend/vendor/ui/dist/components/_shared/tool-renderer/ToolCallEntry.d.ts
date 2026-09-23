import { type ToolActivity } from "@inv/headless";
import { type ToolDetailedViewPanel } from "./ToolActivityRenderer";
export interface ToolCallEntryProps {
    activity: ToolActivity;
    /** Whether this entry belongs to the live (last assistant) message — drives the running shimmer. */
    isLast?: boolean;
    /** Optional detailed-view panel for matched renderers (defaults to the shared one). */
    detailedViewPanel?: ToolDetailedViewPanel;
}
/**
 * Renders one tool call: a matched artifact renderer (exact → RegExp → `"*"`)
 * **xor** the batteries-included {@link DefaultToolCard} — never both. The
 * single render path that replaces the copy-pasted call-card + result-renderer
 * blocks across the thread components. Memoized so it only re-renders when the
 * activity actually changes.
 *
 * @category Components
 */
export declare const ToolCallEntry: import("react").NamedExoticComponent<ToolCallEntryProps>;
//# sourceMappingURL=ToolCallEntry.d.ts.map