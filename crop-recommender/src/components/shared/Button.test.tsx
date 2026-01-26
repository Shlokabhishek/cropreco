import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./Button";

describe("Button", () => {
  it("renders with the correct label", () => {
    render(<Button label="Click me" />);
    expect(screen.getByRole("button")).toHaveTextContent("Click me");
  });

  it("calls onClick when clicked", () => {
    const handleClick = vi.fn();
    render(<Button label="Click me" onClick={handleClick} />);
    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("is disabled when disabled prop is true", () => {
    render(<Button label="Disabled" disabled />);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("has correct type attribute", () => {
    render(<Button label="Submit" type="submit" />);
    expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
  });
});
