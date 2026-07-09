import { LitElement, html, css } from "lit";
import { base } from "../shared";

/**
 * `<etkan-icon-button>` — a square, icon-only ETKAN button.
 * Attributes: variant (primary|secondary|ghost|danger), size (sm|md|lg),
 * disabled, and a required `label` applied as both aria-label and title.
 * The icon is supplied via the default slot.
 */
export class EtkanIconButton extends LitElement {
  static properties = {
    variant: { type: String },
    size: { type: String },
    disabled: { type: Boolean, reflect: true },
    label: { type: String },
  };

  declare variant: "primary" | "secondary" | "ghost" | "danger";
  declare size: "sm" | "md" | "lg";
  declare disabled: boolean;
  declare label: string;

  constructor() {
    super();
    this.variant = "ghost";
    this.size = "md";
    this.disabled = false;
    this.label = "";
  }

  static styles = [
    base,
    css`
      :host {
        display: inline-block;
      }
      button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        inline-size: var(--control-height-md);
        block-size: var(--control-height-md);
        padding: 0;
        border: 1px solid transparent;
        border-radius: var(--radius-md);
        font-family: inherit;
        font-size: var(--text-md);
        line-height: 1;
        cursor: pointer;
        transition:
          background var(--duration-fast) var(--ease-standard),
          transform var(--duration-instant) var(--ease-standard),
          box-shadow var(--duration-fast) var(--ease-standard);
      }
      button:active {
        transform: translateY(0.5px) scale(0.99);
      }
      button:focus-visible {
        outline: none;
        box-shadow: var(--focus-ring);
      }
      button[disabled] {
        opacity: 0.5;
        cursor: not-allowed;
      }

      button[data-size="sm"] {
        inline-size: var(--control-height-sm);
        block-size: var(--control-height-sm);
        font-size: var(--text-sm);
      }
      button[data-size="lg"] {
        inline-size: var(--control-height-lg);
        block-size: var(--control-height-lg);
        font-size: var(--text-base);
      }

      button[data-variant="primary"] {
        background: var(--brand-primary);
        color: var(--text-on-primary);
      }
      button[data-variant="primary"]:hover:not([disabled]) {
        background: var(--brand-primary-hover);
      }
      button[data-variant="danger"] {
        background: var(--danger-solid);
        color: #fff;
      }
      button[data-variant="danger"]:hover:not([disabled]) {
        background: var(--danger-600);
      }
      button[data-variant="secondary"] {
        background: var(--surface-card);
        color: var(--text-strong);
        border-color: var(--border-default);
      }
      button[data-variant="secondary"]:hover:not([disabled]) {
        background: var(--surface-hover);
      }
      button[data-variant="ghost"] {
        background: transparent;
        color: var(--text-body);
      }
      button[data-variant="ghost"]:hover:not([disabled]) {
        background: var(--surface-hover);
      }

      ::slotted(svg) {
        inline-size: 1.25em;
        block-size: 1.25em;
        display: block;
      }
    `,
  ];

  private _onClick(event: MouseEvent) {
    if (this.disabled) {
      event.stopImmediatePropagation();
      event.preventDefault();
      return;
    }
    this.dispatchEvent(
      new CustomEvent("etkan-icon-button-click", {
        bubbles: true,
        composed: true,
        detail: { label: this.label },
      }),
    );
  }

  render() {
    return html`
      <button
        part="button"
        type="button"
        data-variant=${this.variant}
        data-size=${this.size}
        aria-label=${this.label}
        title=${this.label}
        ?disabled=${this.disabled}
        @click=${this._onClick}
      >
        <slot></slot>
      </button>
    `;
  }
}

if (!customElements.get("etkan-icon-button")) {
  customElements.define("etkan-icon-button", EtkanIconButton);
}
