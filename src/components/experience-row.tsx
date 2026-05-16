import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { StatusBadge } from "@/components/ui/status-badge";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1528127269322-539801943592?w=600&h=400&fit=crop";

type ExperienceRowProps = {
  title: string;
  description: string;
  image?: string;
  imageAlt: string;
  statusLabel: string;
  statusVariant: "upcoming" | "current";
  ctaLabel?: string;
  ctaUrl?: string;
};

export function ExperienceRow({
  title,
  description,
  image,
  imageAlt,
  statusLabel,
  statusVariant,
  ctaLabel,
  ctaUrl,
}: ExperienceRowProps) {
  return (
    <div className="grid w-full max-w-[1000px] gap-8 md:grid-cols-2 md:gap-16">
      <Reveal
        animation="fade-in-slow"
        className="relative w-full h-[200px] md:h-auto md:aspect-[4/3] max-h-[280px] overflow-hidden rounded-lg border border-border md:order-2"
      >
        <Image
          src={image || FALLBACK_IMAGE}
          alt={imageAlt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </Reveal>

      <div className="flex flex-col justify-between gap-6 md:order-1">
        <div className="flex flex-col gap-4">
          <Reveal animation="fade-in-up">
            <StatusBadge label={statusLabel} variant={statusVariant} />
          </Reveal>
          <Reveal animation="fade-in-up" delay={80}>
            <h3 className="font-display text-[24px] sm:text-4xl text-slate-900">
              {title}
            </h3>
          </Reveal>
          <Reveal animation="fade-in-up" delay={160}>
            <p className="text-base leading-7 text-slate-700">{description}</p>
          </Reveal>
        </div>
        {ctaUrl && ctaLabel && (
          <Reveal animation="fade-in-up" delay={240}>
            <Button asChild size="pill" className="w-fit">
              <Link href={ctaUrl}>{ctaLabel}</Link>
            </Button>
          </Reveal>
        )}
      </div>
    </div>
  );
}
