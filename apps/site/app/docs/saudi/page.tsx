"use client";

import * as React from "react";
import {
  SaudiRiyal,
  formatSAR,
  formatHijri,
  toArabicDigits,
} from "@backdoor_est/etkan-ui-react";
import { useUI } from "../../providers";
import { CodeBlock } from "@/components/code-block";
import { Preview } from "@/components/preview";

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", gap: 16, padding: "10px 0", borderBlockEnd: "1px solid var(--border-subtle)" }}>
      <code style={{ color: "var(--text-muted)" }}>{label}</code>
      <strong style={{ color: "var(--text-strong)" }}>{value}</strong>
    </div>
  );
}

export default function SaudiDocs() {
  const { dir } = useUI();
  const ar = dir === "rtl";
  const now = new Date(2025, 6, 9); // fixed date for stable rendering

  return (
    <>
      <h1>{ar ? "السعودية أولاً" : "Saudi-first"}</h1>
      <p>
        {ar
          ? "أدوات تعتمد على واجهات Intl المدمجة في المنصّة، دون أي مكتبات خارجية للترجمة أو التواريخ: رمز الريال الرسمي، وتقويم أم القرى، والأرقام العربية الهندية."
          : "Utilities built on the platform Intl APIs — with zero i18n or date libraries: the official riyal symbol, Umm al-Qura dates, and Arabic-Indic digits."}
      </p>

      <h2>{ar ? "رمز الريال" : "The riyal symbol"}</h2>
      <Preview
        title={ar ? "يأخذ لونه وحجمه من النص المحيط به" : "Inherits text color & size"}
        code={`import { SaudiRiyal } from "@backdoor_est/etkan-ui-react";

<span>1,250.50 <SaudiRiyal /></span>`}
      >
        <div style={{ display: "flex", gap: 24, alignItems: "center", fontSize: 28, color: "var(--text-strong)" }}>
          <span>1,250.50 <SaudiRiyal /></span>
          <span style={{ color: "var(--brand-primary)" }}><SaudiRiyal /></span>
          <span style={{ fontSize: 44 }}><SaudiRiyal /></span>
        </div>
      </Preview>

      <h2>{ar ? "التنسيق" : "Formatting"}</h2>
      <Preview title={ar ? "دوال جاهزة مبنية على Intl" : "Ready-made Intl helpers"}>
        <div style={{ width: "min(460px,100%)" }}>
          <Row label='formatSAR(1250.5)' value={formatSAR(1250.5)} />
          <Row label='formatSAR(1250.5, {locale:"en-SA"})' value={formatSAR(1250.5, { locale: "en-SA" })} />
          <Row label="formatHijri(date)" value={formatHijri(now)} />
          <Row label='toArabicDigits("2025")' value={toArabicDigits("2025")} />
        </div>
      </Preview>

      <CodeBlock
        code={`import { formatSAR, formatHijri, toArabicDigits } from "@backdoor_est/etkan-ui-react";

formatSAR(1250.5);                        // "${formatSAR(1250.5)}"
formatSAR(1250.5, { locale: "en-SA" });   // "${formatSAR(1250.5, { locale: "en-SA" })}"
formatHijri(new Date());                  // Umm al-Qura date
toArabicDigits("2025");                   // "${toArabicDigits("2025")}"`}
      />
    </>
  );
}
