import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NewsletterForm } from "./NewsletterForm";

describe("NewsletterForm", () => {
  it("renders email input and subscribe button", () => {
    render(<NewsletterForm />);
    
    expect(screen.getByPlaceholderText("E-posta adresiniz")).toBeInTheDocument();
    expect(screen.getByText("Abone Ol")).toBeInTheDocument();
  });

  it("shows error for invalid email", async () => {
    const user = userEvent.setup();
    render(<NewsletterForm />);
    
    // Get the form and use userEvent to type and submit without browser validation
    const input = screen.getByPlaceholderText("E-posta adresiniz");
    
    await user.type(input, "invalid-email");
    
    // Submit using enter key on the input to bypass browser validation
    await user.keyboard("{Enter}");
    
    expect(await screen.findByText("Geçerli bir email giriniz")).toBeInTheDocument();
  });

  it("shows error for empty email", async () => {
    const user = userEvent.setup();
    render(<NewsletterForm />);
    
    const submitButton = screen.getByText("Abone Ol");
    await user.click(submitButton);
    
    expect(await screen.findByText("E-posta adresi gerekli")).toBeInTheDocument();
  });

  it("shows success message on valid email submit", async () => {
    const user = userEvent.setup();
    render(<NewsletterForm />);
    
    const input = screen.getByPlaceholderText("E-posta adresiniz");
    const submitButton = screen.getByText("Abone Ol");
    
    await user.type(input, "test@example.com");
    await user.click(submitButton);
    
    expect(await screen.findByText("Başarıyla abone oldunuz!")).toBeInTheDocument();
  });

  it("calls onSubmit handler with email", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn().mockResolvedValue(true);
    render(<NewsletterForm onSubmit={onSubmit} />);
    
    const input = screen.getByPlaceholderText("E-posta adresiniz");
    const submitButton = screen.getByText("Abone Ol");
    
    await user.type(input, "test@example.com");
    await user.click(submitButton);
    
    // Wait for the success state which indicates onSubmit was called
    expect(await screen.findByText("Başarıyla abone oldunuz!")).toBeInTheDocument();
    expect(onSubmit).toHaveBeenCalledWith("test@example.com");
  });

  it("button text is 'Abone Ol' not 'Subscribe'", () => {
    render(<NewsletterForm />);
    
    const button = screen.getByText("Abone Ol");
    expect(button).toBeInTheDocument();
    expect(screen.queryByText("Subscribe")).not.toBeInTheDocument();
  });
});
