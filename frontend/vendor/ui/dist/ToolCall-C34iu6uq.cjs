const require_chunk = require("./chunk-CKQMccvm.cjs");
const require_TimelineEntry = require("./TimelineEntry-Bcs12tlk.cjs");
const require_components_MarkDownRenderer_index = require("./components/MarkDownRenderer/index.cjs");
let clsx = require("clsx");
clsx = require_chunk.__toESM(clsx);
let lucide_react = require("lucide-react");
let react = require("react");
let react_jsx_runtime = require("react/jsx-runtime");
let _invdev_react_headless = require("@inv/headless");
//#region src/components/ToolCall/BehindTheScenes.tsx
const BehindTheScenes = ({ isStreaming, toolCallsComplete, children }) => {
	const [userOverride, setUserOverride] = (0, react.useState)(null);
	const hasCompletedOnce = (0, react.useRef)(false);
	const prevStreaming = (0, react.useRef)(isStreaming);
	(0, react.useEffect)(() => {
		if (isStreaming && !prevStreaming.current) {
			setUserOverride(null);
			hasCompletedOnce.current = false;
		}
		prevStreaming.current = isStreaming;
	}, [isStreaming]);
	if (toolCallsComplete && !hasCompletedOnce.current) hasCompletedOnce.current = true;
	const toolsActive = !!isStreaming && !hasCompletedOnce.current;
	const isExpanded = userOverride !== null ? userOverride : toolsActive;
	const toggle = () => {
		setUserOverride((prev) => prev !== null ? !prev : !isExpanded);
	};
	const panelId = (0, react.useId)();
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		className: "inv-behind-the-scenes",
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
			className: "inv-behind-the-scenes__toggle",
			onClick: toggle,
			type: "button",
			"aria-expanded": isExpanded,
			"aria-controls": panelId,
			children: [isExpanded ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.ChevronUp, {
				size: 14,
				className: "inv-behind-the-scenes__toggle-icon"
			}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.ChevronDown, {
				size: 14,
				className: "inv-behind-the-scenes__toggle-icon"
			}), toolsActive ? "Working..." : "Behind the scenes"]
		}), isExpanded && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: "inv-behind-the-scenes__items",
			id: panelId,
			children
		})]
	});
};
//#endregion
//#region src/components/ToolCall/ToolCall.tsx
const ToolCallComponent = ({ toolCall, isStreaming, toolsDone, isLast = false, className }) => {
	const isRunning = !!isStreaming && !toolsDone;
	const actionLabel = isRunning ? `Calling the ${toolCall.function.name} tool` : `Called the ${toolCall.function.name} tool`;
	let parsedArgs = null;
	try {
		parsedArgs = JSON.parse(toolCall.function.arguments);
	} catch {}
	const hasRequest = parsedArgs && parsedArgs._request != null;
	const hasResponse = parsedArgs && parsedArgs._response != null;
	const requestStr = hasRequest ? JSON.stringify(parsedArgs._request, null, 2) : null;
	const responseStr = hasResponse ? JSON.stringify(parsedArgs._response, null, 2) : null;
	const plainArgs = !hasRequest && !hasResponse && toolCall.function.arguments ? (() => {
		try {
			return JSON.stringify(JSON.parse(toolCall.function.arguments), null, 2);
		} catch {
			return toolCall.function.arguments;
		}
	})() : null;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		className: (0, clsx.default)("inv-tool-call", className),
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
			className: "inv-tool-call__title-row",
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
				className: (0, clsx.default)("inv-tool-call__icon-wrapper", { "inv-tool-call__icon--blinking": isRunning && isLast }),
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.SquareCode, {
					size: 14,
					className: "inv-tool-call__icon"
				})
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
				className: (0, clsx.default)("inv-tool-call__name", { "inv-tool-call__name--shimmer": isRunning && isLast }),
				children: actionLabel
			})]
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: (0, clsx.default)("inv-tool-call__connector", { "inv-tool-call__connector--last": isLast }),
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: "inv-tool-call__args-block",
				children: [
					requestStr && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ToolCodeBlock, {
						type: "request",
						code: requestStr,
						isRunning: isRunning && !hasResponse,
						toolName: toolCall.function.name
					}),
					responseStr && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ToolCodeBlock, {
						type: "response",
						code: responseStr,
						isRunning: isRunning && isLast,
						toolName: toolCall.function.name
					}),
					plainArgs && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ToolCodeBlock, {
						type: "request",
						code: plainArgs,
						isRunning,
						toolName: toolCall.function.name
					})
				]
			})
		})]
	});
};
const ToolCodeBlock = ({ type, code, isRunning = false, toolName }) => {
	const [isExpanded, setIsExpanded] = (0, react.useState)(false);
	const label = type === "request" ? "Tool Request" : "Tool Response";
	const runningLabel = type === "request" ? `Sending request to ${toolName}...` : `Awaiting response from ${toolName}...`;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		className: "inv-tool-code-block",
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
			className: "inv-tool-code-block__header",
			onClick: () => setIsExpanded((v) => !v),
			type: "button",
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
				className: (0, clsx.default)("inv-tool-code-block__label", { "inv-tool-code-block__label--loading": isRunning }),
				children: isRunning ? runningLabel : label
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.ChevronDown, {
				size: 14,
				className: (0, clsx.default)("inv-tool-code-block__chevron", { "inv-tool-code-block__chevron--expanded": isExpanded })
			})]
		}), isExpanded && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: "inv-tool-code-block__content",
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("pre", {
				className: "inv-tool-code-block__code",
				children: code
			})
		})]
	});
};
//#endregion
//#region src/components/ToolCall/ToolCallTimeline.tsx
const stepKey = (step) => step.type === "text" ? `text-${step.id}` : step.activity.id;
const TimelineStepRow = ({ step, isLast, detailedViewPanel, forceDefault }) => {
	if (step.type === "text") return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		className: "inv-tool-call-timeline__text-step",
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_components_MarkDownRenderer_index.MarkDownRenderer, {
			textMarkdown: step.text,
			className: "inv-tool-call-timeline__text-step-body"
		})
	});
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_TimelineEntry.TimelineEntry, {
		activity: step.activity,
		isLast,
		detailedViewPanel,
		forceDefault
	});
};
const REVEAL_INTERVAL = 600;
const NO_FADE = {
	top: false,
	bottom: false
};
const OVERFLOW_SLACK = 8;
const EDGE_SLACK = 4;
/** Visually hidden but available to screen readers; inline so we don't depend on
*  scss (a sibling agent owns the stylesheet). */
const VISUALLY_HIDDEN = {
	position: "absolute",
	width: 1,
	height: 1,
	overflow: "hidden",
	clipPath: "inset(50%)",
	whiteSpace: "nowrap",
	border: 0,
	padding: 0,
	margin: -1
};
const isRunning = (a) => a.status === "streaming" || a.status === "executing";
/**
* The "Working / Behind the scenes" timeline wrapper, driven by
* {@link ToolActivity}[] from `useToolActivities`. Reveals the run's steps
* one-by-one and keeps every revealed one on screen, holds the tray open across
* the tool-result → first-token gap (`awaitingResponse`), and lets a manual
* close stick for the rest of the run. "Running" is read from each activity's
* status, not an `isThinking` prop.
*
* (Animations are CSS-only — framer-motion is intentionally not a dependency.)
*
* @category Components
*/
function ToolCallTimeline({ activities, steps, isLast = false, detailedViewPanel, forceDefault = false, awaitingResponse = false }) {
	const displaySteps = steps ?? activities.map((activity) => ({
		type: "activity",
		activity
	}));
	const isThreadRunning = (0, _invdev_react_headless.useThread)((s) => s.isRunning);
	const thinking = isThreadRunning && isLast && activities.length > 0 && (isRunning(activities[activities.length - 1]) || awaitingResponse);
	const [expanded, setExpanded] = (0, react.useState)(false);
	const [userCollapsed, setUserCollapsed] = (0, react.useState)(false);
	const [revealedCount, setRevealedCount] = (0, react.useState)(() => isLast ? 1 : Math.max(displaySteps.length, 1));
	const prevThinking = (0, react.useRef)(thinking);
	(0, react.useEffect)(() => {
		if (!prevThinking.current && thinking) {
			setRevealedCount(1);
			setExpanded(false);
			setUserCollapsed(false);
			followRef.current = true;
		} else if (prevThinking.current && !thinking) {
			setExpanded(false);
			setRevealedCount(displaySteps.length);
		}
		prevThinking.current = thinking;
	}, [thinking, displaySteps.length]);
	const itemsRef = (0, react.useRef)(null);
	const followRef = (0, react.useRef)(true);
	const distanceFromBottom = (el) => el.scrollHeight - el.scrollTop - el.clientHeight;
	const [fade, setFade] = (0, react.useState)(NO_FADE);
	const measureEdges = (0, react.useCallback)(() => {
		const el = itemsRef.current;
		const next = el && el.scrollHeight - el.clientHeight > OVERFLOW_SLACK ? {
			top: el.scrollTop > EDGE_SLACK,
			bottom: distanceFromBottom(el) > EDGE_SLACK
		} : NO_FADE;
		setFade((prev) => prev.top === next.top && prev.bottom === next.bottom ? prev : next);
	}, []);
	const observerRef = (0, react.useRef)(null);
	const attachItems = (0, react.useCallback)((el) => {
		itemsRef.current = el;
		observerRef.current?.disconnect();
		observerRef.current = null;
		if (!el || typeof ResizeObserver === "undefined") return;
		const observer = new ResizeObserver(() => measureEdges());
		observer.observe(el);
		observerRef.current = observer;
	}, [measureEdges]);
	(0, react.useEffect)(() => () => observerRef.current?.disconnect(), []);
	(0, react.useLayoutEffect)(() => {
		measureEdges();
	});
	const itemsClassName = (0, clsx.default)("inv-behind-the-scenes__items", {
		"inv-behind-the-scenes__items--fade-top": fade.top,
		"inv-behind-the-scenes__items--fade-bottom": fade.bottom
	});
	const handleItemsScroll = (0, react.useCallback)(() => {
		const el = itemsRef.current;
		if (el && distanceFromBottom(el) < 24) followRef.current = true;
		measureEdges();
	}, [measureEdges]);
	const handleItemsWheel = (0, react.useCallback)((e) => {
		if (e.deltaY < 0) followRef.current = false;
	}, []);
	const handleItemsTouchMove = (0, react.useCallback)(() => {
		const el = itemsRef.current;
		if (el && distanceFromBottom(el) >= 24) followRef.current = false;
	}, []);
	(0, react.useLayoutEffect)(() => {
		if (!thinking || !followRef.current) return;
		const el = itemsRef.current;
		if (!el || distanceFromBottom(el) < 1) return;
		const reduceMotion = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
		el.scrollTo({
			top: el.scrollHeight,
			behavior: reduceMotion ? "auto" : "smooth"
		});
	});
	const revealingStep = displaySteps[revealedCount - 1];
	const currentReady = !revealingStep || revealingStep.type === "text" ? true : revealingStep.activity.status !== "streaming";
	(0, react.useEffect)(() => {
		if (isLast && revealedCount < displaySteps.length && currentReady) {
			const t = setTimeout(() => setRevealedCount((c) => c + 1), REVEAL_INTERVAL);
			return () => clearTimeout(t);
		}
	}, [
		isLast,
		displaySteps.length,
		revealedCount,
		currentReady
	]);
	(0, react.useEffect)(() => {
		if (!isThreadRunning && revealedCount < displaySteps.length) setRevealedCount(displaySteps.length);
	}, [
		isThreadRunning,
		revealedCount,
		displaySteps.length
	]);
	if (activities.length === 0 || displaySteps.length === 0) return null;
	const revealing = revealedCount < displaySteps.length;
	const showCompact = (thinking || revealing) && !expanded && !userCollapsed;
	const isOpen = expanded || showCompact;
	const current = displaySteps[Math.min(revealedCount - 1, displaySteps.length - 1)];
	const liveLabel = current.type === "text" ? current.text : current.activity.statusMessage ?? require_TimelineEntry.defaultLabel(current.activity.status, current.activity.toolName);
	const failedCount = !thinking && !revealing ? activities.filter((a) => a.status === "error").length : 0;
	const working = thinking || revealing;
	const toggleLabel = working ? "Working" : failedCount > 0 ? `Behind the scenes · ${failedCount} failed` : "Behind the scenes";
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		className: "inv-behind-the-scenes",
		children: [
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				role: "status",
				"aria-live": "polite",
				style: VISUALLY_HIDDEN,
				children: liveLabel
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
				className: "inv-behind-the-scenes__toggle",
				type: "button",
				"aria-expanded": isOpen,
				onClick: () => {
					if (isOpen) {
						setExpanded(false);
						setUserCollapsed(true);
					} else setExpanded(true);
				},
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					className: (0, clsx.default)("inv-behind-the-scenes__toggle-label", { "inv-behind-the-scenes__toggle-label--shimmer": working }),
					children: toggleLabel
				}), isOpen ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.ChevronUp, {
					size: 14,
					className: "inv-behind-the-scenes__toggle-icon"
				}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.ChevronDown, {
					size: 14,
					className: "inv-behind-the-scenes__toggle-icon"
				})]
			}),
			isLast && !expanded && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: (0, clsx.default)("inv-behind-the-scenes__compact", { "inv-behind-the-scenes__compact--closed": !showCompact }),
				inert: !showCompact,
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: "inv-behind-the-scenes__compact-inner",
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: itemsClassName,
						ref: attachItems,
						onScroll: handleItemsScroll,
						onWheel: handleItemsWheel,
						onTouchMove: handleItemsTouchMove,
						children: displaySteps.slice(0, revealedCount).map((step, idx) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: "inv-behind-the-scenes__reveal-item",
							style: { width: "100%" },
							children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(TimelineStepRow, {
								step,
								isLast: idx === revealedCount - 1,
								detailedViewPanel,
								forceDefault
							})
						}, stepKey(step)))
					})
				})
			}),
			expanded && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: itemsClassName,
				ref: attachItems,
				onScroll: handleItemsScroll,
				onWheel: handleItemsWheel,
				onTouchMove: handleItemsTouchMove,
				children: displaySteps.map((step, idx) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					style: { width: "100%" },
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(TimelineStepRow, {
						step,
						isLast: isLast && idx === displaySteps.length - 1,
						detailedViewPanel,
						forceDefault
					})
				}, stepKey(step)))
			})
		]
	});
}
//#endregion
Object.defineProperty(exports, "BehindTheScenes", {
	enumerable: true,
	get: function() {
		return BehindTheScenes;
	}
});
Object.defineProperty(exports, "ToolCallComponent", {
	enumerable: true,
	get: function() {
		return ToolCallComponent;
	}
});
Object.defineProperty(exports, "ToolCallTimeline", {
	enumerable: true,
	get: function() {
		return ToolCallTimeline;
	}
});

//# sourceMappingURL=ToolCall-C34iu6uq.cjs.map