import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Images } from "lucide-react";
import type { Project } from "@/content/projects";
import { Card } from "@/components/ui/card";
import { Badge, StatusBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

function previewFor(project: Project): { src: string; alt: string } | null {
  const groups = project.caseStudy?.gallery?.groups;
  const first = groups?.[0]?.items?.[0];
  if (!first) return null;
  return { src: first.src, alt: first.alt };
}

/** Project preview card used on the Experience page. */
export function ExperienceProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const preview = previewFor(project);
  const href = `/projects/${project.slug}`;
  const hasCaseStudy = Boolean(project.caseStudy);

  return (
    <Reveal delay={0.05 * index}>
      <Card interactive className="flex h-full flex-col overflow-hidden p-0">
        {preview ? (
          <div className="relative aspect-[16/10] bg-black">
            <Image
              src={preview.src}
              alt={preview.alt}
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        ) : (
          <div className="flex aspect-[16/10] items-center justify-center bg-surface-2">
            <Images className="h-8 w-8 text-subtle" aria-hidden />
          </div>
        )}

        <div className="flex flex-1 flex-col p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-mono text-xs font-medium uppercase tracking-wider text-primary">
                {project.category}
              </p>
              <h3 className="mt-1.5 font-display text-xl font-bold text-foreground">
                {hasCaseStudy ? (
                  <Link href={href} className="hover:text-primary focus-visible:text-primary">
                    <span className="absolute inset-0" aria-hidden />
                    {project.name}
                  </Link>
                ) : (
                  project.name
                )}
              </h3>
            </div>
            <StatusBadge status={project.status} />
          </div>

          <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{project.summary}</p>

          <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies">
            {project.technologies.slice(0, 6).map((tech) => (
              <li key={tech}>
                <Badge variant="tech">{tech}</Badge>
              </li>
            ))}
          </ul>

          {hasCaseStudy && (
            <div className="relative z-10 mt-5 border-t border-border pt-4">
              <Button href={href} variant="secondary" className="w-full sm:w-auto">
                View Project
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </Card>
    </Reveal>
  );
}
