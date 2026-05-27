"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

type Testimonial = {
  quote: string;
  author: string;
  role: string;
  link?: string;
};

type TestimonialsSliderProps = {
  items: Testimonial[];
};

const AUTOPLAY_MS = 9000;

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return reduced;
}

export function TestimonialsSlider({ items }: TestimonialsSliderProps) {
  const reducedMotion = usePrefersReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [hasFocus, setHasFocus] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const active = items[activeIndex] ?? items[0];

  const isPlaying = !reducedMotion && !isHovering && !hasFocus;

  useEffect(() => {
    if (items.length <= 1 || !isPlaying) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, AUTOPLAY_MS);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [items.length, isPlaying]);

  const goTo = (index: number) => {
    setActiveIndex(((index % items.length) + items.length) % items.length);
  };

  if (!active) return null;

  return (
    <div
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onFocus={() => setHasFocus(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) {
          setHasFocus(false);
        }
      }}
      aria-roledescription="carousel"
      aria-live={reducedMotion ? "polite" : "off"}
      style={{ height: "fit-content" }}
    >
      <div className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-foreground">
        <div className="flex items-start gap-2">
          <Image
            src="/socials/quote.svg"
            alt=""
            width={32}
            height={32}
            className="shrink-0"
          />
          <div className="flex-1 grid">
            {items.map((item, index) => (
              <blockquote
                key={index}
                aria-hidden={index !== activeIndex}
                className={`[grid-area:1/1] pt-2 pb-2 text-center line-clamp-8 transition-opacity duration-500 ${
                  index === activeIndex ? "opacity-100" : "opacity-0 pointer-events-none select-none"
                }`}
              >
                {item.quote}
              </blockquote>
            ))}
          </div>
          <Image
            src="/socials/quote.svg"
            alt=""
            width={32}
            height={32}
            className="shrink-0 rotate-180"
          />
        </div>
      </div>

      <div className="mt-7 grid">
        {items.map((item, index) => (
          <div
            key={index}
            aria-hidden={index !== activeIndex}
            className={`[grid-area:1/1] transition-opacity duration-500 ${
              index === activeIndex ? "opacity-100" : "opacity-0 pointer-events-none select-none"
            }`}
          >
            <p className="text-center text-base font-medium">{item.author}</p>
            <p className="mt-1 text-center text-sm text-muted-foreground">{item.role}</p>
            {item.link && (
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 text-sm text-muted-foreground underline hover:text-foreground transition-colors"
              >
                {item.link}
              </a>
            )}
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => goTo(activeIndex - 1)}
          className="inline-flex h-8 w-8 items-center justify-center rounded-full transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          aria-label="Previous testimonial"
        >
          <Image src="/go-left.svg" alt="" width={20} height={20} aria-hidden="true" />
        </button>

        <div className="flex items-center justify-center gap-2">
          {items.map((item, index) => (
            <button
              key={`${item.author}-${index}`}
              type="button"
              onClick={() => goTo(index)}
              className={`h-2.5 w-2.5 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface-alt ${
                index === activeIndex ? "bg-primary" : "bg-border hover:bg-muted-foreground"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
              aria-current={index === activeIndex}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => goTo(activeIndex + 1)}
          className="inline-flex h-8 w-8 items-center justify-center rounded-full transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          aria-label="Next testimonial"
        >
          <Image src="/go-right.svg" alt="" width={20} height={20} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
