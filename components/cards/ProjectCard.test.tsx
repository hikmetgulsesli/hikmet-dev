import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProjectCard } from "./ProjectCard";

describe("ProjectCard", () => {
  const defaultProps = {
    title: "Test Project",
    description: "This is a test project description",
    status: "shipped" as const,
    year: 2024,
    tags: ["React", "TypeScript", "Next.js"],
  };

  it("renders with all badges, star/fork counts, tags, and links", () => {
    render(
      <ProjectCard
        {...defaultProps}
        starCount={128}
        forkCount={24}
        liveUrl="https://example.com"
        sourceUrl="https://github.com"
        featured
      />
    );

    expect(screen.getByText("Test Project")).toBeInTheDocument();
    expect(screen.getByText("This is a test project description")).toBeInTheDocument();
    expect(screen.getByText("Featured")).toBeInTheDocument();
    expect(screen.getByText("Shipped")).toBeInTheDocument();
    expect(screen.getByText("2024")).toBeInTheDocument();
    expect(screen.getByText("128")).toBeInTheDocument();
    expect(screen.getByText("24")).toBeInTheDocument();
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("Next.js")).toBeInTheDocument();
    expect(screen.getByText("Live Demo")).toBeInTheDocument();
    expect(screen.getByText("GitHub")).toBeInTheDocument();
  });

  it("renders shipped status badge with green color", () => {
    render(<ProjectCard {...defaultProps} status="shipped" />);
    
    const badge = screen.getByText("Shipped");
    expect(badge).toBeInTheDocument();
    expect(badge.className).toContain("bg-emerald-500/20");
    expect(badge.className).toContain("text-emerald-400");
  });

  it("renders in-progress status badge with yellow color", () => {
    render(<ProjectCard {...defaultProps} status="in-progress" />);
    
    const badge = screen.getByText("In Progress");
    expect(badge).toBeInTheDocument();
    expect(badge.className).toContain("bg-amber-500/20");
    expect(badge.className).toContain("text-amber-400");
  });

  it("renders archived status badge with gray color", () => {
    render(<ProjectCard {...defaultProps} status="archived" />);
    
    const badge = screen.getByText("Archived");
    expect(badge).toBeInTheDocument();
    expect(badge.className).toContain("bg-slate-500/20");
    expect(badge.className).toContain("text-slate-400");
  });

  it("limits tags to maximum 5", () => {
    const manyTags = ["Tag1", "Tag2", "Tag3", "Tag4", "Tag5", "Tag6", "Tag7"];
    render(<ProjectCard {...defaultProps} tags={manyTags} />);
    
    expect(screen.getByText("Tag1")).toBeInTheDocument();
    expect(screen.getByText("Tag2")).toBeInTheDocument();
    expect(screen.getByText("Tag3")).toBeInTheDocument();
    expect(screen.getByText("Tag4")).toBeInTheDocument();
    expect(screen.getByText("Tag5")).toBeInTheDocument();
    expect(screen.queryByText("Tag6")).not.toBeInTheDocument();
    expect(screen.queryByText("Tag7")).not.toBeInTheDocument();
  });

  it("shows 'Project Retired' for archived projects without live URL", () => {
    render(<ProjectCard {...defaultProps} status="archived" />);
    
    expect(screen.getByText("Project Retired")).toBeInTheDocument();
  });

  it("does not show featured badge when featured is false", () => {
    render(<ProjectCard {...defaultProps} featured={false} />);
    
    expect(screen.queryByText("Featured")).not.toBeInTheDocument();
  });
});
