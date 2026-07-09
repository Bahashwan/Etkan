import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Switch } from "@backdoor_est/etkan-ui-react";

const meta: Meta<typeof Switch> = {
  title: "Forms/Switch",
  component: Switch,
  args: { label: "Enable notifications", size: "md", disabled: false },
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "md"] },
    disabled: { control: "boolean" },
  },
};
export default meta;

type Story = StoryObj<typeof Switch>;

export const Playground: Story = {};

export const States: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "flex-start" }}>
      <Switch label="Off" />
      <Switch label="On" defaultChecked />
      <Switch label="Small" size="sm" defaultChecked />
      <Switch label="Disabled" disabled />
      <Switch label="Disabled on" disabled defaultChecked />
    </div>
  ),
};

export const Arabic: Story = {
  globals: { direction: "rtl" },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "flex-start" }}>
      <Switch label="تفعيل الإشعارات" defaultChecked />
      <Switch label="الوضع الليلي" />
    </div>
  ),
};
