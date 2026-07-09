import type { ComponentDoc } from "../component-doc";

const doc: ComponentDoc = {
  slug: "dialog",
  name: "Dialog",
  tag: "etkan-dialog",
  group: "Feedback",
  title: {
    en: "A modal dialog that opens over the page to focus the user on one task or decision.",
    ar: "نافذة تظهر فوق الصفحة لتوجّه انتباه المستخدم إلى مهمة أو قرار واحد.",
  },
  description: {
    en: "Dialog is a modal window rendered through a portal on top of a dimmed, blurred backdrop, with optional title, description, body, and footer slots. It traps keyboard focus while open, restores focus to the element that opened it on close, locks background scrolling, and closes on Escape or a backdrop click. Every color, radius, spacing, shadow, and motion value comes from ETKAN tokens, and because it uses only logical CSS properties it mirrors automatically in Arabic (RTL).",
    ar: "Dialog نافذة منبثقة تظهر عبر portal فوق خلفية معتمة ومموّهة، مع أجزاء اختيارية للعنوان والوصف والمحتوى والتذييل. تُبقي التركيز داخلها ما دامت مفتوحة، وتعيده إلى العنصر الذي فتحها عند الإغلاق، وتوقف تمرير الصفحة خلفها، وتُغلق بزر Escape أو بالنقر على الخلفية. تأتي كل الألوان والزوايا والمسافات والظلال والحركة من tokens الخاصة باتقان، ولأنها تعتمد على الخصائص المنطقية في CSS فقط فإنها تنعكس تلقائيًا في الواجهة العربية (RTL).",
  },
  when: {
    en: "Reach for Dialog when you need to interrupt the flow to confirm an action, collect a short piece of input, or show a message the user must acknowledge before moving on — for example confirming a delete or a payment. Because it blocks the rest of the page, keep its content focused and brief. For a passing status message that does not need a response, use Toast; for a non-blocking hint next to an element, use Tooltip; and to group content inline within the page, use Card.",
    ar: "استخدم Dialog عندما تحتاج إلى مقاطعة سير العمل مؤقتًا لتأكيد إجراء، أو طلب مُدخَل قصير، أو عرض رسالة يجب أن يقرّها المستخدم قبل المتابعة، مثل تأكيد حذف أو عملية دفع. ولأنها تحجب بقية الصفحة، اجعل محتواها مركّزًا وموجزًا. للرسائل العابرة التي لا تنتظر ردًّا استخدم Toast، وللتلميح البسيط بجوار عنصر دون حجب الصفحة استخدم Tooltip، ولتجميع المحتوى داخل الصفحة نفسها استخدم Card.",
  },
  behavior: {
    en: "When open becomes true the dialog mounts and animates in: the backdrop fades from transparent to opaque while the panel scales up from 0.96 to 1 and fades in, both over the base token duration with the standard ease-out curve, so it grows gently into place rather than popping. On close it plays the same motion in reverse — the panel scales back down and fades out — and only unmounts after the 200ms exit finishes, so it never disappears abruptly. While open it moves focus to the first focusable control (or the panel itself), traps Tab and Shift+Tab so focus cycles inside the panel, closes on Escape, and restores focus to the opener once it unmounts; background scroll is locked the whole time. Clicking the backdrop closes it unless closeOnBackdrop is false. If the user prefers reduced motion, the animation is skipped and the dialog appears and disappears instantly. All spacing uses logical properties, so in Arabic (RTL) the header text, footer buttons, and padding mirror automatically with no extra code.",
    ar: "عندما تصبح open بقيمة true تظهر النافذة بحركة انسيابية: تنتقل الخلفية من الشفافية إلى العتامة بينما تكبر اللوحة من 0.96 إلى 1 وتظهر تدريجيًا، وتحدث الحركتان خلال مدة الـ token الأساسية بمنحنى ease-out القياسي، فتنمو بلطف إلى مكانها بدل أن تقفز دفعة واحدة. وعند الإغلاق تعمل الحركة نفسها بالعكس، إذ تصغر اللوحة وتتلاشى، ولا تختفي من الصفحة إلا بعد انتهاء حركة الخروج خلال 200ms، فلا تزول فجأة. وما دامت مفتوحة تنقل التركيز إلى أول عنصر قابل للتركيز (أو إلى اللوحة نفسها)، وتجعل Tab وShift+Tab يُبقيان التركيز يدور داخلها، وتُغلق بزر Escape، وتعيد التركيز إلى العنصر الذي فتحها بعد اختفائها، ويبقى تمرير الصفحة خلفها موقوفًا طوال الوقت. والنقر على الخلفية يغلقها ما لم تكن closeOnBackdrop بقيمة false. وإذا كان المستخدم يفضّل تقليل الحركة، تُلغى الحركة وتظهر النافذة وتختفي فورًا. وتعتمد كل المسافات على الخصائص المنطقية، لذا تنعكس في الواجهة العربية (RTL) الترويسة وأزرار التذييل والمسافات تلقائيًا دون أي كود إضافي.",
  },
  props: [
    {
      name: "open",
      type: "boolean",
      required: true,
      desc: {
        en: "Controls visibility. Set it to true to show the dialog; when set to false it animates out and then unmounts.",
        ar: "يتحكم في ظهور النافذة. اجعله true لعرضها، وعند جعله false تختفي بحركة ثم تُزال من الصفحة.",
      },
    },
    {
      name: "onClose",
      type: "() => void",
      desc: {
        en: "Called when the user asks to dismiss the dialog — via Escape, a backdrop click, or a close control. Update your own open state here.",
        ar: "يُستدعى عندما يطلب المستخدم إغلاق النافذة، سواء بزر Escape أو بالنقر على الخلفية أو بعنصر إغلاق. حدّث حالة open الخاصة بك هنا.",
      },
    },
    {
      name: "title",
      type: "React.ReactNode",
      desc: {
        en: "Accessible title shown at the top of the panel and wired to the dialog via aria-labelledby.",
        ar: "عنوان يظهر أعلى اللوحة ويُربط بالنافذة عبر aria-labelledby لأغراض الوصول.",
      },
    },
    {
      name: "description",
      type: "React.ReactNode",
      desc: {
        en: "Supporting text shown under the title and wired to the dialog via aria-describedby.",
        ar: "نص مساند يظهر أسفل العنوان ويُربط بالنافذة عبر aria-describedby.",
      },
    },
    {
      name: "children",
      type: "React.ReactNode",
      desc: {
        en: "The main body content of the dialog, shown in a scrollable region when it overflows.",
        ar: "المحتوى الرئيسي للنافذة، ويظهر في منطقة قابلة للتمرير عند تجاوزه للمساحة.",
      },
    },
    {
      name: "footer",
      type: "React.ReactNode",
      desc: {
        en: "Footer slot, typically the action buttons. They are aligned to the end of the row and mirror in Arabic.",
        ar: "منطقة التذييل، وتُستخدم عادةً لأزرار الإجراءات. تُحاذى إلى نهاية الصف وتنعكس في الواجهة العربية.",
      },
    },
    {
      name: "size",
      type: '"sm" | "md" | "lg"',
      default: '"md"',
      desc: {
        en: "Panel max-width preset: sm (380px), md (520px), or lg (720px).",
        ar: "يحدّد أقصى عرض للّوحة: sm بعرض 380px، وmd بعرض 520px، وlg بعرض 720px.",
      },
    },
    {
      name: "closeOnBackdrop",
      type: "boolean",
      default: "true",
      desc: {
        en: "Whether clicking the dimmed backdrop closes the dialog. Set it to false to require an explicit action instead.",
        ar: "ما إذا كان النقر على الخلفية المعتمة يغلق النافذة. اجعله false لتشترط إجراءً صريحًا بدلًا من ذلك.",
      },
    },
    {
      name: "style",
      type: "React.CSSProperties",
      default: "{}",
      desc: {
        en: "Extra styles merged onto the dialog panel.",
        ar: "أنماط إضافية تُدمج مع لوحة النافذة.",
      },
    },
  ],
  code: `import { useState } from "react";
import { Dialog, Button } from "@backdoor_est/etkan-ui-react";

export function CancelOrderDialog() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="danger" onClick={() => setOpen(true)}>
        إلغاء الطلب
      </Button>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        title="تأكيد إلغاء الطلب"
        description="سيتم إرجاع المبلغ إلى وسيلة الدفع خلال ثلاثة أيام عمل."
        size="sm"
        footer={
          <>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              تراجع
            </Button>
            <Button variant="danger" onClick={() => setOpen(false)}>
              نعم، ألغِ الطلب
            </Button>
          </>
        }
      >
        <p>طلبك رقم ‎#48213 بقيمة ٢٧٥ ر.س سيُلغى، ولن يتم توصيله إلى الرياض.</p>
      </Dialog>
    </>
  );
}`,
};

export default doc;
