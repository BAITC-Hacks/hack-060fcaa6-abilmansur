import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useThread } from "@inv/headless";
import clsx from "clsx";
import { ArrowUp, Lightbulb } from "lucide-react";
import { Fragment, isValidElement } from "react";
import { Carousel, CarouselContent } from "../Carousel";
import { isChatEmpty } from "./_shared/utils";
/**
 * Renders the appropriate icon based on the icon prop value
 * - undefined: Show default lightbulb icon
 * - ReactNode: Show the provided icon (use <></> or React.Fragment for no icon)
 */
const renderIcon = (icon) => {
    if (icon === undefined) {
        return _jsx(Lightbulb, { size: 16 });
    }
    return icon;
};
const hasRenderableIcon = (icon) => {
    if (icon === null || icon === undefined || icon === false) {
        return false;
    }
    if (isValidElement(icon) && icon.type === Fragment) {
        return Boolean(icon.props.children);
    }
    return true;
};
const ConversationStarterItem = ({ displayText, onClick, variant, icon, }) => {
    const renderedIcon = renderIcon(icon);
    const shouldRenderIcon = hasRenderableIcon(renderedIcon);
    if (variant === "short") {
        return (_jsxs("button", { type: "button", className: "inv-agent-conversation-starter-item-short", onClick: onClick, children: [shouldRenderIcon && (_jsx("span", { className: "inv-agent-conversation-starter-item-short__icon", children: renderedIcon })), _jsx("span", { className: "inv-agent-conversation-starter-item-short__text", children: displayText })] }));
    }
    // Long variant (detailed list style)
    return (_jsxs("button", { type: "button", className: "inv-agent-conversation-starter-item-long", onClick: onClick, children: [_jsxs("div", { className: "inv-agent-conversation-starter-item-long__content", children: [shouldRenderIcon && (_jsx("span", { className: "inv-agent-conversation-starter-item-long__icon", children: renderedIcon })), _jsx("span", { className: "inv-agent-conversation-starter-item-long__text", children: displayText })] }), _jsx("span", { className: "inv-agent-conversation-starter-item-long__arrow", children: _jsx(ArrowUp, { size: 16 }) })] }));
};
export const ConversationStarter = ({ starters, className, variant = "short", onSelect, }) => {
    const processMessage = useThread((s) => s.processMessage);
    const isRunning = useThread((s) => s.isRunning);
    const messages = useThread((s) => s.messages);
    const isLoadingMessages = useThread((s) => s.isLoadingMessages);
    const handleClick = (starter) => {
        if (isRunning)
            return;
        if (onSelect) {
            onSelect(starter);
            return;
        }
        processMessage({
            role: "user",
            content: starter.prompt,
        });
    };
    // Only show when there are no messages
    if (!isChatEmpty({ isLoadingMessages, messages })) {
        return null;
    }
    if (starters.length === 0) {
        return null;
    }
    if (variant === "short") {
        return (_jsx(Carousel, { showButtons: false, className: clsx("inv-agent-conversation-starter", "inv-agent-conversation-starter--short", className), children: _jsx(CarouselContent, { className: "inv-agent-conversation-starter__carousel-content", children: starters.map((item, index) => (_jsx(ConversationStarterItem, { displayText: item.displayText, prompt: item.prompt, icon: item.icon, onClick: () => handleClick(item), variant: variant }, `${item.displayText}-${index}`))) }) }));
    }
    return (_jsx("div", { className: clsx("inv-agent-conversation-starter", `inv-agent-conversation-starter--${variant}`, className), children: starters.map((item, index) => (_jsxs(Fragment, { children: [index > 0 && (_jsx("div", { className: "inv-agent-conversation-starter__separator", "aria-hidden": "true" })), _jsx(ConversationStarterItem, { displayText: item.displayText, prompt: item.prompt, icon: item.icon, onClick: () => handleClick(item), variant: variant })] }, `${item.displayText}-${index}`))) }));
};
export default ConversationStarter;
//# sourceMappingURL=ConversationStarter.js.map