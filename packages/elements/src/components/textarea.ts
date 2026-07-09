import { LitElement, html, css, nothing } from "lit";
import { base } from "../shared";

/**
 * `<etkan-textarea>` — a multiline text field that mirrors `<etkan-input>`.
 * Attributes: label, placeholder, value, rows (default 4), invalid, disabled,
 * help, error. Emits `etkan-input` with `detail { value }` on every keystroke.
 */
export class EtkanTextarea extends LitElement {
  static properties = {
    label: { type: String },
    placeholder: { type: String },
    value: { type: String },
    rows: { type: Number },
    invalid: { type: Boolean, reflect: true },
    disabled: { type: Boolean, reflect: true },
    help: { type: String },
    error: { type: String },
  };

  declare label: string;
  declare placeholder: string;
  declare value: string;
  declare rows: number;
  declare invalid: boolean;
  declare disabled: boolean;
  declare help: string;
  declare error: string;

  constructor() {
    super();
    this.label = "";
    this.placeholder = "";
    this.value = "";
    this.rows = 4;
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
      .field {
        display: flex;
        flex-direction: column;
        gap: var(--space-2);
      }
      label {
        font-size: var(--text-sm);
        font-weight: var(--fw-medium);
        color: var(--text-strong);
        line-height: var(--leading-normal);
      }
      textarea {
        inline-size: 100%;
        min-block-size: calc(var(--control-height-md) * 2);
        padding-block: var(--space-3);
        padding-inline: var(--field-padding-x);
        border: 1px solid var(--border-default);
        border-radius: var(--radius-md);
        background: var(--surface-card);
        color: var(--text-body);
        font-family: inherit;
        font-size: var(--text-md);
        line-height: var(--leading-normal);
        resize: block;
        transition:
          border-color var(--duration-fast) var(--ease-standard),
          box-shadow var(--duration-fast) var(--ease-standard);
      }
      textarea::placeholder {
        color: var(--text-subtle);
      }
      textarea:hover:not([disabled]) {
        border-color: var(--border-strong);
      }
      textarea:focus-visible {
        outline: none;
        border-color: var(--border-focus);
        box-shadow: var(--focus-glow);
      }
      textarea[disabled] {
        opacity: 0.5;
        cursor: not-allowed;
        background: var(--surface-sunken);
      }
      :host([invalid]) textarea {
        border-color: var(--danger-text);
      }
      :host([invalid]) textarea:focus-visible {
        border-color: var(--danger-text);
        box-shadow: var(--focus-glow);
      }
      .help {
        font-size: var(--text-xs);
        line-height: var(--leading-normal);
        color: var(--text-muted);
      }
      .error {
        font-size: var(--text-xs);
        line-height: var(--leading-normal);
        color: var(--danger-text);
      }
    `,
  ];

  private _onInput(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;
    this.value = textarea.value;
    this.dispatchEvent(
      new CustomEvent("etkan-input", {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      }),
    );
  }

  render() {
    const showError = this.invalid && this.error.length > 0;
    return html`
      <div class="field">
        ${this.label ? html`<label part="label">${this.label}</label>` : nothing}
        <textarea
          part="textarea"
          rows=${this.rows}
          placeholder=${this.placeholder || nothing}
          .value=${this.value}
          ?disabled=${this.disabled}
          aria-invalid=${this.invalid ? "true" : "false"}
          @input=${this._onInput}
        ></textarea>
        ${showError
          ? html`<span class="error" part="error">${this.error}</span>`
          : this.help
            ? html`<span class="help" part="help">${this.help}</span>`
            : nothing}
      </div>
    `;
  }
}

if (!customElements.get("etkan-textarea")) {
  customElements.define("etkan-textarea", EtkanTextarea);
}
