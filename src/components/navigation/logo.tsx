import Link from "next/link";
import { siteConfig } from "@/lib/site";

/** Monogram wordmark used in the header and footer.
 *  `onDark` styles it for a dark (navy) surface, e.g. the footer. */
export function Logo({ className, onDark = false }: { className?: string; onDark?: boolean }) {
  return (
    <Link
      href="/"
      aria-label={`${siteConfig.name} — home`}
      className={
        "group inline-flex items-center gap-2.5 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color:var(--ring)] " +
        (className ?? "")
      }
    >
      <span
        className={
          "flex h-9 w-9 items-center justify-center rounded-lg font-display text-sm font-bold tracking-tight text-white transition-transform group-hover:scale-105 " +
          (onDark ? "bg-primary" : "bg-navy dark:bg-primary")
        }
      >
        {siteConfig.initials}
      </span>
      <span
        className={
          "hidden font-display text-base font-semibold sm:inline " +
          (onDark ? "text-white" : "text-foreground")
        }
      >
        {siteConfig.name}
      </span>
    </Link>
  );
}
