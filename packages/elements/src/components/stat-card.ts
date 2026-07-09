import { LitElement, html, css, nothing } from "lit";
import { base } from "../shared";

/**
 * `<etkan-stat-card>` — a ready-made KPI tile.
 * Attributes: label, value, delta (optional string like "+12%"),
 * tone (success|danger|neutral) for the delta chip.
 * Slots: `unit` — rendered inline after the value (e.g. a currency mark).
 */
export class EtkanStatCard extends LitElement {
  static properties = {
    label: { type: String },
    value: { type: String },
    delta: { type: String },
    tone: { type: String },
  };

  declare label: string;
  declare value: string;
  declare delta: string;
  declare tone: "success" | "danger" | "neutral";

  constructor() {
    super();
    this.label = "";
    this.value = "";
    this.delta = "";
    this.tone = "neutral";
  }

  static styles = [
    base,
    css`
      :host {
        display: block;
      }
      .card {
        display: flex;
        flex-direction: column;
        gap: var(--space-2);
        background: var(--surface-card);
        border: 1px solid var(--border-subtle);
        border-radius: var(--radius-lg);
        padding: var(--space-5);
      }
      .label {
        margin: 0;
        font-size: var(--text-sm);
        font-weight: var(--fw-medium);
        color: var(--text-muted);
        line-height: var(--leading-normal);
      }
      .row {
        display: flex;
        align-items: baseline;
        flex-wrap: wrap;
        gap: var(--space-2);
      }
      .value {
        display: inline-flex;
        align-items: baseline;
        gap: var(--space-1);
        font-size: var(--text-3xl);
        font-weight: var(--fw-bold);
        letter-spacing: -0.02em;
        color: var(--text-strong);
        line-height: 1;
      }
      .delta {
        display: inline-flex;
        align-items: center;
        padding-block: var(--space-1);
        padding-inline: var(--space-2);
        border-radius: var(--radius-pill);
        font-size: var(--text-xs);
        font-weight: var(--fw-semibold);
        line-height: 1;
        white-space: nowrap;
      }
      .delta[data-tone="neutral"] {
        background: var(--surface-sunken);
        color: var(--text-body);
      }
      .delta[data-tone="success"] {
        background: var(--success-surface);
        color: var(--success-text);
      }
      .delta[data-tone="danger"] {
        background: var(--danger-surface);
        color: var(--danger-text);
      }
      ::slotted([slot="unit"]) {
        font-size: var(--text-lg);
        font-weight: var(--fw-semibold);
        color: var(--text-muted);
        letter-spacing: normal;
      }
    `,
  ];

  private emitSelect() {
    this.dispatchEvent(
      new CustomEvent("etkan-stat-select", {
        bubbles: true,
        composed: true,
        detail: {
          label: this.label,
          value: this.value,
          delta: this.delta,
          tone: this.tone,
        },
      })
    );
  }

  render() {
    return html`
      <div class="card" part="card" @click=${this.emitSelect}>
        <p class="label" part="label">${this.label}</p>
        <div class="row">
          <span class="value" part="value">
            <span>${this.value}</span>
            <slot name="unit"></slot>
          </span>
          ${this.delta
            ? html`<span class="delta" part="delta" data-tone=${this.tone}
                >${this.delta}</span
              >`
            : nothing}
        </div>
      </div>
    `;
  }
}

if (!customElements.get("etkan-stat-card")) {
  customElements.define("etkan-stat-card", EtkanStatCard);
}
