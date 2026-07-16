import type { Metadata } from "next";
import { Award, GraduationCap, Target } from "lucide-react";

import {
  completedCertifications,
  currentlyLearning,
  futureGoals,
} from "@/content/certifications";
import { createMetadata } from "@/lib/seo";
import { Section, SectionHeading } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";
import { PageHeader } from "@/components/sections/page-header";

export const metadata: Metadata = createMetadata({
  title: "Certifications & Learning",
  description:
    "Certifications and ongoing learning goals of Ahmed Moussa in cloud architecture, distributed systems, and AI-enabled software development.",
  path: "/certifications",
});

export default function CertificationsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Certifications & Learning"
        title="Certifications & continuous learning"
        description="Completed certifications are listed separately from active learning and future goals — nothing planned is presented as completed."
      />

      {/* Completed */}
      <Section>
        <Reveal>
          <SectionHeading
            eyebrow="Completed"
            title="Completed Certifications"
          />
        </Reveal>
        <div className="mt-8">
          {completedCertifications.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {completedCertifications.map((cert, i) => (
                <Reveal key={cert.name} delay={0.04 * i}>
                  <Card className="flex h-full items-start gap-4">
                    <span className="inline-flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-success/10 text-success">
                      <Award className="h-5 w-5" aria-hidden />
                    </span>
                    <div>
                      <h3 className="font-display font-bold text-foreground">{cert.name}</h3>
                      <p className="mt-1 text-sm text-muted">{cert.issuer}</p>
                      <p className="mt-1 text-sm text-subtle">{cert.date}</p>
                    </div>
                  </Card>
                </Reveal>
              ))}
            </div>
          ) : (
            <Reveal>
              <div className="rounded-xl border border-dashed border-border p-8 text-center">
                <Award className="mx-auto h-6 w-6 text-subtle" aria-hidden />
                <p className="mt-3 font-medium text-muted">
                  No completed certifications listed yet.
                </p>
                <p className="mt-1 text-sm text-subtle">
                  Verified certifications will appear here as they are earned.
                </p>
              </div>
            </Reveal>
          )}
        </div>
      </Section>

      {/* Currently learning */}
      <Section surface>
        <Reveal>
          <SectionHeading
            eyebrow="In Progress"
            title="Currently Learning"
            description="Active areas of study."
          />
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {currentlyLearning.map((item, i) => (
            <Reveal key={item} delay={0.04 * i}>
              <Card className="flex h-full items-center gap-4">
                <span className="inline-flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <GraduationCap className="h-5 w-5" aria-hidden />
                </span>
                <span className="font-medium text-foreground">{item}</span>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Future goals */}
      <Section>
        <Reveal>
          <SectionHeading
            eyebrow="Roadmap"
            title="Future Goals"
            description="Targeted next steps — presented as goals, not achievements."
          />
        </Reveal>
        <ul className="mt-8 space-y-3">
          {futureGoals.map((goal, i) => (
            <Reveal key={goal} delay={0.04 * i} as="li">
              <div className="flex items-center gap-4 rounded-xl border border-border bg-surface p-4">
                <span className="inline-flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <Target className="h-4 w-4" aria-hidden />
                </span>
                <span className="font-medium text-foreground">{goal}</span>
              </div>
            </Reveal>
          ))}
        </ul>
      </Section>
    </>
  );
}
