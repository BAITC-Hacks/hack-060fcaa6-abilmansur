import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { MessageProvider, useActiveDetailedView, useArtifactList, useArtifactRendererRegistry, useThread, useToolActivities, } from "@inv/headless";
import clsx from "clsx";
import { memo, useId, useMemo, useRef } from "react";
import { useLayoutContext } from "../../context/LayoutContext";
import { useScrollToBottom } from "../../hooks/useScrollToBottom";
import { getLastAssistantMessageId, getMatchedRendererActivities } from "../../utils/messages";
import { hasLangSyntax, separateContentAndContext } from "../../utils/sentinelParser";
import { ToolCallTimeline } from "../ToolCall";
import { DetailedViewOverlay, DetailedViewPanel, DetailedViewPortalTarget, } from "./_shared/detailed-view";
import { useAgentInterfaceLabels } from "./_shared/labelsContext";
import { useAgentInterfaceStore } from "./_shared/store";
import { TimelineEntry } from "./_shared/tool-renderer";
import { Callout } from "../Callout";
import { DotMatrixLoader } from "../DotMatrixLoader";
import { IconButton } from "../IconButton";
import { MarkDownRenderer } from "../MarkDownRenderer";
import { AgentInterfaceTooltip } from "./_shared/AgentInterfaceTooltip";
import { GalleryHorizontalEndIcon } from "./_shared/GalleryHorizontalEndIcon";
import { AmbientLoader } from "./components/AmbientLoader";
import { ScrollToLatest } from "./components/ScrollToLatest";
import { ResizableSeparator } from "./ResizableSeparator";
import { useDetailedViewResize } from "./useDetailedViewResize";
import { UserMessageContent } from "./UserMessageContent";
export const ThreadContainer = ({ children, className, }) => {
    const { layout } = useLayoutContext();
    const isMobile = layout === "mobile";
    const { isDetailedViewActive } = useActiveDetailedView();
    const { setIsSidebarOpen } = useAgentInterfaceStore((state) => ({
        setIsSidebarOpen: state.setIsSidebarOpen,
    }));
    const isLoadingMessages = useThread((s) => s.isLoadingMessages);
    const { containerRef, chatPanelRef, detailedViewPanelRef, isDragging, handleResize, handleResizeStep, handleDragStart, handleDragEnd, getResizeAria, } = useDetailedViewResize({
        isDetailedViewActive,
        isMobile,
        setIsSidebarOpen,
    });
    const chatPanelId = useId();
    const detailPanelId = useId();
    return (_jsxs("div", { className: clsx("inv-agent-thread-container", className, {
            "inv-agent-thread-container--detailed-view-active": isDetailedViewActive,
        }), style: {
            visibility: isLoadingMessages ? "hidden" : undefined,
        }, children: [isLoadingMessages && (_jsx(AmbientLoader, { className: "inv-agent-thread-container__loading", label: "Loading conversation\u2026" })), _jsxs("div", { className: "inv-agent-thread-wrapper", ref: containerRef, children: [_jsxs("div", { ref: chatPanelRef, id: chatPanelId, className: clsx("inv-agent-thread-chat-panel", {
                            "inv-agent-thread-chat-panel--animating": !isDragging,
                        }), children: [children, isMobile && _jsx(DetailedViewOverlay, {})] }), !isMobile && isDetailedViewActive && (_jsxs(_Fragment, { children: [_jsx(ResizableSeparator, { onResize: handleResize, onResizeStep: handleResizeStep, onDragStart: handleDragStart, onDragEnd: handleDragEnd, getAriaValues: getResizeAria, controlsId: `${chatPanelId} ${detailPanelId}`, ariaLabel: "Resize chat panel" }), _jsx("div", { ref: detailedViewPanelRef, id: detailPanelId, className: clsx("inv-agent-thread-detailed-view-panel", {
                                    "inv-agent-thread-detailed-view-panel--animating": !isDragging,
                                }), children: _jsx(DetailedViewPortalTarget, {}) })] }))] })] }));
};
export const ScrollArea = ({ children, className, scrollVariant = "user-message-anchor", userMessageSelector = ".inv-agent-thread-message-user, .inv-shell-thread-message-user", scrollOnLoad = true, }) => {
    const ref = useRef(null);
    const messages = useThread((s) => s.messages);
    const isRunning = useThread((s) => s.isRunning);
    const isLoadingMessages = useThread((s) => s.isLoadingMessages);
    useScrollToBottom({
        ref,
        lastMessage: messages[messages.length - 1] || { id: "" },
        scrollVariant,
        userMessageSelector,
        isRunning,
        isLoadingMessages,
        scrollOnLoad,
    });
    return (_jsxs("div", { className: "inv-agent-thread-scroll-container", children: [_jsx("div", { ref: ref, className: clsx("inv-agent-thread-scroll-area", {
                    "inv-agent-thread-scroll-area--user-message-anchor": scrollVariant === "user-message-anchor",
                }, className), children: children }), _jsx(ScrollToLatest, { scrollRef: ref })] }));
};
export const AssistantMessageContainer = ({ children, className, }) => {
    return (_jsx("div", { className: clsx("inv-agent-thread-message-assistant", className), children: _jsx("div", { className: "inv-agent-thread-message-assistant__content", children: children }) }));
};
export const UserMessageContainer = ({ children, className, }) => {
    return (_jsx("div", { className: clsx("inv-agent-thread-message-user", className), children: _jsx("div", { className: "inv-agent-thread-message-user__content", children: children }) }));
};
const AssistantMessageContent = ({ message, allMessages, isLast, }) => {
    // One id-keyed pairing of calls↔results with real status — no positional break,
    // no grouped-not-paired flow, running state from the data.
    const activities = useToolActivities(message, allMessages);
    return (_jsxs(_Fragment, { children: [message.content && (_jsx(MarkDownRenderer, { textMarkdown: message.content, className: "inv-agent-thread-message-assistant__text" })), activities.map((activity, idx) => (_jsx(TimelineEntry, { activity: activity, isLast: isLast && idx === activities.length - 1, detailedViewPanel: DetailedViewPanel }, activity.id)))] }));
};
export const RenderMessage = memo(({ message, className, allMessages, assistantMessage: CustomAssistantMessage, userMessage: CustomUserMessage, isStreaming, isLast, }) => {
    if (message.role === "tool") {
        // Tool messages are rendered inline with their parent assistant message
        return null;
    }
    if (message.role === "assistant") {
        if (CustomAssistantMessage) {
            return _jsx(CustomAssistantMessage, { message: message, isStreaming: isStreaming });
        }
        return (_jsx(AssistantMessageContainer, { className: className, children: _jsx(AssistantMessageContent, { message: message, allMessages: allMessages, isLast: isLast }) }));
    }
    if (message.role === "user") {
        if (CustomUserMessage) {
            return _jsx(CustomUserMessage, { message: message });
        }
        return (_jsx(UserMessageContainer, { className: className, children: _jsx(UserMessageContent, { message: message }) }));
    }
    // Other roles (system, developer, reasoning, activity) — skip by default
    return null;
});
export const MessageLoading = () => {
    return (_jsx("div", { className: "inv-agent-thread-message-loading", children: _jsx(DotMatrixLoader, { variant: "compact" }) }));
};
export const ThreadError = () => {
    const threadError = useThread((s) => s.threadError);
    if (!threadError)
        return null;
    return (_jsx("div", { className: "inv-agent-thread-error", children: _jsx(Callout, { variant: "danger", title: "Something went wrong", description: threadError.message || "An unexpected error occurred. Please try again." }) }));
};
/**
 * Groups a message list into turns: a run of consecutive assistant/tool
 * messages becomes ONE group; every other message (user, system, …) stands alone.
 * `startIndex` is the group's position in the original list.
 */
function groupIntoTurns(messages) {
    const groups = [];
    let current = null;
    messages.forEach((message, i) => {
        if (message.role === "assistant" || message.role === "tool") {
            if (!current) {
                current = { messages: [], startIndex: i };
                groups.push(current);
            }
            current.messages.push(message);
        }
        else {
            current = null;
            groups.push({ messages: [message], startIndex: i });
        }
    });
    return groups;
}
/**
 * A whole turn as one unit. Owned here rather than per-message
 * so the tray is a single element keyed by the turn's first segment ({@link Messages})
 */
const InterleavedTurn = ({ segments, allMessages, assistantMessage: CustomAssistantMessage, toolCallTimeline: CustomToolCallTimeline, className, isRunning, lastAssistantId, }) => {
    // Ignore trailing empty assistants (e.g. TEXT_MESSAGE_START after parallel
    // tools with no content yet / never). Those would become `last` and blank the
    // answer slot until a chat remount rebuilds from storage.
    const activeSegments = useMemo(() => {
        const withBody = segments.filter((s) => (s.content?.length ?? 0) > 0 || (s.toolCalls?.length ?? 0) > 0);
        return withBody.length > 0 ? withBody : segments;
    }, [segments]);
    const last = activeSegments[activeSegments.length - 1];
    const turnLive = isRunning && lastAssistantId === last.id;
    // One id-keyed pairing across every segment's tool calls (synthetic message).
    const turnMessage = useMemo(() => ({ ...activeSegments[0], toolCalls: activeSegments.flatMap((s) => s.toolCalls ?? []) }), [activeSegments]);
    const turnActivities = useToolActivities(turnMessage, allMessages);
    const lastContent = separateContentAndContext(last.content ?? "").content;
    // Show the last segment as the answer once it looks like Lang, or once the run
    // settles.
    const answer = !turnLive || hasLangSyntax(lastContent) ? last : null;
    const answerMessage = useMemo(() => (answer ? { ...answer, toolCalls: [] } : null), [answer]);
    // Rows in run order: each non-answer segment's thinking prose, then its tools.
    const steps = useMemo(() => {
        const byCallId = new Map(turnActivities.map((a) => [a.toolCall.id, a]));
        const rows = [];
        const claimed = new Set();
        for (const seg of activeSegments) {
            if (seg.id !== answer?.id) {
                const prose = separateContentAndContext(seg.content ?? "").content;
                if (prose)
                    rows.push({ type: "text", id: seg.id, text: prose });
            }
            for (const tc of seg.toolCalls ?? []) {
                const activity = byCallId.get(tc.id);
                if (activity) {
                    rows.push({ type: "activity", activity });
                    claimed.add(tc.id);
                }
            }
        }
        // Provider-executed tools (Inv Cloud reports, search, MCP) arrive as tool
        // results whose call sits on no assistant message, so `pairToolActivity`
        // synthesizes them as orphans. No segment claims those, and dropping them
        // both hid the activity and could leave `rows` empty while `turnActivities`
        // was not — which crashed the timeline. Append them in arrival order.
        for (const activity of turnActivities) {
            if (!claimed.has(activity.toolCall.id))
                rows.push({ type: "activity", activity });
        }
        return rows;
    }, [activeSegments, turnActivities, answer?.id]);
    // Matched renderers (artifact/search previews) render OUTSIDE the tray so
    // they stay visible after it collapses.
    const registry = useArtifactRendererRegistry();
    const matched = getMatchedRendererActivities(registry, turnActivities);
    // Hold the tray open until the answer's first tokens arrive. `answer` is
    // `last` or null, so reuse the already-parsed `lastContent`.
    const answerStarted = !!answer && lastContent.length > 0;
    return (_jsxs(_Fragment, { children: [turnActivities.length > 0 &&
                (CustomToolCallTimeline ? (_jsx(CustomToolCallTimeline, { activities: turnActivities, steps: steps, isLast: turnLive, awaitingResponse: turnLive && !answerStarted })) : (_jsx(ToolCallTimeline, { activities: turnActivities, steps: steps, isLast: turnLive, forceDefault: true, awaitingResponse: turnLive && !answerStarted }))), matched.map((activity) => (_jsx(TimelineEntry, { activity: activity, isLast: turnLive, fallbackToDefault: false }, activity.id))), answer && answerMessage && (_jsx(MessageProvider, { message: answerMessage, children: CustomAssistantMessage ? (_jsx(CustomAssistantMessage, { message: answerMessage, isStreaming: isRunning && lastAssistantId === answer.id })) : (_jsx(AssistantMessageContainer, { className: className, children: _jsx(AssistantMessageContent, { message: answerMessage, allMessages: allMessages, isLast: isRunning && lastAssistantId === answer.id }) })) }, answer.id))] }));
};
/** Renders one turn (a group from {@link groupIntoTurns}). */
const RenderGroup = ({ group, allMessages, assistantMessage: CustomAssistantMessage, toolCallTimeline, userMessage, className, isRunning, lastAssistantId, }) => {
    // A group is either a run of assistant/tool messages or one standalone
    // non-assistant message (user/system/…). The former is always one interleaved
    // turn, which owns the tool-call timeline (it reads `last` for the answer, so
    // a length-one assistant group works too); the latter renders on its own.
    const assistants = group.filter((m) => m.role === "assistant");
    const message = group[0];
    return assistants.length > 0 ? (_jsx(InterleavedTurn, { segments: assistants, allMessages: allMessages, assistantMessage: CustomAssistantMessage, toolCallTimeline: toolCallTimeline, className: className, isRunning: isRunning, lastAssistantId: lastAssistantId })) : (_jsx(MessageProvider, { message: message, children: _jsx(RenderMessage, { message: message, allMessages: allMessages, assistantMessage: CustomAssistantMessage, userMessage: userMessage, isStreaming: isRunning && message.id === lastAssistantId, isLast: message.id === lastAssistantId, className: className }) }, message.id));
};
export const Messages = ({ className, loader, assistantMessage, userMessage, toolCallTimeline, }) => {
    const messages = useThread((s) => s.messages);
    const isRunning = useThread((s) => s.isRunning);
    const threadError = useThread((s) => s.threadError);
    // Group the flat message list into turns ONCE per change; the arrays keep
    // their identity across unrelated re-renders.
    const groups = useMemo(() => groupIntoTurns(messages), [messages]);
    // Id of the last *assistant* message (not the last message) so the running
    // shimmer survives trailing tool messages.
    const lastAssistantId = useMemo(() => getLastAssistantMessageId(messages), [messages]);
    return (_jsxs("div", { className: clsx("inv-agent-thread-messages", className), children: [groups.map((group) => (_jsx(RenderGroup, { group: group.messages, allMessages: messages, assistantMessage: assistantMessage, userMessage: userMessage, toolCallTimeline: toolCallTimeline, className: className, isRunning: isRunning, lastAssistantId: lastAssistantId }, group.messages[0].id))), isRunning && _jsx("div", { children: loader }), !isRunning && threadError && _jsx(ThreadError, {})] }));
};
export const ThreadHeader = ({ children, className, }) => {
    return (_jsxs("div", { className: clsx("inv-agent-thread-header", className), children: [_jsx("div", { className: "inv-agent-thread-header__title" }), _jsxs("div", { className: "inv-agent-thread-header__actions", children: [children, _jsx(WorkspaceToggleButton, {})] })] }));
};
const WorkspaceToggleButton = () => {
    const artifacts = useArtifactList();
    const { isDetailedViewActive } = useActiveDetailedView();
    const { workspaceToggle } = useAgentInterfaceLabels();
    const { isWorkspaceOpen, setIsWorkspaceOpen } = useAgentInterfaceStore((state) => ({
        isWorkspaceOpen: state.isWorkspaceOpen,
        setIsWorkspaceOpen: state.setIsWorkspaceOpen,
    }));
    const hasArtifacts = Object.keys(artifacts).length > 0;
    if (!hasArtifacts || isDetailedViewActive)
        return null;
    return (_jsx(AgentInterfaceTooltip, { content: workspaceToggle, side: "left", children: _jsx(IconButton, { icon: _jsx(GalleryHorizontalEndIcon, { size: "1em" }), onClick: () => {
                if (hasArtifacts)
                    setIsWorkspaceOpen(!isWorkspaceOpen);
            }, size: "small", variant: "tertiary", "aria-label": isWorkspaceOpen ? "Collapse workspace" : "Expand workspace", className: "inv-agent-thread-header__workspace-toggle-button" }) }));
};
// Re-export Composer from components
export { Composer } from "./components";
//# sourceMappingURL=Thread.js.map