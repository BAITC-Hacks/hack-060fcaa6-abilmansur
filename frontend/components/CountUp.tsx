"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

const defaultFormat = (n: number) => Math.round(n).toLocaleString("ru-RU");

/** Number that counts up from 0 when it scrolls into view. */
export function CountUp({ value, format = defaultFormat, duration = 1.1 }: {
  value: number;
  format?: (n: number) => string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  useEffect(() => {
    const el = ref.current;
    if (!el || !inView) return;
    if (reduce) {
      el.textContent = format(value);
      return;
    }
    const controls = animate(0, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => (el.textContent = format(v)),
    });
    return () => controls.stop();
  }, [inView, value, duration, format, reduce]);
  // Tabular digits: the width does not wobble while counting.
  return <span ref={ref} className="tabular-nums">{format(0)}</span>;
}
