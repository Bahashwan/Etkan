import { LitElement, html, css } from "lit";
import { base } from "../shared";

/**
 * `<etkan-navbar>` — a ready top navigation bar. Slots: `brand` (leading), the
 * default slot for links, and `actions` (trailing). RTL-aware. Attribute:
 * sticky (default true).
 */
export class EtkanNavbar extends LitElement {
  static properties = {
    sticky: { type: Boolean, reflect: true },
  };

  declare sticky: boolean;

  constructor() {
    super();
    this.sticky = true;
  }

  static styles = [
    base,
    css`
      :host {
        display: flex;
        align-items: center;
        gap: var(--space-4);
        block-size: 64px;
        padding-inline: var(--space-6);
        border-block-end: 1px solid var(--border-subtle);
        background: color-mix(in srgb, var(--surface-page) 82%, transparent);
        backdrop-filter: blur(12px);
      }
      :host([sticky]) {
        position: sticky;
        inset-block-start: 0;
        z-index: 50;
      }
      .links {
        display: flex;
        align-items: center;
        gap: var(--space-1);
      }
      .actions {
        margin-inline-start: auto;
        display: flex;
        align-items: center;
        gap: var(--space-2);
      }
    `,
  ];

  render() {
    return html`
      <slot name="brand"></slot>
      <span class="links"><slot></slot></span>
      <span class="actions"><slot name="actions"></slot></span>
    `;
  }
}

if (!customElements.get("etkan-navbar")) {
  customElements.define("etkan-navbar", EtkanNavbar);
}
