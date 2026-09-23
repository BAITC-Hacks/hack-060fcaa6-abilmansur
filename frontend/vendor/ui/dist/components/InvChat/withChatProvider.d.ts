import type { ChatProviderProps } from "@inv/headless";
import { ThemeProps } from "../ThemeProvider";
import type { SharedChatUIProps } from "./types";
type ThemeWrapperProps = {
    theme?: ThemeProps;
    disableThemeProvider?: boolean;
};
export type ChatLayoutProps<Extra = {}> = Omit<ChatProviderProps, "children"> & SharedChatUIProps & ThemeWrapperProps & Extra;
export declare function withChatProvider<ExtraProps = {}>(WrappedComponent: React.ComponentType<any>): {
    (props: ChatLayoutProps<ExtraProps>): import("react").JSX.Element;
    displayName: string;
};
export {};
//# sourceMappingURL=withChatProvider.d.ts.map