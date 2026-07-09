import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "@etkan-ui/react";

const meta: Meta<typeof Badge> = {
  title: "Data/Badge",
  component: Badge,
  args: { children: "Active", tone: "neutral", variant: "soft", dot: false },
  argTypes: {
    tone: {
      control: "select",
      options: ["neutral", "primary", "success", "warning", "danger", "info"],
    },
    variant: { control: "inline-radio", options: ["soft", "solid"] },
    dot: { control: "boolean" },
  },
};
export default meta;

type Story = StoryObj<typeof Badge>;

export const Playground: Story = {};

export const AllTones: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
      <Badge {...args} tone="neutral">Draft</Badge>
      <Badge {...args} tone="primary">New</Badge>
      <Badge {...args} tone="success" dot>Paid</Badge>
      <Badge {...args} tone="warning">Pending</Badge>
      <Badge {...args} tone="danger">Overdue</Badge>
      <Badge {...args} tone="info">Info</Badge>
    </div>
  ),
};

export const SoftAndSolid: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
      <Badge tone="success" variant="soft">1,200 ر.س</Badge>
      <Badge tone="success" variant="solid">Paid</Badge>
      <Badge tone="danger" variant="soft">Overdue</Badge>
      <Badge tone="danger" variant="solid">Failed</Badge>
    </div>
  ),
};

export const Arabic: Story = {
  globals: { direction: "rtl" },
  render: () => (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
      <Badge tone="success" dot>مدفوعة · 1٬200 ر.س</Badge>
      <Badge tone="warning">قيد المراجعة</Badge>
      <Badge tone="danger" variant="solid">متأخرة</Badge>
    </div>
  ),
};
