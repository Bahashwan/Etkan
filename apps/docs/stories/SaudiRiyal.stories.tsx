import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { SaudiRiyal } from "@backdoor_est/etkan-ui-react";

const meta: Meta<typeof SaudiRiyal> = {
  title: "Saudi/Riyal Symbol",
  component: SaudiRiyal,
  parameters: {
    docs: {
      description: {
        component:
          "The official Saudi Riyal symbol (introduced 2024) drawn as a font-independent SVG glyph. It inherits `currentColor` and sizes to the surrounding text (`1em`) by default, so it renders identically everywhere regardless of font coverage of U+20C1. Use it instead of `$` anywhere a currency mark is shown.",
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof SaudiRiyal>;

export const Playground: Story = {
  args: { size: 64, title: "Saudi Riyal" },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 24, alignItems: "flex-end" }}>
      {[16, 24, 32, 48, 64, 96].map((s) => (
        <div key={s} style={{ display: "grid", justifyItems: "center", gap: 8 }}>
          <SaudiRiyal size={s} title="Saudi Riyal" />
          <code style={{ fontSize: 12, color: "var(--text-muted)" }}>{s}px</code>
        </div>
      ))}
    </div>
  ),
};

export const InlineWithText: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 12, fontSize: 18 }}>
      <p>
        Total due: 3,450 <SaudiRiyal /> this month.
      </p>
      <p style={{ fontWeight: 700, fontSize: 28 }}>
        12,400 <SaudiRiyal />
      </p>
      <p style={{ fontSize: 13, color: "var(--text-muted)" }}>
        Small print — 8.50 <SaudiRiyal /> processing fee.
      </p>
    </div>
  ),
};

export const InheritsColor: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 24, alignItems: "center", fontSize: 40 }}>
      <span style={{ color: "var(--text)" }}>
        <SaudiRiyal />
      </span>
      <span style={{ color: "var(--brand, #16a34a)" }}>
        <SaudiRiyal />
      </span>
      <span style={{ color: "var(--danger, #dc2626)" }}>
        <SaudiRiyal />
      </span>
      <span style={{ color: "var(--text-muted)" }}>
        <SaudiRiyal />
      </span>
    </div>
  ),
};

export const Arabic: Story = {
  globals: { direction: "rtl" },
  render: () => (
    <div style={{ display: "grid", gap: 12, fontSize: 20 }}>
      <p>
        الإجمالي: ٣٬٤٥٠ <SaudiRiyal /> لهذا الشهر.
      </p>
      <p style={{ fontWeight: 700, fontSize: 28 }}>
        ١٢٬٤٠٠ <SaudiRiyal />
      </p>
    </div>
  ),
};
