import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ProjectsGrid } from "./ProjectsGrid";

// Mock the ProjectCard component
vi.mock("@/components/cards/ProjectCard", () => ({
  ProjectCard: (props: { title: string; status: string; featured?: boolean }) => (
    <div data-testid="project-card" data-title={props.title} data-status={props.status} data-featured={props.featured}>
      {props.title}
    </div>
  ),
}));

// Mock the projects data
vi.mock("@/data/projects", () => ({
  projects: [
    {
      id: "mission-control",
      title: "Mission Control",
      description: "AI agent dashboard",
      status: "shipped",
      year: 2024,
      tags: ["Next.js"],
      stars: 128,
      forks: 24,
      featured: true,
    },
    {
      id: "setfarm",
      title: "Setfarm",
      description: "Pipeline engine",
      status: "shipped",
      year: 2024,
      tags: ["Node.js"],
      stars: 256,
      forks: 42,
      featured: true,
    },
    {
      id: "expense-tracker",
      title: "Expense Tracker",
      description: "Finance app",
      status: "in-progress",
      year: 2025,
      tags: ["React"],
      stars: 12,
      forks: 3,
      featured: false,
    },
    {
      id: "color-palette",
      title: "Color Palette",
      description: "Color tool",
      status: "archived",
      year: 2022,
      tags: ["React"],
      stars: 28,
      forks: 5,
      featured: false,
    },
  ],
}));

describe("ProjectsGrid", () => {
  it("renders the heading 'Projects and Open Source'", () => {
    render(<ProjectsGrid />);
    expect(screen.getByRole("heading", { name: /Projects and Open Source/i })).toBeInTheDocument();
  });

  it("renders filter tabs: All, Shipped, In Progress, Archived", () => {
    render(<ProjectsGrid />);
    expect(screen.getByRole("button", { name: "All" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Shipped" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "In Progress" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Archived" })).toBeInTheDocument();
  });

  it("shows all projects by default (All tab active)", () => {
    render(<ProjectsGrid />);
    const cards = screen.getAllByTestId("project-card");
    expect(cards).toHaveLength(4);
  });

  it("filters to show only shipped projects when Shipped tab is clicked", () => {
    render(<ProjectsGrid />);
    const shippedTab = screen.getByRole("button", { name: "Shipped" });
    fireEvent.click(shippedTab);
    
    const cards = screen.getAllByTestId("project-card");
    expect(cards).toHaveLength(2);
    expect(cards[0]).toHaveAttribute("data-status", "shipped");
    expect(cards[1]).toHaveAttribute("data-status", "shipped");
  });

  it("filters to show only in-progress projects when In Progress tab is clicked", () => {
    render(<ProjectsGrid />);
    const inProgressTab = screen.getByRole("button", { name: "In Progress" });
    fireEvent.click(inProgressTab);
    
    const cards = screen.getAllByTestId("project-card");
    expect(cards).toHaveLength(1);
    expect(cards[0]).toHaveAttribute("data-status", "in-progress");
  });

  it("filters to show only archived projects when Archived tab is clicked", () => {
    render(<ProjectsGrid />);
    const archivedTab = screen.getByRole("button", { name: "Archived" });
    fireEvent.click(archivedTab);
    
    const cards = screen.getAllByTestId("project-card");
    expect(cards).toHaveLength(1);
    expect(cards[0]).toHaveAttribute("data-status", "archived");
  });

  it("shows featured projects first", () => {
    render(<ProjectsGrid />);
    const cards = screen.getAllByTestId("project-card");
    
    // Featured projects should appear first
    expect(cards[0]).toHaveAttribute("data-featured", "true");
    expect(cards[1]).toHaveAttribute("data-featured", "true");
  });

  it("has correct active state on clicked tab", () => {
    render(<ProjectsGrid />);
    const shippedTab = screen.getByRole("button", { name: "Shipped" });
    
    fireEvent.click(shippedTab);
    
    expect(shippedTab).toHaveAttribute("aria-pressed", "true");
  });
});
