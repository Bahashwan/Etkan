import { LitElement, html, css, nothing } from "lit";
import { base } from "../shared";

/**
 * `<etkan-button>` — the ETKAN action button.
 * Attributes: variant (primary|secondary|ghost|danger|accent), size (sm|md|lg),
 * disabled, loading, full-width, type (button|submit|reset).
 */
export class EtkanButton extends LitElement {
  static properties = {
    variant: { type: String },
    size: { type: String },
    disabled: { type: Boolean, reflect: true },
    loading: { type: Boolean },
    fullWidth: { type: Boolean, attribute: "full-width", reflect: true },
    type: { type: String },
  };

  declare variant: "primary" | "secondary" | "ghost" | "danger" | "accent";
  declare size: "sm" | "md" | "lg";
  declare disabled: boolean;
  declare loading: boolean;
  declare fullWidth: boolean;
  declare type: "button" | "submit" | "reset";

  constructor() {
    super();
    this.variant = "primary";
    this.size = "md";
    this.disabled = false;
    this.loading = false;
    this.fullWidth = false;
    this.type = "button";
  }

  static styles = [
    base,
    css`
      :host {
        display: inline-block;
      }
      :host([full-width]) {
        display: block;
      }
      button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: var(--space-2);
        inline-size: 100%;
        block-size: var(--control-height-md);
        padding-inline: var(--space-4);
        border: 1px solid transparent;
        border-radius: var(--radius-md);
        font-family: inherit;
        font-size: var(--text-md);
        font-weight: var(--fw-medium);
        line-height: 1;
        white-space: nowrap;
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
        block-size: var(--control-height-sm);
        padding-inline: var(--space-3);
        font-size: var(--text-sm);
      }
      button[data-size="lg"] {
        block-size: var(--control-height-lg);
        padding-inline: var(--space-6);
        font-size: var(--text-base);
      }

      button[data-variant="primary"] {
        background: var(--brand-primary);
        color: var(--text-on-primary);
      }
      button[data-variant="primary"]:hover:not([disabled]) {
        background: var(--brand-primary-hover);
      }
      button[data-variant="accent"] {
        background: var(--brand-accent);
        color: var(--text-on-accent);
      }
      button[data-variant="accent"]:hover:not([disabled]) {
        background: var(--brand-accent-hover);
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

      .spinner {
        inline-size: 1em;
        block-size: 1em;
        border-radius: 50%;
        border: 2px solid currentColor;
        border-block-start-color: transparent;
        display: inline-block;
        animation: spin 0.7s linear infinite;
      }
      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .spinner {
          animation-duration: 1.2s;
        }
      }
    `,
  ];

  render() {
    return html`
      <button
        part="button"
        type=${this.type}
        data-variant=${this.variant}
        data-size=${this.size}
        ?disabled=${this.disabled || this.loading}
      >
        ${this.loading ? html`<span class="spinner" aria-hidden="true"></span>` : nothing}
        <slot></slot>
      </button>
    `;
  }
}

if (!customElements.get("etkan-button")) {
  customElements.define("etkan-button", EtkanButton);
}
