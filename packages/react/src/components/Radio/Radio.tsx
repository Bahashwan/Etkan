import * as React from "react";

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "style"> {
  /** Text or node rendered beside the control. */
  label?: React.ReactNode;
  /** Shared across a group of radios so they behave as one selection. */
  name?: string;
  /** Applied to the root label element. */
  style?: React.CSSProperties;
}

function cssEsc(s: string): string {
  return s.replace(/[^a-zA-Z0-9_-]/g, "\\$&");
}

/**
 * Single radio button with label. Group by sharing a `name`.
 * The native input stays in the tree (visually hidden) so keyboard arrow
 * navigation and native form submission work; the ring/dot is custom-drawn.
 */
export function Radio({
  label,
  disabled = false,
  id,
  style = {},
  ...rest
}: RadioProps) {
  const autoId = React.useId();
  const inputId = id ?? autoId;
  const sel = `#${cssEsc(inputId)}`;

  return (
    <label
      htmlFor={inputId}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "var(--space-2)",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.55 : 1,
        fontFamily: "var(--font-sans)",
        fontSize: "var(--text-md)",
        color: "var(--text-body)",
        userSelect: "none",
        ...style,
      }}
    >
      <span style={{ position: "relative", display: "inline-flex", flexShrink: 0 }}>
        <input
          id={inputId}
          type="radio"
          disabled={disabled}
          style={{
            position: "absolute",
            insetBlockStart: 0,
            insetInlineStart: 0,
            inlineSize: "100%",
            blockSize: "100%",
            margin: 0,
            opacity: 0,
            cursor: "inherit",
          }}
          {...rest}
        />
        <span
          aria-hidden="true"
          style={{
            display: "grid",
            placeItems: "center",
            inlineSize: "1.125rem",
            blockSize: "1.125rem",
            borderRadius: "50%",
            pointerEvents: "none",
          }}
        >
          <span
            className="etkan-radio-dot"
            style={{
              inlineSize: "0.5rem",
              blockSize: "0.5rem",
              borderRadius: "50%",
              background: "var(--text-on-primary)",
            }}
          />
        </span>
      </span>
      {label != null && <span>{label}</span>}
      <style>{`
        ${sel} + span {
          background: var(--surface-card);
          border: 1.5px solid var(--border-strong);
          transition: background var(--duration-fast) var(--ease-standard), border-color var(--duration-fast) var(--ease-standard);
        }
        ${sel}:checked + span {
          background: var(--brand-primary);
          border-color: var(--brand-primary);
        }
        ${sel} + span .etkan-radio-dot {
          transform: scale(0);
          transition: transform var(--duration-fast) var(--ease-out);
        }
        ${sel}:checked + span .etkan-radio-dot { transform: scale(1); }
        ${sel}:focus-visible + span { box-shadow: var(--focus-ring); }
      `}</style>
    </label>
  );
}
