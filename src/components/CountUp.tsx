"use client";

import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  /** Display value such as "30", "3+" or "50K+" — the leading number is animated, the rest is kept as a suffix */
  value: string;
  duration?: number;
}

// Counts the number in `value` up from zero when it scrolls into view.
export default function CountUp({ value, duration = 1800 }: CountUpProps) {
  const match = value.match(/^(\d+(?:\.\d+)?)(.*)$/);
  const target = match ? parseFloat(match[1]) : 0;
  const suffix = match ? match[2] : "";
  const ref = useRef<HTMLSpanElement>(null);
  const [current, setCurrent] = useState<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !match) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || !("IntersectionObserver" in window)) return;

    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCurrent(Math.round(target * eased));
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      setCurrent(0);
      frame = requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, duration]);

  if (!match) return <span>{value}</span>;
  return (
    <span ref={ref}>
      {current ?? target}
      {suffix}
    </span>
  );
}
