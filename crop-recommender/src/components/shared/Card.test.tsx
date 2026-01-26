import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Card from "./Card";

describe("Card", () => {
  it("renders children correctly", () => {
    render(<Card><p>Test content</p></Card>);
    expect(screen.getByText("Test content")).toBeInTheDocument();
  });

  it("renders title when provided", () => {
    render(<Card title="Test Title"><p>Content</p></Card>);
    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });

  it("does not render title when not provided", () => {
    render(<Card><p>Content only</p></Card>);
    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
  });
});
