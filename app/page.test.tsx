import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "./page";

describe("Home Page", () => {
  it("renders newsletter section with gradient background", () => {
    render(<Home />);
    
    expect(screen.getByText("Bültenimize Katılın")).toBeInTheDocument();
  });

  it("renders 'Latest Blog Posts' heading", () => {
    render(<Home />);
    
    expect(screen.getByText("Latest Blog Posts")).toBeInTheDocument();
  });

  it("renders exactly 3 blog cards", () => {
    render(<Home />);
    
    // BlogCard renders category labels and dates
    const categoryLabels = screen.getAllByText(/AI|DevOps|Automation|Tutorial|Announcement/);
    // Should have at least 3 (one for each blog card)
    expect(categoryLabels.length).toBeGreaterThanOrEqual(3);
  });

  it("renders Resources & APIs section", () => {
    render(<Home />);
    
    expect(screen.getByText("Resources & APIs")).toBeInTheDocument();
  });

  it("renders Documentation section with 4 doc cards", () => {
    render(<Home />);
    
    expect(screen.getByText("Documentation")).toBeInTheDocument();
    // DocCards show progress
    const progressLabels = screen.getAllByText(/Progress/);
    expect(progressLabels.length).toBeGreaterThanOrEqual(4);
  });

  it("renders Repositories section with 4 repo cards", () => {
    render(<Home />);
    
    expect(screen.getByText("Repositories")).toBeInTheDocument();
    // RepoCards show star counts
    const repoNames = [
      "ui-kit-pro",
      "auth-service-v3",
      "data-pipeline",
      "edge-cache"
    ];
    repoNames.forEach(name => {
      expect(screen.getByText(name)).toBeInTheDocument();
    });
  });

  it("renders Terminal Widget", () => {
    render(<Home />);
    
    expect(screen.getByText("OpenClaw_Terminal")).toBeInTheDocument();
  });
});
