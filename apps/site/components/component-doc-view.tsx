"use client";

import * as React from "react";
import Link from "next/link";
import type { ComponentDoc } from "@/content/component-doc";
import { useUI } from "@/app/providers";
import { CodeBlock } from "./code-block";
import { ComponentDemo } from "./component-demos";
import { ArrowIcon } from "./icons";

export function ComponentDocView({ doc }: { doc: ComponentDoc }) {
  const { dir } = useUI();
  const ar = dir === "rtl";
  const t = (b: { en: string; ar: string }) => (ar ? b.ar : b.en);

  return (
    <>
      <Link href="/components" className="muted" style={{ fontSize: "var(--text-sm)", display: "inline-flex", alignItems: "center", gap: 6 }}>
        <ArrowIcon width={15} height={15} style={{ transform: ar ? "none" : "scaleX(-1)" }} />
        {ar ? "كل المكوّنات" : "All components"}
      </Link>

      <h1 style={{ marginBlockStart: "var(--space-3)" }}>{t(doc.title)}</h1>
      <p style={{ fontSize: "var(--text-lg)" }}>{t(doc.description)}</p>
      {doc.tag && (
        <p className="muted" style={{ fontSize: "var(--text-sm)" }}>
          {ar ? "الوسم كعنصر ويب:" : "Web Component tag:"} <code>&lt;{doc.tag}&gt;</code>
        </p>
      )}

      <h2>{ar ? "معاينة" : "Preview"}</h2>
      <div className="preview">
        <div className="preview-stage">
          <ComponentDemo slug={doc.slug} />
        </div>
      </div>

      <h2>{ar ? "الاستخدام" : "Usage"}</h2>
      <CodeBlock code={doc.code} lang="tsx" />

      <h2>{ar ? "متى تستخدمه" : "When to use it"}</h2>
      <p>{t(doc.when)}</p>

      <h2>{ar ? "السلوك والحركة" : "Behavior & animation"}</h2>
      <p>{t(doc.behavior)}</p>

      <h2>{ar ? "الخصائص" : "Props"}</h2>
      <div style={{ overflowX: "auto" }}>
        <table style={{ inlineSize: "100%", borderCollapse: "collapse", fontSize: "var(--text-sm)" }}>
          <thead>
            <tr>
              {[
                ar ? "الخاصية" : "Prop",
                ar ? "النوع" : "Type",
                ar ? "الافتراضي" : "Default",
                ar ? "الوصف" : "Description",
              ].map((h) => (
                <th
                  key={h}
                  style={{ textAlign: "start", padding: "8px 10px", borderBlockEnd: "1px solid var(--border-default)", color: "var(--text-muted)", fontSize: "var(--text-xs)", textTransform: "uppercase", letterSpacing: "0.04em", whiteSpace: "nowrap" }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {doc.props.map((p) => (
              <tr key={p.name}>
                <td style={{ padding: "10px", borderBlockEnd: "1px solid var(--border-subtle)", verticalAlign: "top" }}>
                  <code>{p.name}</code>
                  {p.required && <span style={{ color: "var(--danger-solid)" }}> *</span>}
                </td>
                <td style={{ padding: "10px", borderBlockEnd: "1px solid var(--border-subtle)", verticalAlign: "top" }} dir="ltr">
                  <code style={{ color: "var(--brand-primary-soft-text)" }}>{p.type}</code>
                </td>
                <td style={{ padding: "10px", borderBlockEnd: "1px solid var(--border-subtle)", verticalAlign: "top" }} dir="ltr">
                  {p.default ? <code>{p.default}</code> : <span className="muted">—</span>}
                </td>
                <td style={{ padding: "10px", borderBlockEnd: "1px solid var(--border-subtle)", verticalAlign: "top", color: "var(--text-body)" }}>
                  {t(p.desc)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
