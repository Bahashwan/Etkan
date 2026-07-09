import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { describe, expect, it } from "vitest";

import { Badge } from "./Badge";

describe("Badge", () => {
  it("renders its content", () => {
    render(<Badge>Active</Badge>);
    expect(screen.getByText("Active")).toBeInTheDocument();
  });

  it("passes through arbitrary span attributes", () => {
    render(
      <Badge tone="success" data-testid="pill">
        Paid
      </Badge>,
    );
    expect(screen.getByTestId("pill")).toHaveTextContent("Paid");
  });

  it("renders Arabic content under dir=rtl", () => {
    render(
      <div dir="rtl">
        <Badge tone="warning">قيد المراجعة</Badge>
      </div>,
    );
    expect(screen.getByText("قيد المراجعة")).toBeInTheDocument();
  });

  it("has no axe violations (EN/LTR and AR/RTL, soft and solid)", async () => {
    const { container } = render(
      <div>
        <Badge tone="neutral">Neutral</Badge>
        <Badge tone="primary" variant="solid">
          Primary
        </Badge>
        <Badge tone="success" dot>
          Paid
        </Badge>
        <div dir="rtl">
          <Badge tone="danger">متأخر</Badge>
        </div>
      </div>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
