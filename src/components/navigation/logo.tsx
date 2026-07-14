import Link from "next/link";
import { siteConfig } from "@/lib/site";

/** Monogram wordmark used in the header and footer. */
export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label={`${siteConfig.name} — home`}
      className={
        "group inline-flex items-center gap-2.5 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color:var(--ring)] " +
        (className ?? "")
      }
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy font-display text-sm font-bold tracking-tight text-white transition-transform group-hover:scale-105 dark:bg-primary">
        {siteConfig.initials}
      </span>
      <span className="hidden font-display text-base font-semibold text-foreground sm:inline">
        {siteConfig.name}
      </span>
    </Link>
  );
}
