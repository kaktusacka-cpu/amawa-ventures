"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

type Testimonial = {
  quote: string;
  author: string;
  role: string;
  logo?: string;
};

type TestimonialsSliderProps = {
  items: Testimonial[];
};

export function TestimonialsSlider({ items }: TestimonialsSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const active = items[activeIndex] ?? items[0];

  useEffect(() => {
    if (items.length <= 1) return;

    const startInterval = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      intervalRef.current = setInterval(() => {
        if (!isPaused) {
          setActiveIndex((prev) => (prev + 1) % items.length);
        }
      }, 5000);
    };

    startInterval();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [items.length, isPaused]);

  const handleDotClick = (index: number) => {
    setActiveIndex(index);
    // Reset the interval when user manually navigates
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      if (!isPaused) {
        setActiveIndex((prev) => (prev + 1) % items.length);
      }
    }, 5000);
  };

  const handlePrev = () => {
    handleDotClick((activeIndex - 1 + items.length) % items.length);
  };

  const handleNext = () => {
    handleDotClick((activeIndex + 1) % items.length);
  };

  if (!active) return null;

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      style={{ height: "fit-content" }}
    >
      <div className="mx-auto mt-8 flex max-w-2xl text-lg leading-8 text-slate-800">
        <div className="flex items-start gap-2" style={{ height: "140px" }}>
          <Image
            src="/socials/quote.svg"
            alt=""
            width={32}
            height={32}
            className="shrink-0"
          />
          <blockquote className="flex-1 pt-2 pb-2" style={{ height: "100%" }}>{active.quote}</blockquote>
          <Image
            src="/socials/quote.svg"
            alt=""
            width={32}
            height={32}
            className="shrink-0 rotate-180"
          />
        </div>
      </div>
      {active.logo && (
        <div className="mt-8 flex justify-center">
          <img src={active.logo} alt="" className="h-8 w-auto" />
        </div>
      )}
      <p className={`${active.logo ? "mt-2" : "mt-7"} text-base font-medium`}>{active.author}</p>
      <p className="mt-1 text-sm text-muted-foreground">{active.role}</p>

      <div className="mt-5 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={handlePrev}
          className="inline-flex h-8 w-8 items-center justify-center rounded-full transition-opacity hover:opacity-80"
          aria-label="Previous testimonial"
        >
          <Image src="/go-left.svg" alt="" width={20} height={20} aria-hidden="true" />
        </button>

        <div className="flex items-center justify-center gap-2">
          {items.map((item, index) => (
            <button
              key={`${item.author}-${index}`}
              type="button"
              onClick={() => handleDotClick(index)}
              className={`h-2.5 w-2.5 rounded-full transition-colors ${
                index === activeIndex ? "bg-primary" : "bg-slate-300 hover:bg-slate-400"
              }`}
              style={{ color: "rgba(15, 23, 43, 1)" }}
              aria-label={`Go to testimonial ${index + 1}`}
              aria-current={index === activeIndex}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={handleNext}
          className="inline-flex h-8 w-8 items-center justify-center rounded-full transition-opacity hover:opacity-80"
          aria-label="Next testimonial"
        >
          <Image src="/go-right.svg" alt="" width={20} height={20} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
