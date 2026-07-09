import * as React from "react";

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "style"> {
  /** Field label rendered above the control. */
  label?: string;
  /** Marks the field as invalid (red border). */
  invalid?: boolean;
  disabled?: boolean;
  /** Helper hint shown below when valid. */
  helperText?: string;
  /** Error message shown below when invalid. */
  errorText?: string;
  /** Visible text rows. Default 4. */
  rows?: number;
  style?: React.CSSProperties;
  wrapperStyle?: React.CSSProperties;
}

/**
 * Multi-line text input matching Input's styling.
 */
export function Textarea({
  label,
  id,
  invalid = false,
  disabled = false,
  helperText,
  errorText,
  rows = 4,
  onFocus,
  onBlur,
  "aria-describedby": ariaDescribedBy,
  style = {},
  wrapperStyle = {},
  ...rest
}: TextareaProps) {
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
      <textarea
        id={inputId}
        rows={rows}
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
          inlineSize: "100%",
          resize: "vertical",
          paddingBlock: "var(--space-3)",
          paddingInline: "var(--field-padding-x)",
          background: disabled ? "var(--surface-sunken)" : "var(--surface-card)",
          border: `1px solid ${borderColor}`,
          borderRadius: "var(--radius-md)",
          boxShadow: focus ? "var(--focus-ring)" : "none",
          fontFamily: "var(--font-sans)",
          fontSize: "var(--text-md)",
          lineHeight: "var(--leading-normal)",
          color: "var(--text-strong)",
          outline: "none",
          transition:
            "border-color var(--duration-fast) var(--ease-standard), box-shadow var(--duration-fast) var(--ease-standard)",
          opacity: disabled ? 0.6 : 1,
          ...style,
        }}
        {...rest}
      />
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
