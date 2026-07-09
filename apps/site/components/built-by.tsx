"use client";

import * as React from "react";
import { useUI } from "@/app/providers";

/** Recreated Backdoor mark — a door flanked by code chevrons. Uses currentColor
 *  so it adapts to light/dark automatically. */
function BackdoorMark() {
  return (
    <svg
      viewBox="0 0 600 600"
      width="46"
      height="46"
      fill="none"
      stroke="currentColor"
      strokeWidth={16}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="205" y="150" width="190" height="300" rx="10" />
      <rect x="232" y="178" width="136" height="250" rx="6" />
      <circle cx="346" cy="300" r="10" fill="currentColor" stroke="none" />
      <path d="M150 196 L74 300 L150 404" />
      <path d="M450 196 L526 300 L450 404" />
    </svg>
  );
}

function CompanyCard({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="glass lift"
      style={{
        minWidth: 220,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 14,
        padding: "var(--space-5) var(--space-8)",
        color: "var(--text-strong)",
        textDecoration: "none",
      }}
    >
      {children}
    </a>
  );
}

export function BuiltBy() {
  const { dir } = useUI();
  const ar = dir === "rtl";
  const [baTechImgOk, setBaTechImgOk] = React.useState(true);

  return (
    <>
      <p
        className="muted"
        style={{ textAlign: "center", fontSize: "var(--text-sm)", marginBlockEnd: "var(--space-5)" }}
      >
        {ar ? "من تطوير" : "Built by"}
      </p>
      <div
        style={{
          display: "flex",
          gap: "var(--space-5)",
          justifyContent: "center",
          alignItems: "stretch",
          flexWrap: "wrap",
        }}
      >
        <CompanyCard href="https://backdoor.sa">
          <BackdoorMark />
          <span style={{ fontSize: "var(--text-lg)", fontWeight: 700, letterSpacing: "-0.01em" }}>
            Backdoor
          </span>
        </CompanyCard>

        <CompanyCard href="https://ba-tech.ru">
          {baTechImgOk ? (
            // Drop the real logo at apps/site/public/logos/ba-tech.png to show it.
            <img
              src="/logos/ba-tech.png"
              alt="Ba-Tech"
              height={46}
              style={{ height: 46, width: "auto", objectFit: "contain", borderRadius: 8 }}
              onError={() => setBaTechImgOk(false)}
            />
          ) : null}
          <span style={{ fontSize: "var(--text-lg)", fontWeight: 700, letterSpacing: "-0.01em" }}>
            Ba-Tech
          </span>
        </CompanyCard>
      </div>
    </>
  );
}
