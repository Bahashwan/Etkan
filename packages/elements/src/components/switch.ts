import { LitElement, html, css, nothing } from "lit";
import { base } from "../shared";

/**
 * `<etkan-switch>` — the ETKAN on/off toggle.
 * Attributes: checked (reflect), disabled, label.
 * Emits `etkan-change` with `detail: { checked: boolean }`.
 * The pill track turns `--brand-primary` when checked and the thumb travels
 * from the leading edge to the trailing edge via `inset-inline-start`, so the
 * motion mirrors automatically under `dir="rtl"`.
 */
export class EtkanSwitch extends LitElement {
  static properties = {
    checked: { type: Boolean, reflect: true },
    disabled: { type: Boolean, reflect: true },
    label: { type: String },
  };

  declare checked: boolean;
  declare disabled: boolean;
  declare label: string;

  constructor() {
    super();
    this.checked = false;
    this.disabled = false;
    this.label = "";
  }

  static styles = [
    base,
    css`
      :host {
        display: inline-block;
      }
      .field {
        display: inline-flex;
        align-items: center;
        gap: var(--space-3);
        cursor: pointer;
        user-select: none;
        font-family: inherit;
        font-size: var(--text-md);
        font-weight: var(--fw-medium);
        line-height: var(--leading-normal);
        color: var(--text-body);
      }
      button {
        position: relative;
        flex: 0 0 auto;
        inline-size: 2.75rem;
        block-size: 1.5rem;
        padding: 0;
        margin: 0;
        border: 1px solid transparent;
        border-radius: var(--radius-pill);
        background: var(--border-default);
        cursor: pointer;
        transition: background var(--duration-fast) var(--ease-standard);
      }
      button:focus-visible {
        outline: none;
        box-shadow: var(--focus-ring);
      }
      .thumb {
        position: absolute;
        inset-block-start: 2px;
        inset-inline-start: 2px;
        inline-size: calc(1.5rem - 6px);
        block-size: calc(1.5rem - 6px);
        border-radius: var(--radius-pill);
        background: var(--surface-card);
        box-shadow: var(--shadow-sm);
        transition: inset-inline-start var(--duration-base) var(--ease-out);
      }
      :host([checked]) button {
        background: var(--brand-primary);
      }
      :host([checked]) .thumb {
        inset-inline-start: calc(100% - (1.5rem - 6px) - 2px);
      }
      :host([disabled]) .field {
        cursor: not-allowed;
      }
      :host([disabled]) button {
        cursor: not-allowed;
        opacity: 0.5;
      }
      @media (prefers-reduced-motion: reduce) {
        button,
        .thumb {
          transition: none;
        }
      }
    `,
  ];

  private _toggle() {
    if (this.disabled) return;
    this.checked = !this.checked;
    this.dispatchEvent(
      new CustomEvent("etkan-change", {
        detail: { checked: this.checked },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html`
      <label class="field" part="field">
        <button
          part="track"
          type="button"
          role="switch"
          aria-checked=${this.checked ? "true" : "false"}
          aria-label=${this.label ? this.label : nothing}
          ?disabled=${this.disabled}
          @click=${this._toggle}
        >
          <span class="thumb" part="thumb"></span>
        </button>
        ${this.label ? html`<span part="label">${this.label}</span>` : nothing}
      </label>
    `;
  }
}

if (!customElements.get("etkan-switch")) {
  customElements.define("etkan-switch", EtkanSwitch);
}
