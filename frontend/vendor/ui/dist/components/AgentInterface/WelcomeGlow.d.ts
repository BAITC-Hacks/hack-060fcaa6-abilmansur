import { type ReactNode } from "react";
export declare const WelcomeGlowProvider: ({ children, enabled, }: {
    children: ReactNode;
    enabled: boolean;
}) => import("react").JSX.Element;
export interface WelcomeGlowProps {
    children: ReactNode;
    className?: string;
}
/**
 * Positions the optional welcome glow around a custom composer. The animation
 * is enabled by the nearest <AgentInterface.Welcome glowAnimation> ancestor.
 */
export declare const WelcomeGlow: ({ children, className }: WelcomeGlowProps) => import("react").JSX.Element;
//# sourceMappingURL=WelcomeGlow.d.ts.map