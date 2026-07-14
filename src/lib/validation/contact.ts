import { z } from "zod";

export const contactReasons = [
  "Employment Opportunity",
  "Technical Collaboration",
  "Consulting",
  "Software Project",
  "Startup Discussion",
  "Other",
] as const;

/**
 * Shared contact-form schema. Used for both client-side hints and the
 * authoritative server-side validation in the server action.
 */
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(80, "Name is too long."),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email.")
    .email("Please enter a valid email address.")
    .max(160, "Email is too long."),
  subject: z
    .string()
    .trim()
    .min(3, "Please enter a subject.")
    .max(140, "Subject is too long."),
  reason: z.enum(contactReasons, {
    message: "Please choose a reason for contact.",
  }),
  message: z
    .string()
    .trim()
    .min(20, "Please share a little more detail (at least 20 characters).")
    .max(4000, "Message is too long."),
  // Honeypot — must stay empty. Bots tend to fill every field.
  company: z.string().max(0, "").optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;

export type FieldErrors = Partial<Record<keyof ContactInput, string>>;

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: FieldErrors;
  /** Echo back values so the form can repopulate on error. */
  values?: Partial<Record<keyof ContactInput, string>>;
};
