import Image from "next/image";
import type { ProjectGalleryGroup, ProjectMedia } from "@/content/projects";
import { cn } from "@/lib/utils";

/** Full-width architecture / diagram figure. */
export function ProjectDiagram({ media }: { media: ProjectMedia }) {
  return (
    <figure className="mt-6 overflow-hidden rounded-xl border border-border bg-surface">
      <div className="relative w-full bg-surface-2">
        <Image
          src={media.src}
          alt={media.alt}
          width={media.width}
          height={media.height}
          className="h-auto w-full object-contain"
          sizes="(max-width: 1024px) 100vw, 720px"
          priority={false}
        />
      </div>
      {media.caption && (
        <figcaption className="border-t border-border px-4 py-3 text-sm text-muted">
          {media.caption}
        </figcaption>
      )}
    </figure>
  );
}

function GalleryItem({ item }: { item: ProjectMedia }) {
  const landscape = item.width > item.height;
  return (
    <figure className="overflow-hidden rounded-xl border border-border bg-surface shadow-[var(--shadow-card)]">
      <div
        className={cn(
          "relative bg-black",
          landscape ? "aspect-[16/9]" : "aspect-[9/16]",
        )}
      >
        <Image
          src={item.src}
          alt={item.alt}
          width={item.width}
          height={item.height}
          className="h-full w-full object-contain"
          sizes={
            landscape
              ? "(max-width: 1024px) 100vw, 960px"
              : "(max-width: 640px) 100vw, 360px"
          }
        />
      </div>
      {item.caption && (
        <figcaption className="border-t border-border px-3 py-2.5 font-mono text-xs text-muted">
          {item.caption}
        </figcaption>
      )}
    </figure>
  );
}

/** Responsive screenshot grid for a single media list. */
export function ProjectGallery({ items }: { items: ProjectMedia[] }) {
  return (
    <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => {
        const landscape = item.width > item.height;
        return (
          <li
            key={item.src}
            className={cn(landscape && "sm:col-span-2 lg:col-span-3")}
          >
            <GalleryItem item={item} />
          </li>
        );
      })}
    </ul>
  );
}

/** Grouped product gallery used on the dedicated gallery page. */
export function ProjectGalleryGroups({ groups }: { groups: ProjectGalleryGroup[] }) {
  return (
    <div className="space-y-16">
      {groups.map((group) => (
        <section key={group.title} aria-labelledby={`gallery-${group.title}`}>
          <h2
            id={`gallery-${group.title}`}
            className="font-display text-2xl font-bold text-foreground"
          >
            {group.title}
          </h2>
          {group.description && (
            <p className="mt-2 max-w-2xl leading-relaxed text-muted">{group.description}</p>
          )}
          <ProjectGallery items={group.items} />
        </section>
      ))}
    </div>
  );
}
