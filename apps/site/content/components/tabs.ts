import type { ComponentDoc } from "../component-doc";

const doc: ComponentDoc = {
  slug: "tabs",
  name: "Tabs",
  tag: "etkan-tabs",
  group: "Navigation",
  title: {
    en: "A tab bar that switches between panels with a sliding indicator and full RTL keyboard support.",
    ar: "شريط تبويبات ينقلك بين عدة لوحات مع مؤشر منزلق ودعم كامل للوحة المفاتيح في الاتجاهين.",
  },
  description: {
    en: "Tabs renders a row of tab buttons from a list of item definitions and shows the matching panel for whichever tab is active. It supports two looks, an underline bar with a sliding active indicator and a rounded pills bar, and can be used controlled or uncontrolled. Everything is styled with ETKAN tokens for color, spacing, and type, and it uses logical CSS and a direction-aware keyboard model so it reads and moves correctly in both Arabic (RTL) and English (LTR).",
    ar: "يعرض Tabs صفًا من أزرار التبويبات انطلاقًا من قائمة عناصر تمرّرها له، ويُظهر محتوى التبويب النشط وحده. يوفّر شكلين: خطًا سفليًا مع مؤشر منزلق، وأزرارًا دائرية (pills)، ويمكنك التحكم في التبويب المفتوح من الخارج أو ترك المكوّن يدير حالته بنفسه. مظهره كله مبني على رموز ETKAN للألوان والمسافات والخطوط، ويعتمد على CSS المنطقي وعلى لوحة مفاتيح تراعي اتجاه الكتابة، فيظهر ويعمل بشكل صحيح في العربية (RTL) والإنجليزية (LTR).",
  },
  when: {
    en: "Reach for Tabs when the same area of the screen should show one of several related views, and only one at a time, such as switching between details, reviews, and shipping on a product page. For moving between separate pages use links or navigation instead, and for a small set of mutually exclusive choices inside a form use radio buttons. Use the pills variant for a lighter, self-contained switch and the underline variant when the tabs sit above a larger content area.",
    ar: "استخدم Tabs حين تريد أن تعرض المنطقة نفسها من الشاشة محتوى واحدًا من عدة أقسام مرتبطة، قسمًا واحدًا في كل مرة، مثل التنقل بين التفاصيل والمراجعات والشحن في صفحة منتج. أما للانتقال بين صفحات منفصلة فاستخدم روابط أو قائمة تنقّل، ولمجموعة صغيرة من الخيارات التي لا يُختار منها إلا واحد داخل نموذج فاستخدم أزرار الاختيار (radio). اختر شكل pills إذا أردت مبدّلًا خفيفًا قائمًا بذاته، وشكل underline حين تكون التبويبات فوق منطقة محتوى كبيرة.",
  },
  behavior: {
    en: "In the underline variant a thin bar sits under the active tab and slides to the newly selected one: its inline position and width animate together over the base duration with the ease-out curve, so the indicator glides across rather than jumping. Each tab's text color and background fade over the fast duration with the standard easing when it becomes active or is hovered, and the active label also turns semibold. Keyboard focus follows a roving-tabindex model: only the active tab is in the tab order, and the arrow keys move selection and focus between tabs, with Home and End jumping to the first and last. Direction is resolved at runtime, so under RTL the left and right arrows are swapped to match what the eye expects, and because padding, borders, and the indicator all use logical properties, the whole bar mirrors cleanly in Arabic. Disabled tabs are skipped by the keyboard, dimmed, and not selectable.",
    ar: "في شكل underline يقع خط رفيع أسفل التبويب النشط وينزلق إلى التبويب المختار حديثًا: يتحرك موضعه الأفقي وعرضه معًا خلال المدة الأساسية بمنحنى ease-out، فينساب المؤشر بدل أن يقفز. ويتلاشى لون نص كل تبويب وخلفيته خلال مدة سريعة بمنحنى التسارع القياسي عند تنشيطه أو المرور فوقه، كما يصبح خط التبويب النشط أثقل (semibold). ويتبع تركيز لوحة المفاتيح نموذج roving-tabindex: التبويب النشط وحده ضمن ترتيب التنقل، وتنقل أسهم الاتجاه التحديد والتركيز بين التبويبات، بينما تقفز Home وEnd إلى الأول والأخير. ويُحدَّد الاتجاه أثناء التشغيل، ففي RTL يتبادل السهمان الأيمن والأيسر ليطابقا ما تتوقعه العين، ولأن الحشو والحدود والمؤشر تستخدم خصائص منطقية ينقلب الشريط كله بسلاسة في العربية. أما التبويبات المعطّلة فتتخطّاها لوحة المفاتيح، وتظهر باهتة، ولا يمكن اختيارها.",
  },
  props: [
    {
      name: "items",
      type: "TabItem[]",
      required: true,
      desc: {
        en: "The tabs to render in order; each item has a value, a label, and optional icon, content, and disabled fields.",
        ar: "التبويبات المراد عرضها بالترتيب، لكل عنصر value وlabel، واختياريًا icon وcontent وdisabled.",
      },
    },
    {
      name: "value",
      type: "string",
      desc: {
        en: "The active tab's value in controlled mode; when set, you manage selection yourself via onChange.",
        ar: "قيمة التبويب النشط حين تتحكم في المكوّن من الخارج؛ وعند ضبطها تتولى أنت إدارة التحديد عبر onChange.",
      },
    },
    {
      name: "defaultValue",
      type: "string",
      desc: {
        en: "The initially active tab when uncontrolled; if omitted, the first enabled tab is selected.",
        ar: "التبويب المفتوح في البداية حين يدير المكوّن حالته بنفسه؛ وإن لم يُحدَّد فيُفتح أول تبويب غير معطّل.",
      },
    },
    {
      name: "onChange",
      type: "(value: string) => void",
      desc: {
        en: "Called with the value of the newly selected tab.",
        ar: "يُستدعى مع قيمة التبويب المختار حديثًا.",
      },
    },
    {
      name: "variant",
      type: '"underline" | "pills"',
      default: '"underline"',
      desc: {
        en: "The visual style of the tab bar: an underline with a sliding indicator, or rounded pills on a sunken track.",
        ar: "الشكل البصري للشريط: خط سفلي بمؤشر منزلق، أو أزرار دائرية (pills) على مسار غائر.",
      },
    },
    {
      name: "aria-label",
      type: "string",
      desc: {
        en: "An accessible label for the tablist, useful when there is no visible heading nearby.",
        ar: "تسمية تعريفية للقائمة (tablist) لأغراض الوصولية، تفيد حين لا يوجد عنوان ظاهر قريب.",
      },
    },
    {
      name: "style",
      type: "React.CSSProperties",
      desc: {
        en: "Inline styles merged onto the outer wrapper around the tab bar and panels.",
        ar: "أنماط سطرية تُدمج على الغلاف الخارجي المحيط بالشريط واللوحات.",
      },
    },
  ],
  code: `import { Tabs } from "@backdoor_est/etkan-ui-react";

const items = [
  {
    value: "details",
    label: "تفاصيل المنتج",
    content: <p>عباءة قطنية مصنوعة في القصيم، متوفرة بعدة مقاسات.</p>,
  },
  {
    value: "shipping",
    label: "الشحن",
    content: <p>توصيل خلال يومين إلى الرياض وجدة والدمام.</p>,
  },
  {
    value: "reviews",
    label: "المراجعات",
    content: <p>متوسط التقييم ٤٫٨ من ٥ بناءً على ١٢٠ مراجعة.</p>,
  },
];

export function ProductTabs() {
  return (
    <Tabs
      items={items}
      defaultValue="details"
      aria-label="تفاصيل المنتج"
      onChange={(value) => console.log(value)}
    />
  );
}`,
};

export default doc;
