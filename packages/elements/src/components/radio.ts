import { LitElement, html, css, nothing } from "lit";
import { base } from "../shared";

/**
 * `<etkan-radio>` — a single ETKAN radio control (circle with a filled dot when
 * checked), paired with an optional label. Mirrors automatically in RTL via
 * logical properties.
 * Attributes: checked (reflect), disabled, name, value, label.
 * Dispatches `etkan-change` with `detail: { checked }` when toggled on.
 */
export class EtkanRadio extends LitElement {
  static properties = {
    checked: { type: Boolean, reflect: true },
    disabled: { type: Boolean, reflect: true },
    name: { type: String },
    value: { type: String },
    label: { type: String },
  };

  declare checked: boolean;
  declare disabled: boolean;
  declare name: string;
  declare value: string;
  declare label: string;

  constructor() {
    super();
    this.checked = false;
    this.disabled = false;
    this.name = "";
    this.value = "";
    this.label = "";
  }

  static styles = [
    base,
    css`
      :host {
        display: inline-block;
      }
      :host([disabled]) {
        opacity: 0.5;
      }
      label {
        display: inline-flex;
        align-items: center;
        gap: var(--space-2);
        cursor: pointer;
        font-family: inherit;
        font-size: var(--text-md);
        line-height: var(--leading-normal);
        color: var(--text-body);
      }
      :host([disabled]) label {
        cursor: not-allowed;
      }
      .control {
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex: none;
        inline-size: 1.25em;
        block-size: 1.25em;
        border: 1px solid var(--border-strong);
        border-radius: 50%;
        background: var(--surface-card);
        transition:
          background var(--duration-fast) var(--ease-standard),
          border-color var(--duration-fast) var(--ease-standard),
          box-shadow var(--duration-fast) var(--ease-standard);
      }
      .dot {
        inline-size: 0.5em;
        block-size: 0.5em;
        border-radius: 50%;
        background: var(--text-on-primary);
        transform: scale(0);
        transition: transform var(--duration-fast) var(--ease-out);
      }
      :host([checked]) .control {
        background: var(--brand-primary);
        border-color: var(--brand-primary);
      }
      :host([checked]) .dot {
        transform: scale(1);
      }
      input {
        position: absolute;
        inline-size: 100%;
        block-size: 100%;
        margin: 0;
        opacity: 0;
        cursor: inherit;
      }
      input:focus-visible + .control {
        outline: none;
        box-shadow: var(--focus-ring);
      }
      @media (prefers-reduced-motion: reduce) {
        .dot {
          transition: none;
        }
      }
    `,
  ];

  private onChange(event: Event) {
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
        <span class="control" part="control">
          <input
            type="radio"
            part="input"
            name=${this.name || nothing}
            .value=${this.value}
            .checked=${this.checked}
            ?disabled=${this.disabled}
            @change=${this.onChange}
          />
          <span class="dot" part="dot" aria-hidden="true"></span>
        </span>
        ${this.label ? html`<span part="text">${this.label}</span>` : html`<slot></slot>`}
      </label>
    `;
  }
}

if (!customElements.get("etkan-radio")) {
  customElements.define("etkan-radio", EtkanRadio);
}
