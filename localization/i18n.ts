/**
 * i18next configuration for ResQ PH.
 * Initialized synchronously at import time so `useTranslation()` always has
 * a ready instance on first render. This file must be imported somewhere
 * early in the app (app/index.tsx) so the side-effecting init() below runs
 * before any screen tries to use translations.
 */
import "intl-pluralrules"; // Hermes lacks Intl.PluralRules — must be first import
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "../translation/en.json";
import tl from "../translation/tl.json";
import ceb from "../translation/ceb.json";
import type { LanguageCode } from "../types/i18n";

const resources = {
  en: { translation: en },
  tl: { translation: tl },
  ceb: { translation: ceb },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  compatibilityJSON: "v4",
  interpolation: {
    escapeValue: false,
  },
});

/**
 * Switches i18next to the user's persisted language after hydration.
 * Called from the splash screen once useAppStore.hydrate() resolves,
 * and from the language selection screen right after the user picks one.
 */
export async function applyPersistedLanguage(
  language: LanguageCode
): Promise<void> {
  if (i18n.language !== language) {
    await i18n.changeLanguage(language);
  }
}

export default i18n;