import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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
        <div className="relative h-[180px]">
          <Image
            src={image}
            alt={imageAlt ?? title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      )}
      <div className="flex flex-col gap-4 px-6 pt-6 pb-6">
        <div className="space-y-2">
          <div className="text-[18px] font-medium leading-none">{title}</div>
          <div className="text-muted-foreground text-base leading-5 font-normal">{description}</div>
        </div>
        {href ? (
          <span className="text-base font-medium text-[#cd6f3f] self-start cursor-pointer inline-flex items-center gap-2">
            {cta}
            <span
              aria-hidden="true"
              className="inline-block h-[1em] w-[1em] bg-current transition-transform duration-200 ease-out group-hover:translate-x-0.5 [mask:url('/forward.svg')_center/contain_no-repeat] [-webkit-mask:url('/forward.svg')_center/contain_no-repeat]"
            />
          </span>
        ) : (
          <Button variant="link" className="group h-auto p-0 text-base font-medium text-[#cd6f3f] self-start inline-flex items-center gap-2">
            {cta}
            <span
              aria-hidden="true"
              className="inline-block h-[1em] w-[1em] bg-current transition-transform duration-200 ease-out group-hover:translate-x-0.5 [mask:url('/forward.svg')_center/contain_no-repeat] [-webkit-mask:url('/forward.svg')_center/contain_no-repeat]"
            />
          </Button>
        )}
      </div>
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={`group block overflow-hidden rounded-xl border border-[#e4e6e8] shadow-none cursor-pointer transition-colors ${image ? "bg-surface-alt hover:bg-surface-alt-hover" : "bg-white hover:bg-surface-hover"}`}
      >
        {cardContent}
      </Link>
    );
  }

  return (
    <div className={`overflow-hidden rounded-xl border border-[#e4e6e8] shadow-none ${image ? "bg-surface-alt" : "bg-white"}`}>
      {cardContent}
    </div>
  );
}
