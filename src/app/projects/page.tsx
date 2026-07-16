import type { Metadata } from "next";

import { projects } from "@/content/projects";
import { createMetadata } from "@/lib/seo";
import { Section } from "@/components/ui/section";
import { PageHeader } from "@/components/sections/page-header";
import { ProjectsGrid } from "@/components/projects/projects-grid";

export const metadata: Metadata = createMetadata({
  title: "Projects",
  description:
    "Software projects by Ahmed Moussa — including Joe Limo, a transportation-management platform spanning mobile, web, backend, and cloud infrastructure.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Projects"
        title="Products & engineering work"
        description="Selected production-quality work. Private repositories are marked accordingly — source is not exposed without approval."
      />
      <Section>
        <ProjectsGrid projects={projects} />
      </Section>
    </>
  );
}
