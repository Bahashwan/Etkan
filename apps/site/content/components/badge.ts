import type { ComponentDoc } from "../component-doc";

const doc: ComponentDoc = {
  slug: "badge",
  name: "Badge",
  tag: "etkan-badge",
  group: "Data",
  title: {
    en: "A small inline pill that labels a status or category with a semantic color.",
    ar: "شارة صغيرة داخل النص تُظهر حالة أو تصنيفًا بلون له دلالة واضحة.",
  },
  description: {
    en: "Badge is a compact, non-interactive pill used to mark a status, count, or category next to text — like \"مدفوع\" on an invoice or \"جديد\" on a product. It offers six semantic tones and two variants (a soft tint or a solid fill), all drawn from ETKAN design tokens so the colors stay consistent in light and dark themes. It relies on logical CSS properties, so it flows and mirrors correctly in both Arabic and English layouts.",
    ar: "الشارة عنصر صغير غير قابل للنقر يُستخدم للدلالة على حالة أو عدد أو تصنيف بجانب النص، مثل «مدفوع» على فاتورة أو «جديد» على منتج. تتوفّر بستّة ألوان لكلٍّ منها دلالته، وبنمطين: تلوين خفيف أو تعبئة كاملة، وكلها مأخوذة من قيم تصميم ETKAN حتى تبقى الألوان متناسقة في الوضعين الفاتح والداكن. وتعتمد على خصائص CSS المنطقية، فتنساب وتنعكس بشكل صحيح في الواجهات العربية والإنجليزية.",
  },
  when: {
    en: "Reach for Badge to show a short, read-only status or label inside a table row, card, list item, or heading — such as order state, stock level, or a category tag. If the label can be removed or clicked to filter, use Tag instead. For a number that overlays another element, like an unread count on an icon, use a dedicated count indicator rather than Badge.",
    ar: "استخدم الشارة لعرض حالة أو تسمية قصيرة للقراءة فقط داخل صفّ جدول أو بطاقة أو عنصر قائمة أو عنوان، مثل حالة الطلب أو مستوى المخزون أو تصنيف. أمّا إذا كان بالإمكان إزالة التسمية أو الضغط عليها للتصفية، فاستخدم عنصر Tag بدلًا منها. ولعرض رقم يعلو عنصرًا آخر، مثل عدد الإشعارات غير المقروءة فوق أيقونة، فاستخدم مؤشّر عدّ مخصّصًا لا الشارة.",
  },
  behavior: {
    en: "Badge renders as a fixed-height inline-flex pill with a small radius and a single line of text that never wraps. The soft variant paints a tinted surface with matching text and a subtle border, while the solid variant fills with the tone color and uses on-primary text. When dot is on, a tiny round marker appears at the leading edge, colored with currentColor so it always matches the text; in Arabic (RTL) the dot sits on the right and the text follows to its left, because the layout uses inline-flex with a logical gap and mirrors automatically. Badge is static and non-interactive by design — it has no hover, press, or focus states and adds no motion of its own, keeping status labels calm and readable.",
    ar: "تظهر الشارة عنصرًا أفقيًا صغيرًا بارتفاع ثابت وزوايا خفيفة الاستدارة، ونصّها في سطر واحد لا يلتفّ أبدًا. في النمط الخفيف تأخذ خلفية ملوّنة قليلًا مع نصّ متناسق وحدّ خفيف، وفي النمط الكامل تُملأ بلون الدلالة ويأتي النصّ بلون واضح فوقه. وعند تفعيل dot تظهر نقطة دائرية صغيرة في بداية الشارة، تأخذ لونها من لون النصّ نفسه فتطابقه دائمًا؛ وفي الاتجاه من اليمين إلى اليسار تقع النقطة على اليمين ويأتي النصّ على يسارها، لأن التخطيط يعتمد على inline-flex مع مسافة منطقية فينعكس تلقائيًا. والشارة ساكنة وغير تفاعلية عن قصد، فليست لها حالات تمرير أو ضغط أو تركيز ولا تضيف أي حركة، لتبقى تسميات الحالة هادئة وسهلة القراءة.",
  },
  props: [
    {
      name: "children",
      type: "React.ReactNode",
      desc: {
        en: "The content shown inside the badge, usually a short status or label text.",
        ar: "المحتوى الذي يظهر داخل الشارة، وغالبًا يكون نصّ حالة أو تسمية قصيرة.",
      },
    },
    {
      name: "tone",
      type: '"neutral" | "primary" | "success" | "warning" | "danger" | "info"',
      default: '"neutral"',
      desc: {
        en: "The semantic color of the badge. Use success for positive states, warning for caution, danger for errors, info for informational notes, primary for brand emphasis, and neutral for a plain label.",
        ar: "لون الشارة ودلالته. استخدم success للحالات الإيجابية، وwarning للتنبيه، وdanger للأخطاء، وinfo للملاحظات، وprimary لإبراز العلامة، وneutral للتسمية العادية.",
      },
    },
    {
      name: "variant",
      type: '"soft" | "solid"',
      default: '"soft"',
      desc: {
        en: "Visual weight. soft tints the surface with the tone color, while solid fills the badge fully with the tone color for stronger emphasis.",
        ar: "الوزن البصري. النمط soft يلوّن الخلفية قليلًا بلون الدلالة، بينما النمط solid يملأ الشارة بالكامل بلون الدلالة لإبراز أقوى.",
      },
    },
    {
      name: "dot",
      type: "boolean",
      default: "false",
      desc: {
        en: "Shows a small leading status dot before the text, colored to match the text.",
        ar: "يُظهر نقطة حالة صغيرة قبل النصّ، بلون يطابق لون النصّ.",
      },
    },
    {
      name: "style",
      type: "React.CSSProperties",
      desc: {
        en: "Inline style overrides, merged last on top of the computed styles as an escape hatch for one-off adjustments.",
        ar: "أنماط مضمّنة تتجاوز الأنماط الأصلية، وتُدمج في النهاية فوق الأنماط المحسوبة لإتاحة تعديلات بسيطة على حالة بعينها.",
      },
    },
  ],
  code: `import { Badge } from "@backdoor_est/etkan-ui-react";

export function InvoiceStatuses() {
  return (
    <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
      <Badge tone="success" dot>مدفوع</Badge>
      <Badge tone="warning">قيد المراجعة</Badge>
      <Badge tone="danger" variant="solid">متأخّر</Badge>
      <Badge tone="info">الرياض</Badge>
      <Badge tone="neutral">1٬250 ر.س</Badge>
    </div>
  );
}`,
};

export default doc;
