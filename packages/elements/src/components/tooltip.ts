import { LitElement, html, css, nothing, type PropertyValues } from "lit";
import { base } from "../shared";

/**
 * `<etkan-tooltip>` — a lightweight tooltip that wraps a single trigger.
 *
 * The default slot is the trigger element; the bubble text comes from the
 * `content` property. The public boolean `open` reflects visibility: it is
 * raised on hover (after `openDelay` ms) and focus, and lowered on leave, blur,
 * or Escape. Changes to `open` are observed in `updated()`, which fires the
 * `etkan-tooltip-show` / `etkan-tooltip-hide` events. All positioning uses
 * logical properties so `side="start"`/`"end"` flip automatically in RTL.
 *
 * Attributes: content (String), side (top|bottom|start|end, default top),
 * open-delay (Number ms, default 300), open (Boolean, reflected).
 */
export class EtkanTooltip extends LitElement {
  static properties = {
    content: { type: String },
    side: { type: String },
    openDelay: { type: Number, attribute: "open-delay" },
    open: { type: Boolean, reflect: true },
  };

  declare content: string;
  declare side: "top" | "bottom" | "start" | "end";
  declare openDelay: number;
  declare open: boolean;

  private _openTimer: ReturnType<typeof setTimeout> | null = null;

  private readonly _onEnter = () => this._scheduleShow();
  private readonly _onFocus = () => this._show();
  private readonly _onLeave = () => this._hide();
  private readonly _onBlur = () => this._hide();
  private readonly _onKeydown = (e: KeyboardEvent) => {
    if (e.key === "Escape" && this.open) this._hide();
  };

  constructor() {
    super();
    this.content = "";
    this.side = "top";
    this.openDelay = 300;
    this.open = false;
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("mouseenter", this._onEnter);
    this.addEventListener("focusin", this._onFocus);
    this.addEventListener("mouseleave", this._onLeave);
    this.addEventListener("focusout", this._onBlur);
    if (typeof document !== "undefined") {
      document.addEventListener("keydown", this._onKeydown);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("mouseenter", this._onEnter);
    this.removeEventListener("focusin", this._onFocus);
    this.removeEventListener("mouseleave", this._onLeave);
    this.removeEventListener("focusout", this._onBlur);
    if (typeof document !== "undefined") {
      document.removeEventListener("keydown", this._onKeydown);
    }
    this._clearTimer();
  }

  private _clearTimer() {
    if (this._openTimer !== null) {
      clearTimeout(this._openTimer);
      this._openTimer = null;
    }
  }

  private _scheduleShow() {
    if (!this.content || this.open) return;
    this._clearTimer();
    this._openTimer = setTimeout(() => {
      this._openTimer = null;
      this._show();
    }, this.openDelay);
  }

  private _show() {
    this._clearTimer();
    if (!this.content || this.open) return;
    this.open = true;
  }

  private _hide() {
    this._clearTimer();
    if (!this.open) return;
    this.open = false;
  }

  // Boolean `open` drives visibility and event dispatch.
  updated(changed: PropertyValues) {
    if (changed.has("open")) {
      const previous = changed.get("open") as boolean | undefined;
      if (this.open && !previous) {
        this.dispatchEvent(
          new CustomEvent("etkan-tooltip-show", {
            bubbles: true,
            composed: true,
            detail: { content: this.content, side: this.side },
          }),
        );
      } else if (!this.open && previous) {
        this.dispatchEvent(
          new CustomEvent("etkan-tooltip-hide", {
            bubbles: true,
            composed: true,
            detail: { content: this.content, side: this.side },
          }),
        );
      }
    }
  }

  static styles = [
    base,
    css`
      :host {
        display: inline-block;
        position: relative;
      }

      .bubble {
        position: absolute;
        z-index: 1000;
        max-inline-size: max-content;
        padding-block: 4px;
        padding-inline: 8px;
        background: var(--text-strong);
        color: var(--surface-card);
        border-radius: var(--radius-sm);
        font-family: inherit;
        font-size: var(--text-xs);
        line-height: 1.4;
        white-space: nowrap;
        pointer-events: none;
        opacity: 0;
        transition: opacity var(--duration-fast) var(--ease-out);
      }
      .bubble[data-visible] {
        opacity: 1;
      }

      .arrow {
        position: absolute;
        inline-size: 6px;
        block-size: 6px;
        background: var(--text-strong);
        transform: rotate(45deg);
      }

      /* top */
      .bubble[data-side="top"] {
        inset-block-end: calc(100% + 6px);
        inset-inline-start: 50%;
        transform: translateX(-50%);
      }
      .bubble[data-side="top"] .arrow {
        inset-block-end: -3px;
        inset-inline-start: 50%;
        margin-inline-start: -3px;
      }

      /* bottom */
      .bubble[data-side="bottom"] {
        inset-block-start: calc(100% + 6px);
        inset-inline-start: 50%;
        transform: translateX(-50%);
      }
      .bubble[data-side="bottom"] .arrow {
        inset-block-start: -3px;
        inset-inline-start: 50%;
        margin-inline-start: -3px;
      }

      /* start (logical: left in LTR, right in RTL) */
      .bubble[data-side="start"] {
        inset-inline-end: calc(100% + 6px);
        inset-block-start: 50%;
        transform: translateY(-50%);
      }
      .bubble[data-side="start"] .arrow {
        inset-inline-end: -3px;
        inset-block-start: 50%;
        margin-block-start: -3px;
      }

      /* end (logical: right in LTR, left in RTL) */
      .bubble[data-side="end"] {
        inset-inline-start: calc(100% + 6px);
        inset-block-start: 50%;
        transform: translateY(-50%);
      }
      .bubble[data-side="end"] .arrow {
        inset-inline-start: -3px;
        inset-block-start: 50%;
        margin-block-start: -3px;
      }

      @media (prefers-reduced-motion: reduce) {
        .bubble {
          transition: none;
        }
      }
    `,
  ];

  render() {
    return html`
      <slot></slot>
      ${this.content
        ? html`
            <span
              class="bubble"
              role="tooltip"
              part="bubble"
              data-side=${this.side}
              ?data-visible=${this.open}
              aria-hidden=${this.open ? "false" : "true"}
            >
              ${this.content}
              <span class="arrow" part="arrow" aria-hidden="true"></span>
            </span>
          `
        : nothing}
    `;
  }
}

if (!customElements.get("etkan-tooltip")) {
  customElements.define("etkan-tooltip", EtkanTooltip);
}
