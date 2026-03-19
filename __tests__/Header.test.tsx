import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Header } from "../components/Header";

// Mock Next.js Link
vi.mock("next/link", () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

// Mock ThemeSwitcher
vi.mock("./ThemeSwitcher", () => ({
  ThemeSwitcher: () => <div data-testid="theme-switcher">Theme Switcher</div>,
}));

describe("Header", () => {
  it("renders logo with site name", () => {
    render(<Header />);

    expect(screen.getByText("Hikmet Gulsesli")).toBeInTheDocument();
  });

  it("renders navigation links", () => {
    render(<Header />);

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Projects")).toBeInTheDocument();
    expect(screen.getByText("Resources")).toBeInTheDocument();
    expect(screen.getByText("Writing")).toBeInTheDocument();
  });

  it("renders live agents badge", () => {
    render(<Header />);

    expect(screen.getByText("10 agents live")).toBeInTheDocument();
  });

  it("renders theme switcher", () => {
    render(<Header />);

    expect(screen.getByTestId("theme-switcher")).toBeInTheDocument();
  });
});
