import { ACTION_STEPS as ACTION_STEPS$1, ActionEvent, ActionEvent as ActionEvent$1, ActionPlan, ActionPlan as ActionPlan$1, ActionStep, BuiltinActionType as BuiltinActionType$1, ComponentGroup, ComponentPromptSpec, ComponentRenderProps, DefinedComponent, ElementNode, EvaluationContext, InferStateFieldValue, Library, LibraryDefinition, McpClientLike, McpClientLike as McpClientLike$1, InvError, InvError as InvError$1, ParseResult, ParseResult as ParseResult$1, ParsedRule, ParsedRule as ParsedRule$1, PromptOptions, PromptSpec, ReactiveAssign, StateField, StateField as StateField$1, SubComponentOf, SystemPromptOptions, SystemPromptSpec, ToolDescriptor, ToolNotFoundError as ToolNotFoundError$1, ToolProvider, ToolSpec, ValidatorFn, builtInValidators, createParser, createStreamingParser as createStreamingParser$1, extractToolResult as extractToolResult$1, generatePrompt, generateSystemPrompt, isReactiveAssign, mergeStatements, parseRules, parseStructuredRules, tagSchemaId, validate as validate$1 } from "@inv/lang-core";
import * as _$react from "react";
import React$1, { ReactNode } from "react";
import { z } from "zod/v4";
import { $ZodObject } from "zod/v4/core";

//#region src/library.d.ts
interface ComponentRenderProps$1<P = Record<string, unknown>> extends ComponentRenderProps<P, ReactNode> {}
type ComponentRenderer<P = Record<string, unknown>> = React.FC<ComponentRenderProps$1<P>>;
type DefinedComponent$1<T extends $ZodObject = $ZodObject> = DefinedComponent<T, ComponentRenderer<z.infer<T>>>;
type Library$1 = Library<ComponentRenderer<any>>;
type LibraryDefinition$1 = LibraryDefinition<ComponentRenderer<any>>;
declare function defineComponent$1<T extends $ZodObject>(config: {
  name: string;
  props: T;
  description: string;
  component: ComponentRenderer<z.infer<T>>;
}): DefinedComponent$1<T>;
declare function createLibrary$1(input: LibraryDefinition$1): Library$1;
//#endregion
//#region src/Renderer.d.ts
interface RendererProps {
  /** Raw response text (inv-lang code). */
  response: string | null;
  /** Component library from createLibrary(). */
  library: Library$1;
  /** Whether the LLM is still streaming (form interactions disabled during streaming). */
  isStreaming?: boolean;
  /** Callback when a component triggers an action. */
  onAction?: (event: ActionEvent) => void;
  /**
   * Called whenever a form field value changes. Receives the raw form state map.
   * The consumer decides how to persist this (e.g. embed in message, store separately).
   */
  onStateUpdate?: (state: Record<string, unknown>) => void;
  /**
   * Initial form state to hydrate on load (e.g. from a previously persisted message).
   * Shape: { formName: { fieldName: { value, componentType } }, $varName: value }
   * $-prefixed keys are treated as reactive bindings, everything else is form state.
   */
  initialState?: Record<string, any>;
  /** Called whenever the parse result changes. */
  onParseResult?: (result: ParseResult | null) => void;
  /**
   * Tool provider for Query()/Mutation() calls.
   * - Function map: `{ tool_name: async (args) => result }` — simplest option
   * - MCP client: any object with `callTool({ name, arguments })` (e.g. from @modelcontextprotocol/sdk)
   */
  toolProvider?: Record<string, (args: Record<string, unknown>) => Promise<unknown>> | McpClientLike | null;
  /** Custom loading indicator shown while queries are fetching. Defaults to a spinner. */
  queryLoader?: React$1.ReactNode;
  /**
   * Called with structured, LLM-friendly errors from the parser and query system.
   * Only includes errors fixable by changing the inv-lang code (unknown components,
   * missing required props, tool-not-found). Suitable for an automated LLM correction loop.
   * Called with [] when all errors are resolved.
   */
  onError?: (errors: InvError[]) => void;
  publishObservability?: boolean;
}
declare function Renderer({
  response,
  library,
  isStreaming,
  onAction,
  onStateUpdate,
  initialState,
  onParseResult,
  toolProvider,
  queryLoader,
  onError,
  publishObservability
}: RendererProps): React$1.JSX.Element | null;
//#endregion
//#region src/context.d.ts
/**
 * Get the renderNode function for rendering nested component values.
 */
declare function useRenderNode(): (value: unknown) => ReactNode;
/**
 * Get the triggerAction function for firing structured action events.
 *
 * @example
 * ```tsx
 * const triggerAction = useTriggerAction();
 * <button onClick={() => triggerAction("Submit", "myForm")}>
 * ```
 */
declare function useTriggerAction(): (userMessage: string, formName?: string, action?: ActionPlan | {
  type?: string;
  params?: Record<string, any>;
}) => void | Promise<void>;
/**
 * Whether the LLM is currently streaming content.
 */
declare function useIsStreaming(): boolean;
/**
 * Whether any Query is currently fetching data.
 * Useful for showing skeleton/loading states in data-driven components.
 */
declare function useIsQueryLoading(): boolean;
/**
 * Get a form field value from the form state context.
 *
 * @example
 * ```tsx
 * const getFieldValue = useGetFieldValue();
 * const name = getFieldValue("contactForm", "name");
 * ```
 */
declare function useGetFieldValue(): (formName: string | undefined, name: string) => any;
/**
 * Get the setFieldValue function for updating form field values.
 *
 * @example
 * ```tsx
 * const setFieldValue = useSetFieldValue();
 * <input onChange={(e) => setFieldValue("contactForm", "Input", "name", e.target.value, false)} />
 * ```
 */
declare function useSetFieldValue(): (formName: string | undefined, componentType: string | undefined, name: string, value: unknown, shouldTriggerSaveCallback?: boolean) => void;
declare const FormNameContext: _$react.Context<string | undefined>;
/**
 * Get the current form name (set by the nearest parent Form component).
 * Returns undefined if not inside a Form.
 */
declare function useFormName(): string | undefined;
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
declare function useSetDefaultValue({
  formName,
  componentType,
  name,
  existingValue,
  defaultValue,
  shouldTriggerSaveCallback
}: {
  formName?: string;
  componentType?: string;
  name: string;
  existingValue: unknown;
  defaultValue: unknown;
  shouldTriggerSaveCallback?: boolean;
}): void;
//#endregion
//#region src/runtime/reactive.d.ts
/**
 * Mark a schema prop as reactive so runtime evaluation can preserve $bindings.
 *
 * The widened return type carries the eventual value shape into helpers like
 * `useStateField()`. The actual bound value is still resolved at render time.
 */
declare function reactive<T extends z.ZodType>(schema: T): z.ZodType<StateField<z.infer<T>>>;
//#endregion
//#region src/hooks/useStateField.d.ts
declare function useStateField<T = unknown>(name: string, value?: T): StateField<InferStateFieldValue<T>>;
//#endregion
//#region src/hooks/useFormValidation.d.ts
interface FormValidationContextValue {
  errors: Record<string, string | undefined>;
  getFieldError: (name: string) => string | undefined;
  validateField: (name: string, value: unknown, rules: ParsedRule[]) => boolean;
  registerField: (name: string, rules: ParsedRule[], getValue: () => unknown) => void;
  unregisterField: (name: string) => void;
  validateForm: () => boolean;
  clearFieldError: (name: string) => void;
}
declare const FormValidationContext: _$react.Context<FormValidationContextValue | null>;
declare function useFormValidation(): FormValidationContextValue | null;
declare function useCreateFormValidation(): FormValidationContextValue;
//#endregion
export { ComponentRenderer as $, parseRules as A, FormNameContext as B, createParser as C, generateSystemPrompt as D, generatePrompt as E, FormValidationContextValue as F, useRenderNode as G, useGetFieldValue as H, useCreateFormValidation as I, useTriggerAction as J, useSetDefaultValue as K, useFormValidation as L, tagSchemaId as M, validate$1 as N, isReactiveAssign as O, FormValidationContext as P, ComponentRenderProps$1 as Q, useStateField as R, builtInValidators as S, extractToolResult$1 as T, useIsQueryLoading as U, useFormName as V, useIsStreaming as W, RendererProps as X, Renderer as Y, ComponentGroup as Z, SystemPromptSpec as _, BuiltinActionType$1 as a, ToolDescriptor as at, ToolSpec as b, EvaluationContext as c, ParseResult$1 as d, DefinedComponent$1 as et, ParsedRule$1 as f, SystemPromptOptions as g, StateField$1 as h, ActionStep as i, SubComponentOf as it, parseStructuredRules as j, mergeStatements as k, McpClientLike$1 as l, ReactiveAssign as m, ActionEvent$1 as n, LibraryDefinition$1 as nt, ComponentPromptSpec as o, createLibrary$1 as ot, PromptSpec as p, useSetFieldValue as q, ActionPlan$1 as r, PromptOptions as rt, ElementNode as s, defineComponent$1 as st, ACTION_STEPS$1 as t, Library$1 as tt, InvError$1 as u, ToolNotFoundError$1 as v, createStreamingParser$1 as w, ValidatorFn as x, ToolProvider as y, reactive as z };
//# sourceMappingURL=exports-CqIWw0ev.d.mts.map