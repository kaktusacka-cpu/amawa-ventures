"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  animation?: "fade-in" | "fade-in-up" | "fade-in-slow" | "scale-in" | "hero-up";
  delay?: number;
  className?: string;
  threshold?: number;
};

const animClass: Record<NonNullable<RevealProps["animation"]>, string> = {
  "fade-in": "reveal-fade-in",
  "fade-in-up": "reveal-fade-in-up",
  "fade-in-slow": "reveal-fade-in-slow",
  "scale-in": "reveal-scale-in",
  "hero-up": "reveal-hero-up",
};

export function Reveal({
  children,
  animation = "fade-in-up",
  delay = 0,
  className = "",
  threshold = 0.1,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div
      ref={ref}
      className={`${visible ? animClass[animation] : ""} ${className}`}
      style={{
        opacity: visible ? undefined : 0,
        animationDelay: visible && delay ? `${delay}ms` : undefined,
      }}
    >
      {children}
    </div>
  );
}
