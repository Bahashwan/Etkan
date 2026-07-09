import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import * as React from "react";
import { describe, expect, it, vi } from "vitest";

import { Checkbox } from "./Checkbox";

describe("Checkbox", () => {
  it("exposes its label as the accessible name of the native input", () => {
    render(<Checkbox label="Accept terms" />);
    const box = screen.getByRole("checkbox", { name: "Accept terms" });
    expect(box).toBeInstanceOf(HTMLInputElement);
  });

  it("toggles on click (uncontrolled)", async () => {
    render(<Checkbox label="Remember me" defaultChecked={false} />);
    const box = screen.getByRole("checkbox");
    expect(box).not.toBeChecked();
    await userEvent.click(box);
    expect(box).toBeChecked();
  });

  it("toggles on Space keypress", async () => {
    render(<Checkbox label="Subscribe" />);
    const box = screen.getByRole("checkbox");
    box.focus();
    await userEvent.keyboard(" ");
    expect(box).toBeChecked();
  });

  it("respects controlled `checked` and fires onChange", async () => {
    const onChange = vi.fn();
    const { rerender } = render(<Checkbox label="Sync" checked={false} onChange={onChange} />);
    const box = screen.getByRole("checkbox");
    await userEvent.click(box);
    expect(onChange).toHaveBeenCalledTimes(1);
    // stays unchecked until parent updates the prop
    expect(box).not.toBeChecked();
    rerender(<Checkbox label="Sync" checked onChange={onChange} />);
    expect(box).toBeChecked();
  });

  it("reflects the indeterminate flag on the DOM node", () => {
    render(<Checkbox label="Some selected" indeterminate />);
    const box = screen.getByRole("checkbox") as HTMLInputElement;
    expect(box.indeterminate).toBe(true);
  });

  it("has no axe violations (EN/LTR and AR/RTL)", async () => {
    const { container } = render(
      <div>
        <Checkbox label="Enable notifications" />
        <div dir="rtl">
          <Checkbox label="تفعيل الإشعارات" defaultChecked />
        </div>
      </div>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
