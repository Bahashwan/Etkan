import { describe, expect, it } from "vitest";

import { formatSAR, formatHijri, toArabicDigits } from "./format";

describe("formatSAR", () => {
  it("never emits a dollar sign and always references SAR", () => {
    const out = formatSAR(1250.5, { locale: "en-SA", display: "code" });
    expect(out).not.toContain("$");
    expect(out).toContain("SAR");
    expect(out).toContain("1,250.50");
  });

  it("omits the currency mark when display is 'none'", () => {
    const out = formatSAR(1000, { locale: "en-SA", display: "none" });
    expect(out).toBe("1,000.00");
  });

  it("respects fraction-digit options", () => {
    expect(
      formatSAR(1000, {
        locale: "en-SA",
        display: "none",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }),
    ).toBe("1,000");
  });

  it("produces an Arabic-locale string that contains no dollar sign", () => {
    expect(formatSAR(42)).not.toContain("$");
  });
});

describe("toArabicDigits", () => {
  it("maps ASCII digits to Arabic-Indic digits", () => {
    expect(toArabicDigits("2024")).toBe("٢٠٢٤");
    expect(toArabicDigits(1966)).toBe("١٩٦٦");
  });

  it("leaves non-digit characters untouched", () => {
    expect(toArabicDigits("+966 50")).toBe("+٩٦٦ ٥٠");
  });
});

describe("formatHijri", () => {
  it("formats a known Gregorian date on the Umm al-Qura calendar", () => {
    // 2024-01-01 falls in Jumada al-Thani 1445 AH.
    const out = formatHijri(new Date("2024-01-01T12:00:00Z"), { locale: "en-SA" });
    expect(out).toContain("1445");
  });
});
