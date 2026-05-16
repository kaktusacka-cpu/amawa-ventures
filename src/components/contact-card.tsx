import type { ReactNode } from "react";

type ContactCardProps = {
  title: string;
  description: string;
  children: ReactNode;
};

export function ContactCard({ title, description, children }: ContactCardProps) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-border bg-surface-alt p-6 md:p-8 text-left h-full">
      <h3 className="font-display text-2xl text-slate-900">{title}</h3>
      <p className="flex-1 text-base leading-7 text-slate-700">{description}</p>
      <div className="mt-auto pt-3">{children}</div>
    </div>
  );
}
