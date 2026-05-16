import { cn } from "@/lib/utils";

type StatusBadgeVariant = "upcoming" | "current";

type StatusBadgeProps = {
  label: string;
  variant: StatusBadgeVariant;
  className?: string;
};

const variantClasses: Record<StatusBadgeVariant, string> = {
  upcoming: "border-badge-upcoming-border bg-badge-upcoming-bg text-badge-upcoming-fg",
  current: "border-badge-current-border bg-badge-current-bg text-badge-current-fg",
};

export function StatusBadge({ label, variant, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex w-fit rounded-full border px-3 py-1 text-[11px] font-medium uppercase tracking-[0.08em]",
        variantClasses[variant],
        className,
      )}
    >
      {label}
    </span>
  );
}
