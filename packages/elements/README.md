# @backdoor_est/etkan-ui-elements

ETKAN UI — اتقان · **framework-agnostic Web Components** built with [Lit]. The same
bilingual (Arabic RTL / English LTR), light & dark design system as the React kit —
but as standard custom elements that work **anywhere**: Angular, Vue, Svelte, plain
HTML, and React.

## Install

```sh
npm install @backdoor_est/etkan-ui-elements @backdoor_est/etkan-ui-tokens
```

Or drop it straight into a page with no build step:

```html
<link rel="stylesheet" href="https://unpkg.com/@backdoor_est/etkan-ui-tokens/css/index.css" />
<script src="https://unpkg.com/@backdoor_est/etkan-ui-elements/dist/index.global.js"></script>
```

## Usage

Importing the package registers every element. Then use the tags anywhere:

```js
import "@backdoor_est/etkan-ui-tokens"; // once, at your app root
import "@backdoor_est/etkan-ui-elements";
```

```html
<etkan-button variant="primary">Save</etkan-button>
<etkan-input label="Email" placeholder="you@company.com"></etkan-input>
<etkan-price amount="1,250.50"></etkan-price>
```

Set direction and theme once on `<html>` — every element follows:

```html
<html dir="rtl" data-theme="dark">
```

## Components

- **Actions** — `etkan-button` · `etkan-icon-button`
- **Forms** — `etkan-input` · `etkan-textarea` · `etkan-checkbox` · `etkan-radio` · `etkan-switch` · `etkan-search-bar` · `etkan-field`
- **Data** — `etkan-badge` · `etkan-tag` · `etkan-card` · `etkan-avatar` · `etkan-divider` · `etkan-pagination` · `etkan-stat-card` · `etkan-price`
- **Feedback** — `etkan-alert` · `etkan-spinner`
- **Layout** — `etkan-navbar` · `etkan-sidebar`
- **Motion** — `etkan-reveal` · `etkan-parallax` · `etkan-count-up` · `etkan-marquee` · `etkan-aurora` · `etkan-float`
- **Ready-made** — `etkan-login-card`

## Notes

- **Styling** is driven entirely by the design tokens (CSS custom properties), which
  pierce the shadow DOM — so load `@backdoor_est/etkan-ui-tokens` on the document.
- **RTL is automatic**: components use CSS logical properties only, so `dir="rtl"`
  mirrors the whole UI.
- **Events**: interactive elements emit composed `CustomEvent`s (e.g. `etkan-change`,
  `etkan-input`, `etkan-remove`, `etkan-search`, `etkan-submit`).
- Motion elements honor `prefers-reduced-motion`.

[Lit]: https://lit.dev
