"use client";

import Image from "next/image";

type LogoItem = {
  src: string;
  alt: string;
};

type LogoMarqueeProps = {
  items: LogoItem[];
};

export function LogoMarquee({ items }: LogoMarqueeProps) {
  return (
    <div className="relative w-full overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-surface-alt to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-surface-alt to-transparent" />

      <div className="flex w-max animate-marquee">
        {[...items, ...items].map((item, index) => (
          <div
            key={`${item.alt}-${index}`}
            className="mx-1.5 flex h-28 w-44 shrink-0 items-center justify-center sm:mx-2 sm:w-56"
          >
            <Image
              src={item.src}
              alt={item.alt}
              width={224}
              height={112}
              className="h-auto max-h-28 w-auto object-contain opacity-80"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
