"use client";

import { IconButton as BaseIconButton, type IconButtonProps } from "@inv/ui";
import * as RadixTooltip from "@radix-ui/react-tooltip";
import clsx from "clsx";
import { Waypoints } from "lucide-react";
import { forwardRef, type ReactElement, type ReactNode } from "react";

// Base components come straight from the UI kit.
export { Button, Skeleton, Tag } from "@inv/ui";

// ---------------------------------------------------------------- tooltip

/** The template's tooltip (`inv-agent-tooltip`). The provider is mounted once in the shell. */
export function Tooltip({
  content, side = "bottom", className = "inv-agent-tooltip", children,
}: { content: ReactNode; side?: "top" | "right" | "bottom" | "left"; className?: string; children: ReactElement }) {
  return (
    <RadixTooltip.Root>
      <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
      <RadixTooltip.Portal>
        <RadixTooltip.Content className={className} side={side} align="center" sideOffset={8}>
          {content}
        </RadixTooltip.Content>
      </RadixTooltip.Portal>
    </RadixTooltip.Root>
  );
}

// ---------------------------------------------------------------- icon buttons

/** Icon-only action: the UI kit's IconButton (flat tertiary by default) with a required label shown as tooltip. */
export const IconAction = forwardRef<
  HTMLButtonElement,
  Omit<IconButtonProps, "aria-label"> & { label: string; selected?: boolean; tooltipSide?: "top" | "right" | "bottom" | "left" }
>(function IconAction({ label, selected, tooltipSide, variant = "tertiary", size = "small", ...rest }, ref) {
  return (
    <Tooltip content={label} side={tooltipSide}>
      <BaseIconButton ref={ref} aria-label={label} aria-pressed={selected} variant={variant} size={size} {...rest} />
    </Tooltip>
  );
});

export { BaseIconButton as IconButton };

// ---------------------------------------------------------------- surfaces

/** Bordered surface used for panels and cards across the app (the template's composer/card look). */
export function Card({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={clsx("rounded-2xl border border-line bg-surface", className)}>{children}</div>;
}

/** A tinted block inside a card (sunk background). */
export function Inset({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={clsx("rounded-xl bg-sunk", className)}>{children}</div>;
}

/** Group label, as the template's thread-list group heading. */
export function SectionLabel({ className, children }: { className?: string; children: ReactNode }) {
  return <p className={clsx("px-1.5 text-sm text-tertiary", className)}>{children}</p>;
}

/** Press states for clickable rows and cards: background change only, 120 ms. */
export const rowPress =
  "cursor-pointer text-left outline-none transition-colors duration-[120ms] ease-out enabled:hover:bg-highlight enabled:active:bg-sunk " +
  "disabled:cursor-not-allowed disabled:opacity-50";

/** Text link inside content: colour change only. */
export const textLink =
  "cursor-pointer rounded-sm underline-offset-2 outline-none transition-colors duration-[120ms] hover:text-brand hover:underline";

// ---------------------------------------------------------------- badges

export type Tone = "neutral" | "success" | "alert" | "danger" | "info" | "purple";

const TONES: Record<Tone, string> = {
  neutral: "bg-highlight-strong text-secondary",
  success: "bg-success-bg text-success",
  alert: "bg-alert-bg text-alert",
  danger: "bg-danger-bg text-danger",
  info: "bg-info-bg text-info",
  purple: "bg-purple-bg text-purple",
};

export function Badge({ tone = "neutral", className, children }: { tone?: Tone; className?: string; children: ReactNode }) {
  return (
    <span className={clsx("inline-flex shrink-0 items-center gap-1 rounded-md px-1.5 py-0.5 text-xs leading-4 font-medium", TONES[tone], className)}>
      {children}
    </span>
  );
}

/** Status dot; pulses only for live activity (meaningful motion). */
export function LiveDot({ tone = "live" }: { tone?: "live" | "ok" | "warn" | "bad" | "muted" }) {
  const color = { live: "bg-accent", ok: "bg-success", warn: "bg-alert", bad: "bg-danger", muted: "bg-tertiary" }[tone];
  return (
    <span className="relative inline-flex size-2 shrink-0">
      {tone === "live" && <span className={clsx("absolute inset-0 animate-ping-soft rounded-full", color)} />}
      <span className={clsx("relative inline-flex size-2 rounded-full", color)} />
    </span>
  );
}

/** App mark: inverted rounded square with the network glyph (follows light/dark). */
export function Mark({ size = 30, className }: { size?: number; className?: string }) {
  return (
    <span
      aria-hidden
      className={clsx("grid shrink-0 place-items-center rounded-md bg-inverted text-on-inverted", className)}
      style={{ width: size, height: size }}
    >
      <Waypoints size={Math.round(size * 0.55)} strokeWidth={2} />
    </span>
  );
}

// ---------------------------------------------------------------- motion presets (entrances only)

/** The template's entrance: 10px rise + fade, 350 ms, cubic-bezier(0.22, 1, 0.36, 1). */
export const enter = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
} as const;

export const stagger = (delayChildren = 0, staggerChildren = 0.06) => ({
  hidden: {},
  show: { transition: { delayChildren, staggerChildren } },
});

export const ease = [0.22, 1, 0.36, 1] as const;
