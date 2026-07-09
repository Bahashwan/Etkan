"use client";

import * as React from "react";
import { Terminal } from "./terminal";
import { CodeBlock } from "./code-block";

interface Framework {
  id: string;
  label: string;
  install: string[];
  code: string;
  note?: string;
}

const FRAMEWORKS: Framework[] = [
  {
    id: "react",
    label: "React / Next.js",
    install: ["npm install @backdoor_est/etkan-ui-react @backdoor_est/etkan-ui-tokens"],
    code: `import "@backdoor_est/etkan-ui-tokens";        // once, at your app root
import { Button, Input } from "@backdoor_est/etkan-ui-react";

export default function App() {
  return (
    <>
      <Input label="Email" placeholder="you@company.com" />
      <Button variant="primary">Start free</Button>
    </>
  );
}`,
  },
  {
    id: "vue",
    label: "Vue",
    install: ["npm install @backdoor_est/etkan-ui-tokens"],
    note: "The React components are React-only, but the design tokens are pure CSS — style your own Vue components with ETKAN's variables.",
    code: `// main.ts
import "@backdoor_est/etkan-ui-tokens";

<!-- Button.vue -->
<template>
  <button class="etkan-btn"><slot /></button>
</template>

<style scoped>
.etkan-btn {
  background: var(--brand-primary);
  color: var(--text-on-primary);
  padding: 0 var(--space-4);
  height: var(--control-height-md);
  border: none;
  border-radius: var(--radius-md);
  font-family: var(--font-sans);
}
</style>`,
  },
  {
    id: "angular",
    label: "Angular",
    install: ["npm install @backdoor_est/etkan-ui-tokens"],
    note: "Import the tokens once in your global styles, then build components against the CSS variables.",
    code: `/* styles.css (angular.json → styles) */
@import "@backdoor_est/etkan-ui-tokens";

/* button.component.css */
.etkan-btn {
  background: var(--brand-primary);
  color: var(--text-on-primary);
  height: var(--control-height-md);
  padding-inline: var(--space-4);
  border-radius: var(--radius-md);
  border: none;
}`,
  },
  {
    id: "svelte",
    label: "Svelte",
    install: ["npm install @backdoor_est/etkan-ui-tokens"],
    note: "Framework-agnostic tokens work the same in Svelte.",
    code: `<!-- +layout.svelte -->
<script>import "@backdoor_est/etkan-ui-tokens";</script>

<button class="etkan-btn">Start free</button>

<style>
  .etkan-btn {
    background: var(--brand-primary);
    color: var(--text-on-primary);
    height: var(--control-height-md);
    padding-inline: var(--space-4);
    border-radius: var(--radius-md);
    border: none;
  }
</style>`,
  },
  {
    id: "html",
    label: "Plain HTML",
    install: ["npm install @backdoor_est/etkan-ui-tokens"],
    note: "No build step? Link the CSS directly and set dir + data-theme on <html>.",
    code: `<!doctype html>
<html lang="en" dir="ltr" data-theme="light">
  <head>
    <link rel="stylesheet" href="node_modules/@backdoor_est/etkan-ui-tokens/css/index.css" />
  </head>
  <body>
    <button style="
      background: var(--brand-primary);
      color: var(--text-on-primary);
      height: var(--control-height-md);
      padding-inline: var(--space-4);
      border: none; border-radius: var(--radius-md);">
      Start free
    </button>
  </body>
</html>`,
  },
];

export function FrameworkTabs() {
  const [active, setActive] = React.useState("react");
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
        <CodeBlock code={fw.code} lang={fw.id === "react" ? "tsx" : fw.id === "html" ? "html" : "js"} />
      </div>
    </div>
  );
}
