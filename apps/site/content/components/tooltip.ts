import type { ComponentDoc } from "../component-doc";

const doc: ComponentDoc = {
  slug: "tooltip",
  name: "Tooltip",
  tag: "etkan-tooltip",
  group: "Feedback",
  title: {
    en: "A small hint bubble that appears on hover or focus to explain a control.",
    ar: "فقاعة تلميح صغيرة تظهر عند تمرير المؤشر فوق العنصر أو التركيز عليه لتشرح وظيفته.",
  },
  description: {
    en: "Tooltip wraps a single interactive element and shows a short hint next to it when the user hovers or focuses the trigger. The bubble is rendered in a portal on document.body and hand-positioned against the trigger, and it links to the trigger through aria-describedby so screen readers announce it. Every color, spacing, radius, shadow, and motion value comes from ETKAN tokens, and the logical `side` values flip automatically in Arabic (RTL).",
    ar: "يحيط Tooltip بعنصر تفاعلي واحد ويعرض تلميحًا قصيرًا بجانبه عندما يمرّر المستخدم المؤشر فوقه أو يركّز عليه. تظهر الفقاعة داخل portal على document.body ويُحسب موضعها يدويًا بالنسبة إلى العنصر، وترتبط به عبر aria-describedby حتى تقرأها قارئات الشاشة. تأتي كل الألوان والمسافات واستدارة الحواف والظلال والحركة من tokens اتقان، وتنقلب قيمتا الجهة المنطقيتان في `side` تلقائيًا في الواجهة العربية (RTL).",
  },
  when: {
    en: "Reach for Tooltip to add a brief, optional hint to a control whose purpose might not be obvious, like an icon-only button or a truncated label. Do not put essential information or interactive content inside it, since it is not focusable and hides on blur; use a Dialog or inline text for anything the user must read or act on, and use a Menu when you need selectable options.",
    ar: "استخدم Tooltip لإضافة تلميح قصير واختياري إلى عنصر قد لا تكون وظيفته واضحة، مثل زر بأيقونة فقط أو نص مقتطع. لا تضع فيه معلومات مهمة أو محتوى تفاعليًا، فهو لا يقبل التركيز ويختفي بمجرد فقدانه؛ استخدم Dialog أو نصًا ظاهرًا لأي شيء يجب على المستخدم قراءته أو التفاعل معه، واستخدم Menu حين تحتاج إلى خيارات قابلة للاختيار.",
  },
  behavior: {
    en: "On hover the tooltip appears after a short delay (300ms by default), while keyboard focus shows it instantly so it never gets in the way of a mouse passing over. It mounts through a closed → entering → open → exiting sequence: on open the bubble fades from 0 to full opacity and slides a few pixels into place from the trigger side over a fast token duration with an ease-out curve; on close it plays the same motion in reverse and only unmounts after the ~140ms exit finishes. Moving the pointer away, blurring the trigger, or pressing Escape hides it. The logical `side` values `start` and `end` resolve to physical left/right based on the trigger's computed direction, so in Arabic (RTL) `start` points to the right and `end` to the left; `top` and `bottom` stay the same in both directions. Users who prefer reduced motion get the tooltip shown and hidden instantly with no transition.",
    ar: "عند تمرير المؤشر تظهر الفقاعة بعد تأخير قصير (300 مللي ثانية افتراضيًا) حتى لا تومض بشكل مزعج عند مرور المؤشر السريع فوق العناصر، أما التركيز بلوحة المفاتيح فيُظهرها فورًا. تمرّ الفقاعة بأربع مراحل: مغلقة، ثم دخول، ثم ظهور، ثم خروج. عند الفتح تظهر تدريجيًا من الشفافية التامة حتى تكتمل رؤيتها وتنزلق بضع بكسلات إلى موضعها قادمةً من جهة العنصر، خلال مدة سريعة مأخوذة من الـ tokens بمنحنى ease-out؛ وعند الإغلاق تعيد الحركة نفسها بالعكس ولا تُزال من الصفحة إلا بعد انتهاء الخروج (نحو 140 مللي ثانية). ويخفيها إبعاد المؤشر أو فقدان التركيز أو الضغط على Escape. تتحول قيمتا الجهة المنطقيتان `start` و`end` إلى يسار أو يمين فعلي بحسب اتجاه العنصر، لذا تشير `start` في الواجهة العربية (RTL) إلى اليمين و`end` إلى اليسار، بينما تبقى `top` و`bottom` ثابتتين في الاتجاهين. ومن يفضّلون تقليل الحركة تظهر لهم الفقاعة وتختفي فورًا دون أي حركة انتقالية.",
  },
  props: [
    {
      name: "content",
      type: "React.ReactNode",
      required: true,
      desc: {
        en: "The hint shown inside the bubble. When empty, nothing is rendered.",
        ar: "التلميح الذي يظهر داخل الفقاعة. إذا كان فارغًا فلا يُعرض شيء.",
      },
    },
    {
      name: "children",
      type: "React.ReactElement",
      required: true,
      desc: {
        en: "The single trigger element; it receives the ref, hover/focus handlers, and aria-describedby.",
        ar: "العنصر المُشغِّل الوحيد؛ يتلقّى الـ ref ومعالجات المرور والتركيز و aria-describedby.",
      },
    },
    {
      name: "side",
      type: '"top" | "bottom" | "start" | "end"',
      default: '"top"',
      desc: {
        en: "Where the bubble appears relative to the trigger. `start` and `end` are logical and flip under RTL.",
        ar: "موضع الفقاعة بالنسبة إلى العنصر. القيمتان `start` و`end` منطقيتان وتنقلبان في الواجهة العربية (RTL).",
      },
    },
    {
      name: "openDelay",
      type: "number",
      default: "300",
      desc: {
        en: "Delay in milliseconds after hover before showing. Focus always shows the tooltip instantly.",
        ar: "مدة التأخير بالمللي ثانية بعد تمرير المؤشر قبل ظهور التلميح. أما التركيز فيُظهره فورًا دائمًا.",
      },
    },
    {
      name: "style",
      type: "React.CSSProperties",
      default: "{}",
      desc: {
        en: "Extra styles merged onto the tooltip bubble.",
        ar: "أنماط إضافية تُدمج على فقاعة التلميح.",
      },
    },
  ],
  code: `import { Tooltip, IconButton } from "@backdoor_est/etkan-ui-react";

export function ToolbarActions() {
  return (
    <div style={{ display: "flex", gap: "var(--space-2)" }}>
      <Tooltip content="تعديل بيانات العميل">
        <IconButton aria-label="تعديل">✎</IconButton>
      </Tooltip>

      <Tooltip content="حذف الطلب نهائيًا" side="bottom">
        <IconButton aria-label="حذف">🗑</IconButton>
      </Tooltip>

      <Tooltip content="السعر شامل الضريبة: ٤٩٩ ر.س" side="start" openDelay={150}>
        <IconButton aria-label="تفاصيل السعر">؟</IconButton>
      </Tooltip>
    </div>
  );
}`,
};

export default doc;
