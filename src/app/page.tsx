import { existsSync } from "node:fs";
import { join } from "node:path";
import { ArrowRight, Download, Check } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons/brand";

import { profile } from "@/content/profile";
import { techStack } from "@/content/tech-stack";
import { featuredProjects } from "@/content/projects";
import { experiences } from "@/content/experience";
import { siteConfig } from "@/lib/site";

import { Container } from "@/components/ui/container";
import { Section, SectionHeading } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/ui/reveal";
import { HeroVisual } from "@/components/sections/hero-visual";
import { HeroPortrait } from "@/components/sections/hero-portrait";
import { ContentIcon } from "@/components/cards/icon";
import { ProjectCard } from "@/components/projects/project-card";

const jpmc = experiences.find((e) => e.company === "JPMorgan Chase");

// Show the professional headshot when its file is present (checked at build
// time); otherwise fall back to the abstract hero visual.
const headshotAvailable = existsSync(
  join(process.cwd(), "public", profile.headshot.src.replace(/^\//, "")),
);

export default function HomePage() {
  return (
    <>
      {/* ---------------------------------------------------------------- */}
      {/* SECTION 1 — Hero                                                 */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_15%_0%,color-mix(in_srgb,var(--primary)_10%,transparent),transparent)]" />
        <Container className="grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:py-28">
          <div>
            <Reveal>
              <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 font-mono text-xs text-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-success" aria-hidden />
                Available for engineering &amp; architecture roles
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="text-hero font-extrabold tracking-tight text-foreground">
                {profile.name}
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-3 flex flex-wrap gap-x-2 gap-y-1 font-display text-lg font-semibold text-primary sm:text-xl">
                {profile.roles.map((role, i) => (
                  <span key={role} className="flex items-center gap-2">
                    {role}
                    {i < profile.roles.length - 1 && (
                      <span className="text-subtle" aria-hidden>
                        /
                      </span>
                    )}
                  </span>
                ))}
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-foreground/90">
                {profile.heroHeadline}
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-4 max-w-xl leading-relaxed text-muted">
                {profile.heroSupporting}
              </p>
            </Reveal>
            <Reveal delay={0.25}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button href="/projects" size="lg">
                  View My Projects
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button href={siteConfig.resume.path} variant="secondary" size="lg">
                  <Download className="h-4 w-4" />
                  Download Résumé
                </Button>
              </div>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="mt-6 flex items-center gap-4 text-sm">
                <a
                  href={siteConfig.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-muted transition-colors hover:text-primary"
                >
                  <LinkedinIcon className="h-4 w-4" /> LinkedIn
                </a>
                <a
                  href={siteConfig.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-muted transition-colors hover:text-primary"
                >
                  <GithubIcon className="h-4 w-4" /> GitHub
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            {headshotAvailable ? (
              <HeroPortrait src={profile.headshot.src} alt={profile.headshot.alt} />
            ) : (
              <HeroVisual />
            )}
          </Reveal>
        </Container>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* SECTION 2 — Professional Summary                                 */}
      {/* ---------------------------------------------------------------- */}
      <Section surface>
        <Reveal>
          <SectionHeading
            eyebrow="Professional Summary"
            title={profile.summary.heading}
          />
        </Reveal>
        <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <Reveal delay={0.05}>
            <div className="space-y-4 text-base leading-relaxed text-muted sm:text-lg">
              {profile.summary.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {profile.capabilities.map((cap, i) => (
              <Reveal key={cap.title} delay={0.05 * i}>
                <Card className="h-full">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <ContentIcon name={cap.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-bold text-foreground">
                    {cap.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{cap.description}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* SECTION 3 — Core Technology Stack                                */}
      {/* ---------------------------------------------------------------- */}
      <Section>
        <Reveal>
          <SectionHeading
            eyebrow="Core Technology Stack"
            title="The tools I build production systems with"
            description="A practical, hands-on toolkit spanning backend, frontend, mobile, cloud, DevOps, data, and quality engineering."
          />
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {techStack.map((group, i) => (
            <Reveal key={group.category} delay={0.04 * i}>
              <Card className="h-full">
                <h3 className="font-mono text-sm font-semibold uppercase tracking-wider text-primary">
                  {group.category}
                </h3>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <li key={item}>
                      <Badge variant="tech">{item}</Badge>
                    </li>
                  ))}
                </ul>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* SECTION 4 — Featured Experience                                  */}
      {/* ---------------------------------------------------------------- */}
      {jpmc && (
        <Section surface>
          <Reveal>
            <SectionHeading eyebrow="Enterprise Engineering Experience" title="Enterprise Engineering Experience" />
          </Reveal>
          <Reveal delay={0.05}>
            <Card className="mt-8">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="font-display text-2xl font-bold text-foreground">{jpmc.company}</h3>
                  <p className="mt-1 text-muted">{jpmc.role}</p>
                </div>
                <Badge variant="info" className="w-fit">
                  {jpmc.startDate} — {jpmc.endDate}
                </Badge>
              </div>
              <p className="mt-5 max-w-3xl leading-relaxed text-muted">{jpmc.summary}</p>
              <ul className="mt-5 flex flex-wrap gap-1.5">
                {jpmc.technologies.slice(0, 10).map((tech) => (
                  <li key={tech}>
                    <Badge variant="tech">{tech}</Badge>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <Button href="/experience" variant="secondary">
                  View Experience
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          </Reveal>
        </Section>
      )}

      {/* ---------------------------------------------------------------- */}
      {/* SECTION 5 — Featured Projects                                    */}
      {/* ---------------------------------------------------------------- */}
      <Section>
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow="Featured Projects"
              title="Selected work"
              description="Production-quality engineering work selected for this portfolio."
            />
            <Button href="/projects" variant="ghost" className="hidden sm:inline-flex">
              All projects
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project, i) => (
            <Reveal key={project.slug} delay={0.05 * i} className="relative">
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* SECTION 6 — Engineering Approach                                 */}
      {/* ---------------------------------------------------------------- */}
      <Section surface>
        <Reveal>
          <SectionHeading
            eyebrow="Engineering Approach"
            title="How I Build Software"
            description="A repeatable lifecycle that keeps architecture, security, testing, and observability in view from day one."
          />
        </Reveal>
        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {profile.approach.map((step, i) => (
            <Reveal key={step.step} delay={0.04 * i} as="li">
              <Card className="h-full">
                <span className="font-mono text-sm font-bold text-primary">
                  {String(step.step).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-display text-lg font-bold text-foreground">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.description}</p>
              </Card>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* SECTION 7 — Career Direction                                     */}
      {/* ---------------------------------------------------------------- */}
      <Section>
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <SectionHeading
              align="center"
              eyebrow="Career Direction"
              title={profile.careerDirection.heading}
              description={profile.careerDirection.body}
              className="mx-auto"
            />
            <ul className="mt-8 flex flex-wrap justify-center gap-2">
              {profile.about.learning.map((item) => (
                <li key={item}>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-sm text-muted">
                    <Check className="h-3.5 w-3.5 text-primary" />
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* SECTION 8 — Contact CTA                                          */}
      {/* ---------------------------------------------------------------- */}
      <Section>
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-border bg-navy px-6 py-14 text-center shadow-xl sm:px-12 dark:bg-surface">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_60%_at_50%_0%,color-mix(in_srgb,var(--primary)_35%,transparent),transparent)]" />
            <div className="relative mx-auto max-w-2xl">
              <h2 className="text-section font-bold text-white">{profile.contactCta.heading}</h2>
              <p className="mt-4 leading-relaxed text-slate-300">{profile.contactCta.body}</p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Button href="/contact" size="lg">
                  Contact Me
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button
                  href={siteConfig.social.linkedin}
                  size="lg"
                  variant="outline"
                  className="border-white/25 text-white hover:border-white hover:text-white"
                >
                  <LinkedinIcon className="h-4 w-4" />
                  Connect on LinkedIn
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
