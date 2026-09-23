import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ConversationStarter } from "../ConversationStarter";
const PrefillChipButton = ({ chip, disabled, onClick }) => (_jsxs("button", { type: "button", className: "inv-agent-prefill-chip", disabled: disabled, onClick: onClick, children: [chip.icon && (_jsx("span", { className: "inv-agent-prefill-chip__icon", "aria-hidden": true, children: chip.icon })), _jsx("span", { className: "inv-agent-prefill-chip__label", children: chip.displayText })] }));
/**
 * Chip row + grid-stacked starters layers for the prefill-chips welcome.
 * Layer 1 (chips + default starters) hides via `visibility` while drafting so
 * the layout doesn't jump; layer 2 shows the selected chip's contextual
 * starters, which submit the completed prompt (see WelcomeScreen).
 */
export const WelcomePrefillChips = ({ chips, starters, starterVariant, draft, selectedChip, onChipClick, onContextualSelect, disabled, }) => {
    const isDraftEmpty = draft.length === 0;
    return (_jsxs("div", { className: "inv-agent-welcome-screen__desktop-starters inv-agent-welcome-screen__starters-layers", children: [_jsxs("div", { className: "inv-agent-welcome-screen__starters-layer", "data-hidden": !isDraftEmpty || undefined, "aria-hidden": !isDraftEmpty || undefined, children: [_jsx("div", { className: "inv-agent-welcome-screen__chip-row", children: chips.map((chip, index) => (_jsx(PrefillChipButton, { chip: chip, disabled: disabled, onClick: () => onChipClick(chip) }, `${chip.displayText}-${index}`))) }), _jsx(ConversationStarter, { starters: starters, variant: starterVariant })] }), selectedChip && (_jsx("div", { className: "inv-agent-welcome-screen__starters-layer", children: _jsx(ConversationStarter, { starters: selectedChip.completions, variant: "long", onSelect: onContextualSelect }) }))] }));
};
export default WelcomePrefillChips;
//# sourceMappingURL=WelcomePrefillChips.js.map