import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import * as React from "react";
import { describe, expect, it, vi } from "vitest";

import { Radio } from "./Radio";

function Group(props: { onChange?: (v: string) => void }) {
  return (
    <fieldset>
      <legend>Plan</legend>
      <Radio name="plan" value="free" label="Free" defaultChecked />
      <Radio name="plan" value="pro" label="Pro" />
      <Radio name="plan" value="team" label="Team" />
    </fieldset>
  );
}

describe("Radio", () => {
  it("exposes its label as the accessible name of the native input", () => {
    render(<Radio label="Free" name="plan" value="free" />);
    const radio = screen.getByRole("radio", { name: "Free" });
    expect(radio).toBeInstanceOf(HTMLInputElement);
  });

  it("selects on click (uncontrolled)", async () => {
    render(<Group />);
    const pro = screen.getByRole("radio", { name: "Pro" });
    await userEvent.click(pro);
    expect(pro).toBeChecked();
    expect(screen.getByRole("radio", { name: "Free" })).not.toBeChecked();
  });

  it("moves selection with arrow keys", async () => {
    render(<Group />);
    const free = screen.getByRole("radio", { name: "Free" });
    free.focus();
    await userEvent.keyboard("{ArrowDown}");
    expect(screen.getByRole("radio", { name: "Pro" })).toBeChecked();
    expect(free).not.toBeChecked();
  });

  it("selects with Space on a focused radio", async () => {
    render(
      <div>
        <Radio name="opt" value="a" label="A" />
        <Radio name="opt" value="b" label="B" />
      </div>,
    );
    const a = screen.getByRole("radio", { name: "A" });
    a.focus();
    await userEvent.keyboard(" ");
    expect(a).toBeChecked();
  });

  it("respects controlled `checked` and fires onChange", async () => {
    const onChange = vi.fn();
    const { rerender } = render(
      <Radio name="c" value="x" label="X" checked={false} onChange={onChange} />,
    );
    const x = screen.getByRole("radio", { name: "X" });
    await userEvent.click(x);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(x).not.toBeChecked();
    rerender(<Radio name="c" value="x" label="X" checked onChange={onChange} />);
    expect(x).toBeChecked();
  });

  it("has no axe violations (EN/LTR and AR/RTL)", async () => {
    const { container } = render(
      <div>
        <fieldset>
          <legend>Billing</legend>
          <Radio name="bill" value="monthly" label="Monthly" defaultChecked />
          <Radio name="bill" value="yearly" label="Yearly" />
        </fieldset>
        <div dir="rtl">
          <fieldset>
            <legend>الخطة</legend>
            <Radio name="ar" value="m" label="شهري" defaultChecked />
            <Radio name="ar" value="y" label="سنوي" />
          </fieldset>
        </div>
      </div>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
