import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useThread } from "@inv/headless";
import clsx from "clsx";
import { useStartersFromContext } from "./_shared/startersContext";
import { isChatEmpty } from "./_shared/utils";
import { Composer as ComposerInput } from "./components/Composer";
import { ConversationStarter } from "./ConversationStarter";
export const Composer = ({ className, placeholder, starters: ownStarters, starterVariant: ownVariant, children, }) => {
    const fromCtx = useStartersFromContext();
    const messages = useThread((s) => s.messages);
    const isLoadingMessages = useThread((s) => s.isLoadingMessages);
    if (children != null) {
        return _jsx("div", { className: clsx("inv-agent-composer-slot", className), children: children });
    }
    const effectiveStarters = ownStarters ?? fromCtx.starters;
    const effectiveVariant = ownVariant ?? fromCtx.starterVariant ?? "short";
    const showStarters = isChatEmpty({ isLoadingMessages, messages }) &&
        effectiveStarters !== undefined &&
        effectiveStarters.length > 0;
    return (_jsxs("div", { className: clsx("inv-agent-composer-slot", className), children: [showStarters && (_jsx(ConversationStarter, { starters: effectiveStarters, variant: effectiveVariant })), _jsx(ComposerInput, { placeholder: placeholder })] }));
};
//# sourceMappingURL=Composer.js.map