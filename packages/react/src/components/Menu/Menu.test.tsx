import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { describe, expect, it, vi } from "vitest";

import { Menu } from "./Menu";

function makeItems(onEdit = vi.fn()) {
  return [
    { label: "Edit", onClick: onEdit },
    { label: "Duplicate" },
    { divider: true },
    { label: "Delete", danger: true },
  ];
}

describe("Menu", () => {
  it("opens and closes on trigger click and reflects aria-expanded", async () => {
    render(<Menu trigger="Actions" items={makeItems()} />);
    const trigger = screen.getByRole("button", { name: "Actions" });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();

    await userEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("menu")).toBeInTheDocument();

    await userEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("opens on ArrowDown and focuses the first item", async () => {
    render(<Menu trigger="Actions" items={makeItems()} />);
    screen.getByRole("button", { name: "Actions" }).focus();
    await userEvent.keyboard("{ArrowDown}");
    const items = screen.getAllByRole("menuitem");
    expect(items[0]).toHaveFocus();
  });

  it("opens on ArrowUp and focuses the last item", async () => {
    render(<Menu trigger="Actions" items={makeItems()} />);
    screen.getByRole("button", { name: "Actions" }).focus();
    await userEvent.keyboard("{ArrowUp}");
    const items = screen.getAllByRole("menuitem");
    expect(items[items.length - 1]).toHaveFocus();
  });

  it("cycles focus with arrows, skipping dividers and wrapping", async () => {
    render(<Menu trigger="Actions" items={makeItems()} />);
    screen.getByRole("button", { name: "Actions" }).focus();
    await userEvent.keyboard("{ArrowDown}");
    const items = screen.getAllByRole("menuitem"); // Edit, Duplicate, Delete
    expect(items[0]).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    expect(items[1]).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}"); // skips divider -> Delete
    expect(items[2]).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}"); // wraps -> Edit
    expect(items[0]).toHaveFocus();
    await userEvent.keyboard("{End}");
    expect(items[2]).toHaveFocus();
    await userEvent.keyboard("{Home}");
    expect(items[0]).toHaveFocus();
  });

  it("closes on Escape and restores focus to the trigger", async () => {
    render(<Menu trigger="Actions" items={makeItems()} />);
    const trigger = screen.getByRole("button", { name: "Actions" });
    trigger.focus();
    await userEvent.keyboard("{ArrowDown}");
    expect(screen.getByRole("menu")).toBeInTheDocument();
    await userEvent.keyboard("{Escape}");
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it("activates an item, firing its handler and closing", async () => {
    const onEdit = vi.fn();
    render(<Menu trigger="Actions" items={makeItems(onEdit)} />);
    const trigger = screen.getByRole("button", { name: "Actions" });
    await userEvent.click(trigger);
    await userEvent.click(screen.getByRole("menuitem", { name: "Edit" }));
    expect(onEdit).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it("closes on outside click", async () => {
    render(
      <div>
        <Menu trigger="Actions" items={makeItems()} />
        <button type="button">Outside</button>
      </div>,
    );
    await userEvent.click(screen.getByRole("button", { name: "Actions" }));
    expect(screen.getByRole("menu")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Outside" }));
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("has no axe violations while open in LTR", async () => {
    const { container } = render(<Menu trigger="Actions" items={makeItems()} />);
    await userEvent.click(screen.getByRole("button", { name: "Actions" }));
    expect(screen.getByRole("menu")).toBeInTheDocument();
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no axe violations while open in RTL", async () => {
    const { container } = render(
      <div dir="rtl">
        <Menu trigger="إجراءات" items={makeItems()} align="end" />
      </div>,
    );
    await userEvent.click(screen.getByRole("button", { name: "إجراءات" }));
    expect(screen.getByRole("menu")).toBeInTheDocument();
    expect(await axe(container)).toHaveNoViolations();
  });
});
