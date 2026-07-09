import * as React from "react";

export interface TableColumn<Row = Record<string, unknown>> {
  /** Unique column id, also the default data accessor. */
  key: string;
  /** Header cell content. */
  header: React.ReactNode;
  /** Text alignment (logical: "start"/"end" flip under RTL). */
  align?: "start" | "center" | "end" | "left" | "right";
  /** Column width (any CSS size). */
  width?: string | number;
  /** Keep cell content on one line. */
  nowrap?: boolean;
  /** Custom cell renderer; receives the whole row. */
  render?: (row: Row) => React.ReactNode;
}

export interface TableProps<Row = Record<string, unknown>>
  extends Omit<React.TableHTMLAttributes<HTMLTableElement>, "style"> {
  columns: TableColumn<Row>[];
  data: Row[];
  /** Field used as the React key for each row. Default "id". */
  rowKey?: string;
  /** Fires when a row is clicked; also enables row hover styling. */
  onRowClick?: (row: Row) => void;
  /** Tighter row height. */
  dense?: boolean;
  /** Applied to the scroll wrapper. */
  style?: React.CSSProperties;
}

/**
 * Column-configured data table with real table semantics and RTL-aware alignment.
 */
export function Table<Row = Record<string, unknown>>({
  columns,
  data,
  rowKey = "id",
  onRowClick,
  dense = false,
  style = {},
  ...rest
}: TableProps<Row>) {
  const cellPadY = dense ? "var(--space-2)" : "var(--space-3)";

  return (
    <div
      style={{
        inlineSize: "100%",
        overflowX: "auto",
        border: "1px solid var(--border-subtle)",
        borderRadius: "var(--radius-lg)",
        ...style,
      }}
    >
      <table
        style={{
          inlineSize: "100%",
          borderCollapse: "collapse",
          fontFamily: "var(--font-sans)",
          fontSize: "var(--text-md)",
        }}
        {...rest}
      >
        <thead>
          <tr style={{ background: "var(--surface-sunken)" }}>
            {columns.map((c) => (
              <th
                key={c.key}
                scope="col"
                style={{
                  textAlign: (c.align ?? "start") as React.CSSProperties["textAlign"],
                  padding: "var(--space-3) var(--space-4)",
                  fontSize: "var(--text-xs)",
                  fontWeight: "var(--fw-semibold)" as React.CSSProperties["fontWeight"],
                  color: "var(--text-muted)",
                  textTransform: "uppercase",
                  letterSpacing: "0.03em",
                  whiteSpace: "nowrap",
                  borderBlockEnd: "1px solid var(--border-default)",
                  inlineSize: c.width,
                }}
              >
                {c.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => {
            const record = row as Record<string, unknown>;
            const key = (record[rowKey] as React.Key | undefined) ?? i;
            return (
              <TableRow
                key={key}
                row={row}
                columns={columns}
                cellPadY={cellPadY}
                onRowClick={onRowClick}
                last={i === data.length - 1}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

interface TableRowProps<Row> {
  row: Row;
  columns: TableColumn<Row>[];
  cellPadY: string;
  onRowClick?: (row: Row) => void;
  last: boolean;
}

function TableRow<Row>({ row, columns, cellPadY, onRowClick, last }: TableRowProps<Row>) {
  const [hover, setHover] = React.useState(false);
  const clickable = Boolean(onRowClick);
  const record = row as Record<string, unknown>;

  return (
    <tr
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onRowClick ? () => onRowClick(row) : undefined}
      style={{
        background: hover && clickable ? "var(--surface-hover)" : "transparent",
        cursor: clickable ? "pointer" : "default",
        transition: "background var(--duration-fast) var(--ease-standard)",
      }}
    >
      {columns.map((c) => (
        <td
          key={c.key}
          style={{
            textAlign: (c.align ?? "start") as React.CSSProperties["textAlign"],
            padding: `${cellPadY} var(--space-4)`,
            color: "var(--text-body)",
            borderBlockEnd: last ? "none" : "1px solid var(--border-subtle)",
            whiteSpace: c.nowrap ? "nowrap" : "normal",
          }}
        >
          {c.render ? c.render(row) : (record[c.key] as React.ReactNode)}
        </td>
      ))}
    </tr>
  );
}
