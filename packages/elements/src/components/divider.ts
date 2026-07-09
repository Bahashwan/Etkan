import { LitElement, html, css, nothing } from "lit";
import { base } from "../shared";

/**
 * `<etkan-divider>` — a thin separator line.
 * Attributes: orientation (horizontal|vertical), label (optional centered text,
 * horizontal only). Renders line—label—line when a label is present.
 */
export class EtkanDivider extends LitElement {
  static properties = {
    orientation: { type: String, reflect: true },
    label: { type: String },
  };

  declare orientation: "horizontal" | "vertical";
  declare label: string;

  constructor() {
    super();
    this.orientation = "horizontal";
    this.label = "";
  }

  static styles = [
    base,
    css`
      :host {
        display: block;
      }
      :host([orientation="vertical"]) {
        display: inline-block;
        block-size: 100%;
      }

      .divider {
        display: flex;
        align-items: center;
        gap: var(--space-3);
        inline-size: 100%;
      }

      .line {
        flex: 1 1 auto;
        block-size: 1px;
        background: var(--border-subtle);
      }

      .label {
        flex: 0 0 auto;
        color: var(--text-muted);
        font-family: inherit;
        font-size: var(--text-xs);
        font-weight: var(--fw-medium);
        line-height: var(--leading-normal);
        white-space: nowrap;
      }

      .vertical {
        display: inline-block;
        inline-size: 1px;
        block-size: 100%;
        background: var(--border-subtle);
      }
    `,
  ];

  render() {
    if (this.orientation === "vertical") {
      return html`<div
        class="vertical"
        part="line"
        role="separator"
        aria-orientation="vertical"
      ></div>`;
    }

    const hasLabel = this.label.length > 0;
    return html`
      <div
        class="divider"
        part="divider"
        role="separator"
        aria-orientation="horizontal"
        aria-label=${hasLabel ? this.label : nothing}
      >
        <span class="line" part="line"></span>
        ${hasLabel
          ? html`<span class="label" part="label">${this.label}</span>
              <span class="line" part="line"></span>`
          : nothing}
      </div>
    `;
  }
}

if (!customElements.get("etkan-divider")) {
  customElements.define("etkan-divider", EtkanDivider);
}
