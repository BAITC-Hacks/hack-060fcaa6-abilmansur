/**
 * Joins a contextual-starter prompt onto the current draft, inserting a single
 * space separator unless the draft is empty or already ends with a space.
 * (Prefill chips end their prompt with a trailing space on purpose.)
 */
export const appendStarterPrompt = (draft, prompt) => {
    const separator = draft.length > 0 && !draft.endsWith(" ") ? " " : "";
    return `${draft}${separator}${prompt}`;
};
/** Composes a contextual starter with the current draft and submits it. */
export const submitStarterPrompt = (processMessage, draft, prompt) => processMessage({
    role: "user",
    content: appendStarterPrompt(draft, prompt),
});
//# sourceMappingURL=welcomePrefill.js.map