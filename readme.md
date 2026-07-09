# ETKAN UI — اتقان · Design System

A bilingual (Arabic RTL + English LTR), light/dark design system and open UI kit for a family
of SaaS products. Built from scratch — no external codebase, Figma, or brand assets were
provided. Intended to be released for free public use as **ETKAN UI**.

**Owners / consumers:** Mohanad Bahashwan, Backdoor, Ba-Tech.
**Products it serves (v1):** auto Email + WhatsApp outreach, auto SMM content generator,
appointment system + CRM, restaurant inventory tracking — and more to come.

> **Sources:** none attached. All tokens, type, color, logo and components are original
> decisions for this system. If licensed brand fonts or brand colors exist, share them to
> replace the current choices.

اتقان ("itqan") means *mastery / doing things with excellence*. The system is precise, modern
and confident — electric indigo, a warm coral spark, cool slate neutrals, tight radii.

---

## 1. Brand mark
An **original ETKAN logo** was created (no external mark was provided to copy):
- `assets/etkan-mark.svg` — the app-icon: a geometric **"E" monogram** (spine + three rounded
  bars) reversed out of a rounded-square tile filled with the brand gradient. Works on any
  background.
- `assets/etkan-logo-en.svg` — horizontal lockup: mark + **ETKAN** wordmark.
- `assets/etkan-logo-ar.svg` — RTL lockup: mark + **اتقان** wordmark (mark on the right).

The wordmark is set in the system font (IBM Plex). Minimum clear space ≈ the height of the
mark's inner bar; don't recolor the gradient tile or stretch the mark.

---

## 2. Bilingual / RTL strategy
- Consumers set `dir="rtl"` or `dir="ltr"` and `data-theme="light|dark"` on `<html>`.
- **One build serves both directions.** Components use CSS *logical properties*
  (`padding-inline`, `inset-inline-start`, `margin-inline`) — never `left`/`right`.
- Arabic gets a taller line-height and zero letter-spacing (enforced in `tokens/base.css`).
- Directional icons (arrows/chevrons) flip under RTL via the `.etkan-mirror` class.
- Type is unified: **IBM Plex Sans Arabic** covers both scripts; **IBM Plex Sans** is the
  Latin twin; **IBM Plex Mono** for code/data.
- Every UI kit ships with a live **language + theme toggle** so you can preview all four
  states (EN/AR × light/dark).

## 3. Theming
- **Light** = `:root`. **Dark** = `[data-theme="dark"]` overrides.
- Components consume **semantic aliases only** (`--surface-card`, `--text-strong`,
  `--brand-primary`, `--border-default`, …), never raw ramp steps — so both themes and any
  future rebrand flow through the aliases.

---

## 4. CONTENT FUNDAMENTALS — how ETKAN writes
**Voice:** clear, confident, warm — a capable partner, not a hype machine. We lead with the
outcome ("Automate outreach. Grow with itqan."), not the mechanism.

- **Person:** address the user as **you**; ETKAN refers to itself as **we/ETKAN**. Arabic uses
  the neutral imperative ("ابدأ", "جهّز") — friendly, not stiff.
- **Casing (EN):** Sentence case for headings, labels, and buttons ("New campaign", "Save
  changes") — **not** Title Case. ALL-CAPS only for tiny overline labels/table headers, with
  letter-spacing. Never caps a whole word of Arabic (Arabic has no case).
- **Buttons are verbs:** "Start free", "Create campaign", "Book a demo", "Save changes".
- **Numbers:** Western digits in EN (48,209 · 98.2%), Arabic-Indic in AR (٤٨٬٢٠٩ · ٩٨٫٢٪).
  Currency shows the riyal symbol ﷼ / ر.س. Use tabular figures in tables.
- **Bilingual pairing:** in specimens and mixed contexts we pair terms with a middot —
  "Email · البريد", "Sent · تم الإرسال" — but production copy is single-language per `dir`.
- **Tone examples:** empty/first-run is encouraging ("Start automating outreach in minutes.");
  success is concrete ("1,204 contacts reached."); errors are plain and fixable ("Check your
  WhatsApp connection.").
- **Emoji:** not used in product UI. Status is carried by color + icon + a dot, never a 😀.
- **No jargon, no exclamation spam.** One idea per line; short sentences; `text-wrap: pretty`.

---

## 5. VISUAL FOUNDATIONS
**Color vibe.** Electric **indigo/cobalt** primary (`#5B5BF0`) for action and focus; a warm
**coral** accent (`#F85A34`) as the spark, used sparingly (highlights, one CTA, the gradient
tail). Neutrals are **cool slate** with a faint blue undertone — modern, not warm-beige.
Semantic colors (success green, warning amber, danger red, info blue) each ship as a soft
surface + readable text + solid trio, retuned for dark.

**Gradient.** A single brand gradient `--brand-gradient` (indigo → light indigo → coral, 135°)
appears only in signature moments: the logo tile, the auth side-panel, the pricing CTA band,
avatar chips, and gradient text on the hero's second line. It is never a page background and
never sits behind body text.

**Type.** IBM Plex family throughout. Display/headings 600–700 with tight tracking
(`-0.02em`); body 400–500 at 14px default; mono for numbers/IDs/code. Arabic never gets
letter-spacing and rides a taller line-height.

**Spacing & layout.** 4px base grid (`--space-*`). Comfortable density: 40px default control
height, 12–16px card padding steps, 24px screen gutters. App shells use a 264px sidebar; content
maxes out around 1100–1140px. Layout is built with fl/grid + `gap`, not margins.

**Corner radii.** Subtle and precise: 6px for controls & most cards (`--radius-md`), 8–12px for
larger cards/dialogs, `999px` pills for tabs/badges/tags. Nothing is heavily rounded.

**Borders over shadows.** The system is **border-led**. Cards are a 1px `--border-subtle` hairline
on `--surface-card` with a barely-there `--shadow-sm`; elevation climbs only for menus (`lg`),
dialogs (`xl`), and hover on interactive cards (`md` + 1px lift). In dark mode shadows nearly
vanish and borders carry structure. No coloured left-border accent cards.

**Backgrounds.** Flat surfaces — no photographic hero images, no textures, no patterns. The only
"decoration" is soft radial gradient glows (very low opacity) behind the marketing hero and two
translucent circles on the auth panel. Everything else is solid tokens.

**Hover / press.** Hover = a step-darker brand color (or `--surface-hover` for subtle controls);
never opacity fades on solid buttons. Press = a 0.99 scale + 0.5px nudge on buttons — quick and
mechanical, no bounce. Interactive cards lift 1px and deepen shadow.

**Motion.** Fast and purposeful: 140ms for state, 200ms for entrances, ease-out
`cubic-bezier(0.16,1,0.3,1)`. Dialogs fade + rise 8px; menus/tooltips fade in; toasts rise.
No infinite loops, no spring/bounce. All motion respects `prefers-reduced-motion`.

**Transparency & blur.** Used only where it earns its keep: sticky marketing nav uses
`backdrop-filter: blur` over a `color-mix` translucent surface; the dialog overlay is a 2px
blur over a scrim. Not used on cards or content.

**Focus.** A 3px brand-tinted ring (`--focus-ring`) on `:focus-visible`, plus border-color
shift on fields. Always visible, never removed.

**Imagery.** No stock photography in v1. Where a photo/logo would go (contact avatars, user
chips) we use a monogram on a soft brand tile or the gradient. Icons are line-drawn (see below).

---

## 6. ICONOGRAPHY
- **Style:** line icons, **1.75px** stroke, rounded caps and joins, 24px grid — matching the
  precise, modern brand. No filled/duotone icons in v1.
- **Source:** no icon font or SVGs were provided. A small **local set** ships in
  `ui_kits/_shared/icon.js` (`window.EtkanIcon` — ~35 Lucide-style glyphs) so kits render
  offline with zero CDN dependency. **These are Lucide-compatible outlines**; for a fuller set,
  drop in [Lucide](https://lucide.dev) (same weight/style) — flagged as the recommended CDN.
- **RTL:** directional glyphs (chevrons, arrows, send) carry `.etkan-mirror` so they flip with
  direction.
- **Usage:** icons pair with text or carry an accessible `label` (see IconButton). Status is
  color + icon + dot. **Emoji and unicode dingbats are not used as icons.**
- **Brand/product glyphs:** each product in the suite has a lead icon — Outreach `send`,
  SMM `sparkles`, Appointments `calendar`, Inventory `box`.

---

## 7. Components (index)
Reusable primitives under `components/<group>/` — each `<Name>.jsx` + `<Name>.d.ts` +
`<Name>.prompt.md`, mounted via `const { <Name> } = window.ETKANUIDesignSystem_c3478d`.

- **forms/** — Button · IconButton · Input · Textarea · Select · Checkbox · Radio · Switch
- **data/** — Card · Badge · Tag · Table · Pagination
- **navigation/** — Tabs · Menu
- **feedback/** — Dialog · Toast (+ ToastViewport) · Tooltip

### Intentional additions
- **IconButton** — icon-only companion to Button (toolbars, table rows).
- **Textarea** — multi-line sibling of Input.
- **ToastViewport** — fixed, RTL-aware container that stacks Toasts.

## 8. UI kits (index)
Full-screen, interactive product recreations under `ui_kits/<product>/` — each is
`index.html` + `app.js` (plain-JS React, no build step) and shares `ui_kits/_shared/icon.js`.
Every kit has EN/AR + light/dark toggles.

- **dashboard/** — Outreach overview: sidebar + product switcher, stat cards, channel chart,
  campaigns table, "new campaign" dialog + toast.
- **auth/** — split login / signup with brand panel and Google button.
- **marketing/** — landing page: sticky nav, hero, feature grid, pricing, CTA band, footer.
- **settings/** — tabbed settings: profile, workspace, notifications, billing.
- **data-table/** — Contacts CRM: pill tabs, search + filters, bulk-select bar, tags, pagination.

## 9. Root manifest
- `styles.css` — the single file consumers link; an `@import` manifest only.
- `tokens/` — `fonts.css`, `colors.css`, `typography.css`, `spacing.css`, `radius.css`,
  `shadows.css`, `motion.css`, `base.css` (reset + RTL foundation).
- `components/` — reusable primitives (§7).
- `ui_kits/` — full-screen recreations (§8) + `_shared/icon.js`.
- `guidelines/` — foundation specimen cards (Type, Colors, Spacing).
- `assets/` — logo files + the logo specimen card.
- `readme.md` — this guide. `SKILL.md` — Agent-Skills wrapper.

---

## Fonts — substitution flag
⚠️ **Google Fonts stand-ins in use.** IBM Plex Sans Arabic / Sans / Mono load from the Google
Fonts CDN (no local binaries, so the compiler reports 0 `@font-face`). If you have licensed
brand fonts, send them and they'll be added as real `@font-face` rules with shipped files.
