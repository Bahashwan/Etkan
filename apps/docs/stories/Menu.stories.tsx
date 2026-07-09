import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Menu } from "@backdoor_est/etkan-ui-react";

const items = [
  { label: "Edit", shortcut: "E", onClick: () => {} },
  { label: "Duplicate", shortcut: "D", onClick: () => {} },
  { label: "Share", onClick: () => {} },
  { divider: true },
  { label: "Delete", danger: true, shortcut: "Del", onClick: () => {} },
];

const meta: Meta<typeof Menu> = {
  title: "Navigation/Menu",
  component: Menu,
  args: { trigger: "Actions ▾", items, align: "start" },
  argTypes: {
    align: { control: "inline-radio", options: ["start", "end"] },
  },
};
export default meta;

type Story = StoryObj<typeof Menu>;

export const Playground: Story = {};

export const States: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: 48, alignItems: "flex-start" }}>
      <Menu {...args} trigger="Aligned to start" align="start" />
      <Menu {...args} trigger="Aligned to end" align="end" />
      <Menu
        {...args}
        trigger={(open) => <span>{open ? "Open ▴" : "Closed ▾"}</span>}
      />
    </div>
  ),
};

export const Arabic: Story = {
  globals: { direction: "rtl" },
  render: () => (
    <div dir="rtl">
      <Menu
        trigger="إجراءات ▾"
        align="start"
        items={[
          { label: "تحرير", onClick: () => {} },
          { label: "تكرار", onClick: () => {} },
          { label: "مشاركة", onClick: () => {} },
          { divider: true },
          { label: "حذف", danger: true, onClick: () => {} },
        ]}
      />
    </div>
  ),
};
