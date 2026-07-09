import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "@etkan-ui/react";

const meta: Meta<typeof Card> = {
  title: "Data/Card",
  component: Card,
  args: {
    variant: "elevated",
    padding: "md",
    interactive: false,
    children: "Card body content goes here.",
  },
  argTypes: {
    variant: { control: "inline-radio", options: ["elevated", "outlined"] },
    padding: { control: "inline-radio", options: ["none", "sm", "md", "lg"] },
    interactive: { control: "boolean" },
  },
};
export default meta;

type Story = StoryObj<typeof Card>;

export const Playground: Story = {
  args: { header: "Overview" },
};

export const Variants: Story = {
  render: (args) => (
    <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(2, minmax(0, 1fr))" }}>
      <Card {...args} variant="elevated" header="Elevated">
        Raised with a soft shadow.
      </Card>
      <Card {...args} variant="outlined" header="Outlined">
        Flat with a border.
      </Card>
      <Card {...args} variant="elevated" interactive header="Interactive">
        Hover to lift. Fully keyboard focusable.
      </Card>
      <Card
        {...args}
        variant="outlined"
        header="Invoice #10428"
        footer={<span style={{ fontWeight: 600 }}>Total: 3,450 ر.س</span>}
      >
        Two line items · due in 14 days.
      </Card>
    </div>
  ),
};

export const Arabic: Story = {
  globals: { direction: "rtl" },
  render: () => (
    <div style={{ maxInlineSize: 360 }}>
      <Card
        variant="elevated"
        interactive
        header="فاتورة رقم ١٠٤٢٨"
        footer={<span style={{ fontWeight: 600 }}>الإجمالي: 3٬450 ر.س</span>}
      >
        بندان · مستحقة خلال ١٤ يوماً.
      </Card>
    </div>
  ),
};
