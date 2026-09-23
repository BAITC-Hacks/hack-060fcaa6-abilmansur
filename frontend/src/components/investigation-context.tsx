"use client";
import { createContext, useContext } from "react";
import type { Snapshot } from "@/lib/investigation";
export interface InvestigationState {
  snapshot: Snapshot | null;
  chosen: string[];
  toggle: (gid: string) => void;
  openNode: (gid: string) => void;
  navigate: (path?: string) => void;
}
export const InvestigationContext = createContext<InvestigationState | null>(
  null,
);
export function useInvestigation() {
  const value = useContext(InvestigationContext);
  if (!value) throw new Error("Investigation provider missing");
  return value;
}
