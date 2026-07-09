import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Tabs } from "@etkan-ui/react";

const items = [
  { value: "overview", label: "Overview", content: "Project overview and key metrics." },
  { value: "activity", label: "Activity", content: "Recent activity across the team." },
  { value: "members", label: "Members", content: "People with access to this workspace." },
  { value: "settings", label: "Settings", content: "Workspace configuration." },
];

const meta: Meta<typeof Tabs> = {
  title: "Navigation/Tabs",
  component: Tabs,
  args: { items, defaultValue: "overview", variant: "underline", "aria-label": "Sections" },
  argTypes: {
    variant: { control: "inline-radio", options: ["underline", "pills"] },
  },
};
export default meta;

type Story = StoryObj<typeof Tabs>;

export const Playground: Story = {};

export const Variants: Story = {
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      <Tabs {...args} variant="underline" aria-label="Underline" />
      <Tabs {...args} variant="pills" aria-label="Pills" />
      <Tabs
        {...args}
        variant="underline"
        aria-label="With a disabled tab"
        items={[
          ...items.slice(0, 2),
          { value: "billing", label: "Billing", content: "Coming soon.", disabled: true },
          items[3]!,
        ]}
      />
    </div>
  ),
};

export const Arabic: Story = {
  globals: { direction: "rtl" },
  render: () => (
    <div dir="rtl" style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      <Tabs
        aria-label="أقسام"
        defaultValue="overview"
        items={[
          { value: "overview", label: "نظرة عامة", content: "لمحة عن المشروع وأهم المؤشرات." },
          { value: "activity", label: "النشاط", content: "أحدث الأنشطة عبر الفريق." },
          { value: "members", label: "الأعضاء", content: "الأشخاص الذين يملكون صلاحية الوصول." },
          { value: "settings", label: "الإعدادات", content: "إعدادات مساحة العمل." },
        ]}
      />
    </div>
  ),
};
