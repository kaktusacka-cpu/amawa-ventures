"use client";

import type { ReactNode } from "react";
import { DocumentDialog } from "@/components/document-dialog";
import { privacyCopy } from "@/lib/privacy-copy";
import { isLocale, defaultLocale, type Locale } from "@/lib/i18n";

const closeLabel: Record<Locale, string> = {
  en: "Close",
  es: "Cerrar",
  sk: "Zavrieť",
};

function linkifyEmail(text: string): ReactNode {
  const email = "info@amawaventures.com";
  const parts = text.split(email);
  if (parts.length < 2) return text;
  return (
    <>
      {parts[0]}
      <a href={`mailto:${email}`} className="link">
        {email}
      </a>
      {parts.slice(1).join(email)}
    </>
  );
}

type PrivacyDialogProps = {
  locale: string;
  trigger: ReactNode;
};

export function PrivacyDialog({ locale, trigger }: PrivacyDialogProps) {
  const resolvedLocale = isLocale(locale) ? locale : defaultLocale;
  const c = privacyCopy[resolvedLocale];

  const sections = [
    ...c.sections.map((s) => ({
      heading: s.heading,
      body: s.body as ReactNode,
    })),
    {
      heading: c.contactHeading,
      body: linkifyEmail(c.contactBody),
    },
  ];

  return (
    <DocumentDialog
      trigger={trigger}
      title={c.title}
      lastUpdated={c.lastUpdated}
      intro={c.intro}
      sections={sections}
      footerNote={c.draftNotice}
      closeLabel={closeLabel[resolvedLocale]}
    />
  );
}