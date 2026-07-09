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
      <h1>{ar ? "كيف تبدأ" : "Getting started"}</h1>
      <p>
        {ar
          ? "اتقان نظام تصميم ثنائي اللغة (عربي RTL / إنجليزي LTR)، فاتح وداكن، لواجهات React. نسخة واحدة تخدم الاتجاهين، مدعومة بوحدات تصميم CSS خالصة تعمل مع أي إطار."
          : "ETKAN UI is a bilingual (Arabic RTL / English LTR), light & dark design system for React. One build serves both directions, powered by pure-CSS design tokens that work with any framework."}
      </p>

      <h2>{ar ? "التثبيت والاستخدام" : "Install & use"}</h2>
      <p>
        {ar
          ? "اختر إطارك. مكوّنات React جاهزة، ووحدات التصميم مستقلّة عن أي إطار."
          : "Pick your framework. The React components are ready to use, and the design tokens are framework-agnostic."}
      </p>
      <FrameworkTabs />

      <h2>{ar ? "الاتجاه والسمة" : "Direction & theme"}</h2>
      <p>
        {ar
          ? "اضبط الاتجاه والسمة مرّة واحدة على عنصر html، وستُعرض كل المكوّنات بشكل صحيح في الحالات الأربع."
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
          ? "هذا الموقع نفسه مبني بهذه الطريقة — أزرار اللغة والسمة في الأعلى تغيّر سمة html فقط."
          : "This very site works that way — the language and theme buttons in the header only flip attributes on html."}
      </p>

      <h2>{ar ? "الخطوة التالية" : "Next"}</h2>
      <ul>
        <li>
          <Link href="/docs/theming">{ar ? "السمات ووحدات التصميم" : "Theming & tokens"}</Link>
        </li>
        <li>
          <Link href="/docs/rtl">{ar ? "الاتجاه وثنائية اللغة" : "RTL & bilingual"}</Link>
        </li>
        <li>
          <Link href="/docs/saudi">{ar ? "أدوات السعودية أولاً" : "Saudi-first utilities"}</Link>
        </li>
        <li>
          <Link href="/components">{ar ? "معرض المكوّنات" : "Component gallery"}</Link>
        </li>
      </ul>
    </>
  );
}
