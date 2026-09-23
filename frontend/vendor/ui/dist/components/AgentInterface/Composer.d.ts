import type { ReactNode } from "react";
import type { ConversationStarterProps } from "../../types/ConversationStarter";
import { type ConversationStarterVariant } from "./ConversationStarter";
export interface ComposerProps {
    className?: string;
    placeholder?: string;
    /** Starters chips shown above the input when chat is empty. Inherits from <AgentInterface starters>. */
    starters?: ConversationStarterProps[];
    /** Layout variant for starters. Inherits from <AgentInterface starterVariant>. */
    starterVariant?: ConversationStarterVariant;
    /** Mode C — fully replaces the composer area. When provided, auto-starters rendering is disabled. */
    children?: ReactNode;
}
export declare const Composer: ({ className, placeholder, starters: ownStarters, starterVariant: ownVariant, children, }: ComposerProps) => import("react").JSX.Element;
//# sourceMappingURL=Composer.d.ts.map