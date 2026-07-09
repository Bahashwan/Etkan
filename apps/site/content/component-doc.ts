/** Bilingual documentation metadata for one component. */
export interface Bi {
  en: string;
  ar: string;
}

export interface PropDoc {
  name: string;
  type: string;
  required?: boolean;
  default?: string;
  desc: Bi;
}

export interface ComponentDoc {
  slug: string;
  /** React export name, e.g. "Button". */
  name: string;
  /** Web-component tag if one exists, e.g. "etkan-button". */
  tag?: string;
  group: "Forms" | "Data" | "Feedback" | "Navigation" | "Saudi";
  /** One-line summary. */
  title: Bi;
  /** A short paragraph describing the component. */
  description: Bi;
  /** When to reach for it. */
  when: Bi;
  /** How it behaves / animates, plus any RTL notes. */
  behavior: Bi;
  props: PropDoc[];
  /** A copy-paste React usage snippet. */
  code: string;
}
