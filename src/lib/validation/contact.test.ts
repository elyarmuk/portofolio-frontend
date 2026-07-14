import { describe, it, expect } from "vitest";
import { contactSchema, contactReasons } from "./contact";

const valid = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  subject: "Consulting inquiry",
  reason: "Consulting" as const,
  message: "I'd like to discuss a potential engagement in detail, thank you.",
  company: "",
};

describe("contactSchema", () => {
  it("accepts a valid submission", () => {
    const result = contactSchema.safeParse(valid);
    expect(result.success).toBe(true);
  });

  it("rejects an invalid email", () => {
    const result = contactSchema.safeParse({ ...valid, email: "not-an-email" });
    expect(result.success).toBe(false);
  });

  it("requires a message of at least 20 characters", () => {
    const result = contactSchema.safeParse({ ...valid, message: "too short" });
    expect(result.success).toBe(false);
  });

  it("rejects an unknown reason", () => {
    const result = contactSchema.safeParse({ ...valid, reason: "Spam" });
    expect(result.success).toBe(false);
  });

  it("rejects a filled honeypot field", () => {
    const result = contactSchema.safeParse({ ...valid, company: "bot inc" });
    expect(result.success).toBe(false);
  });

  it("trims surrounding whitespace on name", () => {
    const result = contactSchema.safeParse({ ...valid, name: "  Ada  " });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.name).toBe("Ada");
  });

  it("exposes the expected reason options", () => {
    expect(contactReasons).toContain("Employment Opportunity");
    expect(contactReasons).toContain("Startup Discussion");
    expect(contactReasons.length).toBe(6);
  });
});
