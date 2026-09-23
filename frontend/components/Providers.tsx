"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  // Respect the OS "reduce motion" setting for every motion component.
  // (The theme is applied by AgentInterface itself.)
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
