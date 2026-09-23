import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { pairToolActivity, useArtifactRenderer, } from "@inv/headless";
import { ToolActivityRenderer } from "./ToolActivityRenderer";
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
export const ToolMessageRenderer = ({ toolMessage, toolCall, fallback, detailedViewPanel, }) => {
    const renderer = useArtifactRenderer(toolCall.function.name);
    if (!renderer)
        return _jsx(_Fragment, { children: fallback });
    const syntheticAssistant = {
        id: `__tool_message_renderer__${toolCall.id}`,
        role: "assistant",
        content: "",
        toolCalls: [toolCall],
    };
    const [activity] = pairToolActivity(syntheticAssistant, toolMessage ? [toolMessage] : []);
    if (!activity)
        return _jsx(_Fragment, { children: fallback });
    return (_jsx(ToolActivityRenderer, { renderer: renderer, activity: activity, detailedViewPanel: detailedViewPanel }));
};
//# sourceMappingURL=ToolMessageRenderer.js.map