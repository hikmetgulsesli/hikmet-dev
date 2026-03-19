import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BlogCard } from "./BlogCard";
import { Calendar, ArrowRight } from "lucide-react";

describe("BlogCard", () => {
  const defaultProps = {
    title: "Test Blog Post",
    summary: "This is a summary of the blog post that should be displayed.",
    category: "AI",
    date: "2024-05-20",
    slug: "/blog/test-post",
  };

  it("renders category badge", () => {
    render(<BlogCard {...defaultProps} />);
    expect(screen.getByText("AI")).toBeInTheDocument();
  });

  it("renders ISO date format", () => {
    render(<BlogCard {...defaultProps} />);
    expect(screen.getByText("2024-05-20")).toBeInTheDocument();
  });

  it("renders title", () => {
    render(<BlogCard {...defaultProps} />);
    expect(screen.getByText("Test Blog Post")).toBeInTheDocument();
  });

  it("renders summary with 3-line clamp", () => {
    render(<BlogCard {...defaultProps} />);
    const summary = screen.getByText(defaultProps.summary);
    expect(summary).toBeInTheDocument();
    expect(summary.className).toContain("line-clamp-3");
  });

  it("renders 'Read more' link", () => {
    render(<BlogCard {...defaultProps} />);
    expect(screen.getByText("Read more")).toBeInTheDocument();
  });

  it("link has correct href", () => {
    render(<BlogCard {...defaultProps} />);
    const link = screen.getByRole("link", { name: /Read more/i });
    expect(link).toHaveAttribute("href", "/blog/test-post");
  });
});
