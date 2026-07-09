import { LitElement, html, css, nothing } from "lit";
import { base } from "../shared";

/**
 * `<etkan-alert>` — a ready-made inline message.
 * Attributes: tone (info|success|warning|danger), dismissible, heading.
 * Slots: `icon` (leading, optional), default (body content).
 * Fires `etkan-dismiss` when the trailing close button is activated.
 */
export class EtkanAlert extends LitElement {
  static properties = {
    tone: { type: String, reflect: true },
    dismissible: { type: Boolean, reflect: true },
    heading: { type: String },
  };

  declare tone: "info" | "success" | "warning" | "danger";
  declare dismissible: boolean;
  declare heading: string;

  constructor() {
    super();
    this.tone = "info";
    this.dismissible = false;
    this.heading = "";
  }

  static styles = [
    base,
    css`
      :host {
        display: block;
      }
      .alert {
        display: flex;
        align-items: flex-start;
        gap: var(--space-3);
        padding-block: var(--space-3);
        padding-inline: var(--space-4);
        border: 1px solid transparent;
        border-radius: var(--radius-md);
        font-size: var(--text-md);
        line-height: var(--leading-normal);
      }

      .alert[data-tone="info"] {
        background: var(--info-surface);
        color: var(--info-text);
        border-color: var(--info-text);
      }
      .alert[data-tone="success"] {
        background: var(--success-surface);
        color: var(--success-text);
        border-color: var(--success-text);
      }
      .alert[data-tone="warning"] {
        background: var(--warning-surface);
        color: var(--warning-text);
        border-color: var(--warning-text);
      }
      .alert[data-tone="danger"] {
        background: var(--danger-surface);
        color: var(--danger-text);
        border-color: var(--danger-text);
      }

      .icon {
        display: inline-flex;
        flex: 0 0 auto;
        align-items: center;
        justify-content: center;
        line-height: 1;
      }

      .body {
        flex: 1 1 auto;
        min-inline-size: 0;
      }
      .heading {
        font-weight: var(--fw-bold);
        margin-block-end: var(--space-1);
      }

      .dismiss {
        display: inline-flex;
        flex: 0 0 auto;
        align-items: center;
        justify-content: center;
        inline-size: 1.5em;
        block-size: 1.5em;
        margin-inline-start: var(--space-2);
        padding: 0;
        border: none;
        border-radius: var(--radius-sm);
        background: transparent;
        color: inherit;
        font-family: inherit;
        font-size: var(--text-lg);
        line-height: 1;
        cursor: pointer;
        opacity: 0.7;
        transition:
          opacity var(--duration-fast) var(--ease-standard),
          box-shadow var(--duration-fast) var(--ease-standard);
      }
      .dismiss:hover {
        opacity: 1;
      }
      .dismiss:focus-visible {
        outline: none;
        opacity: 1;
        box-shadow: var(--focus-ring);
      }
    `,
  ];

  private _dismiss() {
    this.dispatchEvent(
      new CustomEvent("etkan-dismiss", {
        bubbles: true,
        composed: true,
        detail: { tone: this.tone },
      })
    );
  }

  render() {
    return html`
      <div
        class="alert"
        part="alert"
        data-tone=${this.tone}
        role=${this.tone === "danger" ? "alert" : "status"}
      >
        <span class="icon" part="icon" aria-hidden="true">
          <slot name="icon"></slot>
        </span>
        <div class="body" part="body">
          ${this.heading
            ? html`<div class="heading" part="heading">${this.heading}</div>`
            : nothing}
          <slot></slot>
        </div>
        ${this.dismissible
          ? html`
              <button
                class="dismiss"
                part="dismiss"
                type="button"
                aria-label="Dismiss"
                @click=${this._dismiss}
              >
                &times;
              </button>
            `
          : nothing}
      </div>
    `;
  }
}

if (!customElements.get("etkan-alert")) {
  customElements.define("etkan-alert", EtkanAlert);
}
