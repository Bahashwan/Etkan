"use client";

import * as React from "react";
import {
  Button,
  Badge,
  Table,
  type TableColumn,
  Input,
  Dialog,
  Toast,
  Switch,
  SaudiRiyal,
} from "@backdoor_est/etkan-ui-react";
import { useUI } from "../../providers";
import { HomeIcon, SendIcon, UsersIcon, SettingsIcon, GaugeIcon } from "@/components/icons";

interface Row {
  id: string;
  client: string;
  channel: string;
  status: "paid" | "pending" | "overdue";
  amount: string;
}
const ROWS: Row[] = [
  { id: "INV-2051", client: "Aramco Digital", channel: "Email", status: "paid", amount: "12,400" },
  { id: "INV-2052", client: "STC Solutions", channel: "WhatsApp", status: "pending", amount: "8,900" },
  { id: "INV-2053", client: "NEOM", channel: "SMS", status: "overdue", amount: "21,750" },
  { id: "INV-2054", client: "Saudia", channel: "Email", status: "paid", amount: "5,300" },
];
const TONE = { paid: "success", pending: "warning", overdue: "danger" } as const;
const BARS = [42, 58, 35, 72, 64, 88, 61];

export default function DashboardShowroom() {
  const { dir } = useUI();
  const ar = dir === "rtl";
  const [open, setOpen] = React.useState(false);
  const [toast, setToast] = React.useState(false);

  const nav = [
    { icon: <HomeIcon />, label: ar ? "الرئيسية" : "Overview", active: true },
    { icon: <SendIcon />, label: ar ? "الحملات" : "Campaigns" },
    { icon: <UsersIcon />, label: ar ? "العملاء" : "Contacts" },
    { icon: <GaugeIcon />, label: ar ? "التقارير" : "Reports" },
    { icon: <SettingsIcon />, label: ar ? "الإعدادات" : "Settings" },
  ];

  const stats = ar
    ? [
        { label: "الإيرادات", value: "٤٨٬٢٠٩", unit: <SaudiRiyal /> },
        { label: "الحملات", value: "١٢" },
        { label: "معدل الفتح", value: "٩٨٫٢٪" },
        { label: "عملاء جدد", value: "٣٤٠" },
      ]
    : [
        { label: "Revenue", value: "48,209", unit: <SaudiRiyal /> },
        { label: "Campaigns", value: "12" },
        { label: "Open rate", value: "98.2%" },
        { label: "New contacts", value: "340" },
      ];

  const columns: TableColumn<Row>[] = [
    { key: "id", header: ar ? "الفاتورة" : "Invoice", nowrap: true },
    { key: "client", header: ar ? "العميل" : "Client" },
    { key: "channel", header: ar ? "القناة" : "Channel" },
    { key: "status", header: ar ? "الحالة" : "Status", render: (r) => <Badge tone={TONE[r.status]}>{r.status}</Badge> },
    { key: "amount", header: ar ? "المبلغ" : "Amount", align: "end", nowrap: true, render: (r) => <span>{r.amount} <SaudiRiyal /></span> },
  ];

  return (
    <div className="container section">
      <p className="muted" style={{ fontSize: "var(--text-sm)", marginBlockEnd: "var(--space-3)" }}>
        {ar ? "معرض · لوحة تحكّم مبنية بالكامل من مكوّنات اتقان" : "Showroom · a dashboard built entirely from ETKAN components"}
      </p>

      {/* browser-frame mockup */}
      <div style={{ border: "1px solid var(--border-default)", borderRadius: "var(--radius-lg)", overflow: "hidden", boxShadow: "var(--shadow-lg)", background: "var(--surface-page)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", borderBlockEnd: "1px solid var(--border-subtle)", background: "var(--surface-card)" }}>
          <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#f0605c" }} />
          <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#f5bf4f" }} />
          <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#5ac05a" }} />
          <span className="terminal-title">app.etkan.sa/overview</span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "220px 1fr" }} className="dash-embed">
          {/* sidebar */}
          <aside style={{ borderInlineEnd: "1px solid var(--border-subtle)", background: "var(--surface-card)", padding: "var(--space-4)", display: "flex", flexDirection: "column", gap: 4 }}>
            <div className="brand" style={{ padding: "6px 4px 14px" }}>
              <span className="brand-tile" style={{ inlineSize: 26, blockSize: 26, fontSize: 14 }}>
                {ar ? "ا" : "E"}
              </span>
              <span className="brand-name" style={{ fontSize: "var(--text-md)" }}>
                ETKAN
              </span>
            </div>
            {nav.map((n) => (
              <a key={n.label} href="#" data-active={n.active} onClick={(e) => e.preventDefault()} style={{ padding: "8px 10px", borderRadius: "var(--radius-md)", color: n.active ? "var(--brand-primary)" : "var(--text-body)", background: n.active ? "var(--brand-primary-soft)" : "transparent", fontWeight: n.active ? 600 : 400, display: "flex", alignItems: "center", gap: 10, fontSize: "var(--text-sm)" }}>
                {n.icon} {n.label}
              </a>
            ))}
          </aside>

          {/* main */}
          <div style={{ padding: "var(--space-6)", display: "grid", gap: "var(--space-5)" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <h2 style={{ fontSize: "var(--text-2xl)", letterSpacing: "-0.02em" }}>{ar ? "نظرة عامة" : "Overview"}</h2>
                <p className="muted" style={{ fontSize: "var(--text-sm)" }}>{ar ? "أداء حملات التواصل خلال هذا الشهر" : "Outreach performance this month"}</p>
              </div>
              <Button variant="primary" iconStart={<SendIcon width={16} height={16} />} onClick={() => setOpen(true)}>
                {ar ? "حملة جديدة" : "New campaign"}
              </Button>
            </div>

            <div className="stat-grid">
              {stats.map((s) => (
                <div key={s.label} className="stat">
                  <div className="label">{s.label}</div>
                  <div className="value">
                    {s.value} {s.unit}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: "var(--space-5)" }} className="dash-lower">
              <div className="tile">
                <h3>{ar ? "الرسائل المُرسلة" : "Messages sent"}</h3>
                <div className="bars">
                  {BARS.map((h, i) => (
                    <div key={i} className="bar" style={{ height: `${h}%` }} />
                  ))}
                </div>
              </div>
              <div className="tile">
                <h3>{ar ? "قنوات نشطة" : "Active channels"}</h3>
                <div style={{ display: "grid", gap: 14 }}>
                  <Switch label={ar ? "البريد الإلكتروني" : "Email"} defaultChecked />
                  <Switch label="WhatsApp" defaultChecked />
                  <Switch label={ar ? "رسائل SMS" : "SMS"} />
                  <Input placeholder={ar ? "ابحث عن عميل…" : "Search contacts…"} />
                </div>
              </div>
            </div>

            <div className="tile">
              <h3>{ar ? "أحدث الفواتير" : "Recent invoices"}</h3>
              <Table<Row> columns={columns} data={ROWS} />
            </div>
          </div>
        </div>
      </div>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        title={ar ? "حملة جديدة" : "New campaign"}
        description={ar ? "ابدأ حملة تواصل عبر البريد الإلكتروني أو واتساب." : "Launch outreach over email or WhatsApp."}
        footer={
          <>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              {ar ? "إلغاء" : "Cancel"}
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                setOpen(false);
                setToast(true);
              }}
            >
              {ar ? "إطلاق" : "Launch"}
            </Button>
          </>
        }
      >
        <div style={{ display: "grid", gap: 14 }}>
          <Input label={ar ? "اسم الحملة" : "Campaign name"} placeholder={ar ? "عرض رمضان" : "Ramadan offer"} />
          <Input label={ar ? "الميزانية" : "Budget"} placeholder="0.00" prefix={<SaudiRiyal />} />
        </div>
      </Dialog>

      <Toast
        open={toast}
        onDismiss={() => setToast(false)}
        tone="success"
        title={ar ? "تم إطلاق الحملة" : "Campaign launched"}
        message={ar ? "الرسائل قيد الإرسال الآن." : "Messages are going out now."}
      />
    </div>
  );
}
