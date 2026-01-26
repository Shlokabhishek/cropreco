import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Input from "./Input";

describe("Input", () => {
  it("renders with label", () => {
    render(<Input label="Test Label" value="" onChange={() => {}} />);
    expect(screen.getByText("Test Label")).toBeInTheDocument();
  });

  it("displays the provided value", () => {
    render(<Input label="Name" value="John" onChange={() => {}} />);
    expect(screen.getByRole("textbox")).toHaveValue("John");
  });

  it("calls onChange when input value changes", () => {
    const handleChange = vi.fn();
    render(<Input label="Name" value="" onChange={handleChange} />);
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "test" } });
    expect(handleChange).toHaveBeenCalledWith("test");
  });

  it("displays placeholder text", () => {
    render(<Input label="Name" value="" onChange={() => {}} placeholder="Enter name" />);
    expect(screen.getByPlaceholderText("Enter name")).toBeInTheDocument();
  });
});
