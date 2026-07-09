import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import * as React from "react";
import { describe, expect, it, vi } from "vitest";

import { Switch } from "./Switch";

describe("Switch", () => {
  it("exposes role=switch and truthful aria-checked", async () => {
    render(<Switch label="Dark mode" />);
    const sw = screen.getByRole("switch", { name: "Dark mode" });
    expect(sw).toHaveAttribute("aria-checked", "false");
    await userEvent.click(sw);
    expect(sw).toHaveAttribute("aria-checked", "true");
    expect(sw).toBeChecked();
  });

  it("toggles on click (uncontrolled)", async () => {
    render(<Switch label="Wifi" defaultChecked={false} />);
    const sw = screen.getByRole("switch");
    expect(sw).not.toBeChecked();
    await userEvent.click(sw);
    expect(sw).toBeChecked();
  });

  it("toggles on Space keypress", async () => {
    render(<Switch label="Sound" />);
    const sw = screen.getByRole("switch");
    sw.focus();
    await userEvent.keyboard(" ");
    expect(sw).toBeChecked();
  });

  it("respects controlled `checked` and fires onChange", async () => {
    const onChange = vi.fn();
    const { rerender } = render(<Switch label="Sync" checked={false} onChange={onChange} />);
    const sw = screen.getByRole("switch");
    await userEvent.click(sw);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(sw).not.toBeChecked();
    expect(sw).toHaveAttribute("aria-checked", "false");
    rerender(<Switch label="Sync" checked onChange={onChange} />);
    expect(sw).toBeChecked();
    expect(sw).toHaveAttribute("aria-checked", "true");
  });

  it("has no axe violations (EN/LTR and AR/RTL)", async () => {
    const { container } = render(
      <div>
        <Switch label="Enable beta features" />
        <div dir="rtl">
          <Switch label="تفعيل الميزات التجريبية" defaultChecked />
        </div>
      </div>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
