"use client";

import { Languages } from "lucide-react";
import { useTranslation } from "react-i18next";

import { languageStorageKey, type Language } from "@/i18n";

export function LanguageSwitcher() {
  const { t, i18n } = useTranslation();
  const next: Language = i18n.language === "en" ? "pt" : "en";

  const change = () => {
    void i18n.changeLanguage(next);
    try {
      window.localStorage.setItem(languageStorageKey, next);
    } catch {
      // Sem localStorage a escolha vale só para esta visita.
    }
  };

  return (
    <button
      type="button"
      onClick={change}
      aria-label={t("language.switchTo")}
      title={t("language.switchTo")}
      className="inline-flex h-10 items-center gap-1.5 rounded-full px-3 text-sm font-semibold text-ink transition-colors hover:bg-pill focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
    >
      <Languages className="size-4" aria-hidden />
      <span lang={next}>{t("language.short")}</span>
    </button>
  );
}
