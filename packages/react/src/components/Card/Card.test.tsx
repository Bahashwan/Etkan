import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { describe, expect, it, vi } from "vitest";

import { Card } from "./Card";

describe("Card", () => {
  it("renders children, header and footer slots", () => {
    render(
      <Card header="Invoice" footer="Footer note">
        Body content
      </Card>,
    );
    expect(screen.getByText("Invoice")).toBeInTheDocument();
    expect(screen.getByText("Body content")).toBeInTheDocument();
    expect(screen.getByText("Footer note")).toBeInTheDocument();
  });

  it("stays a static container when not interactive", () => {
    render(<Card>Static</Card>);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("exposes a button role and fires onClick when interactive", async () => {
    const onClick = vi.fn();
    render(
      <Card interactive onClick={onClick}>
        Clickable
      </Card>,
    );
    const card = screen.getByRole("button");
    await userEvent.click(card);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("activates via keyboard (Enter) when interactive", async () => {
    const onClick = vi.fn();
    render(
      <Card interactive onClick={onClick}>
        Clickable
      </Card>,
    );
    const card = screen.getByRole("button");
    act(() => card.focus());
    await userEvent.keyboard("{Enter}");
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("has no axe violations (EN/LTR and AR/RTL)", async () => {
    const { container } = render(
      <div>
        <Card variant="elevated" header="Overview">
          Elevated
        </Card>
        <Card variant="outlined" interactive onClick={() => {}}>
          Outlined interactive
        </Card>
        <div dir="rtl">
          <Card header="الملخص" footer="حاشية">
            محتوى البطاقة
          </Card>
        </div>
      </div>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
