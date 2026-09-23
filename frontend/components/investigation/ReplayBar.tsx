"use client";

import { Button, IconButton } from "@inv/ui";
import clsx from "clsx";
import { Pause, Play, SkipBack, SkipForward } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { Badge, IconAction, ease } from "@/components/ui";
import type { TimelineFrame } from "@/lib/api";
import { ROLES, fmtDate, fmtTotals } from "@/lib/format";

const ROLE_SHORT = (r: string) => (ROLES[r as keyof typeof ROLES] ?? ROLES.context).label.split(" ")[0];

export function ReplayBar({
  frames, frame, playing, speed, onFrame, onPlay, onSpeed, onClose,
}: {
  frames: TimelineFrame[];
  frame: number;
  playing: boolean;
  speed: number;
  onFrame: (i: number) => void;
  onPlay: (p: boolean) => void;
  onSpeed: (s: number) => void;
  onClose: () => void;
}) {
  const f = frames[frame];
  const flows = f ? Object.entries(f.role_flows).sort((a, b) => b[1] - a[1]).slice(0, 3) : [];
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.25, ease }}
      className="absolute right-3 bottom-3 left-3 z-10 mx-auto flex max-w-[760px] flex-col gap-2 rounded-2xl border border-line-interactive bg-popover p-3 shadow-xl"
    >
      <div className="flex items-center gap-1.5">
        <IconAction label="Предыдущий день" tooltipSide="top" icon={<SkipBack size="1em" />} onClick={() => onFrame(Math.max(0, frame - 1))} />
        <IconButton
          variant="primary"
          size="small"
          shape="circle"
          aria-label={playing ? "Пауза" : "Воспроизвести"}
          icon={playing ? <Pause size="1em" fill="currentColor" /> : <Play size="1em" fill="currentColor" />}
          onClick={() => onPlay(!playing)}
        />
        <IconAction label="Следующий день" tooltipSide="top" icon={<SkipForward size="1em" />} onClick={() => onFrame(Math.min(frames.length - 1, frame + 1))} />

        <div className="relative mx-2 flex h-8 flex-1 items-center">
          {/* Activity histogram behind the scrubber */}
          <div aria-hidden className="absolute inset-x-0 bottom-1 flex h-6 items-end gap-px">
            {frames.map((fr, i) => (
              <span
                key={fr.frame}
                className={clsx("flex-1 rounded-t-sm transition-colors duration-300", i <= frame ? "bg-accent/60" : "bg-highlight-strong")}
                style={{ height: `${20 + Math.min(80, fr.tx.length * 6)}%` }}
              />
            ))}
          </div>
          <input
            type="range"
            min={0}
            max={Math.max(0, frames.length - 1)}
            value={frame}
            onChange={(e) => onFrame(Number(e.target.value))}
            aria-label="Кадр воспроизведения"
            className="relative z-10 h-8 w-full cursor-pointer appearance-none rounded-full bg-transparent [&::-moz-range-thumb]:size-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-surface [&::-moz-range-thumb]:bg-inverted [&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-surface [&::-webkit-slider-thumb]:bg-inverted [&::-webkit-slider-thumb]:shadow"
          />
        </div>

        <Button variant="secondary" size="extra-small" onClick={() => onSpeed(speed >= 4 ? 1 : speed * 2)} aria-label={`Скорость ${speed}×`} className="w-10 justify-center tabular-nums">
          {speed}×
        </Button>
        <Button variant="tertiary" size="extra-small" onClick={onClose}>
          Закрыть
        </Button>
      </div>

      <div className="flex min-h-6 items-center gap-3 px-1 text-xs">
        <AnimatePresence mode="wait">
          <motion.span
            key={f?.frame}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="shrink-0 font-medium text-primary"
          >
            День {frame + 1} · {fmtDate(f?.frame)}
          </motion.span>
        </AnimatePresence>
        <span className="shrink-0 text-secondary">
          {f?.tx.length ?? 0} перев. · {fmtTotals(f?.totals_by_currency)}
        </span>
        <span className="flex min-w-0 flex-1 justify-end gap-1.5 overflow-hidden">
          {flows.map(([k, n]) => {
            const [a, b] = k.split("->");
            return (
              <Badge key={k} className="truncate">
                {ROLE_SHORT(a)} → {ROLE_SHORT(b)} ×{n}
              </Badge>
            );
          })}
        </span>
      </div>
    </motion.div>
  );
}
