"use client";

import * as React from "react";
import { useUI } from "../../providers";
import { CodeBlock } from "@/components/code-block";
import { Preview } from "@/components/preview";

const SWATCHES = [
  "--brand-primary",
  "--brand-accent",
  "--surface-card",
  "--surface-sunken",
  "--text-strong",
  "--text-muted",
  "--border-default",
  "--success-solid",
  "--warning-solid",
  "--danger-solid",
];

export default function Theming() {
  const { dir } = useUI();
  const ar = dir === "rtl";
  return (
    <>
      <h1>{ar ? "السمات ووحدات التصميم" : "Theming & tokens"}</h1>
      <p>
        {ar
          ? "كل الألوان والمسافات والخطوط مصدرها خصائص CSS مخصّصة. المكوّنات لا تعرف سوى الأسماء الدلالية، فأي تغيير في السمة أو أي تحديث للهوية ينعكس عليها كلها دفعة واحدة."
          : "Every color, space, and font comes from CSS custom properties. Components consume semantic aliases only, so any theme change or rebrand flows through them."}
      </p>

      <h2>{ar ? "الوضع الفاتح والداكن" : "Light & dark"}</h2>
      <p>
        {ar
          ? "الوضع الفاتح هو الافتراضي في :root، والوضع الداكن يعمل بمجرّد ضبط [data-theme=\"dark\"]. لا حاجة لإعادة البناء."
          : "Light is the :root default; dark is enabled via [data-theme=\"dark\"]. No rebuild required."}
      </p>
      <CodeBlock lang="css" code={`/* light is the default */
:root { --surface-card: #ffffff; }

/* dark overrides */
:root[data-theme="dark"] { --surface-card: #14161f; }`} />

      <h2>{ar ? "لوحة الألوان الدلالية" : "Semantic palette"}</h2>
      <Preview title={ar ? "تتغيّر تلقائياً مع السمة الحالية" : "Follows the current theme"}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px,1fr))", gap: 12, width: "100%" }}>
          {SWATCHES.map((v) => (
            <div key={v} style={{ border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-md)", overflow: "hidden", background: "var(--surface-card)" }}>
              <div style={{ height: 44, background: `var(${v})` }} />
              <code style={{ display: "block", fontSize: 11, padding: "6px 8px", color: "var(--text-muted)" }}>{v}</code>
            </div>
          ))}
        </div>
      </Preview>

      <h2>{ar ? "استخدامها في الكود" : "Consume in code"}</h2>
      <CodeBlock lang="css" code={`.my-card {
  background: var(--surface-card);
  color: var(--text-strong);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  padding: var(--space-5);
}`} />
      <p>
        {ar
          ? "اعتمد على الأسماء الدلالية مثل surface-card و text-strong، ولا تستعمل درجات الألوان الخام مباشرة، حتى يبقى كل شيء منسجماً عبر مختلف السمات."
          : "Use semantic aliases (surface-card, text-strong), never raw ramp steps, so everything stays consistent across themes."}
      </p>
    </>
  );
}
