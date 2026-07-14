import Link from "next/link";
import { ArrowUpRight, Lock } from "lucide-react";
import type { Project } from "@/content/projects";
import { Card } from "@/components/ui/card";
import { Badge, StatusBadge } from "@/components/ui/badge";

/** Project summary card used on the home and projects pages. */
export function ProjectCard({ project }: { project: Project }) {
  const hasCaseStudy = Boolean(project.caseStudy);
  const href = `/projects/${project.slug}`;
  const maxTags = 6;

  return (
    <Card interactive className="flex h-full flex-col">
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
        {project.technologies.slice(0, maxTags).map((tech) => (
          <li key={tech}>
            <Badge variant="tech">{tech}</Badge>
          </li>
        ))}
        {project.technologies.length > maxTags && (
          <li>
            <Badge variant="tech">+{project.technologies.length - maxTags}</Badge>
          </li>
        )}
      </ul>

      <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
        {hasCaseStudy ? (
          <span className="relative z-10 inline-flex items-center gap-1 text-sm font-medium text-primary">
            View Case Study
            <ArrowUpRight className="h-4 w-4" />
          </span>
        ) : (
          <span className="text-sm text-subtle">Case study coming soon</span>
        )}
        {project.repo === "private" && (
          <span className="inline-flex items-center gap-1 font-mono text-xs text-subtle">
            <Lock className="h-3 w-3" /> Private Repository
          </span>
        )}
      </div>
    </Card>
  );
}
