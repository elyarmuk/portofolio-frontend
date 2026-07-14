"use server";

import { headers } from "next/headers";
import { contactSchema, type ContactState } from "@/lib/validation/contact";
import { rateLimit, pruneRateLimitBuckets } from "@/lib/rate-limit";
import { sendContactMessage } from "@/lib/email";

/** Best-effort client IP from common proxy headers. */
async function getClientIp(): Promise<string> {
  const h = await headers();
  const forwarded = h.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return h.get("x-real-ip") ?? "unknown";
}

/**
 * Server action backing the contact form.
 *
 * Security layers: honeypot field, per-IP rate limiting, and authoritative
 * server-side validation. Server Actions carry a built-in POST/origin check,
 * which provides CSRF protection for this mutation.
 */
export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const raw = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    subject: String(formData.get("subject") ?? ""),
    reason: String(formData.get("reason") ?? ""),
    message: String(formData.get("message") ?? ""),
    company: String(formData.get("company") ?? ""), // honeypot
  };

  const echo = {
    name: raw.name,
    email: raw.email,
    subject: raw.subject,
    reason: raw.reason,
    message: raw.message,
  };

  // 1) Honeypot — silently succeed so bots get no signal.
  if (raw.company.trim().length > 0) {
    return { status: "success", message: "Thanks — your message has been sent." };
  }

  // 2) Rate limit per IP.
  pruneRateLimitBuckets();
  const ip = await getClientIp();
  const { allowed } = rateLimit(`contact:${ip}`, { limit: 5, windowMs: 10 * 60_000 });
  if (!allowed) {
    return {
      status: "error",
      message: "You've sent several messages recently. Please try again in a little while.",
      values: echo,
    };
  }

  // 3) Validate.
  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    const errors: ContactState["errors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof typeof errors;
      if (key && !errors[key]) errors[key] = issue.message;
    }
    return {
      status: "error",
      message: "Please fix the highlighted fields and try again.",
      errors,
      values: echo,
    };
  }

  // 4) Deliver.
  const result = await sendContactMessage(parsed.data);
  if (!result.ok) {
    return {
      status: "error",
      message: "Something went wrong sending your message. Please email me directly instead.",
      values: echo,
    };
  }

  return {
    status: "success",
    message: "Thanks for reaching out — I'll get back to you soon.",
  };
}
