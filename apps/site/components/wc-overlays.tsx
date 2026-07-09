"use client";

import * as React from "react";
import { useUI } from "@/app/providers";

const E = (tag: string) => tag as unknown as React.ElementType;

export function WcOverlays() {
  const { dir } = useUI();
  const ar = dir === "rtl";
  const [ready, setReady] = React.useState(false);

  const menuRef = React.useRef<any>(null);
  const tableRef = React.useRef<any>(null);
  const selectRef = React.useRef<any>(null);
  const dialogRef = React.useRef<any>(null);
  const toastRef = React.useRef<any>(null);

  React.useEffect(() => {
    let alive = true;
    import("@backdoor_est/etkan-ui-elements").then(() => alive && setReady(true));
    return () => {
      alive = false;
    };
  }, []);

  // Custom elements take arrays/objects via properties, not attributes.
  React.useEffect(() => {
    if (!ready) return;
    if (menuRef.current) {
      menuRef.current.items = [
        { label: ar ? "تعديل" : "Edit", onClick: () => {} },
        { label: ar ? "تكرار" : "Duplicate", shortcut: "⌘D", onClick: () => {} },
        { divider: true },
        { label: ar ? "حذف" : "Delete", danger: true, onClick: () => {} },
      ];
    }
    if (selectRef.current) {
      selectRef.current.options = [
        { value: "ry", label: ar ? "الرياض" : "Riyadh" },
        { value: "jd", label: ar ? "جدة" : "Jeddah" },
        { value: "dm", label: ar ? "الدمام" : "Dammam" },
      ];
    }
    if (tableRef.current) {
      tableRef.current.columns = [
        { key: "id", header: ar ? "الفاتورة" : "Invoice", nowrap: true },
        { key: "client", header: ar ? "العميل" : "Client" },
        { key: "amount", header: ar ? "المبلغ" : "Amount", align: "end", nowrap: true },
      ];
      tableRef.current.data = [
        { id: "INV-1042", client: "Aramco Digital", amount: "12,400" },
        { id: "INV-1043", client: "STC Solutions", amount: "8,900" },
        { id: "INV-1044", client: "NEOM", amount: "21,750" },
      ];
    }
  }, [ready, ar]);

  const openDialog = () => dialogRef.current && (dialogRef.current.open = true);
  const closeDialog = () => dialogRef.current && (dialogRef.current.open = false);
  const showToast = () => toastRef.current && (toastRef.current.open = true);

  // Keep React aware if the element self-closes (backdrop/Escape/timer).
  React.useEffect(() => {
    if (!ready) return;
    const d = dialogRef.current;
    const t = toastRef.current;
    const onClose = () => {};
    d?.addEventListener("etkan-close", onClose);
    t?.addEventListener("etkan-dismiss", onClose);
    return () => {
      d?.removeEventListener("etkan-close", onClose);
      t?.removeEventListener("etkan-dismiss", onClose);
    };
  }, [ready]);

  const Button = E("etkan-button");
  const Tooltip = E("etkan-tooltip");
  const Menu = E("etkan-menu");
  const Dialog = E("etkan-dialog");
  const Toast = E("etkan-toast");
  const Tabs = E("etkan-tabs");
  const Table = E("etkan-table");
  const Select = E("etkan-select");

  return (
    <div
      className="preview"
      style={{ opacity: ready ? 1 : 0, transition: "opacity .4s var(--ease-out)" }}
    >
      <div className="preview-title">
        <h4>{ar ? "طبقات عائمة حيّة" : "Live overlays"}</h4>
        <span className="terminal-title" style={{ margin: 0 }}>&lt;etkan-*&gt;</span>
      </div>
      <div className="preview-stage" style={{ flexDirection: "column", alignItems: "stretch", gap: "var(--space-5)" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
          <Tooltip content={ar ? "نسخ إلى الحافظة" : "Copy to clipboard"}>
            <Button variant="ghost">{ar ? "مرّر فوقي" : "Hover me"}</Button>
          </Tooltip>
          <Menu ref={menuRef}>
            <Button slot="trigger" variant="secondary">
              {ar ? "الإجراءات ▾" : "Actions ▾"}
            </Button>
          </Menu>
          <Button variant="primary" onClick={openDialog}>
            {ar ? "افتح الحوار" : "Open dialog"}
          </Button>
          <Button variant="secondary" onClick={showToast}>
            {ar ? "أظهر التنبيه" : "Show toast"}
          </Button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
          <Select ref={selectRef} label={ar ? "المدينة" : "City"} placeholder={ar ? "اختر مدينة" : "Choose a city"} />
          <Tabs value="profile">
            <div {...({ label: ar ? "الملف" : "Profile", value: "profile" } as Record<string, string>)} style={{ paddingBlockStart: 12 }}>
              {ar ? "تفاصيل ملفك." : "Your profile details."}
            </div>
            <div {...({ label: ar ? "الفوترة" : "Billing", value: "billing" } as Record<string, string>)} style={{ paddingBlockStart: 12 }}>
              {ar ? "طرق الدفع." : "Payment methods."}
            </div>
          </Tabs>
        </div>

        <Table ref={tableRef} />
      </div>

      <Dialog
        ref={dialogRef}
        heading={ar ? "حذف الحملة؟" : "Delete campaign?"}
        description={ar ? "لا يمكن التراجع عن هذا الإجراء." : "This action cannot be undone."}
      >
        <div slot="footer" style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
          <Button variant="ghost" onClick={closeDialog}>
            {ar ? "إلغاء" : "Cancel"}
          </Button>
          <Button variant="danger" onClick={closeDialog}>
            {ar ? "حذف" : "Delete"}
          </Button>
        </div>
      </Dialog>

      <Toast
        ref={toastRef}
        tone="success"
        heading={ar ? "تم الحفظ" : "Saved"}
        message={ar ? "تم تحديث إعداداتك." : "Your settings were updated."}
      />
    </div>
  );
}
