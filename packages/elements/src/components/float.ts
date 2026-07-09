import { LitElement, html, css, type PropertyValues } from "lit";
import { base } from "../shared";

/**
 * `<etkan-float>` — gently bobs its content up and down. Attributes: rotate
 * (static tilt in deg), delay (s, to desync multiple floats).
 */
export class EtkanFloat extends LitElement {
  static properties = {
    rotate: { type: Number },
    delay: { type: Number },
  };

  declare rotate: number;
  declare delay: number;

  constructor() {
    super();
    this.rotate = 0;
    this.delay = 0;
  }

  static styles = [
    base,
    css`
      :host {
        display: inline-block;
        animation: float 7s ease-in-out infinite;
      }
      @keyframes float {
        0%,
        100% {
          transform: translateY(0) rotate(var(--r, 0deg));
        }
        50% {
          transform: translateY(-12px) rotate(var(--r, 0deg));
        }
      }
      @media (prefers-reduced-motion: reduce) {
        :host {
          animation: none;
          transform: rotate(var(--r, 0deg));
        }
      }
    `,
  ];

  updated(_changed: PropertyValues) {
    this.style.setProperty("--r", `${this.rotate}deg`);
    this.style.animationDelay = `${this.delay}s`;
  }

  render() {
    return html`<slot></slot>`;
  }
}

if (!customElements.get("etkan-float")) {
  customElements.define("etkan-float", EtkanFloat);
}
