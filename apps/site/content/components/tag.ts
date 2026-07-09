import type { ComponentDoc } from "../component-doc";

const doc: ComponentDoc = {
  slug: "tag",
  name: "Tag",
  tag: "etkan-tag",
  group: "Data",
  title: {
    en: "A small pill-shaped chip that labels or categorizes an item, optionally with a color dot and a dismiss button.",
    ar: "وسم صغير بحواف دائرية يصنّف عنصرًا أو يسمّيه، مع إمكانية إضافة نقطة لون وزرّ لإزالته.",
  },
  description: {
    en: "Tag is a compact chip used to label, categorize, or filter content — a status, a topic, or a selected value. It can show a small leading color dot and, when you pass a remove handler, a dismiss button that lets the user clear it. It is built from ETKAN design tokens and logical CSS properties, so it looks consistent and mirrors correctly in both Arabic and English layouts.",
    ar: "الوسم عنصر صغير يُستخدم لتصنيف المحتوى أو تسميته أو تصفيته، مثل حالة أو موضوع أو قيمة مختارة. يمكن أن يعرض نقطة لون صغيرة في بدايته، وإذا مرّرت له دالة إزالة ظهر زر يتيح للمستخدم حذفه. وهو مبني على قيم تصميم ETKAN وخصائص CSS المنطقية، فيبدو متناسقًا وينعكس بشكل صحيح في الواجهات العربية والإنجليزية.",
  },
  when: {
    en: "Reach for Tag to show short labels like categories, statuses, or the currently applied filters, especially when the user may need to remove them one by one. For a purely visual status marker that is never dismissed, a Badge is a lighter choice. For a full clickable action, use a Button instead of a Tag.",
    ar: "استخدم الوسم لعرض عناوين قصيرة مثل التصنيفات أو الحالات أو عوامل التصفية المطبّقة، خاصة عندما قد يحتاج المستخدم إلى إزالتها واحدًا تلو الآخر. أمّا إذا كنت تريد علامة حالة مرئية فقط لا تُزال أبدًا، فالشارة Badge خيار أخف. وإذا كان العنصر إجراءً كاملًا قابلًا للنقر، فاستخدم الزر Button بدل الوسم.",
  },
  behavior: {
    en: "The tag is an inline pill with a fully rounded border, a card surface, and a thin default border, sized by ETKAN spacing and text tokens. The optional color dot sits at the start of the tag and follows the reading direction automatically. When a remove handler is provided, a small circular dismiss button appears at the end; on hover it animates its background to the hover surface and its icon to a stronger color, eased over --duration-fast with the standard easing curve, giving a soft fade rather than a sudden jump. Because spacing uses logical properties (padding-inline, margin-inline-end) and the content is laid out with flexbox, the whole tag mirrors cleanly in RTL: the color dot and the dismiss button swap to the correct sides with no extra code.",
    ar: "الوسم عنصر أفقي صغير بحواف دائرية كاملة، وخلفية بلون البطاقة، وحدّ رفيع افتراضي، ويعتمد حجمه على قيم المسافات والنصوص في ETKAN. تظهر نقطة اللون الاختيارية في بداية الوسم وتتبع اتجاه القراءة تلقائيًا. وعند تمرير دالة إزالة يظهر في نهايته زر دائري صغير للحذف، وعند مرور المؤشر عليه تتغيّر خلفيته بسلاسة إلى لون سطح التمرير وتصبح الأيقونة أوضح، ويتم ذلك بسرعة --duration-fast ومنحنى التسارع القياسي، فيبدو الانتقال ناعمًا لا مفاجئًا. ولأن المسافات تعتمد على الخصائص المنطقية (padding-inline وmargin-inline-end) والمحتوى مرتّب عبر flexbox، ينعكس الوسم كاملًا في الاتجاه من اليمين إلى اليسار: تنتقل نقطة اللون وزر الحذف إلى الجهة الصحيحة دون أي كود إضافي.",
  },
  props: [
    {
      name: "children",
      type: "React.ReactNode",
      desc: {
        en: "The tag content, usually a short text label such as a category or status name.",
        ar: "محتوى الوسم، وغالبًا نص قصير مثل اسم تصنيف أو حالة.",
      },
    },
    {
      name: "onRemove",
      type: "() => void",
      desc: {
        en: "Called when the dismiss button is clicked. Passing this prop is what makes the remove button appear; omit it for a read-only tag.",
        ar: "تُستدعى عند الضغط على زر الحذف. تمرير هذه الدالة هو ما يُظهر زر الإزالة، ولا تمرّرها إن أردت وسمًا للعرض فقط.",
      },
    },
    {
      name: "color",
      type: "string",
      desc: {
        en: "Any CSS color for the small leading dot, useful to signal a category color. When omitted, no dot is shown.",
        ar: "أي لون CSS للنقطة الصغيرة في البداية، ويفيد للدلالة على لون التصنيف. وعند تركه لا تظهر أي نقطة.",
      },
    },
    {
      name: "removeLabel",
      type: "string",
      default: '"Remove"',
      desc: {
        en: "Accessible label for the dismiss button. Pass the tag text (e.g. \"Remove Design\") to give screen-reader users a clearer name.",
        ar: "الاسم الوصفي لزر الحذف. مرّر نص الوسم (مثل \"إزالة التصميم\") لتمنح مستخدمي قارئ الشاشة اسمًا أوضح.",
      },
    },
    {
      name: "style",
      type: "React.CSSProperties",
      desc: {
        en: "Inline style overrides, merged last on top of the computed styles as an escape hatch for one-off adjustments.",
        ar: "أنماط مضمّنة تتجاوز الأنماط الجاهزة، وتُدمج في النهاية فوقها كوسيلة لإجراء تعديلات فردية بسيطة.",
      },
    },
  ],
  code: `import { Tag } from "@backdoor_est/etkan-ui-react";
import { useState } from "react";

export function CityFilters() {
  const [cities, setCities] = useState(["الرياض", "جدة", "الدمام"]);

  return (
    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
      {cities.map((city) => (
        <Tag
          key={city}
          color="var(--brand-600)"
          removeLabel={\`إزالة \${city}\`}
          onRemove={() => setCities((prev) => prev.filter((c) => c !== city))}
        >
          {city}
        </Tag>
      ))}
      <Tag>مكتمل</Tag>
    </div>
  );
}`,
};

export default doc;
