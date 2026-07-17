import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";

import {
  featuredExperience,
  previousExperiences,
  engineeringHighlights,
} from "@/content/experience";
import { featuredProjects } from "@/content/projects";
import { createMetadata } from "@/lib/seo";
import { Section, SectionHeading } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { PageHeader } from "@/components/sections/page-header";
import {
  FeaturedExperience,
  ExperienceTimeline,
} from "@/components/experience/experience-cards";
import { EngineeringHighlightsGrid } from "@/components/experience/highlight-cards";
import { ExperienceProjectCard } from "@/components/experience/project-preview";

export const metadata: Metadata = createMetadata({
  title: "Experience",
  description:
    "Professional software engineering journey of Ahmed Moussa — enterprise engineering at JPMorgan Chase, cloud & DevOps strengths, and flagship product work.",
  path: "/experience",
});

export default function ExperiencePage() {
  return (
    <>
      <PageHeader
        eyebrow="Experience"
        title="Engineering journey & enterprise impact"
        description="A career story focused on building, shipping, and operating production systems — not a plain résumé dump. Start with enterprise engineering at JPMorgan Chase, then explore technical strengths and product work."
      />

      {/* Featured employer */}
      <Section id="featured">
        <Reveal>
          <SectionHeading
            eyebrow="Featured Experience"
            title="JPMorgan Chase"
            description="The primary, most detailed professional chapter — enterprise Java, cloud, CI/CD, and production engineering."
          />
        </Reveal>
        <div className="mt-8">
          <FeaturedExperience experience={featuredExperience} />
        </div>
        <Reveal>
          <p className="mt-6 max-w-2xl text-sm text-subtle">
            Confidential internal systems, proprietary names, and unverified metrics are
            intentionally omitted.
          </p>
        </Reveal>
      </Section>

      {/* Career timeline */}
      <Section id="timeline" surface>
        <Reveal>
          <SectionHeading
            eyebrow="Career Timeline"
            title="Previous professional experience"
            description="Additional software engineering roles appear here when verified from the approved résumé. Only confirmed employers, titles, and dates are published."
          />
        </Reveal>
        <div className="mt-8">
          <ExperienceTimeline items={previousExperiences} />
        </div>
      </Section>

      {/* Engineering highlights */}
      <Section id="highlights">
        <Reveal>
          <SectionHeading
            eyebrow="Engineering Highlights"
            title="Technical strengths beyond a single employer"
            description="A scannable view of backend, cloud, frontend, architecture, and testing capabilities used across enterprise and product work."
          />
        </Reveal>
        <EngineeringHighlightsGrid highlights={engineeringHighlights} />
      </Section>

      {/* Featured projects bridge */}
      <Section id="projects" surface>
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow="Featured Projects"
              title="From enterprise craft to product ownership"
              description="Continue into flagship work that applies the same engineering discipline to end-to-end products."
            />
            <Button href="/projects" variant="ghost" className="hidden sm:inline-flex">
              All projects
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </Reveal>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {featuredProjects.map((project, i) => (
            <ExperienceProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
        <Reveal delay={0.1}>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/projects">
              Explore projects
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button href="/contact" variant="secondary">
              Discuss an opportunity
            </Button>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
