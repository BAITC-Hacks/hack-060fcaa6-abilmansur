require("./chunk-CKQMccvm.cjs");
let react = require("react");
let react_jsx_runtime = require("react/jsx-runtime");
let zustand = require("zustand");
let zustand_react_shallow = require("zustand/react/shallow");
//#region src/components/_shared/store/store.tsx
const createShellStore = ({ logoUrl, agentName, showAssistantLogo }) => (0, zustand.create)((set) => ({
	isSidebarOpen: true,
	isWorkspaceOpen: true,
	agentName,
	logoUrl,
	showAssistantLogo,
	setIsSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),
	setIsWorkspaceOpen: (isOpen) => set({ isWorkspaceOpen: isOpen }),
	setAgentName: (name) => set({ agentName: name }),
	setLogoUrl: (url) => set({ logoUrl: url }),
	setShowAssistantLogo: (show) => set({ showAssistantLogo: show })
}));
const ShellStoreContext = (0, react.createContext)(null);
const useShellStore = (selector) => {
	const store = (0, react.useContext)(ShellStoreContext);
	if (!store) throw new Error("useShellStore must be used within a ShellStoreProvider");
	return store((0, zustand_react_shallow.useShallow)(selector));
};
const ShellStoreProvider = ({ children, agentName, logoUrl, showAssistantLogo = false }) => {
	const shellStoreRef = (0, react.useRef)(null);
	if (!shellStoreRef.current) shellStoreRef.current = createShellStore({
		agentName,
		logoUrl,
		showAssistantLogo
	});
	const shellStore = shellStoreRef.current;
	(0, react.useEffect)(() => {
		const { setAgentName, setLogoUrl, setShowAssistantLogo } = shellStore.getState();
		setAgentName(agentName);
		setLogoUrl(logoUrl);
		setShowAssistantLogo(showAssistantLogo);
	}, [
		agentName,
		logoUrl,
		shellStore,
		showAssistantLogo
	]);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ShellStoreContext.Provider, {
		value: shellStore,
		children
	});
};
//#endregion
Object.defineProperty(exports, "ShellStoreContext", {
	enumerable: true,
	get: function() {
		return ShellStoreContext;
	}
});
Object.defineProperty(exports, "ShellStoreProvider", {
	enumerable: true,
	get: function() {
		return ShellStoreProvider;
	}
});
Object.defineProperty(exports, "createShellStore", {
	enumerable: true,
	get: function() {
		return createShellStore;
	}
});
Object.defineProperty(exports, "useShellStore", {
	enumerable: true,
	get: function() {
		return useShellStore;
	}
});

//# sourceMappingURL=store-Ba3AZJcS.cjs.map