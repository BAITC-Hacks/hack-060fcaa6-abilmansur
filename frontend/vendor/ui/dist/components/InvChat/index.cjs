Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const require_chunk = require("../../chunk-CKQMccvm.cjs");
const require_components_IconButton_index = require("../IconButton/index.cjs");
const require_GenUIUserMessage = require("../../GenUIUserMessage-BAAvzqr0.cjs");
const require_ThemeProvider = require("../../ThemeProvider-sEZdBvkV.cjs");
const require_components_Button_index = require("../Button/index.cjs");
const require_LayoutContext = require("../../LayoutContext-C4CXVpV3.cjs");
const require_utils = require("../../utils-DcYdyqC-.cjs");
const require_components_Input_index = require("../Input/index.cjs");
let clsx = require("clsx");
clsx = require_chunk.__toESM(clsx);
let lucide_react = require("lucide-react");
let react = require("react");
react = require_chunk.__toESM(react, 1);
let react_jsx_runtime = require("react/jsx-runtime");
let _invdev_react_headless = require("@inv/headless");
let _radix_ui_react_dialog = require("@radix-ui/react-dialog");
_radix_ui_react_dialog = require_chunk.__toESM(_radix_ui_react_dialog);
//#region src/components/InvChat/ShareThreadModal.tsx
const getErrorMessage = (error) => {
	if (error instanceof DOMException && error.name === "NotAllowedError") return "Clipboard access denied. Please allow clipboard access in your browser settings, or copy the link manually from the text area above.";
	else if (error instanceof DOMException && error.name === "NotSupportedError") return "Clipboard not supported. Please copy the link manually from the text area above.";
	else return "Failed to copy to clipboard. Please copy the link manually from the text area above.";
};
/**
* Modal dialog for generating and copying a shareable link.
*
* @category Components
*/
const ShareThreadModal = (0, react.forwardRef)(({ title, trigger, generateLink, themeClassName }, _ref) => {
	const { portalThemeClassName } = require_ThemeProvider.useTheme();
	const { layout } = require_LayoutContext.useLayoutContext() || {};
	const isMobile = layout === "mobile";
	const [isOpen, setIsOpen] = (0, react.useState)(false);
	const [isLoading, setIsLoading] = (0, react.useState)(false);
	const [generatedLink, setGeneratedLink] = (0, react.useState)(null);
	const [hasCopied, setHasCopied] = (0, react.useState)(false);
	const [clipboardError, setClipboardError] = (0, react.useState)(null);
	const handleGenerateLink = (0, react.useCallback)(async () => {
		setIsLoading(true);
		try {
			setGeneratedLink(await generateLink());
		} catch (_error) {
			console.error(_error);
		} finally {
			setIsLoading(false);
		}
	}, [generateLink]);
	const handleCopy = (0, react.useCallback)(async () => {
		if (!generatedLink) return;
		setClipboardError(null);
		if (!navigator.clipboard) {
			setClipboardError("Clipboard access not available. Please copy the link manually from the text area above.");
			return;
		}
		try {
			await navigator.clipboard.writeText(generatedLink);
			setHasCopied(true);
			setTimeout(() => setHasCopied(false), 2e3);
		} catch (error) {
			console.warn("Copy to clipboard failed:", error);
			setClipboardError(getErrorMessage(error));
		}
	}, [generatedLink]);
	const handleOnOpenChange = (0, react.useCallback)((open) => {
		setIsOpen(open);
		if (!open) setTimeout(() => {
			setIsLoading(false);
			setGeneratedLink(null);
			setHasCopied(false);
			setClipboardError(null);
		}, 300);
	}, []);
	const renderActionButton = () => {
		if (isLoading) return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(require_components_Button_index.Button, {
			onClick: handleCopy,
			size: "medium",
			disabled: true,
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.Loader2, { className: "inv-share-thread-modal__loading-icon" }), "Generating..."]
		});
		if (generatedLink) return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(require_components_Button_index.Button, {
			onClick: handleCopy,
			size: "medium",
			children: [hasCopied ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.Check, {}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.Copy, {}), hasCopied ? "Copied!" : "Copy link"]
		});
		return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(require_components_Button_index.Button, {
			onClick: handleGenerateLink,
			size: "medium",
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.Link, {}), "Generate link"]
		});
	};
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(_radix_ui_react_dialog.Root, {
		open: isOpen,
		onOpenChange: handleOnOpenChange,
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_dialog.Trigger, {
			asChild: true,
			children: trigger
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(_radix_ui_react_dialog.Portal, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_dialog.Overlay, { className: (0, clsx.default)("inv-share-thread-modal__overlay", themeClassName || portalThemeClassName) }), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(_radix_ui_react_dialog.Content, {
			className: (0, clsx.default)("inv-share-thread-modal__content", isMobile ? "inv-share-thread-modal__content--mobile" : "", themeClassName || portalThemeClassName),
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: "inv-share-thread-modal__header",
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_dialog.Title, {
					className: "inv-share-thread-modal__title",
					children: title ?? "Share chat"
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_components_IconButton_index.IconButton, {
					icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.X, {}),
					variant: "tertiary",
					size: "small",
					onClick: () => handleOnOpenChange(false),
					className: "inv-share-thread-modal__close-button"
				})]
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: "inv-share-thread-modal__body",
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
					className: "inv-share-thread-modal__description",
					children: "This conversation may include personal information. Take a moment to check the content before sharing the link."
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: "inv-share-thread-modal__input-section",
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: "inv-share-thread-modal__input-wrapper",
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_components_Input_index.Input, {
							value: generatedLink || "",
							placeholder: generatedLink ? "" : "Click \"Generate link\" to create a shareable link",
							readOnly: true,
							className: "inv-share-thread-modal__input"
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: "inv-share-thread-modal__button-container",
							children: renderActionButton()
						})]
					}), clipboardError && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						className: "inv-share-thread-modal__error-message",
						children: clipboardError
					})]
				})]
			})]
		})] })]
	});
});
ShareThreadModal.displayName = "ShareThreadModal";
//#endregion
//#region src/components/InvChat/useShareThread.ts
/**
* Hook for sharing conversation threads by threadId.
* The consumer's backend looks up messages by threadId.
*
* @category Hooks
*/
const useShareThread = ({ generateShareLink }) => {
	const { isRunning, isLoadingMessages, messages } = (0, _invdev_react_headless.useThread)();
	const { selectedThreadId } = (0, _invdev_react_headless.useThreadList)();
	const getShareThreadLink = (0, react.useCallback)(async () => {
		if (!selectedThreadId) throw new Error("No thread selected");
		return generateShareLink(selectedThreadId);
	}, [generateShareLink, selectedThreadId]);
	return {
		shouldDisableShareButton: isRunning || isLoadingMessages || !selectedThreadId,
		hasMessages: messages.length > 0,
		getShareThreadLink
	};
};
//#endregion
//#region src/components/InvChat/ShareThread.tsx
/**
* Share button that opens a modal for generating and copying a shareable link.
* Renders nothing when there are no messages to share.
*
* @category Components
*/
const ShareThread = ({ generateShareLink, modalTitle, customTrigger }) => {
	const { layout } = require_LayoutContext.useLayoutContext() || {};
	const isMobile = layout === "mobile";
	const { portalThemeClassName } = require_ThemeProvider.useTheme();
	const { hasMessages, getShareThreadLink, shouldDisableShareButton } = useShareThread({ generateShareLink });
	if (!hasMessages) return null;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ShareThreadModal, {
		title: modalTitle,
		trigger: customTrigger ?? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(DefaultShareButton, {
			isMobile,
			shouldDisableShareButton
		}),
		generateLink: getShareThreadLink,
		themeClassName: portalThemeClassName
	});
};
ShareThread.displayName = "ShareThread";
const DefaultShareButton = react.default.forwardRef(({ isMobile, shouldDisableShareButton, ...props }, ref) => {
	return isMobile ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_components_IconButton_index.IconButton, {
		ref,
		size: "medium",
		icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.Share2, { size: "1em" }),
		variant: "secondary",
		disabled: shouldDisableShareButton,
		...props
	}) : /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(require_components_Button_index.Button, {
		ref,
		variant: "secondary",
		disabled: shouldDisableShareButton,
		...props,
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.Share2, {}), "Share"]
	});
});
DefaultShareButton.displayName = "DefaultShareButton";
//#endregion
//#region src/components/InvChat/utils/index.ts
/**
* Type guard to check if a WelcomeMessageConfig is a custom React component.
*
* Use this to differentiate between a custom component and a props-based
* configuration when rendering the welcome message.
*
* @param config - The welcome message configuration to check
* @returns `true` if config is a React component, `false` if it's a props object
*
* @example
* if (isWelcomeComponent(welcomeMessage)) {
*   // welcomeMessage is a React.ComponentType
*   const CustomWelcome = welcomeMessage;
*   return <CustomWelcome />;
* } else {
*   // welcomeMessage is { title?, description?, image? }
*   return <WelcomeScreen {...welcomeMessage} />;
* }
*/
const isWelcomeComponent = (config) => {
	return typeof config === "function";
};
//#endregion
exports.GenUIUserMessage = require_GenUIUserMessage.GenUIUserMessage;
exports.ShareThread = ShareThread;
exports.ShareThreadModal = ShareThreadModal;
exports.isChatEmpty = require_utils.isChatEmpty;
exports.isWelcomeComponent = isWelcomeComponent;

//# sourceMappingURL=index.cjs.map