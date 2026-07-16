import { siteConfig } from "@/lib/site";
import { GithubIcon, LinkedinIcon } from "@/components/icons/brand";

const links = [
  { label: "LinkedIn", href: siteConfig.social.linkedin, Icon: LinkedinIcon },
  { label: "GitHub", href: siteConfig.social.github, Icon: GithubIcon },
];

/** External profile links (LinkedIn, GitHub).
 *  `onDark` styles them for a dark (navy) surface, e.g. the footer. */
export function SocialLinks({ className, onDark = false }: { className?: string; onDark?: boolean }) {
  const linkClasses = onDark
    ? "border-white/20 text-slate-300 hover:border-white/40 hover:text-white"
    : "border-border text-muted hover:border-primary/40 hover:text-foreground";

  return (
    <div className={"flex items-center gap-1 " + (className ?? "")}>
      {links.map(({ label, href, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${label} (opens in a new tab)`}
          className={
            "inline-flex h-10 w-10 items-center justify-center rounded-lg border transition-colors " +
            linkClasses
          }
        >
          <Icon className="h-[18px] w-[18px]" />
        </a>
      ))}
    </div>
  );
}
