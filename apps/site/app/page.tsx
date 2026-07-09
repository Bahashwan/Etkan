"use client";

import * as React from "react";
import Link from "next/link";
import {
  Button,
  Input,
  Badge,
  Switch,
  SaudiRiyal,
} from "@backdoor_est/etkan-ui-react";
import { useUI } from "./providers";
import { Terminal } from "@/components/terminal";
import { BuiltBy } from "@/components/built-by";
import { Reveal, Parallax, CountUp } from "@/components/motion";
import {
  ArrowIcon,
  BoltIcon,
  GlobeIcon,
  MoonIcon,
  GaugeIcon,
  LayersIcon,
  CheckIcon,
} from "@/components/icons";

const COMPONENT_NAMES = [
  "Button", "Input", "Select", "Checkbox", "Radio", "Switch", "Textarea",
  "Badge", "Tag", "Card", "Table", "Pagination", "Tabs", "Menu",
  "Dialog", "Toast", "Tooltip", "IconButton",
];

export default function HomePage() {
  const { dir } = useUI();
  const ar = dir === "rtl";

  return (
    <>
      {/* ================= HERO ================= */}
      <section className="hero section" style={{ paddingBlockStart: "clamp(40px,7vw,88px)" }}>
        <div className="aurora" aria-hidden>
          <b />
          <b />
          <b />
        </div>
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="hero-grid">
            <div>
              <Reveal>
                <span className="eyebrow">
                  <CheckIcon width={14} height={14} /> {ar ? "متوفّر الآن على npm · 0.1.0" : "Now on npm · v0.1.0"}
                </span>
              </Reveal>
              <Reveal delay={1}>
                <h1 style={{ marginBlockStart: "var(--space-4)" }}>
                  {ar ? (
                    <>
                      نظام تصميم <span className="gradient-animate">عربي وإنجليزي</span> بإتقان
                    </>
                  ) : (
                    <>
                      The <span className="gradient-animate">bilingual</span> design system, done with itqan
                    </>
                  )}
                </h1>
              </Reveal>
              <Reveal delay={2}>
                <p className="hero-lead">
                  {ar
                    ? "مكوّنات React مبنية من الصفر — عربي (RTL) وإنجليزي (LTR)، فاتح وداكن، من نسخة واحدة. بدّل من الأعلى وشاهد كل شيء ينقلب."
                    : "Hand-built React components — Arabic (RTL) and English (LTR), light and dark, from a single build. Flip the toggles up top and watch everything mirror."}
                </p>
              </Reveal>
              <Reveal delay={3}>
                <div className="hero-cta">
                  <Link href="/docs">
                    <Button variant="primary" size="lg" iconEnd={<ArrowIcon width={18} height={18} />}>
                      {ar ? "ابدأ الآن" : "Get started"}
                    </Button>
                  </Link>
                  <Link href="/components">
                    <Button variant="secondary" size="lg">
                      {ar ? "المكوّنات" : "Browse components"}
                    </Button>
                  </Link>
                </div>
              </Reveal>
              <Reveal delay={4}>
                <div style={{ maxWidth: 520, marginBlockStart: "var(--space-6)" }}>
                  <Terminal commands={["npm install @backdoor_est/etkan-ui-react @backdoor_est/etkan-ui-tokens"]} />
                </div>
              </Reveal>
            </div>

            {/* Floating glass cards, drifting with scroll */}
            <div className="hero-visual" aria-hidden>
              <Parallax speed={0.16} style={{ insetBlockStart: 10, insetInlineEnd: 0, width: 300 }}>
                <div className="float" style={{ ["--rot" as string]: "-3deg" }}>
                  <div className="glass">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span className="muted" style={{ fontSize: "var(--text-sm)" }}>{ar ? "الإيرادات" : "Revenue"}</span>
                      <Badge tone="success" variant="soft" dot>+12%</Badge>
                    </div>
                    <div style={{ fontSize: 30, fontWeight: 800, color: "var(--text-strong)", marginBlockStart: 6, letterSpacing: "-0.02em" }}>
                      48,209 <SaudiRiyal />
                    </div>
                    <div className="bars" style={{ height: 80, marginBlockStart: 12 }}>
                      {[40, 62, 48, 78, 90].map((h, i) => (
                        <div key={i} className="bar" style={{ height: `${h}%` }} />
                      ))}
                    </div>
                  </div>
                </div>
              </Parallax>

              <Parallax speed={-0.1} style={{ insetBlockStart: 210, insetInlineStart: 0, width: 280 }}>
                <div className="float d1" style={{ ["--rot" as string]: "2deg" }}>
                  <div className="glass" style={{ display: "grid", gap: 12 }}>
                    <Input label={ar ? "المبلغ" : "Amount"} placeholder="0.00" prefix={<SaudiRiyal />} />
                    <Switch label={ar ? "الدفع التلقائي" : "Auto-pay"} defaultChecked />
                    <Button variant="primary" fullWidth>{ar ? "تأكيد" : "Confirm"}</Button>
                  </div>
                </div>
              </Parallax>

              <Parallax speed={0.24} style={{ insetBlockStart: 0, insetInlineStart: 40, width: 210 }}>
                <div className="float d2" style={{ ["--rot" as string]: "4deg" }}>
                  <div className="glass" style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    <Badge tone="primary">{ar ? "جديد" : "New"}</Badge>
                    <Badge tone="warning" variant="soft">{ar ? "قيد المراجعة" : "Pending"}</Badge>
                    <Badge tone="danger" variant="solid">{ar ? "متأخر" : "Overdue"}</Badge>
                    <Badge tone="info" variant="soft" dot>{ar ? "مباشر" : "Live"}</Badge>
                  </div>
                </div>
              </Parallax>
            </div>
          </div>
        </div>
      </section>

      {/* ================= MARQUEE ================= */}
      <section style={{ paddingBlock: "var(--space-6)", borderBlock: "1px solid var(--border-subtle)" }}>
        <div className="marquee">
          <div className="marquee-track">
            {[...COMPONENT_NAMES, ...COMPONENT_NAMES].map((n, i) => (
              <span key={i} className="marquee-chip">{n}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ================= BENTO FEATURES ================= */}
      <section className="section">
        <div className="container">
          <Reveal>
            <span className="eyebrow">{ar ? "لماذا اتقان" : "Why ETKAN"}</span>
            <h2 style={{ marginBlock: "var(--space-3) var(--space-6)", fontSize: "var(--text-3xl)", letterSpacing: "-0.02em" }}>
              {ar ? "مبني ليكون صحيحاً في الاتجاهين" : "Built to be correct in both directions"}
            </h2>
          </Reveal>

          <div className="bento">
            <Reveal className="bento-cell wide" style={{ display: "grid" }}>
              <div className="feature-icon"><GlobeIcon /></div>
              <h3 style={{ fontSize: "var(--text-xl)" }}>{ar ? "ثنائي اللغة فعلاً" : "Truly bilingual"}</h3>
              <p className="muted" style={{ maxWidth: "48ch" }}>
                {ar
                  ? "خصائص CSS المنطقية فقط — لا left/right. نسخة واحدة، اتجاهان."
                  : "Logical CSS properties only — never left/right. One build, both directions."}
              </p>
              <div style={{ display: "flex", gap: 16, marginBlockStart: "var(--space-4)", flexWrap: "wrap" }}>
                <div dir="ltr" style={{ flex: 1, minWidth: 160, border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-md)", padding: 12, background: "var(--surface-sunken)" }}>
                  <span style={{ fontSize: 11, color: "var(--text-subtle)" }}>dir=&quot;ltr&quot;</span>
                  <div style={{ display: "flex", gap: 8, marginBlockStart: 8 }}><Badge tone="primary">EN</Badge><Button size="sm">Save</Button></div>
                </div>
                <div dir="rtl" style={{ flex: 1, minWidth: 160, border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-md)", padding: 12, background: "var(--surface-sunken)" }}>
                  <span style={{ fontSize: 11, color: "var(--text-subtle)" }}>dir=&quot;rtl&quot;</span>
                  <div style={{ display: "flex", gap: 8, marginBlockStart: 8 }}><Badge tone="primary">ع</Badge><Button size="sm">حفظ</Button></div>
                </div>
              </div>
            </Reveal>

            <Reveal className="bento-cell third" delay={1}>
              <div className="feature-icon"><MoonIcon /></div>
              <h3>{ar ? "فاتح وداكن" : "Light & dark"}</h3>
              <p className="muted" style={{ margin: 0 }}>{ar ? "سمة data-theme واحدة." : "A single data-theme attribute."}</p>
            </Reveal>

            <Reveal className="bento-cell third" delay={1}>
              <div className="feature-icon" style={{ fontSize: 20 }}><SaudiRiyal /></div>
              <h3>{ar ? "السعودية أولاً" : "Saudi-first"}</h3>
              <p className="muted" style={{ margin: 0 }}>{ar ? "ريال، هجري، أرقام عربية." : "Riyal, Hijri, Arabic digits."}</p>
            </Reveal>

            <Reveal className="bento-cell third" delay={2}>
              <div className="feature-icon"><BoltIcon /></div>
              <h3>{ar ? "بلا اعتماديات" : "Zero deps"}</h3>
              <p className="muted" style={{ margin: 0 }}>{ar ? "React فقط. وحدات CSS خالص." : "React only. Pure-CSS tokens."}</p>
            </Reveal>

            <Reveal className="bento-cell third" delay={2}>
              <div className="feature-icon"><GaugeIcon /></div>
              <h3>{ar ? "متاح للجميع" : "Accessible"}</h3>
              <p className="muted" style={{ margin: 0 }}>{ar ? "تركيز ظاهر، نظيف في axe." : "Visible focus, axe-clean."}</p>
            </Reveal>

            <Reveal className="bento-cell third" delay={3}>
              <div className="feature-icon"><LayersIcon /></div>
              <h3>{ar ? "لأي إطار" : "Any framework"}</h3>
              <p className="muted" style={{ margin: 0 }}>{ar ? "Vue، Angular، HTML." : "Vue, Angular, HTML."}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================= LIVE PRODUCT PREVIEW ================= */}
      <section className="section" style={{ paddingBlockStart: 0 }}>
        <div className="container">
          <Reveal>
            <div style={{ textAlign: "center", marginBlockEnd: "var(--space-6)" }}>
              <span className="eyebrow" style={{ justifyContent: "center" }}>{ar ? "المعرض" : "Showroom"}</span>
              <h2 style={{ marginBlockStart: "var(--space-2)", fontSize: "var(--text-3xl)", letterSpacing: "-0.02em" }}>
                {ar ? "منتجات حقيقية، مكوّنات حقيقية" : "Real products, real components"}
              </h2>
            </div>
          </Reveal>
          <Parallax speed={0.06}>
            <Reveal>
              <div style={{ border: "1px solid var(--border-default)", borderRadius: "var(--radius-lg)", overflow: "hidden", boxShadow: "var(--shadow-xl)", background: "var(--surface-card)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", borderBlockEnd: "1px solid var(--border-subtle)" }}>
                  <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#f0605c" }} />
                  <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#f5bf4f" }} />
                  <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#5ac05a" }} />
                  <span className="terminal-title">app.etkan.sa</span>
                </div>
                <div style={{ padding: "var(--space-6)", background: "var(--surface-page)" }}>
                  <div className="stat-grid" style={{ marginBlockEnd: "var(--space-5)" }}>
                    {(ar
                      ? [["الإيرادات", "٤٨٬٢٠٩"], ["الحملات", "١٢"], ["الفتح", "٩٨٫٢٪"], ["عملاء", "٣٤٠"]]
                      : [["Revenue", "48,209"], ["Campaigns", "12"], ["Open rate", "98.2%"], ["Contacts", "340"]]
                    ).map(([k, v]) => (
                      <div key={k} className="stat">
                        <div className="label">{k}</div>
                        <div className="value">{v}</div>
                      </div>
                    ))}
                  </div>
                  <div className="bars">
                    {[42, 58, 35, 72, 64, 88, 61].map((h, i) => (
                      <div key={i} className="bar" style={{ height: `${h}%` }} />
                    ))}
                  </div>
                  <div style={{ textAlign: "center", marginBlockStart: "var(--space-6)" }}>
                    <Link href="/showroom/dashboard">
                      <Button variant="secondary" iconEnd={<ArrowIcon width={16} height={16} />}>
                        {ar ? "افتح لوحة التحكّم الكاملة" : "Open the full dashboard"}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>
          </Parallax>
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="section" style={{ paddingBlockStart: 0 }}>
        <div className="container">
          <Reveal>
            <div className="stat-band" style={{ padding: "var(--space-8)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-lg)", background: "var(--surface-card)" }}>
              <div><div className="n"><CountUp to={18} /></div><div className="k">{ar ? "مكوّناً" : "Components"}</div></div>
              <div><div className="n"><CountUp to={2} /></div><div className="k">{ar ? "حزمتان على npm" : "npm packages"}</div></div>
              <div><div className="n"><CountUp to={4} /></div><div className="k">{ar ? "حالات (لغة×سمة)" : "states (lang × theme)"}</div></div>
              <div><div className="n"><CountUp to={0} /></div><div className="k">{ar ? "اعتماديات" : "dependencies"}</div></div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= BUILT BY ================= */}
      <section className="section" style={{ paddingBlockStart: 0 }}>
        <div className="container">
          <Reveal>
            <BuiltBy />
          </Reveal>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="section" style={{ paddingBlockStart: 0 }}>
        <div className="container">
          <Reveal>
            <div style={{ position: "relative", overflow: "hidden", borderRadius: "var(--radius-lg)", padding: "clamp(32px,6vw,72px)", background: "var(--brand-gradient)", color: "#fff", textAlign: "center" }}>
              <h2 style={{ color: "#fff", fontSize: "clamp(1.8rem,4vw,2.6rem)", letterSpacing: "-0.02em" }}>
                {ar ? "ابدأ البناء بإتقان" : "Start building with itqan"}
              </h2>
              <p style={{ color: "rgba(255,255,255,0.88)", marginBlock: "12px var(--space-6)", maxWidth: "48ch", marginInline: "auto" }}>
                {ar ? "ثبّت الحزمة، اقرأ الدليل، وأطلق واجهة عربية/إنجليزية في دقائق." : "Install the package, read the guide, and ship a bilingual UI in minutes."}
              </p>
              <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                <Link href="/docs"><Button size="lg" variant="secondary">{ar ? "اقرأ الدليل" : "Read the docs"}</Button></Link>
                <a href="https://www.npmjs.com/package/@backdoor_est/etkan-ui-react" target="_blank" rel="noreferrer">
                  <Button size="lg" variant="ghost" style={{ color: "#fff", borderColor: "rgba(255,255,255,0.4)" }}>npm</Button>
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
