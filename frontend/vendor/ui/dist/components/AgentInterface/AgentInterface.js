import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ChatProvider, useActiveDetailedView, useArtifactList, useArtifactStorage, useThreadList, } from "@inv/headless";
import { ArrowLeft, MessageSquare } from "lucide-react";
import { Children, isValidElement, useEffect, useMemo, useRef, useState, } from "react";
import { IconButton } from "../IconButton";
import { GenUIAssistantMessage } from "../InvChat/GenUIAssistantMessage";
import { GenUIUserMessage } from "../InvChat/GenUIUserMessage";
import { ThemeProvider } from "../ThemeProvider";
import { AgentInterfaceTooltip } from "./_shared/AgentInterfaceTooltip";
import { artifactListPath, parseArtifactPath } from "./_shared/artifactPaths";
import { GalleryHorizontalEndIcon } from "./_shared/GalleryHorizontalEndIcon";
import { LabelsProvider, useAgentInterfaceLabels, } from "./_shared/labelsContext";
import { NavProvider, useNav } from "./_shared/navContext";
import { StartersProvider } from "./_shared/startersContext";
import { useAgentInterfaceStore } from "./_shared/store";
import { ArtifactBrowserPage } from "./ArtifactBrowserPage";
import { ArtifactNav } from "./ArtifactNav";
import { ArtifactViewPage } from "./ArtifactViewPage";
import { Composer } from "./Composer";
import { Container } from "./Container";
import { MobileHeader } from "./MobileHeader";
import { NewChatButton } from "./NewChatButton";
import { Route } from "./Route";
import { SidebarContainer, SidebarContent, SidebarHeader, SidebarSeparator } from "./Sidebar";
import { SidebarItem } from "./SidebarItem";
import { SidebarSlot } from "./SidebarSlot";
import { MessageLoading, Messages, ScrollArea, ThreadContainer, ThreadHeader } from "./Thread";
import { ThreadList } from "./ThreadList";
import { WelcomeGlow } from "./WelcomeGlow";
import { WelcomeScreen } from "./WelcomeScreen";
import { Workspace } from "./Workspace";
const SLOT_KEY_BY_TYPE = new Map([
    [SidebarSlot, "sidebar"],
    [SidebarHeader, "sidebarHeader"],
    [MobileHeader, "mobileHeader"],
    [ThreadHeader, "threadHeader"],
    [WelcomeScreen, "welcome"],
    [Composer, "composer"],
    [Workspace, "workspace"],
]);
const isDev = () => typeof process !== "undefined" && process.env?.["NODE_ENV"] !== "production";
function extractSlots(children) {
    const result = { routes: [], rest: [] };
    Children.forEach(children, (child) => {
        if (!isValidElement(child)) {
            result.rest.push(child);
            return;
        }
        if (child.type === Route) {
            result.routes.push(child);
            return;
        }
        const key = SLOT_KEY_BY_TYPE.get(child.type);
        if (!key) {
            result.rest.push(child);
            return;
        }
        if (result[key]) {
            if (isDev()) {
                console.warn(`[AgentInterface] Multiple <AgentInterface.${key}> slot children — using the first; ignoring the rest.`);
            }
            return;
        }
        result[key] = child;
    });
    return result;
}
const DummyThemeProvider = ({ children }) => _jsx(_Fragment, { children: children });
export const AgentInterface = ((props) => {
    const { storage, llm, artifactRenderers, artifactCategories, artifactAutoOpen, componentLibrary, components, theme, disableThemeProvider, logoUrl, agentName, labels, starters, starterVariant, path, defaultPath, onNavigate, scrollVariant, scrollOnLoad, children, } = props;
    const slots = useMemo(() => extractSlots(children), [children]);
    if (slots.sidebar && slots.sidebarHeader) {
        if (isDev()) {
            console.warn("[AgentInterface] <AgentInterface.SidebarHeader> at top level is ignored because <AgentInterface.Sidebar> is provided. Put SidebarHeader inside Sidebar instead.");
        }
        slots.sidebarHeader = undefined;
    }
    const resolvedAssistantMessage = useMemo(() => {
        if (components?.AssistantMessage)
            return components.AssistantMessage;
        if (componentLibrary) {
            const Cmp = ({ message }) => (_jsx(GenUIAssistantMessage, { message: message, library: componentLibrary }));
            return Cmp;
        }
        return undefined;
    }, [components?.AssistantMessage, componentLibrary]);
    const resolvedUserMessage = useMemo(() => {
        if (components?.UserMessage)
            return components.UserMessage;
        if (componentLibrary) {
            const Cmp = ({ message }) => _jsx(GenUIUserMessage, { message: message });
            return Cmp;
        }
        return undefined;
    }, [components?.UserMessage, componentLibrary]);
    const ThemeProviderComponent = disableThemeProvider ? DummyThemeProvider : ThemeProvider;
    return (_jsx(ThemeProviderComponent, { ...theme, children: _jsx(ChatProvider, { storage: storage, llm: llm, artifactRenderers: artifactRenderers, artifactCategories: artifactCategories, artifactAutoOpen: artifactAutoOpen, children: _jsx(NavProvider, { path: path, defaultPath: defaultPath, onNavigate: onNavigate, children: _jsx(StartersProvider, { starters: starters, starterVariant: starterVariant, children: _jsx(LabelsProvider, { labels: labels, children: _jsx(AgentInterfaceBody, { slots: slots, logoUrl: logoUrl ?? "", agentName: agentName ?? "", resolvedAssistantMessage: resolvedAssistantMessage, resolvedUserMessage: resolvedUserMessage, toolCallTimeline: components?.ToolCallTimeline, scrollVariant: scrollVariant, scrollOnLoad: scrollOnLoad }) }) }) }) }) }));
});
const ArtifactViewMobileHeader = ({ artifactId, categoryName, }) => {
    const storage = useArtifactStorage();
    const selectThread = useThreadList((s) => s.selectThread);
    const { navigate } = useNav();
    const [artifact, setArtifact] = useState(null);
    const requestIdRef = useRef(0);
    useEffect(() => {
        if (!storage) {
            setArtifact(null);
            return;
        }
        const requestId = ++requestIdRef.current;
        setArtifact(null);
        storage
            .get(artifactId)
            .then((a) => {
            if (requestId !== requestIdRef.current)
                return;
            setArtifact(a);
        })
            .catch(() => {
            if (requestId !== requestIdRef.current)
                return;
            setArtifact(null);
        });
    }, [storage, artifactId]);
    const backToList = () => navigate(artifactListPath(categoryName));
    const goToThread = () => {
        if (!artifact)
            return;
        selectThread(artifact.threadId);
        navigate(undefined);
    };
    return (_jsx(MobileHeader, { menuButton: _jsx(IconButton, { size: "medium", icon: _jsx(ArrowLeft, { size: "1em" }), onClick: backToList, variant: "secondary", "aria-label": "Back to artifacts" }), agentName: _jsx("span", { className: "inv-agent-mobile-header-agent-name", children: artifact?.title ?? "" }), newChatButton: _jsx(IconButton, { size: "medium", icon: _jsx(MessageSquare, { size: "1em" }), onClick: goToThread, variant: "secondary", "aria-label": "Go to thread", disabled: !artifact }) }));
};
const MobileWorkspaceToggleButton = () => {
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
    return (_jsx(AgentInterfaceTooltip, { content: workspaceToggle, side: "left", children: _jsx(IconButton, { size: "medium", icon: _jsx(GalleryHorizontalEndIcon, { size: "1em" }), onClick: () => setIsWorkspaceOpen(!isWorkspaceOpen), variant: "secondary", "aria-label": isWorkspaceOpen ? "Collapse workspace" : "Expand workspace" }) }));
};
const AgentInterfaceBody = ({ slots, logoUrl, agentName, resolvedAssistantMessage, resolvedUserMessage, toolCallTimeline, scrollVariant, scrollOnLoad, }) => {
    const { path } = useNav();
    // Reserved `artifacts/` prefix is matched BEFORE user-defined Routes.
    const artifactPath = useMemo(() => (path === undefined ? null : parseArtifactPath(path)), [path]);
    const activeRoute = useMemo(() => {
        if (path === undefined || artifactPath)
            return undefined;
        return slots.routes.find((route) => route.props.path === path);
    }, [path, artifactPath, slots.routes]);
    return (_jsxs(Container, { logoUrl: logoUrl, agentName: agentName, children: [_jsx(SidebarContainer, { children: slots.sidebar ? (slots.sidebar.props.children) : (_jsxs(_Fragment, { children: [_jsxs("div", { className: "inv-agent-sidebar-actions", children: [slots.sidebarHeader ?? _jsx(SidebarHeader, {}), _jsxs("div", { className: "inv-agent-sidebar-primary-actions", children: [_jsx(NewChatButton, {}), _jsx(ArtifactNav, { className: "inv-agent-sidebar-artifact-nav" })] })] }), _jsx(SidebarContent, { children: _jsx(ThreadList, {}) })] })) }), artifactPath ? (_jsxs(ThreadContainer, { children: [slots.mobileHeader ??
                        (artifactPath.kind === "view" ? (_jsx(ArtifactViewMobileHeader, { artifactId: artifactPath.artifactId, categoryName: artifactPath.categoryName })) : (_jsx(MobileHeader, {}))), artifactPath.kind === "list" ? (
                    // Keyed on category so switching categories remounts with fresh
                    // state instead of rendering the previous category's list while the
                    // new one loads.
                    _jsx(ArtifactBrowserPage, { categoryName: artifactPath.categoryName }, artifactPath.categoryName ?? "__all__")) : (_jsx(ArtifactViewPage, { artifactId: artifactPath.artifactId, categoryName: artifactPath.categoryName }))] })) : activeRoute ? (_jsx(ThreadContainer, { children: activeRoute.props.children })) : (_jsxs(_Fragment, { children: [_jsxs(ThreadContainer, { children: [slots.mobileHeader ?? _jsx(MobileHeader, { actions: _jsx(MobileWorkspaceToggleButton, {}) }), slots.threadHeader ?? _jsx(ThreadHeader, {}), slots.welcome, _jsx(ScrollArea, { scrollVariant: scrollVariant, scrollOnLoad: scrollOnLoad, children: _jsx(Messages, { loader: _jsx(MessageLoading, {}), assistantMessage: resolvedAssistantMessage, userMessage: resolvedUserMessage, toolCallTimeline: toolCallTimeline }) }), slots.composer ?? _jsx(Composer, {})] }), slots.workspace ?? _jsx(Workspace, {})] })), slots.rest] }));
};
AgentInterface.Sidebar = SidebarSlot;
AgentInterface.SidebarHeader = SidebarHeader;
AgentInterface.SidebarContent = SidebarContent;
AgentInterface.SidebarSeparator = SidebarSeparator;
AgentInterface.SidebarItem = SidebarItem;
AgentInterface.ArtifactNav = ArtifactNav;
AgentInterface.Workspace = Workspace;
AgentInterface.Route = Route;
AgentInterface.MobileHeader = MobileHeader;
AgentInterface.ThreadHeader = ThreadHeader;
AgentInterface.Welcome = WelcomeScreen;
AgentInterface.WelcomeGlow = WelcomeGlow;
AgentInterface.Composer = Composer;
AgentInterface.NewChatButton = NewChatButton;
AgentInterface.ThreadList = ThreadList;
AgentInterface.Messages = Messages;
AgentInterface.MessageLoading = MessageLoading;
AgentInterface.ScrollArea = ScrollArea;
//# sourceMappingURL=AgentInterface.js.map