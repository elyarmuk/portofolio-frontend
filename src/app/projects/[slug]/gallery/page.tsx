import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { getProjectBySlug, getProjectsWithGallery } from "@/content/projects";
import { createMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { ProjectGalleryGroups } from "@/components/projects/project-media";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return getProjectsWithGallery().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  const gallery = project?.caseStudy?.gallery;
  if (!project || !gallery) {
    return createMetadata({ title: "Gallery not found", noIndex: true });
  }

  return createMetadata({
    title: `${project.name} — Product Gallery`,
    description: gallery.description,
    path: `/projects/${project.slug}/gallery`,
  });
}

export default async function ProjectGalleryPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  const gallery = project?.caseStudy?.gallery;
  if (!project || !gallery) notFound();

  return (
    <article>
      <div className="relative overflow-hidden border-b border-border">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(50%_60%_at_20%_0%,color-mix(in_srgb,var(--primary)_10%,transparent),transparent)]" />
        <Container className="py-14 sm:py-16 lg:py-20">
          <Reveal>
            <Link
              href={`/projects/${project.slug}`}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to {project.name}
            </Link>
            <p className="mt-6 font-mono text-xs font-medium uppercase tracking-[0.18em] text-primary">
              Product Gallery
            </p>
            <h1 className="mt-3 text-hero font-extrabold tracking-tight text-foreground">
              {project.name}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
              {gallery.description}
            </p>
          </Reveal>
        </Container>
      </div>

      <Container className="py-14 lg:py-20">
        <Reveal>
          <ProjectGalleryGroups groups={gallery.groups} />
        </Reveal>
      </Container>
    </article>
  );
}
