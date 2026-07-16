import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProjectsGrid } from "./projects-grid";
import type { Project } from "@/content/projects";

function make(slug: string, name: string, tags: Project["tags"]): Project {
  return {
    slug,
    name,
    category: "Cat",
    tags,
    summary: "summary",
    description: "desc",
    status: "Concept",
    technologies: ["Java"],
    featured: false,
    visible: true,
  };
}

const projects: Project[] = [
  make("a", "Alpha", ["Mobile"]),
  make("b", "Bravo", ["Cloud"]),
  make("c", "Charlie", ["Mobile", "Cloud"]),
];

describe("ProjectsGrid", () => {
  it("shows all projects by default", () => {
    render(<ProjectsGrid projects={projects} />);
    expect(screen.getByText("Alpha")).toBeInTheDocument();
    expect(screen.getByText("Bravo")).toBeInTheDocument();
    expect(screen.getByText("Charlie")).toBeInTheDocument();
    expect(screen.getByText(/Showing 3 projects/i)).toBeInTheDocument();
  });

  it("filters projects by the selected category", async () => {
    render(<ProjectsGrid projects={projects} />);
    await userEvent.click(screen.getByRole("button", { name: "Mobile" }));
    expect(screen.getByText("Alpha")).toBeInTheDocument();
    expect(screen.getByText("Charlie")).toBeInTheDocument();
    expect(screen.queryByText("Bravo")).not.toBeInTheDocument();
    expect(screen.getByText(/Showing 2 projects/i)).toBeInTheDocument();
  });

  it("marks the active filter with aria-pressed", async () => {
    render(<ProjectsGrid projects={projects} />);
    const cloud = screen.getByRole("button", { name: "Cloud" });
    await userEvent.click(cloud);
    expect(cloud).toHaveAttribute("aria-pressed", "true");
  });
});
