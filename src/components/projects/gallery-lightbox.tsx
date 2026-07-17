"use client";

import { useCallback, useEffect, useId, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { ProjectGalleryGroup, ProjectMedia } from "@/content/projects";
import { cn } from "@/lib/utils";

function flatten(groups: ProjectGalleryGroup[]): ProjectMedia[] {
  return groups.flatMap((g) => g.items);
}

function GalleryThumb({
  item,
  onOpen,
}: {
  item: ProjectMedia;
  onOpen: () => void;
}) {
  const landscape = item.width > item.height;
  return (
    <figure className="overflow-hidden rounded-xl border border-border bg-surface shadow-[var(--shadow-card)]">
      <button
        type="button"
        onClick={onOpen}
        className={cn(
          "group relative block w-full bg-black text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--ring)]",
          landscape ? "aspect-[16/9]" : "aspect-[9/16]",
        )}
        aria-label={`View larger: ${item.caption ?? item.alt}`}
      >
        <Image
          src={item.src}
          alt={item.alt}
          width={item.width}
          height={item.height}
          className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-[1.02]"
          sizes={
            landscape
              ? "(max-width: 1024px) 100vw, 960px"
              : "(max-width: 640px) 100vw, 360px"
          }
        />
        <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent px-3 py-2 text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
          Click to enlarge
        </span>
      </button>
      {item.caption && (
        <figcaption className="border-t border-border px-3 py-2.5 font-mono text-xs text-muted">
          {item.caption}
        </figcaption>
      )}
    </figure>
  );
}

function Lightbox({
  items,
  index,
  onClose,
  onPrev,
  onNext,
  titleId,
}: {
  items: ProjectMedia[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  titleId: string;
}) {
  const item = items[index];
  const landscape = item.width > item.height;

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onPrev, onNext]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative flex max-h-[92vh] w-full max-w-5xl flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-3 flex items-center justify-between gap-3 text-white">
          <p id={titleId} className="truncate font-mono text-sm">
            {item.caption ?? item.alt}
            <span className="ml-2 text-white/60">
              {index + 1} / {items.length}
            </span>
          </p>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            aria-label="Close image viewer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div
          className={cn(
            "relative mx-auto w-full overflow-hidden rounded-xl bg-black",
            landscape ? "max-h-[78vh]" : "max-h-[82vh] max-w-md",
          )}
        >
          <Image
            src={item.src}
            alt={item.alt}
            width={item.width}
            height={item.height}
            className="mx-auto h-auto max-h-[78vh] w-auto object-contain"
            sizes="(max-width: 1024px) 100vw, 1024px"
            priority
          />
        </div>

        {items.length > 1 && (
          <div className="mt-4 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={onPrev}
              className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-sm text-white transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </button>
            <button
              type="button"
              onClick={onNext}
              className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-sm text-white transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              aria-label="Next image"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/** Clickable product gallery with keyboard-accessible lightbox. */
export function ProjectGalleryGroups({ groups }: { groups: ProjectGalleryGroup[] }) {
  const items = flatten(groups);
  const [active, setActive] = useState<number | null>(null);
  const titleId = useId();

  const close = useCallback(() => setActive(null), []);
  const prev = useCallback(
    () => setActive((i) => (i === null ? i : (i - 1 + items.length) % items.length)),
    [items.length],
  );
  const next = useCallback(
    () => setActive((i) => (i === null ? i : (i + 1) % items.length)),
    [items.length],
  );

  const openItem = useCallback(
    (item: ProjectMedia) => {
      const idx = items.findIndex((m) => m.src === item.src);
      if (idx >= 0) setActive(idx);
    },
    [items],
  );

  return (
    <>
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
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {group.items.map((item) => {
                const landscape = item.width > item.height;
                return (
                  <li
                    key={item.src}
                    className={cn(landscape && "sm:col-span-2 lg:col-span-3")}
                  >
                    <GalleryThumb item={item} onOpen={() => openItem(item)} />
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>

      {active !== null && (
        <Lightbox
          items={items}
          index={active}
          onClose={close}
          onPrev={prev}
          onNext={next}
          titleId={titleId}
        />
      )}
    </>
  );
}
