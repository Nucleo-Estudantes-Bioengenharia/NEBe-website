import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import pt from "./locales/pt.json";

export const languages = ["pt", "en"] as const;
export type Language = (typeof languages)[number];

/** Português é a língua por definição. */
export const defaultLanguage: Language = "pt";
export const languageStorageKey = "nebe-lang";

export const resources = {
  pt: { translation: pt },
  en: { translation: en },
} as const;

export function isLanguage(value: unknown): value is Language {
  return languages.includes(value as Language);
}

if (!i18n.isInitialized) {
  void i18n.use(initReactI18next).init({
    resources,
    lng: defaultLanguage,
    fallbackLng: defaultLanguage,
    supportedLngs: languages,
    interpolation: { escapeValue: false },
    initAsync: false,
  });
}

export default i18n;
