import { fireEvent, render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { describe, expect, it } from "vitest";

import { Tooltip } from "./Tooltip";

describe("Tooltip", () => {
  it("appears on keyboard focus and wires aria-describedby", async () => {
    render(
      <Tooltip content="Saves your work">
        <button>Save</button>
      </Tooltip>,
    );
    const btn = screen.getByRole("button", { name: "Save" });
    expect(btn).not.toHaveAttribute("aria-describedby");

    await userEvent.tab();
    expect(btn).toHaveFocus();

    const tip = await screen.findByRole("tooltip");
    expect(tip).toHaveTextContent("Saves your work");
    expect(btn.getAttribute("aria-describedby")).toBe(tip.getAttribute("id"));
  });

  it("appears on hover", async () => {
    render(
      <Tooltip content="Hovered" openDelay={0}>
        <button>Trigger</button>
      </Tooltip>,
    );
    await userEvent.hover(screen.getByRole("button"));
    expect(await screen.findByRole("tooltip")).toHaveTextContent("Hovered");
  });

  it("hides on Escape", async () => {
    render(
      <Tooltip content="Dismiss me">
        <button>Trigger</button>
      </Tooltip>,
    );
    const btn = screen.getByRole("button");
    await userEvent.tab();
    await screen.findByRole("tooltip");

    fireEvent.keyDown(btn, { key: "Escape" });
    await waitForElementToBeRemoved(() => screen.queryByRole("tooltip"));
    expect(btn).not.toHaveAttribute("aria-describedby");
  });

  it("hides on blur", async () => {
    render(
      <>
        <Tooltip content="Bye">
          <button>Trigger</button>
        </Tooltip>
        <button>Elsewhere</button>
      </>,
    );
    await userEvent.tab();
    await screen.findByRole("tooltip");
    await userEvent.tab();
    await waitForElementToBeRemoved(() => screen.queryByRole("tooltip"));
  });

  it("has no axe violations while open (LTR and RTL)", async () => {
    // "region" is a page-level landmark rule, not a component concern.
    const opts = { rules: { region: { enabled: false } } };

    const ltr = render(
      <Tooltip content="Info">
        <button>Details</button>
      </Tooltip>,
    );
    await userEvent.tab();
    await screen.findByRole("tooltip");
    expect(await axe(document.body, opts)).toHaveNoViolations();
    ltr.unmount();

    render(
      <div dir="rtl">
        <Tooltip content="معلومات" side="start">
          <button>تفاصيل</button>
        </Tooltip>
      </div>,
    );
    await userEvent.tab();
    await screen.findByRole("tooltip");
    expect(await axe(document.body, opts)).toHaveNoViolations();
  });
});
