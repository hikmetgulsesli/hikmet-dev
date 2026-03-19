import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { StatsCard } from "./StatsCard";

describe("StatsCard", () => {
  it("renders icon", () => {
    render(<StatsCard iconName="Bot" value="10+" label="Agents" />);
    expect(screen.getByText("Agents")).toBeInTheDocument();
  });

  it("renders large value text", () => {
    render(<StatsCard iconName="Globe" value="24" label="Web Apps" />);
    expect(screen.getByText("24")).toBeInTheDocument();
  });

  it("renders label below value", () => {
    render(<StatsCard iconName="GitBranch" value="5" label="Workflows" />);
    const label = screen.getByText("Workflows");
    expect(label).toBeInTheDocument();
    expect(label.className).toContain("text-xs");
    expect(label.className).toContain("uppercase");
  });

  it("handles string values", () => {
    render(<StatsCard iconName="Bot" value="10+" label="Agents" />);
    expect(screen.getByText("10+")).toBeInTheDocument();
  });

  it("handles number values", () => {
    render(<StatsCard iconName="Globe" value={24} label="Web Apps" />);
    expect(screen.getByText("24")).toBeInTheDocument();
  });
});
