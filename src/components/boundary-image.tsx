import Image from "next/image";
import { Reveal } from "@/components/reveal";

type BoundaryImageProps = {
  src: string;
  alt: string;
};

export function BoundaryImage({ src, alt }: BoundaryImageProps) {
  return (
    <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 -mt-[156px] -mb-[156px]">
      <Reveal
        animation="fade-in-slow"
        className="relative h-[312px] max-w-[1000px] mx-auto rounded-2xl overflow-hidden"
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 1200px) 100vw, 1200px"
        />
      </Reveal>
    </div>
  );
}
