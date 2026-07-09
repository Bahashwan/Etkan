import { LitElement, html, css } from "lit";
import { base } from "../shared";

/**
 * `<etkan-spinner>` — an indeterminate loading indicator.
 * A rotating ring that inherits the current text color (`currentColor`).
 * Attributes: size (Number, pixel diameter, default 20).
 * Exposes `role="status"` with a visually-hidden "Loading" label for
 * assistive technology. Honours `prefers-reduced-motion` by slowing the
 * animation rather than stopping it.
 */
export class EtkanSpinner extends LitElement {
  static properties = {
    size: { type: Number, reflect: true },
  };

  declare size: number;

  constructor() {
    super();
    this.size = 20;
  }

  connectedCallback(): void {
    super.connectedCallback();
    if (!this.hasAttribute("role")) this.setAttribute("role", "status");
  }

  static styles = [
    base,
    css`
      :host {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        line-height: 1;
      }
      .ring {
        inline-size: var(--etkan-spinner-size, 20px);
        block-size: var(--etkan-spinner-size, 20px);
        border: 2px solid currentColor;
        border-block-start-color: transparent;
        border-radius: 50%;
        animation: etkan-spin 0.7s linear infinite;
      }
      .visually-hidden {
        position: absolute;
        inline-size: 1px;
        block-size: 1px;
        margin-inline: -1px;
        padding: 0;
        border: 0;
        clip-path: inset(50%);
        overflow: hidden;
        white-space: nowrap;
      }
      @keyframes etkan-spin {
        to {
          transform: rotate(360deg);
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .ring {
          animation-duration: 1.8s;
        }
      }
    `,
  ];

  render() {
    return html`
      <div part="ring" class="ring" style="--etkan-spinner-size:${this.size}px"></div>
      <span class="visually-hidden">Loading</span>
    `;
  }
}

if (!customElements.get("etkan-spinner")) {
  customElements.define("etkan-spinner", EtkanSpinner);
}
