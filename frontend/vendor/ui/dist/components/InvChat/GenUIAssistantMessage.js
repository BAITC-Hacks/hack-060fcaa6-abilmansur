"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { useThread } from "@inv/headless";
import { BuiltinActionType, Renderer } from "@inv/lang";
import { useCallback, useMemo } from "react";
import { getLastAssistantMessageId } from "../../utils/messages";
import { separateContentAndContext, wrapContent, wrapContentWithHeader, wrapContext, } from "../../utils/sentinelParser";
import { AssistantMessageContainer } from "./AssistantMessageContainer";
/** Renders the Inv-Lang response for one assistant message. */
export const GenUIAssistantMessage = ({ message, library, }) => {
    const messages = useThread((s) => s.messages);
    const isRunning = useThread((s) => s.isRunning);
    const processMessage = useThread((s) => s.processMessage);
    const updateMessage = useThread((s) => s.updateMessage);
    const lastAssistantId = useMemo(() => getLastAssistantMessageId(messages), [messages]);
    const isStreaming = isRunning && lastAssistantId === message.id;
    // Strip the inline sentinels and separate any persisted form-state.
    const { content, contextString, contentHeader } = useMemo(() => message.content
        ? separateContentAndContext(message.content)
        : { content: null, contextString: null, contentHeader: undefined }, [message.content]);
    const initialState = useMemo(() => {
        if (!contextString)
            return undefined;
        try {
            const parsed = JSON.parse(contextString);
            if (Array.isArray(parsed) && typeof parsed[0] === "object")
                return parsed[0];
            if (typeof parsed === "object" && !Array.isArray(parsed))
                return parsed;
            return undefined;
        }
        catch {
            return undefined;
        }
    }, [contextString]);
    // Persist form state into the inline-wrapped message content. The original
    // header line (which may include `libraryVersion` and telemetry tags emitted
    // by the backend) is reused so attrs survive the persist round-trip.
    const handleStateUpdate = useCallback((state) => {
        const hasState = Object.keys(state).length > 0;
        const contentPart = wrapContentWithHeader(content ?? "", contentHeader);
        const fullMessage = hasState
            ? contentPart + wrapContext(JSON.stringify([state]))
            : contentPart;
        updateMessage({ ...message, content: fullMessage });
    }, [updateMessage, message, content, contentHeader]);
    // Build LLM-friendly message from action + form state, then dispatch
    const handleAction = useCallback((event) => {
        if (event.type === BuiltinActionType.ContinueConversation) {
            const contentPart = event.humanFriendlyMessage
                ? wrapContent(event.humanFriendlyMessage)
                : "";
            const messageCtx = [`User clicked: ${event.humanFriendlyMessage}`];
            if (event.formState) {
                messageCtx.push(event.formState);
            }
            const contextPart = wrapContext(JSON.stringify(messageCtx));
            const llmMessage = `${contentPart}${contextPart}`;
            processMessage({
                role: "user",
                content: llmMessage,
            });
        }
        else if (event.type === BuiltinActionType.OpenUrl) {
            const url = event.params?.["url"];
            if (typeof window !== "undefined" && url) {
                window.open(url, "_blank");
            }
        }
    }, [processMessage]);
    return (_jsx(AssistantMessageContainer, { children: content && (_jsx(Renderer, { response: content, library: library, isStreaming: isStreaming, onAction: handleAction, onStateUpdate: handleStateUpdate, initialState: initialState })) }));
};
//# sourceMappingURL=GenUIAssistantMessage.js.map