import * as React from "react";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "prefix" | "style"> {
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
  /** Leading adornment (icon, currency symbol). */
  prefix?: React.ReactNode;
  /** Trailing adornment. */
  suffix?: React.ReactNode;
  style?: React.CSSProperties;
  wrapperStyle?: React.CSSProperties;
}

const SIZES = {
  sm: { height: "var(--control-height-sm)", font: "var(--text-sm)" },
  md: { height: "var(--control-height-md)", font: "var(--text-md)" },
  lg: { height: "var(--control-height-lg)", font: "var(--text-base)" },
} as const;

/**
 * Text input with optional label, helper/error text, and leading/trailing adornments.
 */
export function Input({
  label,
  id,
  size = "md",
  invalid = false,
  disabled = false,
  helperText,
  errorText,
  prefix = null,
  suffix = null,
  onFocus,
  onBlur,
  "aria-describedby": ariaDescribedBy,
  style = {},
  wrapperStyle = {},
  ...rest
}: InputProps) {
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
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--space-2)",
          blockSize: s.height,
          paddingInline: "var(--field-padding-x)",
          background: disabled ? "var(--surface-sunken)" : "var(--surface-card)",
          border: `1px solid ${borderColor}`,
          borderRadius: "var(--radius-md)",
          boxShadow: focus ? "var(--focus-ring)" : "none",
          transition:
            "border-color var(--duration-fast) var(--ease-standard), box-shadow var(--duration-fast) var(--ease-standard)",
          opacity: disabled ? 0.6 : 1,
        }}
      >
        {prefix && (
          <span style={{ color: "var(--text-muted)", display: "inline-flex" }}>{prefix}</span>
        )}
        <input
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
            flex: 1,
            minInlineSize: 0,
            border: "none",
            outline: "none",
            background: "transparent",
            fontFamily: "var(--font-sans)",
            fontSize: s.font,
            color: "var(--text-strong)",
            blockSize: "100%",
            padding: 0,
            ...style,
          }}
          {...rest}
        />
        {suffix && (
          <span style={{ color: "var(--text-muted)", display: "inline-flex" }}>{suffix}</span>
        )}
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
