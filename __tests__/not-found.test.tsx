import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import NotFoundPage from "../app/not-found";

// Mock Next.js Link component
vi.mock("next/link", () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

describe("NotFoundPage", () => {
  it("renders 404 page with 'Sayfa bulunamadı' title", () => {
    render(<NotFoundPage />);

    expect(screen.getByText("Sayfa bulunamadı")).toBeInTheDocument();
  });

  it("renders 404 error code", () => {
    render(<NotFoundPage />);

    expect(screen.getByText("404")).toBeInTheDocument();
  });

  it("renders link to home page", () => {
    render(<NotFoundPage />);

    const homeLink = screen.getByText("Ana Sayfaya Dön");
    expect(homeLink).toBeInTheDocument();
    expect(homeLink.closest("a")).toHaveAttribute("href", "/");
  });

  it("renders link to projects page", () => {
    render(<NotFoundPage />);

    const projectsLink = screen.getByText("Projeleri Keşfet");
    expect(projectsLink).toBeInTheDocument();
    expect(projectsLink.closest("a")).toHaveAttribute("href", "/projects");
  });

  it("renders suggested links section", () => {
    render(<NotFoundPage />);

    expect(screen.getByText("Projeler")).toBeInTheDocument();
    expect(screen.getByText("Blog")).toBeInTheDocument();
    expect(screen.getByText("Hakkımda")).toBeInTheDocument();
    expect(screen.getByText("Kaynaklar")).toBeInTheDocument();
  });
});
