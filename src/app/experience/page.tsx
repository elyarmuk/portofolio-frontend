import type { Metadata } from "next";
import { Briefcase } from "lucide-react";

import { experiences } from "@/content/experience";
import { createMetadata } from "@/lib/seo";
import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/ui/reveal";
import { PageHeader } from "@/components/sections/page-header";

export const metadata: Metadata = createMetadata({
  title: "Experience",
  description:
    "Professional software engineering experience of Ahmed Moussa, including enterprise engineering at JPMorgan Chase.",
  path: "/experience",
});

export default function ExperiencePage() {
  return (
    <>
      <PageHeader
        eyebrow="Experience"
        title="Enterprise Engineering Experience"
        description="Building and supporting production software with Java, Spring Boot, cloud services, CI/CD, testing, and observability."
      />

      <Section>
        <ol className="relative space-y-10 border-l border-border pl-8 sm:pl-10">
          {experiences.map((exp, i) => (
            <Reveal key={exp.company} delay={0.05 * i} as="li" className="relative">
              {/* Timeline node */}
              <span
                className="absolute -left-[41px] top-1 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-surface text-primary sm:-left-[49px]"
                aria-hidden
              >
                <Briefcase className="h-3 w-3" />
              </span>

              <Card>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h2 className="font-display text-2xl font-bold text-foreground">
                      {exp.company}
                    </h2>
                    <p className="mt-1 font-medium text-primary">{exp.role}</p>
                    <p className="mt-1 text-sm text-subtle">{exp.location}</p>
                  </div>
                  <Badge variant="info" className="w-fit">
                    {exp.startDate} — {exp.endDate}
                  </Badge>
                </div>

                <p className="mt-5 max-w-3xl leading-relaxed text-muted">{exp.summary}</p>

                <div className="mt-6">
                  <h3 className="font-mono text-xs font-semibold uppercase tracking-widest text-subtle">
                    Technologies
                  </h3>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {exp.technologies.map((tech) => (
                      <li key={tech}>
                        <Badge variant="tech">{tech}</Badge>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8">
                  <h3 className="font-display text-lg font-bold text-foreground">
                    Selected Engineering Contributions
                  </h3>
                  <div className="mt-4 grid gap-5 sm:grid-cols-2">
                    {exp.contributions.map((group) => (
                      <div key={group.category}>
                        <h4 className="font-semibold text-foreground">{group.category}</h4>
                        <ul className="mt-2 space-y-1.5">
                          {group.points.map((point) => (
                            <li
                              key={point}
                              className="flex gap-2 text-sm leading-relaxed text-muted"
                            >
                              <span
                                className="mt-2 h-1 w-1 flex-none rounded-full bg-primary"
                                aria-hidden
                              />
                              {point}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </Reveal>
          ))}
        </ol>

        <Reveal>
          <p className="mt-10 max-w-2xl text-sm text-subtle">
            Note: role title, dates, and location are shown as <span className="font-mono">TODO</span>{" "}
            until verified against the approved résumé. Confidential internal details are
            intentionally omitted.
          </p>
        </Reveal>
      </Section>
    </>
  );
}
