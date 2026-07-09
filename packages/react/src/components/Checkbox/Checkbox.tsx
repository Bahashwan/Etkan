import * as React from "react";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "style"> {
  /** Text or node rendered beside the box. */
  label?: React.ReactNode;
  /** Renders the mixed/dash state (independent of `checked`). */
  indeterminate?: boolean;
  /** Applied to the root label element. */
  style?: React.CSSProperties;
}

function cssEsc(s: string): string {
  return s.replace(/[^a-zA-Z0-9_-]/g, "\\$&");
}

/**
 * Checkbox with label. The native input stays in the tree (visually hidden)
 * so keyboard and forms work natively; the box is custom-drawn.
 * Controlled via `checked`/`onChange` or uncontrolled via `defaultChecked`.
 */
export function Checkbox({
  label,
  indeterminate = false,
  disabled = false,
  id,
  style = {},
  ...rest
}: CheckboxProps) {
  const autoId = React.useId();
  const inputId = id ?? autoId;
  const ref = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => {
    if (ref.current) ref.current.indeterminate = indeterminate;
  }, [indeterminate]);

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
          ref={ref}
          id={inputId}
          type="checkbox"
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
            borderRadius: "var(--radius-xs)",
            pointerEvents: "none",
          }}
        >
          <svg
            viewBox="0 0 12 12"
            width="11"
            height="11"
            style={{ gridArea: "1 / 1", display: "block" }}
          >
            <path
              className="etkan-cb-check"
              d="M2.5 6.5 L5 9 L9.5 3.5"
              fill="none"
              stroke="var(--text-on-primary)"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span
            className="etkan-cb-dash"
            style={{
              gridArea: "1 / 1",
              inlineSize: "0.55rem",
              blockSize: "2px",
              borderRadius: "1px",
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
        ${sel}:checked + span, ${sel}:indeterminate + span {
          background: var(--brand-primary);
          border-color: var(--brand-primary);
        }
        ${sel} + span .etkan-cb-check {
          stroke-dasharray: 12;
          stroke-dashoffset: 12;
          transition: stroke-dashoffset var(--duration-fast) var(--ease-out);
        }
        ${sel}:checked + span .etkan-cb-check { stroke-dashoffset: 0; }
        ${sel} + span .etkan-cb-dash { opacity: 0; }
        ${sel}:indeterminate + span .etkan-cb-dash { opacity: 1; }
        ${sel}:indeterminate + span .etkan-cb-check { opacity: 0; }
        ${sel}:focus-visible + span { box-shadow: var(--focus-ring); }
      `}</style>
    </label>
  );
}
