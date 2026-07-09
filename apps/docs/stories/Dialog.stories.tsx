import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button, Dialog } from "@backdoor_est/etkan-ui-react";

const meta: Meta<typeof Dialog> = {
  title: "Feedback/Dialog",
  component: Dialog,
  args: {
    title: "Delete project",
    description: "This permanently removes the project and all of its data.",
    size: "md",
    closeOnBackdrop: true,
  },
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    closeOnBackdrop: { control: "boolean" },
  },
};
export default meta;

type Story = StoryObj<typeof Dialog>;

export const Playground: Story = {
  render: (args) => {
    const [open, setOpen] = React.useState(false);
    return (
      <div style={{ padding: 24 }}>
        <Button variant="danger" onClick={() => setOpen(true)}>
          Delete project
        </Button>
        <Dialog
          {...args}
          open={open}
          onClose={() => setOpen(false)}
          footer={
            <>
              <Button variant="ghost" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button variant="danger" onClick={() => setOpen(false)}>
                Delete
              </Button>
            </>
          }
        >
          <p>You will not be able to recover it afterwards.</p>
        </Dialog>
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const [size, setSize] = React.useState<"sm" | "md" | "lg" | null>(null);
    return (
      <div style={{ display: "flex", gap: 12, padding: 24 }}>
        {(["sm", "md", "lg"] as const).map((s) => (
          <Button key={s} variant="secondary" onClick={() => setSize(s)}>
            Open {s}
          </Button>
        ))}
        <Dialog
          open={size !== null}
          size={size ?? "md"}
          onClose={() => setSize(null)}
          title={`Dialog — ${size ?? ""}`}
          description="Resize preset preview."
          footer={
            <Button variant="primary" onClick={() => setSize(null)}>
              Got it
            </Button>
          }
        >
          <p>Body content adapts to the chosen max-width.</p>
        </Dialog>
      </div>
    );
  },
};

export const Arabic: Story = {
  globals: { direction: "rtl" },
  render: () => {
    const [open, setOpen] = React.useState(false);
    return (
      <div style={{ padding: 24 }} dir="rtl">
        <Button variant="danger" onClick={() => setOpen(true)}>
          حذف المشروع
        </Button>
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          title="حذف المشروع"
          description="سيؤدي هذا إلى إزالة المشروع وجميع بياناته نهائياً."
          footer={
            <>
              <Button variant="ghost" onClick={() => setOpen(false)}>
                إلغاء
              </Button>
              <Button variant="danger" onClick={() => setOpen(false)}>
                حذف
              </Button>
            </>
          }
        >
          <p>لن تتمكن من استعادته بعد ذلك.</p>
        </Dialog>
      </div>
    );
  },
};
