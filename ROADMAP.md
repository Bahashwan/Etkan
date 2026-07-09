# ETKAN UI — Component roadmap

Status legend: ✅ shipped · 🔨 in progress · 🎯 next up · 🔭 later

## Core (v0.1 target)

| Component | Status | Notes |
|---|---|---|
| Button | ✅ | variants, sizes, loading, icons, RTL-aware |
| IconButton | 🔨 | square control, required accessible name |
| Input | 🔨 | label, error, describedby wiring |
| Textarea | 🔨 | |
| Select | 🔨 | |
| Checkbox | 🔨 | native input core |
| Radio | 🔨 | native input core |
| Switch | 🔨 | `role="switch"`, RTL-aware thumb travel |
| Badge | 🔨 | |
| Tag | 🔨 | removable |
| Card | 🔨 | interactive hover lift |
| Table | 🔨 | semantic `<table>`, `<th scope>` |
| Pagination | 🔨 | direction-aware chevrons |
| Tooltip | 🔨 | hover + focus, escape to dismiss |
| Toast | 🔨 | auto-dismiss, pause on hover |
| Dialog | 🔨 | focus trap, scroll lock, exit animation |
| Tabs | 🔨 | roving tabindex, RTL arrow keys, sliding indicator |
| Menu | 🔨 | full menu-button ARIA pattern |

## Gaps to close (v0.2) — 🎯

Everyday components any product team reaches for:

- **Alert / Banner** — persistent inline messaging (Toast is transient; this is its static sibling)
- **Avatar + AvatarGroup** — with Arabic-initials support
- **Skeleton** — loading placeholders (shimmer within the motion budget)
- **Progress** — linear + circular, determinate/indeterminate
- **Spinner** — extracted from Button's loader as a standalone
- **Breadcrumb** — direction-aware separators
- **Accordion** — animated height, single/multiple expand
- **Divider**, **Link** — small but constantly needed
- **FormField** — label + hint + error wrapper unifying all form controls
- **EmptyState** — illustration slot + action

## Saudi-first layer (v0.2–v0.3) — 🎯

The kit's differentiator: built for Saudi products, not adapted to them.

- **SaudiRiyal** — the official Riyal symbol (U+20C1) as a font-independent SVG
  glyph component, sized/colored like text. No `$` anywhere in this kit.
- **Price / formatSAR()** — SAR currency formatting via `Intl.NumberFormat`
  (`ar-SA` / `en-SA`), narrow-symbol and code modes, optional Arabic-Indic digits
  (٠١٢٣٤٥٦٧٨٩)
- **HijriDate / formatHijri()** — Umm al-Qura calendar rendering via
  `Intl` `islamic-umalqura`, dual Hijri/Gregorian display mode
- **DatePicker** — Hijri **and** Gregorian modes, RTL grid, Sunday week start,
  Fri–Sat weekend styling
- **PhoneInput** — +966 defaults, Saudi mobile format grouping
- All examples/stories use Saudi context (SAR pricing, Saudi cities, +966)

Constraint: platform `Intl` APIs only — no i18n/date dependencies. The package
stays zero-dependency.

## Larger pieces (v0.3+) — 🔭

- **Drawer / Sheet** — side panel, logical side ("start"/"end"), RTL-aware
- **Popover** — generic anchored surface (Tooltip/Menu positioning generalized)
- **Combobox / Autocomplete** — filterable select
- **NumberInput** — steppers, Arabic-Indic digit entry
- **Slider** — RTL-aware track direction
- **Stepper / Wizard** — multi-step flows
- **FileUpload** — drag & drop zone
- **SegmentedControl**, **Rating**, **Stat/KPI**
- **CommandPalette** — ⌘K-style, bilingual search

## Cross-framework (decision pending)

`@backdoor/etkan-ui-vue` / `@backdoor/etkan-ui-angular` or a `@backdoor/etkan-ui-web-components` core —
tokens are already framework-agnostic; the component layer decision comes after
the React kit stabilizes.
