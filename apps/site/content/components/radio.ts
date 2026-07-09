import type { ComponentDoc } from "../component-doc";

const doc: ComponentDoc = {
  slug: "radio",
  name: "Radio",
  tag: "etkan-radio",
  group: "Forms",
  title: {
    en: "A single radio button with a label, grouped by a shared name for one-of-many choices.",
    ar: "زر اختيار واحد مع عنوان، تُجمَع الأزرار بنفس الـ name لتحديد خيار واحد من عدة خيارات.",
  },
  description: {
    en: "Radio pairs a custom-drawn ring and dot with a real, visually hidden native <input type=\"radio\">, so keyboard arrow navigation, native form submission, and screen readers all work exactly as expected. Give several radios the same `name` and they behave as one group where selecting one clears the rest. Every color, size, spacing, and motion value comes from ETKAN tokens, and it mirrors automatically in Arabic (RTL) with no extra code.",
    ar: "يجمع Radio بين حلقة ونقطة مرسومتين بتصميم اتقان وحقل <input type=\"radio\"> أصلي مخفي بصريًا، فيعمل التنقل بأسهم لوحة المفاتيح وإرسال النموذج وقارئات الشاشة كما هو متوقع تمامًا. امنح عدة أزرار نفس الـ `name` لتعمل كمجموعة واحدة، فاختيار أحدها يلغي البقية. تأتي كل الألوان والأحجام والمسافات والحركة من tokens اتقان، وينعكس اتجاهه تلقائيًا في الواجهة العربية (RTL) دون أي كود إضافي.",
  },
  when: {
    en: "Reach for Radio when the user must pick exactly one option from a small, visible set — a shipping speed, a payment method, or a preferred city. Use Checkbox instead when choices are independent and more than one can be on at once, and use Select when the list is long or space is tight.",
    ar: "استخدم Radio عندما يجب على المستخدم اختيار خيار واحد فقط من مجموعة صغيرة ظاهرة، مثل سرعة الشحن أو طريقة الدفع أو المدينة المفضلة. استخدم Checkbox بدلًا منه عندما تكون الخيارات مستقلة ويمكن تفعيل أكثر من واحد معًا، واستخدم Select عندما تكون القائمة طويلة أو المساحة ضيقة.",
  },
  behavior: {
    en: "The ring's background and border fade to the brand color over a fast token duration when selected. At the same moment the inner dot scales up from zero to full size with an ease-out curve, so it grows into place rather than popping in; deselecting scales it back down. Keyboard focus shows the ETKAN focus ring via box-shadow, hover shows a pointer cursor, and disabled drops the whole label to 55% opacity with a not-allowed cursor. Arrow keys move the selection between radios that share a `name`. Layout uses logical properties throughout, so in Arabic (RTL) the ring sits to the right of the label and the spacing mirrors automatically.",
    ar: "عند الاختيار تتحول خلفية الحلقة وحدودها إلى لون العلامة التجارية خلال مدة قصيرة مأخوذة من الـ tokens. وفي اللحظة نفسها تكبر النقطة الداخلية من الصفر إلى حجمها الكامل بمنحنى ease-out، فتظهر بسلاسة بدلًا من الظهور المفاجئ، وتصغر من جديد عند إلغاء الاختيار. عند التركيز بلوحة المفاتيح تظهر حلقة تركيز اتقان عبر box-shadow، ويتحول المؤشر إلى يد عند المرور فوق الزر، وعند التعطيل يبهت العنوان كله إلى 55% ويظهر مؤشر يمنع الاستخدام. تنقل أسهم لوحة المفاتيح الاختيار بين الأزرار التي تشترك في نفس الـ `name`. يعتمد التخطيط على الخصائص المنطقية بالكامل، لذا تظهر الحلقة على يمين العنوان في الواجهة العربية (RTL) وتنعكس المسافات تلقائيًا.",
  },
  props: [
    {
      name: "label",
      type: "React.ReactNode",
      desc: {
        en: "Text or node rendered beside the control.",
        ar: "النص أو العنصر الذي يظهر بجانب الزر.",
      },
    },
    {
      name: "name",
      type: "string",
      desc: {
        en: "Shared across a group of radios so they behave as one selection. Only one radio with the same name can be checked at a time.",
        ar: "يُشارَك بين مجموعة أزرار لتعمل كاختيار واحد. لا يمكن تحديد سوى زر واحد يحمل نفس الاسم في الوقت ذاته.",
      },
    },
    {
      name: "checked",
      type: "boolean",
      desc: {
        en: "The selected state when used as a controlled component. Pair with `onChange`.",
        ar: "حالة الاختيار عند الاستخدام كمكوّن متحكَّم به. استخدمه مع `onChange`.",
      },
    },
    {
      name: "defaultChecked",
      type: "boolean",
      desc: {
        en: "The initial selected state when used uncontrolled.",
        ar: "حالة الاختيار الأولية عند الاستخدام دون تحكم.",
      },
    },
    {
      name: "onChange",
      type: "React.ChangeEventHandler<HTMLInputElement>",
      desc: {
        en: "Fires when this radio becomes selected. Read the value from `e.target.value`.",
        ar: "يُستدعى عند اختيار هذا الزر. اقرأ القيمة من `e.target.value`.",
      },
    },
    {
      name: "value",
      type: "string",
      desc: {
        en: "Value submitted with the form when this radio is selected.",
        ar: "القيمة التي تُرسَل مع النموذج عند اختيار هذا الزر.",
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
  code: `import { Radio } from "@backdoor_est/etkan-ui-react";
import { useState } from "react";

export function ShippingSpeed() {
  const [speed, setSpeed] = useState("standard");

  return (
    <form>
      <Radio
        name="shipping"
        value="same-day"
        label="التوصيل في نفس اليوم داخل الرياض (٢٥ ر.س)"
        checked={speed === "same-day"}
        onChange={(e) => setSpeed(e.target.value)}
      />
      <Radio
        name="shipping"
        value="standard"
        label="التوصيل العادي إلى جدة خلال ٣ أيام (مجانًا)"
        checked={speed === "standard"}
        onChange={(e) => setSpeed(e.target.value)}
      />
      <Radio
        name="shipping"
        value="pickup"
        label="الاستلام من الفرع في الدمام"
        disabled
      />
    </form>
  );
}`,
};

export default doc;
