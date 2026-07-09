import { LitElement, html, css, nothing } from "lit";
import { base } from "../shared";

/**
 * `<etkan-search-bar>` — a ready-made search input row.
 * A rounded field (like `<etkan-input>`) with a leading magnifier icon, the
 * native `<input>`, and a trailing clear (×) button shown only when there is a
 * value. Clearing empties the field and refocuses the input.
 * Attributes: placeholder, value.
 * Dispatches `etkan-search` with `detail: { value }` on every input and on clear.
 */
export class EtkanSearchBar extends LitElement {
  static properties = {
    placeholder: { type: String },
    value: { type: String },
  };

  declare placeholder: string;
  declare value: string;

  constructor() {
    super();
    this.placeholder = "";
    this.value = "";
  }

  static styles = [
    base,
    css`
      :host {
        display: block;
      }
      .field {
        display: flex;
        align-items: center;
        gap: var(--space-2);
        inline-size: 100%;
        block-size: var(--control-height-md);
        padding-inline: var(--field-padding-x);
        background: var(--surface-card);
        border: 1px solid var(--border-default);
        border-radius: var(--radius-pill);
        transition:
          border-color var(--duration-fast) var(--ease-standard),
          box-shadow var(--duration-fast) var(--ease-standard);
      }
      .field:hover {
        border-color: var(--border-strong);
      }
      .field:focus-within {
        border-color: var(--border-focus);
        box-shadow: var(--focus-glow);
      }

      .icon {
        flex: 0 0 auto;
        inline-size: 1.125em;
        block-size: 1.125em;
        color: var(--text-muted);
      }

      input {
        flex: 1 1 auto;
        min-inline-size: 0;
        block-size: 100%;
        margin: 0;
        padding: 0;
        border: none;
        outline: none;
        background: transparent;
        color: var(--text-strong);
        font-family: inherit;
        font-size: var(--text-md);
        line-height: var(--leading-normal);
      }
      input::placeholder {
        color: var(--text-subtle);
      }

      .clear {
        flex: 0 0 auto;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        inline-size: 1.5em;
        block-size: 1.5em;
        padding: 0;
        margin: 0;
        border: none;
        border-radius: var(--radius-pill);
        background: transparent;
        color: var(--text-muted);
        cursor: pointer;
        transition:
          background var(--duration-fast) var(--ease-standard),
          color var(--duration-fast) var(--ease-standard);
      }
      .clear:hover {
        background: var(--surface-hover);
        color: var(--text-strong);
      }
      .clear:active {
        background: var(--surface-active);
      }
      .clear:focus-visible {
        outline: none;
        box-shadow: var(--focus-ring);
      }
      .clear svg {
        inline-size: 1em;
        block-size: 1em;
      }
    `,
  ];

  private onInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.emit();
  }

  private onClear() {
    this.value = "";
    const input = this.renderRoot.querySelector("input");
    if (input) {
      input.value = "";
      input.focus();
    }
    this.emit();
  }

  private emit() {
    this.dispatchEvent(
      new CustomEvent("etkan-search", {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      }),
    );
  }

  render() {
    return html`
      <div class="field" part="field">
        <svg
          class="icon"
          part="icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input
          part="input"
          type="search"
          role="searchbox"
          .value=${this.value}
          placeholder=${this.placeholder || nothing}
          @input=${this.onInput}
        />
        ${this.value
          ? html`
              <button
                class="clear"
                part="clear"
                type="button"
                aria-label="Clear search"
                @click=${this.onClear}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            `
          : nothing}
      </div>
    `;
  }
}

if (!customElements.get("etkan-search-bar")) {
  customElements.define("etkan-search-bar", EtkanSearchBar);
}
