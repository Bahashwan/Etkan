import { LitElement, html, css } from "lit";
import { base } from "../shared";

/**
 * `<etkan-marquee>` — seamless infinite horizontal scroller. The slotted content
 * is cloned once for a gapless loop. Attributes: speed (s per loop), gap (px).
 * Direction-aware (reverses under RTL) and pauses on hover.
 */
export class EtkanMarquee extends LitElement {
  static properties = {
    speed: { type: Number },
    gap: { type: Number },
  };

  declare speed: number;
  declare gap: number;

  constructor() {
    super();
    this.speed = 30;
    this.gap = 12;
  }

  static styles = [
    base,
    css`
      :host {
        display: block;
        overflow: hidden;
        -webkit-mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
        mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
      }
      .track {
        display: flex;
        inline-size: max-content;
        animation: mq var(--mq-speed, 30s) linear infinite;
      }
      .row {
        display: flex;
        gap: var(--mq-gap, 12px);
        padding-inline-end: var(--mq-gap, 12px);
      }
      :host(:hover) .track {
        animation-play-state: paused;
      }
      :host-context([dir="rtl"]) .track {
        animation-name: mq-rtl;
      }
      @keyframes mq {
        to {
          transform: translateX(-50%);
        }
      }
      @keyframes mq-rtl {
        to {
          transform: translateX(50%);
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .track {
          animation: none;
        }
      }
    `,
  ];

  private _clone(event: Event) {
    const slot = event.target as HTMLSlotElement;
    const clone = this.renderRoot.querySelector<HTMLElement>(".row.clone");
    if (!clone) return;
    clone.replaceChildren(...slot.assignedElements().map((node) => node.cloneNode(true)));
  }

  render() {
    const vars = `--mq-speed:${this.speed}s;--mq-gap:${this.gap}px`;
    return html`
      <div class="track" style=${vars}>
        <div class="row"><slot @slotchange=${this._clone}></slot></div>
        <div class="row clone" aria-hidden="true"></div>
      </div>
    `;
  }
}

if (!customElements.get("etkan-marquee")) {
  customElements.define("etkan-marquee", EtkanMarquee);
}
