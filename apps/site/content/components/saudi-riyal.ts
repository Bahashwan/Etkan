import type { ComponentDoc } from "../component-doc";

const doc: ComponentDoc = {
  slug: "saudi-riyal",
  name: "SaudiRiyal",
  group: "Saudi",
  title: {
    en: "The official Saudi Riyal currency symbol as a font-independent SVG glyph.",
    ar: "رمز الريال السعودي الرسمي كأيقونة SVG تظهر بشكل ثابت في كل مكان.",
  },
  description: {
    en: "SaudiRiyal renders the official Saudi Riyal symbol (introduced in 2024) as a hand-drawn SVG path instead of the U+20C1 character, so it looks identical everywhere no matter whether the surrounding font supports the glyph yet. It inherits the current text color and sizes to the surrounding text by default, so it drops cleanly into any label, price, or heading. Use it anywhere you would otherwise show a currency mark — never a dollar sign — and pair it with formatSAR for full amounts.",
    ar: "يعرض SaudiRiyal رمز الريال السعودي الرسمي (الذي اعتُمد عام 2024) على هيئة رسم SVG بدلاً من الحرف U+20C1، فيظهر بشكل واحد ثابت في كل المتصفحات حتى لو كان الخط المحيط لا يدعم الرمز بعد. يأخذ الرمز لون النص المحيط به ويتبع حجمه تلقائياً، فيندمج بسلاسة داخل أي عنوان أو سعر أو نص. استخدمه في أي مكان يظهر فيه رمز العملة، ولا تستخدم علامة الدولار أبداً، واستعمله مع formatSAR عند عرض المبالغ الكاملة.",
  },
  when: {
    en: "Reach for SaudiRiyal whenever you display a price or currency mark and need it to render reliably across fonts and platforms — product cards, checkout totals, invoices, tables. Prefer it over typing the raw riyal character or the SAR/ر.س text fallback when visual consistency matters. For a fully formatted amount with grouping and locale rules, use the formatSAR helper instead of composing the number and this glyph by hand.",
    ar: "استخدم SaudiRiyal في أي مكان تعرض فيه سعراً أو رمز عملة وتريده أن يظهر بشكل موثوق في كل الخطوط والأجهزة، مثل بطاقات المنتجات وإجمالي الطلب والفواتير والجداول. فضّله على كتابة حرف الريال مباشرة أو على البديل النصي SAR / ر.س عندما يهمّك ثبات الشكل. أما إذا أردت مبلغاً منسّقاً بالكامل مع فواصل الآلاف وقواعد اللغة، فاستخدم دالة formatSAR بدلاً من دمج الرقم والرمز يدوياً.",
  },
  behavior: {
    en: "The glyph is a static SVG with no built-in animation of its own: it has no hover, press, or transition states, and it stays visually still. Because width and height default to \"1em\" and fill is currentColor, it scales and recolors together with its parent text — so any transition or color change you apply to the surrounding element (for example a link that fades color on hover) carries the symbol along with it. It sits on the text baseline via a small vertical-align nudge so it lines up neatly beside digits. When you pass title it becomes an accessible image with that label; without a title it is treated as decorative and hidden from screen readers. As a symmetric symbol it does not mirror in Arabic (RTL) — it renders the same in both directions, while the number beside it follows the document's text direction.",
    ar: "الرمز عبارة عن SVG ثابت لا يملك حركة خاصة به: لا يوجد له تأثير عند المرور أو الضغط ولا انتقالات، ويبقى ثابتاً بصرياً. ولأن العرض والارتفاع يساويان \"1em\" واللون مأخوذ من لون النص (currentColor)، فإنه يكبر ويتلوّن مع النص المحيط به، لذا أي انتقال أو تغيّر لون تطبّقه على العنصر المحيط (مثل رابط يتغير لونه عند المرور) ينطبق على الرمز كذلك. يستقر الرمز على خط الأساس عبر إزاحة رأسية بسيطة ليصطف بدقة بجانب الأرقام. عند تمرير title يصبح صورة لها وصف مسموع، وبدونه يُعامل كعنصر زخرفي يُخفى عن قارئات الشاشة. وبما أنه رمز متماثل فإنه لا ينعكس في العربية (RTL) بل يظهر بالشكل نفسه في الاتجاهين، بينما يتبع الرقم المجاور له اتجاه كتابة المستند.",
  },
  props: [
    {
      name: "size",
      type: "number | string",
      default: '"1em"',
      desc: {
        en: "The width and height of the glyph. Defaults to \"1em\" so it scales with the surrounding text; pass a number (pixels) or any CSS length.",
        ar: "عرض الرمز وارتفاعه. القيمة الافتراضية \"1em\" ليتبع حجم النص المحيط، ويمكن تمرير رقم (بالبكسل) أو أي وحدة قياس CSS.",
      },
    },
    {
      name: "title",
      type: "string",
      desc: {
        en: "Accessible label for the symbol. When provided, the glyph is exposed to screen readers as an image with this label; when omitted, it is decorative and hidden from assistive tech.",
        ar: "الوصف المسموع للرمز. عند تمريره يظهر الرمز لقارئات الشاشة كصورة تحمل هذا الوصف، وعند حذفه يُعدّ زخرفياً ويُخفى عن أدوات الوصول.",
      },
    },
    {
      name: "style",
      type: "React.CSSProperties",
      desc: {
        en: "Inline style overrides merged onto the SVG, after the default inline-block display and baseline alignment.",
        ar: "أنماط مباشرة تُدمج فوق الأنماط الافتراضية للرمز، بعد إعداد العرض inline-block والمحاذاة على خط الأساس.",
      },
    },
    {
      name: "className",
      type: "string",
      desc: {
        en: "CSS class applied to the SVG element, forwarded like any other SVG attribute.",
        ar: "فئة CSS تُطبّق على عنصر SVG، وتُمرّر مثل أي خاصية أخرى من خصائص SVG.",
      },
    },
  ],
  code: `import { SaudiRiyal } from "@backdoor_est/etkan-ui-react";

export function ProductPrice() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-1)" }}>
      <span style={{ fontSize: "var(--text-xl)", fontWeight: 700 }}>
        250 <SaudiRiyal title="ريال سعودي" />
      </span>
      <span style={{ color: "var(--color-text-muted)" }}>
        التوصيل إلى الرياض خلال يومي عمل
      </span>
    </div>
  );
}`,
};

export default doc;
