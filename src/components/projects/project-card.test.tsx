import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProjectCard } from "./project-card";
import type { Project } from "@/content/projects";

const baseProject: Project = {
  slug: "demo",
  name: "Demo Project",
  category: "Demo Category",
  tags: ["Full Stack"],
  summary: "A short summary of the demo project.",
  description: "Longer description.",
  status: "Production",
  technologies: ["Java", "React", "AWS"],
  featured: true,
  repo: "private",
  caseStudy: { tagline: "t", sections: [{ heading: "Overview", body: ["x"] }] },
};

describe("ProjectCard", () => {
  it("renders the project name, category, and summary", () => {
    render(<ProjectCard project={baseProject} />);
    expect(screen.getByRole("heading", { name: "Demo Project" })).toBeInTheDocument();
    expect(screen.getByText("Demo Category")).toBeInTheDocument();
    expect(screen.getByText(/short summary/i)).toBeInTheDocument();
  });

  it("links to the case study when one exists", () => {
    render(<ProjectCard project={baseProject} />);
    const link = screen.getByRole("link", { name: "Demo Project" });
    expect(link).toHaveAttribute("href", "/projects/demo");
    expect(screen.getByText("View Case Study")).toBeInTheDocument();
  });

  it("shows a Private Repository note for private repos", () => {
    render(<ProjectCard project={baseProject} />);
    expect(screen.getByText("Private Repository")).toBeInTheDocument();
  });

  it("does not link when there is no case study", () => {
    const noCase: Project = { ...baseProject, caseStudy: undefined };
    render(<ProjectCard project={noCase} />);
    expect(screen.queryByRole("link", { name: "Demo Project" })).not.toBeInTheDocument();
    expect(screen.getByText(/coming soon/i)).toBeInTheDocument();
  });
});
