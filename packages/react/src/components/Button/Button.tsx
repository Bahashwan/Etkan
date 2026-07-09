import * as React from "react";

export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "style"> {
  children?: React.ReactNode;
  /** Visual weight. Default "primary". */
  variant?: "primary" | "secondary" | "ghost" | "danger" | "accent";
  /** Control height. Default "md". */
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  /** Shows a spinner and blocks clicks. */
  loading?: boolean;
  /** Stretch to container width. */
  fullWidth?: boolean;
  /** Icon element rendered before the label (leading edge, RTL-aware). */
  iconStart?: React.ReactNode;
  /** Icon element rendered after the label. */
  iconEnd?: React.ReactNode;
  style?: React.CSSProperties;
}

const SIZES = {
  sm: {
    height: "var(--control-height-sm)",
    padding: "0 var(--space-3)",
    font: "var(--text-sm)",
    gap: "var(--space-2)",
  },
  md: {
    height: "var(--control-height-md)",
    padding: "0 var(--space-4)",
    font: "var(--text-md)",
    gap: "var(--space-2)",
  },
  lg: {
    height: "var(--control-height-lg)",
    padding: "0 var(--space-6)",
    font: "var(--text-base)",
    gap: "var(--space-3)",
  },
} as const;

function variantStyle(variant: NonNullable<ButtonProps["variant"]>): React.CSSProperties {
  switch (variant) {
    case "secondary":
      return {
        background: "var(--surface-card)",
        color: "var(--text-strong)",
        border: "1px solid var(--border-default)",
      };
    case "ghost":
      return {
        background: "transparent",
        color: "var(--text-body)",
        border: "1px solid transparent",
      };
    case "danger":
      return {
        background: "var(--danger-solid)",
        color: "#fff",
        border: "1px solid transparent",
      };
    case "accent":
      return {
        background: "var(--brand-accent)",
        color: "var(--text-on-accent)",
        border: "1px solid transparent",
      };
    case "primary":
    default:
      return {
        background: "var(--brand-primary)",
        color: "var(--text-on-primary)",
        border: "1px solid transparent",
      };
  }
}

const HOVER_BG: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary: "var(--brand-primary-hover)",
  accent: "var(--brand-accent-hover)",
  danger: "var(--danger-600)",
  secondary: "var(--surface-hover)",
  ghost: "var(--surface-hover)",
};

/**
 * ETKAN primary action button. Bilingual-safe (logical padding), RTL-aware.
 */
export function Button({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  fullWidth = false,
  iconStart = null,
  iconEnd = null,
  type = "button",
  onClick,
  style = {},
  ...rest
}: ButtonProps) {
  const s = SIZES[size] ?? SIZES.md;
  const v = variantStyle(variant);
  const isDisabled = disabled || loading;

  const [hover, setHover] = React.useState(false);
  const [active, setActive] = React.useState(false);

  return (
    <button
      type={type}
      disabled={isDisabled}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {
        setHover(false);
        setActive(false);
      }}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: s.gap,
        height: s.height,
        padding: s.padding,
        inlineSize: fullWidth ? "100%" : "auto",
        fontFamily: "var(--font-sans)",
        fontSize: s.font,
        fontWeight: "var(--fw-medium)" as React.CSSProperties["fontWeight"],
        lineHeight: 1,
        borderRadius: "var(--radius-md)",
        cursor: isDisabled ? "not-allowed" : "pointer",
        opacity: isDisabled ? 0.5 : 1,
        transition:
          "background var(--duration-fast) var(--ease-standard), transform var(--duration-instant) var(--ease-standard), box-shadow var(--duration-fast) var(--ease-standard)",
        transform: active && !isDisabled ? "translateY(0.5px) scale(0.99)" : "none",
        whiteSpace: "nowrap",
        ...v,
        ...(hover && !isDisabled ? { background: HOVER_BG[variant] } : {}),
        ...style,
      }}
      {...rest}
    >
      {loading && (
        <span
          aria-hidden="true"
          style={{
            inlineSize: "1em",
            blockSize: "1em",
            borderRadius: "50%",
            border: "2px solid currentColor",
            borderTopColor: "transparent",
            display: "inline-block",
            animation: "etkan-spin 0.7s linear infinite",
          }}
        />
      )}
      {!loading && iconStart}
      {children}
      {!loading && iconEnd}
      <style>{`@keyframes etkan-spin { to { transform: rotate(360deg); } }`}</style>
    </button>
  );
}
