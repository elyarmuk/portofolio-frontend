import { cn } from "@/lib/utils";

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: "default" | "tech" | "success" | "warning" | "info";
};

const variants = {
  default: "border-border bg-surface-2 text-muted",
  tech: "border-border bg-surface-2 text-foreground",
  success: "border-transparent bg-success/12 text-success",
  warning: "border-transparent bg-warning/12 text-warning",
  info: "border-transparent bg-primary/12 text-primary",
} as const;

/** Small pill label — used for tech tags and status indicators. */
export function Badge({ variant = "default", className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-xs font-medium",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}

type StatusBadgeProps = { status: string; className?: string };

/** Maps a project status string to an appropriately-colored badge. */
export function StatusBadge({ status, className }: StatusBadgeProps) {
  const lower = status.toLowerCase();
  const variant: BadgeProps["variant"] = lower.includes("production")
    ? "success"
    : lower.includes("discovery") || lower.includes("concept") || lower.includes("strategy")
      ? "warning"
      : "info";

  return (
    <Badge variant={variant} className={cn("py-1", className)}>
      <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-current" aria-hidden />
      {status}
    </Badge>
  );
}
