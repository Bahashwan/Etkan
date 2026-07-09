# ETKAN UI — Pipeline & team handbook

How this repo goes from design decision → tested component → published npm package.
Structured the way a professional design-system team works: every stage below has an
owning "specialist role" and a gate that must pass before the next stage.

## Repository layout

```
├─ tokens/               ← canonical CSS token source
├─ packages/
│  ├─ tokens/            ← @backdoor_est/etkan-ui-tokens   (published · pure CSS · framework-agnostic)
│  └─ react/             ← @backdoor_est/etkan-ui-react    (published · TS · ESM+CJS+types)
├─ apps/
│  └─ docs/              ← Storybook workbench (private · EN/AR × light/dark toolbars)
├─ .changeset/           ← release notes & versioning (Changesets)
└─ .github/workflows/    ← CI (every PR) + Release (main branch)
```

**Future packages (slots reserved, do not create until decided):**
`@backdoor_est/etkan-ui-icons` (SVG set), `@backdoor_est/etkan-ui-motion` (animation primitives/presets),
`@backdoor_est/etkan-ui-vue` / `@backdoor_est/etkan-ui-angular` or `@backdoor_est/etkan-ui-web-components` (cross-framework layer —
architecture decision pending, see §Roadmap).

## The team roles & their gates

| Role | Owns | Gate before merge |
|---|---|---|
| **Design lead** | `readme.md` foundations, tokens, visual language | Change uses semantic aliases; both themes tuned |
| **RTL/i18n specialist** | Bilingual behavior | Logical properties only (`padding-inline`, never `left/right`); AR line-height/letter-spacing rules; directional icons carry `.etkan-mirror`; story verified in AR·RTL |
| **Component engineer** | `packages/react/src` | TypeScript strict; props documented; `"use client"` safe; no raw ramp colors |
| **Motion designer** | `tokens/motion.css`, per-component transitions | 140/200ms ease-out budget; `prefers-reduced-motion` respected; no infinite loops |
| **QA / a11y engineer** | `*.test.tsx` | Vitest + Testing Library green; jest-axe zero violations in **both** directions |
| **Docs engineer** | `apps/docs` stories | Every component has a Playground story + an Arabic story |
| **Release manager** | Changesets, npm, CI | Changeset present; CI green; semver intent correct |

One person can wear several hats — the point is that every hat's
gate gets checked.

## Daily commands

```sh
npm install            # once — installs the whole workspace
npm run build          # tokens (css copy + index) + react (tsup: esm/cjs/d.ts)
npm run test           # vitest + testing-library + jest-axe
npm run typecheck      # tsc strict, no emit
npm run lint           # oxlint
npm run format         # prettier
npm run docs           # Storybook on :6006 with EN/AR × light/dark toolbars
```

## Adding / migrating a component (the assembly line)

1. **Source of truth** — the legacy `components/<group>/<Name>.jsx` + `.d.ts` is the spec.
2. **Migrate** — create `packages/react/src/components/<Name>/<Name>.tsx`: merge the `.d.ts`
   types into the TSX, extend the native element's props, keep inline logical-property styles.
3. **Test** — `<Name>.test.tsx`: behavior tests + an AR/RTL render + `axe` in both directions.
4. **Story** — `apps/docs/stories/<Name>.stories.tsx`: Playground + AllVariants + Arabic.
5. **Export** — add to `packages/react/src/index.ts`.
6. **Changeset** — `npm run changeset` → pick `@backdoor_est/etkan-ui-react`, usually `minor` (new component).
7. **PR** — CI runs build/lint/typecheck/test/format on every PR; merge when green.

Migration queue (from `components/`): ~~Button~~ ✅ · IconButton · Input · Textarea · Select ·
Checkbox · Radio · Switch · Card · Badge · Tag · Table · Pagination · Tabs · Menu · Dialog ·
Toast + ToastViewport · Tooltip.

## Releasing to npm

Releases are automated with [Changesets](https://github.com/changesets/changesets):

1. Every meaningful PR includes a changeset file (`npm run changeset`).
2. On merge to `main`, the **Release** workflow opens/updates a "Version Packages" PR that
   bumps versions + writes CHANGELOGs.
3. Merging that PR publishes `@backdoor_est/etkan-ui-tokens` and `@backdoor_est/etkan-ui-react` to npm (public access).

**One-time setup before the first release:**
- Create the free npm org **`etkan-ui`** (or rename the scope in both `package.json` files).
- Add an npm automation token as the `NPM_TOKEN` GitHub Actions secret.
- Push this repo to GitHub with `main` as the default branch.

Versioning: stay on `0.x` until the full component set is migrated; `npm run changeset` with
`minor` per new component, `patch` for fixes. Cut `1.0.0` when the public API is stable.

## Framework support policy

- **`@backdoor_est/etkan-ui-tokens` is framework-agnostic today** — pure CSS; usable from Vue, Angular,
  Svelte, or plain HTML immediately.
- **`@backdoor_est/etkan-ui-react`** targets React 18/19; ESM + CJS + types; ships `"use client"` so it
  drops into Next.js App Router server trees; works with Vite, Remix, CRA, etc.
- **Vue / Angular components** are a deliberate later addition (see Roadmap) — the options are
  per-framework packages vs. a shared Web-Components core with thin wrappers. Decide before
  writing any code; both fit the reserved package slots above.

## Roadmap (agreed direction)

- [x] Pipeline: monorepo, build, tests, lint, Storybook, Changesets, CI/CD
- [ ] Migrate all 19 legacy components to `@backdoor_est/etkan-ui-react`
- [ ] **Motion layer** — richer element motions (entrances, staggered lists, micro-interactions)
      as tokens + presets, always `prefers-reduced-motion`-safe
- [ ] **Expand the kit beyond the base set** — e.g. Avatar, Breadcrumbs, Skeleton, Progress,
      Slider, DatePicker (with Hijri consideration), Command palette, Drawer/Sheet, Popover,
      Accordion, Stepper, EmptyState, Stat/KPI, FileUpload, Combobox
- [ ] `@backdoor_est/etkan-ui-icons` package (line icons, 1.75px, RTL-mirroring built in)
- [ ] Visual regression testing (Chromatic or Playwright screenshots, 4 states per story)
- [ ] Cross-framework layer (Vue/Angular) — **pending explicit decision**
