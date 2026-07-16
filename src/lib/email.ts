import type { ContactInput } from "./validation/contact";

/**
 * Sends the contact message via the Resend HTTP API (no SDK dependency).
 *
 * Delivery model:
 * - `from`     → CONTACT_FROM_EMAIL (a verified sender you control).
 * - `reply_to` → the visitor's email, so replying goes back to them. The
 *   visitor's address is NEVER used as the sender.
 * - When Resend env vars are unset, the form still succeeds but nothing is sent
 *   (useful in development).
 *
 * Logging policy (production-safe):
 * - Secrets (RESEND_API_KEY) are only ever placed in the Authorization header,
 *   never logged.
 * - The visitor's email and the full message body are NEVER logged in
 *   production. Only non-sensitive metadata (reason, subject, message length)
 *   is logged. Full content is echoed to the console only in development.
 */
export async function sendContactMessage(
  data: ContactInput,
): Promise<{ ok: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  const isProd = process.env.NODE_ENV === "production";

  // Redacted, non-sensitive metadata for logs — no email address, no body.
  const meta = `reason="${data.reason}" subjectLength=${data.subject.length} messageLength=${data.message.length}`;

  const text = [
    `Reason: ${data.reason}`,
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Subject: ${data.subject}`,
    "",
    data.message,
  ].join("\n");

  if (!apiKey || !to || !from) {
    console.warn(
      `[contact] Email delivery not configured (set RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL). Submission received (${meta}).`,
    );
    // Development-only convenience — full content is never logged in production.
    if (!isProd) {
      console.info(`[contact] (dev only) submission body:\n${text}`);
    }
    return { ok: true };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: data.email,
        subject: `[Portfolio] ${data.reason}: ${data.subject}`,
        text,
      }),
    });

    if (!res.ok) {
      // Log the status only — not the response body — to avoid leaking any
      // request echo or sensitive content.
      console.error(`[contact] Resend API error: status=${res.status} (${meta})`);
      return { ok: false, error: "delivery_failed" };
    }
    return { ok: true };
  } catch (err) {
    // Log a short reason only; never the raw error object or submission content.
    const reason = err instanceof Error ? err.message : "unknown error";
    console.error(`[contact] Email send failed: ${reason} (${meta})`);
    return { ok: false, error: "delivery_failed" };
  }
}
