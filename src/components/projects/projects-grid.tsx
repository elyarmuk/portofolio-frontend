"use client";

import { useMemo, useState } from "react";
import type { Project, ProjectCategory } from "@/content/projects";
import { projectFilters } from "@/content/projects";
import { ProjectCard } from "./project-card";
import { cn } from "@/lib/utils";

/** Filterable grid of projects. Filtering is client-side over local content. */
export function ProjectsGrid({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<(ProjectCategory | "All")>("All");

  const filtered = useMemo(
    () => (active === "All" ? projects : projects.filter((p) => p.tags.includes(active))),
    [active, projects],
  );

  return (
    <div>
      <div
        role="group"
        aria-label="Filter projects by category"
        className="flex flex-wrap gap-2"
      >
        {projectFilters.map((filter) => {
          const isActive = active === filter;
          return (
            <button
              key={filter}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActive(filter)}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
                isActive
                  ? "border-primary bg-primary text-primary-contrast"
                  : "border-border bg-surface text-muted hover:border-primary/40 hover:text-foreground",
              )}
            >
              {filter}
            </button>
          );
        })}
      </div>

      <p className="mt-4 text-sm text-subtle" aria-live="polite">
        Showing {filtered.length} {filtered.length === 1 ? "project" : "projects"}
      </p>

      {filtered.length > 0 ? (
        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <div key={project.slug} className="relative">
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-10 rounded-xl border border-dashed border-border p-10 text-center text-muted">
          No projects in this category yet.
        </p>
      )}
    </div>
  );
}
