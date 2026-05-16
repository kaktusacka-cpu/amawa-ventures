"use client";

import { useState, type ReactNode } from "react";
import { Dialog } from "radix-ui";
import { X } from "lucide-react";

type DocumentSection = {
  heading: string;
  body: ReactNode;
};

type DocumentDialogProps = {
  trigger: ReactNode;
  title: string;
  lastUpdated?: string;
  intro?: ReactNode;
  sections: DocumentSection[];
  footerNote?: string;
  closeLabel?: string;
};

export function DocumentDialog({
  trigger,
  title,
  lastUpdated,
  intro,
  sections,
  footerNote,
  closeLabel = "Close",
}: DocumentDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-foreground/40 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0" />
        <Dialog.Content
          aria-describedby={undefined}
          className="fixed left-1/2 top-1/2 z-50 grid w-[calc(100%-2rem)] max-w-3xl -translate-x-1/2 -translate-y-1/2 grid-rows-[auto_1fr_auto] max-h-[90vh] overflow-hidden rounded-2xl border border-border bg-surface shadow-xl focus:outline-none data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95"
        >
          <header className="flex items-start justify-between gap-4 border-b border-border p-4 sm:p-6">
            <div>
              <Dialog.Title className="font-display text-2xl text-foreground sm:text-3xl">
                {title}
              </Dialog.Title>
              {lastUpdated ? (
                <p className="mt-1 text-sm text-muted-foreground">{lastUpdated}</p>
              ) : null}
            </div>
            <Dialog.Close asChild>
              <button
                type="button"
                aria-label={closeLabel}
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-surface-raised text-foreground-body transition-colors hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <X className="h-5 w-5" />
              </button>
            </Dialog.Close>
          </header>

          <div className="overflow-y-auto p-4 sm:p-6">
            {intro ? (
              <p className="text-base leading-7 text-foreground-body">{intro}</p>
            ) : null}

            <div className={`${intro ? "mt-8" : ""} space-y-8`}>
              {sections.map((section) => (
                <section key={section.heading}>
                  <h3 className="font-display text-xl text-foreground">
                    {section.heading}
                  </h3>
                  <p className="mt-2 text-base leading-7 text-foreground-body">
                    {section.body}
                  </p>
                </section>
              ))}
            </div>
          </div>

          {footerNote ? (
            <footer className="border-t border-border p-4 text-sm text-muted-foreground sm:p-6">
              {footerNote}
            </footer>
          ) : null}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}