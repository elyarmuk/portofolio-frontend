/**
 * Minimal in-memory sliding-window rate limiter.
 *
 * Suitable for a low-traffic personal site on a single instance. On
 * multi-instance serverless platforms the counter is per-instance (not global),
 * so treat this as best-effort abuse mitigation rather than a hard guarantee.
 * For strict global limits, swap in a shared store (e.g. Upstash Redis).
 */
type Entry = { count: number; resetAt: number };

const buckets = new Map<string, Entry>();

export type RateLimitResult = {
  allowed: boolean;
  remaining: number;
  resetAt: number;
};

export function rateLimit(
  key: string,
  { limit = 5, windowMs = 60_000 }: { limit?: number; windowMs?: number } = {},
): RateLimitResult {
  const now = Date.now();
  const entry = buckets.get(key);

  if (!entry || now > entry.resetAt) {
    const resetAt = now + windowMs;
    buckets.set(key, { count: 1, resetAt });
    return { allowed: true, remaining: limit - 1, resetAt };
  }

  entry.count += 1;
  const allowed = entry.count <= limit;
  return { allowed, remaining: Math.max(0, limit - entry.count), resetAt: entry.resetAt };
}

/** Occasionally evict expired buckets to bound memory growth. */
export function pruneRateLimitBuckets() {
  const now = Date.now();
  for (const [key, entry] of buckets) {
    if (now > entry.resetAt) buckets.delete(key);
  }
}
