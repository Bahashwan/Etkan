"use client";

import * as React from "react";
import Link from "next/link";
import { useUI } from "../providers";
import { FrameworkTabs } from "@/components/framework-tabs";
import { CodeBlock } from "@/components/code-block";

export default function GettingStarted() {
  const { dir } = useUI();
  const ar = dir === "rtl";

  return (
    <>
      <h1>{ar ? "لنبدأ" : "Getting started"}</h1>
      <p>
        {ar
          ? "اتقان نظام تصميم لواجهات React يدعم العربية والإنجليزية معاً، بالوضعين الفاتح والداكن، وباتجاهي RTL وLTR. نسخة واحدة تكفي للاتجاهين، وتعتمد على وحدات تصميم مكتوبة بـ CSS صرف تعمل مع أي إطار."
          : "ETKAN UI is a bilingual (Arabic RTL / English LTR), light & dark design system for React. One build serves both directions, powered by pure-CSS design tokens that work with any framework."}
      </p>

      <h2>{ar ? "التثبيت والاستخدام" : "Install & use"}</h2>
      <p>
        {ar
          ? "اختر الإطار الذي تعمل به. مكوّنات React جاهزة للاستخدام مباشرة، ووحدات التصميم لا ترتبط بإطار بعينه."
          : "Pick your framework. The React components are ready to use, and the design tokens are framework-agnostic."}
      </p>
      <FrameworkTabs />

      <h2>{ar ? "الاتجاه والمظهر" : "Direction & theme"}</h2>
      <p>
        {ar
          ? "اضبط الاتجاه والمظهر مرّة واحدة على عنصر html، وستظهر كل المكوّنات بشكل سليم في الحالات الأربع جميعها."
          : "Set direction and theme once on the html element — every component renders correctly across all four states."}
      </p>
      <CodeBlock
        lang="html"
        code={`<html dir="rtl" data-theme="dark">
  <!-- dir:  "ltr" | "rtl"   ·   data-theme:  "light" | "dark" -->
</html>`}
      />
      <p>
        {ar
          ? "هذا الموقع نفسه يعمل بهذه الطريقة، فأزرار اللغة والمظهر في الأعلى لا تغيّر سوى خصائص عنصر html."
          : "This very site works that way — the language and theme buttons in the header only flip attributes on html."}
      </p>

      <h2>{ar ? "ماذا بعد؟" : "Next"}</h2>
      <ul>
        <li>
          <Link href="/docs/theming">{ar ? "المظاهر ووحدات التصميم" : "Theming & tokens"}</Link>
        </li>
        <li>
          <Link href="/docs/rtl">{ar ? "الاتجاه ودعم اللغتين" : "RTL & bilingual"}</Link>
        </li>
        <li>
          <Link href="/docs/saudi">{ar ? "أدوات تخدم السوق السعودي" : "Saudi-first utilities"}</Link>
        </li>
        <li>
          <Link href="/components">{ar ? "معرض المكوّنات" : "Component gallery"}</Link>
        </li>
      </ul>
    </>
  );
}
