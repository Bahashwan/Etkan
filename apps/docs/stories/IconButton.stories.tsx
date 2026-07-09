import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { IconButton } from "@etkan-ui/react";

const Plus = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
    <path d="M9 2v14M2 9h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const meta: Meta<typeof IconButton> = {
  title: "Forms/IconButton",
  component: IconButton,
  args: { icon: <Plus />, label: "Add item", variant: "ghost", size: "md" },
  argTypes: {
    variant: { control: "select", options: ["primary", "secondary", "ghost", "danger"] },
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
  },
};
export default meta;

type Story = StoryObj<typeof IconButton>;

export const Playground: Story = {};

export const States: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
      <IconButton {...args} variant="primary" label="Add" />
      <IconButton {...args} variant="secondary" label="Edit" />
      <IconButton {...args} variant="ghost" label="More" />
      <IconButton {...args} variant="danger" label="Delete" />
      <IconButton {...args} disabled label="Disabled" />
    </div>
  ),
};

export const Arabic: Story = {
  globals: { direction: "rtl" },
  render: () => (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
      <IconButton icon={<Plus />} label="إضافة" variant="primary" />
      <IconButton icon={<Plus />} label="تعديل" variant="secondary" />
      <IconButton icon={<Plus />} label="المزيد" variant="ghost" />
    </div>
  ),
};
