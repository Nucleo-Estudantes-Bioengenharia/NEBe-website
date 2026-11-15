"use client";

import { useTranslation } from "react-i18next";

import { activities } from "@/config/site";

import { StaggerItem, StaggerList, trackSpotlight } from "./motion";
import { SectionHeading } from "./SectionHeading";

export function Activities() {
  const { t } = useTranslation();

  return (
    <section
      id="atividades"
      aria-labelledby="atividades-title"
      className="relative overflow-hidden bg-surface-soft py-20 sm:py-28"
    >
      <div
        className="pointer-events-none absolute -top-40 right-0 size-[30rem] animate-blob rounded-full bg-accent/10 blur-3xl"
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="atividades-title"
          eyebrow={t("activities.eyebrow")}
          title={t("activities.title")}
          intro={t("activities.intro")}
        />
        <StaggerList className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {activities.map(({ key, icon: Icon }, i) => (
            <StaggerItem key={key}>
              <article
                onMouseMove={trackSpotlight}
                className="group spotlight relative h-full overflow-hidden rounded-3xl border border-line bg-surface p-6 transition-all duration-500 hover:-translate-y-2 hover:border-accent/60 hover:shadow-2xl hover:shadow-[rgb(10_71_168/0.15)] sm:p-7"
              >
                <span
                  className="absolute -top-3 right-4 text-7xl font-bold text-pill transition-all duration-500 select-none group-hover:-translate-y-1 group-hover:text-accent/25"
                  aria-hidden
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="relative grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-mint to-accent text-on-primary shadow-md transition-transform duration-500 group-hover:scale-110 group-hover:rotate-[-10deg]">
                  <Icon className="size-6" aria-hidden />
                </span>
                <h3 className="relative mt-6 text-xl font-semibold text-ink">
                  {t(`activities.items.${key}.title`)}
                </h3>
                <p className="relative mt-2 leading-relaxed text-muted">
                  {t(`activities.items.${key}.text`)}
                </p>
                <span
                  className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-mint via-accent to-primary transition-transform duration-500 group-hover:scale-x-100"
                  aria-hidden
                />
              </article>
            </StaggerItem>
          ))}
        </StaggerList>
      </div>
    </section>
  );
}
