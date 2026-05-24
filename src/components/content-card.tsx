import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";

type ContentCardProps = {
  title: string;
  description: string;
  cta: string;
  image?: string;
  imageAlt?: string;
  href?: string;
};

export function ContentCard({ title, description, cta, image, imageAlt, href }: ContentCardProps) {
  const cardContent = (
    <>
      {image && (
        <Reveal animation="fade-in-slow" className="relative h-[180px] overflow-hidden">
          <Image
            src={image}
            alt={imageAlt ?? title}
            fill
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </Reveal>
      )}
      <div className="flex flex-col flex-1 gap-4 px-6 pt-6 pb-6">
        <div className="space-y-2 grow">
          <div className="text-[18px] font-medium leading-none">{title}</div>
          <div className="text-muted-foreground text-base leading-5 font-normal">{description}</div>
        </div>
        {href ? (
          <span className="text-base font-medium text-accent-warm self-start cursor-pointer inline-flex items-center gap-1 transition-colors group-hover:text-accent-warm-hover">
            {cta}
            <span
              aria-hidden="true"
              className="inline-block h-[1em] w-[1em] bg-current transition-transform duration-200 ease-out group-hover:translate-x-1 [mask:url('/go-right.svg')_center/contain_no-repeat] [-webkit-mask:url('/go-right.svg')_center/contain_no-repeat]"
            />
          </span>
        ) : (
          <Button variant="link" className="group h-auto p-0 text-base font-medium text-accent-warm self-start inline-flex items-center gap-1 hover:text-accent-warm-hover">
            {cta}
            <span
              aria-hidden="true"
              className="inline-block h-[1em] w-[1em] bg-current transition-transform duration-200 ease-out group-hover:translate-x-1 [mask:url('/go-right.svg')_center/contain_no-repeat] [-webkit-mask:url('/go-right.svg')_center/contain_no-repeat]"
            />
          </Button>
        )}
      </div>
    </>
  );

  const baseBg = image ? "bg-surface-alt" : "bg-surface";

  if (href) {
    return (
      <Link
        href={href}
        className={`group flex flex-col overflow-hidden rounded-xl border border-border shadow-none cursor-pointer transition-colors ${baseBg} hover:bg-surface-hover`}
      >
        {cardContent}
      </Link>
    );
  }

  return (
    <div className={`flex flex-col overflow-hidden rounded-xl border border-border shadow-none ${baseBg}`}>
      {cardContent}
    </div>
  );
}
