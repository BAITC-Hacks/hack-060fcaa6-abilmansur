import { ReactNode } from "react";
import { ConversationStarterProps } from "../../types/ConversationStarter";
import { PromptTemplate } from "../../types/PromptTemplate";
import { ConversationStarterVariant } from "./ConversationStarter";
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
export type WelcomeScreenProps = WelcomeScreenWithContentProps | WelcomeScreenWithChildrenProps;
export declare const WelcomeScreen: (props: WelcomeScreenProps) => import("react").JSX.Element | null;
export default WelcomeScreen;
//# sourceMappingURL=WelcomeScreen.d.ts.map