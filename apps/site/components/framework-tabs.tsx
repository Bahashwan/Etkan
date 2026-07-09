"use client";

import * as React from "react";
import { Terminal } from "./terminal";
import { CodeBlock } from "./code-block";

interface Framework {
  id: string;
  label: string;
  install: string[];
  code: string;
  lang: string;
  note?: string;
}

const FRAMEWORKS: Framework[] = [
  {
    id: "html",
    label: "Plain HTML",
    install: ["# no build step — just two tags"],
    lang: "html",
    note: "The IIFE bundle registers every element and includes its dependency, so a single <script> is all you need.",
    code: `<!doctype html>
<html lang="ar" dir="rtl" data-theme="light">
  <head>
    <link rel="stylesheet"
      href="https://unpkg.com/@backdoor_est/etkan-ui-tokens/css/index.css" />
    <script
      src="https://unpkg.com/@backdoor_est/etkan-ui-elements/dist/index.global.js"></script>
  </head>
  <body>
    <etkan-button variant="primary">ابدأ</etkan-button>
    <etkan-input label="Email" placeholder="you@company.com"></etkan-input>
    <etkan-price amount="1,250.50"></etkan-price>
  </body>
</html>`,
  },
  {
    id: "vue",
    label: "Vue",
    install: ["npm install @backdoor_est/etkan-ui-elements @backdoor_est/etkan-ui-tokens"],
    lang: "ts",
    note: "Tell Vue that etkan-* tags are custom elements (vite.config → vue({ template: { compilerOptions: { isCustomElement: (t) => t.startsWith('etkan-') } } })).",
    code: `// main.ts
import "@backdoor_est/etkan-ui-tokens";
import "@backdoor_est/etkan-ui-elements";
import { createApp } from "vue";
import App from "./App.vue";
createApp(App).mount("#app");

<!-- App.vue -->
<template>
  <etkan-button variant="primary">حفظ</etkan-button>
  <etkan-switch label="Notifications" checked />
</template>`,
  },
  {
    id: "angular",
    label: "Angular",
    install: ["npm install @backdoor_est/etkan-ui-elements @backdoor_est/etkan-ui-tokens"],
    lang: "ts",
    note: "Add CUSTOM_ELEMENTS_SCHEMA to the component/module so Angular allows the etkan-* tags.",
    code: `// main.ts
import "@backdoor_est/etkan-ui-tokens";
import "@backdoor_est/etkan-ui-elements";

// app.component.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

@Component({
  selector: "app-root",
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <etkan-button variant="primary">حفظ</etkan-button>
    <etkan-input label="Email"></etkan-input>
  \`,
})
export class AppComponent {}`,
  },
  {
    id: "svelte",
    label: "Svelte",
    install: ["npm install @backdoor_est/etkan-ui-elements @backdoor_est/etkan-ui-tokens"],
    lang: "svelte",
    note: "Svelte supports custom elements out of the box — no config needed.",
    code: `<script>
  import "@backdoor_est/etkan-ui-tokens";
  import "@backdoor_est/etkan-ui-elements";
</script>

<etkan-button variant="primary">حفظ</etkan-button>
<etkan-badge tone="success" variant="soft">Paid</etkan-badge>`,
  },
  {
    id: "react",
    label: "React",
    install: ["npm install @backdoor_est/etkan-ui-elements @backdoor_est/etkan-ui-tokens"],
    lang: "tsx",
    note: "React 19 handles custom elements natively. (Prefer @backdoor_est/etkan-ui-react for idiomatic React components.)",
    code: `import "@backdoor_est/etkan-ui-tokens";
import "@backdoor_est/etkan-ui-elements";

export default function App() {
  return (
    <>
      <etkan-button variant="primary">Save</etkan-button>
      <etkan-input label="Email" placeholder="you@company.com" />
    </>
  );
}`,
  },
];

export function FrameworkTabs() {
  const [active, setActive] = React.useState("html");
  const fw = FRAMEWORKS.find((f) => f.id === active)!;

  return (
    <div>
      <div className="tabs-row" role="tablist" aria-label="Framework">
        {FRAMEWORKS.map((f) => (
          <button
            key={f.id}
            role="tab"
            aria-selected={active === f.id}
            className="tab-chip"
            data-active={active === f.id}
            onClick={() => setActive(f.id)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div style={{ display: "grid", gap: "var(--space-3)" }}>
        <Terminal commands={fw.install} />
        {fw.note && (
          <p className="muted" style={{ fontSize: "var(--text-sm)", margin: 0 }}>
            {fw.note}
          </p>
        )}
        <CodeBlock code={fw.code} lang={fw.lang} />
      </div>
    </div>
  );
}
