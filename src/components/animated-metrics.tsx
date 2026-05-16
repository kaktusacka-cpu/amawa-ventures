"use client";

import { useEffect, useRef, useState } from "react";

type Metric = {
  value: string;
  label: string;
};

type AnimatedMetricsProps = {
  metrics: Metric[];
  className?: string;
};

function parseMetricValue(raw: string) {
  const match = raw.match(/^([^0-9]*)([0-9]+)(.*)$/);
  if (!match) {
    return { prefix: "", target: 0, suffix: raw };
  }

  const [, prefix, numericPart, suffix] = match;
  const target = Number.parseInt(numericPart, 10);
  return { prefix, target, suffix };
}

function AnimatedMetricItem({
  value,
  label,
  start,
}: {
  value: string;
  label: string;
  start: boolean;
}) {
  const [{ prefix, target, suffix }] = useState(() => parseMetricValue(value));
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!start) return;
    if (!target) return;

    let rafId = 0;
    const duration = 2200;
    const startAt = performance.now();
    const easeOutQuint = (t: number) => 1 - (1 - t) ** 5;

    const tick = (now: number) => {
      const t = Math.min((now - startAt) / duration, 1);
      const eased = easeOutQuint(t);
      const next = Math.round(target * eased);
      setDisplayValue(next);

      if (t < 1) {
        rafId = requestAnimationFrame(tick);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [start, target]);

  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-surface p-4 text-center">
      <p className="font-display text-5xl sm:text-[56px] leading-none">
        {prefix}
        {displayValue}
        {suffix}
      </p>
      <p className="mt-2 text-base text-muted-foreground">{label}</p>
    </div>
  );
}

export function AnimatedMetrics({ metrics, className }: AnimatedMetricsProps) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry?.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className={className}>
      {metrics.map((metric) => (
        <AnimatedMetricItem
          key={metric.label}
          value={metric.value}
          label={metric.label}
          start={started}
        />
      ))}
    </div>
  );
}
