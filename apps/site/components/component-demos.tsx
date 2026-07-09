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
import { useUI } from "@/app/providers";
import { SendIcon, SettingsIcon, CopyIcon, GridIcon } from "./icons";

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
const TONE = { paid: "success", pending: "warning", overdue: "danger" } as const;

/** A live, interactive example for a component detail page. */
export function ComponentDemo({ slug }: { slug: string }) {
  const { dir } = useUI();
  const ar = dir === "rtl";
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [toastOpen, setToastOpen] = React.useState(false);
  const [page, setPage] = React.useState(2);

  switch (slug) {
    case "button":
      return (
        <>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="accent">Accent</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="primary" loading>
            Loading
          </Button>
        </>
      );
    case "icon-button":
      return (
        <>
          <IconButton label="Send" icon={<SendIcon />} variant="primary" />
          <IconButton label="Settings" icon={<SettingsIcon />} variant="secondary" />
          <IconButton label="Copy" icon={<CopyIcon />} variant="ghost" />
        </>
      );
    case "input":
      return (
        <div style={{ display: "grid", gap: 14, width: "min(340px,100%)" }}>
          <Input label={ar ? "البريد" : "Email"} placeholder="you@company.com" />
          <Input label={ar ? "المبلغ" : "Amount"} placeholder="0.00" prefix={<SaudiRiyal />} />
          <Input label={ar ? "خطأ" : "Invalid"} invalid errorText={ar ? "حقل مطلوب" : "Required field"} />
        </div>
      );
    case "textarea":
      return (
        <div style={{ width: "min(360px,100%)" }}>
          <Textarea label={ar ? "ملاحظات" : "Notes"} placeholder={ar ? "اكتب هنا…" : "Type here…"} />
        </div>
      );
    case "select":
      return (
        <Select label={ar ? "المدينة" : "City"} placeholder={ar ? "اختر مدينة" : "Choose a city"} style={{ minWidth: 220 }}>
          <option>{ar ? "الرياض" : "Riyadh"}</option>
          <option>{ar ? "جدة" : "Jeddah"}</option>
          <option>{ar ? "الدمام" : "Dammam"}</option>
        </Select>
      );
    case "checkbox":
      return (
        <div style={{ display: "grid", gap: 12 }}>
          <Checkbox label={ar ? "أوافق على الشروط" : "I agree to the terms"} defaultChecked />
          <Checkbox label={ar ? "اشترك في النشرة" : "Subscribe to the newsletter"} />
        </div>
      );
    case "radio":
      return (
        <div style={{ display: "grid", gap: 12 }}>
          <Radio name="plan" label={ar ? "شهري" : "Monthly"} defaultChecked />
          <Radio name="plan" label={ar ? "سنوي" : "Yearly"} />
        </div>
      );
    case "switch":
      return (
        <div style={{ display: "grid", gap: 12 }}>
          <Switch label={ar ? "تفعيل الإشعارات" : "Enable notifications"} defaultChecked />
          <Switch label={ar ? "الدفع التلقائي" : "Auto-pay"} />
        </div>
      );
    case "badge":
      return (
        <>
          <Badge tone="success" variant="soft">
            {ar ? "مدفوعة" : "Paid"}
          </Badge>
          <Badge tone="warning">{ar ? "قيد المراجعة" : "Pending"}</Badge>
          <Badge tone="danger" variant="solid">
            {ar ? "متأخرة" : "Overdue"}
          </Badge>
          <Badge tone="primary" dot>
            {ar ? "جديد" : "New"}
          </Badge>
        </>
      );
    case "tag":
      return (
        <>
          <Tag color="var(--brand-primary)">{ar ? "تصميم" : "Design"}</Tag>
          <Tag onRemove={() => {}} removeLabel="Remove Frontend">
            Frontend
          </Tag>
        </>
      );
    case "card":
      return (
        <Card style={{ width: "min(320px,100%)" }}>
          <h3 style={{ marginBlockEnd: 8 }}>{ar ? "خطة الأعمال" : "Business plan"}</h3>
          <p className="muted" style={{ margin: 0 }}>
            {ar ? "كل المميزات، مع دعم ذي أولوية." : "All features, priority support."}
          </p>
          <div style={{ marginBlockStart: 16, fontSize: 24, fontWeight: 700, color: "var(--text-strong)" }}>
            299 <SaudiRiyal />
          </div>
        </Card>
      );
    case "table": {
      const columns: TableColumn<Invoice>[] = [
        { key: "id", header: ar ? "الفاتورة" : "Invoice", nowrap: true },
        { key: "client", header: ar ? "العميل" : "Client" },
        { key: "status", header: ar ? "الحالة" : "Status", render: (r) => <Badge tone={TONE[r.status]}>{r.status}</Badge> },
        { key: "amount", header: ar ? "المبلغ" : "Amount", align: "end", nowrap: true, render: (r) => <span>{r.amount} <SaudiRiyal /></span> },
      ];
      return (
        <div style={{ width: "100%" }}>
          <Table<Invoice> columns={columns} data={INVOICES} />
        </div>
      );
    }
    case "pagination":
      return <Pagination page={page} pageCount={8} onChange={setPage} />;
    case "tabs":
      return (
        <div style={{ width: "min(460px,100%)" }}>
          <Tabs
            aria-label="Account"
            items={[
              { value: "profile", label: ar ? "الملف" : "Profile", content: <p style={{ paddingBlockStart: 12 }}>{ar ? "تفاصيل ملفك الشخصي." : "Your profile details."}</p> },
              { value: "billing", label: ar ? "الفوترة" : "Billing", content: <p style={{ paddingBlockStart: 12 }}>{ar ? "طرق الدفع والفواتير." : "Payment methods and invoices."}</p> },
            ]}
          />
        </div>
      );
    case "menu":
      return (
        <Menu
          trigger={<span className="pill-toggle"><GridIcon width={16} height={16} /> {ar ? "الإجراءات" : "Actions"}</span>}
          items={[
            { label: ar ? "تعديل" : "Edit", onClick: () => {} },
            { label: ar ? "تكرار" : "Duplicate", onClick: () => {}, shortcut: "⌘D" },
            { divider: true },
            { label: ar ? "حذف" : "Delete", danger: true, onClick: () => {} },
          ]}
        />
      );
    case "dialog":
      return (
        <>
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
        </>
      );
    case "toast":
      return (
        <>
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
        </>
      );
    case "tooltip":
      return (
        <Tooltip content={ar ? "نسخ إلى الحافظة" : "Copy to clipboard"}>
          <button className="pill-toggle">{ar ? "مرّر فوقي" : "Hover me"}</button>
        </Tooltip>
      );
    case "saudi-riyal":
      return (
        <div style={{ display: "flex", gap: 24, alignItems: "center", fontSize: 28, color: "var(--text-strong)" }}>
          <span>1,250.50 <SaudiRiyal /></span>
          <span style={{ color: "var(--brand-primary)" }}><SaudiRiyal /></span>
          <span style={{ fontSize: 44 }}><SaudiRiyal /></span>
        </div>
      );
    default:
      return <span className="muted">—</span>;
  }
}
