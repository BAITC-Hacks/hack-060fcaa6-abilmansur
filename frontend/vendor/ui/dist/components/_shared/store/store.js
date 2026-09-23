import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useEffect, useRef } from "react";
import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";
export const createShellStore = ({ logoUrl, agentName, showAssistantLogo, }) => create((set) => ({
    isSidebarOpen: true,
    isWorkspaceOpen: true,
    agentName: agentName,
    logoUrl: logoUrl,
    showAssistantLogo,
    setIsSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),
    setIsWorkspaceOpen: (isOpen) => set({ isWorkspaceOpen: isOpen }),
    setAgentName: (name) => set({ agentName: name }),
    setLogoUrl: (url) => set({ logoUrl: url }),
    setShowAssistantLogo: (show) => set({ showAssistantLogo: show }),
}));
export const ShellStoreContext = createContext(null);
export const useShellStore = (selector) => {
    const store = useContext(ShellStoreContext);
    if (!store) {
        throw new Error("useShellStore must be used within a ShellStoreProvider");
    }
    return store(useShallow(selector));
};
export const ShellStoreProvider = ({ children, agentName, logoUrl, showAssistantLogo = false, }) => {
    const shellStoreRef = useRef(null);
    if (!shellStoreRef.current) {
        shellStoreRef.current = createShellStore({ agentName, logoUrl, showAssistantLogo });
    }
    const shellStore = shellStoreRef.current;
    useEffect(() => {
        const { setAgentName, setLogoUrl, setShowAssistantLogo } = shellStore.getState();
        setAgentName(agentName);
        setLogoUrl(logoUrl);
        setShowAssistantLogo(showAssistantLogo);
    }, [agentName, logoUrl, shellStore, showAssistantLogo]);
    return _jsx(ShellStoreContext.Provider, { value: shellStore, children: children });
};
//# sourceMappingURL=store.js.map