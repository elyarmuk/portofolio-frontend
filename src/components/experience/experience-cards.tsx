import { Briefcase, MapPin } from "lucide-react";
import type { Experience } from "@/content/experience";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ContentIcon } from "@/components/cards/icon";
import { Reveal } from "@/components/ui/reveal";

/** Expanded featured employer block (JPMorgan Chase). */
export function FeaturedExperience({ experience }: { experience: Experience }) {
  return (
    <Reveal>
      <article className="overflow-hidden rounded-2xl border border-border bg-surface shadow-[var(--shadow-card)]">
        <div className="border-b border-border bg-[radial-gradient(80%_120%_at_0%_0%,color-mix(in_srgb,var(--primary)_12%,transparent),transparent)] px-6 py-8 sm:px-8 sm:py-10">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="info">Featured Experience</Badge>
            <Badge variant="success">
              {experience.startDate} — {experience.endDate}
            </Badge>
          </div>
          <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            {experience.company}
          </h2>
          <p className="mt-2 text-lg font-semibold text-primary">{experience.role}</p>
          <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" aria-hidden />
              {experience.location}
            </span>
          </p>
          {experience.companyDescription && (
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">
              {experience.companyDescription}
            </p>
          )}
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/90">
            {experience.summary}
          </p>
        </div>

        <div className="px-6 py-8 sm:px-8">
          <h3 className="font-mono text-xs font-semibold uppercase tracking-widest text-subtle">
            Technologies
          </h3>
          <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Technologies used">
            {experience.technologies.map((tech) => (
              <li key={tech}>
                <Badge variant="tech">{tech}</Badge>
              </li>
            ))}
          </ul>

          <h3 className="mt-10 font-display text-xl font-bold text-foreground">
            Selected Engineering Contributions
          </h3>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2">
            {experience.contributions.map((group) => (
              <li key={group.category}>
                <Card className="h-full p-5">
                  <div className="flex items-start gap-3">
                    <span className="inline-flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <ContentIcon name={group.icon ?? "server"} className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
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
                  </div>
                </Card>
              </li>
            ))}
          </ul>
        </div>
      </article>
    </Reveal>
  );
}

/** Compact timeline entry for prior roles. */
export function TimelineItem({
  experience,
  index,
}: {
  experience: Experience;
  index: number;
}) {
  return (
    <Reveal delay={0.05 * index} as="li" className="relative">
      <span
        className="absolute -left-[41px] top-1 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-surface text-primary sm:-left-[49px]"
        aria-hidden
      >
        <Briefcase className="h-3 w-3" />
      </span>

      <Card>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h3 className="font-display text-xl font-bold text-foreground">
              {experience.company}
            </h3>
            <p className="mt-1 font-medium text-primary">{experience.role}</p>
            <p className="mt-1 text-sm text-subtle">{experience.location}</p>
          </div>
          <Badge variant="info" className="w-fit">
            {experience.startDate} — {experience.endDate}
          </Badge>
        </div>

        {experience.companyDescription && (
          <p className="mt-4 text-sm leading-relaxed text-muted">
            {experience.companyDescription}
          </p>
        )}
        <p className="mt-3 leading-relaxed text-muted">{experience.summary}</p>

        {experience.achievements && experience.achievements.length > 0 && (
          <ul className="mt-4 space-y-1.5">
            {experience.achievements.map((item) => (
              <li key={item} className="flex gap-2 text-sm leading-relaxed text-muted">
                <span className="mt-2 h-1 w-1 flex-none rounded-full bg-primary" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        )}

        <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Technologies">
          {experience.technologies.map((tech) => (
            <li key={tech}>
              <Badge variant="tech">{tech}</Badge>
            </li>
          ))}
        </ul>
      </Card>
    </Reveal>
  );
}

/** Vertical career timeline for non-featured roles. */
export function ExperienceTimeline({ items }: { items: Experience[] }) {
  if (items.length === 0) {
    return (
      <Reveal>
        <Card className="border-dashed">
          <p className="leading-relaxed text-muted">
            Additional prior software engineering roles will appear here once verified
            against the approved résumé. Only confirmed employers, titles, and dates are
            published.
          </p>
        </Card>
      </Reveal>
    );
  }

  return (
    <ol className="relative space-y-8 border-l border-border pl-8 sm:pl-10">
      {items.map((exp, i) => (
        <TimelineItem key={`${exp.company}-${exp.startDate}`} experience={exp} index={i} />
      ))}
    </ol>
  );
}
