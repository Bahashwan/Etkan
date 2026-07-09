import type { ComponentDoc } from "../component-doc";

const doc: ComponentDoc = {
  slug: "input",
  name: "Input",
  tag: "etkan-input",
  group: "Forms",
  title: {
    en: "Text input with label, helper and error text, and leading/trailing adornments.",
    ar: "حقل إدخال نصي مع عنوان، ونص مساعد أو رسالة خطأ، وعناصر إضافية في بدايته ونهايته.",
  },
  description: {
    en: "Input is ETKAN's single-line text field. It bundles a label, helper or error message, and optional leading/trailing adornments (an icon or a currency symbol) into one accessible unit. Everything is driven by ETKAN tokens for color, spacing, and motion, so it looks right in light and dark themes and mirrors automatically in Arabic thanks to logical CSS properties.",
    ar: "Input هو حقل الإدخال النصي المكوّن من سطر واحد في ETKAN. يجمع في وحدة واحدة سهلة الوصول: العنوان، والنص المساعد أو رسالة الخطأ، وعناصر إضافية اختيارية في البداية أو النهاية مثل أيقونة أو رمز العملة. كل تفاصيله مبنية على قيم ETKAN للألوان والمسافات والحركة، فيظهر بشكل صحيح في الوضعين الفاتح والداكن، وينعكس تلقائيًا في العربية بفضل خصائص CSS المنطقية.",
  },
  when: {
    en: "Reach for Input whenever you need a short, single-line value: a name, email, phone number, city, or amount. For longer multi-line text use Textarea, for choosing from a fixed list use Select, and for on/off states use Switch or Checkbox.",
    ar: "استخدم Input كلما احتجت إلى قيمة قصيرة من سطر واحد: اسم أو بريد إلكتروني أو رقم هاتف أو مدينة أو مبلغ. أما النص الطويل متعدد الأسطر فاستخدم له Textarea، وللاختيار من قائمة محددة استخدم Select، ولحالات التشغيل والإيقاف استخدم Switch أو Checkbox.",
  },
  behavior: {
    en: "The outer field container owns the border; the inner input has none. On focus the border keeps its neutral color and a soft blurred glow fades in around the field — never a hard accent line. Both the border color and the glow animate over a fast duration with the standard easing, so focus and error changes feel smooth rather than abrupt. When invalid, the border turns red, the glow is suppressed, and the message below switches to the error text with role=\"alert\". Disabled fields sink to a muted surface and drop to 60% opacity. In Arabic the whole field mirrors automatically: the label aligns to the right, the prefix sits on the right edge and the suffix on the left, and text flows right-to-left, all because the layout uses logical properties (padding-inline, inline-size) rather than fixed left/right.",
    ar: "الحدود مرسومة على الإطار الخارجي للحقل، بينما الحقل الداخلي نفسه بلا حدود. عند التركيز يبقى لون الحدود محايدًا، ويظهر حول الحقل توهج ناعم يتدرّج بلطف بدلًا من خط حاد. يتحرك كل من لون الحدود والتوهج بسرعة وبانسيابية، فتبدو تغيّرات التركيز والخطأ سلسة لا مفاجئة. وعند وجود خطأ يتحوّل لون الحدود إلى الأحمر، ويختفي التوهج، ويتبدّل النص أسفل الحقل إلى رسالة الخطأ مع role=\"alert\". أما الحقول المعطّلة فتبهت خلفيتها وتنخفض شفافيتها إلى 60%. وفي العربية ينعكس الحقل بالكامل تلقائيًا: يحاذى العنوان إلى اليمين، ويظهر العنصر الإضافي الأول عند الحافة اليمنى والأخير عند اليسرى، ويتدفق النص من اليمين إلى اليسار، وذلك كله لأن التخطيط يعتمد على الخصائص المنطقية (padding-inline و inline-size) بدلًا من قيم اليمين واليسار الثابتة.",
  },
  props: [
    {
      name: "label",
      type: "string",
      desc: {
        en: "Field label rendered above the control and linked to it for accessibility.",
        ar: "عنوان الحقل الذي يظهر فوق مربع الإدخال ويرتبط به لتسهيل الوصول.",
      },
    },
    {
      name: "size",
      type: '"sm" | "md" | "lg"',
      default: '"md"',
      desc: {
        en: "Control height and text size.",
        ar: "ارتفاع الحقل وحجم النص.",
      },
    },
    {
      name: "invalid",
      type: "boolean",
      default: "false",
      desc: {
        en: "Marks the field as invalid, giving it a red border and showing the error text.",
        ar: "يجعل الحقل في حالة خطأ فيظهر بحدود حمراء ويعرض نص الخطأ.",
      },
    },
    {
      name: "disabled",
      type: "boolean",
      default: "false",
      desc: {
        en: "Disables the field and dims it to a muted, non-interactive state.",
        ar: "يعطّل الحقل ويجعله باهتًا وغير قابل للتفاعل.",
      },
    },
    {
      name: "helperText",
      type: "string",
      desc: {
        en: "Hint shown below the field while it is valid.",
        ar: "تلميح يظهر أسفل الحقل ما دام لا يوجد خطأ.",
      },
    },
    {
      name: "errorText",
      type: "string",
      desc: {
        en: "Error message shown below the field when it is invalid.",
        ar: "رسالة الخطأ التي تظهر أسفل الحقل عندما يكون في حالة خطأ.",
      },
    },
    {
      name: "prefix",
      type: "React.ReactNode",
      default: "null",
      desc: {
        en: "Leading adornment, such as an icon or a currency symbol.",
        ar: "عنصر إضافي يظهر في بداية الحقل، مثل أيقونة أو رمز العملة.",
      },
    },
    {
      name: "suffix",
      type: "React.ReactNode",
      default: "null",
      desc: {
        en: "Trailing adornment shown at the end of the field.",
        ar: "عنصر إضافي يظهر في نهاية الحقل.",
      },
    },
    {
      name: "style",
      type: "React.CSSProperties",
      default: "{}",
      desc: {
        en: "Inline styles applied to the inner input element.",
        ar: "أنماط مباشرة تُطبَّق على عنصر الإدخال الداخلي.",
      },
    },
    {
      name: "wrapperStyle",
      type: "React.CSSProperties",
      default: "{}",
      desc: {
        en: "Inline styles applied to the outer wrapper that holds the label, field, and message.",
        ar: "أنماط مباشرة تُطبَّق على الغلاف الخارجي الذي يضم العنوان والحقل والرسالة.",
      },
    },
    {
      name: "id",
      type: "string",
      desc: {
        en: "Id for the input; if omitted, a stable id is generated and linked to the label.",
        ar: "معرّف للحقل؛ وإن لم يُذكَر يُولَّد معرّف ثابت ويُربَط بالعنوان.",
      },
    },
    {
      name: "onFocus",
      type: "React.FocusEventHandler<HTMLInputElement>",
      desc: {
        en: "Called when the field gains focus; the internal focus glow is handled for you.",
        ar: "يُستدعى عند تركيز الحقل؛ ويُدار توهج التركيز الداخلي تلقائيًا.",
      },
    },
    {
      name: "onBlur",
      type: "React.FocusEventHandler<HTMLInputElement>",
      desc: {
        en: "Called when the field loses focus.",
        ar: "يُستدعى عند خروج التركيز من الحقل.",
      },
    },
  ],
  code: `import { Input } from "@backdoor_est/etkan-ui-react";

export function CheckoutFields() {
  return (
    <form style={{ display: "grid", gap: "1rem", maxWidth: 360 }}>
      <Input
        label="الاسم الكامل"
        placeholder="محمد العتيبي"
        helperText="كما هو مكتوب في الهوية الوطنية"
      />

      <Input
        label="المدينة"
        placeholder="الرياض"
      />

      <Input
        label="رقم الجوال"
        type="tel"
        inputMode="tel"
        prefix="+966"
        placeholder="5X XXX XXXX"
      />

      <Input
        label="المبلغ"
        type="number"
        inputMode="decimal"
        suffix="ر.س"
        placeholder="0.00"
      />

      <Input
        label="البريد الإلكتروني"
        type="email"
        invalid
        errorText="الرجاء إدخال بريد إلكتروني صحيح"
        defaultValue="mohammed@"
      />
    </form>
  );
}`,
};

export default doc;
