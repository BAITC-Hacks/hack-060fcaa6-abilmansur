import { jsx as _jsx } from "react/jsx-runtime";
import { ChatProvider } from "@inv/headless";
import { useMemo } from "react";
import { ThemeProvider } from "../ThemeProvider";
import { GenUIAssistantMessage } from "./GenUIAssistantMessage";
import { GenUIUserMessage } from "./GenUIUserMessage";
const DummyThemeProvider = ({ children }) => children;
export function withChatProvider(WrappedComponent) {
    const WithChatProvider = (props) => {
        const { storage, llm, artifactRenderers, artifactCategories, artifactAutoOpen, theme, disableThemeProvider, ...innerProps } = props;
        const sharedUIProps = innerProps;
        const componentLibrary = sharedUIProps.componentLibrary;
        const customAssistantMessage = sharedUIProps.assistantMessage;
        const customUserMessage = sharedUIProps.userMessage;
        const genUIAssistantMessage = useMemo(() => {
            if (customAssistantMessage || !componentLibrary)
                return undefined;
            return ({ message }) => (_jsx(GenUIAssistantMessage, { message: message, library: componentLibrary }));
        }, [customAssistantMessage, componentLibrary]);
        const genUIUserMessage = useMemo(() => {
            if (customUserMessage || !componentLibrary)
                return undefined;
            return ({ message }) => _jsx(GenUIUserMessage, { message: message });
        }, [customUserMessage, componentLibrary]);
        const finalInnerProps = { ...innerProps };
        if (genUIAssistantMessage && !customAssistantMessage) {
            finalInnerProps["assistantMessage"] = genUIAssistantMessage;
        }
        if (genUIUserMessage && !customUserMessage) {
            finalInnerProps["userMessage"] = genUIUserMessage;
        }
        const ThemeProviderComponent = disableThemeProvider ? DummyThemeProvider : ThemeProvider;
        return (_jsx(ThemeProviderComponent, { ...theme, children: _jsx(ChatProvider, { storage: storage, llm: llm, artifactRenderers: artifactRenderers, artifactCategories: artifactCategories, artifactAutoOpen: artifactAutoOpen, children: _jsx(WrappedComponent, { ...finalInnerProps }) }) }));
    };
    WithChatProvider.displayName = `withChatProvider(${WrappedComponent.displayName || WrappedComponent.name || "Component"})`;
    return WithChatProvider;
}
//# sourceMappingURL=withChatProvider.js.map