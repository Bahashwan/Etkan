import * as React from "react";

export type BadgeTone = "neutral" | "primary" | "success" | "warning" | "danger" | "info";

export interface BadgeProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "style"> {
  children?: React.ReactNode;
  /** Semantic color. Default "neutral". */
  tone?: BadgeTone;
  /** "soft" tints the surface; "solid" fills with the tone color. Default "soft". */
  variant?: "soft" | "solid";
  /** Leading status dot. */
  dot?: boolean;
  style?: React.CSSProperties;
}

const SOFT: Record<BadgeTone, { bg: string; fg: string; bd: string }> = {
  neutral: { bg: "var(--surface-sunken)", fg: "var(--text-body)", bd: "var(--border-default)" },
  primary: {
    bg: "var(--brand-primary-soft)",
    fg: "var(--brand-primary-soft-text)",
    bd: "transparent",
  },
  success: { bg: "var(--success-surface)", fg: "var(--success-text)", bd: "transparent" },
  warning: { bg: "var(--warning-surface)", fg: "var(--warning-text)", bd: "transparent" },
  danger: { bg: "var(--danger-surface)", fg: "var(--danger-text)", bd: "transparent" },
  info: { bg: "var(--info-surface)", fg: "var(--info-text)", bd: "transparent" },
};

const SOLID_BG: Record<BadgeTone, string> = {
  neutral: "var(--neutral-600)",
  primary: "var(--brand-primary)",
  success: "var(--success-solid)",
  warning: "var(--warning-solid)",
  danger: "var(--danger-solid)",
  info: "var(--info-solid)",
};

/**
 * Small inline status pill. Solid variant fills with the tone color.
 */
export function Badge({
  children,
  tone = "neutral",
  variant = "soft",
  dot = false,
  style = {},
  ...rest
}: BadgeProps) {
  const isSolid = variant === "solid";
  const t = SOFT[tone];

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "var(--space-1)",
        blockSize: "1.375rem",
        paddingInline: "var(--space-2)",
        fontFamily: "var(--font-sans)",
        fontSize: "var(--text-xs)",
        fontWeight: "var(--fw-medium)" as React.CSSProperties["fontWeight"],
        lineHeight: 1,
        borderRadius: "var(--radius-sm)",
        background: isSolid ? SOLID_BG[tone] : t.bg,
        color: isSolid ? "var(--text-on-primary)" : t.fg,
        border: isSolid ? "1px solid transparent" : `1px solid ${t.bd}`,
        whiteSpace: "nowrap",
        ...style,
      }}
      {...rest}
    >
      {dot && (
        <span
          aria-hidden="true"
          style={{
            inlineSize: "0.4rem",
            blockSize: "0.4rem",
            borderRadius: "var(--radius-pill)",
            background: "currentColor",
          }}
        />
      )}
      {children}
    </span>
  );
}
