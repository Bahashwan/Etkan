# @backdoor/etkan-ui-tokens

ETKAN UI — اتقان design tokens as CSS custom properties. **Framework-agnostic** — this package
is plain CSS and works identically in React, Next.js, Vue, Angular, Svelte, or a static page.

## Usage

```js
// with a bundler (Vite, Next.js, webpack, Angular CLI, Nuxt…)
import "@backdoor/etkan-ui-tokens";
```

Then control language direction and theme on `<html>`:

```html
<html dir="rtl" data-theme="dark">
```

- `dir="ltr" | "rtl"` — one build serves both directions (components use logical properties).
- `data-theme="light" | "dark"` — light is the `:root` default.

## What's inside

`fonts` → `colors` → `typography` → `spacing` → `radius` → `shadows` → `motion` → `base`
(reset + RTL foundation, loaded last). Consume **semantic aliases** (`--surface-card`,
`--text-strong`, `--brand-primary`, `--border-default`, …), never raw ramp steps.
