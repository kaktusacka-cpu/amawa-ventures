import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";

type PageHeroProps = {
  title: string;
  tagline?: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
  image: string;
  imageAlt: string;
  bordered?: boolean;
};

export function PageHero({
  title,
  tagline,
  description,
  ctaLabel,
  ctaHref,
  image,
  imageAlt,
  bordered = true,
}: PageHeroProps) {
  return (
    <section className="w-full px-4 py-6 sm:py-[80px] sm:px-6 lg:px-8 flex flex-col justify-center items-center bg-surface">
      <div className="grid w-full max-w-[1200px] gap-6 lg:grid-cols-2 lg:gap-16">
        <div className="order-2 flex flex-col justify-center space-y-4 sm:space-y-6 lg:order-1">
          <Reveal animation="fade-in-up">
            <h1 className="font-display text-[32px] md:text-5xl lg:text-6xl text-slate-900">
              {title}
            </h1>
          </Reveal>
          {tagline && (
            <Reveal animation="fade-in-up" delay={80}>
              <p className="text-lg leading-7 text-slate-800">{tagline}</p>
            </Reveal>
          )}
          {description && (
            <Reveal animation="fade-in-up" delay={tagline ? 160 : 80}>
              <p className="text-base leading-7 text-slate-700">{description}</p>
            </Reveal>
          )}
          {ctaLabel && ctaHref && (
            <Reveal animation="fade-in-up" delay={240}>
              <div className="pt-2">
                <Button asChild size="pill">
                  <Link href={ctaHref}>{ctaLabel}</Link>
                </Button>
              </div>
            </Reveal>
          )}
        </div>

        {bordered ? (
          <Reveal
            animation="fade-in-slow"
            delay={200}
            className="order-1 relative w-full aspect-[4/3] max-h-[400px] overflow-hidden rounded-lg border border-border lg:order-2"
          >
            <Image
              src={image}
              alt={imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </Reveal>
        ) : (
          <Reveal animation="fade-in-slow" delay={200} className="order-1 w-full lg:order-2">
            <Image
              src={image}
              alt={imageAlt}
              width={568}
              height={396}
              className="w-full h-auto"
            />
          </Reveal>
        )}
      </div>
    </section>
  );
}
