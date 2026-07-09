import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { describe, expect, it, vi } from "vitest";

import { Textarea } from "./Textarea";

describe("Textarea", () => {
  it("renders a label and associates it with the field", () => {
    render(<Textarea label="Message" />);
    const field = screen.getByLabelText("Message");
    expect(field).toBeInstanceOf(HTMLTextAreaElement);
    expect(field).toHaveAttribute("rows", "4");
  });

  it("accepts typed text and fires onChange", async () => {
    const onChange = vi.fn();
    render(<Textarea label="Message" onChange={onChange} />);
    const field = screen.getByLabelText("Message");
    await userEvent.type(field, "hello");
    expect(field).toHaveValue("hello");
    expect(onChange).toHaveBeenCalled();
  });

  it("wires the error state: aria-invalid, role=alert, aria-describedby", () => {
    render(<Textarea label="Message" invalid errorText="Message is required" />);
    const field = screen.getByLabelText("Message");
    expect(field).toHaveAttribute("aria-invalid", "true");
    const message = screen.getByRole("alert");
    expect(message).toHaveTextContent("Message is required");
    expect(field).toHaveAttribute("aria-describedby", message.id);
  });

  it("describes the field with helper text when valid", () => {
    render(<Textarea label="Message" helperText="Max 500 characters" />);
    expect(screen.getByLabelText("Message")).toHaveAccessibleDescription("Max 500 characters");
  });

  it("disables the field", () => {
    render(<Textarea label="Message" disabled />);
    expect(screen.getByLabelText("Message")).toBeDisabled();
  });

  it("has no axe violations (EN/LTR and AR/RTL)", async () => {
    const { container } = render(
      <div>
        <Textarea label="Message" helperText="Max 500 characters" />
        <Textarea label="Notes" invalid errorText="Required" />
        <div dir="rtl">
          <Textarea label="الرسالة" helperText="بحد أقصى ٥٠٠ حرف" />
        </div>
      </div>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
