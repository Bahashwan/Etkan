import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { describe, expect, it, vi } from "vitest";

import { Select } from "./Select";

function options() {
  return (
    <>
      <option value="sa">Saudi Arabia</option>
      <option value="ae">United Arab Emirates</option>
    </>
  );
}

describe("Select", () => {
  it("renders a label and associates it with the field", () => {
    render(<Select label="Country">{options()}</Select>);
    const field = screen.getByLabelText("Country");
    expect(field).toBeInstanceOf(HTMLSelectElement);
  });

  it("renders the placeholder as an empty-value first option", () => {
    render(
      <Select label="Country" placeholder="Choose a country" defaultValue="">
        {options()}
      </Select>,
    );
    const placeholder = screen.getByRole("option", { name: "Choose a country" });
    expect(placeholder).toHaveValue("");
    expect(screen.getByLabelText("Country")).toHaveValue("");
  });

  it("lets the user pick an option and fires onChange", async () => {
    const onChange = vi.fn();
    render(
      <Select label="Country" onChange={onChange}>
        {options()}
      </Select>,
    );
    const field = screen.getByLabelText("Country");
    await userEvent.selectOptions(field, "ae");
    expect(field).toHaveValue("ae");
    expect(onChange).toHaveBeenCalled();
  });

  it("wires the error state: aria-invalid, role=alert, aria-describedby", () => {
    render(
      <Select label="Country" invalid errorText="Pick a country">
        {options()}
      </Select>,
    );
    const field = screen.getByLabelText("Country");
    expect(field).toHaveAttribute("aria-invalid", "true");
    const message = screen.getByRole("alert");
    expect(message).toHaveTextContent("Pick a country");
    expect(field).toHaveAttribute("aria-describedby", message.id);
  });

  it("disables the field", () => {
    render(
      <Select label="Country" disabled>
        {options()}
      </Select>,
    );
    expect(screen.getByLabelText("Country")).toBeDisabled();
  });

  it("has no axe violations (EN/LTR and AR/RTL)", async () => {
    const { container } = render(
      <div>
        <Select label="Country" helperText="Where you are registered">
          {options()}
        </Select>
        <div dir="rtl">
          <Select label="الدولة" placeholder="اختر الدولة">
            <option value="sa">السعودية</option>
            <option value="ae">الإمارات</option>
          </Select>
        </div>
      </div>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
