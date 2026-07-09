import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button, Tooltip } from "@backdoor/etkan-ui-react";

const meta: Meta<typeof Tooltip> = {
  title: "Feedback/Tooltip",
  component: Tooltip,
  args: { content: "Saves your work", side: "top", openDelay: 300 },
  argTypes: {
    side: { control: "inline-radio", options: ["top", "bottom", "start", "end"] },
    openDelay: { control: { type: "number" } },
  },
};
export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Playground: Story = {
  render: (args) => (
    <div style={{ padding: 80 }}>
      <Tooltip {...args}>
        <Button variant="secondary">Hover or focus me</Button>
      </Tooltip>
    </div>
  ),
};

export const Sides: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 48, padding: 80, flexWrap: "wrap" }}>
      {(["top", "bottom", "start", "end"] as const).map((side) => (
        <Tooltip key={side} content={`Side: ${side}`} side={side} openDelay={0}>
          <Button variant="secondary">{side}</Button>
        </Tooltip>
      ))}
    </div>
  ),
};

export const Arabic: Story = {
  globals: { direction: "rtl" },
  render: () => (
    <div style={{ display: "flex", gap: 48, padding: 80 }}>
      <Tooltip content="يحفظ عملك" side="start" openDelay={0}>
        <Button variant="secondary">مرّر أو ركّز</Button>
      </Tooltip>
      <Tooltip content="إعدادات" side="bottom" openDelay={0}>
        <Button variant="ghost">إعدادات</Button>
      </Tooltip>
    </div>
  ),
};
