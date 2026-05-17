"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { PrivacyDialog } from "@/components/privacy-dialog";
import type { HomeCopy } from "@/lib/site-copy";

type SiteFooterProps = {
  footer: HomeCopy["footer"];
};

// Convert "+421 918 444 444" → "+421918444444" for tel: links.
function phoneHref(phone: string): string {
  return phone.replace(/[^\d+]/g, "");
}

export function SiteFooter({ footer }: SiteFooterProps) {
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
    <footer className={`border-t border-border px-4 sm:px-6 lg:px-8 ${footerBgClass}`}>
      <div className="mx-auto w-full max-w-[1000px]">
        {/* Logo */}
        <div className="pt-12 pb-12">
          <Image
            src="/logo-amawa-full.svg"
            alt={footer.brand}
            width={160}
            height={24}
            className="h-6 w-auto"
          />
        </div>

        {/* 4 columns */}
        <div className="mx-auto grid max-w-sm grid-cols-1 gap-x-12 gap-y-10 pb-16 min-[350px]:grid-cols-2 md:max-w-none md:grid-cols-4">
          <div className="flex flex-col gap-3">
            <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">{footer.columns.contact}</p>
            <div className="flex flex-col gap-1">
              <a href={`mailto:${footer.contact.email}`} className="link text-sm">
                {footer.contact.email}
              </a>
              <a href={`tel:${phoneHref(footer.contact.phone)}`} className="link text-sm">
                {footer.contact.phone}
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">{footer.columns.address}</p>
            <div className="flex flex-col gap-1">
              <p className="text-sm text-foreground">{footer.address.line1}</p>
              <p className="text-sm text-foreground">{footer.address.line2}</p>
              <p className="text-sm text-foreground">{footer.address.line3}</p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">{footer.columns.legal}</p>
            <div className="flex flex-col gap-1">
              <p className="text-sm text-foreground">{footer.legal.companyName}</p>
              <p className="text-sm text-foreground">{footer.legal.ico}</p>
              <p className="text-sm text-foreground">{footer.legal.dic}</p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">{footer.columns.documents}</p>
            <div className="flex flex-col items-start gap-1">
              <PrivacyDialog
                locale={locale}
                trigger={
                  <button type="button" className="link text-sm">
                    {footer.privacyLink}
                  </button>
                }
              />
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border py-8 text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} {footer.brand}. Design by{" "}
            <a
              href="https://bydomi.design"
              target="_blank"
              rel="noopener noreferrer"
              className="link"
            >
              bydomi.design
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
