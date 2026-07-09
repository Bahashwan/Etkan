import { LitElement, html, css, nothing } from "lit";
import { base } from "../shared";

/**
 * `<etkan-input>` — the ETKAN text field.
 * Attributes: label, placeholder, value, type, size (sm|md|lg),
 * invalid, disabled, help, error.
 * Emits `etkan-input` with `detail: { value }` on every input.
 */
export class EtkanInput extends LitElement {
  static properties = {
    label: { type: String },
    placeholder: { type: String },
    value: { type: String },
    type: { type: String },
    size: { type: String },
    invalid: { type: Boolean, reflect: true },
    disabled: { type: Boolean, reflect: true },
    help: { type: String },
    error: { type: String },
  };

  declare label: string;
  declare placeholder: string;
  declare value: string;
  declare type: string;
  declare size: "sm" | "md" | "lg";
  declare invalid: boolean;
  declare disabled: boolean;
  declare help: string;
  declare error: string;

  constructor() {
    super();
    this.label = "";
    this.placeholder = "";
    this.value = "";
    this.type = "text";
    this.size = "md";
    this.invalid = false;
    this.disabled = false;
    this.help = "";
    this.error = "";
  }

  static styles = [
    base,
    css`
      :host {
        display: block;
      }

      label {
        display: block;
        margin-block-end: var(--space-2);
        font-size: var(--text-sm);
        font-weight: var(--fw-medium);
        color: var(--text-strong);
        line-height: var(--leading-normal);
      }

      .row {
        display: flex;
        align-items: center;
        gap: var(--space-2);
        inline-size: 100%;
        block-size: var(--control-height-md);
        padding-inline: var(--field-padding-x);
        border: 1px solid var(--border-default);
        border-radius: var(--radius-md);
        background: var(--surface-card);
        transition:
          box-shadow var(--duration-fast) var(--ease-standard),
          border-color var(--duration-fast) var(--ease-standard);
      }
      .row[data-size="sm"] {
        block-size: var(--control-height-sm);
      }
      .row[data-size="lg"] {
        block-size: var(--control-height-lg);
      }

      /* Focus: neutral border kept, glow only — avoids a doubled border. */
      .row:focus-within {
        box-shadow: var(--focus-glow);
      }

      .row[data-invalid] {
        border-color: var(--danger);
      }
      .row[data-disabled] {
        opacity: 0.5;
        cursor: not-allowed;
      }

      input {
        flex: 1;
        min-inline-size: 0;
        border: none;
        outline: none;
        background: transparent;
        font-family: inherit;
        font-size: var(--text-md);
        color: var(--text-body);
        line-height: var(--leading-normal);
      }
      .row[data-size="sm"] input {
        font-size: var(--text-sm);
      }
      .row[data-size="lg"] input {
        font-size: var(--text-base);
      }
      .row[data-invalid] input {
        color: var(--danger);
      }
      input::placeholder {
        color: var(--text-subtle);
      }
      input:disabled {
        cursor: not-allowed;
      }

      ::slotted(*) {
        display: inline-flex;
        align-items: center;
        color: var(--text-muted);
      }

      .message {
        margin-block-start: var(--space-2);
        font-size: var(--text-xs);
        color: var(--text-muted);
        line-height: var(--leading-normal);
      }
      .message[data-invalid] {
        color: var(--danger-text);
      }
    `,
  ];

  private _onInput(e: Event) {
    const target = e.target as HTMLInputElement;
    this.value = target.value;
    this.dispatchEvent(
      new CustomEvent("etkan-input", {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      }),
    );
  }

  render() {
    const message = this.invalid && this.error ? this.error : this.help;

    return html`
      ${this.label ? html`<label part="label">${this.label}</label>` : nothing}
      <div
        class="row"
        part="control"
        data-size=${this.size}
        ?data-invalid=${this.invalid}
        ?data-disabled=${this.disabled}
      >
        <slot name="prefix"></slot>
        <input
          part="input"
          .value=${this.value}
          type=${this.type}
          placeholder=${this.placeholder || nothing}
          ?disabled=${this.disabled}
          aria-invalid=${this.invalid ? "true" : "false"}
          @input=${this._onInput}
        />
        <slot name="suffix"></slot>
      </div>
      ${message
        ? html`<div class="message" part="message" ?data-invalid=${this.invalid}>${message}</div>`
        : nothing}
    `;
  }
}

if (!customElements.get("etkan-input")) {
  customElements.define("etkan-input", EtkanInput);
}
