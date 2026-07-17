import type { EngineeringHighlight } from "@/content/experience";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ContentIcon } from "@/components/cards/icon";
import { Reveal } from "@/components/ui/reveal";

export function HighlightCard({
  highlight,
  index,
}: {
  highlight: EngineeringHighlight;
  index: number;
}) {
  return (
    <Reveal delay={0.04 * index}>
      <Card className="h-full">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <ContentIcon name={highlight.icon} className="h-5 w-5" />
        </span>
        <h3 className="mt-4 font-display text-xl font-bold text-foreground">
          {highlight.title}
        </h3>
        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label={`${highlight.title} skills`}>
          {highlight.items.map((item) => (
            <li key={item}>
              <Badge variant="tech">{item}</Badge>
            </li>
          ))}
        </ul>
      </Card>
    </Reveal>
  );
}

export function EngineeringHighlightsGrid({
  highlights,
}: {
  highlights: EngineeringHighlight[];
}) {
  return (
    <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {highlights.map((h, i) => (
        <HighlightCard key={h.title} highlight={h} index={i} />
      ))}
    </div>
  );
}
