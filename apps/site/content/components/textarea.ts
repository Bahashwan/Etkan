import type { ComponentDoc } from "../component-doc";

const doc: ComponentDoc = {
  slug: "textarea",
  name: "Textarea",
  tag: "etkan-textarea",
  group: "Forms",
  title: {
    en: "Multi-line text field for longer, free-form input.",
    ar: "حقل نصي متعدد الأسطر لكتابة النصوص الطويلة والمفتوحة.",
  },
  description: {
    en: "Textarea is a multi-line input that shares the same look as ETKAN's Input: a label, an optional helper hint, and an error message that appears when the field is invalid. Every color, spacing value, radius, and font comes from the ETKAN design tokens, so it matches the rest of the system and adapts to light and dark themes automatically. It is fully bilingual: because it relies only on logical CSS properties, the label, padding, and text align themselves correctly in both Arabic (RTL) and English (LTR).",
    ar: "حقل Textarea هو حقل إدخال متعدد الأسطر بنفس مظهر حقل Input في اتقان: عنوان، وتلميح مساعد اختياري، ورسالة خطأ تظهر عند إدخال قيمة غير صحيحة. كل الألوان والمسافات والحواف والخطوط مأخوذة من متغيّرات التصميم (tokens) في اتقان، لذا ينسجم مع بقية النظام ويتكيّف مع الوضع الفاتح والداكن تلقائياً. وهو ثنائي اللغة بالكامل: لاعتماده على خصائص CSS المنطقية وحدها، يترتّب العنوان والمسافات والنص بالشكل الصحيح في العربية (RTL) والإنجليزية (LTR).",
  },
  when: {
    en: "Reach for Textarea when you expect more than a single line of text: notes, addresses, feedback, or a message body. For short values like a name, email, phone number, or a single search term, use Input instead.",
    ar: "استخدم Textarea عندما تتوقّع أكثر من سطر واحد من النص: الملاحظات، أو العناوين، أو الآراء، أو نص الرسالة. أمّا للقيم القصيرة مثل الاسم أو البريد أو رقم الجوال أو كلمة بحث واحدة، فاستخدم Input بدلاً منه.",
  },
  behavior: {
    en: "The field shows four visible rows by default and can be dragged taller from its bottom edge (vertical resize only). On focus, the border color moves to the focus token and a soft focus ring appears; both changes animate smoothly using the fast duration and standard easing tokens, so there is no harsh jump. When the field is marked invalid, the border turns red, the helper hint is replaced by the error message, and that message is announced to screen readers. A disabled field dims slightly and switches to a sunken background. In Arabic (RTL) the whole control mirrors automatically: the label sits on the right, text starts from the right, and the inner padding flips side — all handled through logical properties, with no separate RTL styling.",
    ar: "يعرض الحقل أربعة أسطر افتراضياً، ويمكنك تكبيره رأسياً فقط بسحب حافته السفلية. عند التركيز عليه، يتحوّل لون الحدود إلى لون التركيز وتظهر حوله هالة خفيفة، وينتقل التغييران بسلاسة عبر مدة سريعة وتوقيت انسيابي من متغيّرات التصميم (tokens)، من دون قفزة مفاجئة. وعندما يُعلَّم الحقل بأنه غير صحيح، تصبح الحدود حمراء، وتحلّ رسالة الخطأ محلّ التلميح المساعد، وتُقرأ الرسالة على مستخدمي قارئات الشاشة. أمّا الحقل المعطّل فيبهت قليلاً وتصبح خلفيته غائرة. وفي العربية (RTL) ينعكس الحقل بالكامل تلقائياً: يظهر العنوان على اليمين، ويبدأ النص من اليمين، وتنتقل المسافات الداخلية إلى الجهة المقابلة — كل ذلك عبر الخصائص المنطقية دون أي تنسيق خاص بالعربية.",
  },
  props: [
    {
      name: "label",
      type: "string",
      desc: {
        en: "Label text shown above the field.",
        ar: "نص العنوان الظاهر أعلى الحقل.",
      },
    },
    {
      name: "invalid",
      type: "boolean",
      default: "false",
      desc: {
        en: "Marks the field as invalid: turns the border red and shows the error message.",
        ar: "يُعلِّم الحقل بأنه غير صحيح: يجعل الحدود حمراء ويعرض رسالة الخطأ.",
      },
    },
    {
      name: "disabled",
      type: "boolean",
      default: "false",
      desc: {
        en: "Disables the field so it cannot be edited or focused.",
        ar: "يعطّل الحقل بحيث لا يمكن تعديله أو التركيز عليه.",
      },
    },
    {
      name: "helperText",
      type: "string",
      desc: {
        en: "Helper hint shown below the field while it is valid.",
        ar: "تلميح مساعد يظهر أسفل الحقل ما دامت القيمة صحيحة.",
      },
    },
    {
      name: "errorText",
      type: "string",
      desc: {
        en: "Error message shown below the field when it is invalid.",
        ar: "رسالة الخطأ التي تظهر أسفل الحقل عندما تكون القيمة غير صحيحة.",
      },
    },
    {
      name: "rows",
      type: "number",
      default: "4",
      desc: {
        en: "Number of visible text rows.",
        ar: "عدد الأسطر النصية الظاهرة.",
      },
    },
    {
      name: "style",
      type: "React.CSSProperties",
      desc: {
        en: "Inline styles applied to the textarea element itself.",
        ar: "أنماط مضمّنة تُطبَّق على عنصر الحقل نفسه.",
      },
    },
    {
      name: "wrapperStyle",
      type: "React.CSSProperties",
      desc: {
        en: "Inline styles applied to the outer wrapper that holds the label, field, and message.",
        ar: "أنماط مضمّنة تُطبَّق على الغلاف الخارجي الذي يحوي العنوان والحقل والرسالة.",
      },
    },
  ],
  code: `import { Textarea } from "@backdoor_est/etkan-ui-react";

export function DeliveryNote() {
  return (
    <Textarea
      label="ملاحظات التوصيل"
      placeholder="مثال: الحي، أقرب معلم، ووقت التسليم المفضّل في الرياض"
      helperText="اذكر أي تفاصيل تساعد المندوب على الوصول إليك."
      rows={5}
    />
  );
}`,
};

export default doc;
