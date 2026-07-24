import type { Metadata } from "next";
import Image from "next/image";
import { Award, GraduationCap, Target, ExternalLink } from "lucide-react";

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
    "AWS certifications and ongoing learning goals of Ahmed Moussa — Cloud Practitioner, Solutions Architect Associate, and Developer Associate.",
  path: "/certifications",
});

export default function CertificationsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Certifications & Learning"
        title="Cloud credentials & continuous learning"
        description="Verified AWS certifications that validate cloud fluency, architecture, and developer skills — kept separate from active learning and future goals."
      />

      {/* Completed */}
      <Section>
        <Reveal>
          <SectionHeading
            eyebrow="Completed"
            title="AWS Certifications"
            description="Industry-recognized credentials from Amazon Web Services."
          />
        </Reveal>
        <div className="mt-8">
          {completedCertifications.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {completedCertifications.map((cert, i) => {
                const body = (
                  <Card
                    interactive={Boolean(cert.credentialUrl)}
                    className="flex h-full flex-col items-center p-6 text-center sm:items-start sm:text-left"
                  >
                    {cert.logoSrc ? (
                      <div className="relative mx-auto h-36 w-32 sm:mx-0">
                        <Image
                          src={cert.logoSrc}
                          alt={cert.logoAlt ?? `${cert.name} badge`}
                          fill
                          className="object-contain"
                          sizes="128px"
                        />
                      </div>
                    ) : (
                      <span className="inline-flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-success/10 text-success">
                        <Award className="h-5 w-5" aria-hidden />
                      </span>
                    )}
                    <div className="mt-5 w-full">
                      <h3 className="font-display text-lg font-bold text-foreground">
                        {cert.name}
                      </h3>
                      <p className="mt-1 text-sm text-muted">{cert.issuer}</p>
                      {cert.date && (
                        <p className="mt-1 text-sm text-subtle">{cert.date}</p>
                      )}
                      {cert.credentialUrl && (
                        <p className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary">
                          View credential
                          <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                        </p>
                      )}
                    </div>
                  </Card>
                );

                return (
                  <Reveal key={cert.name} delay={0.04 * i}>
                    {cert.credentialUrl ? (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block h-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color:var(--ring)]"
                        aria-label={`${cert.name} credential (opens in a new tab)`}
                      >
                        {body}
                      </a>
                    ) : (
                      body
                    )}
                  </Reveal>
                );
              })}
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
