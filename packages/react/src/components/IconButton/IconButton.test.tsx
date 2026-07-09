import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import * as React from "react";
import { describe, expect, it, vi } from "vitest";

import { IconButton } from "./IconButton";

const Icon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
    <path d="M8 1v14M1 8h14" stroke="currentColor" strokeWidth="2" />
  </svg>
);

describe("IconButton", () => {
  it("exposes its label as the accessible name and defaults to type=button", () => {
    render(<IconButton icon={<Icon />} label="Add item" />);
    const btn = screen.getByRole("button", { name: "Add item" });
    expect(btn).toHaveAttribute("aria-label", "Add item");
    expect(btn).toHaveAttribute("type", "button");
  });

  it("fires onClick", async () => {
    const onClick = vi.fn();
    render(<IconButton icon={<Icon />} label="Refresh" onClick={onClick} />);
    await userEvent.click(screen.getByRole("button", { name: "Refresh" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire when disabled", async () => {
    const onClick = vi.fn();
    render(<IconButton icon={<Icon />} label="Delete" disabled onClick={onClick} />);
    const btn = screen.getByRole("button", { name: "Delete" });
    expect(btn).toBeDisabled();
    await userEvent.click(btn).catch(() => {});
    expect(onClick).not.toHaveBeenCalled();
  });

  it("has no axe violations across variants (EN/LTR and AR/RTL)", async () => {
    const { container } = render(
      <div>
        <IconButton icon={<Icon />} label="Add" variant="primary" />
        <IconButton icon={<Icon />} label="Edit" variant="secondary" />
        <IconButton icon={<Icon />} label="More" variant="ghost" />
        <IconButton icon={<Icon />} label="Remove" variant="danger" />
        <div dir="rtl">
          <IconButton icon={<Icon />} label="إضافة" variant="primary" />
        </div>
      </div>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
