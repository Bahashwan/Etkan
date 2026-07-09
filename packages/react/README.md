# @backdoor/etkan-ui-react

ETKAN UI — اتقان React components. Bilingual (Arabic RTL + English LTR), light/dark,
built on `@backdoor/etkan-ui-tokens`.

## Install

```sh
npm i @backdoor/etkan-ui-react @backdoor/etkan-ui-tokens
```

## Usage

```tsx
import "@backdoor/etkan-ui-tokens"; // once, in your app entry / root layout
import { Button } from "@backdoor/etkan-ui-react";

export default function App() {
  return <Button variant="primary">Start free</Button>;
}
```

Set direction and theme on `<html>` — one build serves all four states:

```html
<html dir="rtl" data-theme="dark">
```

- Works with React 18/19, Next.js (App Router — components ship with `"use client"`),
  Vite, Remix, etc. ESM + CJS + TypeScript types.
- Components use CSS logical properties only — never `left`/`right` — so RTL is free.
