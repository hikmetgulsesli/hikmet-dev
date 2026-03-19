import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { NewsletterForm } from "./NewsletterForm";

describe("NewsletterForm", () => {
  it("renders email input and subscribe button", () => {
    render(<NewsletterForm />);
    
    expect(screen.getByPlaceholderText("E-posta adresiniz")).toBeInTheDocument();
    expect(screen.getByText("Abone Ol")).toBeInTheDocument();
  });

  it("shows error for invalid email", async () => {
    render(<NewsletterForm />);
    
    const input = screen.getByPlaceholderText("E-posta adresiniz");
    const submitButton = screen.getByText("Abone Ol");
    
    fireEvent.change(input, { target: { value: "invalid-email" } });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText("Geçerli bir email giriniz")).toBeInTheDocument();
    });
  });

  it("shows error for empty email", async () => {
    render(<NewsletterForm />);
    
    const submitButton = screen.getByText("Abone Ol");
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText("E-posta adresi gerekli")).toBeInTheDocument();
    });
  });

  it("shows success message on valid email submit", async () => {
    render(<NewsletterForm />);
    
    const input = screen.getByPlaceholderText("E-posta adresiniz");
    const submitButton = screen.getByText("Abone Ol");
    
    fireEvent.change(input, { target: { value: "test@example.com" } });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText("Başarıyla abone oldunuz!")).toBeInTheDocument();
    });
  });

  it("calls onSubmit handler with email", async () => {
    const onSubmit = vi.fn().mockResolvedValue(true);
    render(<NewsletterForm onSubmit={onSubmit} />);
    
    const input = screen.getByPlaceholderText("E-posta adresiniz");
    const submitButton = screen.getByText("Abone Ol");
    
    fireEvent.change(input, { target: { value: "test@example.com" } });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith("test@example.com");
    });
  });

  it("button text is 'Abone Ol' not 'Subscribe'", () => {
    render(<NewsletterForm />);
    
    const button = screen.getByText("Abone Ol");
    expect(button).toBeInTheDocument();
    expect(screen.queryByText("Subscribe")).not.toBeInTheDocument();
  });
});
