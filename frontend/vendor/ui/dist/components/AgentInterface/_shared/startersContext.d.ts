import { type ReactNode } from "react";
import type { ConversationStarterProps } from "../../../types/ConversationStarter";
import type { ConversationStarterVariant } from "../ConversationStarter";
export interface StartersContextValue {
    starters?: ConversationStarterProps[];
    starterVariant?: ConversationStarterVariant;
}
export declare const StartersProvider: ({ starters, starterVariant, children, }: StartersContextValue & {
    children: ReactNode;
}) => import("react").JSX.Element;
export declare const useStartersFromContext: () => StartersContextValue;
//# sourceMappingURL=startersContext.d.ts.map