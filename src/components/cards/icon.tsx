import {
  Server,
  Cloud,
  Layers,
  Lightbulb,
  Workflow,
  ClipboardCheck,
  Monitor,
  KanbanSquare,
  Boxes,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  server: Server,
  cloud: Cloud,
  layers: Layers,
  lightbulb: Lightbulb,
  /** CI/CD pipelines and release automation */
  pipeline: Workflow,
  /** Automated testing and code quality */
  test: ClipboardCheck,
  /** Monitoring dashboards and production support */
  observe: Monitor,
  /** Agile delivery and team collaboration */
  users: KanbanSquare,
  architecture: Boxes,
};

/** Resolves a named icon (from content files) to a Lucide component. */
export function ContentIcon({ name, className }: { name: string; className?: string }) {
  const Icon = iconMap[name] ?? Server;
  return <Icon className={className} aria-hidden />;
}
