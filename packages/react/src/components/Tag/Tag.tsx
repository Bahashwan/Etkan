import * as React from "react";

export interface TagProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "style"> {
  children?: React.ReactNode;
  /** When provided, renders a dismiss button that calls this handler. */
  onRemove?: () => void;
  /** Optional leading color dot (e.g. a category color). Any CSS color. */
  color?: string;
  /**
   * Accessible label for the dismiss button. Default "Remove". Pass the tag text
   * (e.g. `Remove Design`) for a clearer name.
   */
  removeLabel?: string;
  style?: React.CSSProperties;
}

/**
 * Removable chip / tag. Pass `onRemove` to show a dismiss button.
 */
export function Tag({
  children,
  onRemove,
  color,
  removeLabel = "Remove",
  style = {},
  ...rest
}: TagProps) {
  const [hover, setHover] = React.useState(false);

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "var(--space-2)",
        blockSize: "1.75rem",
        paddingInline: "var(--space-3)",
        fontFamily: "var(--font-sans)",
        fontSize: "var(--text-sm)",
        color: "var(--text-body)",
        background: "var(--surface-card)",
        border: "1px solid var(--border-default)",
        borderRadius: "var(--radius-pill)",
        whiteSpace: "nowrap",
        ...style,
      }}
      {...rest}
    >
      {color && (
        <span
          aria-hidden="true"
          style={{
            inlineSize: "0.5rem",
            blockSize: "0.5rem",
            borderRadius: "var(--radius-pill)",
            background: color,
          }}
        />
      )}
      {children}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          aria-label={removeLabel}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            inlineSize: "1.125rem",
            blockSize: "1.125rem",
            padding: 0,
            marginInlineEnd: "-4px",
            border: "none",
            background: hover ? "var(--surface-hover)" : "transparent",
            color: hover ? "var(--text-strong)" : "var(--text-muted)",
            cursor: "pointer",
            borderRadius: "var(--radius-pill)",
            lineHeight: 1,
            transition: "background var(--duration-fast) var(--ease-standard)",
          }}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      )}
    </span>
  );
}
