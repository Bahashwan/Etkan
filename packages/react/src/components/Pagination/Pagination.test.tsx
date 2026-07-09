import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { describe, expect, it, vi } from "vitest";

import { Pagination } from "./Pagination";

describe("Pagination", () => {
  it("renders a nav landmark with an accessible name", () => {
    render(<Pagination page={1} pageCount={5} />);
    expect(screen.getByRole("navigation", { name: "Pagination" })).toBeInTheDocument();
  });

  it("marks the active page with aria-current=page", () => {
    render(<Pagination page={3} pageCount={5} />);
    const active = screen.getByRole("button", { name: "Page 3" });
    expect(active).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("button", { name: "Page 2" })).not.toHaveAttribute("aria-current");
  });

  it("disables previous at the first page and next at the last", () => {
    const { rerender } = render(<Pagination page={1} pageCount={5} />);
    expect(screen.getByRole("button", { name: "Previous page" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Next page" })).toBeEnabled();

    rerender(<Pagination page={5} pageCount={5} />);
    expect(screen.getByRole("button", { name: "Next page" })).toBeDisabled();
  });

  it("fires onChange when a page and next are activated", async () => {
    const onChange = vi.fn();
    render(<Pagination page={2} pageCount={5} onChange={onChange} />);
    await userEvent.click(screen.getByRole("button", { name: "Page 4" }));
    expect(onChange).toHaveBeenCalledWith(4);
    await userEvent.click(screen.getByRole("button", { name: "Next page" }));
    expect(onChange).toHaveBeenCalledWith(3);
  });

  it("does not fire onChange for the current page", async () => {
    const onChange = vi.fn();
    render(<Pagination page={2} pageCount={5} onChange={onChange} />);
    await userEvent.click(screen.getByRole("button", { name: "Page 2" }));
    expect(onChange).not.toHaveBeenCalled();
  });

  it("has no axe violations (EN/LTR and AR/RTL)", async () => {
    const { container } = render(
      <div>
        <Pagination page={3} pageCount={10} />
        <div dir="rtl">
          <Pagination page={2} pageCount={6} label="ترقيم الصفحات" previousLabel="السابق" nextLabel="التالي" />
        </div>
      </div>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
