import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Lock, ImageIcon } from "lucide-react";

import { projects, getProjectBySlug } from "@/content/projects";
import { siteConfig } from "@/lib/site";
import { createMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/container";
import { Badge, StatusBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { ProjectJsonLd } from "@/components/seo/json-ld";

type Params = { slug: string };

/** Only visible projects are statically generated; hidden slugs 404. */
export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return createMetadata({ title: "Project not found", noIndex: true });

  return createMetadata({
    title: `${project.name} — Case Study`,
    description: project.summary,
    path: `/projects/${project.slug}`,
  });
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const cs = project.caseStudy;

  return (
    <article>
      <ProjectJsonLd
        name={project.name}
        description={project.summary}
        url={`${siteConfig.url}/projects/${project.slug}`}
        keywords={project.technologies}
      />

      {/* Header */}
      <div className="relative overflow-hidden border-b border-border">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(50%_60%_at_20%_0%,color-mix(in_srgb,var(--primary)_10%,transparent),transparent)]" />
        <Container className="py-14 sm:py-16 lg:py-20">
          <Reveal>
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              All projects
            </Link>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-primary">
                {project.category}
              </p>
              <StatusBadge status={project.status} />
              {project.repo === "private" && (
                <span className="inline-flex items-center gap-1 font-mono text-xs text-subtle">
                  <Lock className="h-3 w-3" /> Private Repository
                </span>
              )}
            </div>
            <h1 className="mt-3 text-hero font-extrabold tracking-tight text-foreground">
              {project.name}
            </h1>
            {cs?.tagline && (
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{cs.tagline}</p>
            )}
          </Reveal>
        </Container>
      </div>

      <Container className="grid gap-12 py-14 lg:grid-cols-[1fr_16rem] lg:gap-16 lg:py-20">
        {/* Main content */}
        <div className="min-w-0 space-y-12">
          {cs ? (
            cs.sections.map((section, i) => (
              <Reveal key={section.heading} delay={Math.min(i * 0.03, 0.15)} as="section">
                <h2 className="font-display text-2xl font-bold text-foreground">
                  {section.heading}
                </h2>
                {section.body?.map((p) => (
                  <p key={p} className="mt-4 leading-relaxed text-muted">
                    {p}
                  </p>
                ))}
                {section.bullets && (
                  <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                    {section.bullets.map((b) => (
                      <li key={b} className="flex gap-2 leading-relaxed text-muted">
                        <span
                          className="mt-2.5 h-1 w-1 flex-none rounded-full bg-primary"
                          aria-hidden
                        />
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
                {section.diagramPlaceholder && (
                  <div className="mt-6 flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border-strong bg-surface-2/50 p-10 text-center">
                    <ImageIcon className="h-6 w-6 text-subtle" aria-hidden />
                    <p className="text-sm font-medium text-muted">Architecture diagram</p>
                    <p className="text-xs text-subtle">Detailed architecture diagram coming soon.</p>
                  </div>
                )}
              </Reveal>
            ))
          ) : (
            <p className="leading-relaxed text-muted">{project.description}</p>
          )}
        </div>

        {/* Sidebar */}
        <aside className="lg:sticky lg:top-24 lg:h-fit">
          <div className="rounded-xl border border-border bg-surface p-6">
            <h2 className="font-display text-lg font-bold text-foreground">Technology Stack</h2>
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {project.technologies.map((tech) => (
                <li key={tech}>
                  <Badge variant="tech">{tech}</Badge>
                </li>
              ))}
            </ul>
            <div className="mt-6 border-t border-border pt-6">
              <dl className="space-y-3 text-sm">
                <div>
                  <dt className="text-subtle">Status</dt>
                  <dd className="mt-0.5 font-medium text-foreground">{project.status}</dd>
                </div>
                {project.repo === "private" && (
                  <div>
                    <dt className="text-subtle">Repository</dt>
                    <dd className="mt-0.5 font-medium text-foreground">Private Repository</dd>
                  </div>
                )}
              </dl>
            </div>
            <Button href="/contact" variant="secondary" className="mt-6 w-full">
              Discuss this project
            </Button>
          </div>
        </aside>
      </Container>
    </article>
  );
}
