"use client";

import { Fragment, type ReactNode } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { DocumentDialog } from "@/components/document-dialog";
import type { Locale } from "@/lib/i18n";
import type { DocumentContent } from "@/lib/notion/get-content";
import type { HomeCopy } from "@/lib/site-copy";

type SiteFooterProps = {
  footer: HomeCopy["footer"];
  documents: DocumentContent[];
  locale: Locale;
};

const CLOSE_LABEL: Record<Locale, string> = {
  en: "Close",
  es: "Cerrar",
  sk: "Zavrieť",
};

// Auto-link the footer email so it's clickable inside the dialog body.
function linkifyEmail(text: string, email: string): ReactNode {
  if (!email || !text.includes(email)) return text;
  const parts = text.split(email);
  return (
    <>
      {parts.map((part, i) => (
        <Fragment key={i}>
          {part}
          {i < parts.length - 1 && (
            <a href={`mailto:${email}`} className="link">{email}</a>
          )}
        </Fragment>
      ))}
    </>
  );
}

// Convert "+421 918 444 444" → "+421918444444" for tel: links.
function phoneHref(phone: string): string {
  return phone.replace(/[^\d+]/g, "");
}

// Use editor-provided href if set; otherwise compute from display text.
function resolveMailto(email: string, override: string): string {
  return override || `mailto:${email}`;
}

function resolveTel(phone: string, override: string): string {
  return override || `tel:${phoneHref(phone)}`;
}

export function SiteFooter({ footer, documents, locale }: SiteFooterProps) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const page = segments[1] ?? "";
  const isHomePage = segments.length === 1;
  const footerBgClass =
    isHomePage || page === "about" || page === "programs"
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

        {/* 3 columns */}
        <div className="mx-auto grid max-w-sm grid-cols-1 gap-x-12 gap-y-10 pb-16 min-[350px]:grid-cols-2 md:max-w-none md:grid-cols-3">
          <div className="flex flex-col gap-3">
            <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">{footer.columns.contact}</p>
            <div className="flex flex-col gap-1">
              <a href={resolveMailto(footer.contact.email, footer.contact.emailHref)} className="link text-sm">
                {footer.contact.email}
              </a>
              {footer.contact.phone && (
                <a href={resolveTel(footer.contact.phone, footer.contact.phoneHref)} className="link text-sm">
                  {footer.contact.phone}
                </a>
              )}
              {footer.contact.linkedin && (
                <a href={footer.contact.linkedin} target="_blank" rel="noopener noreferrer" className="link text-sm">
                  LinkedIn
                </a>
              )}
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

          <div className="hidden flex-col gap-3">
            <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">{footer.columns.documents}</p>
            <div className="flex flex-col items-start gap-1">
              {documents.map((doc) =>
                doc.externalUrl ? (
                  <a
                    key={doc.name}
                    href={doc.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link text-sm"
                  >
                    {doc.label}
                  </a>
                ) : (
                  <DocumentDialog
                    key={doc.name}
                    trigger={
                      <button type="button" className="link text-sm">
                        {doc.label}
                      </button>
                    }
                    title={doc.title}
                    lastUpdated={doc.lastUpdated}
                    intro={doc.intro ? linkifyEmail(doc.intro, footer.contact.email) : undefined}
                    sections={doc.sections.map((s) => ({
                      heading: s.heading,
                      body: linkifyEmail(s.body, footer.contact.email),
                    }))}
                    footerNote={doc.footerNote}
                    closeLabel={CLOSE_LABEL[locale]}
                  />
                ),
              )}
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
