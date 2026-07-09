import { LitElement, html, css, type PropertyValues } from "lit";
import { base } from "../shared";

/**
 * `<etkan-sidebar>` — a ready side-navigation panel. Slots: `header` (top), the
 * default slot for items, and `footer` (pinned to the bottom). Sits on the
 * leading side and flips under RTL. Attribute: width (px, default 240).
 */
export class EtkanSidebar extends LitElement {
  static properties = {
    width: { type: Number },
  };

  declare width: number;

  constructor() {
    super();
    this.width = 240;
  }

  static styles = [
    base,
    css`
      :host {
        display: flex;
        flex-direction: column;
        gap: var(--space-1);
        inline-size: var(--sb-w, 240px);
        block-size: 100%;
        padding: var(--space-4);
        border-inline-end: 1px solid var(--border-subtle);
        background: var(--surface-card);
      }
      .header {
        margin-block-end: var(--space-3);
      }
      .footer {
        margin-block-start: auto;
      }
      ::slotted(a),
      ::slotted(button) {
        display: flex;
        align-items: center;
        gap: var(--space-3);
        padding: 8px 10px;
        border-radius: var(--radius-md);
        color: var(--text-body);
        font: inherit;
        text-decoration: none;
        cursor: pointer;
        background: none;
        border: none;
      }
      ::slotted(a:hover),
      ::slotted(button:hover) {
        background: var(--surface-hover);
      }
    `,
  ];

  updated(_changed: PropertyValues) {
    this.style.setProperty("--sb-w", `${this.width}px`);
  }

  render() {
    return html`
      <div class="header"><slot name="header"></slot></div>
      <slot></slot>
      <div class="footer"><slot name="footer"></slot></div>
    `;
  }
}

if (!customElements.get("etkan-sidebar")) {
  customElements.define("etkan-sidebar", EtkanSidebar);
}
