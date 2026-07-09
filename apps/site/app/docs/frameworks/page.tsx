"use client";

import * as React from "react";
import { useUI } from "../../providers";
import { FrameworkTabs } from "@/components/framework-tabs";
import { CodeBlock } from "@/components/code-block";
import { WcLive } from "@/components/wc-live";

export default function FrameworksDocs() {
  const { dir } = useUI();
  const ar = dir === "rtl";

  return (
    <>
      <h1>{ar ? "أي إطار — مكوّنات ويب" : "Any framework — Web Components"}</h1>
      <p>
        {ar
          ? "الحزمة @backdoor_est/etkan-ui-elements تعطيك نفس مكوّنات اتقان كعناصر ويب قياسية (Web Components). تعمل كما هي في Angular و Vue و Svelte و HTML عادي — وحتى React."
          : "The @backdoor_est/etkan-ui-elements package gives you the same ETKAN components as standard Web Components. They work as-is in Angular, Vue, Svelte, plain HTML — and React too."}
      </p>

      <h2>{ar ? "معاينة حيّة" : "Live preview"}</h2>
      <p>
        {ar
          ? "العناصر تحت هي الحزمة المنشورة نفسها تعمل داخل هذه الصفحة. بدّل اللغة والسمة من الأعلى."
          : "The elements below are the published package running inside this page. Flip language and theme up top."}
      </p>
      <WcLive />

      <h2>{ar ? "التثبيت لكل إطار" : "Install per framework"}</h2>
      <FrameworkTabs />

      <h2>{ar ? "أشرطة التنقّل والأشرطة الجانبية" : "Navbars & sidebars"}</h2>
      <p>
        {ar
          ? "حلول تخطيط جاهزة عبر الفتحات (slots) — تنقلب للجهة الصحيحة تلقائياً في العربية."
          : "Ready-made layout via slots — they flip to the correct side automatically in Arabic."}
      </p>
      <CodeBlock
        lang="html"
        code={`<etkan-navbar>
  <strong slot="brand">ETKAN</strong>
  <a href="/docs">Docs</a>
  <a href="/components">Components</a>
  <etkan-button slot="actions" size="sm" variant="primary">Sign in</etkan-button>
</etkan-navbar>

<etkan-sidebar width="240">
  <strong slot="header">ETKAN</strong>
  <a href="#" aria-current="page">Overview</a>
  <a href="#">Campaigns</a>
  <a href="#">Contacts</a>
  <etkan-avatar slot="footer" name="Mohanad Bahashwan"></etkan-avatar>
</etkan-sidebar>`}
      />

      <h2>{ar ? "الحركة كعناصر جاهزة" : "Motion as drop-in elements"}</h2>
      <p>
        {ar
          ? "نفس الحركات المستخدمة في هذا الموقع، متوفّرة كعناصر تحترم prefers-reduced-motion."
          : "The same animations used across this site, available as elements that honor prefers-reduced-motion."}
      </p>
      <CodeBlock
        lang="html"
        code={`<!-- fade + rise in when scrolled into view -->
<etkan-reveal delay="80"><h2>ابدأ بإتقان</h2></etkan-reveal>

<!-- animated number -->
<etkan-count-up to="48209"></etkan-count-up>

<!-- seamless, RTL-aware marquee -->
<etkan-marquee speed="30" gap="12">
  <span>Angular</span><span>Vue</span><span>Svelte</span><span>HTML</span>
</etkan-marquee>

<!-- drifting gradient backdrop -->
<etkan-aurora style="min-height:320px; border-radius:16px">
  <!-- hero content sits above -->
</etkan-aurora>

<!-- gentle float + scroll parallax -->
<etkan-float rotate="-3"><etkan-card>…</etkan-card></etkan-float>
<etkan-parallax speed="0.15"><img src="…" /></etkan-parallax>`}
      />

      <h2>{ar ? "ملاحظة" : "Note"}</h2>
      <p>
        {ar
          ? "الأنماط تأتي من وحدات التصميم (CSS) التي تعبر حدود الـ shadow DOM — فحمّل @backdoor_est/etkan-ui-tokens مرّة واحدة في صفحتك."
          : "Styling comes from the design tokens (CSS custom properties), which pierce the shadow DOM — so load @backdoor_est/etkan-ui-tokens once on your page."}
      </p>
    </>
  );
}
