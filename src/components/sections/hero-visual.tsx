import { Server, Cloud, Boxes, Database, Cpu, Smartphone, Code2 } from "lucide-react";

/**
 * Abstract technology visual for the hero.
 *
 * A layered "system diagram" motif representing backend services, cloud
 * infrastructure, APIs, microservices, data, AI, and client apps — rendered
 * with tokens and SVG so it adapts to light/dark and needs no image asset.
 *
 * To swap in a professional headshot later, replace this component's usage in
 * the hero with a <Image> element; the layout already reserves the space.
 */
export function HeroVisual() {
  const nodes = [
    { Icon: Smartphone, label: "Mobile" },
    { Icon: Code2, label: "Web" },
    { Icon: Server, label: "Services" },
    { Icon: Boxes, label: "Microservices" },
    { Icon: Cloud, label: "Cloud" },
    { Icon: Database, label: "Data" },
    { Icon: Cpu, label: "AI" },
  ];

  return (
    <div
      aria-hidden
      className="relative mx-auto aspect-square w-full max-w-md select-none"
    >
      {/* Backdrop glow */}
      <div className="absolute inset-0 rounded-3xl bg-grid opacity-60" />
      <div className="absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_30%_20%,color-mix(in_srgb,var(--primary)_28%,transparent),transparent_55%),radial-gradient(circle_at_75%_80%,color-mix(in_srgb,var(--accent)_26%,transparent),transparent_55%)] blur-2xl" />

      {/* Central card: the "platform" */}
      <div className="absolute left-1/2 top-1/2 flex w-44 -translate-x-1/2 -translate-y-1/2 flex-col gap-2 rounded-2xl border border-border bg-surface/90 p-4 shadow-[var(--shadow-card-hover)] backdrop-blur">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy text-xs font-bold text-white dark:bg-primary">
            AM
          </span>
          <div className="h-2 w-16 rounded-full bg-border-strong" />
        </div>
        <div className="space-y-1.5 font-mono text-[10px] leading-tight text-subtle">
          <p><span className="text-primary">@RestController</span></p>
          <p>service<span className="text-accent">.deploy</span>()</p>
          <p className="text-success">● production</p>
        </div>
      </div>

      {/* Orbiting capability nodes */}
      {nodes.map(({ Icon, label }, i) => {
        const angle = (i / nodes.length) * Math.PI * 2 - Math.PI / 2;
        const radius = 42; // percentage of container
        const x = 50 + radius * Math.cos(angle);
        const y = 50 + radius * Math.sin(angle);
        return (
          <div
            key={label}
            className="absolute flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-0.5 rounded-xl border border-border bg-surface/90 shadow-[var(--shadow-card)] backdrop-blur"
            style={{ left: `${x}%`, top: `${y}%` }}
          >
            <Icon className="h-5 w-5 text-primary" />
            <span className="font-mono text-[8px] text-subtle">{label}</span>
          </div>
        );
      })}
    </div>
  );
}
