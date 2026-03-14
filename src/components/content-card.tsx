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
          <div className="text-[20px] font-semibold leading-none">{title}</div>
          <div className="text-muted-foreground text-base leading-5 font-extralight">{description}</div>
        </div>
        {href ? (
          <span className="inline-flex items-center gap-1.5 text-base font-medium text-[#cd6f3f] self-start cursor-pointer">
            {cta}
            <Image src="/go-right.svg" alt="" width={16} height={16} />
          </span>
        ) : (
          <Button variant="link" className="h-auto p-0 text-base font-medium text-[#cd6f3f] gap-1.5 self-start">
            {cta}
            <Image src="/go-right.svg" alt="" width={16} height={16} />
          </Button>
        )}
      </div>
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={`block overflow-hidden rounded-xl border border-[#e4e6e8] shadow-none cursor-pointer transition-colors ${image ? "bg-surface-alt hover:bg-surface-alt-hover" : "bg-surface hover:bg-surface-hover"}`}
      >
        {cardContent}
      </Link>
    );
  }

  return (
    <div className={`overflow-hidden rounded-xl border border-[#e4e6e8] shadow-none ${image ? "bg-surface-alt" : "bg-surface"}`}>
      {cardContent}
    </div>
  );
}
