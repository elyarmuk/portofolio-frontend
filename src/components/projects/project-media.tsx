import Image from "next/image";
import type { ProjectMedia } from "@/content/projects";

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

export { ProjectGalleryGroups } from "./gallery-lightbox";
