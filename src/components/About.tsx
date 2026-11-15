"use client";

import {
  ArrowUpRight,
  CalendarDays,
  Clock,
  GraduationCap,
  MapPin,
} from "lucide-react";
import { useTranslation } from "react-i18next";

import { pillars, siteConfig } from "@/config/site";

import { SectionHeading } from "./SectionHeading";

export function About() {
  const { t } = useTranslation();

  const facts = [
    {
      icon: CalendarDays,
      label: t("about.course.since"),
      value: t("about.course.sinceValue"),
    },
    {
      icon: Clock,
      label: t("about.course.duration"),
      value: t("about.course.durationValue"),
    },
    {
      icon: GraduationCap,
      label: t("about.course.credits"),
      value: t("about.course.creditsValue"),
    },
    {
      icon: MapPin,
      label: t("about.course.campus"),
      value: t("about.course.campusValue"),
    },
  ];

  return (
    <section
      id="sobre"
      aria-labelledby="sobre-title"
      className="py-20 sm:py-28"
    >
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[7fr_5fr] lg:gap-16 lg:px-8">
        <div>
          <SectionHeading
            id="sobre-title"
            eyebrow={t("about.eyebrow")}
            title={t("about.title")}
          />
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-text">
            <p>{t("about.p1")}</p>
            <p>{t("about.p2")}</p>
          </div>

          <h3 className="mt-12 text-xl font-semibold text-ink">
            {t("about.pillarsTitle")}
          </h3>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {pillars.map(({ key, icon: Icon }) => (
              <li
                key={key}
                className="flex gap-4 rounded-2xl border border-line bg-surface p-5"
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-pill text-primary">
                  <Icon className="size-5" aria-hidden />
                </span>
                <div>
                  <p className="font-semibold text-ink">
                    {t(`about.pillars.${key}.title`)}
                  </p>
                  <p className="mt-1 text-sm text-muted">
                    {t(`about.pillars.${key}.text`)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <aside className="relative self-start overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-accent p-8 text-white shadow-xl shadow-[rgb(10_71_168/0.25)] lg:sticky lg:top-28 dark:from-[#0d3a7a] dark:to-[#0b6f95]">
          <div
            className="azulejo pointer-events-none absolute inset-0 opacity-20"
            aria-hidden
          />
          <div className="relative">
            <h3 className="text-2xl font-bold">{t("about.course.title")}</h3>
            <p className="mt-1 text-white/80">{t("about.course.subtitle")}</p>
            <dl className="mt-8 grid grid-cols-2 gap-4">
              {facts.map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="rounded-2xl bg-white/12 p-4 backdrop-blur-sm"
                >
                  <Icon className="size-5 text-white/80" aria-hidden />
                  <dt className="mt-3 text-xs tracking-wide text-white/75 uppercase">
                    {label}
                  </dt>
                  <dd className="mt-0.5 text-lg font-semibold">{value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 text-sm leading-relaxed text-white/85">
              {t("about.course.note")}
            </p>
            <a
              href={siteConfig.courseUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 font-semibold text-primary transition-transform hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:outline-none dark:text-[#0a47a8]"
            >
              {t("about.course.link")}
              <ArrowUpRight className="size-4" aria-hidden />
            </a>
          </div>
        </aside>
      </div>
    </section>
  );
}
