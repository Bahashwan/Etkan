"use client";

import * as React from "react";
import Link from "next/link";
import { Badge } from "@backdoor_est/etkan-ui-react";
import { useUI } from "../providers";
import { ArrowIcon, GaugeIcon } from "@/components/icons";

export default function ShowroomIndex() {
  const { dir } = useUI();
  const ar = dir === "rtl";

  const demos = [
    {
      href: "/showroom/dashboard",
      icon: <GaugeIcon />,
      title: ar ? "لوحة التحكّم" : "Dashboard",
      desc: ar
        ? "لمحة سريعة عن نشاطك — قائمة جانبية، بطاقات أرقام، رسم بياني، وجدول للفواتير."
        : "Outreach overview — sidebar, stat cards, a chart, and an invoices table.",
      live: true,
    },
    {
      href: "#",
      icon: <GaugeIcon />,
      title: ar ? "المتجر والفوترة" : "Commerce & billing",
      desc: ar ? "قريباً — سلّة شراء، وإتمام الطلب، وفواتير بالريال." : "Coming soon — cart, checkout, riyal invoices.",
      live: false,
    },
  ];

  return (
    <div className="container section">
      <span className="eyebrow">{ar ? "المعرض" : "Showroom"}</span>
      <h1 style={{ fontSize: "var(--text-4xl)", letterSpacing: "-0.02em", marginBlock: "var(--space-3) var(--space-2)" }}>
        {ar ? "منتجات حقيقية بُنيت بإتقان" : "Real products built with ETKAN"}
      </h1>
      <p className="muted" style={{ maxWidth: "60ch" }}>
        {ar
          ? "شاشات كاملة مبنية من مكوّنات المكتبة — بالعربية والإنجليزية، وبالوضعين الفاتح والداكن، من نسخة واحدة."
          : "Full screens assembled from the library — Arabic/English and light/dark from one build."}
      </p>

      <div className="grid grid-2" style={{ marginBlockStart: "var(--space-6)" }}>
        {demos.map((d) => (
          <Link
            key={d.title}
            href={d.href}
            className="feature"
            style={{ display: "block", opacity: d.live ? 1 : 0.6, pointerEvents: d.live ? "auto" : "none" }}
          >
            <div className="feature-icon">{d.icon}</div>
            <h3 style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {d.title}
              {!d.live && (
                <Badge tone="neutral" variant="soft">
                  {ar ? "قريباً" : "Soon"}
                </Badge>
              )}
              {d.live && <ArrowIcon width={16} height={16} />}
            </h3>
            <p className="muted" style={{ margin: 0 }}>
              {d.desc}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
