import type { ReactNode } from "react";

type ContactCardProps = {
  title: string;
  description: string;
  children: ReactNode;
  image?: string;
  imageAlt?: string;
};

export function ContactCard({ title, description, children, image, imageAlt }: ContactCardProps) {
  if (image) {
    return (
      <div className="relative overflow-visible rounded-2xl border border-border bg-surface-alt text-left">
        {/* Text content — right padding reserves space for the floating illustration */}
        <div className="flex flex-col gap-3 p-6 md:p-10 md:pr-[40%]">
          <h3 className="font-display text-2xl text-foreground">{title}</h3>
          <p className="flex-1 text-base leading-7 text-foreground-body">{description}</p>
          <div className="mt-6">{children}</div>
        </div>

        {/* Calendar illustration — absolutely positioned, overflows top/bottom */}
        <div className="hidden md:block absolute right-[-6%] top-1/2 -translate-y-[56%] w-[36%] pointer-events-none select-none">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt={imageAlt ?? ""}
            className="w-full h-auto drop-shadow-xl"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-border bg-surface-alt p-6 md:p-8 text-left h-full">
      <h3 className="font-display text-2xl text-foreground">{title}</h3>
      <p className="flex-1 text-base leading-7 text-foreground-body">{description}</p>
      <div className="mt-auto pt-3">{children}</div>
    </div>
  );
}
