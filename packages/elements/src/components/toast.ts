import { LitElement, html, css, nothing, type PropertyValues } from "lit";
import { base } from "../shared";

/**
 * `<etkan-toast>` — a fixed-position toast notification.
 * Attributes: open (reflect), tone (info|success|danger), heading, message,
 * duration (ms; 0 disables auto-dismiss), placement (top-start|top-end|
 * bottom-start|bottom-end, reflect), dismiss-label.
 *
 * Dispatches `etkan-dismiss` when the close button is pressed or the
 * auto-dismiss timer elapses. All insets are logical, so start/end corners
 * flip automatically under `dir="rtl"`.
 */
export class EtkanToast extends LitElement {
  static properties = {
    open: { type: Boolean, reflect: true },
    tone: { type: String },
    heading: { type: String },
    message: { type: String },
    duration: { type: Number },
    placement: { type: String, reflect: true },
    dismissLabel: { type: String, attribute: "dismiss-label" },
  };

  declare open: boolean;
  declare tone: "info" | "success" | "danger";
  declare heading: string;
  declare message: string;
  declare duration: number;
  declare placement: "top-start" | "top-end" | "bottom-start" | "bottom-end";
  declare dismissLabel: string;

  private _timer: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    super();
    this.open = false;
    this.tone = "info";
    this.heading = "";
    this.message = "";
    this.duration = 5000;
    this.placement = "bottom-end";
    this.dismissLabel = "Dismiss";
  }

  static styles = [
    base,
    css`
      :host {
        position: fixed;
        z-index: 9999;
        display: block;
        max-inline-size: min(24rem, calc(100vw - var(--space-8)));
      }
      :host(:not([open])) {
        display: none;
      }

      /* Logical corner placement — flips under RTL automatically. */
      :host([placement="top-start"]) {
        inset-block-start: var(--space-4);
        inset-inline-start: var(--space-4);
      }
      :host([placement="top-end"]) {
        inset-block-start: var(--space-4);
        inset-inline-end: var(--space-4);
      }
      :host([placement="bottom-start"]) {
        inset-block-end: var(--space-4);
        inset-inline-start: var(--space-4);
      }
      :host([placement="bottom-end"]) {
        inset-block-end: var(--space-4);
        inset-inline-end: var(--space-4);
      }

      .card {
        display: flex;
        align-items: flex-start;
        gap: var(--space-3);
        background: var(--surface-card);
        border: 1px solid var(--border-default);
        border-radius: var(--radius-md);
        box-shadow: var(--shadow-lg);
        padding-block: var(--space-3);
        padding-inline: var(--space-4);
      }

      /* Slide from the block edge the toast is anchored to. */
      :host([placement^="top"]) .card {
        animation: slide-down var(--duration-base) var(--ease-out);
      }
      :host([placement^="bottom"]) .card {
        animation: slide-up var(--duration-base) var(--ease-out);
      }

      .dot {
        flex: none;
        inline-size: var(--space-2);
        block-size: var(--space-2);
        border-radius: var(--radius-pill);
        margin-block-start: 0.4em;
      }
      .dot[data-tone="info"] {
        background: var(--info-solid);
      }
      .dot[data-tone="success"] {
        background: var(--success-solid);
      }
      .dot[data-tone="danger"] {
        background: var(--danger-solid);
      }

      .body {
        flex: 1 1 auto;
        min-inline-size: 0;
      }
      .heading {
        margin: 0;
        font-size: var(--text-sm);
        font-weight: var(--fw-bold);
        color: var(--text-strong);
        line-height: 1.3;
      }
      .message {
        margin: 0;
        font-size: var(--text-sm);
        color: var(--text-body);
        line-height: 1.4;
      }
      .heading + .message {
        margin-block-start: var(--space-1);
      }

      .close {
        flex: none;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        inline-size: 1.5rem;
        block-size: 1.5rem;
        margin-inline-start: var(--space-1);
        padding: 0;
        background: transparent;
        border: 1px solid transparent;
        border-radius: var(--radius-sm);
        color: var(--text-muted);
        font-family: inherit;
        font-size: var(--text-lg);
        line-height: 1;
        cursor: pointer;
        transition: background var(--duration-fast) var(--ease-standard),
          color var(--duration-fast) var(--ease-standard);
      }
      .close:hover {
        background: var(--surface-hover);
        color: var(--text-strong);
      }
      .close:focus-visible {
        outline: none;
        box-shadow: var(--focus-ring);
      }

      @keyframes slide-up {
        from {
          opacity: 0;
          transform: translateY(var(--space-4));
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      @keyframes slide-down {
        from {
          opacity: 0;
          transform: translateY(calc(-1 * var(--space-4)));
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .card {
          animation: none;
        }
      }
    `,
  ];

  connectedCallback() {
    super.connectedCallback();
    // On first connection the initial update cycle drives scheduling via
    // `updated()`. On a later reconnection (e.g. the element was reparented)
    // no property changes, so restart the auto-dismiss timer here.
    if (this.hasUpdated) this._scheduleTimer();
  }

  updated(changed: PropertyValues) {
    // `open` drives show/hide (reflected attribute + host display rule) and,
    // together with `duration`, the auto-dismiss timer.
    if (changed.has("open") || changed.has("duration")) {
      this._scheduleTimer();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._clearTimer();
  }

  private _scheduleTimer() {
    this._clearTimer();
    if (this.open && this.duration > 0 && typeof setTimeout !== "undefined") {
      this._timer = setTimeout(() => this._dismiss(), this.duration);
    }
  }

  private _clearTimer() {
    if (this._timer !== null) {
      clearTimeout(this._timer);
      this._timer = null;
    }
  }

  private _dismiss() {
    this.dispatchEvent(
      new CustomEvent("etkan-dismiss", {
        bubbles: true,
        composed: true,
        detail: { tone: this.tone },
      }),
    );
  }

  render() {
    if (!this.open) return nothing;
    const role = this.tone === "danger" ? "alert" : "status";
    return html`
      <div class="card" role=${role} aria-live=${this.tone === "danger" ? "assertive" : "polite"}>
        <span class="dot" data-tone=${this.tone} aria-hidden="true"></span>
        <div class="body">
          ${this.heading ? html`<p class="heading">${this.heading}</p>` : nothing}
          ${this.message ? html`<p class="message">${this.message}</p>` : nothing}
        </div>
        <button
          class="close"
          type="button"
          part="dismiss"
          aria-label=${this.dismissLabel}
          @click=${this._dismiss}
        >
          &times;
        </button>
      </div>
    `;
  }
}

if (!customElements.get("etkan-toast")) {
  customElements.define("etkan-toast", EtkanToast);
}
