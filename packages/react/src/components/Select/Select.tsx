import * as React from "react";

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size" | "style"> {
  /** Field label rendered above the control. */
  label?: string;
  /** Control height. Default "md". */
  size?: "sm" | "md" | "lg";
  /** Marks the field as invalid (red border). */
  invalid?: boolean;
  disabled?: boolean;
  /** Helper hint shown below when valid. */
  helperText?: string;
  /** Error message shown below when invalid. */
  errorText?: string;
  /** Shown as an empty-value first option. */
  placeholder?: string;
  /** <option> elements. */
  children?: React.ReactNode;
  style?: React.CSSProperties;
  wrapperStyle?: React.CSSProperties;
}

const SIZES = {
  sm: { height: "var(--control-height-sm)", font: "var(--text-sm)" },
  md: { height: "var(--control-height-md)", font: "var(--text-md)" },
  lg: { height: "var(--control-height-lg)", font: "var(--text-base)" },
} as const;

/**
 * Native select styled to match the field system. Chevron sits on the trailing
 * edge in both directions.
 */
export function Select({
  label,
  id,
  size = "md",
  invalid = false,
  disabled = false,
  helperText,
  errorText,
  children,
  placeholder,
  onFocus,
  onBlur,
  "aria-describedby": ariaDescribedBy,
  style = {},
  wrapperStyle = {},
  ...rest
}: SelectProps) {
  const s = SIZES[size] ?? SIZES.md;
  const [focus, setFocus] = React.useState(false);
  const autoId = React.useId();
  const inputId = id ?? autoId;
  const showError = Boolean(invalid && errorText);
  const messageId = `${inputId}-message`;
  const describedBy =
    [ariaDescribedBy, showError || helperText ? messageId : undefined].filter(Boolean).join(" ") ||
    undefined;

  const borderColor = showError
    ? "var(--danger-solid)"
    : focus
      ? "var(--border-focus)"
      : "var(--border-default)";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-2)",
        inlineSize: "100%",
        ...wrapperStyle,
      }}
    >
      {label && (
        <label
          htmlFor={inputId}
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "var(--text-sm)",
            fontWeight: "var(--fw-medium)" as React.CSSProperties["fontWeight"],
            color: "var(--text-strong)",
          }}
        >
          {label}
        </label>
      )}
      <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
        <select
          id={inputId}
          disabled={disabled}
          onFocus={(e) => {
            setFocus(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocus(false);
            onBlur?.(e);
          }}
          aria-invalid={invalid || undefined}
          aria-describedby={describedBy}
          style={{
            appearance: "none",
            WebkitAppearance: "none",
            inlineSize: "100%",
            blockSize: s.height,
            paddingInlineStart: "var(--field-padding-x)",
            paddingInlineEnd: "var(--space-8)",
            background: disabled ? "var(--surface-sunken)" : "var(--surface-card)",
            border: `1px solid ${borderColor}`,
            borderRadius: "var(--radius-md)",
            boxShadow: focus ? "var(--focus-ring)" : "none",
            fontFamily: "var(--font-sans)",
            fontSize: s.font,
            color: "var(--text-strong)",
            outline: "none",
            cursor: disabled ? "not-allowed" : "pointer",
            transition:
              "border-color var(--duration-fast) var(--ease-standard), box-shadow var(--duration-fast) var(--ease-standard)",
            opacity: disabled ? 0.6 : 1,
            ...style,
          }}
          {...rest}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {children}
        </select>
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            insetInlineEnd: "var(--space-3)",
            pointerEvents: "none",
            color: "var(--text-muted)",
            fontSize: "0.7em",
            lineHeight: 1,
          }}
        >
          ▼
        </span>
      </div>
      {(helperText || showError) && (
        <span
          id={messageId}
          role={showError ? "alert" : undefined}
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "var(--text-xs)",
            color: showError ? "var(--danger-text)" : "var(--text-muted)",
          }}
        >
          {showError ? errorText : helperText}
        </span>
      )}
    </div>
  );
}
