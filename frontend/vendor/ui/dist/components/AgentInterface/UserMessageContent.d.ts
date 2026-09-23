import type { InputContent, Message } from "@inv/headless";
/**
 * Renders the content of a user message.
 *
 * Handles the full AG-UI `InputContent` union (`@ag-ui/core` ≥ 0.0.53):
 * `text | image | audio | video | document | binary`.
 * - `image | audio | video | document` carry a `source` object
 *   (`{ type: "data" | "url", value, mimeType? }`).
 * - `binary` is the lower-level variant (`{ mimeType, url?, data?, filename? }`),
 *   routed to the right element by `mimeType`.
 *
 * Each part is resolved to a single render-ready descriptor in
 * {@link resolveInputPart}: media → `<img>/<audio>/<video>`, everything else →
 * a downloadable file chip. Every source (url + base64 `data`) is vetted against
 * a scheme/mime allowlist, and unusable/failed sources degrade to a chip rather
 * than being silently dropped. A `default: never` guard surfaces any future
 * union member at compile time.
 */
type ResolvedKind = "text" | "image" | "audio" | "video" | "file";
interface ResolvedPart {
    kind: ResolvedKind;
    /** Safe URL for an element `src`/`href`; `""` when no usable/allowed source. */
    src: string;
    filename?: string;
    /** alt / aria label text. */
    label: string;
    /** Raw text for `kind === "text"`. */
    text?: string;
    mimeType?: string;
}
/** Resolve any `InputContent` part to a render-ready descriptor. */
export declare function resolveInputPart(part: InputContent): ResolvedPart;
export declare const UserMessageContent: ({ message }: {
    message: Message;
}) => import("react").JSX.Element | null;
export {};
//# sourceMappingURL=UserMessageContent.d.ts.map