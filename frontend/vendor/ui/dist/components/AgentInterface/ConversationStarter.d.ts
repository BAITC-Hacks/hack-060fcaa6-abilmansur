import { ConversationStarterProps } from "../../types/ConversationStarter";
export type ConversationStarterVariant = "short" | "long";
export interface ConversationStarterContainerProps {
    starters: ConversationStarterProps[];
    className?: string;
    /**
     * Variant of the conversation starter
     * - "short": Pill-style horizontal buttons (default)
     * - "long": Vertical list items with icons and hover arrow
     */
    variant?: ConversationStarterVariant;
    /**
     * Optional click override. When provided, replaces the default
     * send-to-thread behavior (still guarded by `isRunning`). The prefill-chips
     * welcome uses it to submit contextual starters with the prefilled draft.
     */
    onSelect?: (starter: ConversationStarterProps) => void;
}
export declare const ConversationStarter: ({ starters, className, variant, onSelect, }: ConversationStarterContainerProps) => import("react").JSX.Element | null;
export default ConversationStarter;
//# sourceMappingURL=ConversationStarter.d.ts.map