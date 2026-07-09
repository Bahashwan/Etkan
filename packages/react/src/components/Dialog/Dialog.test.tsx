import * as React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { describe, expect, it, vi } from "vitest";

import { Dialog } from "./Dialog";

describe("Dialog", () => {
  it("does not render while closed", () => {
    render(
      <Dialog open={false} title="Hidden">
        Body
      </Dialog>,
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renders with an accessible name from the title", () => {
    render(
      <Dialog open title="Delete project" description="This cannot be undone.">
        Body
      </Dialog>,
    );
    const dialog = screen.getByRole("dialog", { name: "Delete project" });
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(dialog).toHaveAccessibleDescription("This cannot be undone.");
  });

  it("closes on Escape", () => {
    const onClose = vi.fn();
    render(
      <Dialog open onClose={onClose} title="Confirm">
        Body
      </Dialog>,
    );
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("closes on backdrop click, and not when disabled", () => {
    const onClose = vi.fn();
    const { rerender } = render(
      <Dialog open onClose={onClose} title="Confirm">
        Body
      </Dialog>,
    );
    const overlay = screen.getByRole("dialog").parentElement as HTMLElement;
    fireEvent.mouseDown(overlay);
    expect(onClose).toHaveBeenCalledTimes(1);

    rerender(
      <Dialog open onClose={onClose} closeOnBackdrop={false} title="Confirm">
        Body
      </Dialog>,
    );
    fireEvent.mouseDown(screen.getByRole("dialog").parentElement as HTMLElement);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("traps focus with Tab and Shift+Tab", () => {
    render(
      <Dialog
        open
        title="Actions"
        footer={
          <>
            <button>Cancel</button>
            <button>Confirm</button>
          </>
        }
      />,
    );
    const cancel = screen.getByRole("button", { name: "Cancel" });
    const confirm = screen.getByRole("button", { name: "Confirm" });

    confirm.focus();
    fireEvent.keyDown(document, { key: "Tab" });
    expect(cancel).toHaveFocus();

    fireEvent.keyDown(document, { key: "Tab", shiftKey: true });
    expect(confirm).toHaveFocus();
  });

  it("restores focus to the opener on close", async () => {
    function Harness() {
      const [open, setOpen] = React.useState(false);
      return (
        <>
          <button onClick={() => setOpen(true)}>Open</button>
          <Dialog open={open} onClose={() => setOpen(false)} title="Settings">
            <button>Field</button>
          </Dialog>
        </>
      );
    }
    render(<Harness />);
    const opener = screen.getByRole("button", { name: "Open" });

    await userEvent.click(opener);
    await screen.findByRole("dialog");
    expect(opener).not.toHaveFocus();

    fireEvent.keyDown(document, { key: "Escape" });
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    expect(opener).toHaveFocus();
  });

  it("has no axe violations while open (LTR and RTL)", async () => {
    const { unmount } = render(
      <Dialog open title="Invite teammate" description="They will receive an email.">
        <p>Body content</p>
      </Dialog>,
    );
    expect(await axe(document.body)).toHaveNoViolations();
    unmount();

    render(
      <div dir="rtl">
        <Dialog open title="دعوة زميل" description="سيصلهم بريد إلكتروني.">
          <p>محتوى الحوار</p>
        </Dialog>
      </div>,
    );
    expect(await axe(document.body)).toHaveNoViolations();
  });
});
