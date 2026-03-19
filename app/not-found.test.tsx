import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import NotFound from "./not-found";

describe("NotFound (404 Page)", () => {
  it("renders 404 error code", () => {
    render(<NotFound />);

    expect(screen.getByText("404")).toBeInTheDocument();
  });

  it("renders 'Sayfa bulunamadı' heading", () => {
    render(<NotFound />);

    expect(screen.getByRole("heading", { name: /sayfa bulunamadı/i })).toBeInTheDocument();
  });

  it("renders description text", () => {
    render(<NotFound />);

    expect(
      screen.getByText(/aradığınız sayfa mevcut değil veya taşınmış olabilir/i)
    ).toBeInTheDocument();
  });

  it("has link to home page with correct text", () => {
    render(<NotFound />);

    const homeLink = screen.getByRole("link", { name: /ana sayfaya dön/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute("href", "/");
  });

  it("has link to projects page", () => {
    render(<NotFound />);

    const projectsLink = screen.getByRole("link", { name: /projeleri keşfet/i });
    expect(projectsLink).toBeInTheDocument();
    expect(projectsLink).toHaveAttribute("href", "/projects");
  });

  it("renders terminal decoration with HTTP error", () => {
    render(<NotFound />);

    expect(screen.getByText(/http\/1\.1 404 not found/i)).toBeInTheDocument();
  });

  it("uses correct Turkish language", () => {
    render(<NotFound />);

    expect(screen.getByText(/sayfa bulunamadı/i)).toBeInTheDocument();
    expect(
      screen.getByText(/aradığınız sayfa mevcut değil/i)
    ).toBeInTheDocument();
  });
});
