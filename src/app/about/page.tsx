import type { Metadata } from "next";
import { ArrowRight, Compass, Lightbulb, Rocket } from "lucide-react";

import { profile } from "@/content/profile";
import { createMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/container";
import { Section, SectionHeading } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { PageHeader } from "@/components/sections/page-header";

export const metadata: Metadata = createMetadata({
  title: "About",
  description:
    "About Ahmed Moussa — a software engineer building enterprise applications and modern digital products with Java, Spring Boot, React, cloud, and DevOps.",
  path: "/about",
});

const narrative = [
  {
    icon: Compass,
    heading: "Who I Am",
    body: profile.about.whoIAm,
  },
  {
    icon: Lightbulb,
    heading: "My Engineering Philosophy",
    body: profile.about.philosophy,
  },
  {
    icon: Rocket,
    heading: "Beyond Enterprise Engineering",
    body: profile.about.beyondEnterprise,
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="Enterprise engineer, product builder."
        description={profile.positioningStatement}
      />

      <Section>
        <div className="grid gap-6 lg:grid-cols-3">
          {narrative.map((item, i) => (
            <Reveal key={item.heading} delay={0.05 * i}>
              <Card className="h-full">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <item.icon className="h-5 w-5" aria-hidden />
                </span>
                <h2 className="mt-4 font-display text-xl font-bold text-foreground">
                  {item.heading}
                </h2>
                <p className="mt-3 leading-relaxed text-muted">{item.body}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section surface>
        <Reveal>
          <SectionHeading
            eyebrow="What I'm Learning"
            title="Deepening cloud, distributed systems & AI"
            description="Areas of active study as I grow toward cloud and application architecture."
          />
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {profile.about.learning.map((item, i) => (
            <Reveal key={item} delay={0.04 * i}>
              <div className="flex items-center gap-3 rounded-xl border border-border bg-surface p-4">
                <span className="flex h-2.5 w-2.5 flex-none rounded-full bg-primary" aria-hidden />
                <span className="font-medium text-foreground">{item}</span>
              </div>
            </Reveal>
          ))}
        </div>
        {/* A visual career timeline will be added here once verified dates are available. */}
        <Reveal delay={0.1}>
          <p className="mt-8 max-w-2xl text-sm text-subtle">
            A visual career journey/timeline will be added here once verified dates are available.
          </p>
        </Reveal>
      </Section>

      <Section>
        <Container className="px-0">
          <Reveal>
            <div className="flex flex-col items-start gap-6 rounded-2xl border border-border bg-surface p-8 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="font-display text-2xl font-bold text-foreground">
                  Want the details?
                </h2>
                <p className="mt-2 text-muted">
                  Explore my enterprise experience or review my résumé.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button href="/experience">
                  View Experience
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button href="/resume" variant="secondary">
                  Résumé
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
