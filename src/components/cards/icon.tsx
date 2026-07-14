import {
  Server,
  Cloud,
  Layers,
  Lightbulb,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  server: Server,
  cloud: Cloud,
  layers: Layers,
  lightbulb: Lightbulb,
};

/** Resolves a named icon (from content files) to a Lucide component. */
export function ContentIcon({ name, className }: { name: string; className?: string }) {
  const Icon = iconMap[name] ?? Server;
  return <Icon className={className} aria-hidden />;
}
