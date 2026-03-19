import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import GlobalError from "./global-error";

describe("GlobalError", () => {
  const mockError = new Error("Test error message");
  const mockReset = vi.fn();

  it("renders error title in Turkish", () => {
    render(<GlobalError error={mockError} reset={mockReset} />);

    expect(
      screen.getByRole("heading", { name: /bir şeyler yanlış gitti/i })
    ).toBeInTheDocument();
  });

  it("renders error description", () => {
    render(<GlobalError error={mockError} reset={mockReset} />);

    expect(
      screen.getByText(/uygulamada beklenmeyen bir hata oluştu/i)
    ).toBeInTheDocument();
  });

  it("renders retry button", () => {
    render(<GlobalError error={mockError} reset={mockReset} />);

    const retryButton = screen.getByRole("button", { name: /tekrar dene/i });
    expect(retryButton).toBeInTheDocument();
  });

  it("calls reset function when retry button is clicked", () => {
    render(<GlobalError error={mockError} reset={mockReset} />);

    const retryButton = screen.getByRole("button", { name: /tekrar dene/i });
    fireEvent.click(retryButton);

    expect(mockReset).toHaveBeenCalledTimes(1);
  });

  it("has link to home page", () => {
    render(<GlobalError error={mockError} reset={mockReset} />);

    const homeLink = screen.getByRole("link", { name: /ana sayfaya dön/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute("href", "/");
  });

  it("renders terminal decoration", () => {
    render(<GlobalError error={mockError} reset={mockReset} />);

    expect(screen.getByText(/\[error\]/i)).toBeInTheDocument();
  });
});
