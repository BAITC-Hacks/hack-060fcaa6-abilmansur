interface ShellState {
    isSidebarOpen: boolean;
    isWorkspaceOpen: boolean;
    agentName: string;
    logoUrl: string;
    showAssistantLogo: boolean;
    setIsSidebarOpen: (isOpen: boolean) => void;
    setIsWorkspaceOpen: (isOpen: boolean) => void;
    setAgentName: (name: string) => void;
    setLogoUrl: (url: string) => void;
    setShowAssistantLogo: (show: boolean) => void;
}
export declare const createShellStore: ({ logoUrl, agentName, showAssistantLogo, }: {
    logoUrl: string;
    agentName: string;
    showAssistantLogo: boolean;
}) => import("zustand").UseBoundStore<import("zustand").StoreApi<ShellState>>;
export declare const ShellStoreContext: import("react").Context<import("zustand").UseBoundStore<import("zustand").StoreApi<ShellState>> | null>;
export declare const useShellStore: <T>(selector: (state: ShellState) => T) => T;
export declare const ShellStoreProvider: ({ children, agentName, logoUrl, showAssistantLogo, }: {
    children: React.ReactNode;
    logoUrl: string;
    agentName: string;
    showAssistantLogo?: boolean;
}) => import("react").JSX.Element;
export {};
//# sourceMappingURL=store.d.ts.map