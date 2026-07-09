import type { ComponentDoc } from "../component-doc";

const doc: ComponentDoc = {
  slug: "table",
  name: "Table",
  tag: "etkan-table",
  group: "Data",
  title: {
    en: "A column-configured data table with real table semantics and RTL-aware alignment.",
    ar: "جدول بيانات تبنيه بتعريف الأعمدة، ببنية جدول حقيقية ومحاذاة تراعي اتجاه الكتابة.",
  },
  description: {
    en: "Table renders rows from a plain data array using a list of column definitions, each with its own header, alignment, width, and optional custom cell renderer. It uses real <table>, <thead>, and <tbody> elements for correct semantics and accessibility, and is styled entirely with ETKAN tokens for surfaces, borders, spacing, and typography. Because alignment and borders use logical CSS properties, columns and their content flip cleanly between Arabic (RTL) and English (LTR).",
    ar: "يعرض Table صفوفًا مأخوذة من مصفوفة بيانات بسيطة، بالاعتماد على قائمة بتعريفات الأعمدة، فلكل عمود عنوانه ومحاذاته وعرضه، ويمكنك تخصيص طريقة عرض الخلية إن رغبت. وهو يستخدم عناصر <table> و<thead> و<tbody> الحقيقية، فتكون بنيته سليمة وأيسر في الوصول إليها، ومظهره كله مبني على رموز ETKAN للأسطح والحدود والمسافات والخطوط. ولأن المحاذاة والحدود تعتمد على خصائص CSS المنطقية، تنقلب الأعمدة ومحتواها بسلاسة بين العربية (RTL) والإنجليزية (LTR).",
  },
  when: {
    en: "Reach for Table when you need to show structured rows and columns of data, such as orders, invoices, or user lists, where headers and column alignment matter. For a simple stack of items without columns, use a plain list instead, and for a single record's fields use a description layout rather than a table. Pass onRowClick when each row should open a detail view.",
    ar: "استخدم Table عندما تحتاج إلى عرض بيانات منظمة في صفوف وأعمدة، مثل الطلبات أو الفواتير أو قوائم المستخدمين، حيث تهمّك العناوين ومحاذاة الأعمدة. أما لعرض قائمة عناصر بسيطة دون أعمدة فاستخدم قائمة عادية، ولعرض حقول سجل واحد استخدم تخطيطًا وصفيًا بدل الجدول. ومرّر onRowClick عندما يُفترض أن يفتح كل صف صفحة تفاصيل.",
  },
  behavior: {
    en: "The whole table sits inside a scroll wrapper with a rounded border, so wide tables scroll horizontally instead of breaking the layout. The header row uses a sunken surface, and rows are separated by subtle bottom borders that vanish on the last row. When onRowClick is set, rows become clickable: the cursor turns to a pointer, and on hover the row background fades to the hover surface. That fade is animated over the fast duration with the standard easing curve, so the highlight feels smooth rather than snapping on. The dense prop tightens vertical cell padding for compact tables. Each column's alignment is set with logical text alignment, so start-aligned text sits on the right in Arabic and on the left in English, and the row separators use logical block borders, all flipping automatically with the writing direction.",
    ar: "يوضع الجدول كله داخل غلاف قابل للتمرير بإطار مستدير الزوايا، فتتمرر الجداول العريضة أفقيًا بدل أن تكسر التخطيط. ويظهر صف العناوين على سطح غائر، وتفصل بين الصفوف حدود سفلية خفيفة تختفي عند الصف الأخير. وعند ضبط onRowClick تصبح الصفوف قابلة للنقر، فيتحول المؤشر إلى شكل يد، وتتلاشى خلفية الصف إلى لون سطح المرور عند المرور فوقها. ويجري هذا التلاشي خلال مدة سريعة وبمنحنى الحركة القياسي، فيبدو التظليل ناعمًا لا مفاجئًا. أما الخاصية dense فتقلّص الحشو الرأسي للخلايا لتحصل على جدول أكثر إحكامًا. وتعتمد محاذاة كل عمود على قيم منطقية، فالنص المحاذى إلى البداية يقع على اليمين في العربية وعلى اليسار في الإنجليزية، كما تعتمد فواصل الصفوف على حدود منطقية، وكلها تنقلب تلقائيًا مع اتجاه الكتابة.",
  },
  props: [
    {
      name: "columns",
      type: "TableColumn<Row>[]",
      required: true,
      desc: {
        en: "Column definitions: each has a key, header, and optional align, width, nowrap, and a custom render function.",
        ar: "تعريفات الأعمدة: لكل عمود key وheader، واختياريًا align وwidth وnowrap ودالة render مخصصة.",
      },
    },
    {
      name: "data",
      type: "Row[]",
      required: true,
      desc: {
        en: "The array of row objects to display, one table row per item.",
        ar: "مصفوفة كائنات الصفوف المراد عرضها، صف واحد لكل عنصر.",
      },
    },
    {
      name: "rowKey",
      type: "string",
      default: '"id"',
      desc: {
        en: "The field on each row used as its React key.",
        ar: "الحقل المستخدم في كل صف مفتاحًا لـ React.",
      },
    },
    {
      name: "onRowClick",
      type: "(row: Row) => void",
      desc: {
        en: "Called when a row is clicked; setting it also enables row hover highlighting.",
        ar: "يُستدعى عند النقر على صف، وضبطه يفعّل أيضًا تظليل الصف عند المرور.",
      },
    },
    {
      name: "dense",
      type: "boolean",
      default: "false",
      desc: {
        en: "Reduces vertical cell padding for a more compact table.",
        ar: "يقلّل الحشو الرأسي للخلايا لجدول أكثر إحكامًا.",
      },
    },
    {
      name: "style",
      type: "React.CSSProperties",
      desc: {
        en: "Inline styles merged onto the outer scroll wrapper.",
        ar: "أنماط سطرية تُضاف إلى غلاف التمرير الخارجي.",
      },
    },
  ],
  code: `import { Table } from "@backdoor_est/etkan-ui-react";

const columns = [
  { key: "order", header: "رقم الطلب", nowrap: true },
  { key: "city", header: "المدينة" },
  {
    key: "total",
    header: "الإجمالي",
    align: "end",
    render: (row) =>
      new Intl.NumberFormat("ar-SA", {
        style: "currency",
        currency: "SAR",
      }).format(row.total),
  },
];

const data = [
  { id: 1, order: "ORD-1042", city: "الرياض", total: 320.5 },
  { id: 2, order: "ORD-1043", city: "جدة", total: 149 },
  { id: 3, order: "ORD-1044", city: "الدمام", total: 875.75 },
];

export function OrdersTable() {
  return (
    <Table
      columns={columns}
      data={data}
      onRowClick={(row) => console.log(row.order)}
    />
  );
}`,
};

export default doc;
