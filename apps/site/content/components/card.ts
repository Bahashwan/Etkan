import type { ComponentDoc } from "../component-doc";

const doc: ComponentDoc = {
  slug: "card",
  name: "Card",
  tag: "etkan-card",
  group: "Data",
  title: {
    en: "A surface that groups related content, with optional header and footer slots.",
    ar: "حاوية تجمع المحتوى المترابط في مكان واحد، مع ترويسة وتذييل اختياريين.",
  },
  description: {
    en: "Card is a rounded container that wraps related content into one clear surface, with optional header and footer slots for titles and actions. It comes in an elevated variant that uses shadow tokens and an outlined variant that uses a border, and it can be made fully clickable when needed. Every color, radius, spacing, shadow, and motion value comes from ETKAN tokens, and it mirrors automatically in Arabic (RTL) because it relies only on logical CSS properties.",
    ar: "Card حاوية ذات زوايا دائرية تجمع المحتوى المترابط في مكان واحد واضح، مع ترويسة وتذييل اختياريين للعناوين والإجراءات. يتوفر بنمطين: elevated الذي يعتمد على الظلال من tokens، وoutlined الذي يكتفي بحد ويظهر بلا ظل. ويمكن جعله قابلًا للنقر بالكامل عند الحاجة. تأتي كل الألوان والزوايا والمسافات والظلال والحركة من tokens الخاصة باتقان، وينعكس تلقائيًا في الوضع العربي (RTL) لأنه يعتمد على خصائص CSS المنطقية فقط.",
  },
  when: {
    en: "Reach for Card to visually separate a block of content from the page — a product, a summary, a form section, or a stat. Use the interactive prop when the whole card should act as one link or button, such as a product tile that opens a details page. If you only need a plain box without a raised surface or slots, a simple container is enough; if you need a modal overlay, use Dialog instead.",
    ar: "استخدم Card لفصل كتلة محتوى عن باقي الصفحة بصريًا، مثل منتج أو ملخص أو قسم من نموذج أو رقم إحصائي. فعّل خاصية interactive عندما تريد أن تعمل البطاقة كلها كرابط أو زر واحد، مثل بطاقة منتج تفتح صفحة تفاصيله. إذا كنت تريد مجرد صندوق بسيط بلا بروز ولا ترويسة أو تذييل، فيكفيك عنصر حاوية عادي؛ وإذا كنت تريد نافذة منبثقة فوق الصفحة فاستخدم Dialog بدلًا منه.",
  },
  behavior: {
    en: "In its resting state the card shows a subtle border and, for the elevated variant, a small shadow. When interactive is set, hovering or focusing the card raises it: it slides up by 2px via a transform and its shadow grows to a medium level, both animated together over the base token duration with the standard easing curve, so the lift feels smooth rather than instant. Keyboard focus adds the ETKAN focus ring on top of the shadow, the cursor becomes a pointer, and the card gains role=\"button\" with tabIndex 0 so Enter or Space triggers onClick just like a mouse press. The header sits above the body with a divider and semibold strong-color text, and the footer sits below on a sunken background. All padding and dividers use logical properties, so in Arabic (RTL) the entire layout mirrors automatically with no extra code.",
    ar: "في حالتها الساكنة تُظهر البطاقة حدًا خفيفًا، ويُضاف في نمط elevated ظل صغير. عند تفعيل interactive، يؤدي مرور المؤشر فوق البطاقة أو التركيز عليها إلى رفعها: ترتفع بمقدار 2px عبر transform ويكبر ظلها إلى مستوى متوسط، وتتحرك الحركتان معًا خلال مدة الـ token الأساسية وبمنحنى الحركة القياسي، فيبدو الارتفاع سلسًا لا مفاجئًا. ويضيف التركيز بلوحة المفاتيح حلقة التركيز الخاصة باتقان فوق الظل، ويتحوّل المؤشر إلى يد، وتأخذ البطاقة role=\"button\" و tabIndex بقيمة 0 حتى يُشغّل زر Enter أو المسافة الحدث onClick تمامًا مثل نقرة الفأرة. تظهر الترويسة أعلى المحتوى يفصلها خط، بنص بارز وخط شبه عريض (semibold)، ويظهر التذييل أسفله على خلفية غائرة. وتعتمد كل المسافات والفواصل على الخصائص المنطقية، لذا ينعكس التخطيط كله تلقائيًا في الوضع العربي (RTL) دون أي كود إضافي.",
  },
  props: [
    {
      name: "children",
      type: "React.ReactNode",
      desc: {
        en: "The main content rendered inside the card body.",
        ar: "المحتوى الرئيسي الذي يظهر داخل جسم البطاقة.",
      },
    },
    {
      name: "variant",
      type: '"elevated" | "outlined"',
      default: '"elevated"',
      desc: {
        en: "Visual style. \"elevated\" adds a shadow to lift the card off the page; \"outlined\" uses a border only, with no shadow at rest.",
        ar: "النمط البصري. \"elevated\" يضيف ظلًّا يرفع البطاقة عن الصفحة، و\"outlined\" يعتمد على حد فقط دون ظل في حالة السكون.",
      },
    },
    {
      name: "header",
      type: "React.ReactNode",
      desc: {
        en: "Optional content shown at the top in a divided, semibold header slot. Good for a title or a title with an action.",
        ar: "محتوى اختياري يظهر في الأعلى داخل ترويسة يفصلها خط، بنص شبه عريض (semibold). مناسب لعنوان، أو لعنوان مصحوب بإجراء.",
      },
    },
    {
      name: "footer",
      type: "React.ReactNode",
      desc: {
        en: "Optional content shown at the bottom on a sunken background, separated by a divider. Good for actions or a summary line.",
        ar: "محتوى اختياري يظهر في الأسفل على خلفية غائرة ويفصله خط. مناسب للإجراءات أو لسطر ملخّص.",
      },
    },
    {
      name: "padding",
      type: '"none" | "sm" | "md" | "lg"',
      default: '"md"',
      desc: {
        en: "Inner spacing scale for the body and slots. Use \"none\" when the content brings its own padding, such as a full-bleed image.",
        ar: "مقياس المسافة الداخلية للجسم والخانات. استخدم \"none\" عندما يوفّر المحتوى مسافته الخاصة، مثل صورة تملأ العرض بالكامل.",
      },
    },
    {
      name: "interactive",
      type: "boolean",
      default: "false",
      desc: {
        en: "Makes the whole card a single clickable target: adds hover-lift, a pointer cursor, keyboard focus, and role=\"button\" so Enter and Space activate onClick.",
        ar: "يجعل البطاقة بأكملها هدفًا واحدًا قابلًا للنقر: يضيف حركة الارتفاع عند المرور، ومؤشر اليد، والتركيز بلوحة المفاتيح، و role=\"button\" حتى يُفعّل زرّا Enter والمسافة onClick.",
      },
    },
    {
      name: "onClick",
      type: "React.MouseEventHandler<HTMLDivElement>",
      desc: {
        en: "Called when the card is clicked, and when Enter or Space is pressed while it is interactive and focused.",
        ar: "يُستدعى عند النقر على البطاقة، وعند الضغط على Enter أو المسافة أثناء تفعيلها والتركيز عليها.",
      },
    },
    {
      name: "style",
      type: "React.CSSProperties",
      default: "{}",
      desc: {
        en: "Extra styles merged onto the root card element.",
        ar: "أنماط إضافية تُدمج مع عنصر البطاقة الرئيسي.",
      },
    },
  ],
  code: `import { Card } from "@backdoor_est/etkan-ui-react";

export function ProductCard() {
  return (
    <Card
      variant="elevated"
      interactive
      header="عباية كلاسيكية — جدة"
      footer="التوصيل خلال يومين إلى الرياض"
      onClick={() => console.log("فتح تفاصيل المنتج")}
    >
      <p>قماش خفيف مناسب لأجواء الصيف، متوفر بعدة مقاسات.</p>
      <strong>٣٤٩ ر.س</strong>
    </Card>
  );
}`,
};

export default doc;
