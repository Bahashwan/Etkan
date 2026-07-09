import { LitElement, html, css } from "lit";
import { base } from "../shared";

/**
 * `<etkan-card>` — a surface container.
 * Attributes: variant (elevated|outlined), padding (none|sm|md|lg), interactive.
 * Slots: `header` and `footer` are separated from the default body slot by
 * 1px `--border-subtle` dividers; the unnamed `<slot>` is the body.
 * Dispatches `etkan-card-click` (bubbles, composed) when interactive and activated.
 */
export class EtkanCard extends LitElement {
  static properties = {
    variant: { type: String, reflect: true },
    padding: { type: String, reflect: true },
    interactive: { type: Boolean, reflect: true },
    _hasHeader: { state: true },
    _hasFooter: { state: true },
  };

  declare variant: "elevated" | "outlined";
  declare padding: "none" | "sm" | "md" | "lg";
  declare interactive: boolean;
  declare _hasHeader: boolean;
  declare _hasFooter: boolean;

  constructor() {
    super();
    this.variant = "elevated";
    this.padding = "md";
    this.interactive = false;
    this._hasHeader = false;
    this._hasFooter = false;
  }

  static styles = [
    base,
    css`
      :host {
        display: block;
      }

      .card {
        display: flex;
        flex-direction: column;
        border: 1px solid transparent;
        border-radius: var(--radius-lg);
        background: var(--surface-card);
        color: var(--text-body);
        overflow: hidden;
        transition:
          transform var(--duration-fast) var(--ease-standard),
          box-shadow var(--duration-fast) var(--ease-standard),
          border-color var(--duration-fast) var(--ease-standard);
      }

      .card[data-variant="elevated"] {
        border-color: var(--border-subtle);
        box-shadow: var(--shadow-sm);
      }
      .card[data-variant="outlined"] {
        border-color: var(--border-default);
        box-shadow: none;
      }

      .card[data-interactive] {
        cursor: pointer;
      }
      .card[data-interactive]:hover {
        transform: translateY(-1px);
        box-shadow: var(--shadow-md);
      }
      .card[data-interactive]:active {
        transform: translateY(0);
      }
      .card[data-interactive]:focus-visible {
        outline: none;
        box-shadow: var(--focus-ring);
      }

      .header,
      .body,
      .footer {
        display: block;
      }

      /* Empty header/footer regions collapse entirely — no divider, no padding. */
      .header:not([data-filled]),
      .footer:not([data-filled]) {
        display: none;
      }
      .header[data-filled] {
        border-block-end: 1px solid var(--border-subtle);
      }
      .footer[data-filled] {
        border-block-start: 1px solid var(--border-subtle);
      }

      /* Padding scale applied to each region. */
      .card[data-padding="none"] .header,
      .card[data-padding="none"] .body,
      .card[data-padding="none"] .footer {
        padding: 0;
      }
      .card[data-padding="sm"] .header,
      .card[data-padding="sm"] .body,
      .card[data-padding="sm"] .footer {
        padding-block: var(--space-2);
        padding-inline: var(--space-3);
      }
      .card[data-padding="md"] .header,
      .card[data-padding="md"] .body,
      .card[data-padding="md"] .footer {
        padding-block: var(--space-4);
        padding-inline: var(--space-4);
      }
      .card[data-padding="lg"] .header,
      .card[data-padding="lg"] .body,
      .card[data-padding="lg"] .footer {
        padding-block: var(--space-6);
        padding-inline: var(--space-6);
      }

      @media (prefers-reduced-motion: reduce) {
        .card {
          transition: none;
        }
        .card[data-interactive]:hover {
          transform: none;
        }
      }
    `,
  ];

  private _activate = (event: Event): void => {
    if (!this.interactive) return;
    this.dispatchEvent(
      new CustomEvent("etkan-card-click", {
        bubbles: true,
        composed: true,
        detail: { originalEvent: event },
      }),
    );
  };

  private _onKeydown = (event: KeyboardEvent): void => {
    if (!this.interactive) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      this._activate(event);
    }
  };

  private _slotFilled(event: Event): boolean {
    const slot = event.target as HTMLSlotElement;
    return slot.assignedNodes({ flatten: true }).some((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        return (node.textContent ?? "").trim().length > 0;
      }
      return true;
    });
  }

  private _onHeaderSlotChange = (event: Event): void => {
    this._hasHeader = this._slotFilled(event);
  };

  private _onFooterSlotChange = (event: Event): void => {
    this._hasFooter = this._slotFilled(event);
  };

  render() {
    return html`
      <div
        class="card"
        part="card"
        data-variant=${this.variant}
        data-padding=${this.padding}
        ?data-interactive=${this.interactive}
        role=${this.interactive ? "button" : "group"}
        tabindex=${this.interactive ? "0" : "-1"}
        @click=${this._activate}
        @keydown=${this._onKeydown}
      >
        <div class="header" part="header" ?data-filled=${this._hasHeader}>
          <slot name="header" @slotchange=${this._onHeaderSlotChange}></slot>
        </div>
        <div class="body" part="body">
          <slot></slot>
        </div>
        <div class="footer" part="footer" ?data-filled=${this._hasFooter}>
          <slot name="footer" @slotchange=${this._onFooterSlotChange}></slot>
        </div>
      </div>
    `;
  }
}

if (!customElements.get("etkan-card")) {
  customElements.define("etkan-card", EtkanCard);
}
