import { LitElement, html, css, nothing } from "lit";
import { base } from "../shared";

/**
 * `<etkan-checkbox>` — the ETKAN checkbox control.
 * Attributes: checked (reflect), disabled, label (string, optional).
 * Renders an inline-flex label with the control box on the leading side
 * (logical order, so it mirrors under `dir="rtl"`). Emits `etkan-change`
 * with `detail: { checked }` whenever the value toggles.
 */
export class EtkanCheckbox extends LitElement {
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

      label {
        display: inline-flex;
        align-items: center;
        gap: var(--space-2);
        font-family: inherit;
        font-size: var(--text-md);
        line-height: var(--leading-normal);
        color: var(--text-body);
        cursor: pointer;
        user-select: none;
      }

      /* Native input kept for a11y + form semantics, visually hidden. */
      input {
        position: absolute;
        inline-size: 1px;
        block-size: 1px;
        margin: 0;
        padding: 0;
        border: 0;
        overflow: hidden;
        clip: rect(0 0 0 0);
        clip-path: inset(50%);
        white-space: nowrap;
      }

      .box {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex: none;
        inline-size: 1.15em;
        block-size: 1.15em;
        border: 1px solid var(--border-default);
        border-radius: var(--radius-sm);
        background: var(--surface-card);
        transition:
          background var(--duration-fast) var(--ease-standard),
          border-color var(--duration-fast) var(--ease-standard),
          box-shadow var(--duration-fast) var(--ease-standard);
      }

      .check {
        inline-size: 0.72em;
        block-size: 0.72em;
        color: var(--text-on-primary);
      }

      :host([checked]) .box {
        background: var(--brand-primary);
        border-color: var(--brand-primary);
      }

      /* Focus ring driven by the hidden native input. */
      input:focus-visible + .box {
        outline: none;
        box-shadow: var(--focus-ring);
      }

      :host([disabled]) label {
        opacity: 0.5;
        cursor: not-allowed;
      }
    `,
  ];

  private _onChange(event: Event) {
    if (this.disabled) return;
    const input = event.target as HTMLInputElement;
    this.checked = input.checked;
    this.dispatchEvent(
      new CustomEvent<{ checked: boolean }>("etkan-change", {
        detail: { checked: this.checked },
        bubbles: true,
        composed: true,
      }),
    );
  }

  render() {
    return html`
      <label part="label">
        <input
          type="checkbox"
          .checked=${this.checked}
          ?disabled=${this.disabled}
          @change=${this._onChange}
        />
        <span class="box" part="box" aria-hidden="true">
          ${this.checked
            ? html`
                <svg
                  class="check"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.5 4.5 6.5 11.5 3 8"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              `
            : nothing}
        </span>
        ${this.label ? html`<span part="text">${this.label}</span>` : html`<slot></slot>`}
      </label>
    `;
  }
}

if (!customElements.get("etkan-checkbox")) {
  customElements.define("etkan-checkbox", EtkanCheckbox);
}
