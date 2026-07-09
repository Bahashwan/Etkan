import * as React from "react";

export interface IconButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "style" | "aria-label"> {
  /** The icon element to render (SVG or icon node). */
  icon: React.ReactNode;
  /** Accessible name — required. Applied as `aria-label` and `title`. */
  label: string;
  /** Visual weight, matching Button. Default "ghost". */
  variant?: "primary" | "secondary" | "ghost" | "danger";
  /** Square control size, driven by --control-height tokens. Default "md". */
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  style?: React.CSSProperties;
}

const SIZES = {
  sm: "var(--control-height-sm)",
  md: "var(--control-height-md)",
  lg: "var(--control-height-lg)",
} as const;

function variantStyle(
  variant: NonNullable<IconButtonProps["variant"]>,
): React.CSSProperties {
  switch (variant) {
    case "primary":
      return {
        background: "var(--brand-primary)",
        color: "var(--text-on-primary)",
        border: "1px solid transparent",
      };
    case "secondary":
      return {
        background: "var(--surface-card)",
        color: "var(--text-strong)",
        border: "1px solid var(--border-default)",
      };
    case "danger":
      return {
        background: "var(--danger-solid)",
        color: "var(--text-on-primary)",
        border: "1px solid transparent",
      };
    case "ghost":
    default:
      return {
        background: "transparent",
        color: "var(--text-body)",
        border: "1px solid transparent",
      };
  }
}

/**
 * Square button holding a single icon. Same variants as Button.
 * `label` is required and applied as the accessible name (aria-label + title).
 */
export function IconButton({
  icon,
  label,
  variant = "ghost",
  size = "md",
  disabled = false,
  type = "button",
  onClick,
  style = {},
  ...rest
}: IconButtonProps) {
  const dim = SIZES[size] ?? SIZES.md;
  const v = variantStyle(variant);
  const [hover, setHover] = React.useState(false);

  const softHover = variant === "secondary" || variant === "ghost";
  const hoverStyle: React.CSSProperties =
    hover && !disabled
      ? softHover
        ? { background: "var(--surface-hover)" }
        : variant === "primary"
          ? { background: "var(--brand-primary-hover)" }
          : { filter: "brightness(0.93)" }
      : {};

  return (
    <button
      type={type}
      aria-label={label}
      title={label}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        inlineSize: dim,
        blockSize: dim,
        padding: 0,
        borderRadius: "var(--radius-md)",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        transition:
          "background var(--duration-fast) var(--ease-standard), filter var(--duration-fast) var(--ease-standard)",
        ...v,
        ...hoverStyle,
        ...style,
      }}
      {...rest}
    >
      <span aria-hidden="true" style={{ display: "inline-flex" }}>
        {icon}
      </span>
    </button>
  );
}
