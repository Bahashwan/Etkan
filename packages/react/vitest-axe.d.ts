import "vitest";

declare module "vitest" {
  interface Assertion<T = unknown> {
    /** From jest-axe: passes when the axe run found zero accessibility violations. */
    toHaveNoViolations(): T;
  }
}
