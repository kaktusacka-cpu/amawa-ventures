"use client";

import { usePathname } from "next/navigation";

type SiteFooterProps = {
  brand: string;
  copyright: string;
};

export function SiteFooter({ brand, copyright }: SiteFooterProps) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const isWhatWeDoPage = segments.length >= 2 && segments[1] === "what-we-do";

  return (
    <footer className={`border-t border-black/8 ${isWhatWeDoPage ? "bg-[#FAF8F5]" : "bg-[#F3F1ED]"}`}>
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 text-[10px] text-slate-500 sm:px-6 lg:px-8">
        <span className="text-slate-700 text-[14px]">{brand}</span>
        <span className="text-[14px]">{copyright}</span>
      </div>
    </footer>
  );
}
