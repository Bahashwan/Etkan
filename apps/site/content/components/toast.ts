import type { ComponentDoc } from "../component-doc";

const doc: ComponentDoc = {
  slug: "toast",
  name: "Toast",
  tag: "etkan-toast",
  group: "Feedback",
  title: {
    en: "A brief, self-dismissing notification pinned to a corner of the screen.",
    ar: "إشعار قصير يظهر في إحدى زوايا الشاشة ويختفي تلقائيًا.",
  },
  description: {
    en: "Toast shows a short, timely message — a confirmation, a status update, or an error — in a floating card that slides in, waits, and slides out on its own. It portals itself to the document body, upgrades to an assertive live region for danger messages, and is fully bilingual: it reads from the block-end using logical CSS properties and pulls its colors, spacing, and shadows from ETKAN design tokens, so it looks right in both Arabic and English.",
    ar: "يعرض Toast رسالة قصيرة في وقتها — تأكيد إجراء، أو تحديث حالة، أو رسالة خطأ — داخل بطاقة عائمة تنزلق للظهور ثم تختفي وحدها. تُعرض البطاقة في طبقة مستقلة أعلى الصفحة، وتتحوّل إلى منطقة تنبيه فوري عند عرض رسائل الخطر. وهي تدعم اللغتين بالكامل: تعتمد على خصائص CSS المنطقية لتظهر في الاتجاه الصحيح، وتأخذ ألوانها ومسافاتها وظلالها من متغيرات التصميم في نظام ETKAN، فتبدو متناسقة في العربية والإنجليزية معًا.",
  },
  when: {
    en: "Reach for Toast to acknowledge an action the user just took (\"Saved\", \"Order placed\") or to surface a passing status without interrupting the flow. Use a Dialog instead when you need the user to stop and make a decision, and an inline message when the feedback belongs next to a specific field.",
    ar: "استخدم Toast لتأكيد إجراء قام به المستخدم للتو (مثل «تم الحفظ» أو «تم إرسال الطلب»)، أو لعرض حالة عابرة دون مقاطعة سير العمل. أما إذا كنت بحاجة إلى أن يتوقف المستخدم ويتخذ قرارًا فاستخدم Dialog، وإذا كان التنبيه مرتبطًا بحقل معيّن فاعرضه بجانب الحقل مباشرة.",
  },
  behavior: {
    en: "When open becomes true the card mounts and, on the next animation frame, fades from 0 to full opacity while sliding 12px into place from the screen edge — down from the top or up from the bottom depending on placement — using the token easing and duration. When open turns false it plays the same motion in reverse and only unmounts after the transition finishes. An auto-dismiss timer (duration, default 5000ms) fires onDismiss; hovering the card pauses the countdown and preserves the remaining time, resuming on mouse-leave. Danger toasts use role=\"alert\" while others use role=\"status\". Placement is set with logical inset properties, so a bottom-end toast sits in the bottom-right in English and mirrors to the bottom-left in Arabic automatically. If the user prefers reduced motion, the slide and fade are skipped and the toast simply appears and disappears.",
    ar: "عندما تصبح قيمة open مساوية لـ true تظهر البطاقة، وفي الإطار التالي مباشرة تظهر تدريجيًا من الاختفاء التام إلى الظهور الكامل بينما تنزلق مسافة 12 بكسل إلى موضعها من حافة الشاشة — نزولًا من الأعلى أو صعودًا من الأسفل حسب قيمة placement — بالاعتماد على مدة الانتقال وحركته المحددتين في المتغيرات. وعندما تصبح open مساوية لـ false تُعاد الحركة نفسها بشكل عكسي، ولا تُزال البطاقة إلا بعد انتهاء الانتقال. يستدعي مؤقّت الإخفاء التلقائي (قيمة duration، والافتراضي 5000 مللي ثانية) الدالة onDismiss، ويؤدي تمرير المؤشر فوق البطاقة إلى إيقاف العدّ مؤقتًا مع حفظ الوقت المتبقي، ثم يستأنف عند إبعاد المؤشر. تستخدم رسائل الخطر role=\"alert\" بينما تستخدم البقية role=\"status\". يُضبط الموضع بخصائص inset المنطقية، لذا تظهر بطاقة bottom-end في الزاوية السفلية اليمنى بالإنجليزية وتنعكس تلقائيًا إلى الزاوية السفلية اليسرى بالعربية. وإذا كان المستخدم يفضّل تقليل الحركة، فلا تظهر حركة الانزلاق والتلاشي، بل تظهر البطاقة وتختفي مباشرة.",
  },
  props: [
    {
      name: "open",
      type: "boolean",
      required: true,
      desc: {
        en: "Controls visibility. Setting it false plays the exit animation and then unmounts the toast.",
        ar: "يتحكم في الظهور. عند ضبطه على false تُشغَّل حركة الخروج ثم تُزال البطاقة.",
      },
    },
    {
      name: "onDismiss",
      type: "() => void",
      desc: {
        en: "Called by the auto-dismiss timer and the close button. Also required for the close button to appear.",
        ar: "تُستدعى عند انتهاء مؤقّت الإخفاء التلقائي وعند الضغط على زر الإغلاق. كما أن زر الإغلاق لا يظهر إلا إذا مرّرت هذه الدالة.",
      },
    },
    {
      name: "tone",
      type: '"info" | "success" | "danger"',
      default: '"info"',
      desc: {
        en: "Semantic tone that sets the icon and color. \"danger\" upgrades the live region to role=\"alert\".",
        ar: "النبرة الدلالية التي تحدد الأيقونة واللون. تعمل \"danger\" على ترقية المنطقة الحيّة إلى role=\"alert\".",
      },
    },
    {
      name: "title",
      type: "React.ReactNode",
      desc: {
        en: "Primary line of the toast, shown in a stronger weight.",
        ar: "السطر الأساسي في البطاقة، ويظهر بخط أثقل.",
      },
    },
    {
      name: "message",
      type: "React.ReactNode",
      desc: {
        en: "Secondary line with supporting detail, shown in muted text.",
        ar: "سطر ثانوي يحمل تفاصيل إضافية، ويظهر بلون خافت.",
      },
    },
    {
      name: "action",
      type: "React.ReactNode",
      desc: {
        en: "Optional inline action, such as an Undo button, placed under the message.",
        ar: "إجراء اختياري داخل البطاقة، مثل زر التراجع، ويوضع أسفل الرسالة.",
      },
    },
    {
      name: "duration",
      type: "number",
      default: "5000",
      desc: {
        en: "Auto-dismiss delay in milliseconds. Set to 0 to disable and keep the toast until dismissed.",
        ar: "مدة الإخفاء التلقائي بالمللي ثانية. اضبطها على 0 لتعطيلها وإبقاء البطاقة حتى يغلقها المستخدم.",
      },
    },
    {
      name: "placement",
      type: '"top-start" | "top-end" | "bottom-start" | "bottom-end"',
      default: '"bottom-end"',
      desc: {
        en: "Fixed viewport corner. The start/end sides follow the reading direction and mirror in Arabic.",
        ar: "زاوية الشاشة الثابتة. تتبع جهتا start وend اتجاه القراءة وتنعكسان في العربية.",
      },
    },
    {
      name: "dismissLabel",
      type: "string",
      default: '"Dismiss"',
      desc: {
        en: "Accessible name for the close button, read by screen readers.",
        ar: "الاسم الوصفي لزر الإغلاق الذي تقرأه برامج قراءة الشاشة.",
      },
    },
    {
      name: "style",
      type: "React.CSSProperties",
      default: "{}",
      desc: {
        en: "Extra styles merged onto the toast card.",
        ar: "أنماط إضافية تُدمج مع بطاقة الإشعار.",
      },
    },
  ],
  code: `import { useState } from "react";
import { Toast } from "@backdoor_est/etkan-ui-react";

export function OrderConfirmation() {
  const [open, setOpen] = useState(true);

  return (
    <Toast
      open={open}
      onDismiss={() => setOpen(false)}
      tone="success"
      title="تم تأكيد طلبك"
      message="سيصل طلبك إلى الرياض خلال يومين. الإجمالي 320 ر.س."
      placement="bottom-end"
      duration={5000}
      dismissLabel="إغلاق"
    />
  );
}`,
};

export default doc;
