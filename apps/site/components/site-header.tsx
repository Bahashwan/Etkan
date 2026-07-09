"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUI } from "@/app/providers";
import { SunIcon, MoonIcon, GlobeIcon, GithubIcon } from "./icons";

const GITHUB_URL = "https://github.com/Bahashwan/Etkan";

const NAV = [
  { href: "/docs", label: "Docs", labelAr: "الدليل" },
  { href: "/components", label: "Components", labelAr: "المكوّنات" },
  { href: "/showroom", label: "Showroom", labelAr: "المعرض" },
];

export function SiteHeader() {
  const { theme, dir, toggleTheme, toggleDir } = useUI();
  const pathname = usePathname();
  const ar = dir === "rtl";
  const [menuOpen, setMenuOpen] = React.useState(false);

  // Close the mobile menu whenever the route changes.
  React.useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header className="site-header">
      <div className="container">
        <Link href="/" className="brand" aria-label="ETKAN UI home">
          <span className="brand-tile" aria-hidden>
            {ar ? "ا" : "E"}
          </span>
          <span className="brand-name">
            ETKAN <small>UI</small>
          </span>
        </Link>

        <nav className="nav-links" aria-label="Primary">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="nav-link"
              data-active={pathname.startsWith(item.href)}
            >
              {ar ? item.labelAr : item.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <button
            className="pill-toggle"
            onClick={toggleDir}
            aria-label="Toggle language direction"
            title={ar ? "الانتقال إلى الإنجليزية" : "Switch to Arabic"}
          >
            <GlobeIcon width={16} height={16} />
            {ar ? "EN" : "عربي"}
          </button>
          <button
            className="pill-toggle"
            onClick={toggleTheme}
            aria-label="Toggle color theme"
            title={theme === "light" ? "Dark mode" : "Light mode"}
          >
            {theme === "light" ? (
              <MoonIcon width={16} height={16} />
            ) : (
              <SunIcon width={16} height={16} />
            )}
          </button>
          <a
            className="pill-toggle icon-only"
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub repository"
          >
            <GithubIcon width={16} height={16} />
          </a>
          <button
            className="pill-toggle menu-btn"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={ar ? "القائمة" : "Menu"}
            aria-expanded={menuOpen}
          >
            <span className="menu-glyph" data-open={menuOpen} aria-hidden>
              <i />
              <i />
              <i />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <div className="mobile-menu" data-open={menuOpen}>
        <nav aria-label="Mobile">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="nav-link"
              data-active={pathname.startsWith(item.href)}
            >
              {ar ? item.labelAr : item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
