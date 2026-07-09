import { LitElement, html, css } from "lit";
import { base } from "../shared";

/**
 * `<etkan-reveal>` — fades and slides its content in the first time it scrolls
 * into view. Attribute: delay (ms). Honors prefers-reduced-motion.
 */
export class EtkanReveal extends LitElement {
  static properties = {
    delay: { type: Number },
    revealed: { type: Boolean, reflect: true },
  };

  declare delay: number;
  declare revealed: boolean;
  private _io?: IntersectionObserver;

  constructor() {
    super();
    this.delay = 0;
    this.revealed = false;
  }

  static styles = [
    base,
    css`
      :host {
        display: block;
        opacity: 0;
        transform: translateY(24px);
        transition:
          opacity 0.7s var(--ease-out),
          transform 0.7s var(--ease-out);
        will-change: opacity, transform;
      }
      :host([revealed]) {
        opacity: 1;
        transform: none;
      }
      @media (prefers-reduced-motion: reduce) {
        :host {
          opacity: 1;
          transform: none;
          transition: none;
        }
      }
    `,
  ];

  connectedCallback() {
    super.connectedCallback();
    if (typeof window === "undefined") {
      this.revealed = true;
      return;
    }
    this.style.transitionDelay = `${this.delay}ms`;
    this._io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.revealed = true;
            this._io?.disconnect();
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    this._io.observe(this);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._io?.disconnect();
  }

  render() {
    return html`<slot></slot>`;
  }
}

if (!customElements.get("etkan-reveal")) {
  customElements.define("etkan-reveal", EtkanReveal);
}
