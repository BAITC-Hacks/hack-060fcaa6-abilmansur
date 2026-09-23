import * as z from "zod/v4/core";

//#region src/parser/ast.d.ts
/**
 * Discriminated union representing every value that can appear in an
 * inv-lang expression. The `k` field is the discriminant.
 *
 * Literal & structural nodes:
 * - `Comp`       — a component call: `Header("Hello", "Subtitle")`
 * - `Str`        — a string literal: `"hello"`
 * - `Num`        — a number literal: `42` or `3.14`
 * - `Bool`       — a boolean literal: `true` or `false`
 * - `Null`       — the null literal
 * - `Arr`        — an array: `[a, b, c]`
 * - `Obj`        — an object: `{ key: value }`
 * - `Ref`        — a reference to another statement: `myTable`
 * - `Ph`         — a placeholder for an unresolvable reference
 *
 * Reactive & expression nodes:
 * - `StateRef`   — a reactive state variable reference: `$count`
 * - `RuntimeRef` — a reference resolved at runtime (e.g. Query results)
 * - `BinOp`      — a binary operation: `a + b`, `x == y`
 * - `UnaryOp`    — a unary operation: `!flag`
 * - `Ternary`    — a conditional expression: `cond ? a : b`
 * - `Member`     — dot member access: `obj.field`
 * - `Index`      — bracket index access: `arr[0]`
 * - `Assign`     — state assignment: `$count = $count + 1`
 */
type ASTNode = {
  k: "Comp";
  name: string;
  args: ASTNode[];
  mappedProps?: Record<string, ASTNode>;
} | {
  k: "Str";
  v: string;
} | {
  k: "Num";
  v: number;
} | {
  k: "Bool";
  v: boolean;
} | {
  k: "Null";
} | {
  k: "Arr";
  els: ASTNode[];
} | {
  k: "Obj";
  entries: [string, ASTNode][];
} | {
  k: "Ref";
  n: string;
} | {
  k: "Ph";
  n: string;
} | {
  k: "StateRef";
  n: string;
} | {
  k: "RuntimeRef";
  n: string;
  refType: "query" | "mutation";
} | {
  k: "BinOp";
  op: string;
  left: ASTNode;
  right: ASTNode;
} | {
  k: "UnaryOp";
  op: string;
  operand: ASTNode;
} | {
  k: "Ternary";
  cond: ASTNode;
  then: ASTNode;
  else: ASTNode;
} | {
  k: "Member";
  obj: ASTNode;
  field: string;
} | {
  k: "Index";
  obj: ASTNode;
  index: ASTNode;
} | {
  k: "Assign";
  target: string;
  value: ASTNode;
};
/**
 * Subset of ASTNode that must be preserved for runtime evaluation.
 * These nodes survive parser lowering and are resolved by the evaluator.
 */
type RuntimeExprNode = Extract<ASTNode, {
  k: "StateRef";
} | {
  k: "RuntimeRef";
} | {
  k: "BinOp";
} | {
  k: "UnaryOp";
} | {
  k: "Ternary";
} | {
  k: "Member";
} | {
  k: "Index";
} | {
  k: "Assign";
}>;
/** Type guard for runtime expression nodes that survive parser lowering. */
declare function isRuntimeExpr(node: ASTNode): node is RuntimeExprNode;
/** Check if a value is an AST node (has a valid `k` discriminant field). */
declare function isASTNode(value: unknown): value is ASTNode;
declare function walkAST(node: ASTNode, visit: (node: ASTNode) => void): void;
/** Tool/Query call shape extracted from Comp nodes */
interface CallNode {
  callee: string;
  args: ASTNode[];
}
/** Typed statement — kind known at parse time */
type Statement = {
  kind: "value";
  id: string;
  expr: ASTNode;
} | {
  kind: "state";
  id: string;
  init: ASTNode;
} | {
  kind: "query";
  id: string;
  call: CallNode;
  expr: ASTNode;
  deps?: string[];
} | {
  kind: "mutation";
  id: string;
  call: CallNode;
  expr: ASTNode;
};
//#endregion
//#region src/parser/types.d.ts
type JSONSchemaProperty = Record<string, unknown>;
type JSONSchemaDef = {
  properties?: JSONSchemaProperty;
  required?: string[];
  description?: string;
};
/**
 * The JSON Schema document produced by `library.toJSONSchema()`.
 * All component schemas live in `$defs`, keyed by component name.
 */
interface LibraryJSONSchema {
  $defs?: Record<string, JSONSchemaDef>;
}
interface ParamDef {
  /** Parameter name, e.g. "title", "columns". */
  name: string;
  /** Whether the parameter is required by the component. */
  required: boolean;
  /** Default value from JSON Schema — used when the required field is missing/null. */
  defaultValue?: unknown;
  /** The raw JSON Schema fragment for this param. */
  schema?: unknown;
}
/** Internal parameter map for positional-arg to named-prop mapping. */
type ParamMap = Map<string, {
  params: ParamDef[];
}>;
/**
 * A fully resolved component node from the parser.
 *
 * The parser converts inv-lang text into a tree of these nodes.
 * Each node represents one component invocation with its positional
 * arguments mapped into named `props` via the library's Zod key order.
 */
interface ElementNode {
  type: "element";
  /** Source variable name (e.g. "header" from `header = TextContent(...)`). Undefined for inline components. */
  statementId?: string;
  /** Component name as defined in the library (e.g. "Table", "BarChart"). */
  typeName: string;
  /** Named props produced by positional-to-named mapping in the parser. */
  props: Record<string, unknown>;
  /**
   * True when the parser hasn't received all tokens for this node yet
   * (streaming in progress).
   */
  partial: boolean;
  /**
   * False when all props are static literals — evaluation can be skipped.
   * Undefined is treated as true (dynamic) for backward compatibility.
   */
  hasDynamicProps?: boolean;
}
/**
 * Validation error codes for schema-related issues.
 */
type ValidationErrorCode = "missing-required" | "null-required" | "unknown-component" | "inline-reserved" | "excess-args" | "type-mismatch";
/**
 * A prop validation error. Components with missing required props are
 * dropped from the output tree and errors are recorded here.
 */
interface ValidationError {
  /** Machine-readable error code. */
  code: ValidationErrorCode;
  /** Component type name, e.g. "Header", "BarChart". */
  component: string;
  /** JSON Pointer path within the props object, e.g. "/title", "". */
  path: string;
  /** Human-readable error message. */
  message: string;
  /** Statement name that triggered the error (e.g. "header", "chart"). */
  statementId?: string;
}
/**
 * Error sources across the inv-lang pipeline.
 */
type InvErrorSource = "parser" | "runtime" | "query" | "mutation";
/**
 * Machine-readable error codes for the inv-lang pipeline.
 *
 * - Parser: "unknown-component", "missing-required", "null-required", "inline-reserved",
 *   "parse-exception", "parse-failed"
 * - Runtime: "runtime-error" (prop evaluation), "render-error" (React render)
 * - Query/Mutation: "tool-not-found", "tool-error", "mcp-error"
 */
type InvErrorCode = ValidationErrorCode | "runtime-error" | "render-error" | "parse-exception" | "parse-failed" | "tool-not-found" | "tool-error" | "mcp-error";
/**
 * Structured, LLM-friendly error from the inv-lang pipeline.
 *
 * Designed for an automated correction loop: send these to the LLM so it can
 * generate patches. Only includes errors that are fixable by changing the
 * inv-lang code — transient streaming errors, network failures, and tool
 * execution errors are excluded.
 */
interface InvError {
  /** Where the error originated. */
  source: InvErrorSource;
  /** Machine-readable error code. */
  code: InvErrorCode;
  /** Human/LLM-readable description of what went wrong. */
  message: string;
  /** Statement name (e.g. "header", "metrics") — tells the LLM which statement to patch. */
  statementId?: string;
  /** Component type name (e.g. "BarChart", "Query"). */
  component?: string;
  /** Prop path (e.g. "/title"). */
  path?: string;
  /** Tool name for query/mutation errors (e.g. "get_users", "create_item"). */
  toolName?: string;
  /** Actionable fix context for the LLM (e.g. available components, correct signature). */
  hint?: string;
}
/**
 * Built-in action types for host app events.
 */
declare enum BuiltinActionType {
  ContinueConversation = "continue_conversation",
  OpenUrl = "open_url"
}
/**
 * A single step in an ActionPlan.
 * Step type values match ACTION_STEPS in builtins.ts (single source of truth).
 */
type ActionStep = {
  type: "run";
  statementId: string;
  refType: "query" | "mutation";
} | {
  type: "continue_conversation";
  message: string;
  context?: string;
} | {
  type: "open_url";
  url: string;
} | {
  type: "set";
  target: string;
  valueAST: ASTNode;
} | {
  type: "reset";
  targets: string[];
};
/**
 * An ordered sequence of steps to execute when a button is clicked.
 * Produced by evaluating an Action() expression at runtime.
 */
interface ActionPlan {
  steps: ActionStep[];
}
/**
 * Structured action event fired by interactive components.
 */
interface ActionEvent {
  /** Action type. See `BuiltinActionType` for built-in types. */
  type: BuiltinActionType | (string & {});
  /** Action-specific params (e.g. { url } for OpenUrl, custom params for Custom). */
  params: Record<string, unknown>;
  /** Human-readable label for the action (displayed as user message in chat). */
  humanFriendlyMessage: string;
  /** Raw form state at the time of the action — all field values. */
  formState?: Record<string, unknown>;
  /** The form name that triggered this action, if any. */
  formName?: string;
}
/**
 * Extracted info about a Query() call from the parsed program.
 */
interface QueryStatementInfo {
  /** Statement name that holds this query (e.g. "metrics"). */
  statementId: string;
  /** First arg AST — the tool name (should evaluate to a string). */
  toolAST: ASTNode | null;
  /** Second arg AST — the arguments object (may contain $var refs). */
  argsAST: ASTNode | null;
  /** Third arg AST — default data returned before fetch resolves. */
  defaultsAST: ASTNode | null;
  /** Fourth arg AST — refresh interval in seconds. */
  refreshAST: ASTNode | null;
  /** Pre-computed $variable deps from argsAST (extracted at parse time). */
  deps?: string[];
  /** False while the Query() call is still being streamed. */
  complete: boolean;
}
/**
 * Extracted info about a Mutation() call from the parsed program.
 */
interface MutationStatementInfo {
  /** Statement name that holds this mutation (e.g. "createResult"). */
  statementId: string;
  /** First arg AST — the tool name (should evaluate to a string). */
  toolAST: ASTNode | null;
  /** Second arg AST — the arguments object (may contain $var refs). */
  argsAST: ASTNode | null;
}
/**
 * The output of a single `parser.parse(text)` call.
 *
 * During streaming, each chunk produces a new ParseResult as the
 * accumulated text is re-parsed. The `root` progressively resolves
 * from null → partial tree → complete tree.
 */
interface ParseResult {
  /** The root ElementNode (typically a Root component), or null if parsing hasn't produced one yet. */
  root: ElementNode | null;
  meta: {
    /** True if the parser detected truncated/incomplete input. */incomplete: boolean; /** Names of references used but not yet defined (dropped as null in output). */
    unresolved: string[]; /** Names of value statements defined but not reachable from root. Excludes $state, Query, and Mutation declarations. */
    orphaned: string[]; /** Total number of `identifier = Expression` statements parsed. */
    statementCount: number;
    /**
     * Prop validation errors. Components with missing required props are
     * redacted (dropped as null) and listed here.
     */
    errors: ValidationError[];
  };
  /** $variable declarations — maps "$varName" to its materialized default value. */
  stateDeclarations: Record<string, unknown>;
  /** Extracted Query() calls with their positional args as AST nodes. */
  queryStatements: QueryStatementInfo[];
  /** Extracted Mutation() calls with their positional args as AST nodes. */
  mutationStatements: MutationStatementInfo[];
}
//#endregion
//#region src/parser/prompt.d.ts
/**
 * Tool schema for prompt generation — describes a tool the LLM can use via Query()/Mutation().
 * Shape inspired by MCP's tool schema (name, description, inputSchema, annotations).
 */
interface ToolSpec {
  name: string;
  description?: string;
  inputSchema: Record<string, unknown>;
  outputSchema: Record<string, unknown>;
  annotations?: {
    readOnlyHint?: boolean;
    destructiveHint?: boolean;
  };
}
interface ComponentPromptSpec {
  signature: string;
  description?: string;
}
interface ComponentGroup$1 {
  name: string;
  components: string[];
  notes?: string[];
}
interface BaseSpec {
  id?: string;
  root?: string;
  components: Record<string, ComponentPromptSpec>;
  componentGroups?: ComponentGroup$1[];
}
interface PromptSpec extends BaseSpec {
  tools?: (string | ToolSpec)[];
  editMode?: boolean;
  inlineMode?: boolean;
  /** Enable Query(), Mutation(), @Run, tool workflow. Default: true if tools provided. */
  toolCalls?: boolean;
  /** Enable $variables, @Set, @Reset, interactive filters. Default: true if toolCalls. */
  bindings?: boolean;
  preamble?: string;
  /** General examples (static/layout patterns). Both `examples` and `toolExamples` are included when present. */
  examples?: string[];
  /** Tool-specific examples (Query/Mutation patterns). Both `examples` and `toolExamples` are included when present. */
  toolExamples?: string[];
  additionalRules?: string[];
}
interface LibrarySpec extends BaseSpec {
  schema?: LibraryJSONSchema;
}
/** @deprecated Use {@link generateSystemPrompt}. */
declare function generatePrompt(spec: PromptSpec): string;
/** Prompt options for {@link generateSystemPrompt} */
type SystemPromptOptions = Omit<PromptSpec, keyof BaseSpec>;
/**
 * Prompt options allowed on the Inv Cloud wire. Extra flags (`tools`,
 * `editMode`, …) are stripped — Cloud's built-in prompt assembler ignores them.
 */
type CloudPromptOptions = Pick<SystemPromptOptions, "examples" | "preamble" | "additionalRules">;
/**
 * Object input for {@link generateSystemPrompt}.
 *
 * Pass `cloud: true` to emit Inv Cloud's managed `]]>inv:config` block
 * instead of a locally generated prompt. In that mode `library` is optional —
 * omit it to use Cloud's built-in chat library. `instructions` is Cloud-only
 * extra prose appended after the config block.
 */
type SystemPromptSpec = {
  library: LibrarySpec;
  promptOptions?: SystemPromptOptions;
  cloud?: false;
} | {
  cloud: true;
  library?: LibrarySpec;
  promptOptions?: CloudPromptOptions;
  instructions?: string;
};
/** Render the full system prompt for a library, or Cloud's managed config block when `cloud: true`. */
declare function generateSystemPrompt(spec: SystemPromptSpec): string;
/** @deprecated Pass `{ library, promptOptions }` instead. Removed at the next major. */
declare function generateSystemPrompt(spec: PromptSpec): string;
//#endregion
//#region src/library.d.ts
/**
 * Tag a schema with an ID for prompt signatures.
 * Use for non-component schemas that need friendly type names (e.g. ActionExpression).
 * This affects prompt output only, not JSON Schema $defs.
 */
declare function tagSchemaId(schema: object, id: string): void;
/**
 * Runtime shape of a parsed sub-component element as seen by parent renderers.
 */
type SubComponentOf<P> = {
  type: "element";
  typeName: string;
  props: P;
  partial: boolean;
};
/**
 * The props passed to every component renderer.
 *
 * Framework adapters narrow `RenderNode`:
 * - React:  RenderNode = ReactNode
 * - Svelte: RenderNode = Snippet<[unknown]>
 * - Vue:    RenderNode = VNode
 */
interface ComponentRenderProps<P = Record<string, unknown>, RenderNode = unknown> {
  props: P;
  renderNode: (value: unknown) => RenderNode;
  /** The statement ID from the parsed program (e.g., "header", "prose1"). Undefined for inline components. */
  statementId?: string;
}
/**
 * A fully defined component. The `C` parameter represents the
 * framework-specific component/renderer type. lang-core never
 * inspects this value — it is stored opaquely and consumed
 * by the framework adapter's Renderer.
 */
interface DefinedComponent<T extends z.$ZodObject = z.$ZodObject, C = unknown> {
  name: string;
  props: T;
  description: string;
  component: C;
  /** Use in parent schemas: `z.array(ChildComponent.ref)` */
  ref: z.$ZodType<SubComponentOf<T extends z.$ZodType<infer O> ? O : any>>;
}
/**
 * Define a component with name, schema, description, and renderer.
 * Tags the schema with the component name so it resolves in prompt
 * signatures even if the component isn't in every library.
 */
declare function defineComponent<T extends z.$ZodObject, C>(config: {
  name: string;
  props: T;
  description: string;
  component: C;
}): DefinedComponent<T, C>;
interface ComponentGroup {
  name: string;
  components: string[];
  notes?: string[];
}
/** Tool descriptor for prompt generation — simple string or rich ToolSpec. */
type ToolDescriptor = string | ToolSpec;
interface PromptOptions {
  preamble?: string;
  additionalRules?: string[];
  /** Examples shown when no tools are present (static/layout patterns). */
  examples?: string[];
  /** Examples shown when tools ARE present (Query/Mutation patterns). Takes priority over `examples`. */
  toolExamples?: string[];
  /** Available tools for Query() — string names or rich ToolSpec descriptors injected into the prompt. */
  tools?: ToolDescriptor[];
  /** Enable edit-mode instructions in the prompt. */
  editMode?: boolean;
  /** Enable inline mode — LLM can respond with text + optional inv-lang fenced code. */
  inlineMode?: boolean;
  /** Enable Query(), Mutation(), @Run, tool workflow. Default: true if tools provided. */
  toolCalls?: boolean;
  /** Enable $variables, @Set, @Reset, interactive filters. Default: true if toolCalls. */
  bindings?: boolean;
}
interface FieldInfo {
  name: string;
  isOptional: boolean;
  isArray: boolean;
  typeAnnotation?: string;
}
declare function buildSignature(componentName: string, fields: FieldInfo[]): string;
interface Library<C = unknown> {
  readonly components: Record<string, DefinedComponent<any, C>>;
  readonly componentGroups: ComponentGroup[] | undefined;
  readonly root: string | undefined;
  readonly id: string | undefined;
  /** Instance id minted by `createLibrary()`. Distinct from the optional public `id`. */
  readonly __libraryId: string;
  prompt(options?: PromptOptions): string;
  toSpec(): PromptSpec;
  toJSONSchema(): LibraryJSONSchema;
}
interface LibraryDefinition<C = unknown> {
  components: DefinedComponent<any, C>[];
  componentGroups?: ComponentGroup[];
  root?: string;
  id?: string;
}
/**
 * Create a component library from an array of defined components.
 */
declare function createLibrary<C = unknown>(input: LibraryDefinition<C>): Library<C>;
//#endregion
//#region src/parser/parser.d.ts
/**
 * Parse a complete inv-lang string in one pass.
 *
 * @param input  - Full inv-lang source text (may be partial/streaming)
 * @param cat    - Param map for positional-arg → named-prop mapping
 * @returns      ParseResult with root ElementNode (or null) and metadata
 */
declare function parse(input: string, cat: ParamMap, rootName?: string): ParseResult;
interface StreamParser {
  /** Feed the next SSE/stream chunk and get the latest ParseResult. */
  push(chunk: string): ParseResult;
  /** Set the full text — diffs against internal buffer, pushes only the delta.
   *  Resets automatically if the text was replaced (not appended). */
  set(fullText: string): ParseResult;
  /** Get the latest ParseResult without consuming new data. */
  getResult(): ParseResult;
}
interface Parser {
  parse(input: string): ParseResult;
}
/**
 * Create a parser from a library JSON Schema document.
 * Pass `library.toJSONSchema()` to get the schema.
 *
 * @example
 * ```ts
 * const parser = createParser(library.toJSONSchema());
 * const result = parser.parse(invLangString);
 * ```
 */
declare function createParser(schema: LibraryJSONSchema, rootName?: string): Parser;
/**
 * Create a streaming parser from a library JSON Schema document.
 * Pass `library.toJSONSchema()` to get the schema.
 */
declare function createStreamingParser(schema: LibraryJSONSchema, rootName?: string): StreamParser;
//#endregion
//#region src/parser/enrich-errors.d.ts
/**
 * Convert parser ValidationErrors into enriched InvErrors with hints.
 *
 * Framework-agnostic — usable by React, Svelte, Vue, or standalone.
 *
 * @deprecated ValidationError.message is already humanized and self-sufficient
 * (signatures, available components, expected types are inlined) — read
 * `result.meta.errors` directly. Will be removed in a future major release.
 */
declare function enrichErrors(validationErrors: ValidationError[], schema: LibraryJSONSchema, componentNames: string[]): InvError[];
//#endregion
//#region src/parser/merge.d.ts
/**
 * Merge an existing program with a patch (partial update).
 * Patch statements override existing ones by name.
 * Unreachable statements are automatically garbage-collected.
 * Returns the merged program as a string.
 */
declare function mergeStatements(existing: string, patch: string, rootId?: string): string;
//#endregion
//#region src/parser/serialize.d.ts
interface SerializeOptions {
  /** $variable declarations to include (e.g. from ParseResult.stateDeclarations). */
  stateDeclarations?: Record<string, unknown>;
}
/**
 * Convert an ElementNode tree back to inv-lang source text.
 * Output is compatible with `mergeStatements()` for patching existing programs.
 *
 * @param json - The root ElementNode tree
 * @param library - The component Library (for positional arg ordering)
 * @param options - Optional state declarations
 * @returns inv-lang source text (multiple statements joined by newlines)
 */
declare function jsonToInv(json: ElementNode, library: Library, options?: SerializeOptions): string;
//#endregion
//#region src/parser/builtins.d.ts
/**
 * Shared parser/runtime registry hub for:
 *   - Runtime data builtins (evaluator.ts imports `.fn`)
 *   - Prompt builtin docs (prompt.ts imports `.signature` + `.description`)
 *   - Parser/runtime call classification (`isBuiltin`, action names, reserved calls)
 */
interface BuiltinDef {
  /** PascalCase name matching the inv-lang syntax: Count, Sum, etc. */
  name: string;
  /** Signature for prompt docs: "@Count(array) → number" */
  signature: string;
  /** One-line description for prompt docs */
  description: string;
  /** Runtime implementation */
  fn: (...args: unknown[]) => unknown;
}
declare function toNumber(val: unknown): number;
declare const BUILTINS: Record<string, BuiltinDef>;
/**
 * Lazy builtins — these receive AST nodes (not evaluated values) and
 * control their own evaluation. Handled specially in evaluator.ts.
 */
declare const LAZY_BUILTINS: Set<string>;
/** Maps parser-level action step names → runtime step type values. Single source of truth. */
declare const ACTION_STEPS: {
  readonly Run: "run";
  readonly ToAssistant: "continue_conversation";
  readonly OpenUrl: "open_url";
  readonly Set: "set";
  readonly Reset: "reset";
};
/** All action expression names (steps + the Action container) */
declare const ACTION_NAMES: Set<string>;
/** Set of builtin names for fast lookup (includes action expressions) */
declare const BUILTIN_NAMES: Set<string>;
/** Check if a name is a builtin function (not a component) */
declare function isBuiltin(name: string): boolean;
//#endregion
//#region src/parser/tokens.d.ts
/**
 * Token type discriminant. Uses `const enum` for zero-cost at runtime
 * (TypeScript inlines the numeric values).
 */
declare const enum T {
  Newline = 0,
  LParen = 1,
  // (
  RParen = 2,
  // )
  LBrack = 3,
  // [
  RBrack = 4,
  // ]
  LBrace = 5,
  // {
  RBrace = 6,
  // }
  Comma = 7,
  // ,
  Colon = 8,
  // :
  Equals = 9,
  // =
  True = 10,
  False = 11,
  Null = 12,
  EOF = 13,
  Str = 14,
  // carries string value
  Num = 15,
  // carries numeric value
  Ident = 16,
  // lowercase identifier — becomes a reference
  Type = 17,
  // PascalCase identifier — becomes a component name or reference
  StateVar = 18,
  // $identifier — reactive state reference
  Dot = 19,
  // .
  Plus = 20,
  // +
  Minus = 21,
  // -
  Star = 22,
  // *
  Slash = 23,
  // /
  Percent = 24,
  // %
  EqEq = 25,
  // ==
  NotEq = 26,
  // !=
  Greater = 27,
  // >
  Less = 28,
  // <
  GreaterEq = 29,
  // >=
  LessEq = 30,
  // <=
  And = 31,
  // &&
  Or = 32,
  // ||
  Not = 33,
  // !
  Question = 34,
  // ?
  BuiltinCall = 35
}
type Token = {
  t: T;
  v?: string | number;
};
//#endregion
//#region src/parser/expressions.d.ts
/**
 * Parse a token array into an AST node using a Pratt (top-down operator
 * precedence) parser.
 */
declare function parseExpression(tokens: Token[]): ASTNode;
//#endregion
//#region src/parser/lexer.d.ts
/**
 * Tokenize an inv-lang source string into a flat token array.
 *
 * Handles all token types: identifiers, literals, operators,
 * state variables ($name), dot access, ternary.
 */
declare function tokenize(src: string): Token[];
//#endregion
//#region src/parser/statements.d.ts
interface RawStmt {
  id: string;
  /** Token type of the LHS identifier — used to classify statement kind */
  idTokenType: T;
  tokens: Token[];
}
/**
 * Auto-close unclosed strings and brackets so that partial/streaming input
 * can be parsed without syntax errors.
 */
declare function autoClose(input: string): {
  text: string;
  wasIncomplete: boolean;
};
/**
 * Splits the flat token stream into individual statements.
 *
 * Each statement has the form `identifier = expression`. Statements are
 * separated by newlines at depth 0 (newlines inside brackets are ignored).
 *
 * Accepts `Ident`, `Type`, and `StateVar` as statement identifiers.
 * For StateVar, the id is the full token value including $ (e.g., "$count").
 *
 * Invalid lines (no `=`, or no identifier) are silently skipped.
 */
declare function split(tokens: Token[]): RawStmt[];
//#endregion
//#region src/reactive.d.ts
/** Mark a schema as reactive. Called by framework adapters' reactive() function. */
declare function markReactive(schema: object): void;
/** Check if a schema was marked reactive. Used by Zod introspection for $binding<> prefix. */
declare function isReactiveSchema(schema: unknown): boolean;
//#endregion
//#region src/runtime/evaluator.d.ts
/** Optional schema context for reactive-aware evaluation. */
interface SchemaContext {
  /** Component library — used to look up reactive schemas per prop. */
  library: {
    components: Record<string, {
      props: {
        shape?: Record<string, unknown>;
      };
    }>;
  };
}
interface EvaluationContext {
  /** Read $variable from the store */
  getState(name: string): unknown;
  /** Resolve a reference to another declaration's evaluated value */
  resolveRef(name: string): unknown;
  /** Extra scope for $value injection during reactive prop evaluation */
  extraScope?: Record<string, unknown>;
}
interface ReactiveAssign {
  __reactive: "assign";
  target: string;
  expr: ASTNode;
}
declare function isReactiveAssign(value: unknown): value is ReactiveAssign;
/**
 * Evaluate an AST node to a runtime value.
 */
declare function evaluate(node: ASTNode, context: EvaluationContext, schemaCtx?: SchemaContext): unknown;
/**
 * Strip a ReactiveAssign to its current value in a non-reactive context.
 * When transport args or non-reactive props contain a ReactiveAssign, this
 * resolves it to the current state value (or null if getState is unavailable).
 */
declare function stripReactiveAssign(value: unknown, context: EvaluationContext): unknown;
//#endregion
//#region src/runtime/store.d.ts
interface Store {
  get(name: string): unknown;
  set(name: string, value: unknown): void;
  subscribe(listener: () => void): () => void;
  getSnapshot(): Record<string, unknown>;
  initialize(defaults: Record<string, unknown>, persisted: Record<string, unknown>): void;
  dispose(): void;
}
declare function createStore(): Store;
//#endregion
//#region src/runtime/evaluate-tree.d.ts
/** Context passed through the evaluation chain — no module-level state. */
interface EvalContext {
  /** AST evaluation context (getState, resolveRef) */
  ctx: EvaluationContext;
  /** Component library for reactive schema lookup */
  library: Library;
  /** Reactive binding store (null in v1 mode) */
  store: Store | null;
  /** Runtime errors collected during prop evaluation (optional — populated by evaluateElementProps). */
  errors?: InvError[];
}
/**
 * Evaluate all AST nodes in an ElementNode tree's props.
 * Returns a new ElementNode with all props resolved to concrete values.
 *
 * Uses the unified evaluator with schema context for reactive-aware evaluation.
 */
declare function evaluateElementProps(el: ElementNode, evalCtx: EvalContext): ElementNode;
//#endregion
//#region src/runtime/mcp.d.ts
/**
 * MCP utilities — type definitions and result extraction for MCP client integration.
 *
 * The Renderer accepts an MCP client directly as `toolProvider`.
 * It detects the MCP client shape (has `callTool({ name, arguments })`) and
 * wraps responses with `extractToolResult` automatically.
 *
 * @example
 * ```tsx
 * import { Client } from "@modelcontextprotocol/sdk/client/index.js";
 * import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";
 *
 * const client = new Client({ name: "my-app", version: "1.0.0" });
 * await client.connect(new StreamableHTTPClientTransport(new URL("/api/mcp")));
 *
 * // Pass directly — Renderer handles MCP response extraction
 * <Renderer toolProvider={client} library={library} response={content} />
 * ```
 */
/**
 * Error thrown when an MCP tool call returns `isError: true`.
 * Preserves the raw error content from the MCP response for structured handling.
 */
declare class McpToolError extends Error {
  readonly toolErrorText: string;
  constructor(errorText: string);
}
/**
 * Minimal shape of an MCP Client — matches @modelcontextprotocol/sdk Client
 * without requiring it as a hard import. Users can pass any object that
 * implements these methods.
 */
interface McpClientLike {
  callTool(params: {
    name: string;
    arguments?: Record<string, unknown>;
  }, options?: unknown): Promise<{
    content: Array<{
      type: string;
      text?: string;
      [key: string]: unknown;
    }>;
    structuredContent?: unknown;
    isError?: boolean;
  }>;
  close?(): Promise<void>;
}
/**
 * Extract the actual data from an MCP callTool result.
 * Prefers structuredContent (machine-readable JSON), falls back to parsing text content.
 */
declare function extractToolResult(result: {
  content: Array<{
    type: string;
    text?: string;
    [key: string]: unknown;
  }>;
  structuredContent?: unknown;
  isError?: boolean;
}): unknown;
//#endregion
//#region src/runtime/queryManager.d.ts
/**
 * ToolProvider interface for Query() and Mutation() tool calls.
 * Framework-agnostic — works with MCP, REST, GraphQL, or any backend.
 *
 * @example
 * ```ts
 * // Function map (Renderer normalizes this automatically)
 * <Renderer toolProvider={{
 *   get_users: (args) => fetch(`/api/users`).then(r => r.json()),
 * }} />
 *
 * // MCP client (Renderer wraps extractToolResult automatically)
 * <Renderer toolProvider={mcpClient} />
 * ```
 */
interface ToolProvider {
  callTool(toolName: string, args: Record<string, unknown>): Promise<unknown>;
}
interface QueryNode {
  statementId: string;
  toolName: string;
  args: unknown;
  defaults: unknown;
  /** Evaluated dependency value — included in cache key to force re-fetch on change. */
  deps: unknown;
  /** Auto-refresh interval in seconds. */
  refreshInterval?: number;
  complete: boolean;
}
interface MutationNode {
  statementId: string;
  toolName: string;
}
interface MutationResult {
  status: "idle" | "loading" | "success" | "error";
  data?: unknown;
  error?: unknown;
}
interface QuerySnapshot extends Record<string, unknown> {
  __inv_loading: string[];
  __inv_refetching: string[];
  __inv_errors: InvError[];
}
interface QueryManager {
  evaluateQueries(queryNodes: QueryNode[]): void;
  getResult(statementId: string): unknown;
  isLoading(statementId: string): boolean;
  isAnyLoading(): boolean;
  invalidate(statementIds?: string[]): void;
  registerMutations(nodes: MutationNode[]): void;
  fireMutation(statementId: string, evaluatedArgs: Record<string, unknown>, refreshQueryIds?: string[]): Promise<boolean>;
  getMutationResult(statementId: string): MutationResult | null;
  subscribe(listener: () => void): () => void;
  getSnapshot(): QuerySnapshot;
  activate(): void;
  dispose(): void;
}
declare function createQueryManager(toolProvider: ToolProvider | null): QueryManager;
//#endregion
//#region src/runtime/state-field.d.ts
interface StateField<T = unknown> {
  name: string;
  value: T;
  setValue: (newValue: T) => void;
  isReactive: boolean;
}
type InferStateFieldValue<T> = T extends StateField<infer U> ? U : T;
declare function resolveStateField<T = unknown>(name: string, bindingValue: unknown, store: Store | null, evaluationContext: EvaluationContext | null, fieldGetter: (fieldName: string) => unknown, fieldSetter: (fieldName: string, value: unknown) => void): StateField<T>;
//#endregion
//#region src/runtime/toolProvider.d.ts
/**
 * Standard error thrown when a tool name is not found in a function-map ToolProvider.
 * Used by Renderer's inline normalization to give clear error messages.
 */
declare class ToolNotFoundError extends Error {
  readonly toolName: string;
  readonly availableTools: string[];
  constructor(toolName: string, availableTools?: string[]);
}
//#endregion
//#region src/utils/validation.d.ts
interface ParsedRule {
  type: string;
  arg?: number | string;
}
declare function parseRules(rules: unknown): ParsedRule[];
type ValidatorFn = (value: unknown, arg?: number | string) => string | undefined;
declare const builtInValidators: Record<string, ValidatorFn>;
/**
 * Run all rules against a value. Stop on first error.
 * Custom validators are checked first, then built-in ones.
 */
declare function validate(value: unknown, rules: ParsedRule[], customValidators?: Record<string, ValidatorFn>): string | undefined;
/**
 * Parse a structured rules object into ParsedRule[].
 * Accepts: { required: true, minLength: 5, email: true, max: 100 }
 * Skips keys with false/undefined values.
 */
declare function parseStructuredRules(rules: unknown): ParsedRule[];
//#endregion
export { ACTION_NAMES, ACTION_STEPS, type ASTNode, type ActionEvent, type ActionPlan, type ActionStep, BUILTINS, BUILTIN_NAMES, BuiltinActionType, type BuiltinDef, type CallNode, type CloudPromptOptions, type ComponentGroup, type ComponentPromptSpec, type ComponentRenderProps, type DefinedComponent, type ElementNode, type EvalContext, type EvaluationContext, type InferStateFieldValue, LAZY_BUILTINS, type Library, type LibraryDefinition, type LibraryJSONSchema, type LibrarySpec, type McpClientLike, McpToolError, type MutationNode, type MutationResult, type MutationStatementInfo, type InvError, type InvErrorCode, type InvErrorSource, type ParseResult, type ParsedRule, type Parser, type PromptOptions, type PromptSpec, type QueryManager, type QueryNode, type QuerySnapshot, type QueryStatementInfo, type ReactiveAssign, type RuntimeExprNode, type SerializeOptions, type StateField, type Statement, type Store, type StreamParser, type SubComponentOf, type SystemPromptOptions, type SystemPromptSpec, type Token, type ToolDescriptor, ToolNotFoundError, type ToolProvider, type ToolSpec, type ValidationError, type ValidationErrorCode, type ValidatorFn, autoClose, buildSignature, builtInValidators, createLibrary, createParser, createQueryManager, createStore, createStreamingParser, defineComponent, enrichErrors, evaluate, evaluateElementProps, extractToolResult, generatePrompt, generateSystemPrompt, isASTNode, isBuiltin, isReactiveAssign, isReactiveSchema, isRuntimeExpr, jsonToInv, markReactive, mergeStatements, parse, parseExpression, parseRules, parseStructuredRules, resolveStateField, split, stripReactiveAssign, tagSchemaId, toNumber, tokenize, validate, walkAST };
//# sourceMappingURL=index.d.cts.map