"use client";

import * as React from "react";
import { useUI } from "@/app/providers";

// Render custom elements without JSX intrinsic declarations.
const E = (tag: string) => tag as unknown as React.ElementType;

/** Registers the ETKAN custom elements on the client only (they call
 *  customElements.define, which must not run during SSR). */
function useElements() {
  const [ready, setReady] = React.useState(false);
  React.useEffect(() => {
    let alive = true;
    import("@backdoor_est/etkan-ui-elements").then(() => alive && setReady(true));
    return () => {
      alive = false;
    };
  }, []);
  return ready;
}

export function WcLive() {
  const ready = useElements();
  const { dir } = useUI();
  const ar = dir === "rtl";

  const Button = E("etkan-button");
  const Input = E("etkan-input");
  const Switch = E("etkan-switch");
  const Badge = E("etkan-badge");
  const Tag = E("etkan-tag");
  const Avatar = E("etkan-avatar");
  const Price = E("etkan-price");
  const Stat = E("etkan-stat-card");
  const Alert = E("etkan-alert");
  const CountUp = E("etkan-count-up");
  const Pagination = E("etkan-pagination");

  return (
    <div
      className="preview"
      style={{ opacity: ready ? 1 : 0, transition: "opacity .4s var(--ease-out)" }}
    >
      <div className="preview-title">
        <h4>{ar ? "مكوّنات ويب حيّة — نفس الحزمة المنشورة" : "Live Web Components — the published package"}</h4>
        <span className="terminal-title" style={{ margin: 0 }}>&lt;etkan-*&gt;</span>
      </div>
      <div className="preview-stage" style={{ flexDirection: "column", alignItems: "stretch", gap: "var(--space-5)" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
          <Button variant="primary">{ar ? "حفظ" : "Save"}</Button>
          <Button variant="secondary">{ar ? "إلغاء" : "Cancel"}</Button>
          <Button variant="accent">{ar ? "تمييز" : "Accent"}</Button>
          <Button variant="danger">{ar ? "حذف" : "Delete"}</Button>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
          <Badge tone="success" variant="soft">{ar ? "مدفوعة" : "Paid"}</Badge>
          <Badge tone="warning">{ar ? "قيد المراجعة" : "Pending"}</Badge>
          <Badge tone="danger" variant="solid">{ar ? "متأخرة" : "Overdue"}</Badge>
          <Tag color="var(--brand-primary)" removable>{ar ? "تصميم" : "Design"}</Tag>
          <Avatar name="Mohanad Bahashwan"></Avatar>
          <span style={{ fontSize: 20, fontWeight: 700, color: "var(--text-strong)" }}>
            <Price amount="1,250.50"></Price>
          </span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
          <Input label={ar ? "البريد" : "Email"} placeholder="you@company.com"></Input>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Switch label={ar ? "تفعيل الإشعارات" : "Enable notifications"} checked></Switch>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
          <Stat label={ar ? "الإيرادات" : "Revenue"} value="48,209" delta="+12%" tone="success"></Stat>
          <Alert tone="success" heading={ar ? "تم الحفظ" : "Saved"} dismissible>
            {ar ? "تم تحديث إعداداتك." : "Your settings were updated."}
          </Alert>
        </div>
        <div style={{ display: "flex", gap: 20, alignItems: "center", flexWrap: "wrap" }}>
          <span style={{ fontSize: 32, fontWeight: 800, color: "var(--text-strong)" }}>
            <CountUp to="48209"></CountUp>
          </span>
          <Pagination page="2" page-count="8"></Pagination>
        </div>
      </div>
    </div>
  );
}
