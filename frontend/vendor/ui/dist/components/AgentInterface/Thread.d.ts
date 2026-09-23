import type { Message } from "@inv/headless";
import React from "react";
import { ScrollVariant } from "../../hooks/useScrollToBottom";
import type { AssistantMessageComponent, ToolCallTimelineComponent, UserMessageComponent } from "./_shared/types";
export declare const ThreadContainer: ({ children, className, }: {
    children?: React.ReactNode;
    className?: string;
}) => React.JSX.Element;
export declare const ScrollArea: ({ children, className, scrollVariant, userMessageSelector, scrollOnLoad, }: {
    children?: React.ReactNode;
    className?: string;
    /**
     * Scroll to bottom once the last message is added
     */
    scrollVariant?: ScrollVariant;
    /**
     * Selector for the user message
     */
    userMessageSelector?: string;
    /**
     * When false, do not auto-scroll on initial load / conversation switch
     * (auto-scroll then only happens while a response is generating).
     */
    scrollOnLoad?: boolean;
}) => React.JSX.Element;
export declare const AssistantMessageContainer: ({ children, className, }: {
    children?: React.ReactNode;
    className?: string;
}) => React.JSX.Element;
export declare const UserMessageContainer: ({ children, className, }: {
    children?: React.ReactNode;
    className?: string;
}) => React.JSX.Element;
export declare const RenderMessage: React.MemoExoticComponent<({ message, className, allMessages, assistantMessage: CustomAssistantMessage, userMessage: CustomUserMessage, isStreaming, isLast, }: {
    message: Message;
    className?: string;
    allMessages: Message[];
    assistantMessage?: AssistantMessageComponent;
    userMessage?: UserMessageComponent;
    isStreaming: boolean;
    /** Whether this is the last *assistant* message (drives the running shimmer). */
    isLast: boolean;
}) => React.JSX.Element | null>;
export declare const MessageLoading: () => React.JSX.Element;
export declare const ThreadError: () => React.JSX.Element | null;
export declare const Messages: ({ className, loader, assistantMessage, userMessage, toolCallTimeline, }: {
    className?: string;
    loader?: React.ReactNode;
    assistantMessage?: AssistantMessageComponent;
    userMessage?: UserMessageComponent;
    toolCallTimeline?: ToolCallTimelineComponent;
}) => React.JSX.Element;
export declare const ThreadHeader: ({ children, className, }: {
    children?: React.ReactNode;
    className?: string;
}) => React.JSX.Element;
export { Composer } from "./components";
//# sourceMappingURL=Thread.d.ts.map