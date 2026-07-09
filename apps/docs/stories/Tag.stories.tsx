import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Tag } from "@etkan-ui/react";

const meta: Meta<typeof Tag> = {
  title: "Data/Tag",
  component: Tag,
  args: { children: "Design" },
  argTypes: {
    color: { control: "color" },
    onRemove: { action: "removed" },
  },
};
export default meta;

type Story = StoryObj<typeof Tag>;

export const Playground: Story = {};

export const Variants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
      <Tag>Frontend</Tag>
      <Tag color="#5B5BF0">Design</Tag>
      <Tag color="#12A150" onRemove={() => {}} removeLabel="Remove Backend">
        Backend
      </Tag>
      <Tag onRemove={() => {}} removeLabel="Remove Research">
        Research
      </Tag>
    </div>
  ),
};

export const Arabic: Story = {
  globals: { direction: "rtl" },
  render: () => (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
      <Tag color="#F85A34" onRemove={() => {}} removeLabel="إزالة التصميم">
        تصميم
      </Tag>
      <Tag onRemove={() => {}} removeLabel="إزالة الواجهة الأمامية">
        الواجهة الأمامية
      </Tag>
      <Tag>الأبحاث</Tag>
    </div>
  ),
};
