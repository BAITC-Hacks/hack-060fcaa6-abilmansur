import { type ChatProviderProps } from "@inv/headless";
import type { Library } from "@inv/lang";
import { type FC, type ReactNode } from "react";
import type { ScrollVariant } from "../../hooks/useScrollToBottom";
import type { ConversationStarterProps } from "../../types/ConversationStarter";
import { type ThemeProps } from "../ThemeProvider";
import { type AgentInterfaceLabels } from "./_shared/labelsContext";
import type { AssistantMessageComponent, ToolCallTimelineComponent, UserMessageComponent } from "./_shared/types";
import { ArtifactNav } from "./ArtifactNav";
import { Composer } from "./Composer";
import { type ConversationStarterVariant } from "./ConversationStarter";
import { MobileHeader } from "./MobileHeader";
import { NewChatButton } from "./NewChatButton";
import { Route } from "./Route";
import { SidebarContent, SidebarHeader, SidebarSeparator } from "./Sidebar";
import { SidebarItem } from "./SidebarItem";
import { SidebarSlot } from "./SidebarSlot";
import { MessageLoading, Messages, ScrollArea, ThreadHeader } from "./Thread";
import { ThreadList } from "./ThreadList";
import { WelcomeGlow } from "./WelcomeGlow";
import { WelcomeScreen } from "./WelcomeScreen";
import { Workspace } from "./Workspace";
export interface AgentInterfaceComponents {
    AssistantMessage?: AssistantMessageComponent;
    UserMessage?: UserMessageComponent;
    /** Replaces the built-in turn-level tool activity timeline. */
    ToolCallTimeline?: ToolCallTimelineComponent;
}
export interface AgentInterfaceProps extends Omit<ChatProviderProps, "children"> {
    /** Component library for auto-GenUI rendering when `components.AssistantMessage` is not provided. */
    componentLibrary?: Library;
    /** Explicit component overrides. Takes precedence over GenUI auto-derivation. */
    components?: AgentInterfaceComponents;
    /** Theme props passed to <ThemeProvider>. */
    theme?: ThemeProps;
    /** When true, skips wrapping in <ThemeProvider>. */
    disableThemeProvider?: boolean;
    /** Brand logo shown in default SidebarHeader + MobileHeader. */
    logoUrl?: string;
    /** Agent display name. */
    agentName?: string;
    /** Consumer-overridable display strings for the artifact browser + workspace. */
    labels?: AgentInterfaceLabels;
    /** Global starters inherited by Welcome (when active) or Composer. */
    starters?: ConversationStarterProps[];
    /** Layout variant for inherited starters. */
    starterVariant?: ConversationStarterVariant;
    /** Controlled current path. Pair with `onNavigate`. `undefined` = thread view. */
    path?: string;
    /** Initial path for uncontrolled mode. Ignored when `onNavigate` is provided. */
    defaultPath?: string;
    /** Called when navigation occurs. Presence selects controlled mode. */
    onNavigate?: (next: string | undefined) => void;
    /**
     * How the thread scrolls as messages stream in.
     * `"always"` follows the streaming response to the bottom (until the user scrolls up);
     * `"user-message-anchor"` (default) pins the latest user message to the top.
     */
    scrollVariant?: ScrollVariant;
    /** When false, the thread does not auto-scroll on load / conversation switch (auto-scroll only while generating). Default true. */
    scrollOnLoad?: boolean;
    children?: ReactNode;
}
interface AgentInterfaceComponent extends FC<AgentInterfaceProps> {
    Sidebar: typeof SidebarSlot;
    SidebarHeader: typeof SidebarHeader;
    SidebarContent: typeof SidebarContent;
    SidebarSeparator: typeof SidebarSeparator;
    SidebarItem: typeof SidebarItem;
    ArtifactNav: typeof ArtifactNav;
    Workspace: typeof Workspace;
    Route: typeof Route;
    MobileHeader: typeof MobileHeader;
    ThreadHeader: typeof ThreadHeader;
    Welcome: typeof WelcomeScreen;
    WelcomeGlow: typeof WelcomeGlow;
    Composer: typeof Composer;
    NewChatButton: typeof NewChatButton;
    ThreadList: typeof ThreadList;
    Messages: typeof Messages;
    MessageLoading: typeof MessageLoading;
    ScrollArea: typeof ScrollArea;
}
export declare const AgentInterface: AgentInterfaceComponent;
export {};
//# sourceMappingURL=AgentInterface.d.ts.map