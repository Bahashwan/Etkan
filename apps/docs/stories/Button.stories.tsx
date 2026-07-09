import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@backdoor_est/etkan-ui-react";

const meta: Meta<typeof Button> = {
  title: "Forms/Button",
  component: Button,
  args: { children: "Start free", variant: "primary", size: "md" },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "ghost", "danger", "accent"],
    },
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
  },
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Playground: Story = {};

export const AllVariants: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
      <Button {...args} variant="primary">Start free</Button>
      <Button {...args} variant="secondary">Book a demo</Button>
      <Button {...args} variant="ghost">Cancel</Button>
      <Button {...args} variant="accent">Upgrade</Button>
      <Button {...args} variant="danger">Delete</Button>
      <Button {...args} loading>Sending</Button>
      <Button {...args} disabled>Disabled</Button>
    </div>
  ),
};

export const Arabic: Story = {
  globals: { direction: "rtl" },
  render: () => (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
      <Button variant="primary">ابدأ مجاناً</Button>
      <Button variant="secondary">احجز عرضاً</Button>
      <Button variant="ghost">إلغاء</Button>
    </div>
  ),
};
