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
    
    // BlogCard renders "Read more" links
    const readMoreLinks = screen.getAllByRole("link", { name: /read more/i });
    expect(readMoreLinks).toHaveLength(3);
  });

  it("renders Resources & APIs section", () => {
    render(<Home />);
    
    expect(screen.getByText("Resources & APIs")).toBeInTheDocument();
  });

  it("renders Documentation section with 4 doc cards", () => {
    render(<Home />);
    
    expect(screen.getByText("Documentation")).toBeInTheDocument();
    const docCardTitles = [
      "Core API Referansı",
      "Agent SDK",
      "Güvenlik Rehberi",
      "Deployment",
    ];
    docCardTitles.forEach(title => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });
  });

  it("renders Repositories section with 4 repo cards", () => {
    render(<Home />);
    
    expect(screen.getByText("Repositories")).toBeInTheDocument();
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
