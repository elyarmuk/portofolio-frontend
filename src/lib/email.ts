import type { ContactInput } from "./validation/contact";

/**
 * Sends the contact message.
 *
 * Uses the Resend HTTP API when RESEND_API_KEY is configured (no SDK dependency
 * required). When it is not configured, the submission is logged server-side so
 * the form still works in development — nothing is silently dropped.
 *
 * All secrets are read from environment variables and never exposed to the client.
 */
export async function sendContactMessage(
  data: ContactInput,
): Promise<{ ok: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  const text = [
    `Reason: ${data.reason}`,
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Subject: ${data.subject}`,
    "",
    data.message,
  ].join("\n");

  if (!apiKey || !to || !from) {
    // Development / unconfigured fallback.
    console.info(
      "[contact] Email delivery not configured (set RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL). Submission:\n" +
        text,
    );
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
      const detail = await res.text().catch(() => "");
      console.error("[contact] Resend API error", res.status, detail);
      return { ok: false, error: "delivery_failed" };
    }
    return { ok: true };
  } catch (err) {
    console.error("[contact] Email send threw", err);
    return { ok: false, error: "delivery_failed" };
  }
}
