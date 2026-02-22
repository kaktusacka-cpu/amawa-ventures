"use client";

import { usePathname } from "next/navigation";

type SiteFooterProps = {
  brand: string;
  copyright: string;
};

export function SiteFooter({ brand, copyright }: SiteFooterProps) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const page = segments[1] ?? "";
  const isHomePage = segments.length === 1;
  const footerBgClass =
    page === "what-we-do" || page === "about"
      ? "bg-[#FAF8F5]"
      : isHomePage || page === "experiences"
        ? "bg-[#F3F1ED]"
        : "bg-[#F3F1ED]";

  return (
    <footer className={`border-t border-black/8 ${footerBgClass}`}>
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 text-[10px] text-slate-500 sm:px-6 lg:px-8">
        <span className="text-slate-700 text-[14px]">{brand}</span>
        <span className="text-[14px]">{copyright}</span>
      </div>
    </footer>
  );
}
