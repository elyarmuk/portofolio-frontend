/**
 * Tiny className joiner. Filters out falsy values and joins with a space.
 * Kept dependency-free intentionally (no clsx/tailwind-merge needed at this scale).
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
