import { ConversationStarterProps } from "../../../types/ConversationStarter";
import { PromptTemplate } from "../../../types/PromptTemplate";
import { ConversationStarterVariant } from "../ConversationStarter";
export interface WelcomePrefillChipsProps {
    chips: PromptTemplate[];
    starters: ConversationStarterProps[];
    starterVariant: ConversationStarterVariant;
    draft: string;
    selectedChip: PromptTemplate | null;
    onChipClick: (chip: PromptTemplate) => void;
    onContextualSelect: (starter: ConversationStarterProps) => void;
    disabled: boolean;
}
/**
 * Chip row + grid-stacked starters layers for the prefill-chips welcome.
 * Layer 1 (chips + default starters) hides via `visibility` while drafting so
 * the layout doesn't jump; layer 2 shows the selected chip's contextual
 * starters, which submit the completed prompt (see WelcomeScreen).
 */
export declare const WelcomePrefillChips: ({ chips, starters, starterVariant, draft, selectedChip, onChipClick, onContextualSelect, disabled, }: WelcomePrefillChipsProps) => import("react").JSX.Element;
export default WelcomePrefillChips;
//# sourceMappingURL=WelcomePrefillChips.d.ts.map