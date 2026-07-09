import { LitElement, html, css, nothing } from "lit";
import { base } from "../shared";

/**
 * `<etkan-field>` — a ready-made form-field wrapper (layout only).
 *
 * It renders a `<label>` (with a danger-coloured `*` when `required`) above the
 * default `<slot>` — where the caller places any control — and, below the
 * control, a single line showing the `error` (if present) or otherwise the
 * `help` text. All spacing is logical, so `dir="rtl"` mirrors automatically.
 *
 * Attributes: label, help, error, required.
 */
export class EtkanField extends LitElement {
  static properties = {
    label: { type: String },
    help: { type: String },
    error: { type: String },
    required: { type: Boolean, reflect: true },
  };

  declare label: string;
  declare help: string;
  declare error: string;
  declare required: boolean;

  constructor() {
    super();
    this.label = "";
    this.help = "";
    this.error = "";
    this.required = false;
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
      .label {
        font-size: var(--text-sm);
        font-weight: var(--fw-medium);
        line-height: var(--leading-normal);
        color: var(--text-strong);
      }
      .required-mark {
        color: var(--danger-solid);
        margin-inline-start: var(--space-1);
      }
      .message {
        font-size: var(--text-xs);
        line-height: var(--leading-normal);
        color: var(--text-muted);
      }
      .message[data-tone="error"] {
        color: var(--danger-text);
      }
    `,
  ];

  render() {
    const message = this.error || this.help;
    const tone = this.error ? "error" : "help";

    return html`
      <div class="field" part="field">
        ${this.label
          ? html`<label class="label" part="label">
              ${this.label}
              ${this.required
                ? html`<span class="required-mark" aria-hidden="true">*</span>`
                : nothing}
            </label>`
          : nothing}
        <slot></slot>
        ${message
          ? html`<span
              class="message"
              part="message"
              data-tone=${tone}
              role=${this.error ? "alert" : nothing}
              >${message}</span
            >`
          : nothing}
      </div>
    `;
  }
}

if (!customElements.get("etkan-field")) {
  customElements.define("etkan-field", EtkanField);
}
