import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ResourceCard } from "./ResourceCard";
import { BookOpen } from "lucide-react";

describe("ResourceCard", () => {
  const defaultProps = {
    title: "API Documentation",
    description: "Complete API reference for all endpoints.",
    icon: BookOpen,
    progress: 75,
    lastActivity: "2h ago",
  };

  it("renders title", () => {
    render(<ResourceCard {...defaultProps} />);
    expect(screen.getByText("API Documentation")).toBeInTheDocument();
  });

  it("renders description", () => {
    render(<ResourceCard {...defaultProps} />);
    expect(screen.getByText("Complete API reference for all endpoints.")).toBeInTheDocument();
  });

  it("renders progress bar with correct percentage", () => {
    render(<ResourceCard {...defaultProps} progress={75} />);
    expect(screen.getByText("75%")).toBeInTheDocument();
    expect(screen.getByText("Progress")).toBeInTheDocument();
  });

  it("renders last activity timestamp", () => {
    render(<ResourceCard {...defaultProps} lastActivity="2h ago" />);
    expect(screen.getByText("2h ago")).toBeInTheDocument();
  });

  it("renders without progress bar when progress is undefined", () => {
    render(<ResourceCard {...defaultProps} progress={undefined} />);
    expect(screen.queryByText("Progress")).not.toBeInTheDocument();
  });
});
