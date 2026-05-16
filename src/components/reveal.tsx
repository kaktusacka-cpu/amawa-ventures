"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";

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

function subscribeReducedMotion(callback: () => void) {
  if (typeof window === "undefined" || !window.matchMedia) return () => {};
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

function useReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );
}

export function Reveal({
  children,
  animation = "fade-in-up",
  delay = 0,
  className = "",
  threshold = 0.1,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (reducedMotion) return;

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
  }, [threshold, reducedMotion]);

  const showAnimated = visible && !reducedMotion;
  const isShown = showAnimated || reducedMotion;

  return (
    <div
      ref={ref}
      className={`${showAnimated ? animClass[animation] : ""} ${className}`}
      style={{
        opacity: isShown ? undefined : 0,
        animationDelay: showAnimated && delay ? `${delay}ms` : undefined,
      }}
    >
      {children}
    </div>
  );
}
