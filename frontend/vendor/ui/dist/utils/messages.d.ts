import { useArtifactRendererRegistry, type Message, type ToolActivity } from "@inv/headless";
type ArtifactRendererRegistry = ReturnType<typeof useArtifactRendererRegistry>;
/** Id of the "live" assistant message in a thread, or null. Shared by the
 *  thread and the assistant component to decide which message is streaming. */
export declare function getLastAssistantMessageId(messages: Message[]): string | null;
/** Activities whose tool has a matched artifact/search renderer — the ones that
 *  render a rich preview outside the raw timeline. */
export declare function getMatchedRendererActivities(registry: ArtifactRendererRegistry, activities: ToolActivity[]): ToolActivity[];
export {};
//# sourceMappingURL=messages.d.ts.map