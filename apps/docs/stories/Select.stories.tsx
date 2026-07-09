import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Select } from "@backdoor/etkan-ui-react";

const meta: Meta<typeof Select> = {
  title: "Forms/Select",
  component: Select,
  args: {
    label: "City",
    placeholder: "Select a city",
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
  render: (args) => (
    <div style={{ inlineSize: 320 }}>
      <Select {...args}>
        <option value="riyadh">Riyadh</option>
        <option value="jeddah">Jeddah</option>
        <option value="dammam">Dammam</option>
        <option value="mecca">Mecca</option>
      </Select>
    </div>
  ),
};
export default meta;

type Story = StoryObj<typeof Select>;

export const Playground: Story = {};

export const States: Story = {
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 20, inlineSize: 320 }}>
      <Select {...args} label="Default" placeholder="Select a city">
        <option value="riyadh">Riyadh</option>
        <option value="jeddah">Jeddah</option>
        <option value="dammam">Dammam</option>
      </Select>
      <Select
        {...args}
        label="With helper text"
        placeholder="Select a city"
        helperText="Choose your billing city."
      >
        <option value="riyadh">Riyadh</option>
        <option value="jeddah">Jeddah</option>
        <option value="dammam">Dammam</option>
      </Select>
      <Select
        {...args}
        label="Error"
        placeholder="Select a city"
        invalid
        errorText="Please select a city."
      >
        <option value="riyadh">Riyadh</option>
        <option value="jeddah">Jeddah</option>
        <option value="dammam">Dammam</option>
      </Select>
      <Select {...args} label="Disabled" placeholder="Select a city" disabled>
        <option value="riyadh">Riyadh</option>
        <option value="jeddah">Jeddah</option>
        <option value="dammam">Dammam</option>
      </Select>
    </div>
  ),
};

export const Arabic: Story = {
  globals: { direction: "rtl" },
  render: () => (
    <div style={{ inlineSize: 320 }}>
      <Select label="المدينة" placeholder="اختر المدينة" helperText="اختر مدينة الفوترة.">
        <option value="riyadh">الرياض</option>
        <option value="jeddah">جدة</option>
        <option value="dammam">الدمام</option>
        <option value="mecca">مكة المكرمة</option>
      </Select>
    </div>
  ),
};
