import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

// Mock the components
vi.mock("@/components/Header", () => ({
  Header: () => <header data-testid="header">Header</header>,
}));

vi.mock("@/components/Footer", () => ({
  Footer: () => <footer data-testid="footer">Footer</footer>,
}));

// Mock next/font
vi.mock("next/font/google", () => ({
  Inter: () => ({ variable: "--font-inter" }),
  Sora: () => ({ variable: "--font-sora" }),
  Nunito_Sans: () => ({ variable: "--font-nunito" }),
  Fira_Code: () => ({ variable: "--font-fira-code" }),
}));

import RootLayout from "./layout";

describe("RootLayout", () => {
  it("renders Header component", () => {
    render(
      <RootLayout>
        <div data-testid="content">Test Content</div>
      </RootLayout>
    );

    expect(screen.getByTestId("header")).toBeInTheDocument();
  });

  it("renders Footer component", () => {
    render(
      <RootLayout>
        <div data-testid="content">Test Content</div>
      </RootLayout>
    );

    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });

  it("renders children content between Header and Footer", () => {
    render(
      <RootLayout>
        <div data-testid="content">Test Content</div>
      </RootLayout>
    );

    expect(screen.getByTestId("content")).toBeInTheDocument();
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("has correct language attribute on html", () => {
    // The layout renders an html element with lang="tr"
    // In jsdom, we check document.documentElement
    render(
      <RootLayout>
        <div>Test</div>
      </RootLayout>
    );

    // The html element's lang attribute is set by the layout
    expect(document.documentElement.lang).toBe("tr");
  });

  it("applies font variable classes", () => {
    render(
      <RootLayout>
        <div>Test</div>
      </RootLayout>
    );

    // Check that the document element has the expected classes
    expect(document.documentElement.classList.contains("h-full")).toBe(true);
    expect(document.documentElement.classList.contains("antialiased")).toBe(true);
  });

  it("renders main element with flex-1 class", () => {
    render(
      <RootLayout>
        <div data-testid="content">Test Content</div>
      </RootLayout>
    );

    const main = screen.getByRole("main");
    expect(main).toHaveClass("flex-1");
  });
});
