import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Badge, SaudiRiyal, Table, type TableColumn } from "@backdoor/etkan-ui-react";

const meta: Meta<typeof Table> = {
  title: "Data/Table",
  component: Table,
  argTypes: {
    dense: { control: "boolean" },
  },
};
export default meta;

type Story = StoryObj<typeof Table>;

interface Invoice {
  id: string;
  client: string;
  status: "paid" | "pending" | "overdue";
  amount: string;
}

const STATUS_TONE = {
  paid: "success",
  pending: "warning",
  overdue: "danger",
} as const;

const data: Invoice[] = [
  { id: "INV-1042", client: "Aramco Digital", status: "paid", amount: "12,400" },
  { id: "INV-1043", client: "STC Solutions", status: "pending", amount: "8,900" },
  { id: "INV-1044", client: "NEOM", status: "overdue", amount: "21,750" },
];

const columns: TableColumn<Invoice>[] = [
  { key: "id", header: "Invoice", nowrap: true },
  { key: "client", header: "Client" },
  {
    key: "status",
    header: "Status",
    render: (row) => <Badge tone={STATUS_TONE[row.status]}>{row.status}</Badge>,
  },
  {
    key: "amount",
    header: "Amount",
    align: "end",
    nowrap: true,
    render: (row) => <span>{row.amount} <SaudiRiyal /></span>,
  },
];

export const Playground: Story = {
  render: (args) => <Table<Invoice> columns={columns} data={data} dense={args.dense} />,
};

export const Dense: Story = {
  render: () => <Table<Invoice> columns={columns} data={data} dense />,
};

export const Arabic: Story = {
  globals: { direction: "rtl" },
  render: () => (
    <Table<Invoice>
      columns={[
        { key: "id", header: "الفاتورة", nowrap: true },
        { key: "client", header: "العميل" },
        {
          key: "status",
          header: "الحالة",
          render: (row) => (
            <Badge tone={STATUS_TONE[row.status]}>
              {row.status === "paid" ? "مدفوعة" : row.status === "pending" ? "قيد الانتظار" : "متأخرة"}
            </Badge>
          ),
        },
        {
          key: "amount",
          header: "المبلغ",
          align: "end",
          nowrap: true,
          render: (row) => <span>{row.amount} <SaudiRiyal /></span>,
        },
      ]}
      data={data}
    />
  ),
};
