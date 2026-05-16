"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

type SiteFooterProps = {
  brand: string;
};

export function SiteFooter({ brand }: SiteFooterProps) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const locale = segments[0] ?? "en";
  const page = segments[1] ?? "";
  const isHomePage = segments.length === 1;
  const footerBgClass =
    isHomePage || page === "about" || page === "experiences"
      ? "bg-surface-alt"
      : "bg-surface";

  return (
    <footer className={`border-t border-black/8 px-4 sm:px-6 lg:px-8 ${footerBgClass}`}>
      <div className="mx-auto w-full max-w-[1000px]">
        {/* Logo */}
        <div className="pt-12 pb-12">
          <Image
            src="/logo-amawa-full.svg"
            alt={brand}
            width={160}
            height={24}
            className="h-6 w-auto"
          />
        </div>

        {/* 4 columns */}
        <div className="flex flex-wrap justify-between pb-16">
          <div className="flex flex-col gap-3">
            <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Contact</p>
            <div className="flex flex-col gap-1">
              <a
                href="mailto:info@amawaventures.com"
                className="text-sm text-foreground hover:text-primary"
              >
                info@amawaventures.com
              </a>
              <a
                href="tel:+421918444444"
                className="text-sm text-foreground hover:text-primary"
              >
                +421 918 444 444
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Address</p>
            <div className="flex flex-col gap-1">
              <p className="text-sm text-foreground">Hemerkova 1320/12</p>
              <p className="text-sm text-foreground">040 23 Košice</p>
              <p className="text-sm text-foreground">Slovakia</p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Legal</p>
            <div className="flex flex-col gap-1">
              <p className="text-sm text-foreground">Amawa Ventures s. r. o.</p>
              <p className="text-sm text-foreground">IČO: 57142467</p>
              <p className="text-sm text-foreground">DIČ: 2122582550</p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Documents</p>
            <div className="flex flex-col gap-1">
              <Link
                href={`/${locale}/privacy`}
                className="text-sm text-foreground hover:text-primary"
              >
                GDPR - Privacy Policy
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-black/8 py-8 text-center text-sm text-muted-foreground">
          <p>© 2026 Amawa Ventures.</p>
          <p>
            Design by{" "}
            <a
              href="https://bydomi.design"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-700"
            >
              BYDOMI.DESIGN
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
