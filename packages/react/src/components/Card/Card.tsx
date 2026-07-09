import * as React from "react";

export type CardVariant = "elevated" | "outlined";
export type CardPadding = "none" | "sm" | "md" | "lg";

export interface CardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "style"> {
  children?: React.ReactNode;
  /** "elevated" uses shadow tokens; "outlined" uses a border. Default "elevated". */
  variant?: CardVariant;
  /** Optional header slot (semibold, divided). */
  header?: React.ReactNode;
  /** Optional footer slot (sunken background). */
  footer?: React.ReactNode;
  /** Inner padding scale. Default "md". */
  padding?: CardPadding;
  /**
   * Adds hover-lift, pointer cursor, keyboard focus and a `button` role so the
   * whole card acts as a single clickable target.
   */
  interactive?: boolean;
  style?: React.CSSProperties;
}

const PAD: Record<CardPadding, string> = {
  none: "0",
  sm: "var(--space-3)",
  md: "var(--space-5)",
  lg: "var(--space-6)",
};

const REST_SHADOW: Record<CardVariant, string> = {
  elevated: "var(--shadow-sm)",
  outlined: "none",
};

const HOVER_SHADOW: Record<CardVariant, string> = {
  elevated: "var(--shadow-md)",
  outlined: "var(--shadow-sm)",
};

/**
 * Container surface for grouped content with optional header/footer slots.
 */
export function Card({
  children,
  variant = "elevated",
  header,
  footer,
  padding = "md",
  interactive = false,
  onClick,
  onKeyDown,
  style = {},
  ...rest
}: CardProps) {
  const [hover, setHover] = React.useState(false);
  const [focus, setFocus] = React.useState(false);
  const pad = PAD[padding];

  const border =
    variant === "outlined"
      ? "1px solid var(--border-default)"
      : "1px solid var(--border-subtle)";

  const lifted = interactive && (hover || focus);
  const baseShadow = lifted ? HOVER_SHADOW[variant] : REST_SHADOW[variant];
  const boxShadow =
    focus && interactive
      ? baseShadow === "none"
        ? "var(--focus-ring)"
        : `${baseShadow}, var(--focus-ring)`
      : baseShadow;

  const interactiveProps: React.HTMLAttributes<HTMLDivElement> = interactive
    ? {
        role: "button",
        tabIndex: 0,
        onKeyDown: (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClick?.(e as unknown as React.MouseEvent<HTMLDivElement>);
          }
          onKeyDown?.(e);
        },
        onFocus: () => setFocus(true),
        onBlur: () => setFocus(false),
      }
    : {};

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: "var(--surface-card)",
        border,
        borderRadius: "var(--radius-lg)",
        boxShadow,
        transform: lifted ? "translateY(-2px)" : "none",
        transition:
          "box-shadow var(--duration-base) var(--ease-standard), transform var(--duration-base) var(--ease-standard)",
        cursor: interactive ? "pointer" : "default",
        overflow: "hidden",
        fontFamily: "var(--font-sans)",
        color: "var(--text-body)",
        ...style,
      }}
      {...interactiveProps}
      {...rest}
    >
      {header != null && (
        <div
          style={{
            padding: `var(--space-4) ${pad}`,
            borderBlockEnd: "1px solid var(--border-subtle)",
            fontWeight: "var(--fw-semibold)" as React.CSSProperties["fontWeight"],
            color: "var(--text-strong)",
          }}
        >
          {header}
        </div>
      )}
      <div style={{ padding: pad }}>{children}</div>
      {footer != null && (
        <div
          style={{
            padding: `var(--space-3) ${pad}`,
            borderBlockStart: "1px solid var(--border-subtle)",
            background: "var(--surface-sunken)",
          }}
        >
          {footer}
        </div>
      )}
    </div>
  );
}
