import * as React from "react";

export interface SwitchProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "type" | "size" | "role" | "style"
  > {
  /** Text or node rendered beside the control. */
  label?: React.ReactNode;
  /** Track size. Default "md". */
  size?: "sm" | "md";
  /** Applied to the root label element. */
  style?: React.CSSProperties;
}

const SIZES = {
  sm: { w: "2rem", h: "1.125rem", knob: "0.875rem" },
  md: { w: "2.5rem", h: "1.375rem", knob: "1.125rem" },
} as const;

function cssEsc(s: string): string {
  return s.replace(/[^a-zA-Z0-9_-]/g, "\\$&");
}

/**
 * On/off switch built on a native checkbox with `role="switch"`.
 * Track fills primary when on. Knob travel is logical (insetInlineStart plus a
 * dir-aware transform) so it moves toward the trailing edge in both LTR and RTL.
 * Controlled via `checked`/`onChange` or uncontrolled via `defaultChecked`.
 */
export function Switch({
  label,
  checked,
  defaultChecked,
  disabled = false,
  size = "md",
  onChange,
  id,
  style = {},
  ...rest
}: SwitchProps) {
  const autoId = React.useId();
  const inputId = id ?? autoId;
  const s = SIZES[size] ?? SIZES.md;
  const isControlled = checked !== undefined;
  const [internal, setInternal] = React.useState(Boolean(defaultChecked));
  const on = isControlled ? Boolean(checked) : internal;
  const sel = `#${cssEsc(inputId)}`;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) setInternal(e.target.checked);
    onChange?.(e);
  };

  return (
    <label
      htmlFor={inputId}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "var(--space-3)",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.55 : 1,
        fontFamily: "var(--font-sans)",
        fontSize: "var(--text-md)",
        color: "var(--text-body)",
        userSelect: "none",
        ...style,
      }}
    >
      <span
        style={{
          position: "relative",
          inlineSize: s.w,
          blockSize: s.h,
          flexShrink: 0,
          background: on ? "var(--brand-primary)" : "var(--border-default)",
          borderRadius: "var(--radius-pill)",
          transition: "background var(--duration-base) var(--ease-standard)",
        }}
      >
        <input
          id={inputId}
          type="checkbox"
          role="switch"
          aria-checked={on}
          checked={isControlled ? Boolean(checked) : undefined}
          defaultChecked={isControlled ? undefined : defaultChecked}
          disabled={disabled}
          onChange={handleChange}
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
            position: "absolute",
            insetBlockStart: "50%",
            insetInlineStart: "2px",
            inlineSize: s.knob,
            blockSize: s.knob,
            background: "var(--text-on-primary)",
            borderRadius: "50%",
            transform: on
              ? "translateY(-50%) translateX(calc((var(--sw-w) - var(--sw-knob) - 4px) * var(--sw-dir)))"
              : "translateY(-50%)",
            transition: "transform var(--duration-base) var(--ease-out)",
            // logical travel distance; direction sign is set via the stylesheet
            // below so the RTL rule can override it (an inline --sw-dir would win
            // over the stylesheet and break the flip).
            ["--sw-w" as string]: s.w,
            ["--sw-knob" as string]: s.knob,
          }}
        />
      </span>
      {label != null && <span>{label}</span>}
      <style>{`
        ${sel} ~ span { --sw-dir: 1; }
        [dir="rtl"] ${sel} ~ span { --sw-dir: -1; }
        span:has(> ${sel}:focus-visible) {
          box-shadow: var(--focus-ring);
          border-radius: var(--radius-pill);
        }
        @media (prefers-reduced-motion: reduce) {
          ${sel} ~ span, ${sel} + span { transition: none !important; }
        }
      `}</style>
    </label>
  );
}
