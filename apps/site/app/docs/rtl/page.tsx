"use client";

import * as React from "react";
import { Input, Button, Checkbox } from "@backdoor_est/etkan-ui-react";
import { useUI } from "../../providers";
import { CodeBlock } from "@/components/code-block";
import { Preview } from "@/components/preview";

export default function RtlDocs() {
  const { dir } = useUI();
  const ar = dir === "rtl";
  return (
    <>
      <h1>{ar ? "الاتجاه وثنائية اللغة" : "RTL & bilingual"}</h1>
      <p>
        {ar
          ? "لا يوجد بناء منفصل للعربية. تستخدم المكوّنات الخصائص المنطقية في CSS فقط، فبمجرّد ضبط dir=\"rtl\" تنقلب الواجهة بأكملها تلقائياً."
          : "There is no separate Arabic build. Components use CSS logical properties only, so setting dir=\"rtl\" mirrors the entire UI automatically."}
      </p>

      <h2>{ar ? "منطقي لا فيزيائي" : "Logical, not physical"}</h2>
      <CodeBlock lang="css" code={`/* ✗ never */
margin-left: 12px;  padding-right: 8px;  left: 0;

/* ✓ always — flips under RTL for free */
margin-inline-start: 12px;  padding-inline-end: 8px;  inset-inline-start: 0;`} />

      <h2>{ar ? "جرّبه" : "Try it"}</h2>
      <p>
        {ar
          ? "بدّل اللغة من زر «عربي/EN» في الأعلى وشاهد هذه الحقول تنقلب — الأيقونات الاتجاهية تنعكس أيضاً."
          : "Flip the language with the EN/عربي button in the header and watch these fields mirror — directional icons flip too."}
      </p>
      <Preview title={ar ? "نفس المكوّنات، اتجاه واحد نشط" : "Same components, one active direction"}>
        <div style={{ display: "grid", gap: "var(--space-4)", width: "min(380px,100%)" }}>
          <Input label={ar ? "الاسم الكامل" : "Full name"} placeholder={ar ? "محمد العتيبي" : "Mohammed"} />
          <Checkbox label={ar ? "أوافق على الشروط" : "I agree to the terms"} defaultChecked />
          <Button variant="primary" fullWidth>
            {ar ? "متابعة" : "Continue"}
          </Button>
        </div>
      </Preview>

      <h2>{ar ? "أيقونات اتجاهية" : "Directional icons"}</h2>
      <p>
        {ar
          ? "الأيقونات التي تحمل اتجاهاً (الأسهم، أزرار الإرسال) تأخذ الصنف etkan-mirror لتنعكس مع الاتجاه."
          : "Icons that carry a direction (arrows, send) take the etkan-mirror class so they flip with direction."}
      </p>
      <CodeBlock lang="tsx" code={`<ArrowIcon className="etkan-mirror" />`} />
    </>
  );
}
