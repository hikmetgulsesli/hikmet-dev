import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import RootLayout from "../app/layout";

// Mock the components
vi.mock("@/components/Header", () => ({
  Header: () => <header data-testid="header">Header</header>,
}));

vi.mock("@/components/Footer", () => ({
  Footer: () => <footer data-testid="footer">Footer</footer>,
}));

vi.mock("@/components/ThemeProvider", () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="theme-provider">{children}</div>
  ),
}));

describe("RootLayout", () => {
  it("renders Header and Footer around page content", () => {
    render(
      <RootLayout>
        <div data-testid="page-content">Page Content</div>
      </RootLayout>
    );

    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
    expect(screen.getByTestId("page-content")).toBeInTheDocument();
  });

  it("wraps content in ThemeProvider", () => {
    render(
      <RootLayout>
        <div>Test</div>
      </RootLayout>
    );

    expect(screen.getByTestId("theme-provider")).toBeInTheDocument();
  });

  it("has Turkish language attribute", () => {
    const { container } = render(
      <RootLayout>
        <div>Test</div>
      </RootLayout>
    );

    const html = container.querySelector("html");
    expect(html).toHaveAttribute("lang", "tr");
  });
});
