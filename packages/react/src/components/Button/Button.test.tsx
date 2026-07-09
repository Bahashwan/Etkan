import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { describe, expect, it, vi } from "vitest";

import { Button } from "./Button";

describe("Button", () => {
  it("renders its label and defaults to type=button", () => {
    render(<Button>Save changes</Button>);
    const btn = screen.getByRole("button", { name: "Save changes" });
    expect(btn).toHaveAttribute("type", "button");
  });

  it("fires onClick", async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Go</Button>);
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("blocks clicks while loading and hides icons", async () => {
    const onClick = vi.fn();
    render(
      <Button loading onClick={onClick} iconStart={<span data-testid="icon" />}>
        Sending
      </Button>,
    );
    const btn = screen.getByRole("button");
    expect(btn).toBeDisabled();
    expect(screen.queryByTestId("icon")).not.toBeInTheDocument();
    await userEvent.click(btn).catch(() => {});
    expect(onClick).not.toHaveBeenCalled();
  });

  it("renders Arabic labels under dir=rtl", () => {
    render(
      <div dir="rtl">
        <Button>حفظ التغييرات</Button>
      </div>,
    );
    expect(screen.getByRole("button", { name: "حفظ التغييرات" })).toBeInTheDocument();
  });

  it("has no axe violations (EN/LTR and AR/RTL)", async () => {
    const { container } = render(
      <div>
        <Button>Start free</Button>
        <div dir="rtl">
          <Button variant="secondary">ابدأ مجاناً</Button>
        </div>
      </div>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
