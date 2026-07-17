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
    <div className="relative mx-auto w-full max-w-[20rem] sm:max-w-[22rem] lg:ml-auto lg:mr-0 lg:max-w-[24rem]">
      {/* Soft grid + glow behind the frame — kept clear of the face. */}
      <div aria-hidden className="absolute inset-3 -z-10 rounded-3xl bg-grid opacity-35" />
      <div
        aria-hidden
        className="absolute -inset-6 -z-10 rounded-[2rem] bg-[radial-gradient(circle_at_70%_30%,color-mix(in_srgb,var(--primary)_18%,transparent),transparent_55%),radial-gradient(circle_at_20%_80%,color-mix(in_srgb,var(--accent)_12%,transparent),transparent_60%)] blur-2xl"
      />

      <div className="relative overflow-hidden rounded-3xl border border-border bg-surface p-2 shadow-[var(--shadow-card-hover)] dark:border-primary/25">
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl">
          <Image
            src={src}
            alt={alt}
            fill
            priority
            sizes="(max-width: 640px) 78vw, (max-width: 1024px) 352px, 384px"
            className="object-cover object-[52%_28%]"
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
