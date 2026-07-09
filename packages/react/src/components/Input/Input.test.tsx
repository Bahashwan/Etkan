import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { describe, expect, it, vi } from "vitest";

import { Input } from "./Input";

describe("Input", () => {
  it("renders a label and associates it with the field", () => {
    render(<Input label="Email" />);
    const field = screen.getByLabelText("Email");
    expect(field).toBeInstanceOf(HTMLInputElement);
  });

  it("accepts typed text and fires onChange", async () => {
    const onChange = vi.fn();
    render(<Input label="Email" onChange={onChange} />);
    const field = screen.getByLabelText("Email");
    await userEvent.type(field, "hi");
    expect(field).toHaveValue("hi");
    expect(onChange).toHaveBeenCalled();
  });

  it("wires the error state: aria-invalid, role=alert, aria-describedby", () => {
    render(<Input label="Email" invalid errorText="Enter a valid email" />);
    const field = screen.getByLabelText("Email");
    expect(field).toHaveAttribute("aria-invalid", "true");
    const message = screen.getByRole("alert");
    expect(message).toHaveTextContent("Enter a valid email");
    expect(field).toHaveAttribute("aria-describedby", message.id);
  });

  it("describes the field with helper text when valid", () => {
    render(<Input label="Email" helperText="Work email preferred" />);
    const field = screen.getByLabelText("Email");
    expect(field).toHaveAccessibleDescription("Work email preferred");
  });

  it("disables the field", () => {
    render(<Input label="Email" disabled />);
    expect(screen.getByLabelText("Email")).toBeDisabled();
  });

  it("has no axe violations (EN/LTR and AR/RTL)", async () => {
    const { container } = render(
      <div>
        <Input label="Email" helperText="Work email preferred" />
        <Input label="Name" invalid errorText="Required" />
        <div dir="rtl">
          <Input label="البريد الإلكتروني" helperText="نفضل بريد العمل" />
        </div>
      </div>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
