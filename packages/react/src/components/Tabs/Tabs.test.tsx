import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { describe, expect, it, vi } from "vitest";

import { Tabs } from "./Tabs";

const ITEMS = [
  { value: "overview", label: "Overview", content: "Overview panel" },
  { value: "activity", label: "Activity", content: "Activity panel" },
  { value: "settings", label: "Settings", content: "Settings panel" },
];

describe("Tabs", () => {
  it("uses roving tabindex — only the active tab is tabbable", () => {
    render(<Tabs items={ITEMS} defaultValue="overview" aria-label="Sections" />);
    const tabs = screen.getAllByRole("tab");
    expect(tabs[0]).toHaveAttribute("tabindex", "0");
    expect(tabs[1]).toHaveAttribute("tabindex", "-1");
    expect(tabs[2]).toHaveAttribute("tabindex", "-1");
    expect(tabs[0]).toHaveAttribute("aria-selected", "true");
  });

  it("associates each panel with its tab", () => {
    render(<Tabs items={ITEMS} defaultValue="overview" aria-label="Sections" />);
    const tabs = screen.getAllByRole("tab");
    const panels = screen.getAllByRole("tabpanel", { hidden: true });
    tabs.forEach((tab, i) => {
      const panel = panels[i]!;
      const panelId = tab.getAttribute("aria-controls");
      expect(panelId).toBe(panel.getAttribute("id"));
      expect(panel.getAttribute("aria-labelledby")).toBe(tab.getAttribute("id"));
    });
    // Only the active panel is visible.
    expect(screen.getByText("Overview panel")).toBeVisible();
    expect(panels[1]).not.toBeVisible();
  });

  it("moves selection with ArrowRight/Left in LTR", async () => {
    const onChange = vi.fn();
    render(
      <Tabs items={ITEMS} defaultValue="overview" onChange={onChange} aria-label="Sections" />,
    );
    const tabs = screen.getAllByRole("tab");
    tabs[0]!.focus();
    await userEvent.keyboard("{ArrowRight}");
    expect(onChange).toHaveBeenLastCalledWith("activity");
    expect(tabs[1]).toHaveFocus();
    expect(tabs[1]).toHaveAttribute("aria-selected", "true");
    await userEvent.keyboard("{ArrowLeft}");
    expect(onChange).toHaveBeenLastCalledWith("overview");
  });

  it("FLIPS arrow order under dir=rtl", async () => {
    const onChange = vi.fn();
    render(
      <div dir="rtl">
        <Tabs items={ITEMS} defaultValue="overview" onChange={onChange} aria-label="أقسام" />
      </div>,
    );
    const tabs = screen.getAllByRole("tab");
    tabs[0]!.focus();
    // In RTL, ArrowLeft advances to the next tab.
    await userEvent.keyboard("{ArrowLeft}");
    expect(onChange).toHaveBeenLastCalledWith("activity");
    // ...and ArrowRight goes back to the previous tab.
    await userEvent.keyboard("{ArrowRight}");
    expect(onChange).toHaveBeenLastCalledWith("overview");
  });

  it("jumps to first/last with Home/End", async () => {
    const onChange = vi.fn();
    render(
      <Tabs items={ITEMS} defaultValue="activity" onChange={onChange} aria-label="Sections" />,
    );
    const tabs = screen.getAllByRole("tab");
    tabs[1]!.focus();
    await userEvent.keyboard("{End}");
    expect(onChange).toHaveBeenLastCalledWith("settings");
    expect(tabs[2]).toHaveFocus();
    await userEvent.keyboard("{Home}");
    expect(onChange).toHaveBeenLastCalledWith("overview");
    expect(tabs[0]).toHaveFocus();
  });

  it("has no axe violations (LTR and RTL)", async () => {
    const { container } = render(
      <div>
        <Tabs items={ITEMS} defaultValue="overview" aria-label="Sections" />
        <div dir="rtl">
          <Tabs items={ITEMS} defaultValue="overview" variant="pills" aria-label="أقسام" />
        </div>
      </div>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
