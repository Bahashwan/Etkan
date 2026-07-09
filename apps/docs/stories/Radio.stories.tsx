import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Radio } from "@backdoor_est/etkan-ui-react";

const meta: Meta<typeof Radio> = {
  title: "Forms/Radio",
  component: Radio,
  args: { label: "Free plan", name: "plan", value: "free", disabled: false },
  argTypes: {
    disabled: { control: "boolean" },
  },
};
export default meta;

type Story = StoryObj<typeof Radio>;

export const Playground: Story = {};

export const States: Story = {
  render: () => (
    <fieldset style={{ border: "none", padding: 0, display: "flex", flexDirection: "column", gap: 12 }}>
      <legend style={{ padding: 0, marginBottom: 8 }}>Choose a plan</legend>
      <Radio name="states" value="free" label="Free" defaultChecked />
      <Radio name="states" value="pro" label="Pro" />
      <Radio name="states" value="team" label="Team" />
      <Radio name="states" value="ent" label="Enterprise (disabled)" disabled />
    </fieldset>
  ),
};

export const Arabic: Story = {
  globals: { direction: "rtl" },
  render: () => (
    <fieldset style={{ border: "none", padding: 0, display: "flex", flexDirection: "column", gap: 12 }}>
      <legend style={{ padding: 0, marginBottom: 8 }}>اختر الخطة</legend>
      <Radio name="ar" value="m" label="اشتراك شهري" defaultChecked />
      <Radio name="ar" value="y" label="اشتراك سنوي" />
    </fieldset>
  ),
};
