//#region \0rolldown/runtime.js
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
		key = keys[i];
		if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
			get: ((k) => from[k]).bind(null, key),
			enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
	value: mod,
	enumerable: true
}) : target, mod));
//#endregion
let _invdev_lang_core = require("@inv/lang-core");
let _invdev_observability = require("@inv/observability");
let react = require("react");
react = __toESM(react, 1);
let react_jsx_runtime = require("react/jsx-runtime");
//#region src/publishLibrary.ts
/**
* Shared with `@inv/inspector` via `Symbol.for`. Not a public API —
* the live library object stays off the observability bus (serializable ping
* only). Keep the string in sync with `packages/inspector/src/libraryRegistry.ts`.
*/
const INSPECTOR_LIBRARIES_KEY = Symbol.for("inv.inspector.libraries");
const LIBRARY_EVENT_KIND = "react-lang:library";
function libraryKey(library) {
	return library.id ?? library.root ?? Object.keys(library.components).sort().join(",");
}
function getRegistry() {
	const store = globalThis;
	return store[INSPECTOR_LIBRARIES_KEY] ??= {};
}
function upsertRegistry(library) {
	getRegistry()[libraryKey(library)] = library;
}
/** Dev-only: stash the live library and emit a serializable registration ping. */
function publishLibrary(library) {
	upsertRegistry(library);
	_invdev_observability.observability.info({
		kind: LIBRARY_EVENT_KIND,
		__libraryId: library.__libraryId,
		...library.id !== void 0 ? { id: library.id } : {},
		...library.root !== void 0 ? { root: library.root } : {},
		components: Object.keys(library.components),
		message: library.id ? `Library "${library.id}" registered` : `Library registered (root: ${library.root ?? "none"})`
	});
}
//#endregion
//#region src/library.ts
function defineComponent(config) {
	return (0, _invdev_lang_core.defineComponent)(config);
}
function createLibrary(input) {
	const library = (0, _invdev_lang_core.createLibrary)(input);
	if (process.env["NODE_ENV"] !== "production") publishLibrary(library);
	return library;
}
//#endregion
//#region src/context.ts
const InvContext = (0, react.createContext)(null);
/**
* Access the full Inv context. Throws if used outside a <Renderer />.
*/
function useInv() {
	const ctx = (0, react.useContext)(InvContext);
	if (!ctx) throw new Error("useInv must be used within a <Renderer /> component.");
	return ctx;
}
/**
* Get the renderNode function for rendering nested component values.
*/
function useRenderNode() {
	return useInv().renderNode;
}
/**
* Get the triggerAction function for firing structured action events.
*
* @example
* ```tsx
* const triggerAction = useTriggerAction();
* <button onClick={() => triggerAction("Submit", "myForm")}>
* ```
*/
function useTriggerAction() {
	return useInv().triggerAction;
}
/**
* Whether the LLM is currently streaming content.
*/
function useIsStreaming() {
	return useInv().isStreaming;
}
/**
* Whether any Query is currently fetching data.
* Useful for showing skeleton/loading states in data-driven components.
*/
function useIsQueryLoading() {
	return useInv().isQueryLoading;
}
/**
* Get a form field value from the form state context.
*
* @example
* ```tsx
* const getFieldValue = useGetFieldValue();
* const name = getFieldValue("contactForm", "name");
* ```
*/
function useGetFieldValue() {
	return useInv().getFieldValue;
}
/**
* Get the setFieldValue function for updating form field values.
*
* @example
* ```tsx
* const setFieldValue = useSetFieldValue();
* <input onChange={(e) => setFieldValue("contactForm", "Input", "name", e.target.value, false)} />
* ```
*/
function useSetFieldValue() {
	return useInv().setFieldValue;
}
const FormNameContext = (0, react.createContext)(void 0);
/**
* Get the current form name (set by the nearest parent Form component).
* Returns undefined if not inside a Form.
*/
function useFormName() {
	return (0, react.useContext)(FormNameContext);
}
/**
* Persists a component's default/initial value into form state once streaming
* finishes — but only if the user hasn't already set a value.
*
* Call this inside any form component that has a `defaultValue` or
* `defaultChecked` prop. It is a no-op during streaming so that LLM
* prop changes don't fight with partial state.
*
* @param shouldTriggerSaveCallback — defaults to `false` (only local state, no message persistence)
*/
function useSetDefaultValue({ formName, componentType, name, existingValue, defaultValue, shouldTriggerSaveCallback = false }) {
	const setFieldValue = useSetFieldValue();
	const isStreaming = useIsStreaming();
	(0, react.useEffect)(() => {
		if (!isStreaming && existingValue === void 0 && defaultValue !== void 0) setFieldValue(formName, componentType, name, defaultValue, shouldTriggerSaveCallback);
	}, [
		defaultValue,
		existingValue,
		formName,
		componentType,
		name,
		isStreaming,
		setFieldValue,
		shouldTriggerSaveCallback
	]);
}
//#endregion
//#region src/hooks/useInvErrors.ts
/** Aggregates Renderer errors and owns the public onError callback behavior. */
function useInvErrors({ response, isStreaming, result, evaluatedResult, library, querySnapshot, parseExceptionRef, runtimeErrorsRef, renderErrorsRef, onError }) {
	const errorsRef = (0, react.useRef)([]);
	const [errorRevision, setErrorRevision] = (0, react.useState)(0);
	const lastErrorKeyRef = (0, react.useRef)("");
	const onErrorRef = (0, react.useRef)(onError);
	onErrorRef.current = onError;
	(0, react.useEffect)(() => {
		if (isStreaming) {
			errorsRef.current = [];
			if (lastErrorKeyRef.current !== "") {
				lastErrorKeyRef.current = "";
				onErrorRef.current?.([]);
			}
			return;
		}
		const errors = [];
		if (parseExceptionRef.current) errors.push(parseExceptionRef.current);
		if (response && !result?.root && !parseExceptionRef.current) errors.push({
			source: "parser",
			code: "parse-failed",
			message: result ? "Code parsed but produced no renderable root component" : "Response could not be parsed as valid inv-lang",
			hint: `The entire response must be valid inv-lang code starting with root = ${library.root ?? "Root"}(...)`
		});
		if (result?.meta.errors.length) errors.push(...(0, _invdev_lang_core.enrichErrors)(result.meta.errors, library.toJSONSchema(), Object.keys(library.components)));
		errors.push(...runtimeErrorsRef.current);
		errors.push(...renderErrorsRef.current);
		renderErrorsRef.current = [];
		errors.push(...querySnapshot.__inv_errors ?? []);
		errorsRef.current = errors;
		const errorKey = JSON.stringify(errors);
		if (errorKey === lastErrorKeyRef.current) return;
		lastErrorKeyRef.current = errorKey;
		setErrorRevision((revision) => revision + 1);
		if (onErrorRef.current) onErrorRef.current(errors);
		else if (errors.length > 0) for (const error of errors) console.warn(`[inv] ${error.source}/${error.code}: ${error.message}`);
	}, [
		isStreaming,
		response,
		result,
		evaluatedResult,
		querySnapshot,
		library,
		parseExceptionRef,
		runtimeErrorsRef,
		renderErrorsRef
	]);
	return {
		errorsRef,
		errorRevision
	};
}
//#endregion
//#region src/hooks/streamEvent.ts
/**
* Producer-side contract for the stream lifecycle events this package emits on
* `@inv/observability`. Intentionally duplicated (not imported) in
* `@inv/observability-cloud` (src/events/stream.ts), which consumes these
* events; the two packages have no dependency on each other. Keep the string
* constants and the settled detail shape in sync when changing either side.
*/
const STREAM_EVENT_KIND = "react-lang:stream";
const STREAM_PHASE_STREAMING = "streaming";
const STREAM_PHASE_SETTLED = "settled";
//#endregion
//#region src/hooks/useStreamingObservability.ts
let fallbackId = 0;
function createStreamId() {
	if (typeof globalThis.crypto?.randomUUID === "function") return globalThis.crypto.randomUUID();
	fallbackId += 1;
	return `inv-lang-${Date.now().toString(36)}-${fallbackId.toString(36)}`;
}
function createStreamingObservabilityState() {
	return {
		id: null,
		updateIndex: 0,
		lastResponse: null,
		hasPublishedStreamingSnapshot: false,
		settled: false,
		lastSettledErrorKey: null,
		startedAt: null,
		durationMs: null
	};
}
function captureStreamTiming(state, now = Date.now()) {
	state.startedAt ??= now;
	if (state.settled) state.durationMs ??= Math.max(0, now - state.startedAt);
	const elapsedMs = state.durationMs ?? Math.max(0, now - state.startedAt);
	return {
		startedAt: state.startedAt,
		elapsedMs,
		...state.durationMs != null ? { durationMs: state.durationMs } : {}
	};
}
/** Advances a Renderer through successive stream lifecycles. */
function advanceStreamingObservability(state, isStreaming, response, settledErrorKey = null, idFactory = createStreamId) {
	if (isStreaming) {
		if (state.settled) Object.assign(state, createStreamingObservabilityState());
		state.id ??= idFactory();
		if (state.hasPublishedStreamingSnapshot && state.lastResponse === response) return null;
		state.hasPublishedStreamingSnapshot = true;
		state.lastResponse = response;
		state.updateIndex += 1;
		return {
			id: state.id,
			phase: STREAM_PHASE_STREAMING,
			updateIndex: state.updateIndex
		};
	}
	if (!state.id) return null;
	if (state.settled && (settledErrorKey === null || state.lastSettledErrorKey === settledErrorKey)) return null;
	state.updateIndex += 1;
	state.settled = true;
	state.lastSettledErrorKey = settledErrorKey;
	return {
		id: state.id,
		phase: STREAM_PHASE_SETTLED,
		updateIndex: state.updateIndex
	};
}
function parserMetadata(result) {
	if (!result) return void 0;
	return {
		incomplete: result.meta.incomplete,
		unresolved: result.meta.unresolved,
		orphaned: result.meta.orphaned,
		statementCount: result.meta.statementCount
	};
}
/**
* Publishes the incremental Inv Lang stream lifecycle. The stable id is
* created only after this Renderer instance has actually entered streaming.
*/
function useStreamingObservability({ response, isStreaming, result, errorsRef, errorRevision, publish = true, __libraryId }) {
	const streamRef = (0, react.useRef)(createStreamingObservabilityState());
	(0, react.useEffect)(() => {
		if (!publish) return;
		const errors = errorsRef.current;
		const settledErrorKey = isStreaming ? null : JSON.stringify(errors);
		const update = advanceStreamingObservability(streamRef.current, isStreaming, response, settledErrorKey);
		const libraryIdFields = __libraryId !== void 0 ? { __libraryId } : {};
		if (isStreaming) {
			if (update) _invdev_observability.observability.info({
				id: update.id,
				kind: STREAM_EVENT_KIND,
				phase: update.phase,
				updateIndex: update.updateIndex,
				response,
				responseLength: response?.length ?? 0,
				parser: parserMetadata(result),
				...captureStreamTiming(streamRef.current),
				...libraryIdFields,
				message: "Inv Lang is streaming"
			});
			return;
		}
		if (update?.phase === "settled") (0, _invdev_observability.observability)(errors.length > 0 ? "error" : "info", {
			id: update.id,
			kind: STREAM_EVENT_KIND,
			phase: STREAM_PHASE_SETTLED,
			updateIndex: update.updateIndex,
			response,
			responseLength: response?.length ?? 0,
			parser: parserMetadata(result),
			errors,
			errorCount: errors.length,
			...captureStreamTiming(streamRef.current),
			...libraryIdFields,
			message: errors.length > 0 ? `Inv Lang settled with ${errors.length} error${errors.length === 1 ? "" : "s"}` : "Inv Lang settled"
		});
	}, [
		publish,
		isStreaming,
		response,
		result,
		errorsRef,
		errorRevision,
		__libraryId
	]);
}
//#endregion
//#region src/hooks/useInvState.ts
/** Unwrap { value, componentType } wrapper from form field entries. Returns raw value. */
function unwrapFieldValue(v) {
	if (v && typeof v === "object" && !Array.isArray(v) && "value" in v) return v.value;
	return v;
}
/**
* Core state hook — extracts all form state, action handling, parser
* management, and context assembly out of the Renderer component.
*
* Store holds everything: $bindings as top-level keys, form fields nested
* under formName as plain values.
*/
function useInvState({ response, library, isStreaming, onAction, onStateUpdate, initialState, toolProvider, onError, publishObservability }, renderDeep) {
	const sp = (0, react.useMemo)(() => (0, _invdev_lang_core.createStreamingParser)(library.toJSONSchema(), library.root), [library]);
	const parseExceptionRef = (0, react.useRef)(null);
	const result = (0, react.useMemo)(() => {
		parseExceptionRef.current = null;
		if (!response) return null;
		try {
			return sp.set(response);
		} catch (e) {
			parseExceptionRef.current = {
				source: "parser",
				code: "parse-exception",
				message: `Parser crashed: ${e instanceof Error ? e.message : String(e)}`,
				hint: "The response may contain syntax the parser cannot handle"
			};
			return null;
		}
	}, [sp, response]);
	const store = (0, react.useMemo)(() => (0, _invdev_lang_core.createStore)(), []);
	const queryManager = (0, react.useMemo)(() => (0, _invdev_lang_core.createQueryManager)(toolProvider ?? null), [toolProvider]);
	(0, react.useEffect)(() => {
		queryManager.activate();
		return () => queryManager.dispose();
	}, [queryManager]);
	const storeInitKeyRef = (0, react.useRef)(Symbol());
	(0, react.useEffect)(() => {
		if (!result?.stateDeclarations && !initialState) return;
		const key = `${JSON.stringify(result?.stateDeclarations)}::${JSON.stringify(initialState)}`;
		if (storeInitKeyRef.current === key) return;
		storeInitKeyRef.current = key;
		const bindingDefaults = {};
		if (initialState) for (const [key, value] of Object.entries(initialState)) if (key.startsWith("$")) bindingDefaults[key] = value;
		else store.set(key, value);
		store.initialize(result?.stateDeclarations ?? {}, bindingDefaults);
	}, [
		result?.stateDeclarations,
		store,
		initialState
	]);
	const storeSnapshot = (0, react.useSyncExternalStore)(store.subscribe, store.getSnapshot, store.getSnapshot);
	const querySnapshot = (0, react.useSyncExternalStore)(queryManager.subscribe, queryManager.getSnapshot, queryManager.getSnapshot);
	const evaluationContext = (0, react.useMemo)(() => ({
		getState: (name) => unwrapFieldValue(store.get(name)),
		resolveRef: (name) => {
			const mutResult = queryManager.getMutationResult(name);
			if (mutResult) return mutResult;
			return queryManager.getResult(name);
		}
	}), [store, queryManager]);
	(0, react.useEffect)(() => {
		if (isStreaming) return;
		const evaluatedNodes = (result?.queryStatements ?? []).map((qn) => {
			const relevantDeps = {};
			if (qn.deps) for (const ref of qn.deps) relevantDeps[ref] = storeSnapshot[ref];
			return {
				statementId: qn.statementId,
				toolName: qn.toolAST ? (0, _invdev_lang_core.evaluate)(qn.toolAST, evaluationContext) : "",
				args: qn.argsAST ? (0, _invdev_lang_core.evaluate)(qn.argsAST, evaluationContext) : null,
				defaults: qn.defaultsAST ? (0, _invdev_lang_core.evaluate)(qn.defaultsAST, evaluationContext) : null,
				refreshInterval: qn.refreshAST ? (0, _invdev_lang_core.evaluate)(qn.refreshAST, evaluationContext) : void 0,
				deps: Object.keys(relevantDeps).length > 0 ? relevantDeps : void 0,
				complete: qn.complete
			};
		});
		queryManager.evaluateQueries(evaluatedNodes);
	}, [
		isStreaming,
		result?.queryStatements,
		evaluationContext,
		queryManager,
		storeSnapshot
	]);
	(0, react.useEffect)(() => {
		if (isStreaming) return;
		const nodes = (result?.mutationStatements ?? []).map((mn) => ({
			statementId: mn.statementId,
			toolName: mn.toolAST ? (0, _invdev_lang_core.evaluate)(mn.toolAST, evaluationContext) : ""
		}));
		queryManager.registerMutations(nodes);
	}, [
		isStreaming,
		result?.mutationStatements,
		evaluationContext,
		queryManager
	]);
	const propsRef = (0, react.useRef)({
		onAction,
		onStateUpdate
	});
	propsRef.current = {
		onAction,
		onStateUpdate
	};
	const resultRef = (0, react.useRef)(result);
	resultRef.current = result;
	const lastInitSnapshotRef = (0, react.useRef)(null);
	(0, react.useEffect)(() => {
		lastInitSnapshotRef.current = store.getSnapshot();
		return store.subscribe(() => {
			const currentSnapshot = store.getSnapshot();
			if (currentSnapshot === lastInitSnapshotRef.current) return;
			lastInitSnapshotRef.current = null;
			propsRef.current.onStateUpdate?.(currentSnapshot);
		});
	}, [store]);
	const getFieldValue = (0, react.useCallback)((formName, name) => {
		if (!formName) return unwrapFieldValue(store.get(name));
		const formData = store.get(formName);
		if (!formData || typeof formData !== "object" || Array.isArray(formData)) return void 0;
		return unwrapFieldValue(formData[name]);
	}, [store]);
	const setFieldValue = (0, react.useCallback)((formName, componentType, name, value, shouldTriggerSaveCallback = true) => {
		const wrapped = {
			value,
			componentType
		};
		if (!formName) store.set(name, wrapped);
		else {
			const raw = store.get(formName);
			const formData = raw && typeof raw === "object" && !Array.isArray(raw) ? raw : {};
			store.set(formName, {
				...formData,
				[name]: wrapped
			});
		}
		if (shouldTriggerSaveCallback) propsRef.current.onStateUpdate?.(store.getSnapshot());
	}, [store]);
	const getFormPayload = (0, react.useCallback)((formName) => {
		if (formName) {
			const raw = store.get(formName);
			if (raw && typeof raw === "object" && !Array.isArray(raw)) return { [formName]: raw };
		}
		return store.getSnapshot();
	}, [store]);
	const triggerAction = (0, react.useCallback)(async (userMessage, formName, action) => {
		const formPayload = getFormPayload(formName);
		const { onAction: handler } = propsRef.current;
		if (action && !("steps" in action)) {
			const actionType = action.type || _invdev_lang_core.BuiltinActionType.ContinueConversation;
			const params = { ...action.params || {} };
			if (action.url) params.url = action.url;
			if (action.context) params.context = action.context;
			handler?.({
				type: actionType,
				params,
				humanFriendlyMessage: userMessage,
				formState: formPayload,
				formName
			});
			return;
		}
		const actionPlan = action;
		if (actionPlan?.steps) {
			for (const step of actionPlan.steps) switch (step.type) {
				case _invdev_lang_core.ACTION_STEPS.Run:
					if (step.refType === "mutation") {
						const mn = resultRef.current?.mutationStatements?.find((m) => m.statementId === step.statementId);
						const evaluatedArgs = mn?.argsAST ? (0, _invdev_lang_core.evaluate)(mn.argsAST, evaluationContext) : {};
						if (!await queryManager.fireMutation(step.statementId, evaluatedArgs)) return;
					} else queryManager.invalidate([step.statementId]);
					break;
				case _invdev_lang_core.ACTION_STEPS.ToAssistant:
					handler?.({
						type: _invdev_lang_core.BuiltinActionType.ContinueConversation,
						params: step.context ? { context: step.context } : {},
						humanFriendlyMessage: step.message,
						formState: formPayload,
						formName
					});
					break;
				case _invdev_lang_core.ACTION_STEPS.OpenUrl:
					handler?.({
						type: _invdev_lang_core.BuiltinActionType.OpenUrl,
						params: { url: step.url },
						humanFriendlyMessage: "",
						formState: formPayload,
						formName
					});
					break;
				case _invdev_lang_core.ACTION_STEPS.Set: {
					if (!step.valueAST) {
						console.warn(`[inv] Set action for ${step.target} has no valueAST — skipping`);
						break;
					}
					const value = (0, _invdev_lang_core.evaluate)(step.valueAST, evaluationContext);
					store.set(step.target, value);
					break;
				}
				case _invdev_lang_core.ACTION_STEPS.Reset: {
					const decls = resultRef.current?.stateDeclarations ?? {};
					for (const target of step.targets) store.set(target, decls[target] ?? null);
					break;
				}
			}
			return;
		}
		handler?.({
			type: _invdev_lang_core.BuiltinActionType.ContinueConversation,
			params: {},
			humanFriendlyMessage: userMessage,
			formState: formPayload,
			formName
		});
	}, [
		queryManager,
		evaluationContext,
		getFormPayload,
		store
	]);
	const renderErrorsRef = (0, react.useRef)([]);
	const isStreamingRef = (0, react.useRef)(isStreaming);
	isStreamingRef.current = isStreaming;
	const reportError = (0, react.useCallback)((error) => {
		if (isStreamingRef.current) return;
		renderErrorsRef.current.push(error);
	}, []);
	const isQueryLoading = querySnapshot.__inv_loading.length > 0;
	const contextValue = (0, react.useMemo)(() => ({
		library,
		renderNode: renderDeep,
		triggerAction,
		isStreaming,
		getFieldValue,
		setFieldValue,
		store,
		evaluationContext,
		reportError,
		isQueryLoading
	}), [
		library,
		renderDeep,
		isStreaming,
		isQueryLoading,
		triggerAction,
		getFieldValue,
		setFieldValue,
		store,
		evaluationContext,
		reportError
	]);
	const runtimeErrorsRef = (0, react.useRef)([]);
	const evaluatedResult = (0, react.useMemo)(() => {
		if (!result?.root) return result;
		const errors = [];
		const evalCtx = {
			ctx: evaluationContext,
			library,
			store,
			errors
		};
		try {
			const evaluatedRoot = (0, _invdev_lang_core.evaluateElementProps)(result.root, evalCtx);
			runtimeErrorsRef.current = errors;
			return {
				...result,
				root: evaluatedRoot
			};
		} catch (e) {
			const msg = e instanceof Error ? e.message : String(e);
			errors.push({
				source: "runtime",
				code: "runtime-error",
				message: `Prop evaluation failed: ${msg}`
			});
			runtimeErrorsRef.current = errors;
			return result;
		}
	}, [
		result,
		evaluationContext,
		library,
		store,
		storeSnapshot,
		querySnapshot
	]);
	const { errorsRef, errorRevision } = useInvErrors({
		response,
		isStreaming,
		result,
		evaluatedResult,
		library,
		querySnapshot,
		parseExceptionRef,
		runtimeErrorsRef,
		renderErrorsRef,
		onError
	});
	useStreamingObservability({
		response,
		isStreaming,
		result,
		errorsRef,
		errorRevision,
		publish: publishObservability,
		__libraryId: library.__libraryId
	});
	return {
		result: evaluatedResult,
		parseResult: result,
		contextValue,
		isQueryLoading
	};
}
//#endregion
//#region src/Renderer.tsx
/**
* Error boundary that intentionally shows the last successfully rendered
* children when a render error occurs. This "show last good state" behavior
* prevents the UI from going blank during streaming or transient evaluation
* errors, and auto-recovers when new valid children arrive.
*/
var ElementErrorBoundary = class extends react.Component {
	lastValidChildren = null;
	constructor(props) {
		super(props);
		this.state = { hasError: false };
	}
	static getDerivedStateFromError() {
		return { hasError: true };
	}
	componentDidMount() {
		if (!this.state.hasError) this.lastValidChildren = this.props.children;
	}
	componentDidUpdate(prevProps) {
		if (!this.state.hasError) this.lastValidChildren = this.props.children;
		if (this.state.hasError && prevProps.children !== this.props.children) this.setState({ hasError: false });
	}
	componentDidCatch(error) {
		const name = this.props.componentName ?? "Unknown";
		this.props.onError?.({
			source: "runtime",
			code: "render-error",
			component: name,
			message: `Component ${name} render failed: ${error.message}`
		});
	}
	render() {
		if (this.state.hasError) return this.lastValidChildren;
		return this.props.children;
	}
};
/**
* Recursively renders a parsed value (element, array, primitive)
* into React nodes.
*/
function renderDeep(value) {
	if (value == null) return null;
	if (typeof value === "string") return value;
	if (typeof value === "number") return String(value);
	if (typeof value === "boolean") return String(value);
	if (Array.isArray(value)) return value.map((v, i) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(react.Fragment, { children: renderDeep(v) }, i));
	if (typeof value === "object" && value !== null) {
		const obj = value;
		if (obj.type === "element") return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(RenderNode, { node: obj });
	}
	return null;
}
/**
* Renders a single ElementNode.
*/
function RenderNode({ node }) {
	const { library, reportError } = useInv();
	const Comp = library.components[node.typeName]?.component;
	if (!Comp) return null;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ElementErrorBoundary, {
		componentName: node.typeName,
		onError: reportError,
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(RenderNodeInner, {
			el: node,
			Comp
		})
	});
}
/**
* Renders a resolved element using its renderer.
* Props are already evaluated by evaluate-tree — no AST awareness needed.
*/
function RenderNodeInner({ el, Comp }) {
	const renderNode = useRenderNode();
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Comp, {
		props: el.props,
		renderNode,
		statementId: el.statementId
	});
}
let loadingStyleInjected = false;
function ensureLoadingStyle() {
	if (loadingStyleInjected || typeof document === "undefined") return;
	loadingStyleInjected = true;
	const style = document.createElement("style");
	style.textContent = `@keyframes inv-spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`;
	document.head.appendChild(style);
}
const DefaultQueryLoader = () => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", { style: {
	position: "absolute",
	top: 8,
	right: 8,
	width: 16,
	height: 16,
	border: "2px solid #e5e7eb",
	borderTopColor: "#3b82f6",
	borderRadius: "50%",
	animation: "inv-spin 0.6s linear infinite",
	zIndex: 10
} });
function Renderer({ response, library, isStreaming = false, onAction, onStateUpdate, initialState, onParseResult, toolProvider, queryLoader, onError, publishObservability }) {
	(0, react.useInsertionEffect)(() => {
		ensureLoadingStyle();
	}, []);
	const onParseResultRef = (0, react.useRef)(onParseResult);
	onParseResultRef.current = onParseResult;
	const toolProviderInputRef = (0, react.useRef)(toolProvider);
	toolProviderInputRef.current = toolProvider;
	const stableToolProvider = (0, react.useRef)({ async callTool(toolName, args) {
		const current = toolProviderInputRef.current ?? null;
		if (current == null) throw new Error("[inv] toolProvider is null");
		if (typeof current.callTool === "function") return (0, _invdev_lang_core.extractToolResult)(await current.callTool({
			name: toolName,
			arguments: args
		}));
		const map = current;
		const fn = map[toolName];
		if (!fn) throw new _invdev_lang_core.ToolNotFoundError(toolName, Object.keys(map));
		return fn(args);
	} });
	const { result, parseResult, contextValue, isQueryLoading } = useInvState({
		response,
		library,
		isStreaming,
		onAction,
		onStateUpdate,
		initialState,
		toolProvider: toolProvider != null ? stableToolProvider.current : null,
		onError,
		publishObservability
	}, renderDeep);
	(0, react.useEffect)(() => {
		onParseResultRef.current?.(parseResult);
	}, [parseResult]);
	if (!result?.root) return null;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(InvContext.Provider, {
		value: contextValue,
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
			style: { position: "relative" },
			children: [isQueryLoading && (queryLoader ?? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(DefaultQueryLoader, {})), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				style: {
					opacity: isQueryLoading ? .7 : 1,
					transition: "opacity 0.2s ease"
				},
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(RenderNode, { node: result.root })
			})]
		})
	});
}
//#endregion
//#region src/runtime/reactive.ts
/**
* Mark a schema prop as reactive so runtime evaluation can preserve $bindings.
*
* The widened return type carries the eventual value shape into helpers like
* `useStateField()`. The actual bound value is still resolved at render time.
*/
function reactive(schema) {
	(0, _invdev_lang_core.markReactive)(schema);
	return schema;
}
//#endregion
//#region src/hooks/useStateField.ts
function useStateField(name, value) {
	const ctx = useInv();
	const formName = useFormName();
	return (0, _invdev_lang_core.resolveStateField)(name, value, ctx.store ?? null, ctx.evaluationContext ?? null, (fieldName) => ctx.getFieldValue(formName, fieldName), (fieldName, nextValue) => ctx.setFieldValue(formName, void 0, fieldName, nextValue));
}
//#endregion
//#region src/hooks/useFormValidation.ts
const FormValidationContext = (0, react.createContext)(null);
function useFormValidation() {
	return (0, react.useContext)(FormValidationContext);
}
function useCreateFormValidation() {
	const [errors, setErrors] = (0, react.useState)({});
	const errorsRef = (0, react.useRef)(errors);
	errorsRef.current = errors;
	const fieldsRef = (0, react.useRef)({});
	const getFieldError = (0, react.useCallback)((name) => errorsRef.current[name], []);
	const validateField = (0, react.useCallback)((name, value, rules) => {
		const error = (0, _invdev_lang_core.validate)(value, rules);
		setErrors((prev) => {
			if (prev[name] === error) return prev;
			return {
				...prev,
				[name]: error
			};
		});
		return !error;
	}, []);
	const registerField = (0, react.useCallback)((name, rules, getValue) => {
		fieldsRef.current[name] = {
			rules,
			getValue
		};
	}, []);
	const unregisterField = (0, react.useCallback)((name) => {
		delete fieldsRef.current[name];
	}, []);
	const validateForm = (0, react.useCallback)(() => {
		let allValid = true;
		const newErrors = {};
		for (const [name, reg] of Object.entries(fieldsRef.current)) {
			let value = reg.getValue();
			if (value != null && typeof value === "object" && "value" in value && "componentType" in value) value = value.value;
			const error = (0, _invdev_lang_core.validate)(value, reg.rules);
			newErrors[name] = error;
			if (error) allValid = false;
		}
		setErrors(newErrors);
		return allValid;
	}, []);
	const clearFieldError = (0, react.useCallback)((name) => {
		setErrors((prev) => {
			if (prev[name] === void 0) return prev;
			return {
				...prev,
				[name]: void 0
			};
		});
	}, []);
	return (0, react.useMemo)(() => ({
		errors,
		getFieldError,
		validateField,
		registerField,
		unregisterField,
		validateForm,
		clearFieldError
	}), [
		errors,
		getFieldError,
		validateField,
		registerField,
		unregisterField,
		validateForm,
		clearFieldError
	]);
}
//#endregion
Object.defineProperty(exports, "FormNameContext", {
	enumerable: true,
	get: function() {
		return FormNameContext;
	}
});
Object.defineProperty(exports, "FormValidationContext", {
	enumerable: true,
	get: function() {
		return FormValidationContext;
	}
});
Object.defineProperty(exports, "Renderer", {
	enumerable: true,
	get: function() {
		return Renderer;
	}
});
Object.defineProperty(exports, "__toESM", {
	enumerable: true,
	get: function() {
		return __toESM;
	}
});
Object.defineProperty(exports, "createLibrary", {
	enumerable: true,
	get: function() {
		return createLibrary;
	}
});
Object.defineProperty(exports, "defineComponent", {
	enumerable: true,
	get: function() {
		return defineComponent;
	}
});
Object.defineProperty(exports, "reactive", {
	enumerable: true,
	get: function() {
		return reactive;
	}
});
Object.defineProperty(exports, "useCreateFormValidation", {
	enumerable: true,
	get: function() {
		return useCreateFormValidation;
	}
});
Object.defineProperty(exports, "useFormName", {
	enumerable: true,
	get: function() {
		return useFormName;
	}
});
Object.defineProperty(exports, "useFormValidation", {
	enumerable: true,
	get: function() {
		return useFormValidation;
	}
});
Object.defineProperty(exports, "useGetFieldValue", {
	enumerable: true,
	get: function() {
		return useGetFieldValue;
	}
});
Object.defineProperty(exports, "useIsQueryLoading", {
	enumerable: true,
	get: function() {
		return useIsQueryLoading;
	}
});
Object.defineProperty(exports, "useIsStreaming", {
	enumerable: true,
	get: function() {
		return useIsStreaming;
	}
});
Object.defineProperty(exports, "useRenderNode", {
	enumerable: true,
	get: function() {
		return useRenderNode;
	}
});
Object.defineProperty(exports, "useSetDefaultValue", {
	enumerable: true,
	get: function() {
		return useSetDefaultValue;
	}
});
Object.defineProperty(exports, "useSetFieldValue", {
	enumerable: true,
	get: function() {
		return useSetFieldValue;
	}
});
Object.defineProperty(exports, "useStateField", {
	enumerable: true,
	get: function() {
		return useStateField;
	}
});
Object.defineProperty(exports, "useTriggerAction", {
	enumerable: true,
	get: function() {
		return useTriggerAction;
	}
});

//# sourceMappingURL=useFormValidation-DRIRKK5N.cjs.map