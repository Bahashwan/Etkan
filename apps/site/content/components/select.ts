import type { ComponentDoc } from "../component-doc";

const doc: ComponentDoc = {
  slug: "select",
  name: "Select",
  tag: "etkan-select",
  group: "Forms",
  title: {
    en: "A native dropdown styled to match the ETKAN field system.",
    ar: "قائمة منسدلة أصلية بمظهر يطابق حقول ETKAN.",
  },
  description: {
    en: "Select is a native HTML <select> wrapped and styled with ETKAN field tokens, so it inherits the same border, height, focus ring, and label styling as the rest of the form controls. It supports labels, helper and error messages, three sizes, and a placeholder option. Everything is built with logical CSS properties, so it flips cleanly between Arabic (RTL) and English (LTR) with no extra work.",
    ar: "Select هو عنصر <select> أصلي مغلَّف بأنماط حقول ETKAN، فيأخذ نفس الحدود والارتفاع وإطار التركيز وتنسيق العنوان مثل بقية عناصر النماذج. ويدعم العنوان ونص المساعدة ورسائل الخطأ وثلاثة أحجام ونصًا توضيحيًا يظهر قبل الاختيار. كل شيء مبني بخصائص CSS المنطقية، فيتبدّل اتجاهه بسلاسة بين العربية (RTL) والإنجليزية (LTR) دون أي جهد إضافي.",
  },
  when: {
    en: "Reach for Select when the user must pick one value from a short, known list, like a city or a category. It uses the platform dropdown, so it is reliable on mobile and fully accessible out of the box. For free text use Input, for a yes/no choice use Switch or Checkbox, and for a handful of visible options where showing them all helps, use Radio instead.",
    ar: "استخدم Select عندما يحتاج المستخدم إلى اختيار قيمة واحدة من قائمة قصيرة ومعروفة، مثل مدينة أو فئة. يعتمد على القائمة المنسدلة الأصلية للنظام، فهو موثوق على الجوال ومتاح للجميع دون إعداد. للنص الحر استخدم Input، وللاختيار بنعم/لا استخدم Switch أو Checkbox، وإن كانت الخيارات قليلة ويفيد عرضها كلها فاستخدم Radio.",
  },
  behavior: {
    en: "On focus the border color changes to the focus color and a focus ring appears; both animate over the fast duration with the standard easing curve, so the change feels smooth rather than abrupt. The pointer turns to a pointer cursor on hover, and a disabled field dims to 60% opacity with a not-allowed cursor. When invalid is set with an error message, the border turns red and the message is announced as an alert. The chevron indicator always sits on the trailing edge, so it moves to the left in Arabic and to the right in English automatically, because it is positioned with the logical inset-inline-end property.",
    ar: "عند التركيز يتحول لون الحد إلى لون التركيز ويظهر إطار حوله، وكلاهما يتغير خلال مدة سريعة بمنحنى الحركة القياسي، فيبدو التغيير ناعمًا لا مفاجئًا. ويتحول المؤشر إلى شكل يد عند المرور فوق الحقل، أما الحقل المعطّل فيخفت إلى شفافية 60% ويظهر معه مؤشر يمنع الاستخدام. وعند ضبط invalid مع رسالة خطأ يتحول الحد إلى الأحمر وتُقرأ الرسالة كتنبيه لقارئ الشاشة. ويبقى سهم القائمة دائمًا في نهاية الحقل، فيظهر على اليسار في العربية وعلى اليمين في الإنجليزية تلقائيًا لأنه مثبَّت بخاصية inset-inline-end المنطقية.",
  },
  props: [
    {
      name: "label",
      type: "string",
      desc: {
        en: "Field label rendered above the control.",
        ar: "عنوان الحقل الذي يظهر فوق القائمة.",
      },
    },
    {
      name: "size",
      type: '"sm" | "md" | "lg"',
      default: '"md"',
      desc: {
        en: "Control height and font size.",
        ar: "ارتفاع الحقل وحجم الخط.",
      },
    },
    {
      name: "invalid",
      type: "boolean",
      default: "false",
      desc: {
        en: "Marks the field as invalid and shows a red border.",
        ar: "يشير إلى أن قيمة الحقل غير صالحة ويعرض حدًا أحمر.",
      },
    },
    {
      name: "disabled",
      type: "boolean",
      default: "false",
      desc: {
        en: "Disables the field and dims it.",
        ar: "يعطّل الحقل ويخفّت مظهره.",
      },
    },
    {
      name: "helperText",
      type: "string",
      desc: {
        en: "Helper hint shown below the field when it is valid.",
        ar: "نص مساعدة يظهر أسفل الحقل عندما يكون صالحًا.",
      },
    },
    {
      name: "errorText",
      type: "string",
      desc: {
        en: "Error message shown below the field when invalid is set.",
        ar: "رسالة الخطأ التي تظهر أسفل الحقل عند ضبط invalid.",
      },
    },
    {
      name: "placeholder",
      type: "string",
      desc: {
        en: "Text for an empty-value first option shown before a choice is made.",
        ar: "نص توضيحي يظهر كخيار أول فارغ قبل أن يختار المستخدم.",
      },
    },
    {
      name: "children",
      type: "React.ReactNode",
      desc: {
        en: "The <option> elements to list inside the dropdown.",
        ar: "عناصر <option> التي تُعرض داخل القائمة.",
      },
    },
    {
      name: "id",
      type: "string",
      desc: {
        en: "Id for the select; a stable one is generated automatically if omitted.",
        ar: "معرّف الحقل؛ يُولَّد معرّف ثابت تلقائيًا إذا لم يُحدَّد.",
      },
    },
    {
      name: "value",
      type: "string | number | readonly string[]",
      desc: {
        en: "Controlled selected value.",
        ar: "القيمة المختارة في الوضع المتحكَّم به.",
      },
    },
    {
      name: "defaultValue",
      type: "string | number | readonly string[]",
      desc: {
        en: "Initial selected value in uncontrolled mode.",
        ar: "القيمة المختارة الأولية في الوضع غير المتحكَّم به.",
      },
    },
    {
      name: "onChange",
      type: "React.ChangeEventHandler<HTMLSelectElement>",
      desc: {
        en: "Called when the selected option changes.",
        ar: "يُستدعى عند تغيّر الخيار المختار.",
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
      name: "required",
      type: "boolean",
      desc: {
        en: "Marks the field as required for form validation.",
        ar: "يجعل الحقل مطلوبًا عند التحقق من النموذج.",
      },
    },
    {
      name: "onFocus",
      type: "React.FocusEventHandler<HTMLSelectElement>",
      desc: {
        en: "Called when the field gains focus.",
        ar: "يُستدعى عندما يحصل الحقل على التركيز.",
      },
    },
    {
      name: "onBlur",
      type: "React.FocusEventHandler<HTMLSelectElement>",
      desc: {
        en: "Called when the field loses focus.",
        ar: "يُستدعى عندما يفقد الحقل التركيز.",
      },
    },
    {
      name: "style",
      type: "React.CSSProperties",
      desc: {
        en: "Inline styles merged onto the select element itself.",
        ar: "أنماط سطرية تُدمج مع عنصر select نفسه.",
      },
    },
    {
      name: "wrapperStyle",
      type: "React.CSSProperties",
      desc: {
        en: "Inline styles merged onto the outer wrapper.",
        ar: "أنماط سطرية تُدمج مع الغلاف الخارجي.",
      },
    },
  ],
  code: `import { Select } from "@backdoor_est/etkan-ui-react";

export function CityField() {
  return (
    <Select
      label="المدينة"
      placeholder="اختر مدينة"
      helperText="اختر مدينة التوصيل"
      defaultValue="riyadh"
    >
      <option value="riyadh">الرياض</option>
      <option value="jeddah">جدة</option>
      <option value="dammam">الدمام</option>
      <option value="makkah">مكة المكرمة</option>
      <option value="madinah">المدينة المنورة</option>
    </Select>
  );
}`,
};

export default doc;
