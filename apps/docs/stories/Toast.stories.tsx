import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button, Toast } from "@backdoor/etkan-ui-react";

const meta: Meta<typeof Toast> = {
  title: "Feedback/Toast",
  component: Toast,
  args: {
    tone: "info",
    title: "Changes saved",
    message: "Your workspace is up to date.",
    duration: 5000,
    placement: "bottom-end",
  },
  argTypes: {
    tone: { control: "inline-radio", options: ["info", "success", "danger"] },
    placement: {
      control: "select",
      options: ["top-start", "top-end", "bottom-start", "bottom-end"],
    },
    duration: { control: { type: "number" } },
  },
};
export default meta;

type Story = StoryObj<typeof Toast>;

export const Playground: Story = {
  render: (args) => {
    const [open, setOpen] = React.useState(true);
    return (
      <div style={{ padding: 24 }}>
        <Button onClick={() => setOpen(true)}>Show toast</Button>
        <Toast {...args} open={open} onDismiss={() => setOpen(false)} />
      </div>
    );
  },
};

export const Tones: Story = {
  render: () => {
    const [tone, setTone] = React.useState<"info" | "success" | "danger" | null>(null);
    return (
      <div style={{ display: "flex", gap: 12, padding: 24 }}>
        <Button variant="secondary" onClick={() => setTone("info")}>
          Info
        </Button>
        <Button variant="accent" onClick={() => setTone("success")}>
          Success
        </Button>
        <Button variant="danger" onClick={() => setTone("danger")}>
          Danger
        </Button>
        {tone && (
          <Toast
            open
            tone={tone}
            title={tone === "danger" ? "Upload failed" : "Done"}
            message={tone === "danger" ? "Please try again." : "Everything worked."}
            duration={0}
            onDismiss={() => setTone(null)}
          />
        )}
      </div>
    );
  },
};

export const Arabic: Story = {
  globals: { direction: "rtl" },
  render: () => {
    const [open, setOpen] = React.useState(true);
    return (
      <div style={{ padding: 24 }} dir="rtl">
        <Button onClick={() => setOpen(true)}>عرض الإشعار</Button>
        <Toast
          open={open}
          tone="success"
          title="تم الحفظ"
          message="مساحة العمل محدّثة."
          placement="bottom-start"
          dismissLabel="إغلاق"
          duration={0}
          onDismiss={() => setOpen(false)}
        />
      </div>
    );
  },
};
