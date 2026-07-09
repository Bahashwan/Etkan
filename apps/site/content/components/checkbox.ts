import type { ComponentDoc } from "../component-doc";

const doc: ComponentDoc = {
  slug: "checkbox",
  name: "Checkbox",
  tag: "etkan-checkbox",
  group: "Forms",
  title: {
    en: "A labeled checkbox for single on/off choices and mixed states.",
    ar: "مربع اختيار بعنوان لخيار واحد يمكن تحديده أو إلغاؤه، مع دعم الحالة المختلطة.",
  },
  description: {
    en: "Checkbox pairs a custom-drawn box with a real, visually hidden native <input>, so keyboard, forms, and screen readers work exactly as expected. It supports checked, unchecked, and indeterminate (mixed) states, and can be used controlled or uncontrolled. Every color, radius, spacing, and motion value comes from ETKAN tokens, and it mirrors automatically in Arabic (RTL) with no extra code.",
    ar: "يجمع Checkbox بين مربع مرسوم بتصميم اتقان وحقل <input> أصلي مخفي بصريًا، فيعمل مع لوحة المفاتيح والنماذج وقارئات الشاشة كما هو متوقع تمامًا. يدعم ثلاث حالات: محدد، وغير محدد، ومختلط (indeterminate)، ويمكن استخدامه بتحكم كامل أو بدون تحكم. تأتي كل الألوان والزوايا والمسافات والحركة من tokens الخاصة باتقان، وينعكس تلقائيًا في الواجهة العربية (RTL) دون أي كود إضافي.",
  },
  when: {
    en: "Reach for Checkbox when a choice is independent and can be on or off on its own — accepting terms, toggling filters, or picking several items from a list. Use Radio instead when the user must pick exactly one option from a set, and Switch when the action applies immediately like a setting.",
    ar: "استخدم Checkbox عندما يكون الخيار مستقلًا ويمكن تفعيله أو إيقافه بمفرده، مثل الموافقة على الشروط أو تفعيل فلاتر أو اختيار عدة عناصر من قائمة. استخدم Radio بدلًا منه عندما يجب على المستخدم اختيار خيار واحد فقط من مجموعة، واستخدم Switch عندما يُطبَّق الإجراء فورًا مثل ضبط أحد الإعدادات.",
  },
  behavior: {
    en: "The check mark is an SVG path that draws itself on: its stroke-dashoffset animates from hidden to zero over a fast token duration with an ease-out curve, so the tick sweeps in rather than popping. The box background and border fade to the brand color over the same fast duration. In the indeterminate state the tick is hidden and a short dash appears instead. Keyboard focus shows the ETKAN focus ring via box-shadow, hover shows a pointer cursor, and disabled drops the whole label to 55% opacity with a not-allowed cursor. Layout uses logical properties throughout, so in Arabic (RTL) the box sits to the right of the label and the spacing mirrors automatically.",
    ar: "علامة الصح مسار SVG يرسم نفسه عند التحديد: تنتقل قيمة stroke-dashoffset من قيمة تُخفي العلامة إلى صفر خلال مدة سريعة من الـ tokens مع منحنى ease-out، فتنساب العلامة بدل أن تظهر فجأة. وتتحول خلفية المربع وحدوده إلى لون العلامة التجارية خلال المدة السريعة نفسها. في الحالة المختلطة تختفي علامة الصح ويظهر بدلًا منها خط قصير. ويُظهر التركيز بلوحة المفاتيح حلقة تركيز اتقان عبر box-shadow، ويتحول المؤشر إلى شكل اليد عند مرور الفأرة، وعند التعطيل يبهت العنوان بأكمله (شفافية 55%) مع مؤشر يدل على تعذّر الاستخدام. ويعتمد التخطيط على الخصائص المنطقية بالكامل، لذا في الواجهة العربية (RTL) يظهر المربع على يمين العنوان وتنعكس المسافات تلقائيًا.",
  },
  props: [
    {
      name: "label",
      type: "React.ReactNode",
      desc: {
        en: "Text or node rendered beside the box.",
        ar: "النص أو العنصر الذي يظهر بجانب المربع.",
      },
    },
    {
      name: "indeterminate",
      type: "boolean",
      default: "false",
      desc: {
        en: "Shows the mixed/dash state, set independently of `checked`. Useful for a parent checkbox whose children are partly selected.",
        ar: "يُظهر الحالة المختلطة (الخط)، ويُضبط بشكل مستقل عن `checked`. مفيد لمربع رئيسي عندما تكون بعض عناصره محددة فقط.",
      },
    },
    {
      name: "checked",
      type: "boolean",
      desc: {
        en: "The checked state when used as a controlled component. Pair with `onChange`.",
        ar: "حالة التحديد عند الاستخدام كمكوّن متحكَّم به. استخدمه مع `onChange`.",
      },
    },
    {
      name: "defaultChecked",
      type: "boolean",
      desc: {
        en: "The initial checked state when used uncontrolled.",
        ar: "حالة التحديد الأولية عند الاستخدام دون تحكم.",
      },
    },
    {
      name: "onChange",
      type: "React.ChangeEventHandler<HTMLInputElement>",
      desc: {
        en: "Fires when the user toggles the box. Read the new value from `e.target.checked`.",
        ar: "يُستدعى عند تبديل المربع. اقرأ القيمة الجديدة من `e.target.checked`.",
      },
    },
    {
      name: "disabled",
      type: "boolean",
      default: "false",
      desc: {
        en: "Disables the input and dims the whole label.",
        ar: "يعطّل الحقل ويقلل وضوح العنوان بأكمله.",
      },
    },
    {
      name: "required",
      type: "boolean",
      desc: {
        en: "Marks the field as required for native form validation.",
        ar: "يجعل الحقل مطلوبًا ضمن التحقق الأصلي للنماذج.",
      },
    },
    {
      name: "name",
      type: "string",
      desc: {
        en: "Field name submitted with the form.",
        ar: "اسم الحقل الذي يُرسَل مع النموذج.",
      },
    },
    {
      name: "value",
      type: "string",
      desc: {
        en: "Value submitted with the form when the box is checked.",
        ar: "القيمة التي تُرسَل مع النموذج عندما يكون المربع محددًا.",
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
  code: `import { Checkbox } from "@backdoor_est/etkan-ui-react";
import { useState } from "react";

export function ShippingOptions() {
  const [sameDay, setSameDay] = useState(true);

  return (
    <form>
      <Checkbox
        label="التوصيل في نفس اليوم داخل الرياض (٢٥ ر.س)"
        checked={sameDay}
        onChange={(e) => setSameDay(e.target.checked)}
      />
      <Checkbox label="حفظ عنوان الشحن في جدة للطلبات القادمة" />
      <Checkbox label="الموافقة على الشروط والأحكام" required />
      <Checkbox label="خيار غير متاح حاليًا" disabled />
    </form>
  );
}`,
};

export default doc;
