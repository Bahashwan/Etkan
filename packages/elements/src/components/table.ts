import { LitElement, html, css } from "lit";
import { base } from "../shared";

/** Column definition for `<etkan-table>`. */
export interface EtkanTableColumn {
  key: string;
  header: string;
  align?: "start" | "end" | "center";
  nowrap?: boolean;
}

/**
 * `<etkan-table>` — a data table driven entirely by properties.
 * Properties: columns (array of { key, header, align?, nowrap? }),
 * data (array of row records), dense (Boolean).
 * The wrapper scrolls horizontally on narrow screens; all layout uses
 * logical properties so `dir="rtl"` mirrors automatically.
 */
export class EtkanTable extends LitElement {
  static properties = {
    columns: { type: Array },
    data: { type: Array },
    dense: { type: Boolean, reflect: true },
  };

  declare columns: EtkanTableColumn[];
  declare data: Array<Record<string, unknown>>;
  declare dense: boolean;

  constructor() {
    super();
    this.columns = [];
    this.data = [];
    this.dense = false;
  }

  static styles = [
    base,
    css`
      :host {
        display: block;
      }

      .scroll {
        overflow-x: auto;
        inline-size: 100%;
        border-radius: var(--radius-md);
      }

      table {
        inline-size: 100%;
        border-collapse: collapse;
        font-size: var(--text-sm);
        color: var(--text-body);
      }

      th {
        text-transform: uppercase;
        font-size: var(--text-xs);
        font-weight: var(--fw-semibold);
        letter-spacing: 0.04em;
        color: var(--text-muted);
        padding-block: var(--space-3);
        padding-inline: var(--space-4);
        border-block-end: 1px solid var(--border-default);
        white-space: nowrap;
      }

      td {
        padding-block: var(--space-3);
        padding-inline: var(--space-4);
        border-block-end: 1px solid var(--border-subtle);
        font-variant-numeric: tabular-nums;
        vertical-align: middle;
      }

      :host([dense]) th {
        padding-block: var(--space-2);
        padding-inline: var(--space-3);
      }
      :host([dense]) td {
        padding-block: var(--space-2);
        padding-inline: var(--space-3);
      }

      th[data-align="start"],
      td[data-align="start"] {
        text-align: start;
      }
      th[data-align="end"],
      td[data-align="end"] {
        text-align: end;
      }
      th[data-align="center"],
      td[data-align="center"] {
        text-align: center;
      }

      td[data-nowrap] {
        white-space: nowrap;
      }

      tbody tr:hover td {
        background: var(--surface-hover);
      }
    `,
  ];

  private alignOf(col: EtkanTableColumn): "start" | "end" | "center" {
    return col.align ?? "start";
  }

  render() {
    const cols = this.columns ?? [];
    const rows = this.data ?? [];
    return html`
      <div class="scroll" part="scroll">
        <table part="table">
          <thead part="thead">
            <tr>
              ${cols.map(
                (col) => html`<th
                  scope="col"
                  data-align=${this.alignOf(col)}
                >
                  ${col.header}
                </th>`
              )}
            </tr>
          </thead>
          <tbody part="tbody">
            ${rows.map(
              (row) => html`<tr>
                ${cols.map(
                  (col) => html`<td
                    data-align=${this.alignOf(col)}
                    ?data-nowrap=${!!col.nowrap}
                  >
                    ${String(row[col.key] ?? "")}
                  </td>`
                )}
              </tr>`
            )}
          </tbody>
        </table>
      </div>
    `;
  }
}

if (!customElements.get("etkan-table")) {
  customElements.define("etkan-table", EtkanTable);
}
