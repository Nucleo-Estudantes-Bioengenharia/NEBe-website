"use client";

import { MotionConfig } from "motion/react";
import { ThemeProvider } from "next-themes";
import { useEffect, type ReactNode } from "react";
import { I18nextProvider } from "react-i18next";

import i18n, { isLanguage, languageStorageKey } from "@/i18n";

/** Aplica a língua guardada pelo visitante (se existir) depois da hidratação. */
function LanguageSync() {
  useEffect(() => {
    const syncHtmlLang = (lng: string) => {
      document.documentElement.lang = lng === "en" ? "en" : "pt-PT";
    };
    i18n.on("languageChanged", syncHtmlLang);

    try {
      const stored = window.localStorage.getItem(languageStorageKey);
      if (isLanguage(stored) && stored !== i18n.language) {
        void i18n.changeLanguage(stored);
      }
    } catch {
      // localStorage indisponível (ex.: modo privado): mantém português.
    }

    return () => {
      i18n.off("languageChanged", syncHtmlLang);
    };
  }, []);

  return null;
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <I18nextProvider i18n={i18n}>
        <LanguageSync />
        {/* Respeita a preferência do sistema por menos animações. */}
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
      </I18nextProvider>
    </ThemeProvider>
  );
}
