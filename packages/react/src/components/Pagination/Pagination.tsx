import * as React from "react";

export interface PaginationProps {
  /** Current 1-based page. */
  page: number;
  /** Total number of pages. */
  pageCount: number;
  /** Fires with the requested page when a control is activated. */
  onChange?: (page: number) => void;
  /** Pages shown either side of the current one before truncating. Default 1. */
  siblingCount?: number;
  /** Accessible name for the nav landmark. Default "Pagination". */
  label?: string;
  /** Accessible label for the previous-page control. Default "Previous page". */
  previousLabel?: string;
  /** Accessible label for the next-page control. Default "Next page". */
  nextLabel?: string;
  style?: React.CSSProperties;
}

type Item = number | "ellipsis";

/**
 * Page navigator. Prev/next chevrons are direction-aware (mirror under RTL).
 */
export function Pagination({
  page = 1,
  pageCount = 1,
  onChange,
  siblingCount = 1,
  label = "Pagination",
  previousLabel = "Previous page",
  nextLabel = "Next page",
  style = {},
}: PaginationProps) {
  const go = (p: number) => {
    if (p >= 1 && p <= pageCount && p !== page) onChange?.(p);
  };
  const items = pageRange(page, pageCount, siblingCount);

  return (
    <nav
      aria-label={label}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "var(--space-1)",
        fontFamily: "var(--font-sans)",
        ...style,
      }}
    >
      <PageButton
        disabled={page <= 1}
        onClick={() => go(page - 1)}
        aria-label={previousLabel}
      >
        <Chevron dir="prev" />
      </PageButton>

      {items.map((item, i) =>
        item === "ellipsis" ? (
          <span
            key={`ellipsis-${i}`}
            aria-hidden="true"
            style={{ paddingInline: "var(--space-1)", color: "var(--text-subtle)" }}
          >
            …
          </span>
        ) : (
          <PageButton
            key={item}
            active={item === page}
            onClick={() => go(item)}
            aria-label={`Page ${item}`}
          >
            {item}
          </PageButton>
        ),
      )}

      <PageButton disabled={page >= pageCount} onClick={() => go(page + 1)} aria-label={nextLabel}>
        <Chevron dir="next" />
      </PageButton>
    </nav>
  );
}

interface PageButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

function PageButton({ active = false, disabled, children, ...rest }: PageButtonProps) {
  const [hover, setHover] = React.useState(false);
  const hovering = hover && !disabled && !active;

  return (
    <button
      type="button"
      disabled={disabled}
      aria-current={active ? "page" : undefined}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        minInlineSize: "2rem",
        blockSize: "2rem",
        paddingInline: "var(--space-2)",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "var(--font-sans)",
        fontSize: "var(--text-sm)",
        fontWeight: (active
          ? "var(--fw-semibold)"
          : "var(--fw-regular)") as React.CSSProperties["fontWeight"],
        color: active
          ? "var(--text-on-primary)"
          : disabled
            ? "var(--text-subtle)"
            : "var(--text-body)",
        background: active
          ? "var(--brand-primary)"
          : hovering
            ? "var(--surface-hover)"
            : "transparent",
        border: `1px solid ${active ? "transparent" : "var(--border-default)"}`,
        borderRadius: "var(--radius-md)",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        transition: "background var(--duration-fast) var(--ease-standard)",
      }}
      {...rest}
    >
      {children}
    </button>
  );
}

function Chevron({ dir }: { dir: "prev" | "next" }) {
  return (
    <svg
      className="etkan-mirror"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={dir === "prev" ? "M15 18l-6-6 6-6" : "M9 18l6-6-6-6"} />
    </svg>
  );
}

function pageRange(page: number, count: number, sib: number): Item[] {
  const total = sib * 2 + 5;
  if (count <= total) {
    return Array.from({ length: count }, (_, i) => i + 1);
  }
  const left = Math.max(page - sib, 1);
  const right = Math.min(page + sib, count);
  const showL = left > 2;
  const showR = right < count - 1;
  const out: Item[] = [1];
  if (showL) out.push("ellipsis");
  for (let i = Math.max(2, left); i <= Math.min(count - 1, right); i++) out.push(i);
  if (showR) out.push("ellipsis");
  out.push(count);
  return out;
}
