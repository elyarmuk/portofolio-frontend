import Image from "next/image";
import { Server, Cloud, Boxes, Database, Cpu, Smartphone, Code2 } from "lucide-react";

/**
 * Professional headshot for the hero, framed with the established design tokens
 * (rounded card, border, soft glow) and orbited by the same capability icons
 * that previously appeared in the abstract HeroVisual.
 *
 * Rendered only when the image file exists (checked server-side in the page),
 * so there is never a broken image in production.
 */
const orbitNodes = [
  { Icon: Smartphone, label: "Mobile" },
  { Icon: Code2, label: "Web" },
  { Icon: Server, label: "Services" },
  { Icon: Boxes, label: "APIs" },
  { Icon: Cloud, label: "Cloud" },
  { Icon: Database, label: "Data" },
  { Icon: Cpu, label: "AI" },
] as const;

export function HeroPortrait({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[22rem] select-none sm:max-w-md lg:ml-auto lg:mr-0">
      {/* Soft grid + glow behind the portrait — never over the face. */}
      <div aria-hidden className="absolute inset-[12%] -z-10 rounded-3xl bg-grid opacity-40" />
      <div
        aria-hidden
        className="absolute inset-[8%] -z-10 rounded-[2rem] bg-[radial-gradient(circle_at_70%_30%,color-mix(in_srgb,var(--primary)_18%,transparent),transparent_55%),radial-gradient(circle_at_20%_80%,color-mix(in_srgb,var(--accent)_12%,transparent),transparent_60%)] blur-2xl"
      />

      {/* Portrait sits in the center; orbit icons stay fully outside the frame. */}
      <div className="absolute left-1/2 top-1/2 w-[68%] max-w-[17.5rem] -translate-x-1/2 -translate-y-1/2">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-surface p-2 shadow-[var(--shadow-card-hover)] dark:border-primary/25">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl">
            <Image
              src={src}
              alt={alt}
              fill
              priority
              sizes="(max-width: 640px) 70vw, (max-width: 1024px) 280px, 300px"
              className="object-cover object-[52%_28%]"
            />
          </div>
        </div>

        <div className="absolute -bottom-3 left-1/2 z-10 -translate-x-1/2 rounded-full border border-border bg-surface px-4 py-1.5 shadow-[var(--shadow-card)]">
          <span className="flex items-center gap-2 font-mono text-xs text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-success" aria-hidden />
            Java Full-Stack · Cloud
          </span>
        </div>
      </div>

      {/* Capability icons — same engineering identity as the previous hero visual. */}
      {orbitNodes.map(({ Icon, label }, i) => {
        const angle = (i / orbitNodes.length) * Math.PI * 2 - Math.PI / 2;
        const radius = 44;
        const x = 50 + radius * Math.cos(angle);
        const y = 50 + radius * Math.sin(angle);
        return (
          <div
            key={label}
            aria-hidden
            className="absolute flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-0.5 rounded-xl border border-border bg-surface/95 shadow-[var(--shadow-card)] backdrop-blur sm:h-14 sm:w-14"
            style={{ left: `${x}%`, top: `${y}%` }}
          >
            <Icon className="h-4 w-4 text-primary sm:h-5 sm:w-5" />
            <span className="font-mono text-[8px] text-subtle">{label}</span>
          </div>
        );
      })}
    </div>
  );
}
