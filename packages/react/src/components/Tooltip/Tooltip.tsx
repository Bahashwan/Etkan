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

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

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

function assignRef<T>(ref: React.Ref<T> | undefined, value: T | null) {
  if (typeof ref === "function") ref(value);
  else if (ref && typeof ref === "object") {
    (ref as React.MutableRefObject<T | null>).current = value;
  }
}

const GAP = 8;
const TOOLTIP_MS = 140;

export interface TooltipProps {
  /** Tooltip contents. When empty nothing is shown. */
  content: React.ReactNode;
  /** Logical side; "start"/"end" flip under RTL. Default "top". */
  side?: "top" | "bottom" | "start" | "end";
  /** Delay in ms after hover before showing (focus is always instant). Default 300. */
  openDelay?: number;
  /** The single trigger element; receives ref, handlers and aria-describedby. */
  children: React.ReactElement;
  /** Extra styles merged onto the tooltip bubble. */
  style?: React.CSSProperties;
}

interface Pos {
  top: number;
  left: number;
  tBase: string;
  tHidden: string;
}

/**
 * Hover/focus tooltip wrapping a single child. Portalled and hand-positioned
 * against the trigger; logical `side` values flip under RTL.
 */
export function Tooltip({
  content,
  side = "top",
  openDelay = 300,
  children,
  style = {},
}: TooltipProps) {
  const id = React.useId();
  const triggerRef = React.useRef<HTMLElement | null>(null);
  const delayTimer = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const [open, setOpen] = React.useState(false);
  const [pos, setPos] = React.useState<Pos | null>(null);
  const { phase, mounted } = useMountTransition(open, TOOLTIP_MS);

  const clearDelay = () => window.clearTimeout(delayTimer.current);
  const showDelayed = () => {
    clearDelay();
    delayTimer.current = setTimeout(() => setOpen(true), openDelay);
  };
  const showNow = () => {
    clearDelay();
    setOpen(true);
  };
  const hide = () => {
    clearDelay();
    setOpen(false);
  };
  React.useEffect(() => clearDelay, []);

  const measure = React.useCallback(() => {
    const el = triggerRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const dir =
      typeof window !== "undefined" &&
      window.getComputedStyle(el).direction === "rtl"
        ? "rtl"
        : "ltr";
    const physical =
      side === "start"
        ? dir === "rtl"
          ? "right"
          : "left"
        : side === "end"
          ? dir === "rtl"
            ? "left"
            : "right"
          : side;
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    let top = 0;
    let left = 0;
    let tBase = "";
    let tHidden = "";
    switch (physical) {
      case "bottom":
        top = r.bottom + GAP;
        left = cx;
        tBase = "translate(-50%, 0)";
        tHidden = " translateY(-4px)";
        break;
      case "left":
        top = cy;
        left = r.left - GAP;
        tBase = "translate(-100%, -50%)";
        tHidden = " translateX(4px)";
        break;
      case "right":
        top = cy;
        left = r.right + GAP;
        tBase = "translate(0, -50%)";
        tHidden = " translateX(-4px)";
        break;
      case "top":
      default:
        top = r.top - GAP;
        left = cx;
        tBase = "translate(-50%, -100%)";
        tHidden = " translateY(4px)";
        break;
    }
    setPos({ top, left, tBase, tHidden });
  }, [side]);

  useIsomorphicLayoutEffect(() => {
    if (mounted) measure();
  }, [mounted, measure]);

  const child = React.Children.only(children) as React.ReactElement<
    Record<string, unknown>
  >;
  const childRef = (child.props as { ref?: React.Ref<HTMLElement> }).ref;
  const childDescribed = child.props["aria-describedby"] as string | undefined;

  const trigger = React.cloneElement(child, {
    ref: (node: HTMLElement | null) => {
      triggerRef.current = node;
      assignRef(childRef, node);
    },
    "aria-describedby":
      mounted && content
        ? [childDescribed, id].filter(Boolean).join(" ")
        : childDescribed,
    onMouseEnter: (e: React.MouseEvent) => {
      (child.props.onMouseEnter as ((e: React.MouseEvent) => void) | undefined)?.(e);
      showDelayed();
    },
    onMouseLeave: (e: React.MouseEvent) => {
      (child.props.onMouseLeave as ((e: React.MouseEvent) => void) | undefined)?.(e);
      hide();
    },
    onFocus: (e: React.FocusEvent) => {
      (child.props.onFocus as ((e: React.FocusEvent) => void) | undefined)?.(e);
      showNow();
    },
    onBlur: (e: React.FocusEvent) => {
      (child.props.onBlur as ((e: React.FocusEvent) => void) | undefined)?.(e);
      hide();
    },
    onKeyDown: (e: React.KeyboardEvent) => {
      (child.props.onKeyDown as ((e: React.KeyboardEvent) => void) | undefined)?.(e);
      if (e.key === "Escape") hide();
    },
  } as Record<string, unknown>);

  return (
    <>
      {trigger}
      {mounted && content
        ? createPortal(
            <span
              role="tooltip"
              id={id}
              style={{
                // Hand-computed viewport coordinates → physical top/left is required.
                position: "fixed",
                top: pos?.top ?? 0,
                left: pos?.left ?? 0,
                zIndex: 150,
                pointerEvents: "none",
                maxInlineSize: "260px",
                paddingBlock: "var(--space-1)",
                paddingInline: "var(--space-2)",
                background: "var(--surface-inverse)",
                color: "var(--text-inverse)",
                fontFamily: "var(--font-sans)",
                fontSize: "var(--text-xs)",
                fontWeight: "var(--fw-medium)" as React.CSSProperties["fontWeight"],
                lineHeight: 1.4,
                borderRadius: "var(--radius-sm)",
                boxShadow: "var(--shadow-md)",
                opacity: phase === "open" ? 1 : 0,
                transform: (pos?.tBase ?? "") + (phase === "open" ? "" : pos?.tHidden ?? ""),
                transition:
                  "opacity var(--duration-fast) var(--ease-out), transform var(--duration-fast) var(--ease-out)",
                ...style,
              }}
            >
              {content}
            </span>,
            document.body,
          )
        : null}
    </>
  );
}
