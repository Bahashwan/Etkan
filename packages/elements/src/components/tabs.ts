import { LitElement, html, css } from "lit";
import { base } from "../shared";

interface TabItem {
  label: string;
  value: string;
  el: HTMLElement;
}

/**
 * `<etkan-tabs>` — a tabbed interface built from slotted panels.
 *
 * Each direct child element is a panel that carries a `label` attribute (the
 * visible tab text) and an optional `value` attribute (defaults to the label).
 * The active panel is shown; the others get `hidden`. Fully bilingual: the
 * tablist uses logical layout, so `dir="rtl"` mirrors it automatically.
 *
 * Attributes: value (active value), variant (underline|pills).
 * Fires `etkan-change` with detail `{ value }` when the active tab changes.
 */
export class EtkanTabs extends LitElement {
  static properties = {
    value: { type: String, reflect: true },
    variant: { type: String, reflect: true },
    _tabs: { state: true },
  };

  declare value: string;
  declare variant: "underline" | "pills";
  declare private _tabs: TabItem[];

  constructor() {
    super();
    this.value = "";
    this.variant = "underline";
    this._tabs = [];
  }

  static styles = [
    base,
    css`
      :host {
        display: block;
      }

      .tablist {
        display: flex;
        align-items: stretch;
        gap: var(--space-1);
        border-block-end: 1px solid var(--border-subtle);
      }
      :host([variant="pills"]) .tablist {
        gap: var(--space-2);
        border-block-end: none;
      }

      .tab {
        appearance: none;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: var(--space-2);
        margin: 0;
        padding-inline: var(--space-4);
        padding-block: var(--space-2);
        min-block-size: var(--control-height-md);
        background: transparent;
        border: none;
        color: var(--text-muted);
        font-family: inherit;
        font-size: var(--text-md);
        font-weight: var(--fw-medium);
        line-height: 1;
        white-space: nowrap;
        cursor: pointer;
        transition:
          color var(--duration-fast) var(--ease-standard),
          background var(--duration-fast) var(--ease-standard),
          border-color var(--duration-fast) var(--ease-standard);
      }
      .tab:hover {
        color: var(--text-strong);
      }
      .tab:focus-visible {
        outline: none;
        box-shadow: var(--focus-ring);
        border-radius: var(--radius-sm);
      }

      /* Underline variant */
      :host([variant="underline"]) .tab {
        border-block-end: 2px solid transparent;
        /* pull the 2px border onto the track so it overlaps cleanly */
        margin-block-end: -1px;
      }
      :host([variant="underline"]) .tab[aria-selected="true"] {
        color: var(--brand-primary);
        border-block-end-color: var(--brand-primary);
      }

      /* Pills variant */
      :host([variant="pills"]) .tab {
        border-radius: var(--radius-pill);
      }
      :host([variant="pills"]) .tab[aria-selected="true"] {
        background: var(--brand-primary-soft);
        color: var(--brand-primary-soft-text);
      }

      .panels {
        padding-block-start: var(--space-4);
      }

      @media (prefers-reduced-motion: no-preference) {
        ::slotted(*:not([hidden])) {
          animation: fade var(--duration-base) var(--ease-out);
        }
      }
      @keyframes fade {
        from {
          opacity: 0;
          transform: translateY(var(--space-1));
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `,
  ];

  private _onSlotChange = (e: Event) => {
    const slot = e.target as HTMLSlotElement;
    const elements = slot
      .assignedElements({ flatten: true })
      .filter((n): n is HTMLElement => n instanceof HTMLElement);

    this._tabs = elements.map((el) => {
      const label = el.getAttribute("label") ?? "";
      const value = el.getAttribute("value") ?? label;
      return { label, value, el };
    });

    // Default to the first panel's value when unset or stale.
    if (!this.value || !this._tabs.some((t) => t.value === this.value)) {
      this.value = this._tabs.length ? this._tabs[0].value : "";
    }

    this._syncPanels();
  };

  /** Show only the active panel; hide the rest (light-DOM children). */
  private _syncPanels() {
    for (const tab of this._tabs) {
      tab.el.hidden = tab.value !== this.value;
    }
  }

  private _select(value: string) {
    if (value === this.value) return;
    this.value = value;
    this.dispatchEvent(
      new CustomEvent("etkan-change", {
        detail: { value },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private _onKeydown(e: KeyboardEvent, index: number) {
    if (this._tabs.length === 0) return;
    let next = index;
    if (e.key === "ArrowRight") {
      next = (index + 1) % this._tabs.length;
    } else if (e.key === "ArrowLeft") {
      next = (index - 1 + this._tabs.length) % this._tabs.length;
    } else if (e.key === "Home") {
      next = 0;
    } else if (e.key === "End") {
      next = this._tabs.length - 1;
    } else {
      return;
    }
    e.preventDefault();
    const target = this._tabs[next];
    this._select(target.value);
    const btn = this.renderRoot.querySelectorAll<HTMLButtonElement>(".tab")[next];
    btn?.focus();
  }

  updated(changed: Map<string, unknown>) {
    if (changed.has("value")) {
      this._syncPanels();
    }
  }

  render() {
    return html`
      <div class="tablist" role="tablist" part="tablist">
        ${this._tabs.map((tab, i) => {
          const selected = tab.value === this.value;
          return html`
            <button
              class="tab"
              part="tab"
              role="tab"
              type="button"
              aria-selected=${selected ? "true" : "false"}
              tabindex=${selected ? "0" : "-1"}
              @click=${() => this._select(tab.value)}
              @keydown=${(e: KeyboardEvent) => this._onKeydown(e, i)}
            >
              ${tab.label}
            </button>
          `;
        })}
      </div>
      <div class="panels" part="panels" role="tabpanel">
        <slot @slotchange=${this._onSlotChange}></slot>
      </div>
    `;
  }
}

if (!customElements.get("etkan-tabs")) {
  customElements.define("etkan-tabs", EtkanTabs);
}
