interface AgentInterfaceState {
    isSidebarOpen: boolean;
    isWorkspaceOpen: boolean;
    agentName: string;
    logoUrl: string;
    setIsSidebarOpen: (isOpen: boolean) => void;
    setIsWorkspaceOpen: (isOpen: boolean) => void;
    setAgentName: (name: string) => void;
    setLogoUrl: (url: string) => void;
}
export declare const createAgentInterfaceStore: ({ logoUrl, agentName, }: {
    logoUrl: string;
    agentName: string;
}) => import("zustand").UseBoundStore<import("zustand").StoreApi<AgentInterfaceState>>;
export declare const AgentInterfaceStoreContext: import("react").Context<import("zustand").UseBoundStore<import("zustand").StoreApi<AgentInterfaceState>> | null>;
export declare const useAgentInterfaceStore: <T>(selector: (state: AgentInterfaceState) => T) => T;
export declare const AgentInterfaceStoreProvider: ({ children, agentName, logoUrl, }: {
    children: React.ReactNode;
    logoUrl: string;
    agentName: string;
}) => import("react").JSX.Element;
export {};
//# sourceMappingURL=store.d.ts.map