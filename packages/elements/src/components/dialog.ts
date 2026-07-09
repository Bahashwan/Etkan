import { LitElement, html, css, nothing, type PropertyValues } from "lit";
import { base } from "../shared";

/**
 * `<etkan-dialog>` — a modal dialog built on the native `<dialog>` element inside
 * the shadow root, so the platform handles the backdrop, focus trapping, and the
 * Escape key. Fully bilingual: all layout uses logical properties, so `dir="rtl"`
 * mirrors it automatically.
 *
 * Attributes:
 *   open              (Boolean, reflected) — show / hide the modal.
 *   heading           (String) — title text, wired via `aria-labelledby`.
 *   description       (String) — supporting text under the heading.
 *   size              (sm|md|lg, default md) — controls the panel max width.
 *   close-on-backdrop (Boolean, default true) — clicking the scrim closes it.
 *
 * Slots: default (body), `footer` (actions).
 * Events: `etkan-close` — fired on close (button, Escape, cancel, or backdrop).
 */
export class EtkanDialog extends LitElement {
  static properties = {
    open: { type: Boolean, reflect: true },
    heading: { type: String },
    description: { type: String },
    size: { type: String },
    closeOnBackdrop: { type: Boolean, attribute: "close-on-backdrop" },
  };

  declare open: boolean;
  declare heading: string;
  declare description: string;
  declare size: "sm" | "md" | "lg";
  declare closeOnBackdrop: boolean;

  constructor() {
    super();
    this.open = false;
    this.heading = "";
    this.description = "";
    this.size = "md";
    this.closeOnBackdrop = true;
  }

  static styles = [
    base,
    css`
      :host {
        display: contents;
      }

      dialog {
        margin: auto;
        padding: 0;
        border: none;
        background: transparent;
        color: var(--text-body);
        max-inline-size: 32rem;
        inline-size: min(92vw, 32rem);
        overflow: visible;
      }
      dialog[data-size="sm"] {
        max-inline-size: 26rem;
        inline-size: min(92vw, 26rem);
      }
      dialog[data-size="lg"] {
        max-inline-size: 40rem;
        inline-size: min(92vw, 40rem);
      }

      dialog::backdrop {
        background: var(--surface-overlay);
        backdrop-filter: blur(4px);
        -webkit-backdrop-filter: blur(4px);
      }

      .panel {
        position: relative;
        background: var(--surface-card);
        border: 1px solid var(--border-subtle);
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-xl);
        padding: var(--space-6);
        font-family: var(--font-sans);
      }

      dialog[open] .panel {
        animation: etkan-dialog-rise var(--duration-base) var(--ease-out);
      }
      @keyframes etkan-dialog-rise {
        from {
          opacity: 0;
          transform: translateY(var(--space-4));
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      @media (prefers-reduced-motion: reduce) {
        dialog[open] .panel {
          animation: none;
        }
      }

      .close {
        position: absolute;
        inset-block-start: var(--space-4);
        inset-inline-end: var(--space-4);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        inline-size: var(--space-8);
        block-size: var(--space-8);
        padding: 0;
        border: none;
        border-radius: var(--radius-sm);
        background: transparent;
        color: var(--text-muted);
        font-family: inherit;
        font-size: var(--text-2xl);
        line-height: 1;
        cursor: pointer;
        transition: background var(--duration-fast) var(--ease-standard);
      }
      .close:hover {
        background: var(--surface-hover);
        color: var(--text-strong);
      }
      .close:focus-visible {
        outline: none;
        box-shadow: var(--focus-ring);
      }

      .heading {
        margin: 0;
        padding-inline-end: var(--space-8);
        font-size: var(--text-lg);
        font-weight: var(--fw-semibold);
        color: var(--text-strong);
        line-height: 1.3;
      }

      .description {
        margin: 0;
        margin-block-start: var(--space-2);
        font-size: var(--text-sm);
        color: var(--text-muted);
        line-height: 1.5;
      }

      .body {
        margin-block-start: var(--space-4);
        font-size: var(--text-md);
        color: var(--text-body);
      }

      .footer {
        display: flex;
        gap: var(--space-2);
        justify-content: flex-end;
        margin-block-start: var(--space-6);
      }

      ::slotted([slot="footer"]) {
        display: contents;
      }
    `,
  ];

  /** The native `<dialog>` inside the shadow root, or `null` before first render. */
  private get _dialog(): HTMLDialogElement | null {
    return this.renderRoot.querySelector("dialog");
  }

  /**
   * `open` is the single source of truth. Reflect it onto the native dialog by
   * calling `showModal()` / `close()` only when the states actually diverge, so
   * we never double-open or throw "dialog already open".
   */
  updated(changed: PropertyValues<this>): void {
    if (!changed.has("open")) return;
    const dialog = this._dialog;
    if (!dialog) return;
    if (this.open && !dialog.open) {
      dialog.showModal();
    } else if (!this.open && dialog.open) {
      dialog.close();
    }
  }

  private _emitClose(): void {
    this.dispatchEvent(
      new CustomEvent("etkan-close", {
        bubbles: true,
        composed: true,
        detail: { open: false },
      })
    );
  }

  /**
   * The native `close` event is the funnel for every close path — the close
   * button, Escape (`cancel` → `close`), backdrop, and programmatic `open=false`
   * all end here — so state sync and the public event fire exactly once.
   */
  private _onNativeClose(): void {
    if (this.open) this.open = false;
    this._emitClose();
  }

  private _onCloseClick(): void {
    // Setting `open` drives `updated()` → `dialog.close()` → `_onNativeClose()`.
    this.open = false;
  }

  private _onDialogClick(e: MouseEvent): void {
    // A click whose target IS the <dialog> element (equal to currentTarget) is a
    // backdrop click; panel content sits inside and reports the panel as target.
    if (!this.closeOnBackdrop) return;
    if (e.target === e.currentTarget) {
      this.open = false;
    }
  }

  render() {
    const labelledBy = this.heading ? "etkan-dialog-title" : undefined;
    const describedBy = this.description ? "etkan-dialog-desc" : undefined;

    return html`
      <dialog
        part="dialog"
        data-size=${this.size}
        role="dialog"
        aria-modal="true"
        aria-labelledby=${labelledBy ?? nothing}
        aria-describedby=${describedBy ?? nothing}
        @click=${this._onDialogClick}
        @close=${this._onNativeClose}
      >
        <div class="panel" part="panel">
          <button
            class="close"
            part="close"
            type="button"
            aria-label="Close"
            @click=${this._onCloseClick}
          >
            &times;
          </button>

          ${this.heading
            ? html`<h2 id="etkan-dialog-title" class="heading" part="heading">
                ${this.heading}
              </h2>`
            : nothing}
          ${this.description
            ? html`<p id="etkan-dialog-desc" class="description" part="description">
                ${this.description}
              </p>`
            : nothing}

          <div class="body" part="body">
            <slot></slot>
          </div>

          <div class="footer" part="footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </dialog>
    `;
  }
}

if (!customElements.get("etkan-dialog")) {
  customElements.define("etkan-dialog", EtkanDialog);
}
