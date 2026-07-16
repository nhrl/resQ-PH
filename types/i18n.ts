/**
 * Supported language codes for ResQ PH.
 * Bisaya uses "ceb" (ISO 639-2 code for Cebuano).
 */
export type LanguageCode = "en" | "tl" | "ceb";

export interface LanguageOption {
  code: LanguageCode;
  label: string;
  nativeLabel: string;
  flag: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: "en", label: "English", nativeLabel: "English", flag: "🇺🇸" },
  { code: "tl", label: "Filipino", nativeLabel: "Tagalog", flag: "🇵🇭"},
  { code: "ceb", label: "Bisaya", nativeLabel: "Binisaya", flag: "🇵🇭"},
];