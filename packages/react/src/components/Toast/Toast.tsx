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

const TOAST_MS = 200;

const TONES: Record<
  NonNullable<ToastProps["tone"]>,
  { color: string; path: string }
> = {
  info: {
    color: "var(--info-solid)",
    path: "M12 16v-4M12 8h.01M12 22a10 10 0 100-20 10 10 0 000 20z",
  },
  success: { color: "var(--success-solid)", path: "M20 6L9 17l-5-5" },
  danger: { color: "var(--danger-solid)", path: "M18 6L6 18M6 6l12 12" },
};

export interface ToastProps {
  /** Controls visibility; animates out then unmounts when false. */
  open: boolean;
  /** Fired by the auto-dismiss timer and the close button. */
  onDismiss?: () => void;
  /** Semantic tone. "danger" upgrades the live region to role="alert". Default "info". */
  tone?: "info" | "success" | "danger";
  /** Primary line. */
  title?: React.ReactNode;
  /** Secondary line. */
  message?: React.ReactNode;
  /** Optional inline action (e.g. an Undo button). */
  action?: React.ReactNode;
  /** Auto-dismiss delay in ms; 0 disables. Default 5000. */
  duration?: number;
  /** Fixed viewport corner. Default "bottom-end". */
  placement?: "top-start" | "top-end" | "bottom-start" | "bottom-end";
  /** Accessible name for the dismiss button. Default "Dismiss". */
  dismissLabel?: string;
  /** Extra styles merged onto the toast card. */
  style?: React.CSSProperties;
}

/**
 * Self-portalling toast. Slides in from the block-end with a fade, auto-dismisses
 * on a timer that pauses while hovered, and animates out before unmounting.
 */
export function Toast({
  open,
  onDismiss,
  tone = "info",
  title,
  message,
  action,
  duration = 5000,
  placement = "bottom-end",
  dismissLabel = "Dismiss",
  style = {},
}: ToastProps) {
  const { phase, mounted } = useMountTransition(open, TOAST_MS);
  const [paused, setPaused] = React.useState(false);
  const remaining = React.useRef(duration);
  const startedAt = React.useRef(0);

  // Keep the full delay ready whenever the toast is not actively counting down.
  React.useEffect(() => {
    if (phase !== "open") remaining.current = duration;
  }, [phase, duration]);

  // Auto-dismiss countdown, pausable via hover (remaining time is preserved).
  React.useEffect(() => {
    if (phase !== "open" || paused || duration <= 0) return;
    startedAt.current = Date.now();
    const t = window.setTimeout(() => onDismiss?.(), remaining.current);
    return () => {
      window.clearTimeout(t);
      remaining.current = Math.max(0, remaining.current - (Date.now() - startedAt.current));
    };
  }, [phase, paused, duration, onDismiss]);

  if (!mounted) return null;

  const [vSide, hSide] = placement.split("-");
  const hiddenShift = vSide === "top" ? "translateY(-12px)" : "translateY(12px)";
  const t = TONES[tone];

  return createPortal(
    <div
      style={{
        position: "fixed",
        zIndex: 200,
        insetBlockStart: vSide === "top" ? "var(--space-5)" : "auto",
        insetBlockEnd: vSide === "bottom" ? "var(--space-5)" : "auto",
        insetInlineStart: hSide === "start" ? "var(--space-5)" : "auto",
        insetInlineEnd: hSide === "end" ? "var(--space-5)" : "auto",
      }}
    >
      <div
        role={tone === "danger" ? "alert" : "status"}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "var(--space-3)",
          inlineSize: "340px",
          maxInlineSize: "calc(100vw - var(--space-8))",
          paddingBlock: "var(--space-3)",
          paddingInline: "var(--space-4)",
          background: "var(--surface-raised)",
          border: "1px solid var(--border-subtle)",
          borderRadius: "var(--radius-lg)",
          boxShadow: "var(--shadow-lg)",
          fontFamily: "var(--font-sans)",
          opacity: phase === "open" ? 1 : 0,
          transform: phase === "open" ? "translateY(0)" : hiddenShift,
          transition:
            "opacity var(--duration-base) var(--ease-out), transform var(--duration-base) var(--ease-out)",
          ...style,
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke={t.color}
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          style={{ flexShrink: 0, marginBlockStart: 1 }}
        >
          <path d={t.path} />
        </svg>
        <div style={{ flex: 1, minInlineSize: 0 }}>
          {title && (
            <div
              style={{
                fontSize: "var(--text-md)",
                fontWeight: "var(--fw-semibold)" as React.CSSProperties["fontWeight"],
                color: "var(--text-strong)",
              }}
            >
              {title}
            </div>
          )}
          {message && (
            <div
              style={{
                fontSize: "var(--text-sm)",
                color: "var(--text-muted)",
                marginBlockStart: title ? 2 : 0,
              }}
            >
              {message}
            </div>
          )}
          {action && <div style={{ marginBlockStart: "var(--space-2)" }}>{action}</div>}
        </div>
        {onDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            aria-label={dismissLabel}
            style={{
              border: "none",
              background: "transparent",
              color: "var(--text-muted)",
              cursor: "pointer",
              fontSize: 18,
              lineHeight: 1,
              padding: 2,
              flexShrink: 0,
            }}
          >
            &times;
          </button>
        )}
      </div>
    </div>,
    document.body,
  );
}
