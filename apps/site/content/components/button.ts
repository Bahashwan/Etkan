import type { ComponentDoc } from "../component-doc";

const doc: ComponentDoc = {
  slug: "button",
  name: "Button",
  tag: "etkan-button",
  group: "Forms",
  title: {
    en: "The primary action control for triggering an operation.",
    ar: "الزر الأساسي لتنفيذ أي إجراء داخل الصفحة.",
  },
  description: {
    en: "Button is ETKAN's core action control, with five visual variants and three sizes built entirely from design tokens. It uses logical CSS properties, so padding, icons, and spacing flip automatically between Arabic (RTL) and English (LTR) with no extra code. Every color, radius, and motion value comes from ETKAN tokens, so it stays consistent across light and dark themes.",
    ar: "الزر هو عنصر التنفيذ الأساسي في ETKAN، ويأتي بخمسة أنماط بصرية وثلاثة أحجام، وكلها مبنية بالكامل على متغيرات التصميم (tokens). يعتمد على خصائص CSS المنطقية، لذا تنعكس المسافات والأيقونات تلقائياً بين العربية (RTL) والإنجليزية (LTR) دون أي كود إضافي. وجميع الألوان والزوايا والحركات مأخوذة من متغيرات ETKAN، فيظل مظهره متناسقاً في الوضعين الفاتح والداكن.",
  },
  when: {
    en: "Reach for Button when the user commits to an action on the current page — save, submit, confirm, delete. Use the primary or accent variant for the single most important action, secondary or ghost for lesser actions, and danger for destructive ones. If the control navigates to another page or an external URL, use a link styled as a button instead.",
    ar: "استخدم الزر عندما ينفّذ المستخدم إجراءً في الصفحة نفسها، مثل الحفظ أو الإرسال أو التأكيد أو الحذف. اختر نمط primary أو accent للإجراء الأهم، و secondary أو ghost للإجراءات الأقل أهمية، و danger للإجراءات الخطيرة كالحذف. أما إذا كان الضغط ينقل المستخدم إلى صفحة أخرى أو رابط خارجي، فاستخدم رابطاً مُنسّقاً على هيئة زر بدلاً من ذلك.",
  },
  behavior: {
    en: "On hover the background shifts to a darker token color over a fast transition, and on press the button dips with a subtle translate and scale-down (scale 0.99) for a tactile feel, animated on the standard easing curve. When loading is true it shows a spinning circle that rotates continuously and blocks clicks. Disabled and loading states drop opacity to 50% and switch the cursor to not-allowed. Because spacing uses logical properties, iconStart always sits on the leading edge and iconEnd on the trailing edge — in Arabic (RTL) they mirror automatically, so a start icon appears on the right.",
    ar: "عند مرور المؤشر يتحول لون الخلفية إلى درجة أغمق خلال انتقال سريع، وعند الضغط ينزل الزر قليلاً مع تصغير طفيف (scale 0.99) ليمنح إحساساً ملموساً بالنقر، وذلك وفق منحنى الحركة القياسي. وعند تفعيل loading تظهر دائرة تدور باستمرار وتمنع النقر. في حالتي التعطيل والتحميل تنخفض الشفافية إلى 50% ويتحول شكل المؤشر إلى علامة المنع. وبفضل الخصائص المنطقية، تبقى أيقونة iconStart دائماً في بداية الزر و iconEnd في نهايته، وفي العربية (RTL) ينعكس ترتيبهما تلقائياً فتظهر أيقونة البداية على اليمين.",
  },
  props: [
    {
      name: "children",
      type: "React.ReactNode",
      desc: {
        en: "The button label or content shown between the icons.",
        ar: "نص الزر أو محتواه الذي يظهر بين الأيقونتين.",
      },
    },
    {
      name: "variant",
      type: '"primary" | "secondary" | "ghost" | "danger" | "accent"',
      default: '"primary"',
      desc: {
        en: "The visual weight and color of the button.",
        ar: "الوزن البصري ولون الزر.",
      },
    },
    {
      name: "size",
      type: '"sm" | "md" | "lg"',
      default: '"md"',
      desc: {
        en: "Controls the height, padding, and font size.",
        ar: "يتحكم في الارتفاع والمسافات الداخلية وحجم الخط.",
      },
    },
    {
      name: "disabled",
      type: "boolean",
      default: "false",
      desc: {
        en: "Disables the button and prevents clicks.",
        ar: "يعطّل الزر ويمنع النقر عليه.",
      },
    },
    {
      name: "loading",
      type: "boolean",
      default: "false",
      desc: {
        en: "Shows a spinner and blocks clicks while an action is in progress.",
        ar: "يعرض دائرة تحميل ويمنع النقر أثناء تنفيذ الإجراء.",
      },
    },
    {
      name: "fullWidth",
      type: "boolean",
      default: "false",
      desc: {
        en: "Stretches the button to fill the width of its container.",
        ar: "يمدّ الزر ليملأ عرض الحاوية بالكامل.",
      },
    },
    {
      name: "iconStart",
      type: "React.ReactNode",
      default: "null",
      desc: {
        en: "Icon shown before the label, on the leading edge (RTL-aware).",
        ar: "أيقونة تظهر قبل النص في بداية الزر، وتنعكس مع اتجاه الكتابة.",
      },
    },
    {
      name: "iconEnd",
      type: "React.ReactNode",
      default: "null",
      desc: {
        en: "Icon shown after the label, on the trailing edge (RTL-aware).",
        ar: "أيقونة تظهر بعد النص في نهاية الزر، وتنعكس مع اتجاه الكتابة.",
      },
    },
    {
      name: "type",
      type: '"button" | "submit" | "reset"',
      default: '"button"',
      desc: {
        en: "The native HTML button type.",
        ar: "نوع الزر الأصلي في HTML.",
      },
    },
    {
      name: "onClick",
      type: "React.MouseEventHandler<HTMLButtonElement>",
      desc: {
        en: "Handler called when the button is clicked.",
        ar: "الدالة التي تُستدعى عند النقر على الزر.",
      },
    },
    {
      name: "style",
      type: "React.CSSProperties",
      default: "{}",
      desc: {
        en: "Inline style overrides merged onto the button.",
        ar: "أنماط مباشرة تُدمج مع أنماط الزر لتعديل مظهره.",
      },
    },
  ],
  code: `import { Button } from "@backdoor_est/etkan-ui-react";

export function CheckoutActions() {
  return (
    <div style={{ display: "flex", gap: "var(--space-3)" }}>
      <Button variant="primary" size="lg">
        ادفع 250 ر.س
      </Button>
      <Button variant="secondary">
        متابعة التسوق
      </Button>
      <Button variant="ghost" onClick={() => console.log("الرياض")}>
        تغيير مدينة التوصيل
      </Button>
    </div>
  );
}`,
};

export default doc;
