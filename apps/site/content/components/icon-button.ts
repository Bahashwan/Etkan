import type { ComponentDoc } from "../component-doc";

const doc: ComponentDoc = {
  slug: "icon-button",
  name: "IconButton",
  tag: "etkan-icon-button",
  group: "Forms",
  title: {
    en: "A square button that holds a single icon with a required accessible label.",
    ar: "زر مربّع يحمل أيقونة واحدة، مع اسم وصفي إلزامي لإتاحة الوصول.",
  },
  description: {
    en: "IconButton is a compact, square control for a single action expressed by an icon — like search, close, or edit. It shares the same variants and sizing tokens as ETKAN Button, so it sits naturally beside other controls, and it works in both Arabic and English layouts because it relies on logical CSS properties and ETKAN design tokens. A visible text label is not shown, so a written label is required and becomes both the screen-reader name and the hover tooltip.",
    ar: "زر الأيقونة عنصر مربّع صغير الحجم يعبّر عن إجراء واحد من خلال أيقونة، مثل البحث أو الإغلاق أو التعديل. يستخدم نفس أنماط زر ETKAN ونفس مقاساته، فيظهر منسجمًا بجانب بقية العناصر، ويعمل في الواجهات العربية والإنجليزية لأنه يعتمد على خصائص CSS المنطقية وعلى قيم تصميم ETKAN. لا يظهر نص مرئي بجانب الأيقونة، لذلك يجب تمرير نص وصفي يصبح اسمًا لقارئ الشاشة وتلميحًا يظهر عند مرور المؤشر.",
  },
  when: {
    en: "Reach for IconButton when an action is instantly recognizable from its icon and screen space is tight — toolbars, table rows, card corners, or dialog close buttons. If the action needs a text label to be clear, use Button instead. For a purely decorative icon that does nothing on click, use a plain icon, not this component.",
    ar: "استخدم زر الأيقونة عندما يكون الإجراء مفهومًا فورًا من شكل الأيقونة وتكون المساحة ضيقة، مثل أشرطة الأدوات وصفوف الجداول وأركان البطاقات وزر إغلاق النوافذ. أمّا إذا احتاج الإجراء إلى نص ليتّضح، فاستخدم زر Button العادي. وإذا كانت الأيقونة للزينة فقط ولا تنفّذ شيئًا عند الضغط، فاكتفِ بأيقونة عادية دون هذا العنصر.",
  },
  behavior: {
    en: "The button is a perfect square whose side follows the --control-height token for the chosen size. On hover it animates smoothly: secondary and ghost variants shift to the hover surface color, primary moves to its darker brand hover, and danger dims slightly with a brightness filter — all eased over --duration-fast with the standard easing curve, applied to background and filter. A keyboard focus ring appears when tabbed to, and disabled buttons drop to half opacity with a not-allowed cursor and no hover response. Because the layout uses logical properties (inline-size, block-size) and centers the icon with flexbox, the control mirrors correctly in RTL with no extra work; the tooltip and accessible name read in whichever language you pass.",
    ar: "الزر مربّع تمامًا، ويتبع طول ضلعه قيمة --control-height حسب المقاس المختار. عند مرور المؤشر يتحرّك الانتقال بسلاسة: نمطا secondary وghost ينتقلان إلى لون سطح التمرير، ونمط primary ينتقل إلى درجة أغمق من لون العلامة، ونمط danger يخفت قليلًا عبر مرشّح السطوع، وكل ذلك يتم بسرعة --duration-fast ومنحنى التسارع القياسي على الخلفية والمرشّح. وتظهر حلقة تركيز واضحة عند الوصول إليه بلوحة المفاتيح، بينما يصبح الزر المعطّل نصف شفاف مع مؤشر يدلّ على المنع ودون أي تفاعل مع المؤشر. ولأن التخطيط يعتمد على الخصائص المنطقية (inline-size وblock-size) ويوسّط الأيقونة عبر flexbox، ينعكس الزر تلقائيًا في الاتجاه من اليمين إلى اليسار دون أي جهد إضافي، ويظهر التلميح والاسم الوصفي باللغة التي تمرّرها.",
  },
  props: [
    {
      name: "icon",
      type: "React.ReactNode",
      required: true,
      desc: {
        en: "The icon element to render inside the button, usually an SVG or icon node. It is marked aria-hidden, so the accessible name comes from label.",
        ar: "عنصر الأيقونة الذي يظهر داخل الزر، وغالبًا يكون SVG أو عنصر أيقونة. يوضَع باعتباره aria-hidden، لذا يأتي الاسم الوصفي من label.",
      },
    },
    {
      name: "label",
      type: "string",
      required: true,
      desc: {
        en: "The accessible name for the button. Applied as both aria-label and the hover title tooltip. Required because no visible text is shown.",
        ar: "الاسم الوصفي للزر، ويُطبَّق على شكل aria-label وعلى التلميح title الذي يظهر عند مرور المؤشر. وهو إلزامي لأنه لا يظهر نص مرئي.",
      },
    },
    {
      name: "variant",
      type: '"primary" | "secondary" | "ghost" | "danger"',
      default: '"ghost"',
      desc: {
        en: "Visual weight, matching Button. primary for the main action, secondary for a bordered neutral, ghost for a quiet toolbar button, danger for destructive actions.",
        ar: "الوزن البصري، ويطابق زر Button. استخدم primary للإجراء الرئيسي، وsecondary لزر محايد بحدود، وghost لزر هادئ في شريط الأدوات، وdanger للإجراءات المدمّرة.",
      },
    },
    {
      name: "size",
      type: '"sm" | "md" | "lg"',
      default: '"md"',
      desc: {
        en: "Square control size, driven by the --control-height tokens. Sets both the width and height of the button.",
        ar: "مقاس الزر المربّع، ويعتمد على قيم --control-height. يحدّد عرض الزر وارتفاعه معًا.",
      },
    },
    {
      name: "disabled",
      type: "boolean",
      default: "false",
      desc: {
        en: "Disables the button. It drops to half opacity, shows a not-allowed cursor, and stops responding to hover.",
        ar: "يعطّل الزر، فيصبح نصف شفاف، ويظهر مؤشرًا يدلّ على المنع، ويتوقّف عن التفاعل مع مرور المؤشر.",
      },
    },
    {
      name: "style",
      type: "React.CSSProperties",
      desc: {
        en: "Inline style overrides, merged last on top of the computed styles as an escape hatch for one-off adjustments.",
        ar: "أنماط تُكتب مباشرة على الزر وتُدمج في النهاية فوق الأنماط المحسوبة، لإجراء تعديلات بسيطة عند الحاجة.",
      },
    },
  ],
  code: `import { IconButton } from "@backdoor_est/etkan-ui-react";

const SearchIcon = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
    <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export function CityToolbar() {
  return (
    <div style={{ display: "flex", gap: "0.5rem" }}>
      <IconButton
        icon={SearchIcon}
        label="ابحث عن مدينة"
        variant="primary"
        onClick={() => console.log("بحث في الرياض وجدة والدمام")}
      />
      <IconButton icon={SearchIcon} label="تصفية النتائج" variant="secondary" />
      <IconButton icon={SearchIcon} label="حذف" variant="danger" size="sm" />
    </div>
  );
}`,
};

export default doc;
