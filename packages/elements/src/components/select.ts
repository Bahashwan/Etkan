import { LitElement, html, css, nothing, type PropertyValues } from "lit";
import { base } from "../shared";

/** A single option for `<etkan-select>`. */
export interface EtkanSelectOption {
  value: string;
  label: string;
}

/**
 * `<etkan-select>` — an accessible custom listbox select.
 *
 * A native `<select>` cannot render slotted options through the shadow DOM, so
 * ETKAN ships this token-styled combobox instead. It exposes a `combobox`
 * trigger and a `listbox` popup of `option` buttons, closes on outside click
 * and `Escape`, and mirrors automatically in RTL via logical properties.
 *
 * Attributes: label, placeholder, value, disabled, open (reflected).
 * Property: options (Array<{ value, label }>).
 * Emits: `etkan-change` with detail `{ value }`.
 */
export class EtkanSelect extends LitElement {
  static properties = {
    label: { type: String },
    placeholder: { type: String },
    value: { type: String },
    disabled: { type: Boolean, reflect: true },
    open: { type: Boolean, reflect: true },
    options: { type: Array },
  };

  declare label: string;
  declare placeholder: string;
  declare value: string;
  declare disabled: boolean;
  declare open: boolean;
  declare options: EtkanSelectOption[];

  private _onDocPointerDown = (e: Event) => this._handleOutside(e);
  private _onDocKeyDown = (e: KeyboardEvent) => this._handleKeydown(e);

  constructor() {
    super();
    this.label = "";
    this.placeholder = "";
    this.value = "";
    this.disabled = false;
    this.open = false;
    this.options = [];
  }

  connectedCallback() {
    super.connectedCallback();
    if (typeof document !== "undefined") {
      document.addEventListener("pointerdown", this._onDocPointerDown, true);
      document.addEventListener("keydown", this._onDocKeyDown);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (typeof document !== "undefined") {
      document.removeEventListener("pointerdown", this._onDocPointerDown, true);
      document.removeEventListener("keydown", this._onDocKeyDown);
    }
  }

  /**
   * The reflected `open` boolean drives the popup's show/hide: when it flips the
   * component re-renders (adding or removing the `.listbox`). React to that here
   * to move focus into the freshly opened listbox for keyboard users. Focus is
   * only pulled in on open — closing never steals focus, so an outside click
   * lands where the user intended (Escape restores the trigger explicitly).
   */
  updated(changed: PropertyValues<this>) {
    if (!changed.has("open") || !this.open) return;
    const selected = this.renderRoot.querySelector<HTMLElement>(
      '.option[aria-selected="true"]',
    );
    const first = this.renderRoot.querySelector<HTMLElement>(".option");
    (selected ?? first)?.focus();
  }

  static styles = [
    base,
    css`
      :host {
        display: block;
        position: relative;
      }

      .label {
        display: block;
        margin-block-end: var(--space-2);
        font-size: var(--text-sm);
        font-weight: var(--fw-medium);
        color: var(--text-strong);
      }

      .trigger {
        display: inline-flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--space-2);
        inline-size: 100%;
        block-size: var(--control-height-md);
        padding-inline: var(--field-padding-x);
        background: var(--surface-card);
        border: 1px solid var(--border-default);
        border-radius: var(--radius-md);
        font-family: inherit;
        font-size: var(--text-md);
        font-weight: var(--fw-medium);
        line-height: 1;
        color: var(--text-strong);
        text-align: start;
        cursor: pointer;
        transition:
          border-color var(--duration-fast) var(--ease-standard),
          box-shadow var(--duration-fast) var(--ease-standard);
      }
      .trigger:hover:not([disabled]) {
        border-color: var(--border-strong);
      }
      .trigger:focus-visible {
        outline: none;
        box-shadow: var(--focus-glow);
        border-color: var(--brand-primary);
      }
      .trigger[disabled] {
        opacity: 0.5;
        cursor: not-allowed;
      }

      .trigger-label {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .trigger-label.is-placeholder {
        color: var(--text-muted);
        font-weight: var(--fw-medium);
      }

      .chevron {
        flex: 0 0 auto;
        inline-size: 1em;
        block-size: 1em;
        color: var(--text-muted);
        transition: transform var(--duration-fast) var(--ease-standard);
      }
      :host([open]) .chevron {
        transform: rotate(180deg);
      }

      .listbox {
        position: absolute;
        inset-block-start: calc(100% + 4px);
        inset-inline-start: 0;
        inline-size: 100%;
        margin: 0;
        padding: var(--space-1);
        background: var(--surface-card);
        border: 1px solid var(--border-subtle);
        border-radius: var(--radius-md);
        box-shadow: var(--shadow-lg);
        max-block-size: 16rem;
        overflow: auto;
        z-index: 1000;
        list-style: none;
        animation: pop var(--duration-fast) var(--ease-out);
      }

      @keyframes pop {
        from {
          opacity: 0;
          transform: translateY(-4px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .listbox {
          animation: none;
        }
      }

      .option {
        display: flex;
        align-items: center;
        inline-size: 100%;
        gap: var(--space-2);
        padding-block: var(--space-2);
        padding-inline: var(--space-3);
        background: transparent;
        border: none;
        border-radius: var(--radius-sm);
        font-family: inherit;
        font-size: var(--text-md);
        line-height: 1.2;
        color: var(--text-body);
        text-align: start;
        cursor: pointer;
        transition: background var(--duration-fast) var(--ease-standard);
      }
      .option:hover {
        background: var(--surface-hover);
      }
      .option[aria-selected="true"] {
        background: var(--brand-primary-soft);
        color: var(--brand-primary-soft-text);
        font-weight: var(--fw-semibold);
      }
      .option:focus-visible {
        outline: none;
        box-shadow: var(--focus-glow);
      }
    `,
  ];

  private get _selected(): EtkanSelectOption | undefined {
    return this.options.find((o) => o.value === this.value);
  }

  private _toggle() {
    if (this.disabled) return;
    this.open = !this.open;
  }

  private _selectOption(option: EtkanSelectOption) {
    this.value = option.value;
    this.open = false;
    this.dispatchEvent(
      new CustomEvent("etkan-change", {
        detail: { value: option.value },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private _handleOutside(e: Event) {
    if (!this.open) return;
    const path = e.composedPath();
    if (!path.includes(this)) {
      this.open = false;
    }
  }

  private _handleKeydown(e: KeyboardEvent) {
    if (this.open && e.key === "Escape") {
      e.stopPropagation();
      this.open = false;
      const trigger = this.renderRoot.querySelector<HTMLElement>(".trigger");
      trigger?.focus();
    }
  }

  render() {
    const selected = this._selected;
    const displayLabel = selected ? selected.label : this.placeholder;

    return html`
      ${this.label
        ? html`<span class="label" id="etkan-select-label">${this.label}</span>`
        : nothing}
      <button
        part="trigger"
        class="trigger"
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded=${this.open ? "true" : "false"}
        aria-labelledby=${this.label ? "etkan-select-label" : nothing}
        ?disabled=${this.disabled}
        @click=${this._toggle}
      >
        <span class="trigger-label ${selected ? "" : "is-placeholder"}">
          ${displayLabel}
        </span>
        <svg
          class="chevron"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M4 6l4 4 4-4"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
      ${this.open
        ? html`
            <div
              part="listbox"
              class="listbox"
              role="listbox"
              aria-labelledby=${this.label ? "etkan-select-label" : nothing}
            >
              ${this.options.map(
                (option) => html`
                  <button
                    class="option"
                    type="button"
                    role="option"
                    aria-selected=${option.value === this.value ? "true" : "false"}
                    @click=${() => this._selectOption(option)}
                  >
                    ${option.label}
                  </button>
                `,
              )}
            </div>
          `
        : nothing}
    `;
  }
}

if (!customElements.get("etkan-select")) {
  customElements.define("etkan-select", EtkanSelect);
}
