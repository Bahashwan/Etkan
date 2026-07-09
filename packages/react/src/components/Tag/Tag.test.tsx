import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { describe, expect, it, vi } from "vitest";

import { Tag } from "./Tag";

describe("Tag", () => {
  it("renders its label", () => {
    render(<Tag>Design</Tag>);
    expect(screen.getByText("Design")).toBeInTheDocument();
  });

  it("shows no dismiss button without onRemove", () => {
    render(<Tag>Design</Tag>);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("fires onRemove and exposes an accessible name", async () => {
    const onRemove = vi.fn();
    render(
      <Tag onRemove={onRemove} removeLabel="Remove Design">
        Design
      </Tag>,
    );
    const btn = screen.getByRole("button", { name: "Remove Design" });
    await userEvent.click(btn);
    expect(onRemove).toHaveBeenCalledTimes(1);
  });

  it("renders Arabic labels under dir=rtl", () => {
    render(
      <div dir="rtl">
        <Tag onRemove={() => {}} removeLabel="إزالة التصميم">
          تصميم
        </Tag>
      </div>,
    );
    expect(screen.getByText("تصميم")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "إزالة التصميم" })).toBeInTheDocument();
  });

  it("has no axe violations (EN/LTR and AR/RTL)", async () => {
    const { container } = render(
      <div>
        <Tag color="#5B5BF0" onRemove={() => {}} removeLabel="Remove Frontend">
          Frontend
        </Tag>
        <div dir="rtl">
          <Tag onRemove={() => {}} removeLabel="إزالة الواجهة">
            الواجهة الأمامية
          </Tag>
        </div>
      </div>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
