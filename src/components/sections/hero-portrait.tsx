import Image from "next/image";

/**
 * Professional headshot for the hero, framed with the established design tokens
 * (rounded card, border, gradient ring, subtle grid backdrop) so it sits in the
 * same footprint as the abstract HeroVisual it replaces.
 *
 * Rendered only when the image file exists (checked server-side in the page),
 * so there is never a broken image in production.
 */
export function HeroPortrait({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative mx-auto w-full max-w-[22rem] sm:max-w-sm lg:max-w-[25rem]">
      {/* Subtle technical treatment keeps the engineering identity behind the portrait. */}
      <div aria-hidden className="absolute inset-0 -z-10 rounded-3xl bg-grid opacity-45" />
      <div
        aria-hidden
        className="absolute -inset-5 -z-10 rounded-[2rem] bg-[radial-gradient(circle_at_30%_20%,color-mix(in_srgb,var(--primary)_20%,transparent),transparent_58%),radial-gradient(circle_at_75%_85%,color-mix(in_srgb,var(--accent)_14%,transparent),transparent_60%)] blur-2xl"
      />

      <div className="pointer-events-none absolute -left-4 top-8 hidden rounded-lg border border-border bg-surface/80 px-3 py-2 font-mono text-[10px] text-subtle shadow-[var(--shadow-card)] backdrop-blur sm:block">
        api.status: <span className="text-success">online</span>
      </div>
      <div className="pointer-events-none absolute -right-3 bottom-16 hidden rounded-lg border border-border bg-surface/80 px-3 py-2 font-mono text-[10px] text-subtle shadow-[var(--shadow-card)] backdrop-blur sm:block">
        cloud.deploy()
      </div>

      <div className="relative overflow-hidden rounded-3xl border border-border bg-surface p-2 shadow-[var(--shadow-card-hover)] dark:border-primary/25">
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl">
          <Image
            src={src}
            alt={alt}
            fill
            priority
            sizes="(max-width: 640px) 78vw, (max-width: 1024px) 360px, 400px"
            className="object-cover object-[58%_42%]"
          />
        </div>
      </div>

      {/* Small credential chip, consistent with the site's mono labels */}
      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-full border border-border bg-surface px-4 py-1.5 shadow-[var(--shadow-card)]">
        <span className="flex items-center gap-2 font-mono text-xs text-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-success" aria-hidden />
          Java Full-Stack · Cloud
        </span>
      </div>
    </div>
  );
}
