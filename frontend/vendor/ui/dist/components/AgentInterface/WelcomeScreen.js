import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useThread, useThreadList } from "@inv/headless";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { useStartersFromContext } from "./_shared/startersContext";
import { isChatEmpty } from "./_shared/utils";
import { submitStarterPrompt } from "./_shared/utils/welcomePrefill";
import { DesktopWelcomeComposer, WelcomePrefillChips } from "./components";
import { ConversationStarter } from "./ConversationStarter";
import { WelcomeGlow, WelcomeGlowProvider } from "./WelcomeGlow";
/**
 * Type guard to check if image is a URL object
 */
const isImageUrl = (image) => {
    return typeof image === "object" && image !== null && "url" in image;
};
export const WelcomeScreen = (props) => {
    const { className, glowAnimation = false } = props;
    const fromCtx = useStartersFromContext();
    const ownStarters = "starters" in props ? props.starters : undefined;
    const ownVariant = "starterVariant" in props ? props.starterVariant : undefined;
    const starters = ownStarters ?? fromCtx.starters ?? [];
    const starterVariant = ownVariant ?? fromCtx.starterVariant ?? "long";
    const promptTemplates = ("promptTemplates" in props ? props.promptTemplates : undefined) ?? [];
    const hasChips = promptTemplates.length > 0;
    const messages = useThread((s) => s.messages);
    const isLoadingMessages = useThread((s) => s.isLoadingMessages);
    const isRunning = useThread((s) => s.isRunning);
    const processMessage = useThread((s) => s.processMessage);
    // Prefill-chips draft state — owned here (not in the composer) so chips can
    // write into the draft. Hooks stay unconditional; unused without chips.
    const [draft, setDraft] = useState("");
    const [selectedChip, setSelectedChip] = useState(null);
    const inputRef = useRef(null);
    const selectedThreadId = useThreadList((s) => s.selectedThreadId);
    // The welcome renders unkeyed across thread switches, so a chip-prefilled
    // draft would otherwise leak into the next empty thread.
    useEffect(() => {
        setDraft("");
        setSelectedChip(null);
    }, [selectedThreadId]);
    // Only show when there are no messages
    if (!isChatEmpty({ isLoadingMessages, messages })) {
        return null;
    }
    // Check if children are provided
    if ("children" in props && props.children) {
        return (_jsx(WelcomeGlowProvider, { enabled: glowAnimation, children: _jsx("div", { className: clsx("inv-agent-welcome-screen", className, {
                    "inv-agent-welcome-screen--animated": glowAnimation,
                }), children: props.children }) }));
    }
    // Props-based content
    const { title, description, image } = props;
    const renderImage = () => {
        if (!image)
            return null;
        if (isImageUrl(image)) {
            return (_jsx("img", { src: image.url, alt: title || "", className: "inv-agent-welcome-screen__image" }));
        }
        return image;
    };
    const handleDraftChange = (value) => {
        setDraft(value);
        if (!value) {
            setSelectedChip(null);
        }
    };
    const handleChipClick = (chip) => {
        if (isRunning)
            return;
        setDraft(chip.prompt);
        setSelectedChip(chip);
        const input = inputRef.current;
        if (!input)
            return;
        input.focus();
        // Caret to the end once React has applied the new value.
        requestAnimationFrame(() => {
            input.setSelectionRange(chip.prompt.length, chip.prompt.length);
        });
    };
    const handleContextualSelect = (starter) => {
        submitStarterPrompt(processMessage, draft, starter.prompt);
        // Clear at submit time like the composer's own submit path — the
        // thread-switch reset above won't fire when selectedThreadId doesn't
        // change (e.g. thread creation fails on a fresh chat and it stays null),
        // and the stale stem would resurface if the welcome shows again.
        setDraft("");
        setSelectedChip(null);
    };
    return (_jsx(WelcomeGlowProvider, { enabled: glowAnimation, children: _jsxs("div", { className: clsx("inv-agent-welcome-screen", "inv-agent-welcome-screen--with-composer", className, {
                "inv-agent-welcome-screen--animated": glowAnimation,
            }), children: [_jsxs("div", { className: "inv-agent-welcome-screen__header", children: [image && (_jsx("div", { className: "inv-agent-welcome-screen__image-container", children: renderImage() })), (title || description) && (_jsxs("div", { className: "inv-agent-welcome-screen__content", children: [title && _jsx("h2", { className: "inv-agent-welcome-screen__title", children: title }), description && (_jsx("p", { className: "inv-agent-welcome-screen__description", children: description }))] }))] }), _jsxs("div", { className: "inv-agent-welcome-screen__composer-starters-container", "data-has-prefill-chips": (hasChips && draft.length === 0) || undefined, children: [_jsx("div", { className: "inv-agent-welcome-screen__desktop-composer", children: _jsx(WelcomeGlow, { children: hasChips ? (_jsx(DesktopWelcomeComposer, { value: draft, onChange: handleDraftChange, drafting: draft.length > 0 && !selectedChip, inputRef: inputRef })) : (_jsx(DesktopWelcomeComposer, {})) }) }), hasChips ? (_jsx(WelcomePrefillChips, { chips: promptTemplates, starters: starters, starterVariant: starterVariant, draft: draft, selectedChip: selectedChip, onChipClick: handleChipClick, onContextualSelect: handleContextualSelect, disabled: isRunning })) : (
                        /* Desktop-only conversation starters */
                        starters.length > 0 && (_jsx("div", { className: "inv-agent-welcome-screen__desktop-starters", children: _jsx(ConversationStarter, { starters: starters, variant: starterVariant }) })))] })] }) }));
};
export default WelcomeScreen;
//# sourceMappingURL=WelcomeScreen.js.map