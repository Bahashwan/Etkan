import { LitElement, html, css } from "lit";
import { base } from "../shared";

/**
 * `<etkan-count-up>` — animates a number from 0 to `to` the first time it scrolls
 * into view. Attributes: to, suffix, decimals, duration (ms).
 */
export class EtkanCountUp extends LitElement {
  static properties = {
    to: { type: Number },
    suffix: { type: String },
    decimals: { type: Number },
    duration: { type: Number },
    _val: { state: true },
  };

  declare to: number;
  declare suffix: string;
  declare decimals: number;
  declare duration: number;
  declare _val: number;
  private _io?: IntersectionObserver;
  private _raf = 0;

  constructor() {
    super();
    this.to = 0;
    this.suffix = "";
    this.decimals = 0;
    this.duration = 1400;
    this._val = 0;
  }

  static styles = [
    base,
    css`
      :host {
        display: inline-block;
        font-variant-numeric: tabular-nums;
      }
    `,
  ];

  firstUpdated() {
    if (typeof window === "undefined") {
      this._val = this.to;
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      this._val = this.to;
      return;
    }
    this._io = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        this._io?.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / this.duration);
          const eased = 1 - Math.pow(1 - t, 3);
          this._val = this.to * eased;
          if (t < 1) this._raf = requestAnimationFrame(tick);
        };
        this._raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    this._io.observe(this);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._io?.disconnect();
    if (this._raf) cancelAnimationFrame(this._raf);
  }

  render() {
    const text = this._val.toLocaleString(undefined, {
      minimumFractionDigits: this.decimals,
      maximumFractionDigits: this.decimals,
    });
    return html`${text}${this.suffix}`;
  }
}

if (!customElements.get("etkan-count-up")) {
  customElements.define("etkan-count-up", EtkanCountUp);
}
