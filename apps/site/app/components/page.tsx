"use client";

import * as React from "react";
import {
  Button,
  IconButton,
  Input,
  Textarea,
  Select,
  Checkbox,
  Radio,
  Switch,
  Badge,
  Tag,
  Card,
  Table,
  type TableColumn,
  Pagination,
  Tooltip,
  Toast,
  Dialog,
  Tabs,
  Menu,
  SaudiRiyal,
} from "@backdoor_est/etkan-ui-react";
import Link from "next/link";
import { useUI } from "../providers";
import { Preview } from "@/components/preview";
import { docList } from "@/content/components";
import { SendIcon, SettingsIcon, CopyIcon, GridIcon, ArrowIcon } from "@/components/icons";

interface Invoice {
  id: string;
  client: string;
  status: "paid" | "pending" | "overdue";
  amount: string;
}
const INVOICES: Invoice[] = [
  { id: "INV-1042", client: "Aramco Digital", status: "paid", amount: "12,400" },
  { id: "INV-1043", client: "STC Solutions", status: "pending", amount: "8,900" },
  { id: "INV-1044", client: "NEOM", status: "overdue", amount: "21,750" },
];
const STATUS_TONE = { paid: "success", pending: "warning", overdue: "danger" } as const;

export default function ComponentsPage() {
  const { dir } = useUI();
  const ar = dir === "rtl";
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [toastOpen, setToastOpen] = React.useState(false);
  const [page, setPage] = React.useState(2);

  const columns: TableColumn<Invoice>[] = [
    { key: "id", header: ar ? "رقم الفاتورة" : "Invoice", nowrap: true },
    { key: "client", header: ar ? "العميل" : "Client" },
    {
      key: "status",
      header: ar ? "الحالة" : "Status",
      render: (row) => <Badge tone={STATUS_TONE[row.status]}>{row.status}</Badge>,
    },
    {
      key: "amount",
      header: ar ? "المبلغ" : "Amount",
      align: "end",
      nowrap: true,
      render: (row) => (
        <span>
          {row.amount} <SaudiRiyal />
        </span>
      ),
    },
  ];

  const H = ({ children }: { children: React.ReactNode }) => (
    <h2 style={{ fontSize: "var(--text-xs)", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-subtle)", margin: "var(--space-8) 0 var(--space-4)" }}>
      {children}
    </h2>
  );

  return (
    <div className="container section">
      <span className="eyebrow">{ar ? "المرجع" : "Reference"}</span>
      <h1 style={{ fontSize: "var(--text-4xl)", letterSpacing: "-0.02em", marginBlock: "var(--space-3) var(--space-2)" }}>
        {ar ? "المكوّنات" : "Components"}
      </h1>
      <p className="muted" style={{ maxWidth: "60ch" }}>
        {ar
          ? "١٨ مكوّناً حيّاً. بدّل اللغة والسمة من الأعلى، وشاهد كلّ مكوّن يتجاوب في الحال."
          : "18 live components. Flip the language and theme up top to see each one respond instantly."}
      </p>

      {/* Directory — each card links to a full detail page */}
      <div
        className="grid"
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))", marginBlockStart: "var(--space-6)" }}
      >
        {docList.map((d) => (
          <Link
            key={d.slug}
            href={`/components/${d.slug}`}
            className="feature"
            style={{ display: "block", padding: "var(--space-4) var(--space-5)" }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
              <strong style={{ color: "var(--text-strong)" }}>{d.name}</strong>
              <ArrowIcon width={15} height={15} style={{ color: "var(--text-subtle)" }} />
            </div>
            <div className="muted" style={{ fontSize: "var(--text-sm)", marginBlockStart: 4 }}>
              {ar ? d.title.ar : d.title.en}
            </div>
          </Link>
        ))}
      </div>

      <div style={{ display: "grid", gap: "var(--space-5)", marginBlockStart: "var(--space-8)" }}>
        <H>{ar ? "النماذج" : "Forms"}</H>

        <Preview title="Button">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="accent">Accent</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="primary" loading>
            Loading
          </Button>
        </Preview>

        <Preview title="IconButton">
          <IconButton label="Send" icon={<SendIcon />} variant="primary" />
          <IconButton label="Settings" icon={<SettingsIcon />} variant="secondary" />
          <IconButton label="Copy" icon={<CopyIcon />} variant="ghost" />
        </Preview>

        <Preview title="Input · Textarea">
          <div style={{ display: "grid", gap: 16, width: "min(360px,100%)" }}>
            <Input label={ar ? "البريد الإلكتروني" : "Email"} placeholder="you@company.com" />
            <Input label={ar ? "المبلغ" : "Amount"} placeholder="0.00" prefix={<SaudiRiyal />} />
            <Textarea label={ar ? "ملاحظات" : "Notes"} placeholder={ar ? "اكتب ملاحظتك هنا…" : "Type here…"} />
          </div>
        </Preview>

        <Preview title="Select">
          <Select label={ar ? "المدينة" : "City"} placeholder={ar ? "اختر مدينة" : "Choose a city"} style={{ minWidth: 220 }}>
            <option>{ar ? "الرياض" : "Riyadh"}</option>
            <option>{ar ? "جدة" : "Jeddah"}</option>
            <option>{ar ? "الدمام" : "Dammam"}</option>
          </Select>
        </Preview>

        <Preview title="Checkbox · Radio · Switch">
          <div style={{ display: "grid", gap: 12 }}>
            <Checkbox label={ar ? "أوافق على الشروط" : "I agree to the terms"} defaultChecked />
            <Radio name="plan" label={ar ? "شهري" : "Monthly"} defaultChecked />
            <Radio name="plan" label={ar ? "سنوي" : "Yearly"} />
            <Switch label={ar ? "تفعيل الإشعارات" : "Enable notifications"} defaultChecked />
          </div>
        </Preview>

        <H>{ar ? "البيانات" : "Data"}</H>

        <Preview title="Badge · Tag">
          <Badge tone="success" variant="soft">
            {ar ? "مدفوعة" : "Paid"}
          </Badge>
          <Badge tone="warning">{ar ? "قيد المراجعة" : "Pending"}</Badge>
          <Badge tone="danger" variant="solid">
            {ar ? "متأخرة" : "Overdue"}
          </Badge>
          <Tag color="var(--brand-primary)">{ar ? "تصميم" : "Design"}</Tag>
          <Tag onRemove={() => {}} removeLabel="Remove Frontend">
            Frontend
          </Tag>
        </Preview>

        <Preview title="Card">
          <Card style={{ width: "min(320px,100%)" }}>
            <h3 style={{ marginBlockEnd: 8 }}>{ar ? "باقة الأعمال" : "Business plan"}</h3>
            <p className="muted" style={{ margin: 0 }}>
              {ar ? "كل المزايا، ودعمٌ يحظى بالأولوية." : "All features, priority support."}
            </p>
            <div style={{ marginBlockStart: 16, fontSize: 24, fontWeight: 700, color: "var(--text-strong)" }}>
              299 <SaudiRiyal />
            </div>
          </Card>
        </Preview>

        <Preview title="Table">
          <div style={{ width: "100%" }}>
            <Table<Invoice> columns={columns} data={INVOICES} />
          </div>
        </Preview>

        <Preview title="Pagination">
          <Pagination page={page} pageCount={8} onChange={setPage} />
        </Preview>

        <H>{ar ? "التنبيهات" : "Feedback"}</H>

        <Preview title="Tooltip">
          <Tooltip content={ar ? "نسخ إلى الحافظة" : "Copy to clipboard"}>
            <button className="pill-toggle">{ar ? "مرّر المؤشّر فوقي" : "Hover me"}</button>
          </Tooltip>
        </Preview>

        <Preview title="Dialog">
          <Button variant="primary" onClick={() => setDialogOpen(true)}>
            {ar ? "افتح الحوار" : "Open dialog"}
          </Button>
          <Dialog
            open={dialogOpen}
            onClose={() => setDialogOpen(false)}
            title={ar ? "حذف الحملة؟" : "Delete campaign?"}
            description={ar ? "لا يمكن التراجع عن هذا الإجراء." : "This action cannot be undone."}
            footer={
              <>
                <Button variant="ghost" onClick={() => setDialogOpen(false)}>
                  {ar ? "إلغاء" : "Cancel"}
                </Button>
                <Button variant="danger" onClick={() => setDialogOpen(false)}>
                  {ar ? "حذف" : "Delete"}
                </Button>
              </>
            }
          />
        </Preview>

        <Preview title="Toast">
          <Button variant="secondary" onClick={() => setToastOpen(true)}>
            {ar ? "أظهر التنبيه" : "Show toast"}
          </Button>
          <Toast
            open={toastOpen}
            onDismiss={() => setToastOpen(false)}
            tone="success"
            title={ar ? "تم الحفظ" : "Saved"}
            message={ar ? "تم تحديث إعداداتك." : "Your settings were updated."}
          />
        </Preview>

        <H>{ar ? "التنقّل" : "Navigation"}</H>

        <Preview title="Tabs">
          <div style={{ width: "min(460px,100%)" }}>
            <Tabs
              aria-label="Account"
              items={[
                { value: "profile", label: ar ? "الملف" : "Profile", content: <p style={{ paddingBlockStart: 12 }}>{ar ? "تفاصيل الملف الشخصي." : "Your profile details."}</p> },
                { value: "billing", label: ar ? "الفوترة" : "Billing", content: <p style={{ paddingBlockStart: 12 }}>{ar ? "طرق الدفع والفواتير." : "Payment methods and invoices."}</p> },
                { value: "team", label: ar ? "الفريق" : "Team", content: <p style={{ paddingBlockStart: 12 }}>{ar ? "أعضاء فريقك." : "Your team members."}</p> },
              ]}
            />
          </div>
        </Preview>

        <Preview title="Menu">
          <Menu
            trigger={<span className="pill-toggle"><GridIcon width={16} height={16} /> {ar ? "الإجراءات" : "Actions"}</span>}
            items={[
              { label: ar ? "تعديل" : "Edit", onClick: () => {} },
              { label: ar ? "تكرار" : "Duplicate", onClick: () => {}, shortcut: "⌘D" },
              { divider: true },
              { label: ar ? "حذف" : "Delete", danger: true, onClick: () => {} },
            ]}
          />
        </Preview>
      </div>
    </div>
  );
}
