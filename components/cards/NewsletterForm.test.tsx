import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import { NewsletterForm } from "../forms/NewsletterForm";

describe("NewsletterForm", () => {
  it("renders email input with placeholder", () => {
    render(<NewsletterForm />);
    
    expect(screen.getByPlaceholderText("E-posta adresiniz")).toBeInTheDocument();
  });

  it("renders subscribe button with 'Abone Ol' text", () => {
    render(<NewsletterForm />);
    
    const button = screen.getByRole("button", { name: /Abone Ol/i });
    expect(button).toBeInTheDocument();
  });

  it("shows error state on invalid email format", async () => {
    render(<NewsletterForm />);
    
    const input = screen.getByPlaceholderText("E-posta adresiniz");
    const button = screen.getByRole("button", { name: /Abone Ol/i });
    
    await act(async () => {
      // Use a value that looks like it could be an email but is invalid
      fireEvent.change(input, { target: { value: "test@invalid" } });
      fireEvent.click(button);
    });
    
    await waitFor(() => {
      expect(screen.getByText(/Geçerli bir email/i)).toBeInTheDocument();
    });
  });

  it("shows error state when email is empty", async () => {
    render(<NewsletterForm />);
    
    const button = screen.getByRole("button", { name: /Abone Ol/i });
    
    await act(async () => {
      fireEvent.click(button);
    });
    
    await waitFor(() => {
      expect(screen.getByText(/E-posta adresi gerekli/i)).toBeInTheDocument();
    });
  });

  it("shows success state after valid submission", async () => {
    render(<NewsletterForm />);
    
    const input = screen.getByPlaceholderText("E-posta adresiniz");
    const button = screen.getByRole("button", { name: /Abone Ol/i });
    
    await act(async () => {
      fireEvent.change(input, { target: { value: "test@example.com" } });
      fireEvent.click(button);
    });
    
    await waitFor(() => {
      expect(screen.getByText("Başarıyla abone oldunuz!")).toBeInTheDocument();
    });
  });

  it("validates email format correctly", async () => {
    const onSubmit = vi.fn().mockReturnValue(true);
    render(<NewsletterForm onSubmit={onSubmit} />);
    
    const input = screen.getByPlaceholderText("E-posta adresiniz");
    const button = screen.getByRole("button", { name: /Abone Ol/i });
    
    // Test one valid email
    await act(async () => {
      fireEvent.change(input, { target: { value: "test@example.com" } });
      fireEvent.click(button);
    });
    
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith("test@example.com");
    });
  });

  it("clears error state when user starts typing", async () => {
    render(<NewsletterForm />);
    
    const input = screen.getByPlaceholderText("E-posta adresiniz");
    const button = screen.getByRole("button", { name: /Abone Ol/i });
    
    // Trigger error
    await act(async () => {
      fireEvent.click(button);
    });
    
    await waitFor(() => {
      expect(screen.getByText(/E-posta adresi gerekli/i)).toBeInTheDocument();
    });
    
    // Clear error by typing
    await act(async () => {
      fireEvent.change(input, { target: { value: "a" } });
    });
    
    await waitFor(() => {
      expect(screen.queryByText(/E-posta adresi gerekli/i)).not.toBeInTheDocument();
    });
  });
});
