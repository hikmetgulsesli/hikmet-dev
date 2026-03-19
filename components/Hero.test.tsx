import { render, screen } from "@testing-library/react";
import { Hero } from "./Hero";
import { describe, it, expect, vi } from "vitest";

describe("Hero", () => {
  it("renders the Hero section", () => {
    render(<Hero />);
    
    // Check for main elements
    expect(screen.getByText(/Yeni projeler için müsait/i)).toBeInTheDocument();
    expect(screen.getByText(/OpenClaw otomasyon sisteminin kurucusu/i)).toBeInTheDocument();
  });

  it("displays stats cards with correct values", () => {
    render(<Hero />);
    
    // Check stats values
    expect(screen.getByText("10+")).toBeInTheDocument();
    expect(screen.getByText("24")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
    
    // Check stats labels
    expect(screen.getByText("Agents")).toBeInTheDocument();
    expect(screen.getByText("Web Apps")).toBeInTheDocument();
    expect(screen.getByText("Workflows")).toBeInTheDocument();
  });

  it("renders CTA buttons with correct Turkish text and hrefs", () => {
    render(<Hero />);
    
    const primaryButton = screen.getByTestId("cta-primary");
    const secondaryButton = screen.getByTestId("cta-secondary");
    
    // Check button text is in Turkish
    expect(primaryButton).toHaveTextContent("Projeleri Keşfet");
    expect(secondaryButton).toHaveTextContent("Hakkımda");
    
    // Check navigation targets
    expect(primaryButton).toHaveAttribute("href", "/projects");
    expect(secondaryButton).toHaveAttribute("href", "/introduction");
  });

  it("displays terminal widget", () => {
    render(<Hero />);
    
    const terminal = screen.getByTestId("terminal-widget");
    expect(terminal).toBeInTheDocument();
    
    // Check terminal content
    expect(screen.getByText(/bash — hikmet@setrox/i)).toBeInTheDocument();
    expect(screen.getByText(/System Active/i)).toBeInTheDocument();
  });

  it("has rotating word animation element", () => {
    render(<Hero />);
    
    const rotatingWord = screen.getByTestId("rotating-word");
    expect(rotatingWord).toBeInTheDocument();
    
    // Check initial word is one of the three phrases
    const text = rotatingWord.textContent;
    expect(["Building quiet", "scaling workflows", "shipping projects"]).toContain(text);
  });

  it("cycles through all three rotating words within 10 seconds", async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    
    render(<Hero />);
    
    const rotatingWord = screen.getByTestId("rotating-word");
    const seenWords = new Set<string>();
    
    // Capture initial word
    seenWords.add(rotatingWord.textContent || "");
    
    // Advance time to cycle through words (3 second interval)
    for (let i = 0; i < 4; i++) {
      await vi.advanceTimersByTimeAsync(3500);
      seenWords.add(rotatingWord.textContent || "");
    }
    
    // Verify all three words were seen
    expect(seenWords.has("Building quiet")).toBe(true);
    expect(seenWords.has("scaling workflows")).toBe(true);
    expect(seenWords.has("shipping projects")).toBe(true);
    
    vi.useRealTimers();
  });

  it("renders responsive layout with correct order classes", () => {
    const { container } = render(<Hero />);
    
    // Check for order classes indicating responsive layout
    const order2Elements = container.querySelectorAll('.order-2');
    const order1Elements = container.querySelectorAll('.order-1');
    const lgOrder1Elements = container.querySelectorAll('.lg\\:order-1');
    const lgOrder2Elements = container.querySelectorAll('.lg\\:order-2');
    
    // Should have elements with mobile/desktop order classes
    expect(order2Elements.length).toBeGreaterThan(0);
    expect(order1Elements.length).toBeGreaterThan(0);
    expect(lgOrder1Elements.length).toBeGreaterThan(0);
    expect(lgOrder2Elements.length).toBeGreaterThan(0);
  });
});
