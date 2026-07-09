import { LitElement, html, css, nothing } from "lit";
import type { PropertyValues } from "lit";
import { base } from "../shared";

/** A single entry in the `<etkan-menu>` popup. */
export interface EtkanMenuItem {
  label?: string;
  icon?: string;
  danger?: boolean;
  divider?: boolean;
  disabled?: boolean;
  shortcut?: string;
  onClick?: () => void;
}

/**
 * `<etkan-menu>` — a dropdown menu.
 *
 * A named `trigger` slot supplies the trigger content, wrapped in a shadow
 * `<button aria-haspopup="menu">` that toggles the popup. Items are supplied via
 * the `items` property. Selecting an item calls its `onClick`, dispatches
 * `etkan-select` with `{ index, item }` and closes the menu.
 *
 * Attributes: open (Boolean, reflected), align (start|end).
 */
export class EtkanMenu extends LitElement {
  static properties = {
    open: { type: Boolean, reflect: true },
    align: { type: String },
    items: { attribute: false },
  };

  declare open: boolean;
  declare align: "start" | "end";
  declare items: EtkanMenuItem[];

  private _onDocClick?: (e: MouseEvent) => void;
  private _onKeyDown?: (e: KeyboardEvent) => void;

  constructor() {
    super();
    this.open = false;
    this.align = "start";
    this.items = [];
  }

  static styles = [
    base,
    css`
      :host {
        display: inline-block;
        position: relative;
      }

      button.trigger {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: var(--space-2);
        font-family: inherit;
        font-size: var(--text-md);
        color: inherit;
        background: transparent;
        border: none;
        padding: 0;
        cursor: pointer;
      }
      button.trigger:focus-visible {
        outline: none;
        box-shadow: var(--focus-ring);
        border-radius: var(--radius-sm);
      }

      .popup {
        position: absolute;
        inset-block-start: 100%;
        margin-block-start: var(--space-1);
        min-inline-size: 12rem;
        padding-block: var(--space-1);
        background: var(--surface-card);
        border: 1px solid var(--border-subtle);
        border-radius: var(--radius-md);
        box-shadow: var(--shadow-lg);
        z-index: 50;
      }
      .popup[data-align="start"] {
        inset-inline-start: 0;
      }
      .popup[data-align="end"] {
        inset-inline-end: 0;
      }

      @keyframes menu-in {
        from {
          opacity: 0;
          transform: translateY(-4px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      .popup {
        animation: menu-in var(--duration-fast) var(--ease-out);
      }
      @media (prefers-reduced-motion: reduce) {
        .popup {
          animation: none;
        }
      }

      .menuitem {
        display: flex;
        align-items: center;
        gap: var(--space-2);
        inline-size: 100%;
        padding-inline: var(--field-padding-x);
        padding-block: var(--space-2);
        border: none;
        background: transparent;
        font-family: inherit;
        font-size: var(--text-sm);
        color: var(--text-body);
        text-align: start;
        cursor: pointer;
      }
      .menuitem:hover:not([disabled]),
      .menuitem:focus-visible:not([disabled]) {
        outline: none;
        background: var(--surface-hover);
      }
      .menuitem[disabled] {
        opacity: 0.5;
        cursor: not-allowed;
      }
      .menuitem[data-danger] {
        color: var(--danger-text);
      }
      .menuitem[data-danger]:hover:not([disabled]),
      .menuitem[data-danger]:focus-visible:not([disabled]) {
        background: var(--danger-surface);
      }

      .icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        inline-size: 1em;
        block-size: 1em;
        flex: none;
      }
      .label {
        flex: 1 1 auto;
      }
      .shortcut {
        flex: none;
        margin-inline-start: var(--space-4);
        font-size: var(--text-xs);
        color: var(--text-subtle);
      }

      .separator {
        block-size: 1px;
        margin-block: var(--space-1);
        margin-inline: 0;
        background: var(--border-subtle);
        border: none;
      }
    `,
  ];

  connectedCallback(): void {
    super.connectedCallback();
    if (typeof document === "undefined") return;
    this._onDocClick = (e: MouseEvent) => {
      if (!this.open) return;
      const path = e.composedPath();
      if (!path.includes(this)) {
        this.open = false;
      }
    };
    this._onKeyDown = (e: KeyboardEvent) => {
      if (this.open && e.key === "Escape") {
        e.stopPropagation();
        this.open = false;
        const trigger = this.shadowRoot?.querySelector<HTMLButtonElement>("button.trigger");
        trigger?.focus();
      }
    };
    document.addEventListener("click", this._onDocClick);
    document.addEventListener("keydown", this._onKeyDown);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    if (typeof document === "undefined") return;
    if (this._onDocClick) document.removeEventListener("click", this._onDocClick);
    if (this._onKeyDown) document.removeEventListener("keydown", this._onKeyDown);
    this._onDocClick = undefined;
    this._onKeyDown = undefined;
  }

  private _toggle = (e: MouseEvent): void => {
    e.stopPropagation();
    this.open = !this.open;
  };

  private _selectItem(index: number, item: EtkanMenuItem): void {
    if (item.disabled) return;
    item.onClick?.();
    this.dispatchEvent(
      new CustomEvent("etkan-select", {
        detail: { index, item },
        bubbles: true,
        composed: true,
      }),
    );
    this.open = false;
  }

  /** React to `open` changing to drive the popup's open/close side effects. */
  updated(changed: PropertyValues<this>): void {
    if (!changed.has("open")) return;
    if (typeof document === "undefined") return;
    if (this.open) {
      // Opening: move focus to the first enabled item (ARIA menu behavior).
      const first = this.shadowRoot?.querySelector<HTMLButtonElement>(
        ".menuitem:not([disabled])",
      );
      first?.focus();
    }
  }

  render() {
    return html`
      <button
        class="trigger"
        part="trigger"
        type="button"
        aria-haspopup="menu"
        aria-expanded=${this.open ? "true" : "false"}
        @click=${this._toggle}
      >
        <slot name="trigger"></slot>
      </button>
      ${this.open
        ? html`
            <div class="popup" role="menu" part="popup" data-align=${this.align}>
              ${this.items.map((item, index) =>
                item.divider
                  ? html`<hr class="separator" role="separator" />`
                  : html`
                      <button
                        class="menuitem"
                        role="menuitem"
                        part="item"
                        type="button"
                        ?disabled=${item.disabled}
                        ?data-danger=${item.danger}
                        @click=${(e: MouseEvent) => {
                          e.stopPropagation();
                          this._selectItem(index, item);
                        }}
                      >
                        ${item.icon
                          ? html`<span class="icon" aria-hidden="true">${item.icon}</span>`
                          : nothing}
                        <span class="label">${item.label}</span>
                        ${item.shortcut
                          ? html`<span class="shortcut">${item.shortcut}</span>`
                          : nothing}
                      </button>
                    `,
              )}
            </div>
          `
        : nothing}
    `;
  }
}

if (!customElements.get("etkan-menu")) {
  customElements.define("etkan-menu", EtkanMenu);
}
