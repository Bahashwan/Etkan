/**
 * Saudi-first formatting helpers. Zero dependencies — built on the platform
 * `Intl` APIs so the package stays dependency-free.
 */

export interface FormatSAROptions {
  /** Locale to format in. Default "ar-SA". Use "en-SA" for Latin digits + "SAR". */
  locale?: "ar-SA" | "en-SA" | (string & {});
  /** Minimum fraction digits. Default 2. */
  minimumFractionDigits?: number;
  /** Maximum fraction digits. Default 2. */
  maximumFractionDigits?: number;
  /**
   * How to show the currency. "symbol" uses the locale's SAR symbol,
   * "code" shows "SAR", "none" omits the mark entirely. Default "symbol".
   */
  display?: "symbol" | "code" | "none";
}

/**
 * Format a number as Saudi Riyal. Never emits a dollar sign.
 *
 * @example formatSAR(1250.5)              // "١٬٢٥٠٫٥٠ ر.س.‏" (ar-SA)
 * @example formatSAR(1250.5, { locale: "en-SA" }) // "SAR 1,250.50"
 */
export function formatSAR(amount: number, options: FormatSAROptions = {}): string {
  const {
    locale = "ar-SA",
    minimumFractionDigits = 2,
    maximumFractionDigits = 2,
    display = "symbol",
  } = options;

  if (display === "none") {
    return new Intl.NumberFormat(locale, {
      minimumFractionDigits,
      maximumFractionDigits,
    }).format(amount);
  }

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "SAR",
    currencyDisplay: display === "code" ? "code" : "symbol",
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(amount);
}

const ARABIC_INDIC = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"] as const;

/** Convert the ASCII digits in a string to Arabic-Indic digits (٠١٢٣…). */
export function toArabicDigits(input: string | number): string {
  return String(input).replace(/[0-9]/g, (d) => ARABIC_INDIC[Number(d)]!);
}

export interface FormatHijriOptions {
  /** Locale. Default "ar-SA". */
  locale?: "ar-SA" | "en-SA" | (string & {});
  /** Date style passed to Intl.DateTimeFormat. Default "long". */
  dateStyle?: "full" | "long" | "medium" | "short";
}

/**
 * Format a date on the Umm al-Qura (Islamic) calendar used in Saudi Arabia.
 *
 * @example formatHijri(new Date()) // "٢٤ محرم ١٤٤٧ هـ"
 */
export function formatHijri(date: Date, options: FormatHijriOptions = {}): string {
  const { locale = "ar-SA", dateStyle = "long" } = options;
  return new Intl.DateTimeFormat(`${locale}-u-ca-islamic-umalqura`, { dateStyle }).format(date);
}
