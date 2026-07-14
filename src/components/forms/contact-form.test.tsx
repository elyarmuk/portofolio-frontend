import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

// The form imports a server action (which pulls in next/headers). Stub it so
// the component renders in isolation — we're testing markup/accessibility here.
vi.mock("@/app/contact/actions", () => ({
  submitContact: vi.fn(async () => ({ status: "idle" })),
}));

import { ContactForm } from "./contact-form";
import { contactReasons } from "@/lib/validation/contact";

describe("ContactForm", () => {
  it("renders all labelled fields", () => {
    render(<ContactForm />);
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Subject")).toBeInTheDocument();
    expect(screen.getByLabelText("Reason for contact")).toBeInTheDocument();
    expect(screen.getByLabelText("Message")).toBeInTheDocument();
  });

  it("offers every contact reason", () => {
    render(<ContactForm />);
    for (const reason of contactReasons) {
      expect(screen.getByRole("option", { name: reason })).toBeInTheDocument();
    }
  });

  it("includes a submit button", () => {
    render(<ContactForm />);
    expect(screen.getByRole("button", { name: /send message/i })).toBeInTheDocument();
  });

  it("marks the email field as type email for validation", () => {
    render(<ContactForm />);
    expect(screen.getByLabelText("Email")).toHaveAttribute("type", "email");
  });
});
