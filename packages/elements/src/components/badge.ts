import { LitElement, html, css, nothing } from "lit";
import { base } from "../shared";

/**
 * `<etkan-badge>` — a compact status pill.
 * Attributes: tone (neutral|primary|success|warning|danger|info),
 * variant (soft|solid), dot (boolean). Content is projected via the default slot.
 */
export class EtkanBadge extends LitElement {
  static properties = {
    tone: { type: String, reflect: true },
    variant: { type: String, reflect: true },
    dot: { type: Boolean, reflect: true },
  };

  declare tone: "neutral" | "primary" | "success" | "warning" | "danger" | "info";
  declare variant: "soft" | "solid";
  declare dot: boolean;

  constructor() {
    super();
    this.tone = "neutral";
    this.variant = "soft";
    this.dot = false;
  }

  static styles = [
    base,
    css`
      :host {
        display: inline-flex;
      }
      .badge {
        display: inline-flex;
        align-items: center;
        gap: var(--space-2);
        padding-block: var(--space-1);
        padding-inline: var(--space-3);
        border-radius: var(--radius-pill);
        font-family: inherit;
        font-size: var(--text-xs);
        font-weight: var(--fw-medium);
        line-height: 1;
        white-space: nowrap;
        vertical-align: middle;
      }

      .dot {
        inline-size: 0.5em;
        block-size: 0.5em;
        border-radius: 50%;
        background: currentColor;
        flex: 0 0 auto;
      }

      /* --- soft (default) --- */
      .badge[data-variant="soft"][data-tone="neutral"] {
        background: var(--surface-sunken);
        color: var(--text-body);
      }
      .badge[data-variant="soft"][data-tone="primary"] {
        background: var(--brand-primary-soft);
        color: var(--brand-primary-soft-text);
      }
      .badge[data-variant="soft"][data-tone="success"] {
        background: var(--success-surface);
        color: var(--success-text);
      }
      .badge[data-variant="soft"][data-tone="warning"] {
        background: var(--warning-surface);
        color: var(--warning-text);
      }
      .badge[data-variant="soft"][data-tone="danger"] {
        background: var(--danger-surface);
        color: var(--danger-text);
      }
      .badge[data-variant="soft"][data-tone="info"] {
        background: var(--info-surface);
        color: var(--info-text);
      }

      /* --- solid --- */
      .badge[data-variant="solid"][data-tone="neutral"] {
        background: var(--text-strong);
        color: var(--surface-page);
      }
      .badge[data-variant="solid"][data-tone="primary"] {
        background: var(--brand-primary);
        color: #fff;
      }
      .badge[data-variant="solid"][data-tone="success"] {
        background: var(--success-solid);
        color: #fff;
      }
      .badge[data-variant="solid"][data-tone="warning"] {
        background: var(--warning-solid);
        color: #fff;
      }
      .badge[data-variant="solid"][data-tone="danger"] {
        background: var(--danger-solid);
        color: #fff;
      }
      .badge[data-variant="solid"][data-tone="info"] {
        background: var(--info-solid);
        color: #fff;
      }
    `,
  ];

  render() {
    return html`
      <span class="badge" part="badge" data-tone=${this.tone} data-variant=${this.variant}>
        ${this.dot ? html`<span class="dot" part="dot" aria-hidden="true"></span>` : nothing}
        <slot></slot>
      </span>
    `;
  }
}

if (!customElements.get("etkan-badge")) {
  customElements.define("etkan-badge", EtkanBadge);
}
