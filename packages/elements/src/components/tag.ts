import { LitElement, html, css, nothing } from "lit";
import { base } from "../shared";

/**
 * `<etkan-tag>` — a compact, removable chip.
 * Attributes: color (any CSS color for a small leading dot), removable,
 * remove-label (accessible label for the remove button, default "Remove").
 * Content is projected via the default `<slot>`. When `removable` is set, a
 * trailing × button dispatches the `etkan-remove` event.
 */
export class EtkanTag extends LitElement {
  static properties = {
    color: { type: String },
    removable: { type: Boolean, reflect: true },
    removeLabel: { type: String, attribute: "remove-label" },
  };

  declare color: string;
  declare removable: boolean;
  declare removeLabel: string;

  constructor() {
    super();
    this.color = "";
    this.removable = false;
    this.removeLabel = "Remove";
  }

  static styles = [
    base,
    css`
      :host {
        display: inline-flex;
      }
      .tag {
        display: inline-flex;
        align-items: center;
        gap: var(--space-2);
        block-size: var(--control-height-sm);
        padding-inline: var(--space-3);
        border: 1px solid var(--border-subtle);
        border-radius: var(--radius-pill);
        background: var(--surface-card);
        color: var(--text-body);
        font-family: inherit;
        font-size: var(--text-sm);
        font-weight: var(--fw-medium);
        line-height: var(--leading-normal);
        white-space: nowrap;
      }
      .dot {
        display: inline-block;
        inline-size: var(--space-2);
        block-size: var(--space-2);
        border-radius: var(--radius-pill);
        background: var(--dot-color);
        flex: 0 0 auto;
      }
      .content {
        display: inline-flex;
        align-items: center;
      }
      .remove {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        inline-size: 1.25em;
        block-size: 1.25em;
        margin-inline-end: calc(-1 * var(--space-1));
        padding: 0;
        border: none;
        border-radius: var(--radius-pill);
        background: transparent;
        color: var(--text-muted);
        font-family: inherit;
        font-size: inherit;
        line-height: 1;
        cursor: pointer;
        transition:
          background var(--duration-fast) var(--ease-standard),
          color var(--duration-fast) var(--ease-standard);
      }
      .remove:hover {
        background: var(--surface-hover);
        color: var(--text-strong);
      }
      .remove:active {
        background: var(--surface-active);
      }
      .remove:focus-visible {
        outline: none;
        box-shadow: var(--focus-ring);
      }
      .remove svg {
        inline-size: 0.75em;
        block-size: 0.75em;
        display: block;
      }
    `,
  ];

  private _handleRemove(event: Event) {
    event.stopPropagation();
    this.dispatchEvent(
      new CustomEvent("etkan-remove", {
        bubbles: true,
        composed: true,
        detail: { value: this.textContent?.trim() ?? "" },
      }),
    );
  }

  render() {
    const dot = this.color
      ? html`<span
          class="dot"
          part="dot"
          style="--dot-color: ${this.color}"
          aria-hidden="true"
        ></span>`
      : nothing;

    const remove = this.removable
      ? html`<button
          type="button"
          class="remove"
          part="remove"
          aria-label=${this.removeLabel}
          @click=${this._handleRemove}
        >
          <svg viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path
              d="M2.5 2.5 9.5 9.5M9.5 2.5 2.5 9.5"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
            />
          </svg>
        </button>`
      : nothing;

    return html`
      <span class="tag" part="tag">
        ${dot}
        <span class="content"><slot></slot></span>
        ${remove}
      </span>
    `;
  }
}

if (!customElements.get("etkan-tag")) {
  customElements.define("etkan-tag", EtkanTag);
}
