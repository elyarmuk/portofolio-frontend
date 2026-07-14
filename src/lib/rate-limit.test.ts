import { describe, it, expect } from "vitest";
import { rateLimit } from "./rate-limit";

describe("rateLimit", () => {
  it("allows requests up to the limit, then blocks", () => {
    const key = `test-${Math.floor(performance.now())}-a`;
    const opts = { limit: 3, windowMs: 60_000 };

    expect(rateLimit(key, opts).allowed).toBe(true);
    expect(rateLimit(key, opts).allowed).toBe(true);
    expect(rateLimit(key, opts).allowed).toBe(true);
    expect(rateLimit(key, opts).allowed).toBe(false);
  });

  it("reports decreasing remaining allowance", () => {
    const key = `test-${Math.floor(performance.now())}-b`;
    const opts = { limit: 2, windowMs: 60_000 };

    expect(rateLimit(key, opts).remaining).toBe(1);
    expect(rateLimit(key, opts).remaining).toBe(0);
  });

  it("tracks separate keys independently", () => {
    const opts = { limit: 1, windowMs: 60_000 };
    const a = rateLimit("key-a", opts);
    const b = rateLimit("key-b", opts);
    expect(a.allowed).toBe(true);
    expect(b.allowed).toBe(true);
  });
});
