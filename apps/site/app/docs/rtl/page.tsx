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
      <h1>{ar ? "الاتجاه ودعم اللغتين" : "RTL & bilingual"}</h1>
      <p>
        {ar
          ? "لا حاجة إلى نسخة خاصة بالعربية. تعتمد المكوّنات على خصائص CSS المنطقية فقط، فما إن تضبط dir=\"rtl\" حتى تنقلب الواجهة كلها من تلقاء نفسها."
          : "There is no separate Arabic build. Components use CSS logical properties only, so setting dir=\"rtl\" mirrors the entire UI automatically."}
      </p>

      <h2>{ar ? "خصائص منطقية لا ثابتة" : "Logical, not physical"}</h2>
      <CodeBlock lang="css" code={`/* ✗ never */
margin-left: 12px;  padding-right: 8px;  left: 0;

/* ✓ always — flips under RTL for free */
margin-inline-start: 12px;  padding-inline-end: 8px;  inset-inline-start: 0;`} />

      <h2>{ar ? "جرّبه" : "Try it"}</h2>
      <p>
        {ar
          ? "بدّل اللغة من زر «عربي/EN» في الأعلى، وستجد هذه الحقول تنقلب أمامك — حتى الأيقونات ذات الاتجاه تنعكس معها."
          : "Flip the language with the EN/عربي button in the header and watch these fields mirror — directional icons flip too."}
      </p>
      <Preview title={ar ? "المكوّنات نفسها، باتجاه واحد فعّال" : "Same components, one active direction"}>
        <div style={{ display: "grid", gap: "var(--space-4)", width: "min(380px,100%)" }}>
          <Input label={ar ? "الاسم الكامل" : "Full name"} placeholder={ar ? "محمد العتيبي" : "Mohammed"} />
          <Checkbox label={ar ? "أوافق على الشروط" : "I agree to the terms"} defaultChecked />
          <Button variant="primary" fullWidth>
            {ar ? "متابعة" : "Continue"}
          </Button>
        </div>
      </Preview>

      <h2>{ar ? "أيقونات ذات اتجاه" : "Directional icons"}</h2>
      <p>
        {ar
          ? "الأيقونات التي لها اتجاه (كالأسهم وأزرار الإرسال) تُضاف إليها فئة etkan-mirror حتى تنعكس مع تغيّر الاتجاه."
          : "Icons that carry a direction (arrows, send) take the etkan-mirror class so they flip with direction."}
      </p>
      <CodeBlock lang="tsx" code={`<ArrowIcon className="etkan-mirror" />`} />
    </>
  );
}
