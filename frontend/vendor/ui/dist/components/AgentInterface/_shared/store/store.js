import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useEffect, useMemo } from "react";
import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";
export const createAgentInterfaceStore = ({ logoUrl, agentName, }) => create((set) => ({
    isSidebarOpen: true,
    isWorkspaceOpen: false,
    agentName: agentName,
    logoUrl: logoUrl,
    setIsSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),
    setIsWorkspaceOpen: (isOpen) => set({ isWorkspaceOpen: isOpen }),
    setAgentName: (name) => set({ agentName: name }),
    setLogoUrl: (url) => set({ logoUrl: url }),
}));
export const AgentInterfaceStoreContext = createContext(null);
export const useAgentInterfaceStore = (selector) => {
    const store = useContext(AgentInterfaceStoreContext);
    if (!store) {
        throw new Error("useAgentInterfaceStore must be used within AgentInterfaceStoreProvider");
    }
    return store(useShallow(selector));
};
export const AgentInterfaceStoreProvider = ({ children, agentName, logoUrl, }) => {
    const shellStore = useMemo(() => createAgentInterfaceStore({ agentName, logoUrl }), []);
    useEffect(() => {
        const { setAgentName, setLogoUrl } = shellStore.getState();
        setAgentName(agentName);
        setLogoUrl(logoUrl);
    }, [agentName, logoUrl]);
    return (_jsx(AgentInterfaceStoreContext.Provider, { value: shellStore, children: children }));
};
//# sourceMappingURL=store.js.map