import Image from "next/image";
import type { ProjectMedia } from "@/content/projects";
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

/** Responsive screenshot gallery for case study sections. */
export function ProjectGallery({ items }: { items: ProjectMedia[] }) {
  return (
    <ul className="mt-6 grid gap-4 sm:grid-cols-2">
      {items.map((item) => {
        const landscape = item.width > item.height;
        return (
          <li
            key={item.src}
            className={cn(landscape && "sm:col-span-2")}
          >
            <figure className="overflow-hidden rounded-xl border border-border bg-surface shadow-[var(--shadow-card)]">
              <div
                className={cn(
                  "relative bg-black",
                  landscape ? "aspect-[4/3]" : "aspect-[9/16]",
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
                      ? "(max-width: 1024px) 100vw, 720px"
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
          </li>
        );
      })}
    </ul>
  );
}
