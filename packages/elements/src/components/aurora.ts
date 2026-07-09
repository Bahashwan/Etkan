import { LitElement, html, css } from "lit";
import { base } from "../shared";

/**
 * `<etkan-aurora>` — a decorative animated gradient backdrop of drifting,
 * blurred brand-colored blobs. Place content inside to layer it above.
 */
export class EtkanAurora extends LitElement {
  static styles = [
    base,
    css`
      :host {
        display: block;
        position: relative;
        overflow: hidden;
      }
      b {
        position: absolute;
        display: block;
        border-radius: 50%;
        filter: blur(70px);
      }
      b:nth-child(1) {
        inline-size: 460px;
        block-size: 460px;
        inset-block-start: -120px;
        inset-inline-start: 8%;
        background: color-mix(in srgb, var(--brand-primary) 70%, transparent);
        opacity: 0.55;
        animation: d1 18s ease-in-out infinite;
      }
      b:nth-child(2) {
        inline-size: 380px;
        block-size: 380px;
        inset-block-start: -40px;
        inset-inline-end: 10%;
        background: color-mix(in srgb, var(--brand-accent) 60%, transparent);
        opacity: 0.5;
        animation: d2 22s ease-in-out infinite;
      }
      b:nth-child(3) {
        inline-size: 320px;
        block-size: 320px;
        inset-block-start: 140px;
        inset-inline-start: 42%;
        background: color-mix(in srgb, var(--brand-primary) 45%, transparent);
        opacity: 0.4;
        animation: d3 26s ease-in-out infinite;
      }
      :host-context([data-theme="dark"]) b {
        opacity: 0.38;
      }
      @keyframes d1 {
        0%,
        100% {
          transform: translate(0, 0) scale(1);
        }
        50% {
          transform: translate(40px, 30px) scale(1.08);
        }
      }
      @keyframes d2 {
        0%,
        100% {
          transform: translate(0, 0) scale(1);
        }
        50% {
          transform: translate(-36px, 24px) scale(1.1);
        }
      }
      @keyframes d3 {
        0%,
        100% {
          transform: translate(0, 0) scale(1);
        }
        50% {
          transform: translate(20px, -28px) scale(1.06);
        }
      }
      @media (prefers-reduced-motion: reduce) {
        b {
          animation: none;
        }
      }
    `,
  ];

  render() {
    return html`<b></b><b></b><b></b><slot></slot>`;
  }
}

if (!customElements.get("etkan-aurora")) {
  customElements.define("etkan-aurora", EtkanAurora);
}
