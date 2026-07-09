"use client";

import * as React from "react";
import Link from "next/link";
import { useUI } from "@/app/providers";

export function SiteFooter() {
  const { dir } = useUI();
  const ar = dir === "rtl";
  return (
    <footer className="site-footer">
      <div className="container">
        <span>
          {ar ? "اتقان · نظام تصميم" : "ETKAN UI · Design System"} — MIT ©{" "}
          {ar ? "مهنّد باحشوان" : "Mohanad Bahashwan"}
        </span>
        <span style={{ display: "flex", gap: "var(--space-4)" }}>
          <Link href="/docs">{ar ? "التوثيق" : "Docs"}</Link>
          <a href="https://www.npmjs.com/package/@backdoor_est/etkan-ui-react" target="_blank" rel="noreferrer">
            npm
          </a>
          <a href="https://github.com/Bahashwan/Etkan" target="_blank" rel="noreferrer">
            GitHub
          </a>
        </span>
      </div>
    </footer>
  );
}
