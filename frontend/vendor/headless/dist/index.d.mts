import * as _$react from "react";
import { FC, ReactNode } from "react";
import { StoreApi } from "zustand";
import { AGUIEvent, AGUIEvent as AGUIEvent$1, ActivityMessage, AssistantMessage, BinaryInputContent, DeveloperMessage, EventType, FunctionCall, InputContent, Message, ReasoningMessage, SystemMessage, TextInputContent, ToolCall, ToolMessage, UserMessage } from "@ag-ui/core";
import { HandleMessageStreamEvent, HandleMessageStreamEvent as EveStreamEvent, InputOption as EveInputOption, InputRequest as EveInputRequest } from "eve/client";

//#region src/store/artifactRendererTypes.d.ts
/**
 * Controls passed to a renderer's `preview` and `actual` render functions.
 *
 * @category Types
 */
interface ArtifactRendererControls {
  /** Whether this renderer's detailed view is the currently active one. */
  isActive: boolean;
  /**
   * `true` while the tool call is still streaming — i.e. its arguments are
   * arriving incrementally and no tool result has been paired in yet. Becomes
   * `false` once the tool result message lands and the renderer is invoked
   * with the full `response`. Always `false` for storage-opened artifacts.
   *
   * The same component instance is reused across the streaming → completed
   * transition, so renderers can rely on this flag to swap UI states (e.g.
   * show a skeleton or "streaming…" badge during partial args, then the final
   * view) without remounting.
   */
  isStreaming: boolean;
  /** Activates this renderer's detailed view. */
  open: () => void;
  /** Closes this renderer's detailed view if currently active. */
  close: () => void;
  /** Toggles this renderer's detailed view. */
  toggle: () => void;
}
/**
 * Result of a renderer's `parser`.
 *
 * - Returning `null` from `parser` skips rendering this tool call entirely.
 * - `meta: null` renders preview/actual but skips ThreadContext registration —
 *   a common pattern while `ctx.isStreaming` is `true` so the entry only
 *   appears in the registry once the tool result has arrived.
 *
 * @category Types
 */
interface ParsedArtifact<Props> {
  props: Props;
  meta: {
    id: string;
    version: number;
    heading: string;
    type?: string;
  } | null;
}
/**
 * Configuration for a single artifact renderer, returned by {@link defineArtifactRenderer}.
 *
 * Renderers are matched against tool calls by `toolName` (one or many literal
 * strings) and against stored artifacts by `type`. When a match fires, `parser`
 * converts the raw envelope into typed `Props` + an optional ThreadContext
 * `meta` entry, and `preview` / `actual` render the inline chat preview and
 * the full view respectively.
 *
 * @category Types
 */
interface ArtifactRendererConfig<Props = unknown> {
  /**
   * Artifact type this renderer handles, e.g. `"th_presentation"`.
   * Links the renderer to {@link ArtifactCategory} filters and to stored
   * artifacts (`ArtifactSummary.type`) for thread-independent rendering.
   */
  type: string;
  /**
   * Tool name(s) to match. Literal strings only; first registration wins on
   * duplicates. An array registers the same renderer for several tools.
   */
  toolName: string | string[];
  /**
   * Converts the raw envelope into `{ props, meta }`.
   *
   * Tool-call path: receives `{ args, response }` exactly as the backend
   * emitted them — the SDK does not pre-parse JSON. Called on every update,
   * including during streaming, so implementations must tolerate:
   *  - `args` as a *partial* JSON string (the LLM is still emitting it), and
   *  - `response` as `null` (the tool result hasn't arrived yet — see
   *    {@link ArtifactRendererControls.isStreaming}).
   *
   * Storage path (artifact browser): receives `{ args: undefined, response: artifact.content }` —
   * stored `content` must therefore have the same shape as the tool-call response.
   *
   * Return `null` to skip rendering. Return `meta: null` to render without
   * registering in the ThreadContext (entry hidden from workspace lists).
   * `meta.id` should be stable across re-runs of the same logical entry —
   * when `(id, version)` changes, the registry entry is re-registered.
   */
  parser: (raw: {
    args: unknown;
    response: unknown;
  }, ctx: {
    isStreaming: boolean;
  }) => ParsedArtifact<Props> | null;
  /** Renders the inline preview shown in the chat message. */
  preview: (props: Props, controls: ArtifactRendererControls) => ReactNode;
  /** Renders the full artifact view (side panel in-thread, full page in the artifact browser). */
  actual: (props: Props, controls: ArtifactRendererControls) => ReactNode;
  /**
   * Icon for this artifact type, used by the artifact nav for the category this
   * type belongs to. A platform-neutral node (a web element or a React Native
   * element). When a category groups several types, the nav uses the first
   * member type's icon; if none is set the UI falls back to a generic default.
   */
  icon?: ReactNode;
  /**
   * Human-readable display label for this artifact type, shown as the type
   * metadata on artifact browser cards and workspace items (e.g. `"Report"`).
   * When omitted, the UI prettifies the `type` id (never shows the raw id).
   * Mirrors `icon` — declared via `defineArtifactRenderer({ label })`.
   */
  label?: string;
}
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
declare function defineArtifactRenderer<Props>(config: ArtifactRendererConfig<Props>): ArtifactRendererConfig<Props>;
//#endregion
//#region src/store/types.d.ts
type CreateMessage = Omit<UserMessage, "id">;
type Thread = {
  id: string;
  title: string;
  createdAt: string | number;
  isPending?: boolean;
};
type ThreadListState = {
  threads: Thread[];
  isLoadingThreads: boolean;
  threadListError: Error | null;
  selectedThreadId: string | null;
  hasMoreThreads: boolean;
};
type ThreadListActions = {
  loadThreads: () => void;
  loadMoreThreads: () => void;
  switchToNewThread: () => void;
  createThread: (firstMessage: UserMessage) => Promise<Thread>;
  selectThread: (threadId: string) => void;
  updateThread: (thread: Thread) => void;
  deleteThread: (threadId: string) => void;
};
type ThreadState = {
  messages: Message[];
  isRunning: boolean;
  isLoadingMessages: boolean;
  threadError: Error | null;
  /**
   * Tool calls whose arguments have closed (`TOOL_CALL_END` seen) but whose
   * result message has not yet arrived — i.e. the tool is currently executing.
   * Drives the `"executing"` status in {@link ToolActivity}; reset to an empty
   * set when a new message run starts or the thread switches. The reference is
   * stable across unrelated store updates (a new `Set` is created only when the
   * membership changes), so selector consumers don't re-render needlessly.
   */
  executingToolCallIds: Set<string>;
};
type ThreadActions = {
  processMessage: (message: CreateMessage) => Promise<void>;
  /**
   * Follows a response that is already being generated (e.g. a run started elsewhere) as the current
   * assistant turn: sets `isRunning`, streams it through the configured stream protocol, and stops on
   * `cancelMessage`. `open` receives the abort signal and returns the streaming response.
   */
  attachRun: (open: (signal: AbortSignal) => Promise<Response>) => Promise<void>;
  appendMessages: (...messages: Message[]) => void;
  updateMessage: (message: Message) => void;
  setMessages: (messages: Message[]) => void;
  deleteMessage: (messageId: string) => void;
  cancelMessage: () => void;
};
type ChatStore = ThreadListState & ThreadListActions & ThreadState & ThreadActions & {
  /** @internal */_nextCursor?: string | undefined; /** @internal */
  _abortController: AbortController | null;
};
interface ChatProviderProps {
  /** Optional — defaults to an internal in-memory storage (no persistence). */
  storage?: ChatStorage;
  /** Required — drives message sending and stream parsing. */
  llm: ChatLLM;
  /**
   * Artifact renderers matched against tool calls (by `toolName`) and stored
   * artifacts (by `type`). Captured at mount; subsequent prop changes are
   * ignored (dev warning). Order is priority: first registration wins on
   * duplicate `toolName`/`type`.
   */
  artifactRenderers?: ReadonlyArray<ArtifactRendererConfig<any>>;
  /**
   * Global artifact categories. Drive the sidebar Artifacts split, the
   * artifact browser's pre-applied filters, and workspace section grouping.
   */
  artifactCategories?: ArtifactCategory[];
  artifactAutoOpen?: boolean;
  children: React.ReactNode;
}
//#endregion
//#region src/types/stream.d.ts
interface StreamProtocolAdapter {
  parse(response: Response): AsyncIterable<AGUIEvent$1>;
}
//#endregion
//#region src/adapters/types.d.ts
interface ThreadStorage {
  listThreads(cursor?: string): Promise<{
    threads: Thread[];
    nextCursor?: string;
  }>;
  createThread(firstMessage: UserMessage): Promise<Thread>;
  getMessages(threadId: string): Promise<Message[]>;
  updateThread(thread: Thread): Promise<Thread>;
  deleteThread(id: string): Promise<void>;
}
/** Listing-level artifact record. `content` is fetched separately via `get`. */
interface ArtifactSummary {
  id: string;
  title: string;
  /** Artifact type, e.g. `'th_dashboard'`, `'th_presentation'`. Matched against renderer `type` and category filters. */
  type: string;
  /** Thread the artifact was created in. Drives the "go to original thread" action. */
  threadId: string;
  updatedAt?: string | number;
}
/** Full artifact. `content` must have the same shape as the tool-call `response` the renderer's parser expects. */
interface Artifact extends ArtifactSummary {
  content: unknown;
}
interface ArtifactListParams {
  /** Partial-match search on `title`. Server-side. */
  name?: string;
  /** Filter by artifact types. Server-side. */
  type?: string[];
  cursor?: string;
  limit?: number;
}
interface ArtifactStorage {
  list(params?: ArtifactListParams): Promise<{
    artifacts: ArtifactSummary[];
    nextCursor?: string;
  }>;
  get(id: string): Promise<Artifact>;
  /** Persist edited artifact content. Called by renderer implementations (via `useArtifactStorage`), not by the framework. */
  update(patch: {
    id: string;
    content: unknown;
  }): Promise<ArtifactSummary>;
}
/**
 * Global artifact category. Categories split the sidebar "Artifacts" nav and
 * the per-thread Workspace sections, and pre-apply filters in the artifact browser.
 */
interface ArtifactCategory {
  /** Display label + key, e.g. `'Apps'`. */
  name: string;
  filter: {
    /** Artifact types belonging to this category. */type: string[];
  };
  /**
   * Icon for this category's sidebar nav item. A platform-neutral node (a web
   * element or a React Native element). When omitted, the nav falls back to the
   * `<ArtifactNav icon>` prop, then a generic default.
   */
  icon?: ReactNode;
}
interface ChatStorage {
  thread: ThreadStorage;
  /** Optional global artifact storage. Absent → the Artifacts nav and browser are unavailable. */
  artifact?: ArtifactStorage;
}
interface ChatLLM {
  send(params: {
    threadId: string;
    messages: Message[];
    signal: AbortSignal;
  }): Promise<Response>;
  streamProtocol: StreamProtocolAdapter;
}
//#endregion
//#region src/cloud/invCloud.d.ts
/** Which storage surfaces useInvCloudStorage wires. */
interface InvCloudFeatures {
  /** Stored-artifact reads + edits. Default true. */
  artifact?: boolean;
}
interface InvCloudOptions {
  /**
   * The Inv Cloud API origin. Defaults to "https://api.inv.dev" (the
   * storage layer appends `/v1/...`). Set this to e.g. "http://localhost:3102"
   * to run against a local stack. The browser calls this directly with the
   * fct_ token — there is no same-origin proxy in between.
   */
  apiBaseUrl?: string;
  /**
   * Where the short-lived fct_ session token comes from — either a URL of your
   * backend mint endpoint (POST → { token, expires_at }, cached + refreshed
   * here) or a function returning a fresh token (you own caching). The token
   * rides the `x-inv-frontend-token` header on every /v1 call. The frontend
   * token is minted server-side; the master key never reaches the browser.
   */
  token: string | (() => Promise<string>);
  /** Which storage surfaces to wire. Omit to enable all. */
  features?: InvCloudFeatures;
  /** fetch override (tests / SSR). Defaults to globalThis.fetch. */
  fetch?: typeof fetch;
  /** Refresh the cached token this many seconds before expiry (URL form). Default 60. */
  refreshSkewSeconds?: number;
}
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
declare function useInvCloudStorage(options: InvCloudOptions): ChatStorage;
//#endregion
//#region src/hooks/useActiveDetailedView.d.ts
/**
 * Return type for {@link useActiveDetailedView}.
 *
 * @category Hooks
 */
type UseActiveDetailedViewReturn = {
  /** Whether any detailed view is currently active (panel is open). */isDetailedViewActive: boolean; /** The id of the currently active detailed view, or `null` if none. */
  activeDetailedViewId: string | null; /** Closes whichever detailed view is currently active. No-op if none is active. */
  closeDetailedView: () => void;
};
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
declare function useActiveDetailedView(): UseActiveDetailedViewReturn;
//#endregion
//#region src/store/threadContextTypes.d.ts
/**
 * A registered artifact entry in the per-thread context.
 *
 * Artifacts are durable structured outputs (dashboards, presentations,
 * reports, …) produced by tool calls. Versions for the same `id` are kept in
 * an ordered list so the workspace can show history; the latest version
 * (highest `version` number) is the default open target.
 *
 * `type` comes from the matched renderer's config and drives category
 * grouping (see `ArtifactCategory`).
 *
 * @category Types
 */
type ArtifactEntry = {
  id: string;
  version: number;
  heading: string; /** Artifact type from the renderer config, e.g. `'th_dashboard'`. */
  type: string; /** Timestamp when this artifact was registered/updated in the thread context. */
  updatedAt?: string | number;
};
/**
 * Read-only state slice for the ThreadContext.
 *
 * @category Types
 */
type ThreadContextState = {
  /** Artifacts registered in the active thread, grouped by `id`, sorted ascending by `version`. */artifacts: Record<string, ArtifactEntry[]>;
};
/**
 * Actions for managing the ThreadContext.
 *
 * @category Types
 */
type ThreadContextActions = {
  /**
   * Upserts an artifact entry by `(id, version)`.
   *
   * - If no entry with the same `id` exists, creates a new bucket.
   * - If a different `version` exists, inserts and keeps versions sorted ascending.
   * - If the same `(id, version)` exists, updates `heading`/`type` (no-op when unchanged).
   */
  registerArtifact: (entry: ArtifactEntry) => void; /** Removes an artifact version. No-op if `(id, version)` is not registered. */
  unregisterArtifact: (id: string, version: number) => void;
  /**
   * Clears the registry. Called automatically on thread switch.
   */
  reset: () => void;
};
/** Combined ThreadContext store type (state + actions). */
type ThreadContextStore = ThreadContextState & ThreadContextActions;
//#endregion
//#region src/hooks/useArtifactList.d.ts
interface ArtifactListFilter {
  /** Only entries whose `type` is in this list. Omit for all entries. */
  type?: string[];
}
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
declare function useArtifactList(filter?: ArtifactListFilter): Record<string, ArtifactEntry[]>;
//#endregion
//#region src/hooks/useArtifactRenderer.d.ts
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
declare function useArtifactRenderer(toolName: string): ArtifactRendererConfig<unknown> | null;
//#endregion
//#region src/hooks/useDetailedView.d.ts
/**
 * Return type for {@link useDetailedView}.
 *
 * @category Hooks
 */
type UseDetailedViewReturn = {
  /** Whether this view is the currently active (visible) one. */isActive: boolean; /** Activates this view as the side panel. */
  open: () => void; /** Closes this view if it is currently active. */
  close: () => void; /** Toggles this view: opens if closed, closes if open. */
  toggle: () => void;
};
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
declare function useDetailedView(viewId: string): UseDetailedViewReturn;
//#endregion
//#region src/hooks/useDetailedViewPortalTarget.d.ts
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
declare function useDetailedViewPortalTarget(): {
  setNode: (node: HTMLElement | null) => void;
  node: HTMLElement | null;
};
//#endregion
//#region src/types/messageFormat.d.ts
/**
 * Converts messages between AG-UI format (used internally) and the
 * format your backend / storage layer expects.
 *
 * Both methods operate on **arrays** so that formats where a single
 * AG-UI message maps to multiple backend items (e.g. OpenAI Responses
 * API) work seamlessly alongside 1-to-1 formats (e.g. Completions).
 *
 * @example
 * // Identity (default) — no conversion
 * const identity: MessageFormat = {
 *   toApi: (messages) => messages,
 *   fromApi: (data) => data as Message[],
 * };
 */
interface MessageFormat {
  /** Convert AG-UI messages to the format your backend expects (outbound). */
  toApi(messages: Message[]): unknown;
  /** Convert messages from your backend/storage format to AG-UI (inbound). */
  fromApi(data: unknown): Message[];
}
/**
 * Default identity message format — no conversion.
 * Messages are sent and received as-is in AG-UI format.
 */
declare const identityMessageFormat: MessageFormat;
//#endregion
//#region src/hooks/useMessage.d.ts
/**
 * @category Contexts
 */
declare const MessageContext: _$react.Context<{
  message: Message;
} | null>;
/**
 * @category Hooks
 * @returns The current message. See {@link Message} for more information.
 */
declare const useMessage: () => {
  message: Message;
};
/**
 * @category Components
 */
declare const MessageProvider: ({
  message,
  children
}: {
  message: Message;
  children: React.ReactNode;
}) => _$react.JSX.Element;
//#endregion
//#region src/hooks/useThread.d.ts
type ThreadSlice = ThreadState & ThreadActions;
type ThreadListSlice = ThreadListState & ThreadListActions;
declare function useThread(): ThreadSlice;
declare function useThread<T>(selector: (state: ThreadSlice) => T): T;
declare function useThreadList(): ThreadListSlice;
declare function useThreadList<T>(selector: (state: ThreadListSlice) => T): T;
//#endregion
//#region src/store/toolActivity.d.ts
/**
 * Real per-call lifecycle of a tool invocation.
 *
 * Derived from AG-UI stream events (never faked from `!!content`):
 *  - `streaming` — arguments are still arriving (`TOOL_CALL_ARGS` deltas).
 *  - `executing` — arguments closed (`TOOL_CALL_END` seen), awaiting a result.
 *  - `complete`  — a `TOOL_CALL_RESULT` landed without an error.
 *  - `error`     — a `TOOL_CALL_RESULT`/`RUN_ERROR` carried a failure.
 *
 * @category Types
 */
type ToolCallStatus = "streaming" | "executing" | "complete" | "error";
/**
 * Single source of truth for one tool call + its (optional) result, used by the
 * UI layer instead of reading raw `ToolCall`/`ToolMessage` separately.
 *
 * Discriminated by `status` so impossible states are unrepresentable: the view
 * literally cannot read `result`/`errorText` in a state where they don't exist,
 * nor render an error as a success.
 *
 *  - `streaming` → args still arriving; `input` is `Partial<T>`, no result.
 *  - `executing` → args closed; `input` is `T`, awaiting result.
 *  - `complete`  → result landed OK; `input` is `T`, `result` is a string.
 *  - `error`     → result landed with a failure; `errorText` present.
 *
 * `input` is {@link partialJSONParse}'d **once** by the selector — never a raw
 * string for the consumer to parse.
 *
 * @category Types
 */
type ToolActivity<T = unknown> = {
  status: "streaming";
  id: string;
  toolName: string;
  toolCall: ToolCall;
  toolMessage: null;
  input: Partial<T>;
  result?: undefined;
  isError: false;
  errorText?: undefined;
  statusMessage?: string;
} | {
  status: "executing";
  id: string;
  toolName: string;
  toolCall: ToolCall;
  toolMessage: null;
  input: T;
  result?: undefined;
  isError: false;
  errorText?: undefined;
  statusMessage?: string;
} | {
  status: "complete";
  id: string;
  toolName: string;
  toolCall: ToolCall;
  toolMessage: ToolMessage;
  input: T;
  result: string;
  isError: false;
  errorText?: undefined;
  statusMessage?: string;
} | {
  status: "error";
  id: string;
  toolName: string;
  toolCall: ToolCall;
  toolMessage: ToolMessage;
  input: T;
  result: string;
  isError: true;
  errorText?: string;
  statusMessage?: string;
};
/**
 * Tolerant single-pass JSON parse for streamed tool arguments. Tries a straight
 * parse, then a bracket-balanced parse for partial input. **Never throws** —
 * returns `{}` when nothing parseable can be recovered.
 *
 * @category Utilities
 */
declare function partialJSONParse(raw: string): unknown;
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
declare function pairToolActivity(message: AssistantMessage, allMessages: ReadonlyArray<Message>, executingIds?: ReadonlySet<string>): ToolActivity[];
//#endregion
//#region src/hooks/useToolActivities.d.ts
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
declare function useToolActivities(message: AssistantMessage, allMessages: Message[]): ToolActivity[];
//#endregion
//#region src/store/artifactCategories.d.ts
/**
 * One named artifact category and the renderers that belong to it. Passed to
 * {@link defineArtifactCategories}.
 *
 * @category Types
 */
interface ArtifactCategoryGroup {
  /** Display label and key for the category, e.g. `"Reports"`. */
  name: string;
  /**
   * Renderers in this category. Each renderer's `type` populates the category's
   * filter, and the renderers themselves are collected into `artifactRenderers`.
   */
  renderers: ArtifactRendererConfig<any>[];
  /** Sidebar nav icon for the category. Omit to fall back to the default. */
  icon?: ReactNode;
}
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
declare function defineArtifactCategories(groups: ArtifactCategoryGroup[]): {
  artifactRenderers: ArtifactRendererConfig<any>[];
  artifactCategories: ArtifactCategory[];
};
//#endregion
//#region src/store/ArtifactCategoriesContext.d.ts
/**
 * Returns the global artifact categories configured on `<ChatProvider>`.
 * Empty array when none were provided.
 *
 * Categories drive the sidebar Artifacts split, the artifact browser's
 * pre-applied filters, and category-grouped workspace sections.
 *
 * @category Hooks
 */
declare const useArtifactCategories: () => ArtifactCategory[];
//#endregion
//#region src/store/ArtifactRenderersContext.d.ts
/**
 * Pre-built lookup structure for artifact-renderer matching.
 *
 * Built once at `ChatProvider` mount from the user-supplied `artifactRenderers`
 * array. Subsequent prop changes are ignored (with a dev-mode warning) so
 * renderer registration stays stable for the lifetime of the provider.
 *
 * @internal
 */
type ArtifactRendererRegistry = {
  /** toolName → renderer. A renderer with several toolNames appears once per name. */byToolName: Map<string, ArtifactRendererConfig<unknown>>; /** artifact type → renderer. Used by the artifact browser to render stored artifacts. */
  byType: Map<string, ArtifactRendererConfig<unknown>>;
};
/** Resolves the renderer matching a tool name, or `null`. @internal */
declare function lookupArtifactRenderer(registry: ArtifactRendererRegistry, toolName: string): ArtifactRendererConfig<unknown> | null;
/** Resolves the renderer matching an artifact type, or `null`. @internal */
declare function lookupArtifactRendererByType(registry: ArtifactRendererRegistry, type: string): ArtifactRendererConfig<unknown> | null;
/** @internal React context holding the renderer registry. Provided by `ChatProvider`. */
declare const ArtifactRenderersContext: _$react.Context<ArtifactRendererRegistry | null>;
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
declare const useArtifactRendererRegistry: () => ArtifactRendererRegistry | null;
//#endregion
//#region src/store/ArtifactStorageContext.d.ts
/**
 * Returns the configured global {@link ArtifactStorage} channel, or `null`
 * when the storage adapter doesn't provide one.
 *
 * Renderer implementations use this to lazily fetch (`get`) or persist
 * (`update`) artifact content; the artifact browser uses it for `list`.
 *
 * @category Hooks
 */
declare const useArtifactStorage: () => ArtifactStorage | null;
//#endregion
//#region src/store/artifactViewId.d.ts
/**
 * Builds the detailed-view id for an artifact version. This is the contract
 * between everything that opens artifact panels (auto-open watcher, workspace
 * rail) and the renderer that registers them — always build/read the id
 * through these helpers, never hand-roll the string.
 */
declare function artifactViewId(id: string, version: number): string;
/**
 * Splits a detailed-view id back into artifact id + version. Returns null
 * when the string isn't an artifact view id (e.g. a useId fallback).
 */
declare function parseArtifactViewId(viewId: string): {
  id: string;
  version: number;
} | null;
//#endregion
//#region src/store/ChatProvider.d.ts
declare const ChatProvider: FC<ChatProviderProps>;
//#endregion
//#region src/store/detailedViewTypes.d.ts
/**
 * Read-only state slice for the detailed-view system.
 *
 * @category Types
 */
type DetailedViewState = {
  /** The currently displayed detailed view, or `null` if the panel is collapsed. */activeDetailedViewId: string | null;
};
/**
 * Actions for managing the active detailed view.
 *
 * @category Types
 */
type DetailedViewActions = {
  /**
   * Sets which detailed view is currently active, or `null` to close the panel.
   * Only one view is active at a time across all kinds (apps, artifacts, custom).
   */
  setActiveDetailedView: (id: string | null) => void;
  /**
   * Resets `activeDetailedViewId` to `null`. Called automatically on thread switch.
   */
  reset: () => void;
};
/**
 * Internal implementation details — not part of the public API.
 *
 * @internal
 */
type DetailedViewInternals = {
  /** @internal */_detailedViewPanelNode: HTMLElement | null; /** @internal */
  _setDetailedViewPanelNode: (node: HTMLElement | null) => void;
};
/** Combined detailed-view store type (state + actions + internals). */
type DetailedViewStore = DetailedViewState & DetailedViewActions & DetailedViewInternals;
//#endregion
//#region src/store/DetailedViewContext.d.ts
/** @internal React context holding the detailed-view Zustand store. Provided by `ChatProvider`. */
declare const DetailedViewContext: _$react.Context<StoreApi<DetailedViewStore> | null>;
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
declare const useDetailedViewStore: () => StoreApi<DetailedViewStore>;
//#endregion
//#region src/store/ThreadContextContext.d.ts
/** @internal React context holding the ThreadContext Zustand store. Provided by `ChatProvider`. */
declare const ThreadContextContext: _$react.Context<StoreApi<ThreadContextStore> | null>;
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
declare const useThreadContextStore: () => StoreApi<ThreadContextStore>;
//#endregion
//#region src/stream/adapters/ag-ui.d.ts
declare const agUIAdapter: () => StreamProtocolAdapter;
//#endregion
//#region src/stream/adapters/eve.d.ts
/**
 * Options for the Eve adapter.
 */
interface EveAdapterOptions {
  /** Called with every raw Eve event before translation (including unmapped types). */
  onEvent?: (event: HandleMessageStreamEvent) => void;
}
declare const EVE_INPUT_REQUESTED_EVENT = "eve.input.requested";
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
declare const eveAdapter: (options?: EveAdapterOptions) => StreamProtocolAdapter;
//#endregion
//#region src/stream/adapters/langgraph.d.ts
/**
 * Options for the LangGraph adapter.
 */
interface LangGraphAdapterOptions {
  /**
   * Called when a LangGraph interrupt is encountered in an `updates` event.
   * The interrupt payload is the value of the `__interrupt__` key.
   */
  onInterrupt?: (interrupt: unknown) => void;
}
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
declare const langGraphAdapter: (options?: LangGraphAdapterOptions) => StreamProtocolAdapter;
//#endregion
//#region src/stream/adapters/openai-completions.d.ts
declare const openAIAdapter: () => StreamProtocolAdapter;
//#endregion
//#region src/stream/adapters/openai-readable-stream.d.ts
/**
 * Adapter for streams produced by the OpenAI SDK's `Stream.toReadableStream()`.
 * That method emits NDJSON (one JSON object per line, no `data: ` SSE prefix),
 * which differs from the raw SSE format that `openAIAdapter` expects.
 */
declare const openAIReadableStreamAdapter: () => StreamProtocolAdapter;
//#endregion
//#region src/stream/adapters/openai-responses.d.ts
declare const openAIResponsesAdapter: () => StreamProtocolAdapter;
//#endregion
//#region src/stream/adapters/vercel-ai-sdk.d.ts
/**
 * Adapter for Vercel AI SDK v6 and v7 UIMessage streams.
 *
 * The AI SDK is loaded only when parsing begins so it can remain an optional
 * peer dependency for consumers that use other stream adapters. Its
 * `DefaultChatTransport` performs the native SSE decoding and chunk validation;
 * this adapter only maps validated UIMessage chunks to AG-UI events.
 */
declare const vercelAIAdapter: () => StreamProtocolAdapter;
//#endregion
//#region src/stream/formats/langgraph-message-format.d.ts
/**
 * LangChain-style message as returned by the LangGraph thread state API.
 * Each message carries a `type` discriminator (`"human"`, `"ai"`, `"tool"`,
 * `"system"`) and uses snake_case field names.
 */
interface LangChainMessage {
  id?: string;
  type: "human" | "ai" | "tool" | "system" | "developer" | (string & {});
  content: string | Array<{
    type: string;
    text?: string;
  }>;
  name?: string;
  tool_calls?: Array<{
    id: string;
    name: string;
    args: Record<string, unknown> | string;
  }>;
  tool_call_id?: string;
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
declare const langGraphMessageFormat: MessageFormat;
//#endregion
//#region src/stream/formats/openai-conversation-message-format.d.ts
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
declare const openAIConversationMessageFormat: MessageFormat;
//#endregion
//#region src/stream/formats/openai-message-format.d.ts
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
declare const openAIMessageFormat: MessageFormat;
//#endregion
//#region src/stream/formats/vercel-ai-message-format.d.ts
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
declare const vercelAIMessageFormat: MessageFormat;
//#endregion
//#region src/stream/processStreamedMessage.d.ts
/**
 * @inline
 */
interface Parameters {
  response: Response;
  /** A function that creates a new message in the thread (assistant or tool). */
  createMessage: (message: Message) => void;
  /** A function that updates an existing message in the thread (matched by id). */
  updateMessage: (message: Message) => void;
  /**
   * Marks a tool call as executing (args closed, awaiting result). Wired to the
   * store's `executingToolCallIds` set so `pairToolActivity` can report the
   * `"executing"` status. Optional — defaults to a no-op for standalone use.
   */
  markToolExecuting?: (toolCallId: string) => void;
  /** Clears a tool call from the executing set (result landed or errored). */
  clearToolExecuting?: (toolCallId: string) => void;
  /** The adapter to use for parsing the stream */
  adapter?: StreamProtocolAdapter;
}
/**
 * @category Utilities
 */
declare const processStreamedMessage: ({
  response,
  createMessage,
  updateMessage,
  markToolExecuting,
  clearToolExecuting,
  adapter
}: Parameters) => Promise<AssistantMessage | void>;
//#endregion
//#region src/adapters/fetchLLM.d.ts
interface FetchLLMOptions {
  /** Endpoint that accepts POST'd messages and returns a streaming Response. */
  url: string;
  /** Stream protocol adapter for parsing the response body (e.g., agUIAdapter, openAIAdapter). */
  streamAdapter: StreamProtocolAdapter;
  /** Wire-format conversion for outgoing messages. Defaults to identity (canonical Message). */
  messageFormat?: MessageFormat;
  /** Extra headers merged into the request. */
  headers?: Record<string, string>;
  /** Override fetch implementation (for tests, custom auth wrappers, etc.). */
  fetch?: typeof fetch;
  /** Extra fields merged into the request body (e.g. `model`) */
  body?: Record<string, unknown>;
}
/**
 * Generic HTTP-based LLM adapter. POSTs an AG-UI `RunAgentInput`-shaped body
 * (`{ threadId, runId, messages, tools, context }`, messages in the chosen wire
 * format) to `url` and returns the streaming `Response` for downstream processing.
 */
declare function fetchLLM({
  url,
  streamAdapter,
  messageFormat,
  headers,
  fetch: customFetch,
  body
}: FetchLLMOptions): ChatLLM;
//#endregion
//#region src/adapters/httpError.d.ts
declare function getResponseErrorMessage(response: Response): Promise<string>;
//#endregion
//#region src/adapters/restStorage.d.ts
interface RestStorageOptions {
  /**
   * Base URL for thread endpoints (the old `threadApiUrl`). The factory hits
   * the same conventions the legacy default used:
   *   - list:   GET    {baseUrl}/get  (·  ?cursor={cursor})
   *   - create: POST   {baseUrl}/create
   *   - get:    GET    {baseUrl}/get/{threadId}
   *   - update: PATCH  {baseUrl}/update/{threadId}
   *   - delete: DELETE {baseUrl}/delete/{threadId}
   */
  baseUrl: string;
  /** Wire-format conversion. Defaults to identity (canonical Message). */
  messageFormat?: MessageFormat;
  /** Extra headers merged into every request. */
  headers?: Record<string, string>;
  /** Override fetch implementation (for tests, custom auth wrappers, etc.). */
  fetch?: typeof fetch;
}
/**
 * Generic REST-based thread storage. Reproduces the conventions the removed
 * `threadApiUrl` prop used, so an existing backend keeps working by swapping
 * `threadApiUrl="/x"` for `storage={restStorage({ baseUrl: "/x" })}`.
 *
 * Only the `thread` channel is implemented. Pair with an `llm` adapter
 * (e.g. `fetchLLM`).
 */
declare function restStorage({
  baseUrl,
  messageFormat,
  headers,
  fetch: customFetch
}: RestStorageOptions): ChatStorage;
//#endregion
export { type AGUIEvent, type ActivityMessage, type Artifact, type ArtifactCategory, type ArtifactCategoryGroup, type ArtifactEntry, type ArtifactListFilter, type ArtifactListParams, type ArtifactRendererConfig, type ArtifactRendererControls, ArtifactRenderersContext, type ArtifactStorage, type ArtifactSummary, type AssistantMessage, type BinaryInputContent, type ChatLLM, ChatProvider, type ChatProviderProps, type ChatStorage, type ChatStore, type CreateMessage, type DetailedViewActions, DetailedViewContext, type DetailedViewState, type DeveloperMessage, EVE_INPUT_REQUESTED_EVENT, type EveAdapterOptions, type EveInputOption, type EveInputRequest, type EveStreamEvent, EventType, type FetchLLMOptions, type FunctionCall, type InputContent, type LangGraphAdapterOptions, type LangChainMessage as LangGraphMessageFormat, type Message, MessageContext, type MessageFormat, MessageProvider, type InvCloudFeatures, type InvCloudOptions, type ParsedArtifact, type ReasoningMessage, type RestStorageOptions, type StreamProtocolAdapter, type SystemMessage, type TextInputContent, type Thread, type ThreadActions, type ThreadContextActions, ThreadContextContext, type ThreadContextState, type ThreadContextStore, type ThreadListActions, type ThreadListState, type ThreadState, type ThreadStorage, type ToolActivity, type ToolCall, type ToolCallStatus, type ToolMessage, type UserMessage, agUIAdapter, artifactViewId, defineArtifactCategories, defineArtifactRenderer, eveAdapter, fetchLLM, getResponseErrorMessage, identityMessageFormat, langGraphAdapter, langGraphMessageFormat, lookupArtifactRenderer, lookupArtifactRendererByType, openAIAdapter, openAIConversationMessageFormat, openAIMessageFormat, openAIReadableStreamAdapter, openAIResponsesAdapter, pairToolActivity, parseArtifactViewId, partialJSONParse, processStreamedMessage, restStorage, useActiveDetailedView, useArtifactCategories, useArtifactList, useArtifactRenderer, useArtifactRendererRegistry, useArtifactStorage, useDetailedView, useDetailedViewPortalTarget, useDetailedViewStore, useMessage, useInvCloudStorage, useThread, useThreadContextStore, useThreadList, useToolActivities, vercelAIAdapter, vercelAIMessageFormat };
//# sourceMappingURL=index.d.mts.map