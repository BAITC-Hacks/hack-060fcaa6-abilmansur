import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { SquareCode } from "lucide-react";
import * as _$react from "react";
import React$1, { ButtonHTMLAttributes, CSSProperties, ComponentPropsWithoutRef, ComponentType, FC, HTMLAttributes, Key, ReactElement, ReactNode } from "react";
import { Artifact, ArtifactCategory, ArtifactListParams, ArtifactRendererConfig, ArtifactRendererConfig as ArtifactRendererConfig$1, ArtifactRendererControls, ArtifactStorage, ArtifactSummary, AssistantMessage, ChatLLM, ChatProviderProps, ChatStorage, FetchLLMOptions, Message, RestStorageOptions, ThreadStorage, ToolActivity, ToolActivity as ToolActivity$1, ToolCall as ToolCall$1, ToolCallStatus, ToolCallStatus as ToolCallStatus$1, ToolMessage, UserMessage, defineArtifactRenderer, fetchLLM, pairToolActivity, partialJSONParse, restStorage, useActiveDetailedView, useDetailedView, useToolActivities } from "@inv/headless";
import * as _$_invdev_react_lang0 from "@inv/lang";
import { ComponentGroup, Library, PromptOptions } from "@inv/lang";
import { Options } from "react-markdown";
import * as _$react_day_picker0 from "react-day-picker";
import { DateRange, DayPicker } from "react-day-picker";
import * as SelectPrimitive from "@radix-ui/react-select";
import * as RadixSeparator from "@radix-ui/react-separator";
import { z } from "zod/v4";
import * as LabelPrimitive from "@radix-ui/react-label";
import * as Radio from "@radix-ui/react-radio-group";
import * as SliderPrimitive from "@radix-ui/react-slider";
import * as TabsPrimitive from "@radix-ui/react-tabs";
export * from "@inv/headless";

//#region src/components/Accordion/Accordion.d.ts
type AccordionVariant = "clear" | "card" | "sunk";
type AccordionProps = (AccordionPrimitive.AccordionSingleProps | AccordionPrimitive.AccordionMultipleProps) & {
  variant?: AccordionVariant;
};
declare const Accordion: React$1.ForwardRefExoticComponent<AccordionProps & React$1.RefAttributes<HTMLDivElement>>;
interface AccordionItemProps extends React$1.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item> {
  className?: string;
  style?: React$1.CSSProperties;
  value: string;
}
declare const AccordionItem: React$1.ForwardRefExoticComponent<AccordionItemProps & React$1.RefAttributes<HTMLDivElement>>;
interface AccordionTriggerProps extends React$1.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> {
  className?: string;
  style?: React$1.CSSProperties;
  icon?: React$1.ReactNode;
  text: React$1.ReactNode;
}
declare const AccordionTrigger: React$1.ForwardRefExoticComponent<AccordionTriggerProps & React$1.RefAttributes<HTMLButtonElement>>;
interface AccordionContentProps extends React$1.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content> {
  className?: string;
  style?: React$1.CSSProperties;
  children?: React$1.ReactNode;
}
declare const AccordionContent: React$1.ForwardRefExoticComponent<AccordionContentProps & React$1.RefAttributes<HTMLDivElement>>;
//#endregion
//#region src/components/AgentInterface/_shared/artifactPaths.d.ts
declare const artifactListPath: (categoryName?: string) => string;
declare const artifactViewPath: (categoryName: string | undefined, artifactId: string) => string;
//#endregion
//#region src/components/AgentInterface/_shared/labelsContext.d.ts
/** Per-tab labels for the per-thread Workspace rail. */
interface WorkspaceTabLabels {
  all?: string;
  artifacts?: string;
  apps?: string;
}
/**
 * Consumer-overridable display strings for the artifact browser + workspace.
 * Every field is optional; omitted values fall back to the English defaults.
 * Pass via `<AgentInterface labels={...}>`.
 */
interface AgentInterfaceLabels {
  /**
   * Fallback title/nav label for the artifact browser when no category is
   * configured (a configured category always uses its own `name`). Default
   * `"Artifacts"`.
   */
  defaultCategory?: string;
  /** Title for the workspace rail and its toggle tooltip. Default `"Thread workspace"`. */
  workspaceToggle?: string;
  /** Labels for the workspace rail tabs. Defaults: `All` / `Artifacts` / `Apps`. */
  tabs?: WorkspaceTabLabels;
}
//#endregion
//#region src/components/AgentInterface/_shared/navContext.d.ts
interface NavContextValue {
  /** Current path. `undefined` means the thread region is active (no Route matched). */
  path: string | undefined;
  /** Switch path. Pass `undefined` to clear and return to the thread view. */
  navigate: (next: string | undefined) => void;
}
/**
 * Read the current navigation state from inside <AgentInterface>.
 *
 * Returns `{ path, navigate }`. Call `navigate(undefined)` to return to the
 * thread view (clears any active route).
 */
declare const useNav: () => NavContextValue;
//#endregion
//#region src/components/ToolCall/BehindTheScenes.d.ts
interface BehindTheScenesProps {
  /** True while the overall message is still streaming */
  isStreaming?: boolean;
  /** True once all tool calls have received their arguments back */
  toolCallsComplete?: boolean;
  children: React.ReactNode;
}
declare const BehindTheScenes: ({
  isStreaming,
  toolCallsComplete,
  children
}: BehindTheScenesProps) => _$react.JSX.Element;
//#endregion
//#region src/components/ToolCall/ToolCall.d.ts
interface ToolCallProps {
  toolCall: ToolCall$1;
  isStreaming?: boolean;
  /** True once tool work is done (e.g. text content has started rendering) */
  toolsDone?: boolean;
  isLast?: boolean;
  className?: string;
}
declare const ToolCallComponent: ({
  toolCall,
  isStreaming,
  toolsDone,
  isLast,
  className
}: ToolCallProps) => _$react.JSX.Element;
//#endregion
//#region src/components/ToolCall/DefaultToolCard.d.ts
/**
 * Batteries-included default tool card — the chevron-header composition of the
 * compound {@link ToolCall} parts. Status comes from the data, the collapsible
 * is aria-correct, and it's memoized. Used by `<ToolCallEntry>` for flat
 * (non-timeline) threads, sidebars, debug panels, etc.
 *
 * @category Components
 */
declare const DefaultToolCard: _$react.NamedExoticComponent<{
  activity: ToolActivity$1;
  isLast: boolean; /** Whether the owning thread is still running — gates the running spin/shimmer. */
  isRunning?: boolean;
}>;
//#endregion
//#region src/components/ToolCall/SourceIcon.d.ts
/**
 * Favicon for a web-search source, falling back to a globe glyph when the image
 * is missing, fails to load, or resolves to a default 16×16 placeholder.
 *
 * @category Components
 */
declare const SourceIcon: ({
  src
}: {
  src?: string;
}) => _$react.JSX.Element;
//#endregion
//#region src/components/ToolCall/TimelineToolCard.d.ts
/**
 * Timeline-shaped composition of the compound {@link ToolCall} parts: one row —
 * tool glyph, status label, chevron — that expands into either the result's
 * sources or a SINGLE block holding the request and the response together. The
 * running affordances (glyph blink, label shimmer) are
 * `(streaming|executing) && isLast`, derived from the lifecycle status rather
 * than a separate `isThinking` flag. `ToolCall.Root` is the single
 * `.inv-tool-call` container, so we compose *inside* it.
 *
 * @category Components
 */
declare const TimelineToolCard: _$react.NamedExoticComponent<{
  activity: ToolActivity$1;
  isLast: boolean;
  /** Whether the owning thread is still running — gates the running shimmer/spin
   *  so a closed-args call with no result doesn't animate forever after the run ends. */
  isRunning?: boolean;
}>;
//#endregion
//#region src/components/ToolCall/ToolCallPrimitives.d.ts
/**
 * Compound, reusable building blocks for rendering one tool call + its result.
 *
 * `ToolCall.Root` holds the typed {@link ToolActivity} and expand state in
 * context; the thin parts read it and expose typed `data-*` / `aria` attributes
 * plus a `render` escape hatch (Base-UI / Radix style) so a consumer can swap
 * the element or markup per place. The batteries-included `DefaultToolCard` /
 * `TimelineToolCard` are just two compositions of these parts — drop them into a
 * sidebar, a compact chip, or a debug panel and reuse the typed state without
 * re-deriving anything.
 *
 * @category Components
 */
interface ToolCallContextValue {
  activity: ToolActivity$1;
  isLast: boolean;
  /**
   * Whether the owning thread is still running. The in-progress affordances
   * (icon spin, name shimmer) require this so a tool call that closed its args
   * but never received a result does NOT animate forever after the run ends.
   * Defaults to `true` for standalone (thread-less) primitive use.
   */
  running: boolean;
  isOpen: boolean;
  setOpen: (value: boolean) => void;
  panelId: string;
  /** Stable id on the rendered Trigger button; names the Content region. */
  triggerId: string;
}
/** Reads the nearest {@link ToolCall.Root} context. @category Hooks */
declare function useToolCall(): ToolCallContextValue;
type RenderProp<State, Props> = (state: State, props: Props) => ReactNode;
/** Default human label for a status + tool name. @category Functions */
declare function defaultLabel(status: ToolCallStatus$1, name: string): string;
/** Pretty-prints a JSON result string, falling back to the raw string. @category Functions */
declare function prettyResult(value?: string): string;
declare function toolIcon(toolName: string, status: ToolCallStatus$1): typeof SquareCode;
interface PartProps<State> {
  render?: RenderProp<State, Record<string, unknown>>;
  className?: string;
  children?: ReactNode;
}
declare function Root({
  activity,
  isLast,
  running,
  defaultOpen,
  className,
  children
}: {
  activity: ToolActivity$1;
  isLast?: boolean; /** Whether the owning thread is still running (gates the in-progress animations). */
  running?: boolean;
  defaultOpen?: boolean;
  className?: string;
  children: ReactNode;
}): _$react.JSX.Element;
/**
 * The compound tool-call primitive set. Compose `Root` + parts to render a tool
 * call however a given surface needs.
 *
 * @category Components
 */
declare const ToolCall: {
  Root: typeof Root;
  Trigger: ({
    render,
    className,
    children
  }: PartProps<{
    state: "open" | "closed";
  }>) => ReactNode;
  Content: ({
    render,
    className,
    children
  }: PartProps<{
    isOpen: boolean;
  }>) => ReactNode;
  StatusIcon: ({
    render,
    className
  }: PartProps<{
    status: ToolCallStatus$1;
  }>) => ReactNode;
  StatusText: ({
    render,
    className
  }: PartProps<{
    status: ToolCallStatus$1;
    label: string;
  }>) => ReactNode;
  ToolName: ({
    render,
    className
  }: PartProps<{
    toolName: string;
  }>) => ReactNode;
  Parameters: ({
    render,
    className
  }: PartProps<{
    input: unknown;
    inputString: string;
  }>) => ReactNode;
  Result: ({
    render,
    className
  }: PartProps<{
    result?: string;
    isError: boolean;
    errorText?: string;
  }>) => ReactNode;
};
//#endregion
//#region src/components/_shared/tool-renderer/ToolActivityRenderer.d.ts
/**
 * The subset of `DetailedViewPanel` props the renderer needs. Lets a thread
 * family inject its own panel (the AgentInterface panel differs from the shared
 * one only in its close button) so one renderer module serves all of them.
 *
 * @category Types
 */
type ToolDetailedViewPanel = ComponentType<{
  viewId: string;
  title?: string;
  children: ReactNode;
}>;
/**
 * Renders a matched artifact renderer for a single {@link ToolActivity}.
 *
 * Lifecycle mirrors the previous `RendererInstance`: run the renderer, register
 * the entry in ThreadContext when `meta` is non-null, and render
 * `preview(props, controls)` inline + `<DetailedViewPanel>` for the side panel.
 * The renderer is wrapped in try/catch — a throw renders an inline fallback
 * instead of blanking the thread.
 *
 * @internal
 */
declare function ToolActivityRenderer<Props>({
  renderer,
  activity,
  detailedViewPanel: DetailedViewPanel,
  fallback
}: {
  renderer: ArtifactRendererConfig$1<Props>;
  activity: ToolActivity$1;
  detailedViewPanel?: ToolDetailedViewPanel;
  /** Rendered when the matched renderer's parse/parser returns `null` (skips) —
   *  lets the caller show a default card instead of nothing. */
  fallback?: ReactNode;
}): _$react.JSX.Element;
//#endregion
//#region src/components/ToolCall/ToolCallTimeline.d.ts
/**
 * One display row of the timeline: a tool activity, or a thinking-text step
 * (prose the model emitted alongside its tool calls), in run order.
 */
type TimelineStep = {
  type: "text";
  id: string;
  text: string;
} | {
  type: "activity";
  activity: ToolActivity$1;
};
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
declare function ToolCallTimeline({
  activities,
  steps,
  isLast,
  detailedViewPanel,
  forceDefault,
  awaitingResponse
}: {
  activities: ToolActivity$1[]; /** Ordered display rows interleaving thinking text with tool activities */
  steps?: TimelineStep[];
  isLast?: boolean;
  detailedViewPanel?: ToolDetailedViewPanel;
  /** Render every row as the raw default card (e.g. so matched tools' raw
   *  request/response stay inspectable here while their rich preview renders elsewhere). */
  forceDefault?: boolean;
  /** Hold the compact "Working…" tray open across the tool-result → first-token
   *  gap instead of collapsing the instant the last result lands. */
  awaitingResponse?: boolean;
}): _$react.JSX.Element | null;
//#endregion
//#region src/components/ToolCall/toolSources.d.ts
/**
 * Extraction of link "sources" from tool RESULT text, powering the
 * favicon + title rows on tool cards.
 */
interface ToolResultSource {
  title: string;
  url: string;
  /** Domain used for the favicon lookup (e.g. `en.wikipedia.org`). */
  host: string;
  /** Human-ish site name derived from the host (e.g. `Wikipedia`). */
  siteName: string;
}
/**
 * Link sources of a tool result, deduped by URL. `[]` when no extractor
 * claims the tool or nothing in the result parses.
 */
declare function extractToolSources(toolName: string, result: string): ToolResultSource[];
//#endregion
//#region src/components/AgentInterface/_shared/types/index.d.ts
/**
 * Custom component for rendering assistant messages.
 * When provided, replaces the default assistant message rendering entirely
 * (including the container with avatar).
 *
 * @example
 * const MyAssistantMessage: AssistantMessageComponent = ({ message }) => (
 *   <div className="my-assistant-message">
 *     <ReactMarkdown>{message.content ?? ""}</ReactMarkdown>
 *   </div>
 * );
 */
type AssistantMessageComponent$1 = React.ComponentType<{
  message: AssistantMessage;
  isStreaming: boolean;
}>;
/**
 * Custom component for rendering user messages.
 * When provided, replaces the default user message rendering entirely
 * (including the container).
 *
 * @example
 * const MyUserMessage: UserMessageComponent = ({ message }) => (
 *   <div className="my-user-message">
 *     {typeof message.content === "string" ? message.content : "..."}
 *   </div>
 * );
 */
type UserMessageComponent$1 = React.ComponentType<{
  message: UserMessage;
}>;
/**
 * Custom component for rendering the tool activity timeline for one assistant turn.
 * When provided, replaces the default timeline while tools are running and after
 * the assistant answer arrives.
 */
type ToolCallTimelineComponent = React.ComponentType<{
  activities: ToolActivity$1[];
  steps: TimelineStep[];
  isLast: boolean;
  awaitingResponse: boolean;
}>;
//#endregion
//#region src/hooks/useScrollToBottom.d.ts
type ScrollVariant = "always" | "once" | "user-message-anchor";
//#endregion
//#region src/types/ConversationStarter.d.ts
/**
 * Icon type for conversation starters
 * - undefined: Show default lightbulb icon
 * - ReactNode: Show the provided icon (use <></> or React.Fragment for no icon)
 */
type ConversationStarterIcon = ReactNode;
interface ConversationStarterProps {
  displayText: string;
  prompt: string;
  /**
   * Optional icon to display
   * - If not provided (undefined): shows default lightbulb icon
   * - If provided: shows the provided React element
   * - For no icon: pass an empty fragment (<></> or React.Fragment)
   */
  icon?: ConversationStarterIcon;
}
//#endregion
//#region src/components/ThemeProvider/types.d.ts
/** The active color scheme — determines which set of default tokens is used. */
type ThemeMode = "light" | "dark";
/**
 * Optional color arrays used by chart components.
 * Each palette overrides the default for its specific chart type.
 *
 * Single source of truth for palette keys: the `ChartColorPalette` type is
 * derived from this array and the runtime theme-key validators consume it,
 * so a new palette is added in exactly one place.
 */
declare const CHART_PALETTE_KEYS: readonly ["defaultChartPalette", "barChartPalette", "lineChartPalette", "areaChartPalette", "pieChartPalette", "radarChartPalette", "radialChartPalette", "horizontalBarChartPalette"];
type ChartPaletteKey = (typeof CHART_PALETTE_KEYS)[number];
type ChartColorPalette = { [K in ChartPaletteKey]?: string[] };
/**
 * Color-related design tokens: surfaces, text, interactive states, borders,
 * and chat UI colors. All values are `oklch()` strings.
 *
 * Derived from `defaultTheme.ts` via the swatch system; every property is
 * optional so consumers can override individual tokens.
 */
interface ColorTheme extends ChartColorPalette {
  background?: string;
  foreground?: string;
  popoverBackground?: string;
  sunkLight?: string;
  sunk?: string;
  sunkDeep?: string;
  elevatedLight?: string;
  elevated?: string;
  elevatedStrong?: string;
  elevatedIntense?: string;
  overlay?: string;
  highlightSubtle?: string;
  highlight?: string;
  highlightStrong?: string;
  highlightIntense?: string;
  invertedBackground?: string;
  infoBackground?: string;
  successBackground?: string;
  alertBackground?: string;
  dangerBackground?: string;
  purpleBackground?: string;
  pinkBackground?: string;
  textNeutralPrimary?: string;
  textNeutralSecondary?: string;
  textNeutralTertiary?: string;
  textNeutralLink?: string;
  textBrand?: string;
  textWhite?: string;
  textBlack?: string;
  textAccentPrimary?: string;
  textAccentSecondary?: string;
  textAccentTertiary?: string;
  textSuccessPrimary?: string;
  textSuccessInverted?: string;
  textAlertPrimary?: string;
  textAlertInverted?: string;
  textDangerPrimary?: string;
  textDangerSecondary?: string;
  textDangerTertiary?: string;
  textDangerInvertedPrimary?: string;
  textDangerInvertedSecondary?: string;
  textDangerInvertedTertiary?: string;
  textInfoPrimary?: string;
  textInfoInverted?: string;
  textPinkPrimary?: string;
  textPinkInverted?: string;
  textPurplePrimary?: string;
  textPurpleInverted?: string;
  interactiveAccentDefault?: string;
  interactiveAccentHover?: string;
  interactiveAccentDisabled?: string;
  interactiveAccentPressed?: string;
  interactiveDestructiveDefault?: string;
  interactiveDestructiveHover?: string;
  interactiveDestructiveDisabled?: string;
  interactiveDestructivePressed?: string;
  interactiveDestructiveAccentDefault?: string;
  interactiveDestructiveAccentHover?: string;
  interactiveDestructiveAccentPressed?: string;
  interactiveDestructiveAccentDisabled?: string;
  borderDefault?: string;
  borderInteractive?: string;
  borderInteractiveEmphasis?: string;
  borderInteractiveSelected?: string;
  borderAccent?: string;
  borderAccentEmphasis?: string;
  borderAccentSelected?: string;
  borderInfo?: string;
  borderInfoEmphasis?: string;
  borderAlert?: string;
  borderAlertEmphasis?: string;
  borderSuccess?: string;
  borderSuccessEmphasis?: string;
  borderDanger?: string;
  borderDangerEmphasis?: string;
  chatUserResponseBg?: string;
  chatUserResponseText?: string;
}
/**
 * Layout tokens: spacing scale and border-radius scale.
 * Values are pixel strings (e.g. `"12px"`, `"9999px"`).
 */
interface LayoutTheme {
  space000?: string;
  space3xs?: string;
  space2xs?: string;
  spaceXs?: string;
  spaceS?: string;
  spaceSM?: string;
  spaceM?: string;
  spaceML?: string;
  spaceL?: string;
  spaceXl?: string;
  space2xl?: string;
  space3xl?: string;
  radiusNone?: string;
  radius3xs?: string;
  radius2xs?: string;
  radiusXs?: string;
  radiusS?: string;
  radiusM?: string;
  radiusL?: string;
  radiusXl?: string;
  radius2xl?: string;
  radius3xl?: string;
  radius4xl?: string;
  radius5xl?: string;
  radius6xl?: string;
  radius7xl?: string;
  radius8xl?: string;
  radius9xl?: string;
  radiusFull?: string;
}
/**
 * Typography tokens: font families, sizes, weights, line heights, letter
 * spacing, and compound shorthand `font:` values for every text style.
 */
interface TypographyTheme {
  fontBody?: string;
  fontCode?: string;
  fontHeading?: string;
  fontLabel?: string;
  fontNumbers?: string;
  fontSize2xs?: string;
  fontSizeXs?: string;
  fontSizeSm?: string;
  fontSizeMd?: string;
  fontSizeLg?: string;
  fontSizeXl?: string;
  fontSize2xl?: string;
  fontSize3xl?: string;
  fontSize4xl?: string;
  fontSize5xl?: string;
  fontWeightRegular?: string;
  fontWeightMedium?: string;
  fontWeightBold?: string;
  fontWeightHeavy?: string;
  lineHeightBody?: string;
  lineHeightHeading?: string;
  lineHeightHeadingLarge?: string;
  lineHeightLabel?: string;
  lineHeightCode?: string;
  letterSpacingNormal?: string;
  letterSpacingTight?: string;
  letterSpacingTighter?: string;
  textBodyXs?: string;
  textBodyXsLetterSpacing?: string;
  textBodyXsHeavy?: string;
  textBodyXsHeavyLetterSpacing?: string;
  textBodySm?: string;
  textBodySmLetterSpacing?: string;
  textBodySmHeavy?: string;
  textBodySmHeavyLetterSpacing?: string;
  textBodyDefault?: string;
  textBodyDefaultLetterSpacing?: string;
  textBodyDefaultHeavy?: string;
  textBodyDefaultHeavyLetterSpacing?: string;
  textBodyLg?: string;
  textBodyLgLetterSpacing?: string;
  textBodyLgHeavy?: string;
  textBodyLgHeavyLetterSpacing?: string;
  textHeadingXs?: string;
  textHeadingXsLetterSpacing?: string;
  textHeadingSm?: string;
  textHeadingSmLetterSpacing?: string;
  textHeadingMd?: string;
  textHeadingMdLetterSpacing?: string;
  textHeadingLg?: string;
  textHeadingLgLetterSpacing?: string;
  textHeadingXl?: string;
  textHeadingXlLetterSpacing?: string;
  textLabelXs?: string;
  textLabelXsLetterSpacing?: string;
  textLabelXsHeavy?: string;
  textLabelXsHeavyLetterSpacing?: string;
  textLabelSm?: string;
  textLabelSmLetterSpacing?: string;
  textLabelSmHeavy?: string;
  textLabelSmHeavyLetterSpacing?: string;
  textLabelDefault?: string;
  textLabelDefaultLetterSpacing?: string;
  textLabelDefaultHeavy?: string;
  textLabelDefaultHeavyLetterSpacing?: string;
  textLabelLg?: string;
  textLabelLgLetterSpacing?: string;
  textLabelLgHeavy?: string;
  textLabelLgHeavyLetterSpacing?: string;
  textNumbersXs?: string;
  textNumbersXsLetterSpacing?: string;
  textNumbersXsHeavy?: string;
  textNumbersXsHeavyLetterSpacing?: string;
  textNumbersSm?: string;
  textNumbersSmLetterSpacing?: string;
  textNumbersSmHeavy?: string;
  textNumbersSmHeavyLetterSpacing?: string;
  textNumbersDefault?: string;
  textNumbersDefaultLetterSpacing?: string;
  textNumbersDefaultHeavy?: string;
  textNumbersDefaultHeavyLetterSpacing?: string;
  textNumbersLg?: string;
  textNumbersLgLetterSpacing?: string;
  textNumbersLgHeavy?: string;
  textNumbersLgHeavyLetterSpacing?: string;
  textNumbersHeadingSm?: string;
  textNumbersHeadingSmLetterSpacing?: string;
  textNumbersHeadingMd?: string;
  textNumbersHeadingMdLetterSpacing?: string;
  textNumbersHeadingLg?: string;
  textNumbersHeadingLgLetterSpacing?: string;
  textNumbersHeadingXl?: string;
  textNumbersHeadingXlLetterSpacing?: string;
  textCodeSm?: string;
  textCodeSmLetterSpacing?: string;
  textCodeSmHeavy?: string;
  textCodeSmHeavyLetterSpacing?: string;
  textCodeDefault?: string;
  textCodeDefaultLetterSpacing?: string;
  textCodeDefaultHeavy?: string;
  textCodeDefaultHeavyLetterSpacing?: string;
}
/**
 * Effect tokens: box-shadow values at increasing elevation levels.
 * Light and dark modes use different shadow intensities.
 */
interface EffectTheme {
  shadow0?: string;
  shadowS?: string;
  shadowM?: string;
  shadowL?: string;
  shadowXl?: string;
  shadow2xl?: string;
  shadow3xl?: string;
}
/**
 * The complete set of design tokens consumed by {@link ThemeProvider}.
 * Combines color, layout, typography, and effect sub-interfaces.
 * Every property is optional — omitted keys use the built-in defaults.
 */
interface Theme extends ColorTheme, LayoutTheme, TypographyTheme, EffectTheme {}
//#endregion
//#region src/components/ThemeProvider/defaultTheme.d.ts
/**
 * The built-in light theme. Combines the neutral-swatch light color palette,
 * shared layout and typography tokens, and light-mode shadow values.
 *
 * Used as the base when `ThemeProvider` is rendered with `mode="light"`.
 */
declare const defaultLightTheme: Theme;
/**
 * The built-in dark theme. Uses the neutral-swatch dark color palette with
 * inverted surface lightness, higher shadow opacity, and shared layout /
 * typography tokens.
 *
 * Used as the base when `ThemeProvider` is rendered with `mode="dark"`.
 */
declare const defaultDarkTheme: Theme;
//#endregion
//#region src/components/ThemeProvider/swatches.d.ts
type SwatchScale = {
  25: string;
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  925: string;
  950: string;
  1000: string;
};
declare const BASE_SWATCHES: {
  readonly neutral: {
    readonly 25: "oklch(0.994 0 89.876 / 1)";
    readonly 50: "oklch(0.985 0 89.876 / 1)";
    readonly 100: "oklch(0.97 0 89.876 / 1)";
    readonly 200: "oklch(0.922 0 89.876 / 1)";
    readonly 300: "oklch(0.87 0 89.876 / 1)";
    readonly 400: "oklch(0.715 0 89.876 / 1)";
    readonly 500: "oklch(0.556 0 89.876 / 1)";
    readonly 600: "oklch(0.439 0 89.876 / 1)";
    readonly 700: "oklch(0.371 0 89.876 / 1)";
    readonly 800: "oklch(0.269 0 89.876 / 1)";
    readonly 900: "oklch(0.205 0 0 / 1)";
    readonly 925: "oklch(0.173 0 0 / 1)";
    readonly 950: "oklch(0.145 0 0 / 1)";
    readonly 1000: "oklch(0.097 0 0 / 1)";
  };
  readonly slate: {
    readonly 25: "oklch(0.994 0.002 247.839 / 1)";
    readonly 50: "oklch(0.984 0.003 247.858 / 1)";
    readonly 100: "oklch(0.968 0.007 247.896 / 1)";
    readonly 200: "oklch(0.929 0.013 255.508 / 1)";
    readonly 300: "oklch(0.869 0.02 252.894 / 1)";
    readonly 400: "oklch(0.711 0.035 256.788 / 1)";
    readonly 500: "oklch(0.554 0.041 257.417 / 1)";
    readonly 600: "oklch(0.446 0.037 257.281 / 1)";
    readonly 700: "oklch(0.372 0.039 257.287 / 1)";
    readonly 800: "oklch(0.279 0.037 260.031 / 1)";
    readonly 900: "oklch(0.208 0.04 265.755 / 1)";
    readonly 925: "oklch(0.166 0.029 267.188 / 1)";
    readonly 950: "oklch(0.129 0.041 264.695 / 1)";
    readonly 1000: "oklch(0.091 0.029 268.957 / 1)";
  };
  readonly gray: {
    readonly 25: "oklch(0.991 0.001 286.376 / 1)";
    readonly 50: "oklch(0.985 0.002 247.839 / 1)";
    readonly 100: "oklch(0.967 0.003 264.542 / 1)";
    readonly 200: "oklch(0.928 0.006 264.531 / 1)";
    readonly 300: "oklch(0.872 0.009 258.338 / 1)";
    readonly 400: "oklch(0.714 0.019 261.325 / 1)";
    readonly 500: "oklch(0.551 0.023 264.364 / 1)";
    readonly 600: "oklch(0.446 0.026 256.802 / 1)";
    readonly 700: "oklch(0.373 0.031 259.733 / 1)";
    readonly 800: "oklch(0.278 0.03 256.848 / 1)";
    readonly 900: "oklch(0.21 0.032 264.665 / 1)";
    readonly 925: "oklch(0.171 0.028 267.356 / 1)";
    readonly 950: "oklch(0.13 0.027 261.692 / 1)";
    readonly 1000: "oklch(0.089 0.024 267.878 / 1)";
  };
  readonly zinc: {
    readonly 25: "oklch(0.994 0 89.876 / 1)";
    readonly 50: "oklch(0.985 0 89.876 / 1)";
    readonly 100: "oklch(0.967 0.001 286.375 / 1)";
    readonly 200: "oklch(0.92 0.004 286.32 / 1)";
    readonly 300: "oklch(0.871 0.005 286.286 / 1)";
    readonly 400: "oklch(0.712 0.013 286.067 / 1)";
    readonly 500: "oklch(0.552 0.014 285.938 / 1)";
    readonly 600: "oklch(0.442 0.015 285.786 / 1)";
    readonly 700: "oklch(0.37 0.012 285.805 / 1)";
    readonly 800: "oklch(0.274 0.005 286.033 / 1)";
    readonly 900: "oklch(0.21 0.006 285.885 / 1)";
    readonly 925: "oklch(0.179 0.004 285.981 / 1)";
    readonly 950: "oklch(0.141 0.004 285.823 / 1)";
    readonly 1000: "oklch(0.108 0.004 285.762 / 1)";
  };
  readonly stone: {
    readonly 25: "oklch(0.994 0.001 106.423 / 1)";
    readonly 50: "oklch(0.985 0.001 106.423 / 1)";
    readonly 100: "oklch(0.97 0.001 106.424 / 1)";
    readonly 200: "oklch(0.923 0.003 48.717 / 1)";
    readonly 300: "oklch(0.869 0.004 56.366 / 1)";
    readonly 400: "oklch(0.716 0.009 56.259 / 1)";
    readonly 500: "oklch(0.553 0.012 58.071 / 1)";
    readonly 600: "oklch(0.444 0.01 73.639 / 1)";
    readonly 700: "oklch(0.374 0.009 67.558 / 1)";
    readonly 800: "oklch(0.268 0.006 34.298 / 1)";
    readonly 900: "oklch(0.216 0.006 56.043 / 1)";
    readonly 925: "oklch(0.184 0.005 67.497 / 1)";
    readonly 950: "oklch(0.147 0.004 49.25 / 1)";
    readonly 1000: "oklch(0.108 0.005 71.346 / 1)";
  };
  readonly blue: {
    readonly 25: "oklch(0.986 0.007 247.894 / 1)";
    readonly 50: "oklch(0.97 0.014 254.604 / 1)";
    readonly 100: "oklch(0.932 0.032 255.585 / 1)";
    readonly 200: "oklch(0.882 0.057 254.128 / 1)";
    readonly 300: "oklch(0.809 0.096 251.813 / 1)";
    readonly 400: "oklch(0.714 0.143 254.624 / 1)";
    readonly 500: "oklch(0.623 0.188 259.815 / 1)";
    readonly 600: "oklch(0.546 0.215 262.881 / 1)";
    readonly 700: "oklch(0.488 0.217 264.376 / 1)";
    readonly 800: "oklch(0.424 0.181 265.638 / 1)";
    readonly 900: "oklch(0.379 0.138 265.522 / 1)";
    readonly 925: "oklch(0.328 0.111 266.206 / 1)";
    readonly 950: "oklch(0.282 0.087 267.935 / 1)";
    readonly 1000: "oklch(0.217 0.066 266.921 / 1)";
  };
  readonly sky: {
    readonly 25: "oklch(0.991 0.006 223.454 / 1)";
    readonly 50: "oklch(0.977 0.012 236.62 / 1)";
    readonly 100: "oklch(0.951 0.025 236.824 / 1)";
    readonly 200: "oklch(0.901 0.055 230.902 / 1)";
    readonly 300: "oklch(0.828 0.101 230.318 / 1)";
    readonly 400: "oklch(0.754 0.139 232.661 / 1)";
    readonly 500: "oklch(0.685 0.148 237.323 / 1)";
    readonly 600: "oklch(0.588 0.139 241.966 / 1)";
    readonly 700: "oklch(0.5 0.119 242.749 / 1)";
    readonly 800: "oklch(0.443 0.1 240.79 / 1)";
    readonly 900: "oklch(0.391 0.085 240.876 / 1)";
    readonly 925: "oklch(0.339 0.07 239.068 / 1)";
    readonly 950: "oklch(0.293 0.063 243.157 / 1)";
    readonly 1000: "oklch(0.212 0.042 240.144 / 1)";
  };
  readonly cyan: {
    readonly 25: "oklch(0.991 0.009 205.897 / 1)";
    readonly 50: "oklch(0.984 0.019 200.873 / 1)";
    readonly 100: "oklch(0.956 0.044 203.388 / 1)";
    readonly 200: "oklch(0.917 0.077 205.041 / 1)";
    readonly 300: "oklch(0.865 0.115 207.078 / 1)";
    readonly 400: "oklch(0.797 0.134 211.53 / 1)";
    readonly 500: "oklch(0.715 0.126 215.221 / 1)";
    readonly 600: "oklch(0.609 0.111 221.723 / 1)";
    readonly 700: "oklch(0.52 0.094 223.128 / 1)";
    readonly 800: "oklch(0.45 0.077 224.283 / 1)";
    readonly 900: "oklch(0.398 0.066 227.392 / 1)";
    readonly 925: "oklch(0.345 0.057 226.509 / 1)";
    readonly 950: "oklch(0.302 0.054 229.695 / 1)";
    readonly 1000: "oklch(0.217 0.037 227.615 / 1)";
  };
  readonly teal: {
    readonly 25: "oklch(0.992 0.007 174.385 / 1)";
    readonly 50: "oklch(0.984 0.014 180.72 / 1)";
    readonly 100: "oklch(0.953 0.05 180.801 / 1)";
    readonly 200: "oklch(0.91 0.093 180.426 / 1)";
    readonly 300: "oklch(0.855 0.125 181.071 / 1)";
    readonly 400: "oklch(0.785 0.133 181.912 / 1)";
    readonly 500: "oklch(0.704 0.123 182.503 / 1)";
    readonly 600: "oklch(0.6 0.104 184.704 / 1)";
    readonly 700: "oklch(0.511 0.086 186.391 / 1)";
    readonly 800: "oklch(0.437 0.071 188.216 / 1)";
    readonly 900: "oklch(0.386 0.059 188.416 / 1)";
    readonly 925: "oklch(0.335 0.051 189.115 / 1)";
    readonly 950: "oklch(0.277 0.045 192.524 / 1)";
    readonly 1000: "oklch(0.206 0.033 191.443 / 1)";
  };
  readonly emerald: {
    readonly 25: "oklch(0.99 0.01 164.879 / 1)";
    readonly 50: "oklch(0.979 0.021 166.113 / 1)";
    readonly 100: "oklch(0.95 0.051 163.051 / 1)";
    readonly 200: "oklch(0.905 0.089 164.15 / 1)";
    readonly 300: "oklch(0.845 0.13 164.978 / 1)";
    readonly 400: "oklch(0.773 0.153 163.223 / 1)";
    readonly 500: "oklch(0.696 0.149 162.48 / 1)";
    readonly 600: "oklch(0.596 0.127 163.225 / 1)";
    readonly 700: "oklch(0.508 0.105 165.612 / 1)";
    readonly 800: "oklch(0.432 0.086 166.913 / 1)";
    readonly 900: "oklch(0.378 0.073 168.94 / 1)";
    readonly 925: "oklch(0.325 0.062 169.847 / 1)";
    readonly 950: "oklch(0.262 0.049 172.552 / 1)";
    readonly 1000: "oklch(0.188 0.033 177.113 / 1)";
  };
  readonly lime: {
    readonly 25: "oklch(0.993 0.018 120.67 / 1)";
    readonly 50: "oklch(0.986 0.031 120.757 / 1)";
    readonly 100: "oklch(0.967 0.066 122.328 / 1)";
    readonly 200: "oklch(0.938 0.122 124.321 / 1)";
    readonly 300: "oklch(0.897 0.179 126.665 / 1)";
    readonly 400: "oklch(0.849 0.207 128.85 / 1)";
    readonly 500: "oklch(0.768 0.204 130.85 / 1)";
    readonly 600: "oklch(0.648 0.175 131.684 / 1)";
    readonly 700: "oklch(0.532 0.141 131.589 / 1)";
    readonly 800: "oklch(0.453 0.113 130.933 / 1)";
    readonly 900: "oklch(0.405 0.096 131.063 / 1)";
    readonly 925: "oklch(0.341 0.079 131.173 / 1)";
    readonly 950: "oklch(0.274 0.069 132.109 / 1)";
    readonly 1000: "oklch(0.192 0.046 130.171 / 1)";
  };
  readonly amber: {
    readonly 25: "oklch(0.993 0.012 96.417 / 1)";
    readonly 50: "oklch(0.987 0.021 95.277 / 1)";
    readonly 100: "oklch(0.962 0.058 95.617 / 1)";
    readonly 200: "oklch(0.924 0.115 95.746 / 1)";
    readonly 300: "oklch(0.879 0.153 91.605 / 1)";
    readonly 400: "oklch(0.837 0.164 84.429 / 1)";
    readonly 500: "oklch(0.769 0.165 70.08 / 1)";
    readonly 600: "oklch(0.666 0.157 58.318 / 1)";
    readonly 700: "oklch(0.555 0.146 48.998 / 1)";
    readonly 800: "oklch(0.473 0.125 46.201 / 1)";
    readonly 900: "oklch(0.414 0.105 45.904 / 1)";
    readonly 925: "oklch(0.35 0.087 45.765 / 1)";
    readonly 950: "oklch(0.279 0.074 45.635 / 1)";
    readonly 1000: "oklch(0.206 0.05 48.704 / 1)";
  };
  readonly orange: {
    readonly 25: "oklch(0.987 0.01 72.664 / 1)";
    readonly 50: "oklch(0.98 0.016 73.684 / 1)";
    readonly 100: "oklch(0.954 0.037 75.164 / 1)";
    readonly 200: "oklch(0.901 0.073 70.697 / 1)";
    readonly 300: "oklch(0.837 0.117 66.29 / 1)";
    readonly 400: "oklch(0.758 0.159 55.934 / 1)";
    readonly 500: "oklch(0.705 0.187 47.604 / 1)";
    readonly 600: "oklch(0.646 0.194 41.116 / 1)";
    readonly 700: "oklch(0.553 0.174 38.402 / 1)";
    readonly 800: "oklch(0.47 0.143 37.304 / 1)";
    readonly 900: "oklch(0.408 0.116 38.172 / 1)";
    readonly 925: "oklch(0.342 0.096 37.716 / 1)";
    readonly 950: "oklch(0.266 0.076 36.259 / 1)";
    readonly 1000: "oklch(0.197 0.051 37.083 / 1)";
  };
  readonly green: {
    readonly 25: "oklch(0.989 0.012 153.679 / 1)";
    readonly 50: "oklch(0.982 0.018 155.826 / 1)";
    readonly 100: "oklch(0.962 0.043 156.743 / 1)";
    readonly 200: "oklch(0.925 0.081 155.995 / 1)";
    readonly 300: "oklch(0.871 0.136 154.449 / 1)";
    readonly 400: "oklch(0.8 0.182 151.711 / 1)";
    readonly 500: "oklch(0.723 0.192 149.579 / 1)";
    readonly 600: "oklch(0.627 0.17 149.214 / 1)";
    readonly 700: "oklch(0.527 0.137 150.069 / 1)";
    readonly 800: "oklch(0.448 0.108 151.328 / 1)";
    readonly 900: "oklch(0.393 0.09 152.535 / 1)";
    readonly 925: "oklch(0.337 0.076 152.793 / 1)";
    readonly 950: "oklch(0.266 0.063 152.934 / 1)";
    readonly 1000: "oklch(0.19 0.041 156.904 / 1)";
  };
  readonly yellow: {
    readonly 25: "oklch(0.995 0.013 102.007 / 1)";
    readonly 50: "oklch(0.987 0.026 102.212 / 1)";
    readonly 100: "oklch(0.973 0.069 103.193 / 1)";
    readonly 200: "oklch(0.945 0.124 101.54 / 1)";
    readonly 300: "oklch(0.905 0.166 98.111 / 1)";
    readonly 400: "oklch(0.861 0.173 91.936 / 1)";
    readonly 500: "oklch(0.795 0.162 86.047 / 1)";
    readonly 600: "oklch(0.681 0.142 75.834 / 1)";
    readonly 700: "oklch(0.554 0.121 66.442 / 1)";
    readonly 800: "oklch(0.476 0.103 61.907 / 1)";
    readonly 900: "oklch(0.421 0.09 57.708 / 1)";
    readonly 925: "oklch(0.357 0.075 57.491 / 1)";
    readonly 950: "oklch(0.286 0.064 53.813 / 1)";
    readonly 1000: "oklch(0.209 0.044 56.227 / 1)";
  };
  readonly red: {
    readonly 25: "oklch(0.982 0.009 17.303 / 1)";
    readonly 50: "oklch(0.971 0.013 17.38 / 1)";
    readonly 100: "oklch(0.936 0.031 17.717 / 1)";
    readonly 200: "oklch(0.885 0.059 18.334 / 1)";
    readonly 300: "oklch(0.808 0.103 19.571 / 1)";
    readonly 400: "oklch(0.711 0.166 22.216 / 1)";
    readonly 500: "oklch(0.637 0.208 25.331 / 1)";
    readonly 600: "oklch(0.577 0.215 27.325 / 1)";
    readonly 700: "oklch(0.505 0.19 27.518 / 1)";
    readonly 800: "oklch(0.444 0.161 26.899 / 1)";
    readonly 900: "oklch(0.396 0.133 25.723 / 1)";
    readonly 925: "oklch(0.332 0.111 25.625 / 1)";
    readonly 950: "oklch(0.258 0.089 26.042 / 1)";
    readonly 1000: "oklch(0.184 0.058 25.017 / 1)";
  };
  readonly purple: {
    readonly 25: "oklch(0.987 0.009 314.783 / 1)";
    readonly 50: "oklch(0.977 0.014 308.299 / 1)";
    readonly 100: "oklch(0.946 0.033 307.174 / 1)";
    readonly 200: "oklch(0.902 0.06 306.703 / 1)";
    readonly 300: "oklch(0.827 0.108 306.383 / 1)";
    readonly 400: "oklch(0.722 0.177 305.504 / 1)";
    readonly 500: "oklch(0.627 0.233 303.9 / 1)";
    readonly 600: "oklch(0.558 0.252 302.321 / 1)";
    readonly 700: "oklch(0.496 0.237 301.924 / 1)";
    readonly 800: "oklch(0.438 0.198 303.724 / 1)";
    readonly 900: "oklch(0.381 0.166 304.987 / 1)";
    readonly 925: "oklch(0.325 0.142 305.38 / 1)";
    readonly 950: "oklch(0.291 0.143 302.717 / 1)";
    readonly 1000: "oklch(0.205 0.098 304.68 / 1)";
  };
  readonly violet: {
    readonly 25: "oklch(0.98 0.011 297.63 / 1)";
    readonly 50: "oklch(0.969 0.016 293.756 / 1)";
    readonly 100: "oklch(0.943 0.028 294.588 / 1)";
    readonly 200: "oklch(0.894 0.055 293.283 / 1)";
    readonly 300: "oklch(0.811 0.101 293.571 / 1)";
    readonly 400: "oklch(0.709 0.159 293.541 / 1)";
    readonly 500: "oklch(0.606 0.219 292.717 / 1)";
    readonly 600: "oklch(0.541 0.247 293.009 / 1)";
    readonly 700: "oklch(0.491 0.241 292.581 / 1)";
    readonly 800: "oklch(0.432 0.211 292.759 / 1)";
    readonly 900: "oklch(0.38 0.178 293.745 / 1)";
    readonly 925: "oklch(0.324 0.151 293.976 / 1)";
    readonly 950: "oklch(0.283 0.135 291.089 / 1)";
    readonly 1000: "oklch(0.203 0.088 292.692 / 1)";
  };
  readonly fuchsia: {
    readonly 25: "oklch(0.984 0.012 329.558 / 1)";
    readonly 50: "oklch(0.977 0.017 320.058 / 1)";
    readonly 100: "oklch(0.952 0.036 318.852 / 1)";
    readonly 200: "oklch(0.903 0.073 319.62 / 1)";
    readonly 300: "oklch(0.833 0.132 321.434 / 1)";
    readonly 400: "oklch(0.748 0.207 322.16 / 1)";
    readonly 500: "oklch(0.667 0.259 322.15 / 1)";
    readonly 600: "oklch(0.591 0.257 322.896 / 1)";
    readonly 700: "oklch(0.518 0.226 323.949 / 1)";
    readonly 800: "oklch(0.452 0.192 324.591 / 1)";
    readonly 900: "oklch(0.401 0.16 325.612 / 1)";
    readonly 925: "oklch(0.341 0.135 326.232 / 1)";
    readonly 950: "oklch(0.293 0.131 325.661 / 1)";
    readonly 1000: "oklch(0.208 0.091 326.186 / 1)";
  };
  readonly pink: {
    readonly 25: "oklch(0.986 0.009 341.798 / 1)";
    readonly 50: "oklch(0.971 0.014 343.198 / 1)";
    readonly 100: "oklch(0.948 0.028 342.258 / 1)";
    readonly 200: "oklch(0.899 0.059 343.231 / 1)";
    readonly 300: "oklch(0.823 0.11 346.018 / 1)";
    readonly 400: "oklch(0.725 0.175 349.761 / 1)";
    readonly 500: "oklch(0.656 0.212 354.308 / 1)";
    readonly 600: "oklch(0.592 0.218 0.584 / 1)";
    readonly 700: "oklch(0.525 0.199 3.958 / 1)";
    readonly 800: "oklch(0.459 0.17 3.815 / 1)";
    readonly 900: "oklch(0.408 0.144 2.432 / 1)";
    readonly 925: "oklch(0.347 0.124 2.558 / 1)";
    readonly 950: "oklch(0.284 0.105 3.907 / 1)";
    readonly 1000: "oklch(0.201 0.073 1.239 / 1)";
  };
};
type SwatchName = keyof typeof BASE_SWATCHES;
type SwatchShade = keyof SwatchScale;
/** Absolute black in oklch format. */
declare const black = "oklch(0 0 0 / 1)";
/** Absolute white in oklch format. */
declare const white = "oklch(1 0 89.876 / 1)";
/**
 * Return a copy of an oklch color string with its alpha channel replaced.
 *
 * @param color - An oklch color string with `/ 1` alpha (e.g. `"oklch(0.5 0.1 260 / 1)"`)
 * @param alpha - New alpha value between 0 and 1
 * @returns The color string with the updated alpha
 *
 * @example
 * ```ts
 * withAlpha("oklch(0.5 0.1 260 / 1)", 0.5)
 * // => "oklch(0.5 0.1 260 / 0.5)"
 * ```
 */
declare const withAlpha: (color: string, alpha: number) => string;
/** Swatch families suitable for neutral/background usage (low chroma). */
type NeutralSwatchName = "neutral" | "slate" | "gray" | "zinc" | "stone";
/** Swatch families that can serve as brand/accent color (excludes semantic-only families). */
type BrandSwatchName = Exclude<SwatchName, "green" | "yellow" | "red">;
/**
 * Look up a raw oklch color value by swatch family name and shade.
 *
 * @param name  - One of the 20 swatch families (e.g. `"blue"`, `"neutral"`)
 * @param shade - Shade step from 25 (lightest) to 1000 (darkest)
 * @returns The oklch color string
 *
 * @example
 * ```ts
 * swatch("blue", 600) // => "oklch(0.546 0.215 262.881 / 1)"
 * ```
 */
declare const swatch: (name: SwatchName, shade: SwatchShade) => string;
/**
 * Resolve a flat token key (e.g. `"blue-600"`, `"black-a50"`) to its oklch
 * color value. Returns `""` for unknown tokens.
 */
declare const swatchToken: (token: string) => string;
/** The complete flat map of all swatch tokens (base shades + alpha variants). */
declare const swatchTokens: Record<string, string>;
//#endregion
//#region src/components/ThemeProvider/ThemeProvider.d.ts
/**
 * Props for the {@link ThemeProvider} component.
 */
type ThemeProps = {
  /** Active color scheme. Defaults to the parent ThemeProvider mode when nested, otherwise `"light"`. */mode?: ThemeMode; /** Application content rendered inside the theme context. */
  children?: React$1.ReactNode;
  /**
   * Partial overrides for **light** mode, merged onto the built-in light
   * defaults.  Omitted keys fall back to the built-in defaults.
   * Preferred over the deprecated `theme` prop.
   */
  lightTheme?: Theme;
  /**
   * Partial overrides for **dark** mode, merged onto the built-in dark
   * defaults.  When omitted, `lightTheme` overrides are applied to both modes
   * so a single set of brand customizations "just works".
   */
  darkTheme?: Theme;
  /**
   * @deprecated Use `lightTheme` instead. Kept for backward compatibility;
   * mapped to `lightTheme` internally. If both `theme` and `lightTheme` are
   * provided, `lightTheme` wins.
   */
  theme?: Theme;
  /**
   * CSS selector where `--inv-*` custom properties are injected.
   * Change this when mounting multiple independent theme scopes.
   * @default "body"
   */
  cssSelector?: string;
};
type ThemeContextType = {
  theme: Theme;
  mode: ThemeMode;
  portalThemeClassName: string;
};
/**
 * React context that carries the resolved theme, active mode, and a CSS class
 * name for portals. Consumed via {@link useTheme}.
 */
declare const ThemeContext: React$1.Context<ThemeContextType>;
/**
 * Access the current theme, mode, and portal class name from the nearest
 * {@link ThemeProvider}.
 *
 * @returns An object with:
 *  - `theme` – the fully resolved {@link Theme} object
 *  - `mode` – `"light"` or `"dark"`
 *  - `portalThemeClassName` – a unique CSS class name to apply on portal
 *     containers so they inherit the same `--inv-*` custom properties
 *
 * Falls back to the default light theme when no provider is present.
 *
 * @example
 * ```tsx
 * const { theme, mode, portalThemeClassName } = useTheme();
 * ```
 */
declare const useTheme: () => ThemeContextType;
/**
 * Injects the Inv design-token CSS custom properties (`--inv-*`) into the
 * DOM and provides theme context to all descendant components.
 *
 * Supports automatic scoping when nested inside another ThemeProvider: the inner
 * provider wraps its children in a `<div>` with `display: contents` and injects
 * a scoped style rule instead of targeting `body`.
 *
 * @example
 * ```tsx
 * <ThemeProvider
 *   mode="dark"
 *   lightTheme={createTheme({ interactiveAccentDefault: "oklch(0.6 0.2 260)" })}
 * >
 *   <App />
 * </ThemeProvider>
 * ```
 */
declare const ThemeProvider: ({
  mode: modeProp,
  children,
  lightTheme,
  darkTheme,
  theme: deprecatedTheme,
  cssSelector
}: ThemeProps) => React$1.JSX.Element;
//#endregion
//#region src/components/ThemeProvider/useSystemThemeMode.d.ts
declare function useSystemThemeMode(): ThemeMode;
//#endregion
//#region src/components/ThemeProvider/utils.d.ts
/**
 * Validate a partial theme object in development and return it as-is.
 *
 * Works for both light and dark overrides — call it once per theme object:
 *
 * ```tsx
 * <ThemeProvider
 *   lightTheme={createTheme({ interactiveAccentDefault: "oklch(0.6 0.2 260)" })}
 *   darkTheme={createTheme({ interactiveAccentDefault: "oklch(0.4 0.2 260)" })}
 * />
 * ```
 *
 * In non-production builds this checks every key against the known theme keys
 * and emits a `console.warn` with a "did you mean …?" suggestion for typos.
 * In production the validation code is stripped by bundlers.
 *
 * @param theme - A partial {@link Theme} to validate (light or dark overrides).
 * @returns The same `theme` object, unmodified.
 */
declare function createTheme(theme: Theme): Theme;
//#endregion
//#region src/components/AgentInterface/ArtifactNav.d.ts
interface ArtifactNavProps {
  className?: string;
  /**
   * Fallback icon for category items that don't set their own `icon`.
   * Defaults to a boxes icon.
   */
  icon?: ReactNode;
}
/**
 * Sidebar navigation for the global artifact browser.
 *
 * Renders one {@link SidebarItem} per configured `artifactCategories` entry
 * (or a single "Artifacts" item when no categories are configured). Clicking
 * navigates to the reserved `artifacts/{category}` path, which AgentInterface
 * renders as the searchable artifact browser in the thread region.
 *
 * Each item's icon is the category's own `icon` (`artifactCategories: [{ icon }]`),
 * else the `icon` prop, else a generic default — the library hardcodes no
 * per-category icons.
 *
 * Renders nothing when `storage.artifact` is not configured.
 *
 * Included automatically in the default sidebar; compose it manually inside
 * a custom `<AgentInterface.Sidebar>`.
 *
 * @category Components
 */
declare const ArtifactNav: ({
  className,
  icon
}: ArtifactNavProps) => _$react.JSX.Element | null;
//#endregion
//#region src/components/AgentInterface/ConversationStarter.d.ts
type ConversationStarterVariant = "short" | "long";
//#endregion
//#region src/components/AgentInterface/Composer.d.ts
interface ComposerProps$1 {
  className?: string;
  placeholder?: string;
  /** Starters chips shown above the input when chat is empty. Inherits from <AgentInterface starters>. */
  starters?: ConversationStarterProps[];
  /** Layout variant for starters. Inherits from <AgentInterface starterVariant>. */
  starterVariant?: ConversationStarterVariant;
  /** Mode C — fully replaces the composer area. When provided, auto-starters rendering is disabled. */
  children?: ReactNode;
}
declare const Composer: ({
  className,
  placeholder,
  starters: ownStarters,
  starterVariant: ownVariant,
  children
}: ComposerProps$1) => _$react.JSX.Element;
//#endregion
//#region src/components/AgentInterface/MobileHeader.d.ts
interface MobileHeaderProps {
  className?: string;
  logo?: ReactNode;
  agentName?: ReactNode;
  menuButton?: ReactNode | false;
  newChatButton?: ReactNode | false;
  actions?: ReactNode;
  children?: ReactNode;
}
declare const MobileHeader: ({
  className,
  logo,
  agentName: agentNameProp,
  menuButton,
  newChatButton,
  actions,
  children
}: MobileHeaderProps) => _$react.JSX.Element;
//#endregion
//#region src/components/AgentInterface/NewChatButton.d.ts
declare const NewChatButton: ({
  className
}: {
  className?: string;
}) => _$react.JSX.Element;
//#endregion
//#region src/components/AgentInterface/Route.d.ts
interface RouteProps {
  /** Exact path match (no wildcards or params in v1). */
  path: string;
  /** Content shown in the thread region when this route is active. */
  children?: ReactNode;
}
/**
 * Slot marker for a routable view. Never rendered directly — the parent
 * <AgentInterface> extracts all Routes from its children, finds the one
 * whose `path` matches the current nav state, and renders that Route's
 * children in place of the entire thread region (MobileHeader, ThreadHeader,
 * ScrollArea/Messages, Composer all hidden).
 *
 * Use multiple <AgentInterface.Route> siblings to define separate views.
 * When no Route matches, the thread region renders normally.
 */
declare const Route: {
  (_props: RouteProps): null;
  displayName: string;
};
//#endregion
//#region src/components/AgentInterface/Sidebar.d.ts
interface SidebarHeaderProps {
  className?: string;
  logo?: React.ReactNode;
  agentName?: React.ReactNode;
  collapseButton?: React.ReactNode | false;
  children?: React.ReactNode;
}
declare const SidebarHeader: ({
  className,
  logo,
  agentName: agentNameProp,
  collapseButton,
  children
}: SidebarHeaderProps) => _$react.JSX.Element;
declare const SidebarContent: ({
  children,
  className
}: {
  children?: React.ReactNode;
  className?: string;
}) => _$react.JSX.Element;
declare const SidebarSeparator: () => _$react.JSX.Element;
//#endregion
//#region src/components/AgentInterface/SidebarItem.d.ts
interface SidebarItemProps extends Omit<ComponentPropsWithoutRef<"button">, "children"> {
  /** Leading icon. */
  icon?: ReactNode;
  /** Trailing content — badges, counts, etc. Rendered right-aligned. */
  trailing?: ReactNode;
  /**
   * Selected/active state. Defaults to `currentPath === path` when `path` is
   * provided. Pass explicitly to override the auto-derivation.
   */
  selected?: boolean;
  /**
   * Path this item navigates to. When provided, clicking the item calls
   * `navigate(path)` and the item auto-selects when current path matches.
   * Works in both controlled and uncontrolled <AgentInterface>.
   */
  path?: string;
  children: ReactNode;
}
/**
 * Styled clickable item for use inside <AgentInterface.Sidebar>. Visually
 * matches the ThreadList row so custom nav items blend with the default
 * thread list.
 */
declare const SidebarItem: ({
  icon,
  trailing,
  selected,
  path,
  className,
  children,
  onClick,
  ...rest
}: SidebarItemProps) => _$react.JSX.Element;
//#endregion
//#region src/components/AgentInterface/SidebarSlot.d.ts
interface SidebarSlotProps {
  children?: ReactNode;
}
/**
 * Slot marker for the entire sidebar region. Never rendered directly — the
 * parent <AgentInterface> extracts its children and arranges them inside the
 * SidebarContainer in place of the default sidebar arrangement.
 *
 * Mode A: omitted → default sidebar renders (SidebarHeader + SidebarContent
 *         with SidebarSeparator + ThreadList).
 * Mode C: provided with children → children replace the entire sidebar's
 *         inner content (user composes SidebarHeader, SidebarSeparator,
 *         ThreadList, etc. as needed).
 */
declare const SidebarSlot: {
  (_props: SidebarSlotProps): null;
  displayName: string;
};
//#endregion
//#region src/types/PromptTemplate.d.ts
/**
 * A fill-in-the-blank prompt for the welcome screen, rendered as a chip:
 * clicking drops the incomplete `prompt` stem into the welcome composer
 * (instead of sending), then shows the template's `completions`, which submit
 * the completed prompt on click.
 */
interface PromptTemplate {
  displayText: string;
  /** The prompt stem dropped into the composer, e.g. "Create a deck about ". */
  prompt: string;
  /** Optional icon; omit for none (chips render no default icon). */
  icon?: ReactNode;
  /** Suggested completions that submit with the prompt stem when selected. */
  completions: ConversationStarterProps[];
}
//#endregion
//#region src/components/AgentInterface/Thread.d.ts
declare const ScrollArea: ({
  children,
  className,
  scrollVariant,
  userMessageSelector,
  scrollOnLoad
}: {
  children?: React$1.ReactNode;
  className?: string;
  /**
   * Scroll to bottom once the last message is added
   */
  scrollVariant?: ScrollVariant;
  /**
   * Selector for the user message
   */
  userMessageSelector?: string;
  /**
   * When false, do not auto-scroll on initial load / conversation switch
   * (auto-scroll then only happens while a response is generating).
   */
  scrollOnLoad?: boolean;
}) => React$1.JSX.Element;
declare const MessageLoading: () => React$1.JSX.Element;
declare const Messages: ({
  className,
  loader,
  assistantMessage,
  userMessage,
  toolCallTimeline
}: {
  className?: string;
  loader?: React$1.ReactNode;
  assistantMessage?: AssistantMessageComponent$1;
  userMessage?: UserMessageComponent$1;
  toolCallTimeline?: ToolCallTimelineComponent;
}) => React$1.JSX.Element;
declare const ThreadHeader: ({
  children,
  className
}: {
  children?: React$1.ReactNode;
  className?: string;
}) => React$1.JSX.Element;
//#endregion
//#region src/components/AgentInterface/ThreadList.d.ts
declare const ThreadList: ({
  className
}: {
  className?: string;
}) => _$react.JSX.Element;
//#endregion
//#region src/components/AgentInterface/WelcomeGlow.d.ts
interface WelcomeGlowProps {
  children: ReactNode;
  className?: string;
}
/**
 * Positions the optional welcome glow around a custom composer. The animation
 * is enabled by the nearest <AgentInterface.Welcome glowAnimation> ancestor.
 */
declare const WelcomeGlow: ({
  children,
  className
}: WelcomeGlowProps) => _$react.JSX.Element;
//#endregion
//#region src/components/AgentInterface/WelcomeScreen.d.ts
interface WelcomeScreenBaseProps {
  /**
   * Additional CSS class name
   */
  className?: string;
  /**
   * Plays the one-shot welcome entrance and composer glow animation.
   * @default false
   */
  glowAnimation?: boolean;
}
interface WelcomeScreenWithContentProps extends WelcomeScreenBaseProps {
  /**
   * The greeting/title text to display
   */
  title?: string;
  /**
   * Optional description text to add more context
   */
  description?: string;
  /**
   * Image to display - can be a URL object or a ReactNode
   * - { url: string }: Renders an <img> tag with default styling (64x64, object-fit: cover, rounded)
   * - ReactNode: Renders the provided element directly (for custom icons, styled images, etc.)
   */
  image?: {
    url: string;
  } | ReactNode;
  /**
   * Conversation starters to show below the composer
   */
  starters?: ConversationStarterProps[];
  /**
   * Variant of the conversation starters
   */
  starterVariant?: ConversationStarterVariant;
  /**
   * Fill-in-the-blank prompt templates, rendered as chips between the composer
   * and the starters. Clicking one drops its prompt stem into the composer
   * (instead of sending) and shows the template's completions. Selecting a
   * completion sends the completed prompt immediately.
   */
  promptTemplates?: PromptTemplate[];
  /**
   * Children are not allowed when using props-based content
   */
  children?: never;
}
interface WelcomeScreenWithChildrenProps extends WelcomeScreenBaseProps {
  /**
   * Custom content to render inside the welcome screen
   * When children are provided, title, description, and image are ignored
   */
  children: ReactNode;
  title?: never;
  description?: never;
  image?: never;
  starters?: never;
  starterVariant?: never;
  promptTemplates?: never;
}
type WelcomeScreenProps = WelcomeScreenWithContentProps | WelcomeScreenWithChildrenProps;
declare const WelcomeScreen: (props: WelcomeScreenProps) => _$react.JSX.Element | null;
//#endregion
//#region src/components/AgentInterface/Workspace.d.ts
interface WorkspaceProps {
  className?: string;
  /** Mode C — replaces the entire rail (you own the chrome and visibility). */
  children?: ReactNode;
}
/**
 * Per-thread workspace rail (right edge of the layout) listing the artifacts
 * registered in the active thread.
 *
 * - Renders nothing while the registry is empty — drop-in users without
 *   artifact renderers never see it. Visibility is controlled by the header
 *   workspace toggle.
 * - Lists every registered artifact, grouped into one section per
 *   `artifactCategories` entry configured on `<AgentInterface>`; a single
 *   "Artifacts" section lists everything when no categories are configured.
 *   There are no tabs or filtering — the rail shows it all.
 * - Item click activates the corresponding DetailedView; the rail closes while
 *   a DetailedView is open.
 * - Rendered only in the thread view — hidden on Route pages and the
 *   artifact browser. Hidden on mobile.
 *
 * Modes: A (omit → default above) and C (children replace the rail).
 *
 * @category Components
 */
declare const Workspace: ({
  className,
  children
}: WorkspaceProps) => _$react.JSX.Element;
//#endregion
//#region src/components/AgentInterface/AgentInterface.d.ts
interface AgentInterfaceComponents {
  AssistantMessage?: AssistantMessageComponent$1;
  UserMessage?: UserMessageComponent$1;
  /** Replaces the built-in turn-level tool activity timeline. */
  ToolCallTimeline?: ToolCallTimelineComponent;
}
interface AgentInterfaceProps extends Omit<ChatProviderProps, "children"> {
  /** Component library for auto-GenUI rendering when `components.AssistantMessage` is not provided. */
  componentLibrary?: Library;
  /** Explicit component overrides. Takes precedence over GenUI auto-derivation. */
  components?: AgentInterfaceComponents;
  /** Theme props passed to <ThemeProvider>. */
  theme?: ThemeProps;
  /** When true, skips wrapping in <ThemeProvider>. */
  disableThemeProvider?: boolean;
  /** Brand logo shown in default SidebarHeader + MobileHeader. */
  logoUrl?: string;
  /** Agent display name. */
  agentName?: string;
  /** Consumer-overridable display strings for the artifact browser + workspace. */
  labels?: AgentInterfaceLabels;
  /** Global starters inherited by Welcome (when active) or Composer. */
  starters?: ConversationStarterProps[];
  /** Layout variant for inherited starters. */
  starterVariant?: ConversationStarterVariant;
  /** Controlled current path. Pair with `onNavigate`. `undefined` = thread view. */
  path?: string;
  /** Initial path for uncontrolled mode. Ignored when `onNavigate` is provided. */
  defaultPath?: string;
  /** Called when navigation occurs. Presence selects controlled mode. */
  onNavigate?: (next: string | undefined) => void;
  /**
   * How the thread scrolls as messages stream in.
   * `"always"` follows the streaming response to the bottom (until the user scrolls up);
   * `"user-message-anchor"` (default) pins the latest user message to the top.
   */
  scrollVariant?: ScrollVariant;
  /** When false, the thread does not auto-scroll on load / conversation switch (auto-scroll only while generating). Default true. */
  scrollOnLoad?: boolean;
  children?: ReactNode;
}
interface AgentInterfaceComponent extends FC<AgentInterfaceProps> {
  Sidebar: typeof SidebarSlot;
  SidebarHeader: typeof SidebarHeader;
  SidebarContent: typeof SidebarContent;
  SidebarSeparator: typeof SidebarSeparator;
  SidebarItem: typeof SidebarItem;
  ArtifactNav: typeof ArtifactNav;
  Workspace: typeof Workspace;
  Route: typeof Route;
  MobileHeader: typeof MobileHeader;
  ThreadHeader: typeof ThreadHeader;
  Welcome: typeof WelcomeScreen;
  WelcomeGlow: typeof WelcomeGlow;
  Composer: typeof Composer;
  NewChatButton: typeof NewChatButton;
  ThreadList: typeof ThreadList;
  Messages: typeof Messages;
  MessageLoading: typeof MessageLoading;
  ScrollArea: typeof ScrollArea;
}
declare const AgentInterface: AgentInterfaceComponent;
//#endregion
//#region src/components/_shared/tool-renderer/TimelineEntry.d.ts
interface TimelineEntryProps {
  activity: ToolActivity$1;
  /** Whether this entry belongs to the live (last assistant) message — drives the running shimmer. */
  isLast?: boolean;
  /** Optional detailed-view panel for matched renderers (defaults to the shared one). */
  detailedViewPanel?: ToolDetailedViewPanel;
  /** Always render the raw default card, even when a renderer matches (used for the "Behind the scenes" raw view). */
  forceDefault?: boolean;
  /**
   * When a matched renderer's parser returns null, fall back to the raw default
   * card (default `true`). Set `false` when a separate raw card already covers
   * this call (e.g. InvChat shows the raw card in its forceDefault timeline),
   * to avoid rendering the raw card twice.
   */
  fallbackToDefault?: boolean;
}
/**
 * Timeline-flavoured sibling of {@link ToolCallEntry}: the same matched-renderer
 * **xor** default dispatch, but the default is the timeline-shaped
 * {@link TimelineToolCard} (dot + connector + StatusStep) instead of the chevron
 * card. Used both inside `<ToolCallTimeline>` and directly by flat threads that
 * want the always-visible timeline rows.
 *
 * @category Components
 */
declare const TimelineEntry: _$react.NamedExoticComponent<TimelineEntryProps>;
//#endregion
//#region src/components/_shared/tool-renderer/ToolCallEntry.d.ts
interface ToolCallEntryProps {
  activity: ToolActivity$1;
  /** Whether this entry belongs to the live (last assistant) message — drives the running shimmer. */
  isLast?: boolean;
  /** Optional detailed-view panel for matched renderers (defaults to the shared one). */
  detailedViewPanel?: ToolDetailedViewPanel;
}
/**
 * Renders one tool call: a matched artifact renderer (exact → RegExp → `"*"`)
 * **xor** the batteries-included {@link DefaultToolCard} — never both. The
 * single render path that replaces the copy-pasted call-card + result-renderer
 * blocks across the thread components. Memoized so it only re-renders when the
 * activity actually changes.
 *
 * @category Components
 */
declare const ToolCallEntry: _$react.NamedExoticComponent<ToolCallEntryProps>;
//#endregion
//#region src/components/_shared/tool-renderer/ToolCallErrorFallback.d.ts
/**
 * Inline fallback shown when a matched renderer's `parse`/`parser` throws.
 * Keeps one bad renderer from blanking the whole thread.
 *
 * @internal
 */
declare function ToolCallErrorFallback({
  error,
  toolName
}: {
  error: string;
  toolName: string;
}): _$react.JSX.Element;
//#endregion
//#region src/components/_shared/tool-renderer/ToolMessageRenderer.d.ts
/**
 * Props for {@link ToolMessageRenderer}.
 *
 * @category Components
 */
type ToolMessageRendererProps = {
  /**
   * The tool message containing the response payload, or `null` while the tool
   * call is still streaming. The matched renderer sees `controls.isStreaming = true`.
   */
  toolMessage: ToolMessage | null; /** The matching tool call from the parent assistant message. */
  toolCall: ToolCall$1; /** Rendered when no renderer matches `toolCall.function.name`. */
  fallback: ReactNode; /** Optional detailed-view panel (defaults to the shared one). */
  detailedViewPanel?: ToolDetailedViewPanel;
};
/**
 * Dispatches a tool call to a matching renderer, else renders `fallback`.
 *
 * @deprecated Prefer `useToolActivities` + `<ToolCallEntry>` / `<ToolCallTimeline>`,
 * which pair calls↔results by id, carry real status, and render the matched
 * renderer xor the default card. This wrapper now builds a single
 * {@link ToolActivity} from `toolCall`/`toolMessage` and delegates to
 * {@link ToolActivityRenderer}, so existing imports keep working.
 *
 * @category Components
 */
declare const ToolMessageRenderer: ({
  toolMessage,
  toolCall,
  fallback,
  detailedViewPanel
}: ToolMessageRendererProps) => _$react.JSX.Element;
//#endregion
//#region src/components/_shared/Collapsible.d.ts
/**
 * Content-agnostic, aria-correct collapsible — the extracted version of the old
 * `ToolCodeBlock` (chevron + `aria-expanded`/`aria-controls`, the `--loading`
 * label state) so request/response (and anything else) can slot into it.
 *
 * @category Components
 */
declare function Collapsible({
  label,
  labelLoading,
  loading,
  defaultOpen,
  children
}: {
  label: string; /** Shimmering label shown while `loading` is `true` (falls back to `label`). */
  labelLoading?: string;
  loading?: boolean;
  defaultOpen?: boolean;
  children: ReactNode;
}): _$react.JSX.Element;
//#endregion
//#region src/components/AgentInterface/_shared/detailed-view/DetailedViewPanel.d.ts
/**
 * Props for {@link DetailedViewPanel}.
 *
 * @category Components
 */
type DetailedViewPanelProps = {
  /** Detailed-view id this panel renders content for. Must match the id passed to `useDetailedView(viewId)`. */viewId: string; /** Content rendered inside the panel when this view is active. */
  children: ReactNode; /** Display title for the panel header and aria-label. Defaults to `"Detailed view"`. */
  title?: string; /** Additional CSS class name(s) applied to the panel container. */
  className?: string; /** Fallback UI rendered if children throw during rendering. Defaults to `null`. */
  errorFallback?: ReactNode;
  /**
   * Controls the panel header.
   * - `true` (default): built-in header with title + close button
   * - `false`: no header, raw children only
   * - `ReactNode`: custom header replacing the built-in one
   */
  header?: boolean | ReactNode;
};
/**
 * Portals detailed-view content into the nearest {@link DetailedViewPortalTarget}.
 *
 * Renders nothing when the view is inactive or no portal target is mounted.
 * Wraps children in an error boundary and applies theme-scoped class names.
 *
 * Requires `<DetailedViewPortalTarget />` to be mounted in the layout.
 *
 * @category Components
 */
declare const DetailedViewPanel$1: _$react.ForwardRefExoticComponent<DetailedViewPanelProps & _$react.RefAttributes<HTMLDivElement>>;
//#endregion
//#region src/components/AgentInterface/_shared/detailed-view/DetailedViewPortalTarget.d.ts
/**
 * Props for {@link DetailedViewPortalTarget}.
 */
type DetailedViewPortalTargetProps = {
  /** Additional CSS class name(s) applied to the container element. */className?: string;
};
/**
 * Registers a DOM node as the render target for {@link DetailedViewPanel} portals.
 *
 * Mount exactly one instance in your layout. Renders a `<div>` with
 * `display: contents` so it doesn't affect layout flow.
 *
 * @category Components
 */
declare const DetailedViewPortalTarget: _$react.ForwardRefExoticComponent<DetailedViewPortalTargetProps & _$react.RefAttributes<HTMLDivElement>>;
//#endregion
//#region src/components/Button/Button.d.ts
type ButtonVariant = "primary" | "secondary" | "tertiary";
type ButtonSize = "extra-small" | "small" | "medium" | "large";
type ButtonType = "normal" | "destructive";
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  buttonType?: ButtonType;
}
declare const Button: _$react.ForwardRefExoticComponent<ButtonProps & _$react.RefAttributes<HTMLButtonElement>>;
//#endregion
//#region src/components/IconButton/IconButton.d.ts
type IconButtonVariant = "primary" | "secondary" | "tertiary";
type IconButtonSize = "3-extra-small" | "2-extra-small" | "extra-small" | "small" | "medium" | "large";
type IconButtonShape = "square" | "circle";
type IconButtonAppearance = "normal" | "destructive";
interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  shape?: IconButtonShape;
  className?: string;
  appearance?: IconButtonAppearance;
  /**
   * Render as the provided child element instead of a `<button>`. Useful when the
   * icon button is nested inside another interactive element (e.g. an accordion
   * trigger) where a nested `<button>` would be invalid HTML.
   */
  asChild?: boolean;
}
declare const IconButton: _$react.ForwardRefExoticComponent<IconButtonProps & _$react.RefAttributes<HTMLButtonElement>>;
//#endregion
//#region src/components/Buttons/Buttons.d.ts
type ButtonsVariant = "vertical" | "horizontal";
interface ButtonsProps extends HTMLAttributes<HTMLDivElement> {
  variant?: ButtonsVariant;
  children: ReactElement<ButtonProps | IconButtonProps> | ReactElement<ButtonProps | IconButtonProps>[];
  className?: string;
  style?: CSSProperties;
}
declare const Buttons: _$react.ForwardRefExoticComponent<ButtonsProps & _$react.RefAttributes<HTMLDivElement>>;
//#endregion
//#region src/components/Calendar/Calendar.d.ts
type CalendarProps = React$1.ComponentProps<typeof DayPicker>;
declare const Calendar: React$1.ForwardRefExoticComponent<_$react_day_picker0.DayPickerProps & React$1.RefAttributes<HTMLDivElement>>;
//#endregion
//#region src/components/Callout/Callout.d.ts
type CalloutVariant = "info" | "danger" | "warning" | "success" | "neutral";
interface CalloutProps extends Omit<React$1.HTMLAttributes<HTMLDivElement>, "title"> {
  variant?: CalloutVariant;
  title?: React$1.ReactNode;
  description?: React$1.ReactNode;
  /** Auto-dismiss after N milliseconds. CSS-only fade + collapse. */
  duration?: number;
}
declare const Callout: React$1.ForwardRefExoticComponent<CalloutProps & React$1.RefAttributes<HTMLDivElement>>;
//#endregion
//#region src/components/Card/Card.d.ts
type CardVariant = "clear" | "card" | "sunk";
type CardWidth = "standard" | "full";
interface CardProps extends React$1.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  width?: CardWidth;
}
declare const Card: React$1.ForwardRefExoticComponent<CardProps & React$1.RefAttributes<HTMLDivElement>>;
//#endregion
//#region src/components/CardHeader/CardHeader.d.ts
interface CardHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  icon?: ReactNode;
  title?: ReactNode;
  subtitle?: ReactNode;
  actions?: ReactElement<ButtonProps | IconButtonProps> | ReactElement<ButtonProps | IconButtonProps>[];
  className?: string;
  styles?: CSSProperties;
}
declare const CardHeader: _$react.ForwardRefExoticComponent<CardHeaderProps & _$react.RefAttributes<HTMLDivElement>>;
//#endregion
//#region src/components/Carousel/Carousel.d.ts
interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  itemsToScroll?: number;
  noSnap?: boolean;
  showButtons?: boolean;
  variant?: "card" | "sunk";
  onScrollLeftEnabled?: (enabled: boolean) => void;
  onScrollRightEnabled?: (enabled: boolean) => void;
}
interface CarouselRef {
  scroll: (direction: "left" | "right") => void;
  scrollDivRef: React.RefObject<HTMLDivElement | null>;
}
declare const Carousel: _$react.ForwardRefExoticComponent<CarouselProps & _$react.RefAttributes<CarouselRef>>;
declare const CarouselContent: _$react.ForwardRefExoticComponent<_$react.HTMLAttributes<HTMLDivElement> & _$react.RefAttributes<HTMLDivElement>>;
declare const CarouselItem: _$react.ForwardRefExoticComponent<_$react.HTMLAttributes<HTMLDivElement> & _$react.RefAttributes<HTMLDivElement>>;
declare const CarouselPrevious: _$react.ForwardRefExoticComponent<Omit<IconButtonProps & _$react.RefAttributes<HTMLButtonElement>, "ref"> & _$react.RefAttributes<HTMLButtonElement>>;
declare const CarouselNext: _$react.ForwardRefExoticComponent<Omit<IconButtonProps & _$react.RefAttributes<HTMLButtonElement>, "ref"> & _$react.RefAttributes<HTMLButtonElement>>;
//#endregion
//#region src/components/Charts/types/XAxisTicks.d.ts
type XAxisTickVariant = "singleLine" | "multiLine";
//#endregion
//#region src/components/Charts/utils/PalletUtils.d.ts
type PaletteName = "ocean" | "orchid" | "emerald" | "spectrum" | "sunset" | "vivid";
//#endregion
//#region src/components/Charts/AreaChart/types/index.d.ts
type AreaChartVariant = "linear" | "natural" | "step";
type AreaChartData = Array<Record<string, string | number>>;
//#endregion
//#region src/components/Charts/AreaChart/AreaChart.d.ts
interface AreaChartProps<T extends AreaChartData> {
  data: T;
  categoryKey: keyof T[number];
  theme?: PaletteName;
  customPalette?: string[];
  variant?: AreaChartVariant;
  tickVariant?: XAxisTickVariant;
  grid?: boolean;
  legend?: boolean;
  icons?: Partial<Record<keyof T[number], React$1.ComponentType>>;
  isAnimationActive?: boolean;
  showYAxis?: boolean;
  xAxisLabel?: React$1.ReactNode;
  yAxisLabel?: React$1.ReactNode;
  className?: string;
  height?: number;
  width?: number;
}
declare const AreaChartComponent: <T extends AreaChartData>({
  data,
  categoryKey,
  theme,
  customPalette,
  variant: areaChartVariant,
  tickVariant,
  grid,
  icons,
  isAnimationActive,
  showYAxis,
  xAxisLabel,
  yAxisLabel,
  legend,
  className,
  height,
  width
}: AreaChartProps<T>) => React$1.JSX.Element;
declare const AreaChart: typeof AreaChartComponent;
//#endregion
//#region src/components/Charts/shared/SVGXAxisTick/SVGXAxisTick.d.ts
type SVGXAxisTickVariant = "singleLine" | "angled";
//#endregion
//#region src/components/Charts/AreaChartCondensed/AreaChartCondensed.d.ts
interface AreaChartCondensedProps<T extends AreaChartData> {
  data: T;
  categoryKey: keyof T[number];
  theme?: PaletteName;
  customPalette?: string[];
  variant?: AreaChartVariant;
  tickVariant?: SVGXAxisTickVariant;
  grid?: boolean;
  icons?: Partial<Record<keyof T[number], React$1.ComponentType>>;
  isAnimationActive?: boolean;
  showYAxis?: boolean;
  xAxisLabel?: React$1.ReactNode;
  yAxisLabel?: React$1.ReactNode;
  legend?: boolean;
  className?: string;
  height?: number;
  width?: number;
}
declare const AreaChartCondensedComponent: <T extends AreaChartData>({
  data,
  categoryKey,
  theme,
  customPalette,
  variant: areaChartVariant,
  tickVariant,
  grid,
  icons,
  isAnimationActive,
  showYAxis,
  xAxisLabel,
  yAxisLabel,
  legend,
  className,
  height,
  width
}: AreaChartCondensedProps<T>) => React$1.JSX.Element;
declare const AreaChartCondensed: typeof AreaChartCondensedComponent;
//#endregion
//#region src/components/Charts/BarChart/types/index.d.ts
type BarChartVariant = "grouped" | "stacked";
type BarChartData = Array<Record<string, string | number>>;
//#endregion
//#region src/components/Charts/BarChart/BarChart.d.ts
interface BarChartProps<T extends BarChartData> {
  data: T;
  categoryKey: keyof T[number];
  theme?: PaletteName;
  customPalette?: string[];
  variant?: BarChartVariant;
  tickVariant?: XAxisTickVariant;
  grid?: boolean;
  radius?: number;
  icons?: Partial<Record<keyof T[number], React$1.ComponentType>>;
  isAnimationActive?: boolean;
  showYAxis?: boolean;
  xAxisLabel?: React$1.ReactNode;
  yAxisLabel?: React$1.ReactNode;
  legend?: boolean;
  className?: string;
  height?: number;
  width?: number;
}
declare const BarChartComponent: <T extends BarChartData>({
  data,
  categoryKey,
  theme,
  customPalette,
  variant,
  tickVariant,
  grid,
  icons,
  radius,
  isAnimationActive,
  showYAxis,
  xAxisLabel,
  yAxisLabel,
  legend,
  className,
  height,
  width
}: BarChartProps<T>) => React$1.JSX.Element;
declare const BarChart: typeof BarChartComponent;
//#endregion
//#region src/components/Charts/BarChartCondensed/BarChartCondensed.d.ts
interface BarChartCondensedProps<T extends BarChartData> {
  data: T;
  categoryKey: keyof T[number];
  theme?: PaletteName;
  customPalette?: string[];
  variant?: BarChartVariant;
  tickVariant?: SVGXAxisTickVariant;
  grid?: boolean;
  radius?: number;
  icons?: Partial<Record<keyof T[number], React$1.ComponentType>>;
  isAnimationActive?: boolean;
  showYAxis?: boolean;
  xAxisLabel?: React$1.ReactNode;
  yAxisLabel?: React$1.ReactNode;
  legend?: boolean;
  className?: string;
  height?: number;
  width?: number;
  /** Maximum bar width in pixels. Prevents bars from becoming too wide. Default: 12 */
  maxBarWidth?: number;
}
declare const BarChartCondensedComponent: <T extends BarChartData>({
  data,
  categoryKey,
  theme,
  customPalette,
  variant,
  tickVariant,
  grid,
  icons,
  radius,
  isAnimationActive,
  showYAxis,
  xAxisLabel,
  yAxisLabel,
  legend,
  className,
  height,
  width,
  maxBarWidth
}: BarChartCondensedProps<T>) => React$1.JSX.Element;
declare const BarChartCondensed: typeof BarChartCondensedComponent;
//#endregion
//#region src/components/Charts/HorizontalBarChart/types/index.d.ts
type HorizontalBarChartVariant = "grouped" | "stacked";
type HorizontalBarChartData = Array<Record<string, string | number>>;
//#endregion
//#region src/components/Charts/HorizontalBarChart/HorizontalBarChart.d.ts
interface HorizontalBarChartProps<T extends HorizontalBarChartData> {
  data: T;
  categoryKey: keyof T[number];
  theme?: PaletteName;
  customPalette?: string[];
  variant?: HorizontalBarChartVariant;
  grid?: boolean;
  radius?: number;
  icons?: Partial<Record<keyof T[number], React$1.ComponentType>>;
  isAnimationActive?: boolean;
  showXAxis?: boolean;
  xAxisLabel?: React$1.ReactNode;
  yAxisLabel?: React$1.ReactNode;
  legend?: boolean;
  className?: string;
  height?: number;
  width?: number;
}
declare const HorizontalBarChartComponent: <T extends HorizontalBarChartData>({
  data,
  categoryKey,
  theme,
  customPalette,
  variant,
  grid,
  icons,
  radius,
  isAnimationActive,
  showXAxis,
  xAxisLabel,
  yAxisLabel,
  legend,
  className,
  height,
  width
}: HorizontalBarChartProps<T>) => React$1.JSX.Element;
declare const HorizontalBarChart: typeof HorizontalBarChartComponent;
//#endregion
//#region src/components/Charts/LineChart/types/index.d.ts
type LineChartData = Array<Record<string, string | number>>;
type LineChartVariant = "linear" | "natural" | "step";
//#endregion
//#region src/components/Charts/LineChart/LineChart.d.ts
interface LineChartProps<T extends LineChartData> {
  data: T;
  categoryKey: keyof T[number];
  theme?: PaletteName;
  customPalette?: string[];
  variant?: LineChartVariant;
  tickVariant?: XAxisTickVariant;
  grid?: boolean;
  legend?: boolean;
  icons?: Partial<Record<keyof T[number], React$1.ComponentType>>;
  isAnimationActive?: boolean;
  showYAxis?: boolean;
  xAxisLabel?: React$1.ReactNode;
  yAxisLabel?: React$1.ReactNode;
  className?: string;
  height?: number;
  width?: number;
  strokeWidth?: number;
}
declare const LineChart: <T extends LineChartData>({
  data,
  categoryKey,
  theme,
  customPalette,
  variant: lineChartVariant,
  tickVariant,
  grid,
  icons,
  isAnimationActive,
  showYAxis,
  xAxisLabel,
  yAxisLabel,
  legend,
  className,
  height,
  width,
  strokeWidth
}: LineChartProps<T>) => React$1.JSX.Element;
//#endregion
//#region src/components/Charts/LineChartCondensed/LineChartCondensed.d.ts
interface LineChartCondensedProps<T extends LineChartData> {
  data: T;
  categoryKey: keyof T[number];
  theme?: PaletteName;
  customPalette?: string[];
  variant?: LineChartVariant;
  tickVariant?: SVGXAxisTickVariant;
  grid?: boolean;
  icons?: Partial<Record<keyof T[number], React$1.ComponentType>>;
  isAnimationActive?: boolean;
  showYAxis?: boolean;
  xAxisLabel?: React$1.ReactNode;
  yAxisLabel?: React$1.ReactNode;
  legend?: boolean;
  className?: string;
  height?: number;
  width?: number;
  strokeWidth?: number;
}
declare const LineChartCondensedComponent: <T extends LineChartData>({
  data,
  categoryKey,
  theme,
  customPalette,
  variant: lineChartVariant,
  tickVariant,
  grid,
  icons,
  isAnimationActive,
  showYAxis,
  xAxisLabel,
  yAxisLabel,
  legend,
  className,
  height,
  width,
  strokeWidth
}: LineChartCondensedProps<T>) => React$1.JSX.Element;
declare const LineChartCondensed: typeof LineChartCondensedComponent;
//#endregion
//#region src/components/Charts/MiniAreaChart/types/index.d.ts
type MiniAreaChartData = Array<number> | Array<{
  value: number;
  label?: string;
}>;
//#endregion
//#region src/components/Charts/MiniAreaChart/MiniAreaChart.d.ts
interface MiniAreaChartProps {
  data: MiniAreaChartData;
  theme?: PaletteName;
  customPalette?: string[];
  variant?: AreaChartVariant;
  opacity?: number;
  isAnimationActive?: boolean;
  onAreaClick?: (data: any) => void;
  size?: number | string;
  className?: string;
  areaColor?: string;
  useGradient?: boolean;
}
declare const MiniAreaChart: ({
  data,
  theme,
  customPalette,
  variant: areaChartVariant,
  opacity,
  isAnimationActive,
  onAreaClick,
  size,
  className,
  areaColor,
  useGradient
}: MiniAreaChartProps) => _$react.JSX.Element;
//#endregion
//#region src/components/Charts/MiniBarChart/types/index.d.ts
type MiniBarChartData = Array<number> | Array<{
  value: number;
  label?: string;
}>;
//#endregion
//#region src/components/Charts/MiniBarChart/MiniBarChart.d.ts
interface MiniBarChartProps {
  data: MiniBarChartData;
  theme?: PaletteName;
  customPalette?: string[];
  radius?: number;
  isAnimationActive?: boolean;
  onBarsClick?: (data: any) => void;
  size?: number | string;
  className?: string;
  barColor?: string;
}
declare const MiniBarChart: ({
  data,
  theme,
  customPalette,
  radius,
  isAnimationActive,
  onBarsClick,
  size,
  className,
  barColor
}: MiniBarChartProps) => _$react.JSX.Element;
//#endregion
//#region src/components/Charts/MiniLineChart/types/index.d.ts
type MiniLineChartData = Array<number> | Array<{
  value: number;
  label?: string;
}>;
//#endregion
//#region src/components/Charts/MiniLineChart/MiniLineChart.d.ts
interface MiniLineChartProps {
  data: MiniLineChartData;
  theme?: PaletteName;
  customPalette?: string[];
  variant?: LineChartVariant;
  strokeWidth?: number;
  isAnimationActive?: boolean;
  onLineClick?: (data: any) => void;
  size?: number | string;
  className?: string;
  lineColor?: string;
}
declare const MiniLineChart: ({
  data,
  theme,
  customPalette,
  variant: lineChartVariant,
  strokeWidth,
  isAnimationActive,
  onLineClick,
  size,
  className,
  lineColor
}: MiniLineChartProps) => _$react.JSX.Element;
//#endregion
//#region src/components/Charts/PieChart/types/index.d.ts
type PieChartData = Array<Record<string, string | number>>;
//#endregion
//#region src/components/Charts/PieChart/PieChart.d.ts
interface PieChartProps<T extends PieChartData> {
  data: T;
  categoryKey: keyof T[number];
  dataKey: keyof T[number];
  theme?: PaletteName;
  customPalette?: string[];
  variant?: "pie" | "donut";
  format?: "percentage" | "number";
  legend?: boolean;
  legendVariant?: "default" | "stacked";
  isAnimationActive?: boolean;
  appearance?: "circular" | "semiCircular";
  cornerRadius?: number;
  paddingAngle?: number;
  onMouseEnter?: (data: any, index: number) => void;
  onMouseLeave?: () => void;
  onClick?: (data: any, index: number) => void;
  className?: string;
  maxChartSize?: number;
  minChartSize?: number;
  height?: number | string;
  width?: number | string;
}
declare const PieChart: _$react.MemoExoticComponent<(<T extends PieChartData>({
  data,
  categoryKey,
  dataKey,
  theme,
  customPalette,
  variant,
  format,
  legend,
  legendVariant,
  isAnimationActive,
  appearance,
  cornerRadius,
  paddingAngle,
  onMouseEnter,
  onMouseLeave,
  onClick,
  className,
  maxChartSize,
  minChartSize,
  height,
  width
}: PieChartProps<T>) => _$react.JSX.Element)>;
//#endregion
//#region src/components/Charts/RadarChart/types/index.d.ts
type RadarChartData = Array<Record<string, string | number>>;
//#endregion
//#region src/components/Charts/RadarChart/RadarChart.d.ts
interface RadarChartProps<T extends RadarChartData> {
  data: T;
  categoryKey: keyof T[number];
  theme?: "ocean" | "orchid" | "emerald" | "sunset" | "spectrum" | "vivid";
  customPalette?: string[];
  variant?: "line" | "area";
  grid?: boolean;
  legend?: boolean;
  strokeWidth?: number;
  areaOpacity?: number;
  icons?: Partial<Record<keyof T[number], React$1.ComponentType>>;
  isAnimationActive?: boolean;
  height?: number;
  width?: number;
}
declare const RadarChart: React$1.MemoExoticComponent<(<T extends RadarChartData>({
  data,
  categoryKey,
  theme,
  customPalette,
  variant,
  grid,
  legend,
  strokeWidth,
  areaOpacity,
  icons,
  isAnimationActive,
  height,
  width
}: RadarChartProps<T>) => React$1.JSX.Element)>;
//#endregion
//#region src/components/Charts/RadialChart/types/index.d.ts
type RadialChartData = Array<Record<string, string | number>>;
//#endregion
//#region src/components/Charts/RadialChart/RadialChart.d.ts
interface RadialChartProps<T extends RadialChartData> {
  data: T;
  categoryKey: keyof T[number];
  dataKey: keyof T[number];
  theme?: PaletteName;
  customPalette?: string[];
  variant?: "semicircle" | "circular";
  format?: "percentage" | "number";
  legend?: boolean;
  legendVariant?: "default" | "stacked";
  grid?: boolean;
  isAnimationActive?: boolean;
  cornerRadius?: number;
  onMouseEnter?: (data: any, index: number) => void;
  onMouseLeave?: () => void;
  onClick?: (data: any, index: number) => void;
  className?: string;
  maxChartSize?: number;
  minChartSize?: number;
  height?: number | string;
  width?: number | string;
}
declare const RadialChart: <T extends RadialChartData>({
  data,
  categoryKey,
  dataKey,
  theme,
  customPalette,
  variant,
  format,
  legend,
  legendVariant,
  grid,
  isAnimationActive,
  cornerRadius,
  onMouseEnter,
  onMouseLeave,
  onClick,
  className,
  maxChartSize,
  minChartSize,
  height,
  width
}: RadialChartProps<T>) => _$react.JSX.Element;
//#endregion
//#region src/components/Charts/ScatterChart/types/index.d.ts
interface ScatterPoint {
  x: number;
  y: number;
  z?: number;
  [key: string]: string | number | undefined;
}
interface ScatterDataset {
  name: string;
  data: ScatterPoint[];
}
type ScatterChartData = ScatterDataset[];
//#endregion
//#region src/components/Charts/ScatterChart/ScatterChart.d.ts
interface ScatterChartProps {
  data: ScatterChartData;
  xAxisDataKey?: string;
  yAxisDataKey?: string;
  theme?: PaletteName;
  customPalette?: string[];
  grid?: boolean;
  legend?: boolean;
  isAnimationActive?: boolean;
  xAxisLabel?: React$1.ReactNode;
  yAxisLabel?: React$1.ReactNode;
  className?: string;
  height?: number | string;
  width?: number | string;
  shape?: "circle" | "square";
}
declare const ScatterChart: ({
  data,
  xAxisDataKey,
  yAxisDataKey,
  theme,
  customPalette,
  grid,
  xAxisLabel,
  yAxisLabel,
  legend,
  isAnimationActive,
  className,
  height,
  width,
  shape
}: ScatterChartProps) => React$1.JSX.Element;
//#endregion
//#region src/components/Charts/ScatterChart/utils/ScatterChartUtils.d.ts
/**
 * Extracts dataset names from scatter chart data
 * @param data - The scatter chart data (array of datasets)
 * @returns Array of dataset names
 */
declare const getScatterDatasets: (data: ScatterChartData) => string[];
/**
 * Transforms scatter chart data for recharts consumption
 * @param data - The scatter chart data (array of datasets)
 * @param datasets - Array of dataset names to include
 * @param colors - Array of colors for datasets
 * @returns Flattened array of all points with color and dataset info
 */
declare const transformScatterData: (data: ScatterChartData, datasets: string[], colors: string[]) => (ScatterPoint & {
  color: string;
  dataset: string;
})[];
/**
 * Calculates the domain for scatter chart axes
 * @param data - The scatter chart data (array of datasets)
 * @param axis - Which axis ('x' or 'y')
 * @returns Domain array [min, max] with padding
 */
declare const calculateScatterDomain: (data: ScatterChartData, axis: "x" | "y") => [number, number];
/**
 * Formats scatter chart data for tooltip display
 * @param dataKey - The data key being displayed
 * @param value - The value to format
 * @param unit - Optional unit to append
 * @returns Formatted string
 */
declare const formatScatterTooltipValue: (value: number | string, unit?: string) => string;
//#endregion
//#region src/components/Charts/SingleStackedBarChart/types/index.d.ts
type SingleStackedBarData = Array<Record<string, string | number>>;
//#endregion
//#region src/components/Charts/SingleStackedBarChart/SingleStackedBarChart.d.ts
interface SingleStackedBarProps<T extends SingleStackedBarData> {
  data: T;
  categoryKey: keyof T[number];
  dataKey: keyof T[number];
  theme?: PaletteName;
  customPalette?: string[];
  legend?: boolean;
  legendVariant?: "default" | "stacked";
  className?: string;
  style?: React.CSSProperties;
  animated?: boolean;
}
declare const SingleStackedBar: <T extends SingleStackedBarData>({
  data,
  categoryKey,
  dataKey,
  theme,
  customPalette,
  legend,
  legendVariant,
  className,
  style,
  animated
}: SingleStackedBarProps<T>) => _$react.JSX.Element;
//#endregion
//#region src/components/Charts/Charts.d.ts
/**
 * Data structure for chart export (e.g., to PPTX)
 */
type ExportChartData = {
  type: "line" | "bar" | "area" | "pie" | "radar" | "scatter";
  data: {
    name: string;
    labels?: string[];
    values?: number[];
    x?: number[];
    y?: number[];
  }[];
  options?: {
    chartColors?: string[];
    showLegend?: boolean;
    legendPos?: "b" | "t" | "l" | "r";
    title?: string;
    showTitle?: boolean;
    catAxisTitle?: string;
    showCatAxisTitle?: boolean;
    valAxisTitle?: string;
    showValAxisTitle?: boolean;
    lineSize?: number;
    barDir?: "bar" | "col";
    barGrouping?: "stacked" | "clustered" | "percent" | "standard";
  };
};
//#endregion
//#region src/components/CheckBoxItem/CheckBoxItem.d.ts
interface CheckBoxItemProps {
  label?: ReactNode;
  description?: ReactNode;
  className?: string;
  style?: CSSProperties;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  value?: string;
  onChange?: (checked: boolean) => void;
}
declare const CheckBoxItem: _$react.ForwardRefExoticComponent<CheckBoxItemProps & _$react.RefAttributes<HTMLButtonElement>>;
//#endregion
//#region src/components/CheckBoxGroup/CheckBoxGroup.d.ts
type CheckBoxGroupVariant = "clear" | "card" | "sunk";
interface CheckBoxGroupProps {
  children: React$1.ReactElement<CheckBoxItemProps> | React$1.ReactElement<CheckBoxItemProps>[];
  className?: string;
  style?: React$1.CSSProperties;
  variant?: CheckBoxGroupVariant;
}
declare const CheckBoxGroup: React$1.ForwardRefExoticComponent<CheckBoxGroupProps & React$1.RefAttributes<HTMLDivElement>>;
//#endregion
//#region src/components/Chips/Chips.d.ts
type ChipsSelectionType = "single" | "multiple";
interface ChipsItem {
  value: string;
  label: string;
  icon?: ReactNode;
  disabled?: boolean;
}
interface ChipsProps extends Omit<HTMLAttributes<HTMLDivElement>, "onToggle"> {
  items: ChipsItem[];
  /** Currently selected item values. */
  selected?: string[];
  type?: ChipsSelectionType;
  /** Disables every chip (e.g. while streaming). */
  disabled?: boolean;
  onToggle?: (value: string) => void;
  className?: string;
}
declare const Chips: _$react.ForwardRefExoticComponent<ChipsProps & _$react.RefAttributes<HTMLDivElement>>;
//#endregion
//#region src/components/Sources/SourceContext.d.ts
declare const CardSourceSchema: z.ZodObject<{
  url: z.ZodOptional<z.ZodString>;
  title: z.ZodString;
  sourceName: z.ZodString;
}, z.core.$strip>;
type CardSource = z.infer<typeof CardSourceSchema>;
interface SourceWithFavicon extends CardSource {
  faviconUrl: string;
  key?: Key;
}
declare const openSourceInNewTab: (url?: string) => void;
/**
 * React context that provides enriched source data to child components.
 * Contains sources with favicon URLs, source IDs, and validation status.
 */
declare const CardSourceContext: _$react.Context<SourceWithFavicon[] | undefined>;
/**
 * Returns the favicon URL for a given website using Google's favicon service.
 *
 * Attempts to parse the provided URL string and extract the hostname (domain).
 * If parsing succeeds, returns a URL (with size 128) from Google's s2/favicons API.
 * If the URL is invalid or parsing fails, returns an empty string.
 */
declare const getFaviconUrl: (url?: string) => string;
/**
 * Context provider that enriches sources with favicon URLs.
 * Generates favicon URLs from Google's service for each source.
 */
declare const CardSourceProvider: ({
  sources,
  children
}: {
  sources: CardSource[] | undefined;
  children: ReactNode;
}) => _$react.JSX.Element;
/**
 * Hook to access all enriched sources from CardSourceContext.
 * Returns array of SourceWithFavicon objects, or empty array if context unavailable.
 */
declare const useCardSourceContext: () => SourceWithFavicon[];
//#endregion
//#region src/components/Citation/Citation.d.ts
interface CitationProps {
  onClick?: () => void;
  sources: SourceWithFavicon[];
}
/**
 * Inline citation trigger: a small globe button that opens a pinnable tooltip
 * listing the cited sources.
 */
declare const Citation: _$react.MemoExoticComponent<(props: CitationProps) => _$react.JSX.Element | null>;
//#endregion
//#region src/components/Citation/CitationItem.d.ts
interface CitationItemProps extends SourceWithFavicon {
  onClick?: () => void;
}
declare const CitationItem: _$react.MemoExoticComponent<(props: CitationItemProps) => _$react.JSX.Element>;
//#endregion
//#region src/components/Citation/TextContentCitation.d.ts
type TextContentCitationProps = Omit<HTMLAttributes<HTMLSpanElement>, "children"> & {
  node?: {
    properties?: Record<string, unknown>;
  };
  children?: ReactNode;
};
declare const TextContentCitation: ({
  node,
  children,
  ...rest
}: TextContentCitationProps) => _$react.JSX.Element | null;
//#endregion
//#region src/components/CodeBlock/CodeBlock.d.ts
interface CodeBlockProps {
  language: string;
  codeString: string;
  theme?: {
    [key: string]: React.CSSProperties;
  };
}
declare const CodeBlock: ({
  language,
  codeString,
  theme
}: CodeBlockProps) => _$react.JSX.Element;
//#endregion
//#region src/components/CompositeCardBlock/CompositeCardBlock.d.ts
interface CompositeCardBlockItem {
  id?: string;
  header?: ReactNode;
  body?: ReactNode[];
  footer?: {
    price?: ReactNode;
    button?: ReactNode;
  };
}
interface CompositeCardProps {
  item: CompositeCardBlockItem;
  clickable?: boolean;
  onClick?: () => void;
  className?: string;
}
/** A bordered card with header, stacked body content and a price/button footer. */
declare const CompositeCard: _$react.ForwardRefExoticComponent<CompositeCardProps & _$react.RefAttributes<HTMLDivElement>>;
interface CompositeCardBlockProps {
  items: CompositeCardBlockItem[];
  layout?: "grid" | "carousel";
  responsive?: boolean;
  /** Overrides the CSS gap variable (numbers are treated as px). */
  gap?: number | string;
  /** Makes every card focusable/clickable; `onItemClick` receives the item index. */
  clickable?: boolean;
  onItemClick?: (index: number) => void;
  className?: string;
}
/** A two-per-row grid or carousel of CompositeCards. */
declare const CompositeCardBlock: _$react.ForwardRefExoticComponent<CompositeCardBlockProps & _$react.RefAttributes<HTMLDivElement>>;
//#endregion
//#region src/components/ContextCardBlock/ContextCardBlock.d.ts
type ContextCardBgColor = "gray" | "info" | "success" | "warning" | "danger";
interface ContextCardBlockItem {
  id?: string;
  /** Plain string renders as small title text; any other node (e.g. a Tag) renders in the tag slot. */
  title?: ReactNode;
  /** Inline markdown supported. */
  body?: string;
  bgColor?: ContextCardBgColor;
  bgImageSrc?: string;
  /** Alt text for the background image. */
  bgImageAlt?: string;
}
interface ContextCardProps {
  item: ContextCardBlockItem;
  clickable?: boolean;
  onClick?: () => void;
  className?: string;
}
/** A compact tinted card with a title (text or tag) and a bold markdown body. */
declare const ContextCard: _$react.ForwardRefExoticComponent<ContextCardProps & _$react.RefAttributes<HTMLDivElement>>;
interface ContextCardBlockProps {
  items: ContextCardBlockItem[];
  layout?: "grid" | "carousel";
  responsive?: boolean;
  /** Overrides the CSS gap variable (numbers are treated as px). */
  gap?: number | string;
  /** Makes every card focusable/clickable; `onItemClick` receives the item index. */
  clickable?: boolean;
  onItemClick?: (index: number) => void;
  className?: string;
}
/** A grid or carousel of ContextCards (uses the small card block layout). */
declare const ContextCardBlock: _$react.ForwardRefExoticComponent<ContextCardBlockProps & _$react.RefAttributes<HTMLDivElement>>;
//#endregion
//#region src/components/DatePicker/DatePicker.d.ts
interface DatePickerProps {
  mode?: "single" | "range";
  selectedSingleDate?: Date;
  selectedRangeDates?: DateRange;
  setSelectedSingleDate?: (date?: Date) => void;
  setSelectedRangeDates?: (range?: DateRange) => void;
  isOpen?: boolean;
  setIsOpen?: (isOpen: boolean) => void;
  className?: string;
  style?: React.CSSProperties;
}
declare const DatePicker: (props: DatePickerProps) => _$react.JSX.Element;
//#endregion
//#region src/components/DotMatrixLoader/DotMatrixLoader.d.ts
/**
 * Dot-matrix loader with a 5×5 default grid and a 4×4 compact grid. Two comet
 * trails orbit in lockstep — one clockwise around the perimeter, one
 * counterclockwise around the inner ring.
 */
type DotMatrixLoaderVariant = "default" | "compact";
declare const DotMatrixLoader: ({
  className,
  size,
  variant
}: {
  className?: string; /** Overrides the variant's total width/height in px. */
  size?: number;
  variant?: DotMatrixLoaderVariant;
}) => _$react.JSX.Element;
//#endregion
//#region src/components/EditableTable/base/components/CellTypes.d.ts
type EditableCellType = "text" | "number" | "date-single" | "select" | "url";
//#endregion
//#region src/components/EditableTable/EditableTable.d.ts
interface EditableTableRow {
  id: string;
  [key: string]: any;
}
interface EditableTableColumn {
  key: string;
  header: string;
  type?: EditableCellType;
  width?: number;
  /** Options for `select` type cells */
  options?: Array<{
    value: string;
    label: string;
  }>;
}
interface EditableTableProps {
  data: EditableTableRow[];
  columns: EditableTableColumn[];
  onDataChange?: (data: EditableTableRow[]) => void;
  className?: string;
}
/**
 * Spreadsheet-like editable grid built on @tanstack/react-table. Cells are
 * selected with a click / keyboard and edited inline according to the column
 * `type` (text, number, url, date-single, select).
 */
declare const EditableTable: React$1.ForwardRefExoticComponent<EditableTableProps & React$1.RefAttributes<HTMLDivElement>>;
interface EditableTableChangesBarProps {
  /** Number of cells changed since the last save/reset */
  changedCellCount: number;
  onReset?: () => void;
  onSave?: () => void;
  resetLabel?: string;
  saveLabel?: string;
  className?: string;
}
/**
 * Pending-changes summary bar shown beneath an EditableTable, with reset / save actions.
 * Renders nothing when `changedCellCount` is 0.
 */
declare const EditableTableChangesBar: ({
  changedCellCount,
  onReset,
  onSave,
  resetLabel,
  saveLabel,
  className
}: EditableTableChangesBarProps) => React$1.JSX.Element | null;
//#endregion
//#region src/components/EntityList/EntityList.d.ts
interface EntityListRow {
  left: string;
  right: string;
  rightVariant?: "text" | "number";
}
type EntityListSize = "small" | "default";
interface EntityListProps {
  rows?: EntityListRow[];
  size?: EntityListSize;
  /** Only rendered when `size` is "default". */
  header?: EntityListRow;
  /** Only rendered when `size` is "default". */
  footer?: EntityListRow;
  className?: string;
}
/** A two-column key/value list with optional header and footer rows. */
declare const EntityList: _$react.ForwardRefExoticComponent<EntityListProps & _$react.RefAttributes<HTMLDivElement>>;
//#endregion
//#region src/components/FollowUpItem/FollowUpItem.d.ts
interface FollowUpItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: ReactNode;
  icon?: ReactNode;
  className?: string;
}
declare const FollowUpItem: _$react.ForwardRefExoticComponent<FollowUpItemProps & _$react.RefAttributes<HTMLButtonElement>>;
//#endregion
//#region src/components/FollowUpBlock/FollowUpBlock.d.ts
interface FollowUpBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactElement<FollowUpItemProps> | ReactElement<FollowUpItemProps>[];
  className?: string;
  style?: CSSProperties;
}
declare const FollowUpBlock: _$react.ForwardRefExoticComponent<FollowUpBlockProps & _$react.RefAttributes<HTMLDivElement>>;
//#endregion
//#region src/components/FormControl/FormControl.d.ts
interface FormControlProps {
  children: React$1.ReactNode;
  className?: string;
  style?: React$1.CSSProperties;
  hasError?: boolean;
}
declare const FormControl: React$1.ForwardRefExoticComponent<FormControlProps & React$1.RefAttributes<HTMLDivElement>>;
//#endregion
//#region src/components/FormControl/Hint/Hint.d.ts
interface HintProps extends React$1.ComponentPropsWithoutRef<"div"> {
  children: React$1.ReactNode;
  className?: string;
  style?: React$1.CSSProperties;
  hasError?: boolean;
}
declare const Hint: React$1.ForwardRefExoticComponent<HintProps & React$1.RefAttributes<HTMLDivElement>>;
//#endregion
//#region src/components/_shared/icons/IconWrapper.d.ts
type IconWrapperProps = {
  name: string;
  category?: string;
  size?: number;
  className?: string;
};
declare const IconWrapper: ({
  name,
  category,
  ...props
}: IconWrapperProps) => _$react.JSX.Element | null;
//#endregion
//#region src/components/_shared/icons/schema.d.ts
/**
 * The icon wire contract shared by every surface that embeds an `Icon`
 * (chat + dashboard `Icon` components). Field order is wire-load-bearing
 * (inv-lang binds positionally): `name` first, `category` second — never
 * reorder.
 *
 * Report/presentation blocks intentionally use a flat `iconName` field
 * instead (it shipped positionally before this schema existed here).
 */
declare const iconPropsSchema: z.ZodObject<{
  name: z.ZodString;
  category: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
type IconProps = z.infer<typeof iconPropsSchema>;
//#endregion
//#region src/components/IconTag/IconTag.d.ts
type IconTagSize = "xs" | "s" | "m" | "l" | "xl";
type IconTagVariant = "neutral" | "info" | "success" | "warning" | "danger" | "inverted";
interface IconTagProps {
  icon: IconProps;
  size?: IconTagSize;
  variant?: IconTagVariant;
  className?: string;
}
/** Small icon badge used inside card primitives. */
declare const IconTag: _$react.ForwardRefExoticComponent<IconTagProps & _$react.RefAttributes<HTMLDivElement>>;
//#endregion
//#region src/components/IconText/IconText.d.ts
type IconTextIconVariant = IconTagVariant | "filled" | "soft";
type IconTextLayout = "horizontal" | "vertical";
interface IconTextProps {
  icon: IconProps;
  title: string;
  subtitle?: string;
  iconVariant?: IconTextIconVariant;
  bold?: boolean;
  layout?: IconTextLayout;
  className?: string;
}
/** An icon badge beside (or above) a title with an optional subtitle. */
declare const IconText: _$react.ForwardRefExoticComponent<IconTextProps & _$react.RefAttributes<HTMLDivElement>>;
//#endregion
//#region src/components/Image/Image.d.ts
type AspectRatioType = "1:1" | "3:2" | "3:4" | "4:3" | "16:9";
type ScaleType = "fit" | "fill";
interface ImageProps extends React$1.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt?: string;
  styles?: React$1.CSSProperties;
  className?: string;
  aspectRatio?: AspectRatioType;
  scale?: ScaleType;
}
declare const Image: React$1.ForwardRefExoticComponent<ImageProps & React$1.RefAttributes<HTMLImageElement>>;
//#endregion
//#region src/components/ImageBlock/ImageBlock.d.ts
interface ImageBlockProps extends React$1.HTMLAttributes<HTMLDivElement> {
  src: string;
  alt?: string;
  imageLoading?: boolean;
}
declare const ImageBlock: React$1.ForwardRefExoticComponent<ImageBlockProps & React$1.RefAttributes<HTMLDivElement>>;
//#endregion
//#region src/components/ImageGallery/ImageGallery.d.ts
interface ImageItem {
  src: string;
  alt?: string;
  details?: string;
}
interface InvGalleryProps {
  images: ImageItem[];
}
declare const ImageGallery: React$1.FC<InvGalleryProps>;
//#endregion
//#region src/components/ImageGallery/GalleryModal.d.ts
interface GalleryModalProps {
  images: ImageItem[];
  selectedImageIndex: number;
  setSelectedImageIndex: (index: number) => void;
  onClose: () => void;
}
declare const GalleryModal: React$1.FC<GalleryModalProps>;
//#endregion
//#region src/components/ImageText/ImageText.d.ts
type ImageTextLayout = "horizontal" | "vertical";
interface ImageTextProps {
  title: string;
  subtitle?: string;
  src: string;
  alt?: string;
  bold?: boolean;
  layout?: ImageTextLayout;
  /** Square image size in px. Defaults to 40 for horizontal layout. */
  imageSize?: number;
  className?: string;
}
/** A small square image beside (or above) a title with an optional subtitle. */
declare const ImageText: _$react.ForwardRefExoticComponent<ImageTextProps & _$react.RefAttributes<HTMLDivElement>>;
//#endregion
//#region src/components/ImageTextLarge/ImageTextLarge.d.ts
interface ImageTextLargeProps {
  title: string;
  subtitle?: string;
  src: string;
  alt?: string;
  className?: string;
}
/** A full-width banner image above a bold title with an optional subtitle. */
declare const ImageTextLarge: _$react.ForwardRefExoticComponent<ImageTextLargeProps & _$react.RefAttributes<HTMLDivElement>>;
//#endregion
//#region src/components/InlineHeader/InlineHeader.d.ts
interface InlineHeaderProps {
  heading?: string;
  description?: string;
  className?: string;
}
declare const InlineHeader: ({
  heading,
  description,
  className
}: InlineHeaderProps) => _$react.JSX.Element | null;
//#endregion
//#region src/components/InlineMarkdownRenderer/InlineMarkdownRenderer.d.ts
interface InlineMarkdownRendererProps {
  content: string;
  className?: string;
}
/**
 * Lightweight markdown renderer for inline text (bold, italic, links, code).
 * Block-level elements (paragraphs, headings, lists) are flattened so the
 * output stays inline.
 */
declare const InlineMarkdownRenderer: _$react.MemoExoticComponent<({
  content,
  className
}: InlineMarkdownRendererProps) => _$react.JSX.Element | null>;
//#endregion
//#region src/components/Input/Input.d.ts
interface InputProps extends Omit<React$1.InputHTMLAttributes<HTMLInputElement>, "size"> {
  styles?: React$1.CSSProperties;
  className?: string;
  size?: "small" | "medium" | "large";
  hasError?: boolean;
}
declare const Input: React$1.ForwardRefExoticComponent<InputProps & React$1.RefAttributes<HTMLInputElement>>;
//#endregion
//#region src/components/Label/Label.d.ts
interface LabelProps extends React$1.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> {
  children: React$1.ReactNode;
  className?: string;
  style?: React$1.CSSProperties;
  disabled?: boolean;
  required?: boolean;
}
declare const Label: React$1.ForwardRefExoticComponent<LabelProps & React$1.RefAttributes<HTMLLabelElement>>;
//#endregion
//#region src/components/ListItem/ListItem.d.ts
type ListItemVariant = "icon" | "image" | "number";
type ListItemSize = "default" | "small";
interface ListItemProps {
  className?: string;
  style?: CSSProperties;
  title?: ReactNode;
  subtitle?: ReactNode;
  variant?: ListItemVariant;
  size?: ListItemSize;
  icon?: ReactNode;
  image?: {
    src?: string;
    alt: string;
  };
  index?: number;
  listHasSubtitle?: boolean;
  actionLabel?: ReactNode;
  actionIcon?: ReactNode;
  onClick?: () => void;
}
declare const ListItem: React$1.ForwardRefExoticComponent<ListItemProps & React$1.RefAttributes<HTMLDivElement>>;
//#endregion
//#region src/components/ListBlock/ListBlock.d.ts
interface ListBlockProps {
  /** Controls the indicator shown on every ListItem. Defaults to "number". */
  variant?: ListItemVariant;
  /** "small" tightens spacing and typography (used inside cards). Defaults to "default". */
  size?: ListItemSize;
  children: ReactElement<ListItemProps> | ReactElement<ListItemProps>[];
  className?: string;
  style?: CSSProperties;
}
declare const ListBlock: _$react.ForwardRefExoticComponent<ListBlockProps & _$react.RefAttributes<HTMLDivElement>>;
//#endregion
//#region src/components/MarkDownRenderer/MarkDownRenderer.d.ts
interface MarkDownRendererProps {
  variant?: "clear" | "card" | "sunk";
  textMarkdown: string;
  options?: Options;
  className?: string;
}
declare const MarkDownRenderer: _$react.MemoExoticComponent<(props: MarkDownRendererProps) => _$react.JSX.Element>;
//#endregion
//#region src/components/MetricIndicator/MetricIndicator.d.ts
interface MetricIndicatorTrend {
  direction: "up" | "down";
  value: number;
}
interface MetricIndicatorWithStrikethroughProps {
  value: string;
  subtext?: string;
  previousValue?: string;
  trend?: MetricIndicatorTrend;
  className?: string;
}
interface MetricIndicatorInlineProps {
  value: string;
  subtext?: string;
  trend?: MetricIndicatorTrend;
  className?: string;
}
/** A headline metric with an optional struck-through previous value, trend and subtext. */
declare const MetricIndicatorWithStrikethrough: _$react.ForwardRefExoticComponent<MetricIndicatorWithStrikethroughProps & _$react.RefAttributes<HTMLDivElement>>;
/** A headline metric with trend and subtext rendered on a single line. */
declare const MetricIndicatorInline: _$react.ForwardRefExoticComponent<MetricIndicatorInlineProps & _$react.RefAttributes<HTMLDivElement>>;
//#endregion
//#region src/components/ModelSwitcher/ModelSwitcher.d.ts
/** A single logo node, or a light/dark pair the switcher picks from by theme. */
type ModelLogo = ReactNode | {
  light: ReactNode;
  dark: ReactNode;
};
interface ModelOption {
  /** Unique id — the value the switcher reports through `onValueChange`. */
  id: string;
  /** Display name. */
  name: string;
  /** Optional section header this model is grouped under (e.g. a provider or "Free"). */
  group?: string;
  /** Optional chip label (e.g. "Free"). */
  badge?: string;
  /** Marks the model with a "Recommended" chip. */
  recommended?: boolean;
  /** Optional leading logo/icon — apps supply their own asset */
  logo?: ModelLogo;
}
interface ModelSwitcherProps {
  /** The models to choose from. Grouped by `group` in first-seen order. */
  models: ModelOption[];
  /** The selected model id. */
  value: string;
  /** Called with the newly selected model id. */
  onValueChange: (id: string) => void;
}
declare function ModelSwitcher({
  models,
  value,
  onValueChange
}: ModelSwitcherProps): _$react.JSX.Element;
//#endregion
//#region src/components/InvChat/GenUIUserMessage.d.ts
/**
 * Renders a user message, handling both plain text messages and
 * inline-formatted messages from form submissions.
 */
declare const GenUIUserMessage: ({
  message
}: {
  message: UserMessage;
}) => _$react.JSX.Element;
//#endregion
//#region src/components/InvChat/ShareThread.d.ts
/**
 * Props for {@link ShareThread}.
 *
 * @category Components
 */
interface ShareThreadProps {
  /** Async function that receives the threadId and returns a shareable URL. */
  generateShareLink: (threadId: string) => Promise<string>;
  /** Title for the share modal. Defaults to `"Share chat"`. */
  modalTitle?: string;
  /** Custom trigger element. When omitted, a default share button is rendered. */
  customTrigger?: ReactNode;
}
/**
 * Share button that opens a modal for generating and copying a shareable link.
 * Renders nothing when there are no messages to share.
 *
 * @category Components
 */
declare const ShareThread: {
  ({
    generateShareLink,
    modalTitle,
    customTrigger
  }: ShareThreadProps): React$1.JSX.Element | null;
  displayName: string;
};
//#endregion
//#region src/components/InvChat/ShareThreadModal.d.ts
/**
 * Props for {@link ShareThreadModal}.
 *
 * @category Components
 */
interface ShareThreadModalProps {
  /** Modal title. Defaults to `"Share chat"`. */
  title?: string;
  /** The trigger element that opens the modal. */
  trigger: ReactNode;
  /** Async function that returns a shareable URL. */
  generateLink: () => Promise<string>;
  /** Theme class name for portal targeting. */
  themeClassName?: string;
}
/**
 * Modal dialog for generating and copying a shareable link.
 *
 * @category Components
 */
declare const ShareThreadModal: _$react.ForwardRefExoticComponent<ShareThreadModalProps & _$react.RefAttributes<HTMLDivElement>>;
//#endregion
//#region src/components/_shared/types/index.d.ts
/**
 * Custom component for rendering assistant messages.
 * When provided, replaces the default assistant message rendering entirely
 * (including the container with avatar).
 *
 * @example
 * const MyAssistantMessage: AssistantMessageComponent = ({ message }) => (
 *   <div className="my-assistant-message">
 *     <ReactMarkdown>{message.content ?? ""}</ReactMarkdown>
 *   </div>
 * );
 */
type AssistantMessageComponent = React.ComponentType<{
  message: AssistantMessage;
  isStreaming: boolean;
}>;
/**
 * Custom component for rendering user messages.
 * When provided, replaces the default user message rendering entirely
 * (including the container).
 *
 * @example
 * const MyUserMessage: UserMessageComponent = ({ message }) => (
 *   <div className="my-user-message">
 *     {typeof message.content === "string" ? message.content : "..."}
 *   </div>
 * );
 */
type UserMessageComponent = React.ComponentType<{
  message: UserMessage;
}>;
//#endregion
//#region src/components/InvChat/types.d.ts
/**
 * Welcome message configuration for InvChat.
 *
 * Can be either:
 * - A custom React component that will be wrapped with WelcomeScreen for styling
 * - An object with title, description, and optional image
 *
 * @example
 * // Props-based configuration
 * const welcomeMessage: WelcomeMessageConfig = {
 *   title: "Hi, I'm AI Assistant",
 *   description: "I can help you with your questions.",
 *   image: { url: "/logo.png" }, // or a ReactNode for custom styling
 * };
 *
 * @example
 * // Custom component
 * const MyCustomWelcome = () => <div>Custom welcome content</div>;
 * const welcomeMessage: WelcomeMessageConfig = MyCustomWelcome;
 */
type WelcomeMessageConfig = React.ComponentType<any> | {
  /** Title text displayed in the welcome screen */title?: string; /** Description text displayed below the title */
  description?: string;
  /**
   * Image to display in the welcome screen.
   * - `{ url: string }` - Renders with default 64x64 size, rounded corners
   * - `ReactNode` - Full control over styling (e.g., `<img />`, `<Sparkles />`)
   */
  image?: {
    url: string;
  } | ReactNode;
};
/**
 * Configuration for conversation starters in InvChat.
 *
 * Conversation starters are clickable prompts shown when the thread is empty,
 * helping users begin a conversation with predefined options.
 *
 * @example
 * const starters: ConversationStartersConfig = {
 *   variant: "short", // "short" for pill buttons, "long" for list items
 *   options: [
 *     { displayText: "Help me get started", prompt: "Help me get started" },
 *     { displayText: "What can you do?", prompt: "What can you do?", icon: <Sparkles /> },
 *   ],
 * };
 */
interface ConversationStartersConfig {
  /**
   * Visual variant for the conversation starters.
   * - `"short"` - Pill-style buttons that wrap horizontally (default)
   * - `"long"` - Vertical list with separators and hover arrows
   */
  variant?: "short" | "long";
  /**
   * Array of conversation starter options.
   * Each option has displayText, prompt, and optional icon.
   */
  options: ConversationStarterProps[];
}
/**
 * Props passed to a custom composer component.
 */
type ComposerProps = {
  onSend: (message: string) => void;
  onCancel: () => void;
  isRunning: boolean;
  isLoadingMessages: boolean;
};
/**
 * Custom component for the message input area.
 * When provided, replaces the default composer entirely.
 */
type ComposerComponent = React.ComponentType<ComposerProps>;
/**
 * Shared UI props for the AgentInterface chat surface.
 */
interface SharedChatUIProps {
  logoUrl?: string;
  agentName?: string;
  showAssistantLogo?: boolean;
  messageLoading?: React.ComponentType;
  scrollVariant?: ScrollVariant;
  welcomeMessage?: WelcomeMessageConfig;
  conversationStarters?: ConversationStartersConfig;
  assistantMessage?: AssistantMessageComponent;
  userMessage?: UserMessageComponent;
  composer?: ComposerComponent;
  /**
   * Component library created via `createLibrary()` from `@inv/lang`.
   * When provided, assistant messages are rendered using the GenUI `Renderer`
   * instead of the default markdown renderer. If `assistantMessage` is also
   * provided, `assistantMessage` takes priority.
   */
  componentLibrary?: Library;
  /**
   * Async function that receives the selected threadId and returns a shareable URL.
   * When provided, a share button appears in the chat header.
   */
  generateShareLink?: (threadId: string) => Promise<string>;
}
//#endregion
//#region src/components/_shared/utils/safeUrl.d.ts
declare const safeUrl: (url: string | null | undefined) => string | undefined;
/**
 * The single allowed entry point for `window.open` in this package.
 *
 * - Validates the URL through `safeUrl` (rejects `javascript:`/`data:`/
 *   `vbscript:`/`file:` schemes, including control-char obfuscation).
 * - Defaults `target` to `_blank` and `features` to `noopener,noreferrer`
 *   to prevent reverse-tabnabbing.
 * - Returns the opened `Window`, or `null` if the URL was rejected or
 *   `window` is unavailable (SSR).
 *
 * Route every `window.open` call site through this util.
 */
declare const safeOpenUrl: (url: string | null | undefined, target?: string, features?: string) => Window | null;
//#endregion
//#region src/components/_shared/utils/index.d.ts
declare const isChatEmpty: ({
  isLoadingMessages,
  messages
}: {
  isLoadingMessages: boolean | undefined;
  messages: Message[];
}) => boolean;
//#endregion
//#region src/components/InvChat/utils/index.d.ts
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
declare const isWelcomeComponent: (config: WelcomeMessageConfig) => config is React.ComponentType<any>;
//#endregion
//#region src/components/OptionCards/OptionCards.d.ts
type OptionCardsSelectionType = "single" | "multiple";
interface OptionCardsItem {
  value: string;
  /** Inline markdown supported. */
  title: string;
  /** Inline markdown supported. */
  subtitle?: string;
  topContent?: ReactNode;
  /** Controls the top slot sizing: a small icon tile or a larger image tile. */
  topContentVariant?: "icon" | "image";
  disabled?: boolean;
}
interface OptionCardsProps extends Omit<HTMLAttributes<HTMLDivElement>, "onToggle"> {
  items: OptionCardsItem[];
  /** Currently selected item values. */
  selected?: string[];
  type?: OptionCardsSelectionType;
  /** Disables every card (e.g. while streaming). */
  disabled?: boolean;
  onToggle?: (value: string) => void;
  className?: string;
}
declare const OptionCards: _$react.ForwardRefExoticComponent<OptionCardsProps & _$react.RefAttributes<HTMLDivElement>>;
//#endregion
//#region src/components/OverviewCardBlock/OverviewCardBlock.d.ts
type OverviewCardBlockLayout = "grid" | "carousel";
interface OverviewCardBlockItem {
  id?: string;
  /** Top slot content (typically an IconText / ImageText / Text). */
  top?: ReactNode;
  /** Bottom metric rendered with MetricIndicatorInline. */
  bottom?: Omit<MetricIndicatorInlineProps, "className">;
}
interface OverviewCardBlockProps extends Omit<HTMLAttributes<HTMLDivElement>, "onClick"> {
  items: OverviewCardBlockItem[];
  layout?: OverviewCardBlockLayout;
  /** Collapses the grid / shrinks carousel cards on narrow containers. */
  responsive?: boolean;
  /** Overrides the gap between cards (px number or any CSS length). */
  gap?: number | string;
  /** Renders the cards as buttons and fires `onItemClick`. */
  clickable?: boolean;
  onItemClick?: (item: OverviewCardBlockItem, index: number) => void;
  className?: string;
}
declare const OverviewCardBlock: _$react.ForwardRefExoticComponent<OverviewCardBlockProps & _$react.RefAttributes<HTMLDivElement>>;
//#endregion
//#region src/components/RadioItem/RadioItem.d.ts
interface RadioItemProps {
  label?: ReactNode;
  description?: ReactNode;
  className?: string;
  style?: CSSProperties;
  disabled?: boolean;
  required?: boolean;
  value: string;
}
declare const RadioItem: _$react.ForwardRefExoticComponent<RadioItemProps & _$react.RefAttributes<HTMLButtonElement>>;
//#endregion
//#region src/components/RadioGroup/RadioGroup.d.ts
type RadioGroupVariant = "clear" | "card" | "sunk";
interface RadioGroupProps extends Radio.RadioGroupProps {
  children: ReactElement<RadioItemProps> | ReactElement<RadioItemProps>[];
  variant?: RadioGroupVariant;
  className?: string;
  style?: CSSProperties;
}
declare const RadioGroup: _$react.ForwardRefExoticComponent<RadioGroupProps & _$react.RefAttributes<HTMLDivElement>>;
//#endregion
//#region src/components/SectionBlock/FoldableSection.d.ts
type FoldableSectionRootProps = AccordionPrimitive.AccordionMultipleProps;
declare const FoldableSectionRoot: React$1.ForwardRefExoticComponent<AccordionPrimitive.AccordionMultipleProps & React$1.RefAttributes<HTMLDivElement>>;
interface FoldableSectionItemProps extends React$1.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item> {
  className?: string;
  style?: React$1.CSSProperties;
  value: string;
}
declare const FoldableSectionItem: React$1.ForwardRefExoticComponent<FoldableSectionItemProps & React$1.RefAttributes<HTMLDivElement>>;
interface FoldableSectionTriggerProps extends React$1.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> {
  className?: string;
  style?: React$1.CSSProperties;
  text: React$1.ReactNode;
}
declare const FoldableSectionTrigger: React$1.ForwardRefExoticComponent<FoldableSectionTriggerProps & React$1.RefAttributes<HTMLButtonElement>>;
interface FoldableSectionContentProps extends React$1.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content> {
  className?: string;
  style?: React$1.CSSProperties;
  children?: React$1.ReactNode;
}
declare const FoldableSectionContent: React$1.ForwardRefExoticComponent<FoldableSectionContentProps & React$1.RefAttributes<HTMLDivElement>>;
//#endregion
//#region src/components/SectionBlock/SectionV2.d.ts
interface SectionV2Props {
  trigger: string;
  children?: React$1.ReactNode;
}
declare const SectionV2: ({
  trigger,
  children
}: SectionV2Props) => React$1.JSX.Element;
//#endregion
//#region src/components/Select/Select.d.ts
type SelectSize = "sm" | "md" | "lg";
interface SelectProps extends React$1.ComponentPropsWithoutRef<typeof SelectPrimitive.Root> {
  size?: SelectSize;
}
declare const Select: ({
  size,
  ...props
}: SelectProps) => React$1.JSX.Element;
interface SelectGroupProps extends React$1.ComponentPropsWithoutRef<typeof SelectPrimitive.Group> {
  className?: string;
  style?: React$1.CSSProperties;
}
declare const SelectGroup: React$1.ForwardRefExoticComponent<SelectGroupProps & React$1.RefAttributes<HTMLDivElement>>;
declare const SelectValue: React$1.ForwardRefExoticComponent<SelectPrimitive.SelectValueProps & React$1.RefAttributes<HTMLSpanElement>>;
interface SelectTriggerProps extends React$1.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> {
  className?: string;
  style?: React$1.CSSProperties;
  children?: React$1.ReactNode;
  hideDropdownIcon?: boolean;
  size?: SelectSize;
}
declare const SelectTrigger: React$1.ForwardRefExoticComponent<SelectTriggerProps & React$1.RefAttributes<HTMLButtonElement>>;
interface SelectContentProps extends React$1.ComponentPropsWithoutRef<typeof SelectPrimitive.Content> {
  className?: string;
  style?: React$1.CSSProperties;
  children?: React$1.ReactNode;
  position?: "item-aligned" | "popper";
}
declare const SelectContent: React$1.ForwardRefExoticComponent<SelectContentProps & React$1.RefAttributes<HTMLDivElement>>;
interface SelectLabelProps extends React$1.ComponentPropsWithoutRef<typeof SelectPrimitive.Label> {
  className?: string;
  style?: React$1.CSSProperties;
}
declare const SelectLabel: React$1.ForwardRefExoticComponent<SelectLabelProps & React$1.RefAttributes<HTMLDivElement>>;
interface SelectItemProps extends React$1.ComponentPropsWithoutRef<typeof SelectPrimitive.Item> {
  className?: string;
  style?: React$1.CSSProperties;
  children?: React$1.ReactNode;
  textValue?: string;
  showTick?: boolean;
}
declare const SelectItem: React$1.ForwardRefExoticComponent<SelectItemProps & React$1.RefAttributes<HTMLDivElement>>;
interface SelectSeparatorProps extends React$1.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator> {
  className?: string;
  style?: React$1.CSSProperties;
}
declare const SelectSeparator: React$1.ForwardRefExoticComponent<SelectSeparatorProps & React$1.RefAttributes<HTMLDivElement>>;
//#endregion
//#region src/components/Separator/Separator.d.ts
declare const Separator: ({
  className,
  ...props
}: React.ComponentProps<typeof RadixSeparator.Root>) => _$react.JSX.Element;
//#endregion
//#region src/components/Skeleton/Skeleton.d.ts
declare function Skeleton({
  count,
  height,
  width,
  borderRadius,
  className
}: {
  count?: number;
  height?: string;
  width?: string;
  borderRadius?: string;
  className?: string;
}): _$react.JSX.Element;
declare function PieChartSkeleton({
  size,
  legendItems,
  variant,
  appearance
}: {
  size?: number;
  legendItems?: number;
  variant?: "pie" | "donut";
  appearance?: "circular" | "semiCircular";
}): _$react.JSX.Element;
declare function TableSkeleton({
  rows,
  columns
}: {
  rows?: number;
  columns?: number;
}): _$react.JSX.Element;
//#endregion
//#region src/components/Slider/Slider.d.ts
interface SliderProps extends Omit<React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>, "value" | "defaultValue"> {
  variant: "continuous" | "discrete";
  min: number;
  max: number;
  step?: number;
  disabled?: boolean;
  value?: number[];
  defaultValue?: number[];
  className?: string;
  style?: React.CSSProperties;
  leftContent?: ReactNode;
  rightContent?: ReactNode;
}
declare const Slider: _$react.ForwardRefExoticComponent<SliderProps & _$react.RefAttributes<HTMLSpanElement>>;
//#endregion
//#region src/components/Slider/SliderBlock.d.ts
interface SliderBlockProps extends Omit<SliderProps, "value" | "defaultValue"> {
  label: string;
  defaultValue?: number[];
  /** Props are still arriving; step-derived UI is suppressed until they settle. */
  isStreaming?: boolean;
}
declare const SliderBlock: (props: SliderBlockProps) => _$react.JSX.Element;
//#endregion
//#region src/components/SnippetCardBlock/SnippetCardBlock.d.ts
interface SnippetCardTooltip {
  heading?: string;
  content?: string;
}
interface SnippetCardBlockItem {
  id?: string;
  /** Left-hand content (typically an IconText / ImageText). */
  lhs: ReactNode;
  /** Right-hand value content (typically a Text / BoldText). Chevron is shown instead when clickable and absent. */
  rhs?: ReactNode;
  /** Tooltip shown when the lhs text is truncated. */
  lhsTooltip?: SnippetCardTooltip;
  /** Tooltip shown when the rhs text is truncated. */
  rhsTooltip?: SnippetCardTooltip;
}
interface SnippetCardBlockProps extends Omit<HTMLAttributes<HTMLDivElement>, "onClick"> {
  items: SnippetCardBlockItem[];
  /** Collapses the grid to 2 / 1 columns on narrow containers. */
  responsive?: boolean;
  /** Overrides the gap between cards (px number or any CSS length). */
  gap?: number | string;
  /** Renders the cards as buttons and fires `onItemClick`. */
  clickable?: boolean;
  onItemClick?: (item: SnippetCardBlockItem, index: number) => void;
  className?: string;
}
declare const SnippetCardBlock: _$react.ForwardRefExoticComponent<SnippetCardBlockProps & _$react.RefAttributes<HTMLDivElement>>;
//#endregion
//#region src/components/SourceFaviconImage/SourceFaviconImage.d.ts
interface SourceFaviconImageProps {
  height: number;
  width: number;
  url: string;
  alt: string;
}
/**
 * Favicon image with a globe-icon fallback. Google's favicon service returns a
 * 16x16 placeholder when it has nothing better, which is treated as a miss.
 */
declare const SourceFaviconImage: _$react.MemoExoticComponent<({
  height,
  width,
  url,
  alt
}: SourceFaviconImageProps) => _$react.JSX.Element>;
//#endregion
//#region src/components/Sources/ListedSources.d.ts
interface ListedSourcesProps {
  sources: SourceWithFavicon[];
}
declare const ListedSources: _$react.MemoExoticComponent<(props: ListedSourcesProps) => _$react.JSX.Element | null>;
//#endregion
//#region src/components/Sources/Sources.d.ts
/**
 * Renders the sources strip for the enclosing `CardSourceProvider`.
 * Returns null when there are no sources.
 */
declare const Sources: _$react.MemoExoticComponent<() => _$react.JSX.Element | null>;
//#endregion
//#region src/components/Sources/SourcesItem.d.ts
interface SourcesItemComponentProps extends SourceWithFavicon {
  onClick?: () => void;
  sourceId: number;
}
declare const ListedSourceItem: _$react.MemoExoticComponent<(props: SourcesItemComponentProps) => _$react.JSX.Element>;
//#endregion
//#region src/components/Steps/Steps.d.ts
interface StepsItemProps {
  title: React$1.ReactNode;
  details: React$1.ReactNode;
  number?: number;
}
interface StepsProps {
  children: React$1.ReactNode;
}
declare const Steps: React$1.FC<StepsProps>;
declare const StepsItem: React$1.FC<StepsItemProps>;
//#endregion
//#region src/components/SwitchItem/SwitchItem.d.ts
interface SwitchItemProps {
  label?: ReactNode;
  description?: ReactNode;
  className?: string;
  style?: CSSProperties;
  checked?: boolean;
  disabled?: boolean;
  defaultChecked?: boolean;
  required?: boolean;
  name?: string;
  value?: string;
  onChange?: (value: boolean) => void;
}
declare const SwitchItem: _$react.ForwardRefExoticComponent<SwitchItemProps & _$react.RefAttributes<HTMLButtonElement>>;
//#endregion
//#region src/components/SwitchGroup/SwitchGroup.d.ts
type SwitchGroupVariant = "clear" | "card" | "sunk";
interface SwitchGroupProps {
  children: ReactElement<SwitchItemProps> | ReactElement<SwitchItemProps>[];
  className?: string;
  style?: CSSProperties;
  variant?: SwitchGroupVariant;
}
declare const SwitchGroup: _$react.ForwardRefExoticComponent<SwitchGroupProps & _$react.RefAttributes<HTMLDivElement>>;
//#endregion
//#region src/components/Table/Table.d.ts
type TableAlignment = "left" | "center" | "right";
declare const Table: React$1.ForwardRefExoticComponent<React$1.HTMLAttributes<HTMLTableElement> & {
  containerRef?: React$1.RefObject<HTMLDivElement>;
  containerClassName?: string;
  containerStyle?: React$1.CSSProperties;
} & React$1.RefAttributes<HTMLTableElement>>;
declare const TableHeader: React$1.ForwardRefExoticComponent<React$1.HTMLAttributes<HTMLTableSectionElement> & React$1.RefAttributes<HTMLTableSectionElement>>;
declare const TableBody: React$1.ForwardRefExoticComponent<React$1.HTMLAttributes<HTMLTableSectionElement> & React$1.RefAttributes<HTMLTableSectionElement>>;
declare const TableFooter: React$1.ForwardRefExoticComponent<React$1.HTMLAttributes<HTMLTableSectionElement> & React$1.RefAttributes<HTMLTableSectionElement>>;
declare const TableRow: React$1.ForwardRefExoticComponent<React$1.HTMLAttributes<HTMLTableRowElement> & React$1.RefAttributes<HTMLTableRowElement>>;
interface TableHeadProps extends React$1.ThHTMLAttributes<HTMLTableCellElement> {
  icon?: React$1.ReactNode;
  align?: TableAlignment;
}
declare const TableHead: React$1.ForwardRefExoticComponent<TableHeadProps & React$1.RefAttributes<HTMLTableCellElement>>;
interface TableCellProps extends React$1.TdHTMLAttributes<HTMLTableCellElement> {
  align?: TableAlignment;
}
declare const TableCell: React$1.ForwardRefExoticComponent<TableCellProps & React$1.RefAttributes<HTMLTableCellElement>>;
interface ScrollableTableProps extends React$1.HTMLAttributes<HTMLTableElement> {
  containerClassName?: string;
  containerStyle?: React$1.CSSProperties;
}
declare const ScrollableTable: React$1.ForwardRefExoticComponent<ScrollableTableProps & React$1.RefAttributes<HTMLTableElement>>;
//#endregion
//#region src/components/Tabs/Tabs.d.ts
type TabsVariant = "clear";
interface TabsProps extends React$1.ComponentPropsWithoutRef<typeof TabsPrimitive.Root> {
  className?: string;
  style?: React$1.CSSProperties;
  variant?: TabsVariant;
}
declare const Tabs: React$1.ForwardRefExoticComponent<TabsProps & React$1.RefAttributes<HTMLDivElement>>;
type TabsListVariant = "title" | "iconTitle" | "iconTitleSubtext" | "imageTitle" | "imageTitleSubtext";
interface TabsListProps extends React$1.ComponentPropsWithoutRef<typeof TabsPrimitive.List> {
  className?: string;
  style?: React$1.CSSProperties;
  variant?: TabsListVariant;
}
declare const TabsList: React$1.ForwardRefExoticComponent<TabsListProps & React$1.RefAttributes<HTMLDivElement>>;
interface TabsTriggerProps extends React$1.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> {
  className?: string;
  style?: React$1.CSSProperties;
  value: string;
  icon?: React$1.ReactNode;
  text: React$1.ReactNode;
  subtext?: React$1.ReactNode;
  image?: string;
}
declare const TabsTrigger: React$1.ForwardRefExoticComponent<TabsTriggerProps & React$1.RefAttributes<HTMLButtonElement>>;
interface TabsContentProps extends React$1.ComponentPropsWithoutRef<typeof TabsPrimitive.Content> {
  className?: string;
  style?: React$1.CSSProperties;
  children?: React$1.ReactNode;
}
declare const TabsContent: React$1.ForwardRefExoticComponent<TabsContentProps & React$1.RefAttributes<HTMLDivElement>>;
//#endregion
//#region src/components/Tag/Tag.d.ts
type TagSize = "sm" | "md" | "lg";
type TagVariant = "neutral" | "info" | "success" | "warning" | "danger";
interface TagProps {
  className?: string;
  styles?: CSSProperties;
  icon?: ReactNode;
  text: ReactNode;
  size?: TagSize;
  variant?: TagVariant;
}
declare const Tag: _$react.ForwardRefExoticComponent<TagProps & _$react.RefAttributes<HTMLDivElement>>;
//#endregion
//#region src/components/TagBlock/TagBlock.d.ts
interface TagBlockProps {
  children: ReactElement<typeof Tag> | ReactElement<typeof Tag>[];
  styles?: CSSProperties;
  className?: string;
}
declare const TagBlock: _$react.ForwardRefExoticComponent<TagBlockProps & _$react.RefAttributes<HTMLDivElement>>;
//#endregion
//#region src/components/TextArea/TextArea.d.ts
interface TextAreaProps extends Omit<React$1.TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> {
  className?: string;
  placeholder?: string;
  rows?: number;
  hasError?: boolean;
}
declare const TextArea: React$1.ForwardRefExoticComponent<TextAreaProps & React$1.RefAttributes<HTMLTextAreaElement>>;
//#endregion
//#region src/components/TextBlock/TextBlock.d.ts
type TextBlockVariant = "title-text" | "number-title-text" | "text-subtext" | "highlight-text-number-subtext" | "text" | "highlight-text" | "number" | "highlight-number";
type TextBlockType = "text" | "number" | "textOnly";
type TextBlockSize = "xs" | "sm" | "md" | "lg";
type TextBlockAlign = "left" | "center" | "right";
type TextBlockSecondaryTone = "positive" | "negative";
interface TextBlockViewProps {
  primary: string;
  secondary?: string;
  tertiary?: string;
  variant?: TextBlockVariant;
  type?: TextBlockType;
  size?: TextBlockSize;
  align?: TextBlockAlign;
  secondaryMaxLines?: number;
  secondaryTone?: TextBlockSecondaryTone;
  className?: string;
}
/**
 * Low-level text primitive for card content: a primary line with optional
 * secondary/tertiary lines. `variant`, `size`, `type` and `align` control
 * emphasis, spacing and number styling.
 */
declare const TextBlockView: _$react.ForwardRefExoticComponent<TextBlockViewProps & _$react.RefAttributes<HTMLDivElement>>;
//#endregion
//#region src/components/TextCallout/TextCallout.d.ts
type TextCalloutVariant = "neutral" | "info" | "warning" | "success" | "danger";
interface TextCalloutProps extends Omit<React$1.HTMLAttributes<HTMLDivElement>, "title"> {
  variant?: TextCalloutVariant;
  title?: React$1.ReactNode;
  description?: React$1.ReactNode;
}
declare const TextCallout: React$1.ForwardRefExoticComponent<TextCalloutProps & React$1.RefAttributes<HTMLDivElement>>;
//#endregion
//#region src/components/TextContent/TextContent.d.ts
type TextContentVariant = "clear" | "card" | "sunk";
interface TextContentProps {
  children: ReactNode;
  variant?: TextContentVariant;
  className?: string;
  style?: CSSProperties;
}
declare const TextContent: (props: TextContentProps) => _$react.JSX.Element;
//#endregion
//#region src/components/TextContentWrapper/TextContentWrapper.d.ts
interface TextContentWrapperProps {
  textMarkdown: string;
  header?: {
    heading: string;
    description?: string;
  };
  variant?: "clear" | "card" | "sunk";
  className?: string;
}
/**
 * Full-featured markdown block for chat responses: GFM, math (KaTeX),
 * line breaks, and inline `[n]` citations resolved against the enclosing
 * `CardSourceProvider`.
 */
declare const TextContentWrapper: _$react.MemoExoticComponent<(props: TextContentWrapperProps) => _$react.JSX.Element>;
//#endregion
//#region src/components/ToolResult/ToolResult.d.ts
interface ToolResultProps {
  message: ToolMessage;
  /** The name of the tool that was called (resolved from the parent assistant message's toolCalls) */
  toolName?: string;
  className?: string;
}
declare const ToolResult: ({
  message,
  toolName,
  className
}: ToolResultProps) => _$react.JSX.Element;
//#endregion
//#region src/components/TooltipWrapper/TooltipWrapper.d.ts
interface TooltipWrapperProps {
  tooltipHeading?: string;
  tooltipContent?: string;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  sideOffset?: number;
  alignOffset?: number;
  className?: string;
  delayDuration?: number;
  showOnlyWhenTruncated?: boolean;
  headingSelector?: string;
  contentSelector?: string;
}
declare const TooltipWrapper: ({
  tooltipHeading,
  tooltipContent,
  children,
  className,
  side,
  align,
  sideOffset,
  alignOffset,
  delayDuration,
  showOnlyWhenTruncated,
  headingSelector,
  contentSelector
}: React$1.PropsWithChildren<TooltipWrapperProps>) => React$1.JSX.Element;
//#endregion
//#region src/components/VisualCardBlock/VisualCardBlock.d.ts
interface VisualCardBlockItem {
  id?: string;
  /** Rendered in the top-left slot (typically a Tag). */
  tag?: ReactNode;
  /** Rendered inside the bottom panel (typically bold text). */
  body?: ReactNode;
  bgImageSrc?: string;
  /** Alt text for the background image. */
  bgImageAlt?: string;
}
interface VisualCardProps {
  item: VisualCardBlockItem;
  clickable?: boolean;
  onClick?: () => void;
  className?: string;
}
/** A photo-first card: background image with gradient, a tag on top and a body panel at the bottom. */
declare const VisualCard: _$react.ForwardRefExoticComponent<VisualCardProps & _$react.RefAttributes<HTMLDivElement>>;
interface VisualCardBlockProps {
  items: VisualCardBlockItem[];
  layout?: "grid" | "carousel";
  responsive?: boolean;
  /** Overrides the CSS gap variable (numbers are treated as px). */
  gap?: number | string;
  /** Makes every card focusable/clickable; `onItemClick` receives the item index. */
  clickable?: boolean;
  onItemClick?: (index: number) => void;
  className?: string;
}
/** A three-per-row grid or carousel of VisualCards. */
declare const VisualCardBlock: _$react.ForwardRefExoticComponent<VisualCardBlockProps & _$react.RefAttributes<HTMLDivElement>>;
//#endregion
//#region src/genui-lib/prompt-options/index.d.ts
declare const invExamples: string[];
declare const invAdditionalRules: string[];
declare const invPromptOptions: PromptOptions;
declare const invChatExamples: string[];
declare const invChatAdditionalRules: string[];
declare const invChatPromptOptions: PromptOptions;
//#endregion
//#region src/genui-lib/invLibrary.d.ts
declare const invComponentGroups: ComponentGroup[];
declare const invLibrary: _$_invdev_react_lang0.Library;
//#endregion
//#region src/genui-lib/invChatLibrary.d.ts
declare const invChatComponentGroups: ComponentGroup[];
declare const invChatLibrary: _$_invdev_react_lang0.Library;
//#endregion
//#region src/context/LayoutContext.d.ts
declare const LayoutContext: _$react.Context<{
  layout: "mobile" | "fullscreen" | "tray" | "copilot";
}>;
declare const LayoutContextProvider: ({
  children,
  layout
}: {
  children: React.ReactNode;
  layout: "mobile" | "fullscreen" | "tray" | "copilot";
}) => _$react.JSX.Element;
declare const useLayoutContext: () => {
  layout: "mobile" | "fullscreen" | "tray" | "copilot";
};
//#endregion
//#region src/context/PrintContext.d.ts
type PrintContextType = {} | null;
declare const PrintContext: _$react.Context<PrintContextType>;
declare const usePrintContext: () => PrintContextType;
declare const PrintContextProvider: ({
  children
}: {
  children: React.ReactNode;
}) => _$react.JSX.Element;
//#endregion
export { Accordion, AccordionContent, AccordionContentProps, AccordionItem, AccordionItemProps, AccordionProps, AccordionTrigger, AccordionTriggerProps, AgentInterface, type AgentInterfaceComponents, type AgentInterfaceLabels, type AgentInterfaceProps, AreaChart, AreaChartCondensed, AreaChartCondensedProps, AreaChartData, AreaChartProps, AreaChartVariant, type Artifact, type ArtifactCategory, type ArtifactListParams, ArtifactNav, type ArtifactNavProps, type ArtifactRendererConfig, type ArtifactRendererControls, type ArtifactStorage, type ArtifactSummary, type AssistantMessageComponent, BarChart, BarChartCondensed, BarChartCondensedProps, BarChartData, BarChartProps, BarChartVariant, BehindTheScenes, type BehindTheScenesProps, BrandSwatchName, Button, ButtonProps, Buttons, ButtonsProps, CHART_PALETTE_KEYS, Calendar, CalendarProps, Callout, CalloutProps, Card, CardHeader, CardHeaderProps, CardProps, type CardSource, CardSourceContext, CardSourceProvider, CardSourceSchema, Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, CarouselProps, CarouselRef, ChartColorPalette, ChartPaletteKey, type ChatLLM, type ChatStorage, CheckBoxGroup, type CheckBoxGroupProps, CheckBoxItem, CheckBoxItemProps, Chips, ChipsItem, ChipsProps, ChipsSelectionType, Citation, CitationItem, type CitationItemProps, type CitationProps, CodeBlock, CodeBlockProps, Collapsible, ColorTheme, type ComposerComponent, type ComposerProps, CompositeCard, CompositeCardBlock, CompositeCardBlockItem, CompositeCardBlockProps, CompositeCardProps, ContextCard, ContextCardBgColor, ContextCardBlock, ContextCardBlockItem, ContextCardBlockProps, ContextCardProps, type ConversationStarterIcon, type ConversationStarterProps, type ConversationStarterVariant, type ConversationStartersConfig, DatePicker, DatePickerProps, DefaultToolCard, DetailedViewPanel$1 as DetailedViewPanel, type DetailedViewPanelProps, DetailedViewPortalTarget, type DetailedViewPortalTargetProps, DotMatrixLoader, DotMatrixLoaderVariant, type EditableCellType, EditableTable, EditableTableChangesBar, EditableTableChangesBarProps, EditableTableColumn, EditableTableProps, EditableTableRow, EffectTheme, EntityList, EntityListProps, EntityListRow, EntityListSize, type ExportChartData, type FetchLLMOptions, FoldableSectionContent, FoldableSectionContentProps, FoldableSectionItem, FoldableSectionItemProps, FoldableSectionRoot, FoldableSectionRootProps, FoldableSectionTrigger, FoldableSectionTriggerProps, FollowUpBlock, FollowUpBlockProps, FollowUpItem, FollowUpItemProps, FormControl, FormControlProps, GalleryModal, GalleryModalProps, GenUIUserMessage, Hint, HintProps, HorizontalBarChart, HorizontalBarChartData, HorizontalBarChartProps, HorizontalBarChartVariant, IconButton, IconButtonProps, IconTag, IconTagProps, IconTagSize, IconTagVariant, IconText, IconTextIconVariant, IconTextLayout, IconTextProps, IconWrapper, type IconWrapperProps, Image, ImageBlock, ImageBlockProps, ImageGallery, ImageItem, ImageProps, ImageText, ImageTextLarge, ImageTextLargeProps, ImageTextLayout, ImageTextProps, InlineHeader, InlineHeaderProps, InlineMarkdownRenderer, InlineMarkdownRendererProps, Input, InputProps, Label, LabelProps, LayoutContext, LayoutContextProvider, LayoutTheme, LineChart, LineChartCondensed, LineChartCondensedProps, LineChartData, LineChartProps, LineChartVariant, ListBlock, ListBlockProps, ListItem, ListItemProps, ListItemSize, ListItemVariant, ListedSourceItem, ListedSources, type ListedSourcesProps, MarkDownRenderer, MarkDownRendererProps, MetricIndicatorInline, MetricIndicatorInlineProps, MetricIndicatorTrend, MetricIndicatorWithStrikethrough, MetricIndicatorWithStrikethroughProps, MiniAreaChart, MiniAreaChartData, MiniAreaChartProps, MiniBarChart, MiniBarChartData, MiniBarChartProps, MiniLineChart, MiniLineChartData, MiniLineChartProps, ModelLogo, ModelOption, ModelSwitcher, ModelSwitcherProps, type NavContextValue, NeutralSwatchName, InvGalleryProps, OptionCards, OptionCardsItem, OptionCardsProps, OptionCardsSelectionType, OverviewCardBlock, OverviewCardBlockItem, OverviewCardBlockLayout, OverviewCardBlockProps, PieChart, PieChartData, PieChartProps, PieChartSkeleton, PrintContext, PrintContextProvider, type PromptTemplate, RadarChart, RadarChartData, RadarChartProps, RadialChart, RadialChartData, RadialChartProps, RadioGroup, type RadioGroupProps, RadioItem, RadioItemProps, type RestStorageOptions, type RouteProps, ScatterChart, ScatterChartData, type ScatterChartProps, ScatterDataset, ScatterPoint, ScrollableTable, ScrollableTableProps, SectionV2, Select, SelectContent, SelectContentProps, SelectGroup, SelectGroupProps, SelectItem, SelectItemProps, SelectLabel, SelectLabelProps, SelectProps, SelectSeparator, SelectSeparatorProps, SelectTrigger, SelectTriggerProps, SelectValue, Separator, ShareThread, ShareThreadModal, type ShareThreadModalProps, type ShareThreadProps, type SharedChatUIProps, SidebarItem, type SidebarItemProps, SingleStackedBar, type SingleStackedBarData, type SingleStackedBarProps, Skeleton, Slider, SliderBlock, SliderBlockProps, SliderProps, SnippetCardBlock, SnippetCardBlockItem, SnippetCardBlockProps, SnippetCardTooltip, SourceFaviconImage, type SourceFaviconImageProps, SourceIcon, type SourceWithFavicon, Sources, type SourcesItemComponentProps, Steps, StepsItem, StepsItemProps, StepsProps, SwitchGroup, SwitchGroupProps, SwitchItem, type SwitchItemProps, Table, TableBody, TableCell, TableCellProps, TableFooter, TableHead, TableHeadProps, TableHeader, TableRow, TableSkeleton, Tabs, TabsContent, TabsContentProps, TabsList, TabsListProps, TabsProps, TabsTrigger, TabsTriggerProps, Tag, TagBlock, TagBlockProps, TagProps, TagSize, TagVariant, TextArea, TextAreaProps, TextBlockAlign, TextBlockSecondaryTone, TextBlockSize, TextBlockType, TextBlockVariant, TextBlockView, TextBlockViewProps, TextCallout, TextCalloutProps, TextContent, TextContentCitation, type TextContentCitationProps, TextContentProps, TextContentVariant, TextContentWrapper, TextContentWrapperProps, Theme, ThemeContext, ThemeMode, ThemeProps, ThemeProvider, type ThreadStorage, TimelineEntry, type TimelineEntryProps, type TimelineStep, TimelineToolCard, type ToolActivity, ToolActivityRenderer, ToolCall, ToolCallComponent, ToolCallEntry, type ToolCallEntryProps, ToolCallErrorFallback, type ToolCallProps, type ToolCallStatus, ToolCallTimeline, type ToolCallTimelineComponent, type ToolDetailedViewPanel, ToolMessageRenderer, type ToolMessageRendererProps, ToolResult, type ToolResultProps, type ToolResultSource, TooltipWrapper, TooltipWrapperProps, TypographyTheme, type UserMessageComponent, VisualCard, VisualCardBlock, VisualCardBlockItem, VisualCardBlockProps, VisualCardProps, WelcomeGlow, type WelcomeMessageConfig, type WorkspaceProps, type WorkspaceTabLabels, artifactListPath, artifactViewPath, black, calculateScatterDomain, createTheme, defaultDarkTheme, defaultLabel, defaultLightTheme, defineArtifactRenderer, extractToolSources, fetchLLM, formatScatterTooltipValue, getFaviconUrl, getScatterDatasets, isChatEmpty, isWelcomeComponent, openSourceInNewTab, invAdditionalRules, invChatAdditionalRules, invChatComponentGroups, invChatExamples, invChatLibrary, invChatPromptOptions, invComponentGroups, invExamples, invLibrary, invPromptOptions, pairToolActivity, partialJSONParse, prettyResult, restStorage, safeOpenUrl, safeUrl, swatch, swatchToken, swatchTokens, toolIcon, transformScatterData, useActiveDetailedView, useCardSourceContext, useDetailedView, useLayoutContext, useNav, usePrintContext, useSystemThemeMode, useTheme, useToolActivities, useToolCall, white, withAlpha };
//# sourceMappingURL=index.d.mts.map