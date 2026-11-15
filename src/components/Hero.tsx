"use client";

import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

import { joinSectionId } from "@/config/site";

import { BioDiagram } from "./BioDiagram";

export function Hero() {
  const { t } = useTranslation();

  return (
    <section
      id="inicio"
      className="azulejo relative overflow-hidden bg-hero pt-16 lg:pt-20"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:gap-6 lg:px-8 lg:py-16">
        <div>
          <h1 className="text-5xl leading-[1.08] font-bold tracking-tight text-ink sm:text-6xl lg:text-[3.5rem] xl:text-[4.25rem]">
            <span className="block">{t("hero.line1")}</span>
            <span className="block">{t("hero.line2")}</span>
            <span className="block text-accent">{t("hero.line3")}</span>
          </h1>
          <p className="mt-6 max-w-md text-lg font-light text-ink sm:text-xl">
            {t("hero.subtitle")}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={`#${joinSectionId}`}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-on-primary shadow-lg shadow-[rgb(10_71_168/0.25)] transition-transform hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              {t("hero.ctaPrimary")}
              <ArrowRight className="size-4" aria-hidden />
            </a>
            <a
              href="#sobre"
              className="inline-flex items-center rounded-full border border-primary/40 bg-surface/70 px-6 py-3 font-medium text-ink transition-colors hover:border-primary focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
            >
              {t("hero.ctaSecondary")}
            </a>
          </div>
        </div>

        <BioDiagram />
      </div>

      <div className="pb-6">
        <div className="h-1 w-[min(36rem,70%)] rounded-r-full bg-white/90 dark:bg-white/20" />
        <p className="mx-auto mt-4 max-w-7xl px-4 text-sm font-bold tracking-wide text-ink uppercase sm:px-6 sm:text-base lg:px-8">
          {t("hero.tagline")}
        </p>
      </div>
      <div className="h-6 bg-primary/35" aria-hidden />
    </section>
  );
}
