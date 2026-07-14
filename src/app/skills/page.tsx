import type { Metadata } from "next";

import { skillDomains } from "@/content/skills";
import { createMetadata } from "@/lib/seo";
import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";
import { PageHeader } from "@/components/sections/page-header";

export const metadata: Metadata = createMetadata({
  title: "Skills",
  description:
    "Technical skills of Ahmed Moussa across backend, frontend, mobile, cloud, DevOps, infrastructure, databases, messaging, testing, observability, security, and architecture.",
  path: "/skills",
});

export default function SkillsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Skills"
        title="Technical skills by domain"
        description="Grouped by domain with brief notes on practical use. No proficiency percentages — just where and how each technology is applied."
      />

      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          {skillDomains.map((domain, i) => (
            <Reveal key={domain.domain} delay={Math.min(i * 0.03, 0.2)}>
              <Card className="h-full">
                <h2 className="font-display text-lg font-bold text-foreground">{domain.domain}</h2>
                <ul className="mt-4 space-y-3">
                  {domain.skills.map((skill) => (
                    <li key={skill.name} className="flex flex-col gap-0.5">
                      <span className="flex items-center gap-2 font-medium text-foreground">
                        <span
                          className="h-1.5 w-1.5 flex-none rounded-full bg-primary"
                          aria-hidden
                        />
                        {skill.name}
                      </span>
                      {skill.note && (
                        <span className="pl-3.5 text-sm text-muted">{skill.note}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
