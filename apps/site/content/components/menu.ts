import type { ComponentDoc } from "../component-doc";

const doc: ComponentDoc = {
  slug: "menu",
  name: "Menu",
  tag: "etkan-menu",
  group: "Navigation",
  title: {
    en: "A dropdown menu of actions that opens from a trigger button.",
    ar: "قائمة إجراءات منسدلة تُفتح من زر.",
  },
  description: {
    en: "Menu is a hand-built dropdown that shows a list of actions under a trigger you provide. It follows the WAI-ARIA menu-button pattern with full keyboard support, roving focus, and click-outside dismissal, and each item can have an icon, a keyboard-shortcut hint, a divider, a disabled state, or destructive (red) styling. It is built entirely from ETKAN tokens and logical CSS properties, so it looks right in the light and dark themes and flips cleanly between Arabic (RTL) and English (LTR).",
    ar: "Menu قائمة منسدلة مبنية يدويًا، تعرض مجموعة إجراءات تظهر أسفل زر تحدّده أنت. تتبع نمط زر القائمة في WAI-ARIA، مع دعم كامل للوحة المفاتيح، وتنقّل للتركيز بين العناصر، وإغلاق عند النقر خارجها. ويمكن لكل عنصر أن يحمل أيقونة، أو تلميحًا لاختصار لوحة المفاتيح، أو فاصلًا، أو حالة تعطيل، أو لونًا أحمر للإجراءات الخطيرة. القائمة مبنية بالكامل من رموز ETKAN وخصائص CSS المنطقية، فتظهر بشكل صحيح في الوضعين الفاتح والداكن، وتنقلب بسلاسة بين العربية (RTL) والإنجليزية (LTR).",
  },
  when: {
    en: "Reach for Menu when a button should reveal a small set of actions or commands, like row actions in a table or an account menu. For picking one value from a list of choices inside a form, use Select instead. For a short set of always-visible options, use Radio, and for a simple on/off action use a Button or Switch.",
    ar: "استخدم Menu عندما تريد زرًّا يكشف مجموعة صغيرة من الإجراءات أو الأوامر، مثل إجراءات صف في جدول أو قائمة الحساب. أما لاختيار قيمة واحدة من قائمة داخل نموذج فاستخدم Select. وللخيارات القليلة التي يُفضَّل بقاؤها ظاهرة دائمًا استخدم Radio، وللتبديل البسيط بين تشغيل وإيقاف استخدم Button أو Switch.",
  },
  behavior: {
    en: "Clicking the trigger, or pressing ArrowDown or ArrowUp on it, opens the popup. The panel grows in with a quick scale-and-fade: it animates from 96% scale and zero opacity to full size over the fast duration with the ease-out curve, growing from its top corner. Focus moves onto the first item automatically, and the arrow keys walk through items with wrap-around; Home and End jump to the first and last, dividers and disabled items are skipped, and typing hovers highlight the item under the pointer. Each item's background fades on hover and while active. Escape closes the menu and returns focus to the trigger, Tab closes it, and pressing outside dismisses it. Because the panel is positioned with logical properties, align \"start\" pins it to the leading edge and align \"end\" to the trailing edge, so in Arabic the whole menu mirrors to open toward the left automatically.",
    ar: "يفتح النقرُ على الزر القائمةَ، وكذلك الضغط على السهم لأسفل أو لأعلى وهو محدَّد. تظهر اللوحة بحركة تكبير وتلاشٍ سريعة: تبدأ من حجم 96% وشفافية صفر، ثم تصل إلى حجمها الكامل خلال مدة سريعة بمنحنى ease-out، وتكبر انطلاقًا من ركنها العلوي. ينتقل التركيز تلقائيًا إلى العنصر الأول، وتنقلك أسهم لوحة المفاتيح بين العناصر مع الالتفاف من النهاية إلى البداية، بينما يقفز Home وEnd إلى أول عنصر وآخره. تُتخطّى الفواصل والعناصر المعطّلة، ويُبرَز العنصر الذي يمرّ فوقه مؤشر الفأرة. وتتلاشى خلفية كل عنصر عند المرور فوقه وأثناء تنشيطه. يغلق Escape القائمة ويعيد التركيز إلى الزر، كما يغلقها Tab، والنقر خارجها يغلقها أيضًا. ولأن موضع اللوحة يعتمد على الخصائص المنطقية، فإن align بقيمة \"start\" يثبّتها عند الحافة الأمامية و\"end\" عند الحافة الخلفية، لذا تنعكس القائمة كاملةً في العربية لتُفتح نحو اليسار تلقائيًا.",
  },
  props: [
    {
      name: "trigger",
      type: "React.ReactNode | ((open: boolean) => React.ReactNode)",
      required: true,
      desc: {
        en: "The trigger content. Pass a node, or a function that receives the open state and returns node for open-aware content.",
        ar: "محتوى الزر الذي يفتح القائمة. مرِّر عنصرًا، أو دالة تستقبل حالة الفتح وتُرجع عنصرًا فيتغيّر المحتوى تبعًا لكون القائمة مفتوحة.",
      },
    },
    {
      name: "items",
      type: "MenuItemDef[]",
      required: true,
      desc: {
        en: "The menu items in display order. Each item may set label, icon, onClick, shortcut, danger, disabled, or divider.",
        ar: "عناصر القائمة بترتيب ظهورها. يمكن لكل عنصر ضبط label أو icon أو onClick أو shortcut أو danger أو disabled أو divider.",
      },
    },
    {
      name: "align",
      type: '"start" | "end"',
      default: '"start"',
      desc: {
        en: "Which inline edge the popup aligns to. \"start\" is the leading edge, \"end\" the trailing edge; both flip with the text direction.",
        ar: "الحافة الأفقية التي تُحاذى إليها اللوحة. \"start\" هي الحافة الأمامية و\"end\" الحافة الخلفية، وكلتاهما تنقلبان مع اتجاه النص.",
      },
    },
    {
      name: "style",
      type: "React.CSSProperties",
      desc: {
        en: "Inline styles merged onto the menu's root wrapper element.",
        ar: "أنماط سطرية تُدمج مع عنصر الغلاف الجذري للقائمة.",
      },
    },
  ],
  code: `import { Menu, Button } from "@backdoor_est/etkan-ui-react";

export function OrderActions() {
  return (
    <Menu
      trigger={<Button variant="outline">إجراءات الطلب</Button>}
      align="start"
      items={[
        { label: "عرض التفاصيل", onClick: () => openOrder() },
        { label: "طباعة الفاتورة", shortcut: "Ctrl+P", onClick: () => print() },
        { divider: true },
        { label: "تعديل عنوان التوصيل", onClick: () => editAddress() },
        {
          label: "إلغاء الطلب",
          danger: true,
          onClick: () => cancelOrder(),
        },
      ]}
    />
  );
}`,
};

export default doc;
