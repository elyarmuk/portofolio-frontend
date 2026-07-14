"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { CheckCircle2, AlertCircle, Send } from "lucide-react";

import { submitContact } from "@/app/contact/actions";
import { contactReasons, type ContactState } from "@/lib/validation/contact";
import { cn } from "@/lib/utils";

const initialState: ContactState = { status: "idle" };

const inputBase =
  "w-full rounded-lg border bg-surface px-3.5 py-2.5 text-foreground placeholder:text-subtle transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--ring)]";

function fieldClasses(hasError: boolean) {
  return cn(inputBase, hasError ? "border-error" : "border-border-strong");
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-primary px-6 text-base font-medium text-primary-contrast transition-colors hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--ring)] disabled:pointer-events-none disabled:opacity-70"
    >
      {pending ? (
        <>
          <span
            className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
            aria-hidden
          />
          Sending…
        </>
      ) : (
        <>
          <Send className="h-4 w-4" />
          Send Message
        </>
      )}
    </button>
  );
}

function ErrorText({ id, children }: { id: string; children?: string }) {
  if (!children) return null;
  return (
    <p id={id} className="mt-1.5 text-sm text-error" role="alert">
      {children}
    </p>
  );
}

export function ContactForm() {
  const [state, formAction] = useActionState(submitContact, initialState);

  if (state.status === "success") {
    return (
      <div
        className="flex flex-col items-center gap-3 rounded-xl border border-success/30 bg-success/5 p-10 text-center"
        role="status"
      >
        <CheckCircle2 className="h-9 w-9 text-success" aria-hidden />
        <h2 className="font-display text-xl font-bold text-foreground">Message sent</h2>
        <p className="max-w-sm text-muted">{state.message}</p>
      </div>
    );
  }

  const e = state.errors ?? {};
  const v = state.values ?? {};

  return (
    <form action={formAction} noValidate className="space-y-5">
      {state.status === "error" && state.message && (
        <div
          className="flex items-start gap-2.5 rounded-lg border border-error/30 bg-error/5 p-3.5 text-sm text-error"
          role="alert"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 flex-none" aria-hidden />
          <span>{state.message}</span>
        </div>
      )}

      {/* Honeypot: visually hidden, off the tab order, not announced. */}
      <div aria-hidden className="absolute left-[-9999px] top-[-9999px]" hidden>
        <label htmlFor="company">Company (leave blank)</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-foreground">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            defaultValue={v.name}
            aria-invalid={Boolean(e.name)}
            aria-describedby={e.name ? "name-error" : undefined}
            className={fieldClasses(Boolean(e.name))}
          />
          <ErrorText id="name-error">{e.name}</ErrorText>
        </div>

        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-foreground">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            defaultValue={v.email}
            aria-invalid={Boolean(e.email)}
            aria-describedby={e.email ? "email-error" : undefined}
            className={fieldClasses(Boolean(e.email))}
          />
          <ErrorText id="email-error">{e.email}</ErrorText>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="subject" className="mb-1.5 block text-sm font-medium text-foreground">
            Subject
          </label>
          <input
            id="subject"
            name="subject"
            type="text"
            required
            defaultValue={v.subject}
            aria-invalid={Boolean(e.subject)}
            aria-describedby={e.subject ? "subject-error" : undefined}
            className={fieldClasses(Boolean(e.subject))}
          />
          <ErrorText id="subject-error">{e.subject}</ErrorText>
        </div>

        <div>
          <label htmlFor="reason" className="mb-1.5 block text-sm font-medium text-foreground">
            Reason for contact
          </label>
          <select
            id="reason"
            name="reason"
            required
            defaultValue={v.reason ?? ""}
            aria-invalid={Boolean(e.reason)}
            aria-describedby={e.reason ? "reason-error" : undefined}
            className={fieldClasses(Boolean(e.reason))}
          >
            <option value="" disabled>
              Select a reason…
            </option>
            {contactReasons.map((reason) => (
              <option key={reason} value={reason}>
                {reason}
              </option>
            ))}
          </select>
          <ErrorText id="reason-error">{e.reason}</ErrorText>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-foreground">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          defaultValue={v.message}
          aria-invalid={Boolean(e.message)}
          aria-describedby={e.message ? "message-error" : undefined}
          className={cn(fieldClasses(Boolean(e.message)), "resize-y")}
        />
        <ErrorText id="message-error">{e.message}</ErrorText>
      </div>

      <SubmitButton />
    </form>
  );
}
