import * as React from "react";

export interface SaudiRiyalProps extends Omit<React.SVGProps<SVGSVGElement>, "children"> {
  /** Glyph size. Defaults to "1em" so it scales with surrounding text. */
  size?: number | string;
  /** Accessible label. When omitted the glyph is decorative (aria-hidden). */
  title?: string;
}

/**
 * The official Saudi Riyal symbol (introduced 2024) as a font-independent SVG
 * glyph, so it renders identically everywhere regardless of font coverage of
 * U+20C1. Inherits `currentColor` and sizes to the surrounding text by default.
 *
 * Use this instead of "$" anywhere a currency mark is shown. For formatted
 * amounts, prefer `formatSAR`.
 */
export function SaudiRiyal({ size = "1em", title, style, ...rest }: SaudiRiyalProps) {
  const decorative = title == null;
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      role={decorative ? undefined : "img"}
      aria-hidden={decorative ? true : undefined}
      aria-label={decorative ? undefined : title}
      fill="currentColor"
      style={{ display: "inline-block", verticalAlign: "-0.125em", ...style }}
      {...rest}
    >
      {!decorative && <title>{title}</title>}
      {/* Stylised riyal mark: the reh curve with the two parallel bars. */}
      <path
        d="M6.4 4.2a1 1 0 0 1 2 0v7.02l3.1-.66V4.2a1 1 0 0 1 2 0v5.94l2.36-.5a1 1 0 1 1 .42 1.96l-2.78.59v2.03l3.4-.72a1 1 0 1 1 .42 1.96l-3.82.81v2.13c0 2.34-1.5 3.9-3.86 3.9H6.6a1 1 0 0 1 0-2h2.86c1.2 0 1.84-.66 1.84-1.9v-1.7l-3.1.66v.74a1 1 0 0 1-2 0v-.32l-2.06.44a1 1 0 1 1-.42-1.96l2.48-.53v-2.03l-2.9.62a1 1 0 1 1-.42-1.96l3.32-.71V4.2Zm2 8.98v2.03l3.1-.66v-2.03l-3.1.66Z"
      />
    </svg>
  );
}
