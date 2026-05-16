import type { ReactNode } from "react";
import { Reveal } from "@/components/reveal";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  body?: ReactNode | ReactNode[];
  centered?: boolean;
};

export function SectionHeading({
  eyebrow,
  title,
  body,
  centered = false,
}: SectionHeadingProps) {
  const paragraphs = body === undefined ? [] : Array.isArray(body) ? body : [body];
  const containerClass = centered
    ? "w-full max-w-[1000px] flex flex-col justify-center items-center text-center"
    : "w-full max-w-[1000px] flex flex-col space-y-5";
  const titleClass = centered ? "font-display mt-4 text-[32px] sm:text-5xl text-foreground" : "font-display text-[32px] sm:text-5xl text-foreground";
  const paragraphClass = centered
    ? "mt-6 max-w-3xl text-base leading-7 text-foreground text-center"
    : "text-base leading-7 text-foreground-body";

  const titleDelay = eyebrow ? 80 : 0;
  const paragraphDelay = (i: number) => titleDelay + 80 * (i + 1);

  return (
    <div className={containerClass}>
      {eyebrow && (
        <Reveal animation="fade-in-up">
          <p className="text-base uppercase tracking-[0.24em] text-eyebrow sm:text-base">
            {eyebrow}
          </p>
        </Reveal>
      )}
      <Reveal animation="fade-in-up" delay={titleDelay}>
        <h2 className={titleClass}>{title}</h2>
      </Reveal>
      {paragraphs.map((paragraph, i) => (
        <Reveal key={i} animation="fade-in-up" delay={paragraphDelay(i)}>
          <p className={paragraphClass}>{paragraph}</p>
        </Reveal>
      ))}
    </div>
  );
}
