Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
let react = require("react");
let zustand = require("zustand");
let zustand_react_shallow = require("zustand/react/shallow");
let react_jsx_runtime = require("react/jsx-runtime");
let _invdev_observability = require("@inv/observability");
let zustand_middleware = require("zustand/middleware");
let _ag_ui_core = require("@ag-ui/core");
//#region src/cloud/wire.ts
/** Forward cursor: pass `last_id` back as `?after=` when there's another page. */
function nextCursorOf(envelope) {
	return envelope.has_more && envelope.last_id ? envelope.last_id : void 0;
}
/**
* Request helper: prefix baseUrl, set JSON content-type only when sending a
* body, throw on non-2xx. `fetchImpl` is the token-injecting fetch — auth
* lives there, never here.
*/
function cloudRequest(fetchImpl, baseUrl) {
	const base = baseUrl.replace(/\/+$/, "");
	return async (path, init) => {
		const res = await fetchImpl(`${base}${path}`, {
			...init,
			headers: {
				...init?.body ? { "Content-Type": "application/json" } : {},
				...init?.headers
			}
		});
		if (!res.ok) throw new Error(`Inv Cloud: ${init?.method ?? "GET"} ${path} failed: ${res.status} ${res.statusText}`);
		return res;
	};
}
//#endregion
//#region src/cloud/artifactStorage.ts
function toSummary(artifact) {
	return {
		id: artifact.id,
		title: artifact.name ?? artifact.id,
		type: artifact.kind,
		threadId: artifact.conversation_id,
		updatedAt: (artifact.updated_at ?? artifact.created_at) * 1e3
	};
}
function cloudArtifactStorage({ baseUrl, fetch: fetchImpl, pageLimit = 100 }) {
	const request = cloudRequest(fetchImpl, baseUrl);
	return {
		/** GET /v1/artifacts?[name=][kind=…]&limit[&after=]. Omitting the
		*  conversation scope lists across conversations, token-scoped to the user. */
		async list(params) {
			const query = new URLSearchParams();
			if (params?.name !== void 0 && params.name !== "") query.set("name", params.name);
			for (const type of params?.type ?? []) query.append("kind", type);
			if (params?.cursor !== void 0) query.set("after", params.cursor);
			query.set("limit", String(params?.limit ?? pageLimit));
			const envelope = await (await request(`/v1/artifacts?${query.toString()}`)).json();
			return {
				artifacts: envelope.data.map(toSummary),
				nextCursor: nextCursorOf(envelope)
			};
		},
		/** GET /v1/artifacts/:id → the stored inv-lang program (bare program;
		*  the renderer's parser sniffs the `root = …` root). */
		async get(id) {
			const artifact = await (await request(`/v1/artifacts/${encodeURIComponent(id)}`)).json();
			return {
				...toSummary(artifact),
				content: artifact.content
			};
		},
		/** POST /v1/artifacts/:id {content}. Send the edited inner program (a
		*  string); omit version to let the server bump it. */
		async update(patch) {
			const content = typeof patch.content === "string" ? patch.content : JSON.stringify(patch.content);
			return toSummary(await (await request(`/v1/artifacts/${encodeURIComponent(patch.id)}`, {
				method: "POST",
				body: JSON.stringify({ content })
			})).json());
		}
	};
}
//#endregion
//#region src/cloud/frontendTokenManager.ts
/**
* Frontend session-token (fct_) lifecycle for the browser plane.
*
* - The token rides ONLY the `x-inv-frontend-token` header; `Authorization`
*   on /v1/* always means the master key (server-side).
* - Minting happens on YOUR backend (here, the /api/frontend-token proxy),
*   which calls the cloud mint endpoint with the master key and decides the
*   end-user identity server-side. The browser sends no body and never names
*   its own user.
* - Mint response: { token: 'fct_…', expires_at: <unix seconds> }, TTL ~15 min.
*
* A fetch override (not static headers) is used so the token can refresh
* mid-session — the chat provider captures the storage object once at mount.
*/
const FRONTEND_TOKEN_HEADER = "x-inv-frontend-token";
function createFrontendTokenManager({ mintUrl, fetch: customFetch, refreshSkewSeconds = 60 }) {
	const fetchImpl = customFetch ?? globalThis.fetch.bind(globalThis);
	let token = null;
	let expiresAt = 0;
	let inflight = null;
	const mint = async () => {
		const res = await fetchImpl(mintUrl, { method: "POST" });
		if (!res.ok) throw new Error(`frontend-token mint failed: ${res.status} ${res.statusText}`);
		const body = await res.json();
		token = body.token;
		expiresAt = body.expires_at;
		return body.token;
	};
	return {
		async getToken() {
			const nowSeconds = Date.now() / 1e3;
			if (token !== null && nowSeconds < expiresAt - refreshSkewSeconds) return token;
			if (inflight === null) inflight = mint().finally(() => {
				inflight = null;
			});
			return inflight;
		},
		invalidate(staleToken) {
			if (staleToken === void 0 || staleToken === token) {
				token = null;
				expiresAt = 0;
			}
		}
	};
}
/**
* Wrap a base fetch so every request carries a fresh token, with one reactive
* retry on 401. The request is re-sent with the same init — pass re-readable
* (string) bodies only.
*/
function createFctFetch(tokens, baseFetch) {
	const fetchImpl = baseFetch ?? globalThis.fetch.bind(globalThis);
	return async (input, init) => {
		const token = await tokens.getToken();
		const headers = new Headers(init?.headers);
		headers.set(FRONTEND_TOKEN_HEADER, token);
		let res = await fetchImpl(input, {
			...init,
			headers
		});
		if (res.status === 401) {
			tokens.invalidate(token);
			const freshToken = await tokens.getToken();
			const retryHeaders = new Headers(init?.headers);
			retryHeaders.set(FRONTEND_TOKEN_HEADER, freshToken);
			res = await fetchImpl(input, {
				...init,
				headers: retryHeaders
			});
		}
		return res;
	};
}
//#endregion
//#region src/stream/formats/openai-conversation-message-format.ts
/**
* Both the Responses API and the Conversations API accept
* `ResponseInputItem[]` as input, so a single outbound conversion
* works for both.
*
* Tool calls are *sibling items* of the assistant message, not nested
* inside it.  We flatten each AG-UI assistant message into:
*   1. An `EasyInputMessage` with `role: "assistant"` (text part)
*   2. One `ResponseFunctionToolCall` per tool call
*
* Tool result messages become `FunctionCallOutput` items.
*/
function toItems(message) {
	switch (message.role) {
		case "user": return [toInputMessage(message)];
		case "assistant": {
			const items = [];
			if (message.content) items.push({
				role: "assistant",
				content: message.content,
				type: "message"
			});
			if (message.toolCalls?.length) for (const tc of message.toolCalls) items.push({
				type: "function_call",
				call_id: tc.id,
				name: tc.function.name,
				arguments: tc.function.arguments
			});
			return items;
		}
		case "tool": return [{
			type: "function_call_output",
			call_id: message.toolCallId,
			output: message.content
		}];
		case "system": return [{
			role: "system",
			content: message.content,
			type: "message"
		}];
		case "developer": return [{
			role: "developer",
			content: message.content,
			type: "message"
		}];
		default: return [];
	}
}
function toInputMessage(message) {
	const content = message.content;
	if (typeof content === "string") return {
		role: "user",
		content,
		type: "message"
	};
	return {
		role: "user",
		content: content?.map((part) => {
			if (part.type === "text") return {
				type: "input_text",
				text: part.text
			};
			if (part.type === "binary") return {
				type: "input_image",
				image_url: part.url ?? `data:${part.mimeType};base64,${part.data ?? ""}`,
				detail: "auto"
			};
			return {
				type: "input_text",
				text: ""
			};
		}) ?? [],
		type: "message"
	};
}
/**
* Converts `ConversationItem[]` (from the Conversations API) or
* `ResponseItem[]` (from the Responses API) into AG-UI `Message[]`.
*
* Both APIs return items as a flat list with `type` discriminator:
*   - `"message"` → user / assistant / system / developer / tool message
*   - `"function_call"` → tool call (grouped into the preceding assistant)
*   - `"function_call_output"` → tool result
*
* The Conversations API `Message` type is a superset that also handles
* `reasoning_text`, `summary_text`, and `text` content parts, as well
* as additional roles like `tool` and `critic`.
*/
function fromItems(items) {
	const messages = [];
	let currentAssistant = null;
	let pendingToolMsgs = [];
	const flushAssistant = () => {
		if (currentAssistant) {
			messages.push(currentAssistant);
			currentAssistant = null;
		}
		if (pendingToolMsgs.length > 0) {
			messages.push(...pendingToolMsgs);
			pendingToolMsgs = [];
		}
	};
	for (const item of items) switch (item.type) {
		case "message": {
			flushAssistant();
			const msg = item;
			if (msg.role === "assistant") currentAssistant = {
				id: msg.id,
				role: "assistant",
				content: extractTextContent$1(msg) || void 0
			};
			else if (msg.role === "tool") messages.push({
				id: msg.id,
				role: "tool",
				content: extractTextContent$1(msg),
				toolCallId: ""
			});
			else if (msg.role === "user") messages.push(fromUserMessage(msg));
			else {
				const role = msg.role === "developer" ? "developer" : "system";
				messages.push({
					id: msg.id,
					role,
					content: extractTextContent$1(msg)
				});
			}
			break;
		}
		case "function_call": {
			const tc = item;
			if (!currentAssistant) currentAssistant = {
				id: crypto.randomUUID(),
				role: "assistant"
			};
			currentAssistant = {
				...currentAssistant,
				toolCalls: [...currentAssistant.toolCalls ?? [], {
					id: tc.call_id,
					type: "function",
					function: {
						name: tc.name,
						arguments: tc.arguments
					}
				}]
			};
			break;
		}
		case "function_call_output": {
			const output = item;
			pendingToolMsgs.push({
				id: output.id,
				role: "tool",
				content: typeof output.output === "string" ? output.output : JSON.stringify(output.output),
				toolCallId: output.call_id
			});
			break;
		}
		case "mcp_call": {
			if (!currentAssistant) currentAssistant = {
				id: crypto.randomUUID(),
				role: "assistant"
			};
			currentAssistant = {
				...currentAssistant,
				toolCalls: [...currentAssistant.toolCalls ?? [], {
					id: item.id,
					type: "function",
					function: {
						name: item.name,
						arguments: item.arguments
					}
				}]
			};
			const errorText = typeof item.error === "string" && item.error.length > 0 ? item.error : void 0;
			pendingToolMsgs.push({
				id: `${item.id}-output`,
				role: "tool",
				content: item.output ?? "",
				toolCallId: item.id,
				...errorText ? { error: errorText } : {}
			});
			break;
		}
		default: break;
	}
	flushAssistant();
	return messages;
}
/**
* Extract text content from a Conversations API `Message`.
*
* Handles the full content union:
*   - `output_text` (assistant output)
*   - `input_text` (user/system/developer input)
*   - `text` (generic text)
*   - `summary_text`, `reasoning_text` (appended)
*   - `refusal` (mapped to text)
*/
function extractTextContent$1(msg) {
	return msg.content.map((part) => {
		switch (part.type) {
			case "output_text": return part.text;
			case "input_text": return part.text;
			case "text": return part.text;
			case "summary_text": return part.text;
			case "reasoning_text": return part.text;
			case "refusal": return `[Refusal]: ${part.refusal}`;
			default: return "";
		}
	}).filter(Boolean).join("");
}
function fromUserMessage(msg) {
	if (!msg.content.some((part) => part.type === "input_image" || part.type === "input_file")) return {
		id: msg.id,
		role: "user",
		content: extractTextContent$1(msg)
	};
	const parts = msg.content.map((part) => {
		if (part.type === "input_text" || part.type === "text") return {
			type: "text",
			text: part.text
		};
		if (part.type === "input_image" && part.image_url) return {
			type: "binary",
			url: part.image_url,
			mimeType: "image/*"
		};
		return {
			type: "text",
			text: ""
		};
	});
	return {
		id: msg.id,
		role: "user",
		content: parts
	};
}
/**
* Converts between AG-UI message format and OpenAI's item-based format,
* compatible with both the **Responses API** and **Conversations API**.
*
* AG-UI → OpenAI (toApi):
*   - Returns `ResponseInputItem[]` — works for both `responses.create({ input })`
*     and `conversations.items.create({ items })`
*   - Flattens assistant messages: text → `EasyInputMessage`, tool calls → `ResponseFunctionToolCall`
*
* OpenAI → AG-UI (fromApi):
*   - Accepts `ConversationItem[]` (or `ResponseItem[]`, which is a subset)
*   - Groups adjacent assistant messages + function_calls into `AssistantMessage`
*   - Handles Conversations-specific content types (`reasoning_text`, `summary_text`, etc.)
*/
const openAIConversationMessageFormat = {
	toApi(messages) {
		return messages.flatMap(toItems);
	},
	fromApi(data) {
		return fromItems(data);
	}
};
//#endregion
//#region src/cloud/items.ts
/**
* Convert /v1 conversation items to AG-UI Message[]. Each item is normalized
* into the OpenAI ConversationItem shape that openAIConversationMessageFormat
* .fromApi expects, then delegated — the grouping logic (function_call →
* assistant toolCalls, function_call_output → ToolMessage) stays in the SDK.
*
* Normalizations:
*  - message content: assistant outputs arrive as part arrays; user inputs
*    arrive as a plain string → wrap strings as a single text part.
*  - function_call / function_call_output: a malformed row (missing the
*    top-level call_id/name/output) is skipped so it can't crash fromApi.
*  - other item types are skipped.
*/
function normalizeItem(item) {
	switch (item.type) {
		case "message": {
			const content = item.content;
			const parts = Array.isArray(content) ? content : [{
				type: item.role === "assistant" ? "output_text" : "input_text",
				text: typeof content === "string" ? content : ""
			}];
			return {
				id: item.id,
				type: "message",
				role: item.role ?? "user",
				status: item.status ?? "completed",
				content: parts
			};
		}
		case "function_call":
			if (typeof item.call_id !== "string" || typeof item.name !== "string") return null;
			return {
				id: item.id,
				type: "function_call",
				call_id: item.call_id,
				name: item.name,
				arguments: typeof item.arguments === "string" ? item.arguments : JSON.stringify(item.arguments ?? {})
			};
		case "function_call_output":
			if (typeof item.call_id !== "string" || item.output === void 0) return null;
			return {
				id: item.id,
				type: "function_call_output",
				call_id: item.call_id,
				output: item.output
			};
		default: return null;
	}
}
function cloudItemsToMessages(items) {
	const normalized = items.map(normalizeItem).filter((i) => i !== null);
	return openAIConversationMessageFormat.fromApi(normalized);
}
//#endregion
//#region src/cloud/threadStorage.ts
/** Hard stop for the items pagination loop. */
const MAX_ITEM_PAGES = 50;
function toThread(conversation) {
	return {
		id: conversation.id,
		title: conversation.title ?? "New conversation",
		createdAt: conversation.created_at * 1e3
	};
}
/** Client-side title from the first user message (the API does not auto-title). */
function deriveTitle(firstMessage) {
	const content = firstMessage.content;
	let text = "";
	if (typeof content === "string") text = content;
	else if (Array.isArray(content)) {
		for (const part of content) if (part.type === "text" && typeof part.text === "string" && part.text.trim() !== "") {
			text = part.text;
			break;
		}
	}
	text = text.trim();
	return (text === "" ? "New conversation" : text).slice(0, 60);
}
function cloudThreadStorage({ baseUrl, fetch: fetchImpl, pageLimit = 100 }) {
	const request = cloudRequest(fetchImpl, baseUrl);
	return {
		/** GET /v1/conversations?limit[&after]. Newest-first. */
		async listThreads(cursor) {
			const query = new URLSearchParams({ limit: String(pageLimit) });
			if (cursor !== void 0) query.set("after", cursor);
			const envelope = await (await request(`/v1/conversations?${query.toString()}`)).json();
			return {
				threads: envelope.data.map(toThread),
				nextCursor: nextCursorOf(envelope)
			};
		},
		/** POST /v1/conversations {title}. No messages and no user_id — the user is
		*  bound from the token; the first message arrives later on the generation
		*  plane (conversation linkage). */
		async createThread(firstMessage) {
			return toThread(await (await request(`/v1/conversations`, {
				method: "POST",
				body: JSON.stringify({ title: deriveTitle(firstMessage) })
			})).json());
		},
		/** GET /v1/conversations/:id/items?order=asc, paged, then mapped to Messages. */
		async getMessages(threadId) {
			const items = [];
			let after;
			for (let page = 0; page < MAX_ITEM_PAGES; page++) {
				const query = new URLSearchParams({
					order: "asc",
					limit: String(pageLimit)
				});
				if (after !== void 0) query.set("after", after);
				const envelope = await (await request(`/v1/conversations/${encodeURIComponent(threadId)}/items?${query.toString()}`)).json();
				items.push(...envelope.data);
				after = nextCursorOf(envelope);
				if (after === void 0) break;
			}
			return cloudItemsToMessages(items);
		},
		/** POST /v1/conversations/:id {title}. */
		async updateThread(thread) {
			return toThread(await (await request(`/v1/conversations/${encodeURIComponent(thread.id)}`, {
				method: "POST",
				body: JSON.stringify({ title: thread.title })
			})).json());
		},
		/** DELETE /v1/conversations/:id (soft delete). */
		async deleteThread(id) {
			await request(`/v1/conversations/${encodeURIComponent(id)}`, { method: "DELETE" });
		}
	};
}
//#endregion
//#region src/cloud/invCloud.ts
/** Inv Cloud API origin used when `apiBaseUrl` is omitted. The storage
*  layer appends `/v1/...` to it. */
const DEFAULT_API_BASE_URL = "https://api.inv.dev";
/**
* One-call browser wiring for Inv Cloud, as a hook: a memoised `ChatStorage`
* backed by the /v1 API, authenticated per-request with an fct_ session token.
* Pass it straight to `<AgentInterface storage={…} />`.
*
* As a hook the storage (and its fct_ token manager) is created on mount and
* re-created only when its options change. Tokens are minted lazily on the first
* storage request. ChatProvider captures storage at mount; remount the provider
* when switching users or storage configurations.
*
* This is the READ/EDIT plane (browser → /v1/* with the fct_ token). Generation
* is the separate ChatLLM plane (browser → your backend → /v1/embed/responses
* with the master key).
*/
function useInvCloudStorage(options) {
	const { apiBaseUrl, token, fetch, refreshSkewSeconds } = options;
	const artifactOn = options.features?.artifact ?? true;
	return (0, react.useMemo)(() => createCloudStorage({
		apiBaseUrl,
		token,
		fetch,
		refreshSkewSeconds,
		features: { artifact: artifactOn }
	}), [
		apiBaseUrl,
		token,
		fetch,
		refreshSkewSeconds,
		artifactOn
	]);
}
/** The actual storage wiring — a pure factory with no React, memoised by the
*  hook above. */
function createCloudStorage(options) {
	const fctFetch = createFctFetch(toTokenManager(options), options.fetch);
	const artifactOn = options.features?.artifact ?? true;
	const baseUrl = options.apiBaseUrl ?? DEFAULT_API_BASE_URL;
	const storage = { thread: cloudThreadStorage({
		baseUrl,
		fetch: fctFetch
	}) };
	if (artifactOn) storage.artifact = cloudArtifactStorage({
		baseUrl,
		fetch: fctFetch
	});
	return storage;
}
/** Normalize the `token` option into a FrontendTokenManager. */
function toTokenManager(options) {
	if (typeof options.token === "string") return createFrontendTokenManager({
		mintUrl: options.token,
		fetch: options.fetch,
		refreshSkewSeconds: options.refreshSkewSeconds
	});
	const provider = options.token;
	let current = null;
	return {
		async getToken() {
			current = await provider();
			return current;
		},
		invalidate(staleToken) {
			if (staleToken === void 0 || staleToken === current) current = null;
		}
	};
}
//#endregion
//#region src/store/DetailedViewContext.ts
/** @internal React context holding the detailed-view Zustand store. Provided by `ChatProvider`. */
const DetailedViewContext = (0, react.createContext)(null);
/**
* Returns the raw detailed-view Zustand store for advanced use cases.
*
* Prefer {@link useDetailedView} or {@link useActiveDetailedView} for most cases —
* this hook is an escape hatch when you need direct store access.
*
* @category Hooks
* @returns The Zustand `StoreApi<DetailedViewStore>` instance
* @throws Error if called outside a `<ChatProvider>`
*/
const useDetailedViewStore = () => {
	const store = (0, react.useContext)(DetailedViewContext);
	if (!store) throw new Error("useDetailedViewStore must be used within a <ChatProvider>");
	return store;
};
//#endregion
//#region src/hooks/useActiveDetailedView.ts
/**
* Returns global detailed-view activation state — whether *any* view is open,
* and a close action that dismisses it.
*
* Use this in layout components that react to detailed-view presence (resizing
* panels, showing overlays) without needing to know *which* view is active.
* For per-view state and actions, use {@link useDetailedView} instead.
*
* Must be called within a `<ChatProvider>`.
*
* @category Hooks
* @returns {@link UseActiveDetailedViewReturn}
*/
function useActiveDetailedView() {
	const store = useDetailedViewStore();
	const activeDetailedViewId = (0, zustand.useStore)(store, (s) => s.activeDetailedViewId);
	return {
		isDetailedViewActive: activeDetailedViewId !== null,
		activeDetailedViewId,
		closeDetailedView: (0, react.useCallback)(() => {
			if (store.getState().activeDetailedViewId !== null) store.getState().setActiveDetailedView(null);
		}, [store])
	};
}
//#endregion
//#region src/store/ThreadContextContext.ts
/** @internal React context holding the ThreadContext Zustand store. Provided by `ChatProvider`. */
const ThreadContextContext = (0, react.createContext)(null);
/**
* Returns the raw ThreadContext Zustand store for advanced use cases.
*
* Prefer {@link useDetailedView}, {@link useActiveDetailedView}, {@link useAppList},
* or {@link useArtifactList} for most cases — this hook is an escape hatch when you
* need direct store access.
*
* @category Hooks
* @returns The Zustand `StoreApi<ThreadContextStore>` instance
* @throws Error if called outside a `<ChatProvider>`
*/
const useThreadContextStore = () => {
	const store = (0, react.useContext)(ThreadContextContext);
	if (!store) throw new Error("useThreadContextStore must be used within a <ChatProvider>");
	return store;
};
//#endregion
//#region src/hooks/useArtifactList.ts
/**
* Returns artifacts registered in the active thread, grouped by `id` and
* sorted ascending by `version`. The latest version of each artifact is the
* last element.
*
* Pass a filter to restrict by artifact `type` — e.g. the types from an
* `ArtifactCategory` to build category-grouped workspace sections.
*
* Must be called within a `<ChatProvider>`.
*
* @category Hooks
* @returns Map of artifact id → ordered version list
*
* @example
* ```tsx
* function WorkspaceSection({ category }: { category: ArtifactCategory }) {
*   const artifacts = useArtifactList({ type: category.filter.type });
*   const latest = Object.values(artifacts).map((v) => v[v.length - 1]);
*   return (
*     <ul>
*       {latest.map((a) => (
*         <li key={a.id}>{a.heading}</li>
*       ))}
*     </ul>
*   );
* }
* ```
*/
function useArtifactList(filter) {
	const artifacts = (0, zustand.useStore)(useThreadContextStore(), (s) => s.artifacts);
	const typeKey = filter?.type?.join(" ");
	return (0, react.useMemo)(() => {
		if (typeKey === void 0) return artifacts;
		const allowed = new Set(typeKey.split(" "));
		const result = {};
		for (const [id, versions] of Object.entries(artifacts)) {
			const latest = versions[versions.length - 1];
			if (latest && allowed.has(latest.type)) result[id] = versions;
		}
		return result;
	}, [artifacts, typeKey]);
}
//#endregion
//#region src/store/ArtifactRenderersContext.ts
const isDev$1 = () => typeof process !== "undefined" && process.env?.["NODE_ENV"] !== "production";
/**
* Builds an {@link ArtifactRendererRegistry} from a list of configs.
*
* First-wins on duplicate `toolName` or `type`: subsequent registrations are
* ignored with a dev-mode warning so the user can reorder their array
* (custom renderers should come *before* SDK defaults).
*
* @internal
*/
function buildArtifactRendererRegistry(configs) {
	const byToolName = /* @__PURE__ */ new Map();
	const byType = /* @__PURE__ */ new Map();
	for (const config of configs) {
		const toolNames = Array.isArray(config.toolName) ? config.toolName : [config.toolName];
		for (const name of toolNames) {
			if (byToolName.has(name)) {
				if (isDev$1()) console.warn(`[Inv] Artifact renderer for toolName "${name}" was ignored (already registered earlier in the array).`);
				continue;
			}
			byToolName.set(name, config);
		}
		if (byType.has(config.type)) {
			if (isDev$1()) console.warn(`[Inv] Artifact renderer for type "${config.type}" was ignored for type-based lookup (already registered earlier in the array).`);
			continue;
		}
		byType.set(config.type, config);
	}
	return {
		byToolName,
		byType
	};
}
/** Resolves the renderer matching a tool name, or `null`. @internal */
function lookupArtifactRenderer(registry, toolName) {
	return registry.byToolName.get(toolName) ?? null;
}
/** Resolves the renderer matching an artifact type, or `null`. @internal */
function lookupArtifactRendererByType(registry, type) {
	return registry.byType.get(type) ?? null;
}
/** @internal React context holding the renderer registry. Provided by `ChatProvider`. */
const ArtifactRenderersContext = (0, react.createContext)(null);
/**
* Returns the raw artifact-renderer registry for advanced use cases.
*
* Prefer {@link useArtifactRenderer} for resolving a specific tool name —
* this hook is an escape hatch for custom dispatching.
*
* Returns `null` if no `artifactRenderers` were provided to the `<ChatProvider>` —
* this is not an error since renderers are optional.
*
* @category Hooks
*/
const useArtifactRendererRegistry = () => {
	return (0, react.useContext)(ArtifactRenderersContext);
};
//#endregion
//#region src/hooks/useArtifactRenderer.ts
/**
* Resolves the artifact-renderer config matching a given `toolName`, or `null`
* if none match.
*
* Thin React wrapper over {@link lookupArtifactRenderer}: reads the registry
* from `<ChatProvider>` context and runs the lookup.
*
* Returns `null` if no `artifactRenderers` were supplied to the provider —
* callers should fall back to default rendering in that case.
*
* @category Hooks
*/
function useArtifactRenderer(toolName) {
	const registry = useArtifactRendererRegistry();
	if (!registry) return null;
	return lookupArtifactRenderer(registry, toolName);
}
//#endregion
//#region src/hooks/useDetailedView.ts
/**
* Binds a component to a specific detailed view by id, providing activation
* state and actions (open, close, toggle).
*
* Only one detailed view is active at a time across all kinds (apps, artifacts,
* and custom consumers). The `viewId` format is renderer-defined. The built-in
* App and Artifact renderers use `"${id}:${version}"`; custom consumers may
* pick any unique string.
*
* Must be called within a `<ChatProvider>`.
*
* @category Hooks
* @param viewId - Unique identifier for the detailed view
* @returns {@link UseDetailedViewReturn}
*
* @example
* ```tsx
* function PreviewButton({ viewId }: { viewId: string }) {
*   const { isActive, toggle } = useDetailedView(viewId);
*   return (
*     <button onClick={toggle}>
*       {isActive ? "Hide" : "Show"} Preview
*     </button>
*   );
* }
* ```
*/
function useDetailedView(viewId) {
	const store = useDetailedViewStore();
	return {
		isActive: (0, zustand.useStore)(store, (s) => s.activeDetailedViewId === viewId),
		open: (0, react.useCallback)(() => {
			store.getState().setActiveDetailedView(viewId);
		}, [store, viewId]),
		close: (0, react.useCallback)(() => {
			if (store.getState().activeDetailedViewId === viewId) store.getState().setActiveDetailedView(null);
		}, [store, viewId]),
		toggle: (0, react.useCallback)(() => {
			const state = store.getState();
			if (state.activeDetailedViewId === viewId) state.setActiveDetailedView(null);
			else state.setActiveDetailedView(viewId);
		}, [store, viewId])
	};
}
//#endregion
//#region src/hooks/useDetailedViewPortalTarget.ts
/**
* Provides access to the detailed-view portal target DOM node.
*
* This hook serves two roles:
* - **Registering a portal target:** Call `setNode` from a ref callback to
*   designate a DOM element as the render target for detailed-view content.
*   Only one target should be registered at a time.
* - **Reading the portal target:** Read `node` to get the current target
*   element for use with `createPortal()`.
*
* Must be called within a `<ChatProvider>`.
*
* @category Hooks
* @returns `{ setNode, node }` — setter for registration, getter for portal rendering
*
* @example
* ```tsx
* // Registering a portal target
* function MyPortalTarget() {
*   const { setNode } = useDetailedViewPortalTarget();
*   return <div ref={setNode} />;
* }
*
* // Building a custom detailed-view panel
* function MyDetailedViewPanel({ viewId, children }) {
*   const { isActive } = useDetailedView(viewId);
*   const { node } = useDetailedViewPortalTarget();
*   if (!isActive || !node) return null;
*   return createPortal(<div>{children}</div>, node);
* }
* ```
*/
function useDetailedViewPortalTarget() {
	const store = useDetailedViewStore();
	const node = (0, zustand.useStore)(store, (s) => s._detailedViewPanelNode);
	return {
		setNode: (0, react.useCallback)((node) => {
			store.getState()._setDetailedViewPanelNode(node);
		}, [store]),
		node
	};
}
//#endregion
//#region src/hooks/useMessage.tsx
/**
* @category Contexts
*/
const MessageContext = (0, react.createContext)(null);
/**
* @category Hooks
* @returns The current message. See {@link Message} for more information.
*/
const useMessage = () => {
	const context = (0, react.useContext)(MessageContext);
	if (!context) throw new Error("useMessage must be used within a MessageProvider");
	return context;
};
/**
* @category Components
*/
const MessageProvider = ({ message, children }) => {
	const ctxValue = (0, zustand_react_shallow.useShallow)((_s) => ({ message }))();
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(MessageContext.Provider, {
		value: ctxValue,
		children
	});
};
//#endregion
//#region src/store/ChatContext.ts
const ChatContext = (0, react.createContext)(null);
const useChatStore = () => {
	const store = (0, react.useContext)(ChatContext);
	if (!store) throw new Error("useChatStore must be used within a <ChatProvider>");
	return store;
};
//#endregion
//#region src/hooks/useThread.ts
const threadSelector = (s) => ({
	messages: s.messages,
	isRunning: s.isRunning,
	isLoadingMessages: s.isLoadingMessages,
	threadError: s.threadError,
	executingToolCallIds: s.executingToolCallIds,
	processMessage: s.processMessage,
	appendMessages: s.appendMessages,
	updateMessage: s.updateMessage,
	setMessages: s.setMessages,
	deleteMessage: s.deleteMessage,
	cancelMessage: s.cancelMessage
});
const threadListSelector = (s) => ({
	threads: s.threads,
	isLoadingThreads: s.isLoadingThreads,
	threadListError: s.threadListError,
	selectedThreadId: s.selectedThreadId,
	hasMoreThreads: s.hasMoreThreads,
	loadThreads: s.loadThreads,
	loadMoreThreads: s.loadMoreThreads,
	switchToNewThread: s.switchToNewThread,
	createThread: s.createThread,
	selectThread: s.selectThread,
	updateThread: s.updateThread,
	deleteThread: s.deleteThread
});
function useThread(selector) {
	const store = useChatStore();
	if (selector) return (0, zustand.useStore)(store, (s) => selector(threadSelector(s)));
	return (0, zustand.useStore)(store, (0, zustand_react_shallow.useShallow)(threadSelector));
}
function useThreadList(selector) {
	const store = useChatStore();
	if (selector) return (0, zustand.useStore)(store, (s) => selector(threadListSelector(s)));
	return (0, zustand.useStore)(store, (0, zustand_react_shallow.useShallow)(threadListSelector));
}
//#endregion
//#region src/store/toolActivity.ts
const isDev = () => typeof process !== "undefined" && process.env?.["NODE_ENV"] !== "production";
/**
* Closes dangling brackets/quotes for a partial (mid-stream) JSON string so it
* can be parsed for a best-effort snapshot. Conservative: only trims a trailing
* object key that is provably awaiting a value (signalled by a trailing colon),
* leaving complete array/values intact.
*/
function balanceOpenJSON(raw) {
	const closers = [];
	let inString = false;
	let escaped = false;
	for (let i = 0; i < raw.length; i++) {
		const ch = raw[i];
		if (inString) {
			if (escaped) escaped = false;
			else if (ch === "\\") escaped = true;
			else if (ch === "\"") inString = false;
			continue;
		}
		if (ch === "\"") inString = true;
		else if (ch === "{") closers.push("}");
		else if (ch === "[") closers.push("]");
		else if (ch === "}" || ch === "]") closers.pop();
	}
	let out = raw;
	if (inString) {
		if (escaped) out = out.slice(0, -1);
		out += "\"";
	}
	out = out.replace(/(?:,\s*)?"(?:[^"\\]|\\.)*"\s*:\s*$/, "");
	out = out.replace(/,\s*$/, "");
	for (let i = closers.length - 1; i >= 0; i--) out += closers[i];
	return out;
}
/**
* Tolerant single-pass JSON parse for streamed tool arguments. Tries a straight
* parse, then a bracket-balanced parse for partial input. **Never throws** —
* returns `{}` when nothing parseable can be recovered.
*
* @category Utilities
*/
function partialJSONParse(raw) {
	if (!raw) return {};
	try {
		return JSON.parse(raw);
	} catch {}
	try {
		return JSON.parse(balanceOpenJSON(raw));
	} catch {
		return {};
	}
}
let warnedTitle = false;
/**
* Maps the deprecated `_title` tool-arg key onto a typed `statusMessage` for one
* minor release (with a one-time dev warning). Prefer a renderer-owned typed
* field going forward.
*/
function readStatusMessage(input) {
	if (input && typeof input === "object" && "_title" in input) {
		const value = input["_title"];
		if (typeof value === "string") {
			if (isDev() && !warnedTitle) {
				warnedTitle = true;
				console.warn("[Inv] The `_title` tool-arg key is deprecated and will be removed; the renderer now exposes a typed `statusMessage` on ToolActivity instead.");
			}
			return value;
		}
	}
}
/**
* Pairs every tool call on an assistant message with its result message **by
* `toolCallId`** (id-keyed, no positional `break`), producing a typed
* {@link ToolActivity} per call. Turn-safe even when tool messages trail or
* interleave with other messages.
*
* @param message       The assistant message owning the tool calls.
* @param allMessages   The full thread message list (scanned for tool results).
* @param executingIds  Tool-call ids whose args have closed but whose result
*                      hasn't landed (the store's `executingToolCallIds`).
*
* @category Utilities
*/
function pairToolActivity(message, allMessages, executingIds = /* @__PURE__ */ new Set()) {
	const byCallId = /* @__PURE__ */ new Map();
	const ownedCallIds = /* @__PURE__ */ new Set();
	for (const m of allMessages) if (m.role === "tool") {
		const tm = m;
		if (tm.toolCallId) byCallId.set(tm.toolCallId, tm);
	} else if (m.role === "assistant") for (const tc of m.toolCalls ?? []) ownedCallIds.add(tc.id);
	const activities = (message.toolCalls ?? []).map((toolCall) => {
		const toolMessage = byCallId.get(toolCall.id) ?? null;
		const input = partialJSONParse(toolCall.function.arguments);
		const statusMessage = readStatusMessage(input);
		const base = {
			id: toolCall.id,
			toolName: toolCall.function.name,
			toolCall,
			statusMessage
		};
		if (toolMessage) return toolMessage.error ? {
			...base,
			status: "error",
			toolMessage,
			input,
			result: toolMessage.content,
			isError: true,
			errorText: toolMessage.error
		} : {
			...base,
			status: "complete",
			toolMessage,
			input,
			result: toolMessage.content,
			isError: false
		};
		return executingIds.has(toolCall.id) ? {
			...base,
			status: "executing",
			toolMessage: null,
			input,
			isError: false
		} : {
			...base,
			status: "streaming",
			toolMessage: null,
			input,
			isError: false
		};
	});
	const msgIndex = allMessages.findIndex((m) => m.id === message.id);
	if (msgIndex !== -1) for (let i = msgIndex + 1; i < allMessages.length; i++) {
		const m = allMessages[i];
		if (!m || m.role !== "tool") break;
		const tm = m;
		if (!tm.toolCallId || ownedCallIds.has(tm.toolCallId)) continue;
		const orphanCall = {
			id: tm.toolCallId,
			type: "function",
			function: {
				name: "",
				arguments: ""
			}
		};
		const base = {
			id: tm.id,
			toolName: "",
			toolCall: orphanCall
		};
		activities.push(tm.error ? {
			...base,
			status: "error",
			toolMessage: tm,
			input: {},
			result: tm.content,
			isError: true,
			errorText: tm.error
		} : {
			...base,
			status: "complete",
			toolMessage: tm,
			input: {},
			result: tm.content,
			isError: false
		});
	}
	return activities;
}
//#endregion
//#region src/hooks/useToolActivities.ts
/**
* Memoized view of an assistant message's tool calls paired with their results,
* as a typed {@link ToolActivity} array.
*
* Wraps {@link pairToolActivity}, re-pairing only when something that affects
* the result actually changes: an argument string grows, a tool result lands or
* changes length/error, or the store's executing set changes. Keying on both
* args length **and** result length matters — a result can arrive after args
* are already closed, and vice versa.
*
* @category Hooks
*/
function useToolActivities(message, allMessages) {
	const executingIds = useThread((s) => s.executingToolCallIds);
	const argsKey = (message.toolCalls ?? []).map((t) => `${t.id}:${t.function.arguments.length}`).join("|");
	const resultKey = allMessages.filter((m) => m.role === "tool").map((m) => `${m.toolCallId}:${m.content?.length ?? 0}:${m.error ? 1 : 0}`).join("|");
	return (0, react.useMemo)(() => pairToolActivity(message, allMessages, executingIds), [
		message.id,
		argsKey,
		resultKey,
		executingIds
	]);
}
//#endregion
//#region src/store/artifactCategories.ts
/**
* Wraps the manual `artifactRenderers` + `artifactCategories` wiring: declare
* each category once with its renderers, and get both props back, ready to
* spread onto `<AgentInterface>`.
*
* - `artifactRenderers` is every group's renderers, in order, de-duplicated by
*   identity (a renderer listed in two groups registers once).
* - `artifactCategories` is one {@link ArtifactCategory} per group, its
*   `filter.type` collected from the group's renderer `type`s (de-duplicated).
*
* @category Functions
*
* @example
* ```tsx
* const artifacts = defineArtifactCategories([
*   { name: "Reports", renderers: [reportRenderer], icon: <ReportIcon /> },
*   { name: "Dashboards", renderers: [dashboardRenderer], icon: <AppIcon /> },
* ]);
*
* <AgentInterface llm={llm} {...artifacts} />;
* ```
*/
function defineArtifactCategories(groups) {
	const artifactRenderers = [];
	const seenRenderers = /* @__PURE__ */ new Set();
	return {
		artifactRenderers,
		artifactCategories: groups.map((group) => {
			const type = [];
			const seenTypes = /* @__PURE__ */ new Set();
			for (const renderer of group.renderers) {
				if (!seenRenderers.has(renderer)) {
					seenRenderers.add(renderer);
					artifactRenderers.push(renderer);
				}
				if (!seenTypes.has(renderer.type)) {
					seenTypes.add(renderer.type);
					type.push(renderer.type);
				}
			}
			return {
				name: group.name,
				filter: { type },
				icon: group.icon
			};
		})
	};
}
//#endregion
//#region src/store/ArtifactCategoriesContext.ts
/** @internal Provided by `ChatProvider` from the `artifactCategories` prop. */
const ArtifactCategoriesContext = (0, react.createContext)([]);
/**
* Returns the global artifact categories configured on `<ChatProvider>`.
* Empty array when none were provided.
*
* Categories drive the sidebar Artifacts split, the artifact browser's
* pre-applied filters, and category-grouped workspace sections.
*
* @category Hooks
*/
const useArtifactCategories = () => (0, react.useContext)(ArtifactCategoriesContext);
//#endregion
//#region src/store/artifactRendererTypes.ts
/**
* Identity helper that returns its argument while preserving `Props` inference.
*
* Without this, users would have to write `const r: ArtifactRendererConfig<MyProps> = {...}`
* to get type checking. With it, `defineArtifactRenderer({...})` infers `Props`
* from `parser`'s return type.
*
* @category Functions
*
* @example
* ```ts
* const presentationRenderer = defineArtifactRenderer({
*   type: "th_presentation",
*   toolName: ["presentation:create", "presentation:edit"],
*   parser: ({ response }) => {
*     const slides = response as { id: string; slides: Slide[] } | null;
*     if (!slides) return null;
*     return {
*       props: slides,
*       meta: { id: slides.id, version: 1, heading: `Presentation ${slides.id}` },
*     };
*   },
*   preview: (props, controls) => <PresentationCard onOpen={controls.open} />,
*   actual: (props) => <SlideDeck slides={props.slides} />,
* });
* ```
*/
function defineArtifactRenderer(config) {
	return config;
}
//#endregion
//#region src/store/ArtifactStorageContext.ts
/** @internal Provided by `ChatProvider` from `storage.artifact`. */
const ArtifactStorageContext = (0, react.createContext)(null);
/**
* Returns the configured global {@link ArtifactStorage} channel, or `null`
* when the storage adapter doesn't provide one.
*
* Renderer implementations use this to lazily fetch (`get`) or persist
* (`update`) artifact content; the artifact browser uses it for `list`.
*
* @category Hooks
*/
const useArtifactStorage = () => (0, react.useContext)(ArtifactStorageContext);
//#endregion
//#region src/store/artifactViewId.ts
/**
* Builds the detailed-view id for an artifact version. This is the contract
* between everything that opens artifact panels (auto-open watcher, workspace
* rail) and the renderer that registers them — always build/read the id
* through these helpers, never hand-roll the string.
*/
function artifactViewId(id, version) {
	return `${id}:${version}`;
}
/**
* Splits a detailed-view id back into artifact id + version. Returns null
* when the string isn't an artifact view id (e.g. a useId fallback).
*/
function parseArtifactViewId(viewId) {
	const sep = viewId.lastIndexOf(":");
	if (sep <= 0) return null;
	const versionPart = viewId.slice(sep + 1);
	if (!/^\d+$/.test(versionPart)) return null;
	return {
		id: viewId.slice(0, sep),
		version: Number(versionPart)
	};
}
//#endregion
//#region src/adapters/_defaultStorage.ts
/**
* Internal default storage — in-memory, no persistence across reload.
* Used by `<ChatProvider>` when no `storage` prop is provided. Not exported
* from the package; callers who want explicit in-memory behavior should
* construct their own adapter object.
*/
function createDefaultInMemoryStorage() {
	let threads = [];
	const messagesByThread = /* @__PURE__ */ new Map();
	return { thread: {
		async listThreads() {
			return { threads };
		},
		async createThread(firstMessage) {
			const thread = {
				id: crypto.randomUUID(),
				title: typeof firstMessage.content === "string" ? firstMessage.content.slice(0, 40) || "New thread" : "New thread",
				createdAt: (/* @__PURE__ */ new Date()).toISOString()
			};
			threads = [thread, ...threads];
			messagesByThread.set(thread.id, [{
				...firstMessage,
				id: firstMessage.id ?? crypto.randomUUID()
			}]);
			return thread;
		},
		async getMessages(threadId) {
			return messagesByThread.get(threadId) ?? [];
		},
		async updateThread(thread) {
			threads = threads.map((t) => t.id === thread.id ? thread : t);
			return thread;
		},
		async deleteThread(id) {
			threads = threads.filter((t) => t.id !== id);
			messagesByThread.delete(id);
		}
	} };
}
//#endregion
//#region src/store/artifactAutoOpenWatcher.ts
/**
* One pass over every artifact registered in the thread. Each artifact
* version (`id:version`) gets a single chance to auto-open — recorded in
* `claimedIds` the first time we see it, whether or not it opens — so an
* edit's new version qualifies again. Returns true when a panel opened.
*/
function evaluateRegisteredArtifacts(artifacts, mayOpen, claimedIds, detailedViewStore) {
	let opened = false;
	const artifactsWithVersions = Object.values(artifacts);
	for (let i = 0; i < artifactsWithVersions.length; i++) {
		const versions = artifactsWithVersions[i];
		if (!versions) continue;
		const latest = versions[versions.length - 1];
		if (!latest) continue;
		const key = artifactViewId(latest.id, latest.version);
		if (claimedIds.has(key)) continue;
		claimedIds.add(key);
		if (!mayOpen || opened) continue;
		detailedViewStore.getState().setActiveDetailedView(key);
		opened = true;
	}
	return opened;
}
/**
* Runs inside ChatProvider: re-evaluates whenever an artifact registers in
* the thread context, opening at most one artifact per stream.
*/
function useArtifactAutoOpenWatcher(artifactAutoOpen, chatStore, threadContextStore, detailedViewStore) {
	const openedThisRunRef = (0, react.useRef)(false);
	const claimedIdsRef = (0, react.useRef)(/* @__PURE__ */ new Set());
	(0, react.useEffect)(() => {
		if (!artifactAutoOpen) return;
		const unsubscribeThread = chatStore.subscribe((s) => s.selectedThreadId, () => {
			claimedIdsRef.current.clear();
			openedThisRunRef.current = false;
		});
		const unsubscribeRun = chatStore.subscribe((s) => s.isRunning, (isRunning) => {
			if (isRunning) openedThisRunRef.current = false;
		});
		const unsubscribeArtifacts = threadContextStore.subscribe((s) => s.artifacts, (artifacts) => {
			if (evaluateRegisteredArtifacts(artifacts, chatStore.getState().isRunning && !openedThisRunRef.current, claimedIdsRef.current, detailedViewStore)) openedThisRunRef.current = true;
		}, { fireImmediately: true });
		return () => {
			unsubscribeThread();
			unsubscribeRun();
			unsubscribeArtifacts();
		};
	}, [
		artifactAutoOpen,
		chatStore,
		threadContextStore,
		detailedViewStore
	]);
}
//#endregion
//#region src/adapters/httpError.ts
async function getResponseErrorMessage(response) {
	try {
		const data = await response.clone().json();
		const message = typeof data.error === "string" ? data.error : typeof data.error?.message === "string" ? data.error.message : typeof data.message === "string" ? data.message : null;
		if (message?.trim()) return message;
	} catch {}
	return `Request failed: ${response.status} ${response.statusText}`.trim();
}
//#endregion
//#region src/types/messageFormat.ts
/**
* Default identity message format — no conversion.
* Messages are sent and received as-is in AG-UI format.
*/
const identityMessageFormat = {
	toApi: (messages) => messages,
	fromApi: (data) => data
};
//#endregion
//#region src/stream/adapters/_shared/sseLines.ts
/**
* Shared line iterator for streamed HTTP responses.
*
* Buffers the leftover partial line between network chunks so an SSE event (or
* NDJSON record) split across two `reader.read()` results is reassembled rather
* than silently dropped. The reference implementation lived in
* `openai-readable-stream.ts`; this extracts it so `ag-ui.ts` and
* `openai-completions.ts` share the same correct buffering.
*
* Yields each complete line verbatim (caller strips any `data: ` SSE prefix);
* blank lines are skipped. The trailing buffered line is flushed on stream end.
*
* @internal
*/
async function* sseLineIterator(response) {
	const reader = response.body?.getReader();
	if (!reader) throw new Error("No response body");
	const decoder = new TextDecoder();
	let buffer = "";
	while (true) {
		const { done, value } = await reader.read();
		if (done) break;
		buffer += decoder.decode(value, { stream: true });
		const lines = buffer.split("\n");
		buffer = lines.pop() ?? "";
		for (const line of lines) if (line.trim()) yield line;
	}
	if (buffer.trim()) yield buffer;
}
//#endregion
//#region src/stream/adapters/ag-ui.ts
const agUIAdapter = () => ({ async *parse(response) {
	for await (const line of sseLineIterator(response)) {
		if (!line.startsWith("data: ")) continue;
		const data = line.slice(6).trim();
		if (!data || data === "[DONE]") continue;
		try {
			yield JSON.parse(data);
		} catch (e) {
			console.error("Failed to parse SSE event", e);
		}
	}
} });
//#endregion
//#region src/stream/adapters/eve.ts
const EVE_INPUT_REQUESTED_EVENT = "eve.input.requested";
const TURN_BOUNDARY_TYPES = new Set([
	"session.completed",
	"session.failed",
	"session.waiting"
]);
/**
* Adapter for Eve session streams (`GET /eve/v1/session/:id/stream`).
*
* Eve emits newline-delimited JSON harness events. The adapter handles
* `actions.requested`, `action.result`, `message.appended`, `message.completed`,
* `input.requested`, `turn.failed`, and `session.failed` and maps tool calls,
* assistant text, input prompts, and failures to AG-UI events. Parsing stops at
* turn boundaries (`session.completed`, `session.waiting`, `session.failed`).
* Pass `onEvent` for unmapped events such as `session.started`.
*/
const eveAdapter = (options = {}) => ({ async *parse(response) {
	const messageId = crypto.randomUUID();
	const streamedSteps = /* @__PURE__ */ new Set();
	let started = false;
	const start = () => {
		if (started) return [];
		started = true;
		return [{
			type: _ag_ui_core.EventType.TEXT_MESSAGE_START,
			messageId,
			role: "assistant"
		}];
	};
	for await (const line of sseLineIterator(response)) {
		let event;
		try {
			event = JSON.parse(line);
		} catch (e) {
			console.error("Failed to parse Eve stream event", e);
			continue;
		}
		options.onEvent?.(event);
		if (event.type === "actions.requested") for (const action of event.data.actions) {
			if (action.kind !== "tool-call") continue;
			yield* start();
			yield {
				type: _ag_ui_core.EventType.TOOL_CALL_START,
				toolCallId: action.callId,
				toolCallName: action.toolName,
				parentMessageId: messageId
			};
			const args = JSON.stringify(action.input ?? {});
			if (args && args !== "{}") yield {
				type: _ag_ui_core.EventType.TOOL_CALL_ARGS,
				toolCallId: action.callId,
				delta: args
			};
			yield {
				type: _ag_ui_core.EventType.TOOL_CALL_END,
				toolCallId: action.callId
			};
		}
		else if (event.type === "action.result") {
			const { result, status, error } = event.data;
			if (result.kind !== "tool-result") continue;
			const content = status === "completed" ? typeof result.output === "string" ? result.output : JSON.stringify(result.output ?? null) : JSON.stringify({ error: error?.message ?? `tool ${status}` });
			yield {
				type: _ag_ui_core.EventType.TOOL_CALL_RESULT,
				messageId: crypto.randomUUID(),
				toolCallId: result.callId,
				content,
				role: "tool"
			};
		} else if (event.type === "message.appended") {
			const { messageDelta, stepIndex } = event.data;
			if (!messageDelta) continue;
			streamedSteps.add(stepIndex);
			yield* start();
			yield {
				type: _ag_ui_core.EventType.TEXT_MESSAGE_CONTENT,
				messageId,
				delta: messageDelta
			};
		} else if (event.type === "message.completed") {
			const { message, stepIndex } = event.data;
			if (!message || streamedSteps.has(stepIndex)) continue;
			yield* start();
			yield {
				type: _ag_ui_core.EventType.TEXT_MESSAGE_CONTENT,
				messageId,
				delta: message
			};
		} else if (event.type === "input.requested") yield {
			type: _ag_ui_core.EventType.CUSTOM,
			name: EVE_INPUT_REQUESTED_EVENT,
			value: event.data.requests
		};
		else if (event.type === "turn.failed" || event.type === "session.failed") yield {
			type: _ag_ui_core.EventType.RUN_ERROR,
			message: event.data.message
		};
		if (TURN_BOUNDARY_TYPES.has(event.type)) break;
	}
	if (started) yield {
		type: _ag_ui_core.EventType.TEXT_MESSAGE_END,
		messageId
	};
} });
//#endregion
//#region src/stream/adapters/langgraph.ts
/**
* Adapter for LangGraph streaming responses.
*
* LangGraph uses named SSE events (`event: <type>\ndata: <json>\n\n`)
* rather than the `data:`-only format used by OpenAI. The adapter handles
* the `messages`, `metadata`, `updates`, and `error` event types and maps
* model steps and tool results to ordered AG-UI events.
*
* Usage:
* ```tsx
* <ChatProvider
*   apiUrl="/api/langgraph"
*   streamProtocol={langGraphAdapter()}
* />
* ```
*/
const langGraphAdapter = (options) => ({ async *parse(response) {
	const reader = response.body?.getReader();
	if (!reader) throw new Error("No response body");
	const decoder = new TextDecoder();
	let fallbackMessageId = crypto.randomUUID();
	let currentMessageId = null;
	let currentGraphStep;
	const toolCallIdsByIndex = /* @__PURE__ */ new Map();
	const startedToolCallIds = /* @__PURE__ */ new Set();
	const openToolCallIds = /* @__PURE__ */ new Set();
	const toolCallArgsSeen = /* @__PURE__ */ new Set();
	const usedMessageIds = /* @__PURE__ */ new Set();
	let duplicateMessageIds = 0;
	let messageStarted = false;
	let sawToolsOnCurrentMessage = false;
	let buffer = "";
	while (true) {
		const { done, value } = await reader.read();
		buffer += done ? decoder.decode() : decoder.decode(value, { stream: true });
		const blocks = buffer.split("\n\n");
		buffer = done ? "" : blocks.pop() ?? "";
		for (const block of blocks) {
			const trimmed = block.trim();
			if (!trimmed) continue;
			const { event, data } = parseSSEBlock(trimmed);
			if (!data) continue;
			let parsed;
			try {
				parsed = JSON.parse(data);
			} catch (e) {
				console.error("Failed to parse LangGraph SSE data", e);
				continue;
			}
			switch (event) {
				case "metadata": break;
				case "messages": {
					const tuple = parsed;
					const msg = Array.isArray(tuple) ? tuple[0] : tuple;
					const metadata = Array.isArray(tuple) ? tuple[1] : void 0;
					if (isToolMessage(msg)) {
						if (openToolCallIds.delete(msg.tool_call_id)) yield {
							type: _ag_ui_core.EventType.TOOL_CALL_END,
							toolCallId: msg.tool_call_id
						};
						if (messageStarted && currentMessageId) yield {
							type: _ag_ui_core.EventType.TEXT_MESSAGE_END,
							messageId: currentMessageId
						};
						messageStarted = false;
						currentMessageId = null;
						sawToolsOnCurrentMessage = false;
						currentGraphStep = void 0;
						fallbackMessageId = crypto.randomUUID();
						toolCallIdsByIndex.clear();
						const content = serializeToolContent(msg.content);
						yield {
							type: _ag_ui_core.EventType.TOOL_CALL_RESULT,
							messageId: msg.id ?? `tool-result-${msg.tool_call_id}`,
							toolCallId: msg.tool_call_id,
							content,
							role: "tool",
							...msg.status === "error" ? {
								isError: true,
								error: content
							} : {}
						};
						break;
					}
					if (!isAIMessage(msg)) break;
					const graphStep = metadata?.langgraph_step;
					const graphStepChanged = graphStep !== void 0 && currentGraphStep !== void 0 && graphStep !== currentGraphStep;
					let nextMessageId = msg.id ?? (graphStep === void 0 ? fallbackMessageId : `langgraph-step-${graphStep}`);
					const textContent = extractTextContent(msg.content);
					const isNewModelStep = !messageStarted || nextMessageId !== currentMessageId || graphStepChanged || !!textContent && sawToolsOnCurrentMessage && messageStarted;
					if (isNewModelStep && usedMessageIds.has(nextMessageId)) nextMessageId = `${nextMessageId}#${++duplicateMessageIds}`;
					if (isNewModelStep) {
						if (messageStarted && currentMessageId) yield {
							type: _ag_ui_core.EventType.TEXT_MESSAGE_END,
							messageId: currentMessageId
						};
						currentMessageId = nextMessageId;
						usedMessageIds.add(nextMessageId);
						currentGraphStep = graphStep;
						sawToolsOnCurrentMessage = false;
						toolCallIdsByIndex.clear();
						yield {
							type: _ag_ui_core.EventType.TEXT_MESSAGE_START,
							messageId: currentMessageId,
							role: "assistant"
						};
						messageStarted = true;
					}
					if (textContent) yield {
						type: _ag_ui_core.EventType.TEXT_MESSAGE_CONTENT,
						messageId: currentMessageId,
						delta: textContent
					};
					if (msg.tool_call_chunks) for (const chunk of msg.tool_call_chunks) {
						const index = chunk.index ?? 0;
						if (chunk.id) toolCallIdsByIndex.set(index, chunk.id);
						const toolCallId = chunk.id ?? toolCallIdsByIndex.get(index);
						if (toolCallId && !startedToolCallIds.has(toolCallId)) {
							startedToolCallIds.add(toolCallId);
							openToolCallIds.add(toolCallId);
							sawToolsOnCurrentMessage = true;
							yield {
								type: _ag_ui_core.EventType.TOOL_CALL_START,
								toolCallId,
								toolCallName: chunk.name || ""
							};
						}
						if (chunk.args && toolCallId) {
							toolCallArgsSeen.add(toolCallId);
							yield {
								type: _ag_ui_core.EventType.TOOL_CALL_ARGS,
								toolCallId,
								delta: chunk.args
							};
						}
					}
					if (msg.tool_call_chunks === void 0 && msg.tool_calls && msg.tool_calls.length > 0) for (let i = 0; i < msg.tool_calls.length; i++) {
						const tc = msg.tool_calls[i];
						if (!tc) continue;
						const toolCallId = tc.id || crypto.randomUUID();
						if (!startedToolCallIds.has(toolCallId)) {
							startedToolCallIds.add(toolCallId);
							openToolCallIds.add(toolCallId);
							sawToolsOnCurrentMessage = true;
							yield {
								type: _ag_ui_core.EventType.TOOL_CALL_START,
								toolCallId,
								toolCallName: tc.name
							};
						}
						if (!toolCallArgsSeen.has(toolCallId)) {
							const argsStr = typeof tc.args === "string" ? tc.args : JSON.stringify(tc.args);
							toolCallArgsSeen.add(toolCallId);
							yield {
								type: _ag_ui_core.EventType.TOOL_CALL_ARGS,
								toolCallId,
								delta: argsStr
							};
						}
						if (openToolCallIds.delete(toolCallId)) yield {
							type: _ag_ui_core.EventType.TOOL_CALL_END,
							toolCallId
						};
					}
					break;
				}
				case "updates": {
					const updates = parsed;
					if ("__interrupt__" in updates && options?.onInterrupt) options.onInterrupt(updates["__interrupt__"]);
					break;
				}
				case "error": {
					const err = parsed;
					yield {
						type: _ag_ui_core.EventType.RUN_ERROR,
						message: err.message || err.error || "Unknown error",
						code: err.error ?? void 0
					};
					break;
				}
				case "end":
					if (messageStarted) {
						for (const toolCallId of openToolCallIds) yield {
							type: _ag_ui_core.EventType.TOOL_CALL_END,
							toolCallId
						};
						openToolCallIds.clear();
						yield {
							type: _ag_ui_core.EventType.TEXT_MESSAGE_END,
							messageId: currentMessageId
						};
						messageStarted = false;
					}
					break;
				default: break;
			}
		}
		if (done) break;
	}
	if (messageStarted) {
		for (const toolCallId of openToolCallIds) yield {
			type: _ag_ui_core.EventType.TOOL_CALL_END,
			toolCallId
		};
		openToolCallIds.clear();
		yield {
			type: _ag_ui_core.EventType.TEXT_MESSAGE_END,
			messageId: currentMessageId
		};
	}
} });
/**
* Parse an SSE block into its event name and data payload.
*
* LangGraph SSE format:
* ```
* event: messages
* data: [{"content": "Hello", ...}, {"langgraph_node": "agent"}]
* ```
*/
function parseSSEBlock(block) {
	let event = "";
	const dataLines = [];
	for (const line of block.split("\n")) if (line.startsWith("event:")) event = line.slice(6).trim();
	else if (line.startsWith("data:")) dataLines.push(line.slice(5).trim());
	return {
		event,
		data: dataLines.join("\n")
	};
}
/**
* Extract text content from a LangGraph message content field.
* Content can be a plain string or an array of typed content blocks.
*/
function extractTextContent(content) {
	if (typeof content === "string") return content;
	return content.filter((block) => block.type === "text" && block.text).map((block) => block.text).join("");
}
function serializeToolContent(content) {
	return typeof content === "string" ? content : JSON.stringify(content);
}
function isAIMessage(message) {
	return message.type === "ai" || message.type === "AIMessage" || message.type === "AIMessageChunk";
}
function isToolMessage(message) {
	return message.type === "tool" || message.type === "ToolMessage" || message.type === "ToolMessageChunk";
}
//#endregion
//#region src/stream/adapters/openai-completions.ts
const openAIAdapter = () => ({ async *parse(response) {
	const messageId = crypto.randomUUID();
	const toolCallIds = {};
	let messageStarted = false;
	for await (const line of sseLineIterator(response)) {
		if (!line.startsWith("data: ")) continue;
		const data = line.slice(6).trim();
		if (!data || data === "[DONE]") continue;
		try {
			const choice = JSON.parse(data).choices?.[0];
			const delta = choice?.delta;
			if (!delta) continue;
			if (!messageStarted && (delta.content || delta.role)) {
				yield {
					type: _ag_ui_core.EventType.TEXT_MESSAGE_START,
					messageId,
					role: "assistant"
				};
				messageStarted = true;
			}
			if (delta.content) yield {
				type: _ag_ui_core.EventType.TEXT_MESSAGE_CONTENT,
				messageId,
				delta: delta.content
			};
			if (delta.tool_calls) for (const toolCall of delta.tool_calls) {
				const index = toolCall.index;
				if (toolCall.id) {
					toolCallIds[index] = toolCall.id;
					yield {
						type: _ag_ui_core.EventType.TOOL_CALL_START,
						toolCallId: toolCall.id,
						toolCallName: toolCall.function?.name || ""
					};
				}
				if (toolCall.function?.arguments) {
					const toolCallId = toolCallIds[index];
					if (toolCallId) yield {
						type: _ag_ui_core.EventType.TOOL_CALL_ARGS,
						toolCallId,
						delta: toolCall.function.arguments
					};
				}
			}
			if (choice?.finish_reason === "stop") yield {
				type: _ag_ui_core.EventType.TEXT_MESSAGE_END,
				messageId
			};
			else if (choice?.finish_reason === "tool_calls") for (const toolCallId of Object.values(toolCallIds)) yield {
				type: _ag_ui_core.EventType.TOOL_CALL_END,
				toolCallId
			};
		} catch (e) {
			console.error("Failed to parse OpenAI SSE event", e);
		}
	}
} });
//#endregion
//#region src/stream/adapters/openai-readable-stream.ts
/**
* Adapter for streams produced by the OpenAI SDK's `Stream.toReadableStream()`.
* That method emits NDJSON (one JSON object per line, no `data: ` SSE prefix),
* which differs from the raw SSE format that `openAIAdapter` expects.
*/
const openAIReadableStreamAdapter = () => ({ async *parse(response) {
	const messageId = crypto.randomUUID();
	const toolCallIds = {};
	let messageStarted = false;
	for await (const line of sseLineIterator(response)) {
		const data = line.trim();
		if (!data) continue;
		try {
			const choice = JSON.parse(data).choices?.[0];
			const delta = choice?.delta;
			if (!delta) continue;
			if (!messageStarted && (delta.content || delta.role)) {
				yield {
					type: _ag_ui_core.EventType.TEXT_MESSAGE_START,
					messageId,
					role: "assistant"
				};
				messageStarted = true;
			}
			if (delta.content) yield {
				type: _ag_ui_core.EventType.TEXT_MESSAGE_CONTENT,
				messageId,
				delta: delta.content
			};
			if (delta.tool_calls) for (const toolCall of delta.tool_calls) {
				const index = toolCall.index;
				if (toolCall.id) {
					toolCallIds[index] = toolCall.id;
					yield {
						type: _ag_ui_core.EventType.TOOL_CALL_START,
						toolCallId: toolCall.id,
						toolCallName: toolCall.function?.name || ""
					};
				}
				if (toolCall.function?.arguments) {
					const toolCallId = toolCallIds[index];
					if (toolCallId) yield {
						type: _ag_ui_core.EventType.TOOL_CALL_ARGS,
						toolCallId,
						delta: toolCall.function.arguments
					};
				}
			}
			if (choice?.finish_reason === "stop") yield {
				type: _ag_ui_core.EventType.TEXT_MESSAGE_END,
				messageId
			};
			else if (choice?.finish_reason === "tool_calls") for (const toolCallId of Object.values(toolCallIds)) yield {
				type: _ag_ui_core.EventType.TOOL_CALL_END,
				toolCallId
			};
		} catch (e) {
			console.error("Failed to parse OpenAI NDJSON chunk", e);
		}
	}
} });
//#endregion
//#region src/stream/adapters/openai-responses.ts
/** A tool result's `output` as a string (JSON-encoded if structured, "" if absent). */
const stringifyOutput = (output) => typeof output === "string" ? output : output != null ? JSON.stringify(output) : "";
const openAIResponsesAdapter = () => ({ async *parse(response) {
	const reader = response.body?.getReader();
	if (!reader) throw new Error("No response body");
	const decoder = new TextDecoder();
	const itemIdToCallId = {};
	let textItemId = null;
	let buffer = "";
	while (true) {
		const { done, value } = await reader.read();
		buffer += done ? decoder.decode() : decoder.decode(value, { stream: true });
		const lines = buffer.split("\n");
		buffer = done ? "" : lines.pop() ?? "";
		for (const line of lines) {
			if (!line.startsWith("data: ")) continue;
			const data = line.slice(6).trim();
			if (!data || data === "[DONE]") continue;
			try {
				const event = JSON.parse(data);
				switch (event.type) {
					case "response.output_item.added": {
						const item = event.item;
						if (item.type === "message" && item.role === "assistant") {
							textItemId = item.id;
							yield {
								type: _ag_ui_core.EventType.TEXT_MESSAGE_START,
								messageId: item.id,
								role: "assistant"
							};
						} else if (item.type === "function_call") {
							itemIdToCallId[item.id ?? item.call_id] = item.call_id;
							yield {
								type: _ag_ui_core.EventType.TOOL_CALL_START,
								toolCallId: item.call_id,
								toolCallName: item.name
							};
						} else if (item.type === "function_call_output") yield {
							type: _ag_ui_core.EventType.TOOL_CALL_RESULT,
							messageId: item.id,
							toolCallId: item.call_id,
							content: stringifyOutput(item.output)
						};
						else if (item.type === "web_search_call") yield {
							type: _ag_ui_core.EventType.TOOL_CALL_START,
							toolCallId: item.id,
							toolCallName: "web_search"
						};
						else if (item.type === "mcp_call") yield {
							type: _ag_ui_core.EventType.TOOL_CALL_START,
							toolCallId: item.id,
							toolCallName: item.name
						};
						else if (item.type === "mcp_list_tools") {
							yield {
								type: _ag_ui_core.EventType.TOOL_CALL_START,
								toolCallId: item.id,
								toolCallName: "mcp_list_tools"
							};
							yield {
								type: _ag_ui_core.EventType.TOOL_CALL_ARGS,
								toolCallId: item.id,
								delta: JSON.stringify({ server_label: item.server_label })
							};
							yield {
								type: _ag_ui_core.EventType.TOOL_CALL_END,
								toolCallId: item.id
							};
						}
						break;
					}
					case "response.output_text.delta":
						if (event.item_id !== textItemId) {
							textItemId = event.item_id;
							yield {
								type: _ag_ui_core.EventType.TEXT_MESSAGE_START,
								messageId: event.item_id,
								role: "assistant"
							};
						}
						yield {
							type: _ag_ui_core.EventType.TEXT_MESSAGE_CONTENT,
							messageId: event.item_id,
							delta: event.delta
						};
						break;
					case "response.output_text.done":
						yield {
							type: _ag_ui_core.EventType.TEXT_MESSAGE_END,
							messageId: event.item_id
						};
						break;
					case "response.function_call_arguments.delta": {
						const callId = itemIdToCallId[event.item_id] ?? event.item_id;
						yield {
							type: _ag_ui_core.EventType.TOOL_CALL_ARGS,
							toolCallId: callId,
							delta: event.delta
						};
						break;
					}
					case "response.function_call_arguments.done": {
						const callId = itemIdToCallId[event.item_id] ?? event.item_id;
						yield {
							type: _ag_ui_core.EventType.TOOL_CALL_END,
							toolCallId: callId
						};
						break;
					}
					case "response.mcp_call_arguments.delta":
						yield {
							type: _ag_ui_core.EventType.TOOL_CALL_ARGS,
							toolCallId: event.item_id,
							delta: event.delta
						};
						break;
					case "response.mcp_call_arguments.done":
						yield {
							type: _ag_ui_core.EventType.TOOL_CALL_END,
							toolCallId: event.item_id
						};
						break;
					case "response.output_item.done": {
						if (event.item.type === "mcp_call") {
							const mcp = event.item;
							const errorText = typeof mcp.error === "string" && mcp.error.length > 0 ? mcp.error : void 0;
							yield {
								type: _ag_ui_core.EventType.TOOL_CALL_RESULT,
								messageId: mcp.id,
								toolCallId: mcp.id,
								content: stringifyOutput(mcp.output),
								...errorText ? {
									isError: true,
									error: errorText
								} : {}
							};
							break;
						}
						if (event.item.type === "mcp_list_tools") {
							const list = event.item;
							const toolNames = list.tools.map((t) => t.name);
							const listError = typeof list.error === "string" && list.error.length > 0 ? list.error : void 0;
							yield {
								type: _ag_ui_core.EventType.TOOL_CALL_RESULT,
								messageId: list.id,
								toolCallId: list.id,
								content: JSON.stringify({
									server_label: list.server_label,
									tool_count: toolNames.length,
									tools: toolNames
								}),
								...listError ? {
									isError: true,
									error: listError
								} : {}
							};
							break;
						}
						const item = event.item;
						if (item.type !== "web_search_call") break;
						const toolCallId = item.id ?? "web_search_call";
						if (item.action && typeof item.action === "object") yield {
							type: _ag_ui_core.EventType.TOOL_CALL_ARGS,
							toolCallId,
							delta: JSON.stringify(item.action)
						};
						const content = stringifyOutput(item.output);
						yield {
							type: _ag_ui_core.EventType.TOOL_CALL_RESULT,
							messageId: toolCallId,
							toolCallId,
							content
						};
						break;
					}
					case "error":
						yield {
							type: _ag_ui_core.EventType.RUN_ERROR,
							message: event.message,
							code: event.code ?? void 0
						};
						break;
					case "response.failed":
						yield {
							type: _ag_ui_core.EventType.RUN_ERROR,
							message: event.response?.error?.message ?? "Response failed",
							code: event.response?.error?.code ?? void 0
						};
						break;
					default: break;
				}
			} catch (e) {
				console.error("Failed to parse OpenAI Responses SSE event", e);
			}
		}
		if (done) break;
	}
} });
//#endregion
//#region src/stream/adapters/vercel-ai-sdk.ts
const MISSING_AI_SDK_MESSAGE = "vercelAIAdapter requires the optional peer dependency \"ai\" (Vercel AI SDK v6 or v7).";
const PROVIDER_EXECUTED_TOOLS_UNSUPPORTED_MESSAGE$1 = "Vercel AI SDK provider-executed tools are not supported because AG-UI messages cannot preserve providerExecuted semantics.";
const TOOL_EXECUTION_DENIED_MESSAGE = "Tool execution was denied";
function serialize$1(value) {
	if (typeof value === "string") return value;
	return JSON.stringify(value) ?? String(value);
}
async function parseUIMessageStream(body) {
	let DefaultChatTransport;
	try {
		({DefaultChatTransport} = await import("ai"));
	} catch (cause) {
		throw new Error(MISSING_AI_SDK_MESSAGE, { cause });
	}
	if (typeof DefaultChatTransport !== "function") throw new Error(MISSING_AI_SDK_MESSAGE);
	class UIMessageStreamParser extends DefaultChatTransport {
		parseBody(stream) {
			return this.processResponseStream(stream);
		}
	}
	return new UIMessageStreamParser().parseBody(body);
}
async function* readChunks(stream) {
	const reader = stream.getReader();
	try {
		for (;;) {
			const { done, value } = await reader.read();
			if (done) return;
			yield value;
		}
	} finally {
		reader.releaseLock();
	}
}
function toolResult(toolCallId, content, error) {
	return {
		type: _ag_ui_core.EventType.TOOL_CALL_RESULT,
		messageId: `tool-result-${toolCallId}`,
		toolCallId,
		content,
		role: "tool",
		...error !== void 0 ? {
			isError: true,
			error
		} : {}
	};
}
/**
* Adapter for Vercel AI SDK v6 and v7 UIMessage streams.
*
* The AI SDK is loaded only when parsing begins so it can remain an optional
* peer dependency for consumers that use other stream adapters. Its
* `DefaultChatTransport` performs the native SSE decoding and chunk validation;
* this adapter only maps validated UIMessage chunks to AG-UI events.
*/
const vercelAIAdapter = () => ({ async *parse(response) {
	if (!response.body) throw new Error("No response body");
	const chunks = await parseUIMessageStream(response.body);
	const startedTools = /* @__PURE__ */ new Set();
	const streamedToolArgs = /* @__PURE__ */ new Set();
	const endedTools = /* @__PURE__ */ new Set();
	let stepIndex = 0;
	let activeStep;
	const startStepMessage = (preferredMessageId) => {
		if (!activeStep || activeStep.messageStarted) return;
		activeStep.messageId ??= preferredMessageId ?? `vercel-ai-message-${stepIndex}`;
		activeStep.messageStarted = true;
		return {
			type: _ag_ui_core.EventType.TEXT_MESSAGE_START,
			messageId: activeStep.messageId,
			role: "assistant"
		};
	};
	const beginText = (partId) => {
		if (activeStep?.messageStarted && activeStep.sawTools) {
			const previousId = activeStep.messageId;
			activeStep.messageId = partId;
			activeStep.sawTools = false;
			return [{
				type: _ag_ui_core.EventType.TEXT_MESSAGE_END,
				messageId: previousId
			}, {
				type: _ag_ui_core.EventType.TEXT_MESSAGE_START,
				messageId: partId,
				role: "assistant"
			}];
		}
		const event = startStepMessage(partId);
		return event ? [event] : [];
	};
	const toolParent = () => activeStep?.messageId ? { parentMessageId: activeStep.messageId } : {};
	for await (const chunk of readChunks(chunks)) {
		if ("providerExecuted" in chunk && chunk.providerExecuted === true) throw new Error(PROVIDER_EXECUTED_TOOLS_UNSUPPORTED_MESSAGE$1);
		switch (chunk.type) {
			case "start-step": {
				const stepName = `vercel-ai-step-${++stepIndex}`;
				activeStep = {
					stepName,
					messageStarted: false,
					sawTools: false
				};
				yield {
					type: _ag_ui_core.EventType.STEP_STARTED,
					stepName
				};
				break;
			}
			case "finish-step": {
				const stepName = activeStep?.stepName ?? `vercel-ai-step-${++stepIndex}`;
				if (activeStep?.messageStarted && activeStep.messageId) yield {
					type: _ag_ui_core.EventType.TEXT_MESSAGE_END,
					messageId: activeStep.messageId
				};
				yield {
					type: _ag_ui_core.EventType.STEP_FINISHED,
					stepName
				};
				activeStep = void 0;
				break;
			}
			case "text-start":
				for (const event of beginText(chunk.id)) yield event;
				if (!activeStep) yield {
					type: _ag_ui_core.EventType.TEXT_MESSAGE_START,
					messageId: chunk.id,
					role: "assistant"
				};
				break;
			case "text-delta":
				for (const event of beginText(chunk.id)) yield event;
				yield {
					type: _ag_ui_core.EventType.TEXT_MESSAGE_CONTENT,
					messageId: activeStep?.messageId ?? chunk.id,
					delta: chunk.delta
				};
				break;
			case "text-end":
				if (!activeStep) yield {
					type: _ag_ui_core.EventType.TEXT_MESSAGE_END,
					messageId: chunk.id
				};
				break;
			case "tool-input-start":
				if (!startedTools.has(chunk.toolCallId)) {
					const event = startStepMessage();
					if (event) yield event;
					startedTools.add(chunk.toolCallId);
					if (activeStep) activeStep.sawTools = true;
					yield {
						type: _ag_ui_core.EventType.TOOL_CALL_START,
						toolCallId: chunk.toolCallId,
						toolCallName: chunk.toolName,
						...toolParent()
					};
				}
				break;
			case "tool-input-delta":
				if (chunk.inputTextDelta) {
					streamedToolArgs.add(chunk.toolCallId);
					yield {
						type: _ag_ui_core.EventType.TOOL_CALL_ARGS,
						toolCallId: chunk.toolCallId,
						delta: chunk.inputTextDelta
					};
				}
				break;
			case "tool-input-available":
			case "tool-input-error":
				if (!startedTools.has(chunk.toolCallId)) {
					const event = startStepMessage();
					if (event) yield event;
					startedTools.add(chunk.toolCallId);
					if (activeStep) activeStep.sawTools = true;
					yield {
						type: _ag_ui_core.EventType.TOOL_CALL_START,
						toolCallId: chunk.toolCallId,
						toolCallName: chunk.toolName,
						...toolParent()
					};
				}
				if (!streamedToolArgs.has(chunk.toolCallId)) {
					streamedToolArgs.add(chunk.toolCallId);
					yield {
						type: _ag_ui_core.EventType.TOOL_CALL_ARGS,
						toolCallId: chunk.toolCallId,
						delta: serialize$1(chunk.input)
					};
				}
				if (!endedTools.has(chunk.toolCallId)) {
					endedTools.add(chunk.toolCallId);
					yield {
						type: _ag_ui_core.EventType.TOOL_CALL_END,
						toolCallId: chunk.toolCallId
					};
				}
				if (chunk.type === "tool-input-error") yield toolResult(chunk.toolCallId, chunk.errorText, chunk.errorText);
				break;
			case "tool-output-available":
				yield toolResult(chunk.toolCallId, serialize$1(chunk.output));
				break;
			case "tool-output-error":
				yield toolResult(chunk.toolCallId, chunk.errorText, chunk.errorText);
				break;
			case "tool-output-denied":
				yield toolResult(chunk.toolCallId, TOOL_EXECUTION_DENIED_MESSAGE, TOOL_EXECUTION_DENIED_MESSAGE);
				break;
			case "error":
				yield {
					type: _ag_ui_core.EventType.RUN_ERROR,
					message: chunk.errorText
				};
				return;
		}
	}
	if (activeStep?.messageStarted && activeStep.messageId) yield {
		type: _ag_ui_core.EventType.TEXT_MESSAGE_END,
		messageId: activeStep.messageId
	};
} });
//#endregion
//#region src/stream/processStreamedMessage.ts
/**
* @category Utilities
*/
const processStreamedMessage = async ({ response, createMessage, updateMessage, markToolExecuting = () => {}, clearToolExecuting = () => {}, adapter = agUIAdapter() }) => {
	let currentMessage = {
		id: crypto.randomUUID(),
		role: "assistant",
		content: "",
		toolCalls: []
	};
	let isFirst = true;
	let currentTextItemId = null;
	const toolMessagesByCallId = /* @__PURE__ */ new Map();
	const inFlightToolCallIds = /* @__PURE__ */ new Set();
	let rafId = null;
	const debouncedUpdate = (msg) => {
		if (rafId !== null) cancelAnimationFrame(rafId);
		rafId = requestAnimationFrame(() => {
			updateMessage(msg);
			rafId = null;
		});
	};
	/** Flush the open assistant and start a fresh one (interleaved segments). */
	const startNewAssistantSegment = () => {
		if (rafId !== null) {
			cancelAnimationFrame(rafId);
			rafId = null;
			if (!isFirst) updateMessage(currentMessage);
		}
		currentMessage = {
			id: crypto.randomUUID(),
			role: "assistant",
			content: "",
			toolCalls: []
		};
		isFirst = true;
		currentTextItemId = null;
	};
	const messageHasBody = (msg) => (msg.content?.length ?? 0) > 0 || (msg.toolCalls?.length ?? 0) > 0;
	/** Publish the open assistant only once it has text or tool calls — never an empty shell. */
	const commitCurrentMessage = () => {
		if (isFirst) {
			if (!messageHasBody(currentMessage)) return;
			createMessage(currentMessage);
			isFirst = false;
		} else debouncedUpdate(currentMessage);
	};
	for await (const event of adapter.parse(response)) {
		switch (event.type) {
			case _ag_ui_core.EventType.TEXT_MESSAGE_CHUNK:
			case _ag_ui_core.EventType.TEXT_MESSAGE_CONTENT:
				if (!event.delta) break;
				if ((currentMessage.toolCalls?.length ?? 0) > 0) startNewAssistantSegment();
				currentMessage = {
					...currentMessage,
					content: (currentMessage.content || "") + event.delta
				};
				break;
			case _ag_ui_core.EventType.TOOL_CALL_START:
				inFlightToolCallIds.add(event.toolCallId);
				currentMessage = {
					...currentMessage,
					toolCalls: [...currentMessage.toolCalls || [], {
						id: event.toolCallId,
						type: "function",
						function: {
							name: event.toolCallName,
							arguments: ""
						}
					}]
				};
				break;
			case _ag_ui_core.EventType.TOOL_CALL_END:
				markToolExecuting(event.toolCallId);
				break;
			case _ag_ui_core.EventType.TOOL_CALL_ARGS:
				if (currentMessage.toolCalls) {
					const toolCalls = [...currentMessage.toolCalls];
					const toolCallIndex = toolCalls.findIndex((tc) => tc.id === event.toolCallId);
					if (toolCallIndex !== -1) {
						const currentToolCall = toolCalls[toolCallIndex];
						if (currentToolCall) {
							toolCalls[toolCallIndex] = {
								id: currentToolCall.id,
								type: "function",
								function: {
									name: currentToolCall.function.name,
									arguments: currentToolCall.function.arguments + event.delta
								}
							};
							currentMessage = {
								...currentMessage,
								toolCalls
							};
						}
					}
				}
				break;
			case _ag_ui_core.EventType.TOOL_CALL_CHUNK: {
				const id = event.toolCallId;
				if (!id) break;
				const toolCalls = [...currentMessage.toolCalls || []];
				let index = toolCalls.findIndex((tc) => tc.id === id);
				if (index === -1) {
					inFlightToolCallIds.add(id);
					toolCalls.push({
						id,
						type: "function",
						function: {
							name: event.toolCallName ?? "",
							arguments: ""
						}
					});
					index = toolCalls.length - 1;
				}
				const existing = toolCalls[index];
				if (existing) {
					toolCalls[index] = {
						id: existing.id,
						type: "function",
						function: {
							name: existing.function.name || event.toolCallName || "",
							arguments: existing.function.arguments + (event.delta ?? "")
						}
					};
					currentMessage = {
						...currentMessage,
						toolCalls
					};
				}
				break;
			}
			case _ag_ui_core.EventType.TEXT_MESSAGE_START: {
				const startId = event.messageId ?? null;
				if (((currentMessage.content?.length ?? 0) > 0 || (currentMessage.toolCalls?.length ?? 0) > 0) && startId !== currentTextItemId) startNewAssistantSegment();
				currentTextItemId = startId;
				break;
			}
			case _ag_ui_core.EventType.TOOL_CALL_RESULT: {
				clearToolExecuting(event.toolCallId);
				inFlightToolCallIds.delete(event.toolCallId);
				const failed = event;
				const errorText = failed.isError === true || typeof failed.error === "string" && failed.error.length > 0 ? failed.error ?? event.content : void 0;
				const existing = toolMessagesByCallId.get(event.toolCallId);
				if (existing) {
					const updated = {
						...existing,
						content: event.content,
						...errorText ? { error: errorText } : {}
					};
					toolMessagesByCallId.set(event.toolCallId, updated);
					updateMessage(updated);
				} else {
					const toolMessage = {
						id: crypto.randomUUID(),
						role: "tool",
						toolCallId: event.toolCallId,
						content: event.content,
						...errorText ? { error: errorText } : {}
					};
					toolMessagesByCallId.set(event.toolCallId, toolMessage);
					createMessage(toolMessage);
				}
				continue;
			}
			case _ag_ui_core.EventType.RUN_ERROR: {
				const raw = event.message || event.error || "Stream error";
				const errorText = typeof raw === "string" ? raw : JSON.stringify(raw);
				for (const toolCallId of inFlightToolCallIds) clearToolExecuting(toolCallId);
				inFlightToolCallIds.clear();
				throw new Error(errorText);
			}
		}
		commitCurrentMessage();
	}
	if (rafId !== null) {
		cancelAnimationFrame(rafId);
		updateMessage(currentMessage);
	} else if (isFirst && messageHasBody(currentMessage)) createMessage(currentMessage);
	return currentMessage;
};
//#endregion
//#region src/store/observability.ts
async function buildObservabilityErrorDetail(response) {
	if (response.ok) return {};
	try {
		const res = await response.clone().json();
		return {
			error: res?.error,
			...!res?.message ? { message: await getResponseErrorMessage(response) } : { message: res.message }
		};
	} catch {
		return { message: await getResponseErrorMessage(response) };
	}
}
function levelForStatus(status) {
	return status >= 400 ? "error" : "info";
}
//#endregion
//#region src/store/createChatStore.ts
const mergeThreadList = (existing, incoming) => Array.from(new Map([...existing, ...incoming].map((t) => [t.id, t])).values()).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
const createChatStore = (configRef) => {
	const { storage } = configRef.current;
	const { thread: threadStorage } = storage;
	return (0, zustand.createStore)()((0, zustand_middleware.subscribeWithSelector)((set, get) => ({
		threads: [],
		isLoadingThreads: false,
		threadListError: null,
		selectedThreadId: null,
		hasMoreThreads: false,
		_nextCursor: void 0,
		messages: [],
		isRunning: false,
		isLoadingMessages: false,
		threadError: null,
		executingToolCallIds: /* @__PURE__ */ new Set(),
		_abortController: null,
		loadThreads: () => {
			set({
				isLoadingThreads: true,
				threadListError: null
			});
			threadStorage.listThreads(void 0).then(({ threads = [], nextCursor }) => {
				set({
					threads,
					isLoadingThreads: false,
					_nextCursor: nextCursor,
					hasMoreThreads: nextCursor !== void 0
				});
			}).catch((e) => {
				set({
					isLoadingThreads: false,
					threadListError: e
				});
			});
		},
		loadMoreThreads: () => {
			const cursor = get()._nextCursor;
			if (cursor === void 0) return;
			threadStorage.listThreads(cursor).then(({ threads = [], nextCursor }) => {
				set((s) => ({
					threads: mergeThreadList(s.threads, threads),
					_nextCursor: nextCursor,
					hasMoreThreads: nextCursor !== void 0
				}));
			}).catch((e) => {
				set({ threadListError: e });
			});
		},
		switchToNewThread: () => {
			get().cancelMessage();
			set({
				selectedThreadId: null,
				messages: [],
				threadError: null,
				executingToolCallIds: /* @__PURE__ */ new Set()
			});
		},
		createThread: async (firstMessage) => {
			const thread = await threadStorage.createThread(firstMessage);
			set((s) => ({ threads: mergeThreadList(s.threads, [thread]) }));
			return thread;
		},
		selectThread: (threadId) => {
			if (get().selectedThreadId === threadId) return;
			get().cancelMessage();
			set({
				selectedThreadId: threadId,
				messages: [],
				isLoadingMessages: true,
				threadError: null,
				executingToolCallIds: /* @__PURE__ */ new Set()
			});
			threadStorage.getMessages(threadId).then((messages) => set({
				messages,
				isLoadingMessages: false
			})).catch((e) => set({
				threadError: e,
				isLoadingMessages: false
			}));
		},
		updateThread: (thread) => {
			const setPending = (id, isPending) => set((s) => ({ threads: s.threads.map((t) => t.id === id ? {
				...t,
				isPending
			} : t) }));
			setPending(thread.id, true);
			threadStorage.updateThread(thread).then((updated) => {
				set((s) => ({ threads: s.threads.map((t) => t.id === updated.id ? updated : t) }));
			}).catch(() => setPending(thread.id, false));
		},
		deleteThread: (threadId) => {
			const setPending = (id, isPending) => set((s) => ({ threads: s.threads.map((t) => t.id === id ? {
				...t,
				isPending
			} : t) }));
			setPending(threadId, true);
			threadStorage.deleteThread(threadId).then(() => {
				const state = get();
				set({ threads: state.threads.filter((t) => t.id !== threadId) });
				if (state.selectedThreadId === threadId) state.switchToNewThread();
			}).catch(() => setPending(threadId, false));
		},
		processMessage: async (message) => {
			if (get().isRunning) return;
			const abortController = new AbortController();
			const optimisticMessage = {
				...message,
				id: crypto.randomUUID(),
				role: "user"
			};
			set({
				_abortController: abortController,
				isRunning: true,
				threadError: null,
				executingToolCallIds: /* @__PURE__ */ new Set()
			});
			set((s) => ({ messages: [...s.messages, optimisticMessage] }));
			abortController.signal.addEventListener("abort", () => {
				set({
					_abortController: null,
					isRunning: false
				});
			});
			try {
				let threadId = get().selectedThreadId;
				if (!threadId) {
					threadId = (await get().createThread(optimisticMessage)).id;
					set({ selectedThreadId: threadId });
				}
				const runId = crypto.randomUUID();
				_invdev_observability.observability.info({
					kind: "LLM:request",
					threadId,
					runId,
					userMessage: optimisticMessage
				});
				let response = null;
				try {
					response = await configRef.current.llm.send({
						threadId,
						messages: get().messages,
						signal: abortController.signal
					});
					(0, _invdev_observability.observability)(levelForStatus(response.status), {
						kind: response.ok ? "LLM:response" : "LLM:error",
						threadId,
						status: response.status,
						ok: response.ok,
						runId,
						...await buildObservabilityErrorDetail(response)
					});
					if (!response.ok) throw new Error(await getResponseErrorMessage(response));
				} catch (e) {
					_invdev_observability.observability.error({
						kind: "LLM:error",
						threadId,
						runId,
						error: e instanceof Error ? e : new Error(String(e))
					});
					throw e;
				}
				await processStreamedMessage({
					response,
					createMessage: (msg) => set((s) => ({ messages: [...s.messages, msg] })),
					updateMessage: (msg) => set((s) => ({ messages: s.messages.map((m) => m.id === msg.id ? msg : m) })),
					markToolExecuting: (id) => set((s) => s.executingToolCallIds.has(id) ? s : { executingToolCallIds: new Set(s.executingToolCallIds).add(id) }),
					clearToolExecuting: (id) => set((s) => {
						if (!s.executingToolCallIds.has(id)) return s;
						const next = new Set(s.executingToolCallIds);
						next.delete(id);
						return { executingToolCallIds: next };
					}),
					adapter: configRef.current.llm.streamProtocol
				});
			} catch (e) {
				if (!abortController.signal.aborted) set({ threadError: e instanceof Error ? e : new Error(String(e)) });
			} finally {
				set({
					_abortController: null,
					isRunning: false,
					executingToolCallIds: /* @__PURE__ */ new Set()
				});
			}
		},
		appendMessages: (...newMessages) => {
			set((s) => ({ messages: [...s.messages, ...newMessages] }));
		},
		updateMessage: (message) => {
			set((s) => ({ messages: s.messages.map((m) => m.id === message.id ? message : m) }));
		},
		setMessages: (messages) => {
			set({ messages });
		},
		deleteMessage: (messageId) => {
			set((s) => ({ messages: s.messages.filter((m) => m.id !== messageId) }));
		},
		cancelMessage: () => {
			get()._abortController?.abort();
		}
	})));
};
//#endregion
//#region src/store/createDetailedViewStore.ts
/**
* Creates a Zustand store managing detailed-view state.
* Instantiated once by `ChatProvider` — consumers should not call this directly.
*
* @internal
*/
const createDetailedViewStore = () => {
	return (0, zustand.createStore)()((0, zustand_middleware.subscribeWithSelector)((set, get) => ({
		activeDetailedViewId: null,
		setActiveDetailedView: (id) => {
			set({ activeDetailedViewId: id });
		},
		reset: () => {
			set({ activeDetailedViewId: null });
		},
		_detailedViewPanelNode: null,
		_setDetailedViewPanelNode: (node) => {
			if (typeof process !== "undefined" && process.env?.["NODE_ENV"] !== "production" && node && get()._detailedViewPanelNode && get()._detailedViewPanelNode !== node) console.warn("[Inv] Multiple DetailedViewPortalTarget instances detected. Only one should be mounted at a time.");
			set({ _detailedViewPanelNode: node });
		}
	})));
};
//#endregion
//#region src/store/createThreadContextStore.ts
const entriesEqual = (a, b) => a.heading === b.heading && a.type === b.type;
const upsertVersion = (registry, entry) => {
	const existing = registry[entry.id] ?? [];
	const sameVersionIdx = existing.findIndex((e) => e.version === entry.version);
	if (sameVersionIdx !== -1) {
		const current = existing[sameVersionIdx];
		if (entriesEqual(current, entry)) return registry;
		const next = existing.slice();
		next[sameVersionIdx] = entry;
		return {
			...registry,
			[entry.id]: next
		};
	}
	const insertIdx = existing.findIndex((e) => e.version > entry.version);
	const next = insertIdx === -1 ? [...existing, entry] : [
		...existing.slice(0, insertIdx),
		entry,
		...existing.slice(insertIdx)
	];
	return {
		...registry,
		[entry.id]: next
	};
};
const removeVersion = (registry, id, version) => {
	const existing = registry[id];
	if (!existing) return registry;
	const idx = existing.findIndex((e) => e.version === version);
	if (idx === -1) return registry;
	if (existing.length === 1) {
		const { [id]: _removed, ...rest } = registry;
		return rest;
	}
	const next = existing.slice();
	next.splice(idx, 1);
	return {
		...registry,
		[id]: next
	};
};
/**
* Creates a Zustand store managing the per-thread artifact registry.
*
* Active detailed-view state lives in a separate store
* (see {@link useDetailedView} / {@link useActiveDetailedView}) — TC tracks
* what's *attached* to the thread; detailed-view state tracks what's *visible*.
*
* Instantiated once by `ChatProvider` — consumers should not call this directly.
*
* @internal
*/
const createThreadContextStore = () => {
	return (0, zustand.createStore)()((0, zustand_middleware.subscribeWithSelector)((set) => ({
		artifacts: {},
		registerArtifact: (entry) => {
			set((s) => ({ artifacts: upsertVersion(s.artifacts, entry) }));
		},
		unregisterArtifact: (id, version) => {
			set((s) => ({ artifacts: removeVersion(s.artifacts, id, version) }));
		},
		reset: () => {
			set({ artifacts: {} });
		}
	})));
};
//#endregion
//#region src/store/ChatProvider.tsx
const EMPTY_CATEGORIES = [];
const ChatProvider = ({ children, storage, llm, artifactRenderers, artifactCategories, artifactAutoOpen }) => {
	const [resolvedStorage] = (0, react.useState)(() => storage ?? createDefaultInMemoryStorage());
	const config = (0, react.useRef)({
		storage: resolvedStorage,
		llm
	});
	config.current.llm = llm;
	const [chatStore] = (0, react.useState)(() => createChatStore(config));
	const [detailedViewStore] = (0, react.useState)(() => createDetailedViewStore());
	const [threadContextStore] = (0, react.useState)(() => createThreadContextStore());
	const [artifactRendererRegistry] = (0, react.useState)(() => buildArtifactRendererRegistry(artifactRenderers ?? []));
	const initialRenderersRef = (0, react.useRef)(artifactRenderers);
	const hasWarnedRef = (0, react.useRef)(false);
	(0, react.useEffect)(() => {
		if (typeof process !== "undefined" && process.env?.["NODE_ENV"] !== "production" && !hasWarnedRef.current && initialRenderersRef.current !== artifactRenderers) {
			console.warn("[Inv] `artifactRenderers` prop changed after ChatProvider mount. The original array is kept; new renderers will not be registered. Memoize the array (useMemo) to avoid this warning.");
			hasWarnedRef.current = true;
		}
	}, [artifactRenderers]);
	(0, react.useEffect)(() => {
		return chatStore.subscribe((state) => state.selectedThreadId, () => {
			detailedViewStore.getState().reset();
			threadContextStore.getState().reset();
		});
	}, [
		chatStore,
		detailedViewStore,
		threadContextStore
	]);
	useArtifactAutoOpenWatcher(artifactAutoOpen ?? true, chatStore, threadContextStore, detailedViewStore);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ChatContext.Provider, {
		value: chatStore,
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(DetailedViewContext.Provider, {
			value: detailedViewStore,
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ThreadContextContext.Provider, {
				value: threadContextStore,
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ArtifactRenderersContext.Provider, {
					value: artifactRendererRegistry,
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ArtifactStorageContext.Provider, {
						value: resolvedStorage.artifact ?? null,
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ArtifactCategoriesContext.Provider, {
							value: artifactCategories ?? EMPTY_CATEGORIES,
							children
						})
					})
				})
			})
		})
	});
};
//#endregion
//#region src/stream/formats/langgraph-message-format.ts
function toLangChainMessage(message) {
	switch (message.role) {
		case "user": return {
			type: "human",
			content: message.content ?? ""
		};
		case "assistant": {
			const result = {
				type: "ai",
				content: message.content ?? ""
			};
			if (message.toolCalls?.length) result.tool_calls = message.toolCalls.map((tc) => ({
				id: tc.id,
				name: tc.function.name,
				args: safeParseArgs(tc.function.arguments)
			}));
			return result;
		}
		case "tool": return {
			type: "tool",
			content: message.content,
			tool_call_id: message.toolCallId
		};
		case "system": return {
			type: "system",
			content: message.content
		};
		case "developer": return {
			type: "system",
			content: message.content
		};
		default: return {
			type: "system",
			content: ""
		};
	}
}
function fromLangChainMessage(msg) {
	const id = msg.id ?? crypto.randomUUID();
	switch (msg.type) {
		case "human": return {
			id,
			role: "user",
			content: extractContent(msg.content)
		};
		case "ai": {
			const result = {
				id,
				role: "assistant",
				content: extractContent(msg.content)
			};
			if (msg.tool_calls?.length) result.toolCalls = msg.tool_calls.map((tc) => ({
				id: tc.id,
				type: "function",
				function: {
					name: tc.name,
					arguments: typeof tc.args === "string" ? tc.args : JSON.stringify(tc.args)
				}
			}));
			return result;
		}
		case "tool": return {
			id,
			role: "tool",
			content: extractContent(msg.content),
			toolCallId: msg.tool_call_id ?? ""
		};
		case "system":
		case "developer": return {
			id,
			role: "system",
			content: extractContent(msg.content)
		};
		default: return {
			id,
			role: "system",
			content: extractContent(msg.content)
		};
	}
}
function extractContent(content) {
	if (typeof content === "string") return content;
	return content.filter((block) => block.type === "text" && block.text).map((block) => block.text).join("");
}
function safeParseArgs(args) {
	try {
		return JSON.parse(args);
	} catch {
		return args;
	}
}
/**
* Converts between AG-UI message format and LangGraph's LangChain-style
* message format.
*
* LangGraph uses `type` discriminators (`"human"`, `"ai"`, `"tool"`,
* `"system"`) instead of `role`, and tool call arguments are objects
* rather than JSON strings.
*
* AG-UI → LangGraph (toApi):
*   - Maps `role` to `type` (`"user"` → `"human"`, `"assistant"` → `"ai"`)
*   - Converts `toolCalls[].function.arguments` from JSON string to object
*   - Converts `toolCallId` → `tool_call_id`
*
* LangGraph → AG-UI (fromApi):
*   - Maps `type` to `role` (`"human"` → `"user"`, `"ai"` → `"assistant"`)
*   - Converts tool call `args` object to JSON string
*   - Generates `id` via `crypto.randomUUID()` if not present
*/
const langGraphMessageFormat = {
	toApi(messages) {
		return messages.map(toLangChainMessage);
	},
	fromApi(data) {
		return data.map(fromLangChainMessage);
	}
};
//#endregion
//#region src/stream/formats/openai-message-format.ts
function toOpenAIUserMessage(message) {
	const content = message.content;
	if (typeof content === "string") return {
		role: "user",
		content
	};
	return {
		role: "user",
		content: content?.map((part) => {
			if (part.type === "text") return {
				type: "text",
				text: part.text
			};
			if (part.type === "binary") return {
				type: "image_url",
				image_url: { url: part.url ?? `data:${part.mimeType};base64,${part.data ?? ""}` }
			};
			return {
				type: "text",
				text: ""
			};
		}) ?? []
	};
}
function toOpenAIAssistantMessage(message) {
	const result = {
		role: "assistant",
		content: message.content ?? null
	};
	if (message.toolCalls?.length) result.tool_calls = message.toolCalls.map((tc) => ({
		id: tc.id,
		type: "function",
		function: {
			name: tc.function.name,
			arguments: tc.function.arguments
		}
	}));
	return result;
}
function toOpenAIToolMessage(message) {
	return {
		role: "tool",
		content: message.content,
		tool_call_id: message.toolCallId
	};
}
function toOpenAI(message) {
	switch (message.role) {
		case "user": return toOpenAIUserMessage(message);
		case "assistant": return toOpenAIAssistantMessage(message);
		case "tool": return toOpenAIToolMessage(message);
		case "system": return {
			role: "system",
			content: message.content
		};
		case "developer": return {
			role: "developer",
			content: message.content
		};
		default: return {
			role: "system",
			content: ""
		};
	}
}
function fromOpenAIAssistant(msg) {
	const content = typeof msg.content === "string" ? msg.content : void 0;
	const result = {
		id: crypto.randomUUID(),
		role: "assistant",
		content
	};
	if (msg.tool_calls?.length) result.toolCalls = msg.tool_calls.filter((tc) => tc.type === "function").map((tc) => ({
		id: tc.id,
		type: "function",
		function: {
			name: tc.function.name,
			arguments: tc.function.arguments
		}
	}));
	return result;
}
function fromOpenAIUser(msg) {
	if (typeof msg.content === "string") return {
		id: crypto.randomUUID(),
		role: "user",
		content: msg.content
	};
	const content = msg.content.map((part) => {
		if (part.type === "text") return {
			type: "text",
			text: part.text
		};
		return {
			type: "text",
			text: ""
		};
	});
	return {
		id: crypto.randomUUID(),
		role: "user",
		content
	};
}
function fromOpenAITool(msg) {
	const content = typeof msg.content === "string" ? msg.content : msg.content.map((p) => p.text).join("");
	return {
		id: crypto.randomUUID(),
		role: "tool",
		content,
		toolCallId: msg.tool_call_id
	};
}
function fromOpenAI(data) {
	switch (data.role) {
		case "user": return fromOpenAIUser(data);
		case "assistant": return fromOpenAIAssistant(data);
		case "tool": return fromOpenAITool(data);
		case "system": return {
			id: crypto.randomUUID(),
			role: "system",
			content: typeof data.content === "string" ? data.content : ""
		};
		case "developer": return {
			id: crypto.randomUUID(),
			role: "developer",
			content: typeof data.content === "string" ? data.content : ""
		};
		default: return {
			id: crypto.randomUUID(),
			role: "system",
			content: ""
		};
	}
}
/**
* Converts between AG-UI message format and OpenAI **Chat Completions**
* message format (`ChatCompletionMessageParam`).
*
* This is a 1-to-1 mapping — each AG-UI message becomes exactly one
* `ChatCompletionMessageParam` and vice versa.
*
* AG-UI → OpenAI (toApi):
*   - Strips `id` (OpenAI doesn't use message IDs)
*   - Converts `toolCalls` → `tool_calls`
*   - Converts `toolCallId` → `tool_call_id`
*   - Converts multipart `content` arrays to OpenAI content format
*
* OpenAI → AG-UI (fromApi):
*   - Generates `id` via `crypto.randomUUID()`
*   - Converts `tool_calls` → `toolCalls`
*   - Converts `tool_call_id` → `toolCallId`
*/
const openAIMessageFormat = {
	toApi(messages) {
		return messages.map(toOpenAI);
	},
	fromApi(data) {
		return data.map(fromOpenAI);
	}
};
//#endregion
//#region src/stream/formats/vercel-ai-message-format.ts
const PROVIDER_EXECUTED_TOOLS_UNSUPPORTED_MESSAGE = "Vercel AI SDK provider-executed tools are not supported because AG-UI messages cannot preserve providerExecuted semantics.";
function isRecord(value) {
	return value !== null && typeof value === "object" && !Array.isArray(value);
}
function isProviderExecuted(value) {
	return isRecord(value) && value.providerExecuted === true;
}
function serialize(value) {
	if (typeof value === "string") return value;
	try {
		return JSON.stringify(value) ?? String(value);
	} catch {
		return String(value);
	}
}
function parseToolInput(value) {
	try {
		return JSON.parse(value);
	} catch {
		return value;
	}
}
function dataUrl(mediaType, data) {
	return `data:${mediaType};base64,${data}`;
}
function mediaTypeForPart(part, source) {
	if (typeof source.mimeType === "string") return source.mimeType;
	switch (part.type) {
		case "image": return "image/*";
		case "audio": return "audio/*";
		case "video": return "video/*";
		default: return "application/octet-stream";
	}
}
function toUserParts(content) {
	if (typeof content === "string") return [{
		type: "text",
		text: content
	}];
	if (!Array.isArray(content)) return [];
	return content.flatMap((part) => {
		if (!isRecord(part)) return [];
		if (part.type === "text" && typeof part.text === "string") return [{
			type: "text",
			text: part.text
		}];
		if (part.type === "binary") {
			const mediaType = typeof part.mimeType === "string" ? part.mimeType : "application/octet-stream";
			const url = typeof part.url === "string" ? part.url : typeof part.data === "string" ? dataUrl(mediaType, part.data) : void 0;
			if (!url) return [];
			return [{
				type: "file",
				mediaType,
				url,
				...typeof part.filename === "string" ? { filename: part.filename } : {}
			}];
		}
		switch (part.type) {
			case "image":
			case "audio":
			case "video":
			case "document": {
				if (!isRecord(part.source) || typeof part.source.value !== "string") return [];
				const mediaType = mediaTypeForPart(part, part.source);
				const url = part.source.type === "data" ? dataUrl(mediaType, part.source.value) : part.source.type === "url" ? part.source.value : void 0;
				return url ? [{
					type: "file",
					mediaType,
					url
				}] : [];
			}
			default: return [];
		}
	});
}
function toToolPart(toolCall, result) {
	if (isProviderExecuted(toolCall) || isProviderExecuted(result)) throw new Error(PROVIDER_EXECUTED_TOOLS_UNSUPPORTED_MESSAGE);
	const input = parseToolInput(toolCall.function.arguments);
	if (result?.error) return {
		type: "dynamic-tool",
		toolName: toolCall.function.name,
		toolCallId: toolCall.id,
		state: "output-error",
		input,
		errorText: result.error
	};
	if (result) return {
		type: "dynamic-tool",
		toolName: toolCall.function.name,
		toolCallId: toolCall.id,
		state: "output-available",
		input,
		output: result.content
	};
	return {
		type: "dynamic-tool",
		toolName: toolCall.function.name,
		toolCallId: toolCall.id,
		state: "input-available",
		input
	};
}
function toVercelMessages(messages) {
	const toolResults = /* @__PURE__ */ new Map();
	for (const message of messages) if (message.role === "tool") toolResults.set(message.toolCallId, message);
	const result = [];
	for (const message of messages) switch (message.role) {
		case "user":
			result.push({
				id: message.id,
				role: "user",
				parts: toUserParts(message.content)
			});
			break;
		case "assistant": {
			const parts = [];
			if (typeof message.content === "string" && message.content.length > 0) parts.push({
				type: "text",
				text: message.content
			});
			for (const toolCall of message.toolCalls ?? []) parts.push(toToolPart(toolCall, toolResults.get(toolCall.id)));
			result.push({
				id: message.id,
				role: "assistant",
				parts
			});
			break;
		}
		case "system":
		case "developer":
			result.push({
				id: message.id,
				role: "system",
				parts: [{
					type: "text",
					text: message.content
				}]
			});
			break;
		default: break;
	}
	return result;
}
function validUIMessage(value) {
	return isRecord(value) && typeof value.id === "string" && (value.role === "system" || value.role === "user" || value.role === "assistant") && Array.isArray(value.parts);
}
function textFromParts(parts) {
	return parts.filter((part) => isRecord(part) && part.type === "text" && typeof part.text === "string").map((part) => part.text).join("");
}
function binaryFromFilePart(part) {
	if (part.type !== "file" || typeof part.mediaType !== "string" || typeof part.url !== "string") return;
	const base64Prefix = `data:${part.mediaType};base64,`;
	const source = part.url.startsWith(base64Prefix) ? { data: part.url.slice(base64Prefix.length) } : { url: part.url };
	return {
		type: "binary",
		mimeType: part.mediaType,
		...source,
		...typeof part.filename === "string" ? { filename: part.filename } : {}
	};
}
function fromVercelUser(message) {
	const contentParts = [];
	let hasFile = false;
	for (const part of message.parts) {
		if (!isRecord(part)) continue;
		if (part.type === "text" && typeof part.text === "string") {
			contentParts.push({
				type: "text",
				text: part.text
			});
			continue;
		}
		const binary = binaryFromFilePart(part);
		if (binary) {
			hasFile = true;
			contentParts.push(binary);
		}
	}
	return {
		id: message.id,
		role: "user",
		content: hasFile ? contentParts : textFromParts(message.parts)
	};
}
function toolName(part) {
	if (part.type === "dynamic-tool") return typeof part.toolName === "string" && part.toolName.length > 0 ? part.toolName : void 0;
	if (typeof part.type !== "string" || !part.type.startsWith("tool-")) return void 0;
	return part.type.slice(5) || void 0;
}
function hasOwn(record, key) {
	return Object.prototype.hasOwnProperty.call(record, key);
}
function toolResultFromPart(part) {
	if (typeof part.toolCallId !== "string") return void 0;
	if (part.state === "output-available" && hasOwn(part, "output")) return {
		id: `tool-result-${part.toolCallId}`,
		role: "tool",
		toolCallId: part.toolCallId,
		content: serialize(part.output)
	};
	if (part.state === "output-error" && typeof part.errorText === "string") return {
		id: `tool-result-${part.toolCallId}`,
		role: "tool",
		toolCallId: part.toolCallId,
		content: part.errorText,
		error: part.errorText
	};
	if (part.state === "output-denied") {
		const error = "Tool execution was denied";
		return {
			id: `tool-result-${part.toolCallId}`,
			role: "tool",
			toolCallId: part.toolCallId,
			content: error,
			error
		};
	}
}
function appendAssistantSegments(message, result) {
	let segmentIndex = 0;
	let segmentStarted = false;
	let text = "";
	let toolCalls = [];
	let toolResults = [];
	const hasStepMarkers = message.parts.some((part) => isRecord(part) && part.type === "step-start");
	const hasBody = () => text.length > 0 || toolCalls.length > 0;
	const flush = (force = false) => {
		if (!force && !segmentStarted) return;
		segmentIndex += 1;
		result.push({
			id: segmentIndex === 1 ? message.id : `${message.id}-segment-${segmentIndex}`,
			role: "assistant",
			...text ? { content: text } : {},
			...toolCalls.length ? { toolCalls } : {}
		});
		result.push(...toolResults);
		text = "";
		toolCalls = [];
		toolResults = [];
		segmentStarted = false;
	};
	for (const value of message.parts) {
		if (!isRecord(value)) continue;
		if (value.type === "step-start") {
			if (hasBody()) flush();
			continue;
		}
		if (value.type === "text" && typeof value.text === "string") {
			if (toolCalls.length > 0 || !hasStepMarkers && hasBody()) flush();
			segmentStarted = true;
			text += value.text;
			continue;
		}
		const name = toolName(value);
		if (!name || typeof value.toolCallId !== "string") continue;
		if (value.providerExecuted === true) throw new Error(PROVIDER_EXECUTED_TOOLS_UNSUPPORTED_MESSAGE);
		segmentStarted = true;
		toolCalls.push({
			id: value.toolCallId,
			type: "function",
			function: {
				name,
				arguments: hasOwn(value, "input") ? serialize(value.input) : ""
			}
		});
		const toolResult = toolResultFromPart(value);
		if (toolResult) toolResults.push(toolResult);
	}
	flush(segmentIndex === 0);
}
function fromVercelMessages(data) {
	if (!Array.isArray(data)) return [];
	const result = [];
	for (const value of data) {
		if (!validUIMessage(value)) continue;
		const message = value;
		if (message.role === "user") {
			result.push(fromVercelUser(message));
			continue;
		}
		const text = textFromParts(message.parts);
		if (message.role === "system") {
			result.push({
				id: message.id,
				role: "system",
				content: text
			});
			continue;
		}
		appendAssistantSegments(message, result);
	}
	return result;
}
/**
* Converts messages between AG-UI and Vercel AI SDK v6 and v7 `UIMessage` format.
*
* AG-UI tool-result messages are folded into the matching assistant tool part,
* because `UIMessage` represents a tool invocation and its result as one part.
* Outbound tool calls use `dynamic-tool` parts because AG-UI messages do not
* carry the static tool schema needed to select a `tool-${name}` part. Inbound
* conversion accepts both dynamic and static tool parts.
*
* Vercel `UIMessage` has no developer role, so both AG-UI system and developer
* messages map to its system role.
*
* Provider-executed tools are rejected because the AG-UI message model has no
* execution-provenance field and therefore cannot preserve their requirement
* that results remain in the assistant message.
*/
const vercelAIMessageFormat = {
	toApi(messages) {
		return toVercelMessages(messages);
	},
	fromApi(data) {
		return fromVercelMessages(data);
	}
};
//#endregion
//#region src/adapters/fetchLLM.ts
/**
* Generic HTTP-based LLM adapter. POSTs an AG-UI `RunAgentInput`-shaped body
* (`{ threadId, runId, messages, tools, context }`, messages in the chosen wire
* format) to `url` and returns the streaming `Response` for downstream processing.
*/
function fetchLLM({ url, streamAdapter, messageFormat = identityMessageFormat, headers, fetch: customFetch, body }) {
	const fetchImpl = customFetch ?? globalThis.fetch.bind(globalThis);
	return {
		send: ({ threadId, messages, signal }) => {
			const runId = crypto.randomUUID();
			return fetchImpl(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					...headers
				},
				body: JSON.stringify({
					...body,
					tools: [],
					context: [],
					threadId,
					runId,
					messages: messageFormat.toApi(messages)
				}),
				signal
			});
		},
		streamProtocol: streamAdapter
	};
}
//#endregion
//#region src/adapters/restStorage.ts
/**
* Generic REST-based thread storage. Reproduces the conventions the removed
* `threadApiUrl` prop used, so an existing backend keeps working by swapping
* `threadApiUrl="/x"` for `storage={restStorage({ baseUrl: "/x" })}`.
*
* Only the `thread` channel is implemented. Pair with an `llm` adapter
* (e.g. `fetchLLM`).
*/
function restStorage({ baseUrl, messageFormat = identityMessageFormat, headers, fetch: customFetch }) {
	const fetchImpl = customFetch ?? globalThis.fetch.bind(globalThis);
	const request = async (url, init) => {
		const res = await fetchImpl(url, {
			...init,
			headers: {
				...init?.body ? { "Content-Type": "application/json" } : {},
				...headers,
				...init?.headers
			}
		});
		if (!res.ok) throw new Error(`restStorage: ${init?.method ?? "GET"} ${url} failed: ${res.status} ${res.statusText}`);
		return res;
	};
	return { thread: {
		async listThreads(cursor) {
			return (await request(cursor ? `${baseUrl}/get?cursor=${cursor}` : `${baseUrl}/get`)).json();
		},
		async createThread(firstMessage) {
			return (await request(`${baseUrl}/create`, {
				method: "POST",
				body: JSON.stringify({ messages: messageFormat.toApi([firstMessage]) })
			})).json();
		},
		async getMessages(threadId) {
			const raw = await (await request(`${baseUrl}/get/${threadId}`)).json();
			return messageFormat.fromApi(raw);
		},
		async updateThread(thread) {
			return (await request(`${baseUrl}/update/${thread.id}`, {
				method: "PATCH",
				body: JSON.stringify(thread)
			})).json();
		},
		async deleteThread(id) {
			await request(`${baseUrl}/delete/${id}`, { method: "DELETE" });
		}
	} };
}
//#endregion
exports.ArtifactRenderersContext = ArtifactRenderersContext;
exports.ChatProvider = ChatProvider;
exports.DetailedViewContext = DetailedViewContext;
exports.EVE_INPUT_REQUESTED_EVENT = EVE_INPUT_REQUESTED_EVENT;
Object.defineProperty(exports, "EventType", {
	enumerable: true,
	get: function() {
		return _ag_ui_core.EventType;
	}
});
exports.MessageContext = MessageContext;
exports.MessageProvider = MessageProvider;
exports.ThreadContextContext = ThreadContextContext;
exports.agUIAdapter = agUIAdapter;
exports.artifactViewId = artifactViewId;
exports.defineArtifactCategories = defineArtifactCategories;
exports.defineArtifactRenderer = defineArtifactRenderer;
exports.eveAdapter = eveAdapter;
exports.fetchLLM = fetchLLM;
exports.getResponseErrorMessage = getResponseErrorMessage;
exports.identityMessageFormat = identityMessageFormat;
exports.langGraphAdapter = langGraphAdapter;
exports.langGraphMessageFormat = langGraphMessageFormat;
exports.lookupArtifactRenderer = lookupArtifactRenderer;
exports.lookupArtifactRendererByType = lookupArtifactRendererByType;
exports.openAIAdapter = openAIAdapter;
exports.openAIConversationMessageFormat = openAIConversationMessageFormat;
exports.openAIMessageFormat = openAIMessageFormat;
exports.openAIReadableStreamAdapter = openAIReadableStreamAdapter;
exports.openAIResponsesAdapter = openAIResponsesAdapter;
exports.pairToolActivity = pairToolActivity;
exports.parseArtifactViewId = parseArtifactViewId;
exports.partialJSONParse = partialJSONParse;
exports.processStreamedMessage = processStreamedMessage;
exports.restStorage = restStorage;
exports.useActiveDetailedView = useActiveDetailedView;
exports.useArtifactCategories = useArtifactCategories;
exports.useArtifactList = useArtifactList;
exports.useArtifactRenderer = useArtifactRenderer;
exports.useArtifactRendererRegistry = useArtifactRendererRegistry;
exports.useArtifactStorage = useArtifactStorage;
exports.useDetailedView = useDetailedView;
exports.useDetailedViewPortalTarget = useDetailedViewPortalTarget;
exports.useDetailedViewStore = useDetailedViewStore;
exports.useMessage = useMessage;
exports.useInvCloudStorage = useInvCloudStorage;
exports.useThread = useThread;
exports.useThreadContextStore = useThreadContextStore;
exports.useThreadList = useThreadList;
exports.useToolActivities = useToolActivities;
exports.vercelAIAdapter = vercelAIAdapter;
exports.vercelAIMessageFormat = vercelAIMessageFormat;

//# sourceMappingURL=index.cjs.map