import { LitElement, html, css, nothing } from "lit";
import { base } from "../shared";

/**
 * `<etkan-pagination>` — the ETKAN page navigator.
 * Attributes: page (Number), page-count (Number), sibling-count (Number, default 1).
 * Renders a Previous control, page-number buttons with `…` truncation driven by
 * `sibling-count`, and a Next control. Dispatches `etkan-change` with
 * `detail { page }` when a page is chosen. Chevrons mirror automatically under RTL.
 */
export class EtkanPagination extends LitElement {
  static properties = {
    page: { type: Number },
    pageCount: { type: Number, attribute: "page-count" },
    siblingCount: { type: Number, attribute: "sibling-count" },
  };

  declare page: number;
  declare pageCount: number;
  declare siblingCount: number;

  constructor() {
    super();
    this.page = 1;
    this.pageCount = 1;
    this.siblingCount = 1;
  }

  static styles = [
    base,
    css`
      :host {
        display: block;
      }
      nav {
        display: flex;
        align-items: center;
        gap: var(--space-1);
        flex-wrap: wrap;
      }
      button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: var(--space-1);
        min-inline-size: var(--control-height-md);
        block-size: var(--control-height-md);
        padding-inline: var(--space-3);
        border: 1px solid var(--border-default);
        border-radius: var(--radius-md);
        background: var(--surface-card);
        color: var(--text-body);
        font-family: inherit;
        font-size: var(--text-sm);
        font-weight: var(--fw-medium);
        line-height: 1;
        cursor: pointer;
        transition:
          background var(--duration-fast) var(--ease-standard),
          border-color var(--duration-fast) var(--ease-standard),
          box-shadow var(--duration-fast) var(--ease-standard);
      }
      button:hover:not([disabled]):not([aria-current="page"]) {
        background: var(--surface-hover);
        border-color: var(--border-strong);
      }
      button:focus-visible {
        outline: none;
        box-shadow: var(--focus-ring);
      }
      button[disabled] {
        opacity: 0.5;
        cursor: not-allowed;
      }
      button[aria-current="page"] {
        background: var(--brand-primary);
        color: var(--text-on-primary);
        border-color: var(--brand-primary);
        font-weight: var(--fw-semibold);
      }

      .edge {
        padding-inline: var(--space-2);
      }

      .chev {
        display: inline-flex;
        inline-size: 1em;
        block-size: 1em;
      }
      /* Chevrons mirror automatically for RTL reading order. */
      :host-context([dir="rtl"]) .chev {
        transform: scaleX(-1);
      }
      .chev svg {
        inline-size: 100%;
        block-size: 100%;
      }

      .ellipsis {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-inline-size: var(--control-height-md);
        block-size: var(--control-height-md);
        color: var(--text-muted);
        font-size: var(--text-sm);
        user-select: none;
      }
    `,
  ];

  private _clamp(page: number): number {
    const max = Math.max(1, Math.floor(this.pageCount));
    if (page < 1) return 1;
    if (page > max) return max;
    return page;
  }

  private _goto(page: number) {
    const max = Math.max(1, Math.floor(this.pageCount));
    const next = this._clamp(page);
    if (next === this.page || next < 1 || next > max) return;
    this.page = next;
    this.dispatchEvent(
      new CustomEvent("etkan-change", {
        detail: { page: next },
        bubbles: true,
        composed: true,
      })
    );
  }

  /** Build the list of visible page slots, using -1 as the truncation marker. */
  private _range(): number[] {
    const total = Math.max(1, Math.floor(this.pageCount));
    const current = this._clamp(this.page);
    const siblings = Math.max(0, Math.floor(this.siblingCount));

    // First page, last page, current +/- siblings, plus one ellipsis boundary
    // on each side: if everything fits, list every page instead of truncating.
    const totalSlots = siblings * 2 + 5;
    if (totalSlots >= total) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    const leftSibling = Math.max(current - siblings, 1);
    const rightSibling = Math.min(current + siblings, total);

    const showLeftDots = leftSibling > 2;
    const showRightDots = rightSibling < total - 1;

    const pages: number[] = [];
    pages.push(1);

    if (showLeftDots) {
      pages.push(-1);
    } else {
      for (let p = 2; p < leftSibling; p++) pages.push(p);
    }

    for (let p = leftSibling; p <= rightSibling; p++) {
      if (p !== 1 && p !== total) pages.push(p);
    }

    if (showRightDots) {
      pages.push(-1);
    } else {
      for (let p = rightSibling + 1; p < total; p++) pages.push(p);
    }

    if (total > 1) pages.push(total);

    return pages;
  }

  render() {
    const total = Math.max(1, Math.floor(this.pageCount));
    const current = this._clamp(this.page);
    const atStart = current <= 1;
    const atEnd = current >= total;
    const slots = this._range();

    return html`
      <nav part="pagination" role="navigation" aria-label="Pagination">
        <button
          part="prev"
          class="edge"
          type="button"
          ?disabled=${atStart}
          aria-label="Previous page"
          @click=${() => this._goto(current - 1)}
        >
          <span class="chev" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M15 18l-6-6 6-6"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
        </button>

        ${slots.map((slot, i) =>
          slot === -1
            ? html`<span class="ellipsis" aria-hidden="true" data-index=${i}>…</span>`
            : html`
                <button
                  part="page"
                  type="button"
                  aria-current=${slot === current ? "page" : nothing}
                  aria-label=${`Page ${slot}`}
                  @click=${() => this._goto(slot)}
                >
                  ${slot}
                </button>
              `
        )}

        <button
          part="next"
          class="edge"
          type="button"
          ?disabled=${atEnd}
          aria-label="Next page"
          @click=${() => this._goto(current + 1)}
        >
          <span class="chev" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M9 18l6-6-6-6"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
        </button>
      </nav>
    `;
  }
}

if (!customElements.get("etkan-pagination")) {
  customElements.define("etkan-pagination", EtkanPagination);
}
