/**
 * Joins a contextual-starter prompt onto the current draft, inserting a single
 * space separator unless the draft is empty or already ends with a space.
 * (Prefill chips end their prompt with a trailing space on purpose.)
 */
export declare const appendStarterPrompt: (draft: string, prompt: string) => string;
type ProcessStarterMessage = (message: {
    role: "user";
    content: string;
}) => void;
/** Composes a contextual starter with the current draft and submits it. */
export declare const submitStarterPrompt: (processMessage: ProcessStarterMessage, draft: string, prompt: string) => void;
export {};
//# sourceMappingURL=welcomePrefill.d.ts.map