import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { describe, expect, it, vi } from "vitest";

import { Table, type TableColumn } from "./Table";

interface Invoice {
  id: string;
  client: string;
  amount: string;
}

const columns: TableColumn<Invoice>[] = [
  { key: "client", header: "Client" },
  {
    key: "amount",
    header: "Amount",
    align: "end",
    render: (row) => <span>{row.amount} ر.س</span>,
  },
];

const data: Invoice[] = [
  { id: "a", client: "Aramco", amount: "1,200" },
  { id: "b", client: "STC", amount: "980" },
];

describe("Table", () => {
  it("renders a real table with column headers scoped to col", () => {
    render(<Table columns={columns} data={data} />);
    const headers = screen.getAllByRole("columnheader");
    expect(headers).toHaveLength(2);
    headers.forEach((h) => expect(h).toHaveAttribute("scope", "col"));
  });

  it("renders a row per data item and uses the custom cell renderer", () => {
    render(<Table columns={columns} data={data} />);
    expect(screen.getByRole("row", { name: /Aramco/ })).toBeInTheDocument();
    expect(screen.getByText("1,200 ر.س")).toBeInTheDocument();
  });

  it("fires onRowClick with the row object", async () => {
    const onRowClick = vi.fn();
    render(<Table columns={columns} data={data} onRowClick={onRowClick} />);
    const row = screen.getByRole("row", { name: /STC/ });
    await userEvent.click(within(row).getByText("STC"));
    expect(onRowClick).toHaveBeenCalledWith(data[1]);
  });

  it("renders Arabic headers under dir=rtl", () => {
    const arColumns: TableColumn<Invoice>[] = [
      { key: "client", header: "العميل" },
      { key: "amount", header: "المبلغ", align: "end" },
    ];
    render(
      <div dir="rtl">
        <Table columns={arColumns} data={data} />
      </div>,
    );
    expect(screen.getByRole("columnheader", { name: "العميل" })).toBeInTheDocument();
  });

  it("has no axe violations (EN/LTR and AR/RTL)", async () => {
    const arColumns: TableColumn<Invoice>[] = [
      { key: "client", header: "العميل" },
      { key: "amount", header: "المبلغ", align: "end" },
    ];
    const { container } = render(
      <div>
        <Table columns={columns} data={data} />
        <div dir="rtl">
          <Table columns={arColumns} data={data} />
        </div>
      </div>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
