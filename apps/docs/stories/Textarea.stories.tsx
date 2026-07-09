import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "@backdoor/etkan-ui-react";

const meta: Meta<typeof Textarea> = {
  title: "Forms/Textarea",
  component: Textarea,
  args: {
    label: "Message",
    placeholder: "Tell us how we can help…",
    rows: 4,
    invalid: false,
    disabled: false,
  },
  argTypes: {
    rows: { control: { type: "number", min: 2, max: 12 } },
    invalid: { control: "boolean" },
    disabled: { control: "boolean" },
    helperText: { control: "text" },
    errorText: { control: "text" },
    label: { control: "text" },
    placeholder: { control: "text" },
  },
};
export default meta;

type Story = StoryObj<typeof Textarea>;

export const Playground: Story = {};

export const States: Story = {
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 20, inlineSize: 360 }}>
      <Textarea {...args} label="Default" placeholder="Tell us how we can help…" />
      <Textarea
        {...args}
        label="With helper text"
        placeholder="Tell us how we can help…"
        helperText="Up to 500 characters."
      />
      <Textarea
        {...args}
        label="Error"
        placeholder="Tell us how we can help…"
        invalid
        errorText="This field is required."
      />
      <Textarea {...args} label="Disabled" placeholder="Tell us how we can help…" disabled />
    </div>
  ),
};

export const Arabic: Story = {
  globals: { direction: "rtl" },
  render: () => (
    <div style={{ inlineSize: 360 }}>
      <Textarea
        label="الرسالة"
        placeholder="أخبرنا كيف يمكننا مساعدتك…"
        helperText="حتى ٥٠٠ حرف."
      />
    </div>
  ),
};
