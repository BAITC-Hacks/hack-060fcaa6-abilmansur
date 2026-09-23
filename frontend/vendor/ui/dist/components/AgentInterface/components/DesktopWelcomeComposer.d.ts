import { RefObject } from "react";
export interface DesktopWelcomeComposerProps {
    className?: string;
    placeholder?: string;
    /**
     * Controlled draft value. When set, the internal draft state is bypassed and
     * `onChange` receives every edit (including the clear on submit). Used by the
     * prefill-chips welcome, whose chips must write into the draft.
     */
    value?: string;
    onChange?: (value: string) => void;
    /**
     * Overrides the internal `data-drafting` computation (value non-empty). The
     * prefill-chips welcome passes `false` for chip-prefilled drafts so the
     * contextual starters below don't fade.
     */
    drafting?: boolean;
    /** Ref to the underlying textarea, for focus/caret placement by the owner. */
    inputRef?: RefObject<HTMLTextAreaElement | null>;
}
export declare const DesktopWelcomeComposer: ({ className, placeholder, value, onChange, drafting, inputRef, }: DesktopWelcomeComposerProps) => import("react").JSX.Element;
export default DesktopWelcomeComposer;
//# sourceMappingURL=DesktopWelcomeComposer.d.ts.map