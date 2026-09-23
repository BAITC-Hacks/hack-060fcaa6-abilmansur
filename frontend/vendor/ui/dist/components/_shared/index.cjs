Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
require("../../chunk-CKQMccvm.cjs");
const require_store = require("../../store-Ba3AZJcS.cjs");
const require_TimelineEntry = require("../../TimelineEntry-Bcs12tlk.cjs");
const require_usePinnableTooltip = require("../../usePinnableTooltip-CHTGA15A.cjs");
const require_IconWrapper = require("../../IconWrapper-CWrIgsEo.cjs");
const require_utils = require("../../utils-DcYdyqC-.cjs");
let react = require("react");
let react_jsx_runtime = require("react/jsx-runtime");
let _invdev_react_headless = require("@inv/headless");
let zod_v4 = require("zod/v4");
//#region src/components/_shared/tool-renderer/ToolCallEntry.tsx
const propsEqual = (a, b) => a.activity.status === b.activity.status && a.activity.toolCall.function.arguments === b.activity.toolCall.function.arguments && a.activity.result === b.activity.result && a.activity.isError === b.activity.isError && a.isLast === b.isLast && a.detailedViewPanel === b.detailedViewPanel;
/**
* Renders one tool call: a matched artifact renderer (exact → RegExp → `"*"`)
* **xor** the batteries-included {@link DefaultToolCard} — never both. The
* single render path that replaces the copy-pasted call-card + result-renderer
* blocks across the thread components. Memoized so it only re-renders when the
* activity actually changes.
*
* @category Components
*/
const ToolCallEntry = (0, react.memo)(function ToolCallEntry({ activity, isLast = false, detailedViewPanel }) {
	const renderer = (0, _invdev_react_headless.useArtifactRenderer)(activity.toolName);
	const defaultCard = /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_TimelineEntry.DefaultToolCard, {
		activity,
		isLast,
		isRunning: (0, _invdev_react_headless.useThread)((s) => s.isRunning)
	});
	if (!renderer) return defaultCard;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_TimelineEntry.ToolActivityRenderer, {
		renderer,
		activity,
		detailedViewPanel,
		fallback: defaultCard
	});
}, propsEqual);
//#endregion
//#region src/components/_shared/tool-renderer/ToolMessageRenderer.tsx
/**
* Dispatches a tool call to a matching renderer, else renders `fallback`.
*
* @deprecated Prefer `useToolActivities` + `<ToolCallEntry>` / `<ToolCallTimeline>`,
* which pair calls↔results by id, carry real status, and render the matched
* renderer xor the default card. This wrapper now builds a single
* {@link ToolActivity} from `toolCall`/`toolMessage` and delegates to
* {@link ToolActivityRenderer}, so existing imports keep working.
*
* @category Components
*/
const ToolMessageRenderer = ({ toolMessage, toolCall, fallback, detailedViewPanel }) => {
	const renderer = (0, _invdev_react_headless.useArtifactRenderer)(toolCall.function.name);
	if (!renderer) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(react_jsx_runtime.Fragment, { children: fallback });
	const [activity] = (0, _invdev_react_headless.pairToolActivity)({
		id: `__tool_message_renderer__${toolCall.id}`,
		role: "assistant",
		content: "",
		toolCalls: [toolCall]
	}, toolMessage ? [toolMessage] : []);
	if (!activity) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(react_jsx_runtime.Fragment, { children: fallback });
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_TimelineEntry.ToolActivityRenderer, {
		renderer,
		activity,
		detailedViewPanel
	});
};
//#endregion
//#region src/components/_shared/icons/schema.ts
/**
* The icon wire contract shared by every surface that embeds an `Icon`
* (chat + dashboard `Icon` components). Field order is wire-load-bearing
* (inv-lang binds positionally): `name` first, `category` second — never
* reorder.
*
* Report/presentation blocks intentionally use a flat `iconName` field
* instead (it shipped positionally before this schema existed here).
*/
const iconPropsSchema = zod_v4.z.object({
	name: zod_v4.z.string().describe("lucide-react icon name in kebab-case (e.g. 'circle-check', 'rocket')."),
	category: zod_v4.z.string().optional().describe("Optional icon category (e.g. 'finance', 'charts', 'security', 'travel', 'people', 'time') used to pick a topical fallback icon when `name` doesn't resolve.")
});
//#endregion
exports.IconWrapper = require_IconWrapper.IconWrapper;
exports.ShellStoreContext = require_store.ShellStoreContext;
exports.ShellStoreProvider = require_store.ShellStoreProvider;
exports.TimelineEntry = require_TimelineEntry.TimelineEntry;
exports.ToolActivityRenderer = require_TimelineEntry.ToolActivityRenderer;
exports.ToolCallEntry = ToolCallEntry;
exports.ToolCallErrorFallback = require_TimelineEntry.ToolCallErrorFallback;
exports.ToolMessageRenderer = ToolMessageRenderer;
exports.createShellStore = require_store.createShellStore;
exports.iconPropsSchema = iconPropsSchema;
exports.isChatEmpty = require_utils.isChatEmpty;
exports.safeOpenUrl = require_utils.safeOpenUrl;
exports.safeUrl = require_utils.safeUrl;
exports.toCssUrl = require_utils.toCssUrl;
exports.useId = require_usePinnableTooltip.useId;
exports.usePinnableTooltip = require_usePinnableTooltip.usePinnableTooltip;
exports.useShellStore = require_store.useShellStore;

//# sourceMappingURL=index.cjs.map