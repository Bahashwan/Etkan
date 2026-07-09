"use client";

import * as React from "react";
import { useUI } from "../../providers";
import { FrameworkTabs } from "@/components/framework-tabs";
import { CodeBlock } from "@/components/code-block";
import { WcLive } from "@/components/wc-live";
import { WcOverlays } from "@/components/wc-overlays";

export default function FrameworksDocs() {
  const { dir } = useUI();
  const ar = dir === "rtl";

  return (
    <>
      <h1>{ar ? "أي إطار — مكوّنات ويب" : "Any framework — Web Components"}</h1>
      <p>
        {ar
          ? "تمنحك حزمة @backdoor_est/etkan-ui-elements مكوّنات اتقان نفسها في هيئة عناصر ويب قياسية (Web Components). تعمل كما هي في Angular وVue وSvelte وصفحات HTML العادية — بل وحتى في React."
          : "The @backdoor_est/etkan-ui-elements package gives you the same ETKAN components as standard Web Components. They work as-is in Angular, Vue, Svelte, plain HTML — and React too."}
      </p>

      <h2>{ar ? "معاينة حيّة" : "Live preview"}</h2>
      <p>
        {ar
          ? "العناصر الظاهرة بالأسفل هي الحزمة المنشورة نفسها وهي تعمل داخل هذه الصفحة. جرّب تبديل اللغة والمظهر من الأعلى."
          : "The elements below are the published package running inside this page. Flip language and theme up top."}
      </p>
      <WcLive />

      <h2>{ar ? "طبقات عائمة" : "Overlays"}</h2>
      <p>
        {ar
          ? "نوافذ حوار، وتنبيهات، وقوائم، وتلميحات، وتبويبات، وجداول، وقوائم اختيار — جميعها عناصر ويب. جرّبها:"
          : "Dialogs, toasts, menus, tooltips, tabs, tables, and selects — all Web Components. Try them:"}
      </p>
      <WcOverlays />
      <CodeBlock
        lang="html"
        code={`<!-- Dialog (uses the native <dialog> for backdrop + focus) -->
<etkan-button onclick="dlg.open = true">Open</etkan-button>
<etkan-dialog id="dlg" heading="Delete campaign?" description="This can't be undone.">
  <p>The campaign will be permanently removed.</p>
  <etkan-button slot="footer" variant="danger">Delete</etkan-button>
</etkan-dialog>

<!-- Tooltip · Menu · Tabs -->
<etkan-tooltip content="Copy"><etkan-button>Hover</etkan-button></etkan-tooltip>

<etkan-tabs value="profile">
  <div label="Profile" value="profile">…</div>
  <div label="Billing" value="billing">…</div>
</etkan-tabs>

<!-- Data-driven: set properties in JS -->
<etkan-select id="sel" label="City"></etkan-select>
<etkan-table id="tbl"></etkan-table>
<script>
  sel.options = [{ value: "ry", label: "Riyadh" }];
  tbl.columns = [{ key: "id", header: "Invoice" }];
  tbl.data = [{ id: "INV-1042" }];
  menu.items = [{ label: "Edit" }, { divider: true }, { label: "Delete", danger: true }];
</script>`}
      />

      <h2>{ar ? "التثبيت في كل إطار" : "Install per framework"}</h2>
      <FrameworkTabs />

      <h2>{ar ? "أشرطة التنقّل والأشرطة الجانبية" : "Navbars & sidebars"}</h2>
      <p>
        {ar
          ? "تخطيط جاهز عبر الفتحات (slots) — ينتقل تلقائياً إلى الجهة الصحيحة عند استخدام العربية."
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

      <h2>{ar ? "حركات جاهزة للاستخدام المباشر" : "Motion as drop-in elements"}</h2>
      <p>
        {ar
          ? "الحركات نفسها المستخدمة في هذا الموقع، متاحة كعناصر تراعي إعداد prefers-reduced-motion."
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
          ? "تأتي الأنماط من متغيّرات التصميم في CSS، وهي تتخطّى حدود الـ shadow DOM — لذا حمّل @backdoor_est/etkan-ui-tokens مرّة واحدة في صفحتك."
          : "Styling comes from the design tokens (CSS custom properties), which pierce the shadow DOM — so load @backdoor_est/etkan-ui-tokens once on your page."}
      </p>
    </>
  );
}
