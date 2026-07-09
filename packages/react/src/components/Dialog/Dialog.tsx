import * as React from "react";
import { createPortal } from "react-dom";

type Phase = "closed" | "entering" | "open" | "exiting";

function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/** Drives closed → entering → open → exiting, unmounting only after the exit finishes. */
function useMountTransition(open: boolean, duration: number) {
  const [phase, setPhase] = React.useState<Phase>(open ? "open" : "closed");

  React.useEffect(() => {
    if (prefersReducedMotion()) {
      setPhase(open ? "open" : "closed");
      return;
    }
    if (open) {
      setPhase((p) => (p === "open" ? "open" : "entering"));
      const raf = requestAnimationFrame(() => setPhase("open"));
      return () => cancelAnimationFrame(raf);
    }
    setPhase((p) => (p === "closed" ? "closed" : "exiting"));
    const t = window.setTimeout(() => setPhase("closed"), duration);
    return () => window.clearTimeout(t);
  }, [open, duration]);

  return { phase, mounted: phase !== "closed" } as const;
}

const FOCUSABLE =
  'a[href],button:not([disabled]),textarea:not([disabled]),input:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])';

function getFocusable(root: HTMLElement): HTMLElement[] {
  return Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE));
}

const DIALOG_MS = 200;
const SIZE_MAX = { sm: "380px", md: "520px", lg: "720px" } as const;

export interface DialogProps {
  /** Controls visibility; animates out then unmounts when false. */
  open: boolean;
  /** Requested when the user dismisses via Escape, backdrop or a close control. */
  onClose?: () => void;
  /** Accessible title; wired to the dialog via aria-labelledby. */
  title?: React.ReactNode;
  /** Supporting text; wired via aria-describedby. */
  description?: React.ReactNode;
  /** Body content. */
  children?: React.ReactNode;
  /** Footer slot — typically the action buttons. */
  footer?: React.ReactNode;
  /** Panel max-width preset. Default "md". */
  size?: "sm" | "md" | "lg";
  /** Close when the backdrop is clicked. Default true. */
  closeOnBackdrop?: boolean;
  /** Extra styles merged onto the panel. */
  style?: React.CSSProperties;
}

/**
 * Modal dialog rendered through a portal. Traps focus, restores it to the opener
 * on close, locks body scroll, and animates the backdrop fade plus panel scale.
 */
export function Dialog({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  size = "md",
  closeOnBackdrop = true,
  style = {},
}: DialogProps) {
  const { phase, mounted } = useMountTransition(open, DIALOG_MS);
  const titleId = React.useId();
  const descId = React.useId();
  const panelRef = React.useRef<HTMLDivElement>(null);
  const openerRef = React.useRef<Element | null>(null);

  // Capture the element to return focus to before we move focus into the panel.
  React.useEffect(() => {
    if (open) openerRef.current = document.activeElement;
  }, [open]);

  // Focus the panel while mounted; restore focus to the opener once it unmounts.
  React.useEffect(() => {
    if (!mounted) return;
    const panel = panelRef.current;
    const focusables = panel ? getFocusable(panel) : [];
    (focusables[0] ?? panel)?.focus();
    return () => {
      const opener = openerRef.current as HTMLElement | null;
      if (opener && typeof opener.focus === "function") opener.focus();
    };
  }, [mounted]);

  // Body scroll lock while mounted.
  React.useEffect(() => {
    if (!mounted) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mounted]);

  // Escape to close, Tab/Shift+Tab cycle within the panel.
  React.useEffect(() => {
    if (!mounted) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose?.();
        return;
      }
      if (e.key !== "Tab") return;
      const panel = panelRef.current;
      if (!panel) return;
      const f = getFocusable(panel);
      if (f.length === 0) {
        e.preventDefault();
        panel.focus();
        return;
      }
      const first = f[0]!;
      const last = f[f.length - 1]!;
      const active = document.activeElement;
      if (e.shiftKey) {
        if (active === first || !panel.contains(active)) {
          e.preventDefault();
          last.focus();
        }
      } else if (active === last || !panel.contains(active)) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey, true);
    return () => document.removeEventListener("keydown", onKey, true);
  }, [mounted, onClose]);

  if (!mounted) return null;

  return createPortal(
    <div
      onMouseDown={(e) => {
        if (closeOnBackdrop && e.target === e.currentTarget) onClose?.();
      }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "var(--space-4)",
        background: "var(--surface-overlay)",
        backdropFilter: "blur(2px)",
        opacity: phase === "open" ? 1 : 0,
        transition: "opacity var(--duration-base) var(--ease-out)",
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-describedby={description ? descId : undefined}
        tabIndex={-1}
        style={{
          inlineSize: "100%",
          maxInlineSize: SIZE_MAX[size],
          maxBlockSize: "calc(100vh - var(--space-8))",
          display: "flex",
          flexDirection: "column",
          background: "var(--surface-card)",
          border: "1px solid var(--border-subtle)",
          borderRadius: "var(--radius-xl)",
          boxShadow: "var(--shadow-xl)",
          fontFamily: "var(--font-sans)",
          outline: "none",
          opacity: phase === "open" ? 1 : 0,
          transform: phase === "open" ? "scale(1)" : "scale(0.96)",
          transition:
            "opacity var(--duration-base) var(--ease-out), transform var(--duration-base) var(--ease-out)",
          ...style,
        }}
      >
        {(title || description) && (
          <div
            style={{
              paddingBlockStart: "var(--space-5)",
              paddingBlockEnd: "var(--space-3)",
              paddingInline: "var(--space-6)",
            }}
          >
            {title && (
              <h2
                id={titleId}
                style={{
                  fontSize: "var(--text-xl)",
                  fontWeight: "var(--fw-semibold)" as React.CSSProperties["fontWeight"],
                  color: "var(--text-strong)",
                }}
              >
                {title}
              </h2>
            )}
            {description && (
              <p
                id={descId}
                style={{
                  marginBlockStart: "var(--space-2)",
                  fontSize: "var(--text-md)",
                  color: "var(--text-muted)",
                }}
              >
                {description}
              </p>
            )}
          </div>
        )}
        {children && (
          <div
            style={{
              paddingBlock: "var(--space-2)",
              paddingInline: "var(--space-6)",
              overflowY: "auto",
            }}
          >
            {children}
          </div>
        )}
        {footer && (
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "var(--space-3)",
              paddingBlockStart: "var(--space-5)",
              paddingBlockEnd: "var(--space-5)",
              paddingInline: "var(--space-6)",
            }}
          >
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}
