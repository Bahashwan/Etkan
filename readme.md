<div align="center">

# ETKAN UI · اتقان

**A bilingual (Arabic RTL / English LTR), light &amp; dark React design system — built for Saudi products.**

[![npm](https://img.shields.io/npm/v/@backdoor_est/etkan-ui-react.svg?label=%40backdoor_est%2Fetkan-ui-react)](https://www.npmjs.com/package/@backdoor_est/etkan-ui-react)
[![license](https://img.shields.io/badge/license-MIT-black.svg)](./LICENSE)
[![types](https://img.shields.io/badge/types-included-blue.svg)](#)

**English** · [العربية](#العربية)

</div>

---

*اتقان* (**itqan**) means *mastery — doing things with excellence*. ETKAN UI is a from-scratch
component kit with no UI-framework dependency: every visual comes from its own design tokens and
hand-built primitives. One build serves Arabic and English, light and dark, at the same time.

## Highlights

- **Truly bilingual.** Components use CSS *logical properties* only (`padding-inline`,
  `inset-inline-start`) — never `left`/`right` — so switching `dir` flips the entire UI with no
  extra code. Tested in both directions.
- **Light &amp; dark.** A single build; the theme is a `data-theme` attribute on `<html>`.
- **Saudi-first.** The official Saudi Riyal symbol, Hijri (Umm al-Qura) dates, Arabic-Indic
  digits, and `ar-SA` number/currency formatting — all via the platform `Intl` APIs, **zero i18n
  or date libraries**.
- **No runtime dependencies.** React is the only peer dependency. Tokens are pure CSS.
- **Ships everything.** ESM + CJS + TypeScript types, and `"use client"` for the Next.js App
  Router.
- **Accessible.** Visible `:focus-visible` states and axe-clean components in both directions.

## Packages

| Package | What it is |
| --- | --- |
| [`@backdoor_est/etkan-ui-tokens`](./packages/tokens) | Design tokens as CSS custom properties. Framework-agnostic — works in React, Vue, Angular, Svelte, or a plain HTML page. |
| [`@backdoor_est/etkan-ui-react`](./packages/react) | The React component library (18 components + Saudi-first utilities). |

## Install

```sh
npm install @backdoor_est/etkan-ui-react @backdoor_est/etkan-ui-tokens
```

Requires React 18 or 19.

## Quick start

```tsx
import "@backdoor_est/etkan-ui-tokens";           // once, at your app root
import { Button, Input } from "@backdoor_est/etkan-ui-react";

export default function App() {
  return (
    <form>
      <Input label="Email" placeholder="you@company.com" />
      <Button variant="primary">Start free</Button>
    </form>
  );
}
```

Set the language direction and theme once, on `<html>` — the same components render correctly in
all four states:

```html
<html dir="rtl" data-theme="dark">   <!-- dir: "ltr" | "rtl"  ·  data-theme: "light" | "dark" -->
```

## Saudi-first utilities

```tsx
import { SaudiRiyal, formatSAR, formatHijri, toArabicDigits } from "@backdoor_est/etkan-ui-react";

<span>1,250.50 <SaudiRiyal /></span>            // official riyal glyph, inherits text color & size

formatSAR(1250.5);                              // "١٬٢٥٠٫٥٠ ر.س.‏"   (ar-SA)
formatSAR(1250.5, { locale: "en-SA" });         // "SAR 1,250.50"
formatHijri(new Date());                        // "٢٤ محرم ١٤٤٧ هـ"  (Umm al-Qura)
toArabicDigits("2025");                         // "٢٠٢٥"
```

## Components

- **Forms** — Button · IconButton · Input · Textarea · Select · Checkbox · Radio · Switch
- **Data** — Card · Badge · Tag · Table · Pagination
- **Feedback** — Tooltip · Toast · Dialog
- **Navigation** — Tabs · Menu

## Design principles

- **Border-led, not shadow-heavy.** Structure comes from a 1px hairline on a card surface; shadows
  are reserved for menus, dialogs, and hover.
- **One accent, used sparingly.** Electric indigo drives action and focus; a warm coral accent is
  the spark.
- **IBM Plex** type throughout — Arabic rides a taller line-height and never gets letter-spacing.
- **A 4px spacing grid** and subtle, precise corner radii.
- **Motion is fast and purposeful** (140–200ms, ease-out) and respects `prefers-reduced-motion`.

## Documentation

Every component has a Storybook story in English and Arabic × light and dark. Run it locally:

```sh
npm install
npm run docs        # opens Storybook at http://localhost:6006
```

## Repository

A workspaces monorepo:

```
packages/tokens   →  @backdoor_est/etkan-ui-tokens   (CSS custom properties)
packages/react    →  @backdoor_est/etkan-ui-react     (components + Saudi utilities)
apps/docs         →  Storybook (EN/AR × light/dark)
tokens/           →  the canonical token source
```

## License

[MIT](./LICENSE) © Mohanad Bahashwan

<br />

---

<div align="center" dir="rtl">

# العربية

**نظام تصميم لواجهات React — ثنائي اللغة (عربي من اليمين / إنجليزي من اليسار)، فاتح وداكن، مبني لمنتجات سعودية.**

[English](#etkan-ui--اتقان) · **العربية**

</div>

<div dir="rtl">

**اتقان** تعني إتقان العمل وإحسانه. «ETKAN UI» مجموعة مكوّنات مبنية من الصفر دون الاعتماد على أي
مكتبة واجهات خارجية؛ كل عنصر بصري مصدره وحدات التصميم (Tokens) والمكوّنات الأساسية الخاصة بالنظام.
نسخة واحدة تخدم العربية والإنجليزية، والوضع الفاتح والداكن، في آنٍ واحد.

## المميّزات

- **ثنائي اللغة فعلاً.** تعتمد المكوّنات على الخصائص المنطقية في CSS فقط
  (`padding-inline`، `inset-inline-start`) ولا تستخدم `left`/`right` إطلاقاً، فيكفي تغيير `dir`
  لتنقلب الواجهة بالكامل دون أي كود إضافي. ومُختبَرة في الاتجاهين.
- **فاتح وداكن.** نسخة واحدة؛ السمة تُضبط عبر السمة `data-theme` على عنصر `<html>`.
- **السعودية أولاً.** رمز الريال السعودي الرسمي، والتواريخ الهجرية (أم القرى)، والأرقام العربية
  الهندية، وتنسيق الأرقام والعملة بصيغة `ar-SA` — جميعها عبر واجهات `Intl` في المنصّة، **دون أي
  مكتبات ترجمة أو تواريخ**.
- **بلا اعتماديات وقت التشغيل.** React هي الاعتمادية النظيرة الوحيدة، ووحدات التصميم CSS خالص.
- **يشمل كل ما يلزم.** صِيغ ESM و CJS مع تعريفات TypeScript، ودعم `"use client"` لموجّه تطبيقات
  Next.js.
- **متاح للجميع.** حالات تركيز ظاهرة عبر `:focus-visible`، ومكوّنات نظيفة في فحص إمكانية الوصول
  بالاتجاهين.

## الحُزم

| الحزمة | الوصف |
| --- | --- |
| `@backdoor_est/etkan-ui-tokens` | وحدات التصميم كخصائص CSS مخصّصة. مستقلّة عن أي إطار — تعمل مع React و Vue و Angular و Svelte أو صفحة HTML عادية. |
| `@backdoor_est/etkan-ui-react` | مكتبة مكوّنات React (١٨ مكوّناً + أدوات «السعودية أولاً»). |

## التثبيت

```sh
npm install @backdoor_est/etkan-ui-react @backdoor_est/etkan-ui-tokens
```

يتطلّب React الإصدار ١٨ أو ١٩.

## البداية السريعة

```tsx
import "@backdoor_est/etkan-ui-tokens";           // مرّة واحدة في جذر التطبيق
import { Button, Input } from "@backdoor_est/etkan-ui-react";

export default function App() {
  return (
    <form>
      <Input label="البريد الإلكتروني" placeholder="you@company.com" />
      <Button variant="primary">ابدأ مجاناً</Button>
    </form>
  );
}
```

اضبط اتجاه اللغة والسمة مرّة واحدة على عنصر `<html>`، وستُعرض المكوّنات نفسها بشكل صحيح في الحالات
الأربع:

```html
<html dir="rtl" data-theme="dark">   <!-- dir: "ltr" | "rtl"  ·  data-theme: "light" | "dark" -->
```

## أدوات «السعودية أولاً»

```tsx
import { SaudiRiyal, formatSAR, formatHijri, toArabicDigits } from "@backdoor_est/etkan-ui-react";

<span>١٬٢٥٠٫٥٠ <SaudiRiyal /></span>            // رمز الريال الرسمي، يرث لون النص وحجمه

formatSAR(1250.5);                              // "١٬٢٥٠٫٥٠ ر.س.‏"
formatHijri(new Date());                        // "٢٤ محرم ١٤٤٧ هـ"  (أم القرى)
toArabicDigits("2025");                         // "٢٠٢٥"
```

## المكوّنات

- **النماذج** — Button · IconButton · Input · Textarea · Select · Checkbox · Radio · Switch
- **البيانات** — Card · Badge · Tag · Table · Pagination
- **التنبيهات** — Tooltip · Toast · Dialog
- **التنقّل** — Tabs · Menu

## أسس التصميم

- **الحدود لا الظلال.** يأتي البناء من حدٍّ رفيع بمقدار 1px فوق سطح البطاقة، وتُحفَظ الظلال للقوائم
  والحوارات والتحويم.
- **لون تمييزي واحد باعتدال.** النيلي الكهربائي يقود الإجراءات والتركيز، والمرجاني الدافئ هو الومضة.
- **خط IBM Plex** في كل مكان — يحصل النص العربي على ارتفاع سطر أكبر ولا يُطبَّق عليه تباعد الأحرف.
- **شبكة تباعد بمقدار 4px** ونصف أقطار زوايا دقيقة ومتحفّظة.
- **الحركة سريعة وهادفة** (140–200 مللي ثانية، ease-out) وتحترم `prefers-reduced-motion`.

## التوثيق

لكل مكوّن قصّة في Storybook بالعربية والإنجليزية × فاتح وداكن. للتشغيل محلياً:

```sh
npm install
npm run docs        # يفتح Storybook على http://localhost:6006
```

## الرخصة

[MIT](./LICENSE) © مهنّد باحشوان

</div>
