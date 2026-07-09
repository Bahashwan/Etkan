import * as React from "react";

export interface MenuItemDef {
  /** Visible label. Ignored when `divider` is set. */
  label?: React.ReactNode;
  /** Optional leading icon. */
  icon?: React.ReactNode;
  /** Invoked when the item is activated. */
  onClick?: () => void;
  /** Destructive (red) styling. */
  danger?: boolean;
  /** Renders a separator line instead of an actionable item. */
  divider?: boolean;
  /** Disables selection & focus. */
  disabled?: boolean;
  /** Keyboard shortcut hint, aligned to the trailing edge. */
  shortcut?: string;
}

export interface MenuProps {
  /** Trigger content, or a render-prop `(open) => node` for open-aware content. */
  trigger: React.ReactNode | ((open: boolean) => React.ReactNode);
  /** Menu items in display order. */
  items: MenuItemDef[];
  /** Which inline edge the popup aligns to. Default "start". */
  align?: "start" | "end";
  style?: React.CSSProperties;
}

/**
 * ETKAN dropdown menu. Hand-rolled WAI-ARIA menu-button pattern: opens on
 * click / ArrowDown / ArrowUp, roving focus with wrap, Home/End, Escape to
 * close and restore focus, and click-outside dismissal.
 */
export function Menu({
  trigger,
  items,
  align = "start",
  style = {},
}: MenuProps): React.ReactElement {
  const [open, setOpen] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState(-1);

  const rootRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const itemRefs = React.useRef<Array<HTMLButtonElement | null>>([]);

  const menuId = React.useId();
  const triggerId = React.useId();

  const focusable = items
    .map((it, i) => (it.divider || it.disabled ? -1 : i))
    .filter((i) => i >= 0);

  const openWith = (index: number) => {
    setOpen(true);
    setActiveIndex(index);
  };

  const close = () => {
    setOpen(false);
    setActiveIndex(-1);
  };

  const closeAndRestore = () => {
    close();
    triggerRef.current?.focus();
  };

  // Move DOM focus to the active item whenever it changes while open.
  React.useLayoutEffect(() => {
    if (!open || activeIndex < 0) return;
    itemRefs.current[activeIndex]?.focus();
  }, [open, activeIndex]);

  // Dismiss on outside pointer press.
  React.useEffect(() => {
    if (!open) return;
    const onPointer = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        close();
      }
    };
    document.addEventListener("mousedown", onPointer);
    return () => document.removeEventListener("mousedown", onPointer);
  }, [open]);

  const onTriggerKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      openWith(focusable[0] ?? -1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      openWith(focusable[focusable.length - 1] ?? -1);
    } else if (e.key === "Escape" && open) {
      close();
    }
  };

  const onTriggerClick = () => {
    if (open) close();
    else openWith(focusable[0] ?? -1);
  };

  const onMenuKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (focusable.length === 0) return;
    const pos = focusable.indexOf(activeIndex);
    const moveTo = (idx: number | undefined) => {
      if (idx !== undefined) setActiveIndex(idx);
    };
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        moveTo(focusable[(pos + 1) % focusable.length]);
        break;
      case "ArrowUp":
        e.preventDefault();
        moveTo(focusable[(pos - 1 + focusable.length) % focusable.length]);
        break;
      case "Home":
        e.preventDefault();
        moveTo(focusable[0]);
        break;
      case "End":
        e.preventDefault();
        moveTo(focusable[focusable.length - 1]);
        break;
      case "Escape":
        e.preventDefault();
        closeAndRestore();
        break;
      case "Tab":
        close();
        break;
      default:
        break;
    }
  };

  const activate = (item: MenuItemDef) => {
    item.onClick?.();
    closeAndRestore();
  };

  const triggerContent =
    typeof trigger === "function" ? trigger(open) : trigger;

  return (
    <div
      ref={rootRef}
      style={{ position: "relative", display: "inline-block", ...style }}
    >
      <button
        ref={triggerRef}
        id={triggerId}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        onClick={onTriggerClick}
        onKeyDown={onTriggerKeyDown}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "var(--space-2)",
          font: "inherit",
          fontFamily: "var(--font-sans)",
          background: "transparent",
          border: "none",
          padding: 0,
          cursor: "pointer",
          color: "inherit",
        }}
      >
        {triggerContent}
      </button>

      {open && (
        <div
          id={menuId}
          role="menu"
          aria-labelledby={triggerId}
          aria-orientation="vertical"
          onKeyDown={onMenuKeyDown}
          style={{
            position: "absolute",
            insetBlockStart: "calc(100% + var(--space-2))",
            insetInlineStart: align === "start" ? 0 : "auto",
            insetInlineEnd: align === "end" ? 0 : "auto",
            minInlineSize: "12rem",
            padding: "var(--space-1)",
            background: "var(--surface-raised)",
            border: "1px solid var(--border-subtle)",
            borderRadius: "var(--radius-lg)",
            boxShadow: "var(--shadow-lg)",
            zIndex: 50,
            transformOrigin: align === "start" ? "top left" : "top right",
            animation:
              "etkan-menu-in var(--duration-fast) var(--ease-out) both",
          }}
        >
          {items.map((it, i) =>
            it.divider ? (
              <div
                key={`divider-${i}`}
                role="separator"
                style={{
                  blockSize: 1,
                  background: "var(--border-subtle)",
                  marginBlock: "var(--space-1)",
                }}
              />
            ) : (
              <MenuItem
                key={i}
                item={it}
                active={i === activeIndex}
                onActivate={() => activate(it)}
                onHover={() => setActiveIndex(i)}
                buttonRef={(node) => {
                  itemRefs.current[i] = node;
                }}
              />
            ),
          )}
          <style>{`@keyframes etkan-menu-in { from { opacity: 0; transform: scale(0.96); } to { opacity: 1; transform: scale(1); } }`}</style>
        </div>
      )}
    </div>
  );
}

interface MenuItemProps {
  item: MenuItemDef;
  active: boolean;
  onActivate: () => void;
  onHover: () => void;
  buttonRef: (node: HTMLButtonElement | null) => void;
}

function MenuItem({
  item,
  active,
  onActivate,
  onHover,
  buttonRef,
}: MenuItemProps): React.ReactElement {
  const [hover, setHover] = React.useState(false);
  const highlighted = hover || active;

  return (
    <button
      ref={buttonRef}
      type="button"
      role="menuitem"
      tabIndex={active ? 0 : -1}
      aria-disabled={item.disabled || undefined}
      disabled={item.disabled}
      onMouseEnter={() => {
        setHover(true);
        onHover();
      }}
      onMouseLeave={() => setHover(false)}
      onClick={onActivate}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--space-3)",
        inlineSize: "100%",
        padding: "var(--space-2) var(--space-3)",
        textAlign: "start",
        fontFamily: "var(--font-sans)",
        fontSize: "var(--text-md)",
        color: item.danger ? "var(--danger-solid)" : "var(--text-body)",
        background: highlighted
          ? item.danger
            ? "var(--danger-surface)"
            : "var(--surface-hover)"
          : "transparent",
        border: "none",
        borderRadius: "var(--radius-md)",
        cursor: item.disabled ? "not-allowed" : "pointer",
        opacity: item.disabled ? 0.5 : 1,
        transition: "background var(--duration-instant) var(--ease-standard)",
      }}
    >
      {item.icon && (
        <span
          aria-hidden="true"
          style={{
            display: "inline-flex",
            color: item.danger ? "inherit" : "var(--text-muted)",
          }}
        >
          {item.icon}
        </span>
      )}
      <span style={{ flex: 1 }}>{item.label}</span>
      {item.shortcut && (
        <span
          aria-hidden="true"
          style={{
            fontSize: "var(--text-sm)",
            color: "var(--text-subtle)",
          }}
        >
          {item.shortcut}
        </span>
      )}
    </button>
  );
}
