import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Footer } from "../components/Footer";

// Mock Next.js Link
vi.mock("next/link", () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

describe("Footer", () => {
  it("renders footer with site name", () => {
    render(<Footer />);

    expect(screen.getByText("Hikmet Gulsesli")).toBeInTheDocument();
  });

  it("renders navigation links", () => {
    render(<Footer />);

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Projects")).toBeInTheDocument();
    expect(screen.getByText("Resources")).toBeInTheDocument();
    expect(screen.getByText("Blog")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
  });

  it("renders newsletter CTA section", () => {
    render(<Footer />);

    expect(screen.getByText("Birlikte çalışalım")).toBeInTheDocument();
    expect(screen.getByText("İletişime Geç")).toBeInTheDocument();
  });

  it("renders copyright with current year", () => {
    render(<Footer />);

    const currentYear = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(currentYear))).toBeInTheDocument();
  });
});
