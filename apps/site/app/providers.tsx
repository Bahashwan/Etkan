"use client";

import * as React from "react";

type Theme = "light" | "dark";
type Dir = "ltr" | "rtl";

interface UIState {
  theme: Theme;
  dir: Dir;
  toggleTheme: () => void;
  toggleDir: () => void;
}

const UIContext = React.createContext<UIState | null>(null);

export function useUI(): UIState {
  const ctx = React.useContext(UIContext);
  if (!ctx) throw new Error("useUI must be used within <Providers>");
  return ctx;
}

export function Providers({ children }: { children: React.ReactNode }) {
  // Arabic is the primary language — default to RTL. A saved preference or the
  // header toggle can switch to English.
  const [theme, setTheme] = React.useState<Theme>("light");
  const [dir, setDir] = React.useState<Dir>("rtl");

  // Restore saved preferences on mount.
  React.useEffect(() => {
    const savedTheme = localStorage.getItem("etkan-theme") as Theme | null;
    const savedDir = localStorage.getItem("etkan-dir") as Dir | null;
    if (savedTheme) setTheme(savedTheme);
    if (savedDir) setDir(savedDir);
  }, []);

  // Reflect state onto <html>, exactly like a real consuming app.
  React.useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
    root.setAttribute("dir", dir);
    root.setAttribute("lang", dir === "rtl" ? "ar" : "en");
    localStorage.setItem("etkan-theme", theme);
    localStorage.setItem("etkan-dir", dir);
  }, [theme, dir]);

  const value = React.useMemo<UIState>(
    () => ({
      theme,
      dir,
      toggleTheme: () => setTheme((t) => (t === "light" ? "dark" : "light")),
      toggleDir: () => setDir((d) => (d === "ltr" ? "rtl" : "ltr")),
    }),
    [theme, dir],
  );

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}
