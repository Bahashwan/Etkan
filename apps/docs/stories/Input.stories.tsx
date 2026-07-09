import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Input, SaudiRiyal } from "@etkan-ui/react";

const meta: Meta<typeof Input> = {
  title: "Forms/Input",
  component: Input,
  args: {
    label: "Email",
    placeholder: "you@company.com",
    size: "md",
    invalid: false,
    disabled: false,
  },
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    invalid: { control: "boolean" },
    disabled: { control: "boolean" },
    helperText: { control: "text" },
    errorText: { control: "text" },
    label: { control: "text" },
    placeholder: { control: "text" },
  },
};
export default meta;

type Story = StoryObj<typeof Input>;

export const Playground: Story = {};

export const States: Story = {
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 20, inlineSize: 320 }}>
      <Input {...args} label="Default" placeholder="you@company.com" />
      <Input
        {...args}
        label="With helper text"
        placeholder="you@company.com"
        helperText="We never share your email."
      />
      <Input
        {...args}
        label="Error"
        placeholder="you@company.com"
        invalid
        errorText="Please enter a valid email address."
      />
      <Input {...args} label="Disabled" placeholder="you@company.com" disabled />
    </div>
  ),
};

export const Price: Story = {
  render: (args) => (
    <div style={{ inlineSize: 320 }}>
      <Input
        {...args}
        label="Price"
        type="number"
        placeholder="0.00"
        prefix={<SaudiRiyal />}
        helperText="Amount in Saudi Riyal."
      />
    </div>
  ),
};

export const Arabic: Story = {
  globals: { direction: "rtl" },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 20, inlineSize: 320 }}>
      <Input
        label="البريد الإلكتروني"
        placeholder="you@company.com"
        helperText="لن نشارك بريدك مع أحد."
      />
      <Input label="المبلغ" type="number" placeholder="0.00" prefix={<SaudiRiyal />} />
    </div>
  ),
};
