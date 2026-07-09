import type { ComponentDoc } from "../component-doc";

const doc: ComponentDoc = {
  slug: "pagination",
  name: "Pagination",
  tag: "etkan-pagination",
  group: "Data",
  title: {
    en: "A page navigator for splitting long lists across numbered pages.",
    ar: "أداة للتنقّل بين الصفحات، تقسّم القوائم الطويلة إلى صفحات مرقّمة.",
  },
  description: {
    en: "Pagination renders a compact row of numbered page buttons with previous and next controls, collapsing long ranges into ellipses so only nearby pages and the first and last stay visible. It is built entirely from ETKAN tokens for spacing, color, radius, and typography, and it is fully accessible with a labelled nav landmark and aria-current on the active page. Because it uses logical CSS properties, it lays out and mirrors correctly in both Arabic (RTL) and English (LTR).",
    ar: "يعرض Pagination صفًّا مدمجًا من أزرار الصفحات المرقّمة مع زرَّي السابق والتالي، ويختصر النطاقات الطويلة بثلاث نقاط، فلا تظهر إلا الصفحات القريبة من الحالية مع الأولى والأخيرة. وهو مبنيّ بالكامل على قيم ETKAN للمسافات والألوان والاستدارة والخطوط، وسهل الوصول بفضل عنصر تنقّل يحمل اسمًا واضحًا وسمة aria-current تُحدّد الصفحة الحالية. ولأنه يعتمد على خصائص CSS المنطقية، فإنه يترتّب وينعكس بشكل صحيح في العربية (RTL) والإنجليزية (LTR).",
  },
  when: {
    en: "Reach for Pagination when a dataset is too large to show at once and you want the user to jump to a specific page, like results in a table or a product listing. It works best when the total page count is known. If new items load as the user scrolls, use an infinite-scroll pattern instead, and if there are only a few pages a simple prev/next pair may be enough.",
    ar: "استخدم Pagination عندما تكون البيانات أكبر من أن تُعرض دفعة واحدة، وتريد أن ينتقل المستخدم إلى صفحة معيّنة، مثل نتائج جدول أو قائمة منتجات. وهو الأنسب حين يكون عدد الصفحات الإجمالي معروفًا. أما إذا كانت العناصر تُحمَّل تلقائيًا أثناء التمرير فاستخدم أسلوب التمرير اللانهائي، وإن كانت الصفحات قليلة فقد يكفي زرّا السابق والتالي وحدهما.",
  },
  behavior: {
    en: "Each page button has a one-pixel border and transparent background at rest; on hover a non-active button fills with the hover surface color, and that background change animates over the fast duration with the standard easing curve so it fades in smoothly rather than snapping. The active page is filled with the brand color, uses the on-primary text color and a heavier weight, and drops its border. Keyboard focus shows the standard focus ring, and disabled prev/next buttons dim to 50% opacity with a not-allowed cursor. The previous and next chevrons carry the etkan-mirror class, so their arrows flip automatically under RTL: in Arabic previous points right and next points left, while in English they point the natural way, and the whole row reverses because it is laid out with logical spacing.",
    ar: "لكل زرّ صفحة حدٌّ رفيع بسماكة بكسل واحد وخلفية شفافة في وضعه العادي. وعند مرور المؤشر على زرّ غير نشط تمتلئ خلفيته بلون التمرير، ويحدث هذا التغيّر خلال مدة قصيرة وبانسياب ناعم بدل أن يظهر فجأة. أما الصفحة النشطة فتُملأ بلون الهوية، وتستعمل لون النص المناسب فوق اللون الأساسي بوزن أثقل، ويختفي حدّها. ويظهر إطار التركيز المعتاد عند التنقّل بلوحة المفاتيح، بينما يبهت زرّا السابق والتالي عند تعطيلهما إلى شفافية 50% مع مؤشّر يدل على تعذّر الضغط. ويحمل سهما السابق والتالي صنف etkan-mirror، فينعكسان تلقائيًا في الاتجاه RTL: ففي العربية يشير سهم السابق إلى اليمين وسهم التالي إلى اليسار، وفي الإنجليزية يشيران في اتجاههما الطبيعي، وينقلب الصف كله لأنه مبنيّ بمسافات منطقية.",
  },
  props: [
    {
      name: "page",
      type: "number",
      required: true,
      desc: {
        en: "The current page, counting from 1.",
        ar: "الصفحة الحالية، بدءًا من 1.",
      },
    },
    {
      name: "pageCount",
      type: "number",
      required: true,
      desc: {
        en: "The total number of pages.",
        ar: "العدد الإجمالي للصفحات.",
      },
    },
    {
      name: "onChange",
      type: "(page: number) => void",
      desc: {
        en: "Called with the requested page number when any control is activated.",
        ar: "يُستدعى عند الضغط على أي زر، ويمرّر إليه رقم الصفحة المطلوبة.",
      },
    },
    {
      name: "siblingCount",
      type: "number",
      default: "1",
      desc: {
        en: "How many pages to show on each side of the current page before truncating with an ellipsis.",
        ar: "عدد الصفحات التي تظهر على كل جانب من الصفحة الحالية قبل اختصار الباقي بثلاث نقاط.",
      },
    },
    {
      name: "label",
      type: "string",
      default: '"Pagination"',
      desc: {
        en: "Accessible name for the nav landmark.",
        ar: "الاسم الذي تقرؤه التقنيات المساعِدة لمنطقة التنقّل.",
      },
    },
    {
      name: "previousLabel",
      type: "string",
      default: '"Previous page"',
      desc: {
        en: "Accessible label for the previous-page control.",
        ar: "التسمية التي تقرؤها التقنيات المساعِدة لزر الصفحة السابقة.",
      },
    },
    {
      name: "nextLabel",
      type: "string",
      default: '"Next page"',
      desc: {
        en: "Accessible label for the next-page control.",
        ar: "التسمية التي تقرؤها التقنيات المساعِدة لزر الصفحة التالية.",
      },
    },
    {
      name: "style",
      type: "React.CSSProperties",
      desc: {
        en: "Inline styles merged onto the nav container.",
        ar: "أنماط سطرية (inline) تُدمج مع حاوية التنقّل.",
      },
    },
  ],
  code: `import { useState } from "react";
import { Pagination } from "@backdoor_est/etkan-ui-react";

export function OrdersPagination() {
  const [page, setPage] = useState(1);

  return (
    <Pagination
      page={page}
      pageCount={12}
      onChange={setPage}
      label="صفحات الطلبات"
      previousLabel="الصفحة السابقة"
      nextLabel="الصفحة التالية"
    />
  );
}`,
};

export default doc;
