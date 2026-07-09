"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUI } from "../providers";

const NAV = [
  {
    group: { en: "Guides", ar: "الأدلّة" },
    items: [
      { href: "/docs", en: "Getting started", ar: "ابدأ من هنا" },
      { href: "/docs/frameworks", en: "Any framework", ar: "مع أي إطار" },
      { href: "/docs/theming", en: "Theming", ar: "السمات والألوان" },
      { href: "/docs/rtl", en: "RTL & bilingual", ar: "الاتجاه واللغتان" },
      { href: "/docs/saudi", en: "Saudi-first", ar: "السعودية أولاً" },
    ],
  },
  {
    group: { en: "Reference", ar: "المرجع" },
    items: [
      { href: "/components", en: "Components", ar: "المكوّنات" },
      { href: "/showroom", en: "Showroom", ar: "المعرض" },
    ],
  },
];

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { dir } = useUI();
  const ar = dir === "rtl";

  return (
    <div className="container section" style={{ paddingBlockStart: "var(--space-8)" }}>
      <div className="docs-shell">
        <nav className="docs-nav" aria-label="Docs">
          {NAV.map((section) => (
            <React.Fragment key={section.group.en}>
              <div className="docs-nav-group">{ar ? section.group.ar : section.group.en}</div>
              {section.items.map((item) => (
                <Link key={item.href} href={item.href} data-active={pathname === item.href}>
                  {ar ? item.ar : item.en}
                </Link>
              ))}
            </React.Fragment>
          ))}
        </nav>
        <article className="prose">{children}</article>
      </div>
    </div>
  );
}
