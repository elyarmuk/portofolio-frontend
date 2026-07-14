import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
};

/** Consistent hero band for inner pages. */
export function PageHeader({ eyebrow, title, description, children }: PageHeaderProps) {
  return (
    <div className="relative overflow-hidden border-b border-border">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(50%_60%_at_20%_0%,color-mix(in_srgb,var(--primary)_9%,transparent),transparent)]" />
      <Container className="py-14 sm:py-16 lg:py-20">
        <Reveal>
          {eyebrow && (
            <p className="mb-3 font-mono text-xs font-medium uppercase tracking-[0.18em] text-primary">
              {eyebrow}
            </p>
          )}
          <h1 className="max-w-3xl text-hero font-extrabold tracking-tight text-foreground">
            {title}
          </h1>
          {description && (
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{description}</p>
          )}
          {children && <div className="mt-8">{children}</div>}
        </Reveal>
      </Container>
    </div>
  );
}
