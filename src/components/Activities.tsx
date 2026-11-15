"use client";

import { useTranslation } from "react-i18next";

import { activities } from "@/config/site";

import { SectionHeading } from "./SectionHeading";

export function Activities() {
  const { t } = useTranslation();

  return (
    <section
      id="atividades"
      aria-labelledby="atividades-title"
      className="bg-surface-soft py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="atividades-title"
          eyebrow={t("activities.eyebrow")}
          title={t("activities.title")}
          intro={t("activities.intro")}
        />
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {activities.map(({ key, icon: Icon }, i) => (
            <li
              key={key}
              className="group relative overflow-hidden rounded-3xl border border-line bg-surface p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[rgb(10_71_168/0.12)]"
            >
              <span
                className="absolute -top-2 right-4 text-7xl font-bold text-pill select-none"
                aria-hidden
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="relative grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-mint to-accent text-on-primary shadow-md">
                <Icon className="size-6" aria-hidden />
              </span>
              <h3 className="relative mt-6 text-xl font-semibold text-ink">
                {t(`activities.items.${key}.title`)}
              </h3>
              <p className="relative mt-2 leading-relaxed text-muted">
                {t(`activities.items.${key}.text`)}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
