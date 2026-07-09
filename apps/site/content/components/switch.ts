import type { ComponentDoc } from "../component-doc";

const doc: ComponentDoc = {
  slug: "switch",
  name: "Switch",
  tag: "etkan-switch",
  group: "Forms",
  title: {
    en: "An on/off switch for settings that take effect immediately.",
    ar: "مفتاح تشغيل وإيقاف للإعدادات التي يبدأ مفعولها فورًا.",
  },
  description: {
    en: "Switch is an on/off toggle built on a real, visually hidden native checkbox that carries role=\"switch\", so keyboard, forms, and screen readers all work as expected. The track fills with the brand color when on, and a round knob slides toward the trailing edge. Every color, size, radius, and motion value comes from ETKAN tokens, and the knob travel uses logical properties so it mirrors automatically in Arabic (RTL) with no extra code.",
    ar: "المكوّن Switch مفتاح للتشغيل والإيقاف مبني على حقل checkbox أصلي مخفي بصريًا يحمل role=\"switch\"، لذلك يعمل مع لوحة المفاتيح والنماذج وقارئات الشاشة كما هو متوقع. عند التشغيل يمتلئ المسار بلون العلامة التجارية وينزلق المقبض الدائري إلى الطرف الآخر. كل الألوان والأحجام واستدارة الحواف ومدد الحركة مأخوذة من tokens اتقان، وتعتمد حركة المقبض على الخصائص المنطقية، فتنعكس تلقائيًا في الواجهة العربية (RTL) دون أي كود إضافي.",
  },
  when: {
    en: "Reach for Switch when flipping it applies the change right away, like turning a setting or notification on or off. Use Checkbox instead when the choice is confirmed later by a submit button, such as agreeing to terms or picking items in a form, and use Radio when the user must choose exactly one option from a set.",
    ar: "استخدم Switch عندما يسري التغيير فور تبديله، مثل تشغيل أحد الإعدادات أو الإشعارات أو إيقافه. استخدم Checkbox بدلًا منه عندما يتأكد الاختيار لاحقًا بزر إرسال، مثل الموافقة على الشروط أو تحديد عناصر في نموذج، واستخدم Radio عندما يجب اختيار خيار واحد فقط من عدة خيارات.",
  },
  behavior: {
    en: "When toggled on, the track background fades from the neutral border color to the brand color over a base token duration with the standard easing curve, while the knob slides from the leading edge to the trailing edge with an ease-out curve, so the motion feels like it settles rather than snaps. Keyboard focus shows the ETKAN focus ring around the track via box-shadow, hover shows a pointer cursor, and disabled drops the whole label to 55% opacity with a not-allowed cursor. In Arabic (RTL) the knob travels in the opposite direction: a dir-aware sign flips the transform so the knob always moves toward the trailing edge, keeping on and off consistent in both directions. Users who prefer reduced motion get the state change with no transition.",
    ar: "عند التشغيل تتحول خلفية المسار من لون الحدود المحايد إلى لون العلامة التجارية خلال مدة أساسية مأخوذة من الـ tokens مع منحنى الحركة القياسي، بينما ينزلق المقبض من بداية المسار إلى نهايته بمنحنى ease-out، فتبدو الحركة وكأنها تستقر بهدوء لا أن تقفز فجأة. عند التركيز بلوحة المفاتيح تظهر حلقة تركيز اتقان حول المسار عبر box-shadow، ويتحول المؤشر إلى شكل اليد عند مرور الفأرة، وعند التعطيل يخفت العنوان بأكمله إلى 55% مع مؤشر يدل على تعذّر الاستخدام. في الواجهة العربية (RTL) يتحرك المقبض في الاتجاه المعاكس: إشارة تراعي اتجاه الكتابة تعكس التحويل ليتحرك المقبض دائمًا نحو نهاية المسار، فتبقى حالتا التشغيل والإيقاف متطابقتين في الاتجاهين. أما من يفضّلون تقليل الحركة فيرون تغيّر الحالة مباشرة دون أي انتقال متحرك.",
  },
  props: [
    {
      name: "label",
      type: "React.ReactNode",
      desc: {
        en: "Text or node rendered beside the switch.",
        ar: "النص أو العنصر الذي يظهر بجانب المفتاح.",
      },
    },
    {
      name: "size",
      type: '"sm" | "md"',
      default: '"md"',
      desc: {
        en: "The track size. Use `sm` in dense rows and `md` for standard settings.",
        ar: "حجم المسار. استخدم `sm` في الصفوف المتراصة و`md` للإعدادات العادية.",
      },
    },
    {
      name: "checked",
      type: "boolean",
      desc: {
        en: "The on/off state when used as a controlled component. Pair with `onChange`.",
        ar: "حالة التشغيل والإيقاف عند الاستخدام كمكوّن متحكَّم به. استخدمه مع `onChange`.",
      },
    },
    {
      name: "defaultChecked",
      type: "boolean",
      desc: {
        en: "The initial on/off state when used uncontrolled.",
        ar: "حالة التشغيل الأولية عند الاستخدام دون تحكم.",
      },
    },
    {
      name: "onChange",
      type: "React.ChangeEventHandler<HTMLInputElement>",
      desc: {
        en: "Fires when the user flips the switch. Read the new value from `e.target.checked`.",
        ar: "يُستدعى عند تبديل المفتاح. اقرأ القيمة الجديدة من `e.target.checked`.",
      },
    },
    {
      name: "disabled",
      type: "boolean",
      default: "false",
      desc: {
        en: "Disables the input and dims the whole label.",
        ar: "يعطّل الحقل ويخفت العنوان بأكمله.",
      },
    },
    {
      name: "id",
      type: "string",
      desc: {
        en: "Id for the native input. Generated automatically if omitted, linking the label to the input.",
        ar: "معرّف الحقل الأصلي. يُنشأ تلقائيًا إذا لم يُحدَّد، ويربط العنوان بالحقل.",
      },
    },
    {
      name: "style",
      type: "React.CSSProperties",
      default: "{}",
      desc: {
        en: "Extra styles applied to the root label element.",
        ar: "أنماط إضافية تُطبَّق على عنصر العنوان الرئيسي.",
      },
    },
  ],
  code: `import { Switch } from "@backdoor_est/etkan-ui-react";
import { useState } from "react";

export function NotificationSettings() {
  const [orders, setOrders] = useState(true);

  return (
    <form>
      <Switch
        label="إشعارات الطلبات والشحن داخل الرياض"
        checked={orders}
        onChange={(e) => setOrders(e.target.checked)}
      />
      <Switch label="عروض المتجر في جدة" defaultChecked />
      <Switch label="رسائل التذكير القصيرة" size="sm" />
      <Switch label="خيار غير متاح حاليًا" disabled />
    </form>
  );
}`,
};

export default doc;
