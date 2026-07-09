import { LitElement, html, css } from "lit";
import { base } from "../shared";

/**
 * `<etkan-parallax>` — translates its content as the page scrolls, so it drifts
 * with the movement. Attribute: speed (positive drifts down, negative up).
 */
export class EtkanParallax extends LitElement {
  static properties = {
    speed: { type: Number },
  };

  declare speed: number;
  private _raf = 0;
  private _onScroll?: () => void;

  constructor() {
    super();
    this.speed = 0.12;
  }

  static styles = [
    base,
    css`
      :host {
        display: block;
        transform: translate3d(0, var(--p, 0px), 0);
        will-change: transform;
      }
      @media (prefers-reduced-motion: reduce) {
        :host {
          transform: none !important;
        }
      }
    `,
  ];

  connectedCallback() {
    super.connectedCallback();
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const update = () => {
      this._raf = 0;
      const rect = this.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const delta = rect.top + rect.height / 2 - vh / 2;
      this.style.setProperty("--p", `${(-delta * this.speed).toFixed(1)}px`);
    };
    this._onScroll = () => {
      if (!this._raf) this._raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", this._onScroll, { passive: true });
    window.addEventListener("resize", this._onScroll, { passive: true });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._onScroll) {
      window.removeEventListener("scroll", this._onScroll);
      window.removeEventListener("resize", this._onScroll);
    }
    if (this._raf) cancelAnimationFrame(this._raf);
  }

  render() {
    return html`<slot></slot>`;
  }
}

if (!customElements.get("etkan-parallax")) {
  customElements.define("etkan-parallax", EtkanParallax);
}
