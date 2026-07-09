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
      viewBox="0 0 1124.14 1256.39"
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
      {/* Official Saudi Riyal symbol (2024). Centered by preserveAspectRatio. */}
      <path d="M699.62,1113.02h0c-20.06,44.48-33.32,92.75-38.4,143.37l424.51-90.24c20.06-44.47,33.31-92.75,38.4-143.37l-424.51,90.24Z" />
      <path d="M1085.73,895.8c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.33v-135.2l292.27-62.11c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.27V66.13c-50.67,28.45-95.67,66.32-132.25,110.99v403.35l-132.25,28.11V0c-50.67,28.44-95.67,66.32-132.25,110.99v525.69l-295.91,62.88c-20.06,44.47-33.33,92.75-38.42,143.37l334.33-71.05v170.26l-358.3,76.14c-20.06,44.47-33.32,92.75-38.4,143.37l375.04-79.7c30.53-6.35,56.77-24.4,73.83-49.24l68.78-101.97v-.02c7.14-10.55,11.3-23.27,11.3-36.97v-149.98l132.25-28.11v270.4l424.53-90.28Z" />
    </svg>
  );
}
