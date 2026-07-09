import * as React from "react";

export interface TabItem {
  /** Stable identifier for the tab. */
  value: string;
  /** Visible tab label. */
  label: React.ReactNode;
  /** Optional leading icon. */
  icon?: React.ReactNode;
  /** Panel content rendered when this tab is active. */
  content?: React.ReactNode;
  /** Removes the tab from selection and focus order. */
  disabled?: boolean;
}

export interface TabsProps {
  /** Tab definitions, rendered in order. */
  items: TabItem[];
  /** Controlled active value. */
  value?: string;
  /** Initial value when uncontrolled. */
  defaultValue?: string;
  /** Fires with the newly selected value. */
  onChange?: (value: string) => void;
  /** Visual style of the tab bar. Default "underline". */
  variant?: "underline" | "pills";
  /** Accessible label for the tablist. */
  "aria-label"?: string;
  style?: React.CSSProperties;
}

/** Resolve the effective writing direction for an element (RTL/LTR). */
function resolveDir(el: HTMLElement | null): "rtl" | "ltr" {
  if (!el) return "ltr";
  const scoped = el.closest("[dir]");
  const attr = scoped?.getAttribute("dir");
  if (attr === "rtl" || attr === "ltr") return attr;
  const computed =
    typeof window !== "undefined" ? window.getComputedStyle(el).direction : "";
  return computed === "rtl" ? "rtl" : "ltr";
}

/**
 * ETKAN tab bar. Roving-tabindex keyboard model with a sliding active
 * indicator. Logical CSS throughout so it mirrors correctly under RTL.
 */
export function Tabs({
  items,
  value,
  defaultValue,
  onChange,
  variant = "underline",
  style = {},
  ...rest
}: TabsProps): React.ReactElement {
  const ariaLabel = rest["aria-label"];
  const baseId = React.useId();
  const [internal, setInternal] = React.useState(
    defaultValue ?? items.find((it) => !it.disabled)?.value ?? items[0]?.value,
  );
  const active = value !== undefined ? value : internal;

  const listRef = React.useRef<HTMLDivElement>(null);
  const tabRefs = React.useRef<Array<HTMLButtonElement | null>>([]);

  const activeIndex = Math.max(
    0,
    items.findIndex((it) => it.value === active),
  );
  const isPills = variant === "pills";

  const tabId = (i: number) => `${baseId}-tab-${i}`;
  const panelId = (i: number) => `${baseId}-panel-${i}`;

  const select = (v: string) => {
    if (value === undefined) setInternal(v);
    onChange?.(v);
  };

  const [indicator, setIndicator] = React.useState({
    inlineStart: 0,
    inlineSize: 0,
    ready: false,
  });

  React.useLayoutEffect(() => {
    if (isPills) return;
    const list = listRef.current;
    const el = tabRefs.current[activeIndex];
    if (!list || !el) return;
    const cr = list.getBoundingClientRect();
    const tr = el.getBoundingClientRect();
    const rtl = resolveDir(list) === "rtl";
    const inlineStart = rtl ? cr.right - tr.right : tr.left - cr.left;
    setIndicator({ inlineStart, inlineSize: tr.width, ready: true });
  }, [activeIndex, items, isPills]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    const enabled = items
      .map((it, i) => (it.disabled ? -1 : i))
      .filter((i) => i >= 0);
    if (enabled.length === 0) return;

    const rtl = resolveDir(listRef.current) === "rtl";
    const pos = enabled.indexOf(activeIndex);
    const forward = enabled[(pos + 1) % enabled.length];
    const backward = enabled[(pos - 1 + enabled.length) % enabled.length];

    let next: number | undefined;
    switch (e.key) {
      case "ArrowRight":
        next = rtl ? backward : forward;
        break;
      case "ArrowLeft":
        next = rtl ? forward : backward;
        break;
      case "Home":
        next = enabled[0];
        break;
      case "End":
        next = enabled[enabled.length - 1];
        break;
      default:
        return;
    }
    const target = next === undefined ? undefined : items[next];
    if (next === undefined || !target) return;
    e.preventDefault();
    select(target.value);
    tabRefs.current[next]?.focus();
  };

  return (
    <div style={{ ...style }}>
      <div
        ref={listRef}
        role="tablist"
        aria-label={ariaLabel}
        style={{
          position: "relative",
          display: "inline-flex",
          gap: "var(--space-1)",
          padding: isPills ? "var(--space-1)" : 0,
          background: isPills ? "var(--surface-sunken)" : "transparent",
          borderRadius: isPills ? "var(--radius-lg)" : 0,
          borderBlockEnd: isPills
            ? "none"
            : "1px solid var(--border-subtle)",
        }}
      >
        {items.map((it, i) => {
          const on = it.value === active;
          return (
            <button
              key={it.value}
              ref={(node) => {
                tabRefs.current[i] = node;
              }}
              id={tabId(i)}
              role="tab"
              type="button"
              aria-selected={on}
              aria-controls={panelId(i)}
              aria-disabled={it.disabled || undefined}
              tabIndex={on ? 0 : -1}
              disabled={it.disabled}
              onClick={() => !it.disabled && select(it.value)}
              onKeyDown={handleKeyDown}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "var(--space-2)",
                padding: isPills
                  ? "var(--space-2) var(--space-4)"
                  : "var(--space-3) var(--space-3)",
                marginBlockEnd: isPills ? 0 : "-1px",
                fontFamily: "var(--font-sans)",
                fontSize: "var(--text-md)",
                fontWeight: on
                  ? ("var(--fw-semibold)" as React.CSSProperties["fontWeight"])
                  : ("var(--fw-medium)" as React.CSSProperties["fontWeight"]),
                color: on
                  ? isPills
                    ? "var(--text-strong)"
                    : "var(--brand-primary)"
                  : "var(--text-muted)",
                background: isPills && on ? "var(--surface-card)" : "transparent",
                border: "none",
                borderBlockEnd: isPills ? "none" : "2px solid transparent",
                borderRadius: isPills ? "var(--radius-md)" : 0,
                boxShadow: isPills && on ? "var(--shadow-md)" : "none",
                cursor: it.disabled ? "not-allowed" : "pointer",
                opacity: it.disabled ? 0.5 : 1,
                whiteSpace: "nowrap",
                transition:
                  "color var(--duration-fast) var(--ease-standard), background var(--duration-fast) var(--ease-standard)",
              }}
            >
              {it.icon}
              {it.label}
            </button>
          );
        })}
        {!isPills && indicator.ready && (
          <span
            aria-hidden="true"
            style={{
              position: "absolute",
              insetBlockEnd: 0,
              insetInlineStart: indicator.inlineStart,
              inlineSize: indicator.inlineSize,
              blockSize: 2,
              background: "var(--brand-primary)",
              borderStartStartRadius: "var(--radius-sm)",
              borderStartEndRadius: "var(--radius-sm)",
              transition:
                "inset-inline-start var(--duration-base) var(--ease-out), inline-size var(--duration-base) var(--ease-out)",
            }}
          />
        )}
      </div>

      {items.map((it, i) => (
        <div
          key={it.value}
          id={panelId(i)}
          role="tabpanel"
          aria-labelledby={tabId(i)}
          hidden={it.value !== active}
          tabIndex={0}
          style={{
            paddingBlock: "var(--space-4)",
            fontFamily: "var(--font-sans)",
            fontSize: "var(--text-md)",
            color: "var(--text-body)",
          }}
        >
          {it.content}
        </div>
      ))}
    </div>
  );
}
