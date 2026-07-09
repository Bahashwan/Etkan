import { css } from "lit";

/**
 * Base styles every ETKAN element shares. Design tokens (CSS custom properties)
 * pierce the shadow DOM, so components read `var(--brand-primary)` etc. as long
 * as the consumer loads `@backdoor_est/etkan-ui-tokens` on the document. All
 * layout uses logical properties, so `dir="rtl"` mirrors automatically.
 */
export const base = css`
  :host {
    box-sizing: border-box;
    font-family: var(--font-sans);
    color: var(--text-body);
  }
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
`;

/** Sizing map shared by control-height components. */
export const controlHeight = {
  sm: "var(--control-height-sm)",
  md: "var(--control-height-md)",
  lg: "var(--control-height-lg)",
} as const;
