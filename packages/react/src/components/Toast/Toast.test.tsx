import { act, fireEvent, render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { Toast } from "./Toast";

describe("Toast", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("renders content and a dismiss button", () => {
    render(<Toast open onDismiss={() => {}} title="Saved" message="All good" />);
    expect(screen.getByRole("status")).toHaveTextContent("Saved");
    expect(screen.getByRole("button", { name: "Dismiss" })).toBeInTheDocument();
  });

  it("uses role=alert for the danger tone", () => {
    render(<Toast open tone="danger" title="Failed" />);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("fires onDismiss from the close button", () => {
    const onDismiss = vi.fn();
    render(<Toast open onDismiss={onDismiss} title="Hi" />);
    fireEvent.click(screen.getByRole("button", { name: "Dismiss" }));
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it("auto-dismisses after the duration", () => {
    const onDismiss = vi.fn();
    render(<Toast open onDismiss={onDismiss} duration={4000} title="Bye soon" />);
    expect(onDismiss).not.toHaveBeenCalled();
    act(() => {
      vi.advanceTimersByTime(4000);
    });
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it("pauses the auto-dismiss timer while hovered", () => {
    const onDismiss = vi.fn();
    render(<Toast open onDismiss={onDismiss} duration={4000} title="Hover me" />);
    const toast = screen.getByRole("status");

    act(() => {
      fireEvent.mouseEnter(toast);
    });
    act(() => {
      vi.advanceTimersByTime(6000);
    });
    expect(onDismiss).not.toHaveBeenCalled();

    act(() => {
      fireEvent.mouseLeave(toast);
    });
    act(() => {
      vi.advanceTimersByTime(4000);
    });
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it("unmounts after the exit animation completes", () => {
    const { rerender } = render(<Toast open duration={0} title="Closing" />);
    expect(screen.getByText("Closing")).toBeInTheDocument();
    rerender(<Toast open={false} duration={0} title="Closing" />);
    act(() => {
      vi.advanceTimersByTime(320);
    });
    expect(screen.queryByText("Closing")).not.toBeInTheDocument();
  });

  it("has no axe violations (LTR and RTL)", async () => {
    vi.useRealTimers();
    const { unmount } = render(
      <Toast open onDismiss={() => {}} title="Uploaded" message="Your file is ready" />,
    );
    expect(await axe(document.body)).toHaveNoViolations();
    unmount();

    render(
      <div dir="rtl">
        <Toast open onDismiss={() => {}} tone="success" title="تم الحفظ" message="تم حفظ ملفك" />
      </div>,
    );
    expect(await axe(document.body)).toHaveNoViolations();
  });
});
