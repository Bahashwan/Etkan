import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "@backdoor_est/etkan-ui-react";

const meta: Meta<typeof Checkbox> = {
  title: "Forms/Checkbox",
  component: Checkbox,
  args: { label: "Email me product updates", disabled: false, indeterminate: false },
  argTypes: {
    disabled: { control: "boolean" },
    indeterminate: { control: "boolean" },
  },
};
export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Playground: Story = {};

export const States: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "flex-start" }}>
      <Checkbox label="Unchecked" />
      <Checkbox label="Checked" defaultChecked />
      <Checkbox label="Indeterminate" indeterminate />
      <Checkbox label="Disabled" disabled />
      <Checkbox label="Disabled checked" disabled defaultChecked />
    </div>
  ),
};

export const Arabic: Story = {
  globals: { direction: "rtl" },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "flex-start" }}>
      <Checkbox label="أوافق على الشروط" defaultChecked />
      <Checkbox label="تذكرني على هذا الجهاز" />
    </div>
  ),
};
