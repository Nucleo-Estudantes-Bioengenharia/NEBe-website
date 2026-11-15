"use client";

import {
  ArrowUpRight,
  CalendarDays,
  Clock,
  GraduationCap,
  MapPin,
} from "lucide-react";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";

import { pillars, siteConfig } from "@/config/site";

import { ExternalLink } from "./ExternalLink";
import {
  CountUp,
  easeOut,
  Reveal,
  StaggerItem,
  StaggerList,
  trackSpotlight,
} from "./motion";
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
      className="relative py-20 sm:py-28"
    >
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16 lg:px-8">
        <div>
          <SectionHeading
            id="sobre-title"
            eyebrow={t("about.eyebrow")}
            title={t("about.title")}
          />
          <Reveal
            className="mt-6 space-y-4 text-lg leading-relaxed text-pretty text-text"
            delay={0.1}
          >
            <p>{t("about.p1")}</p>
            <p>{t("about.p2")}</p>
          </Reveal>

          <Reveal>
            <h3 className="mt-12 text-xl font-semibold text-ink">
              {t("about.pillarsTitle")}
            </h3>
          </Reveal>
          <StaggerList className="mt-6 grid gap-4 sm:grid-cols-2">
            {pillars.map(({ key, icon: Icon }) => (
              <StaggerItem key={key}>
                <div
                  onMouseMove={trackSpotlight}
                  className="group spotlight flex h-full gap-4 rounded-2xl border border-line bg-surface p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent/60 hover:shadow-lg hover:shadow-[rgb(10_71_168/0.1)]"
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-pill text-primary transition-all duration-300 group-hover:rotate-[-8deg] group-hover:bg-primary group-hover:text-on-primary">
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
                </div>
              </StaggerItem>
            ))}
          </StaggerList>
        </div>

        <motion.aside
          initial={{ opacity: 0, x: 40, rotate: 2 }}
          whileInView={{ opacity: 1, x: 0, rotate: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: easeOut }}
          className="self-start lg:sticky lg:top-28"
        >
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-accent p-6 text-white shadow-2xl shadow-[rgb(10_71_168/0.3)] sm:p-8 dark:from-[#0d3a7a] dark:to-[#0b6f95]">
            <div
              className="azulejo pointer-events-none absolute inset-0 animate-drift opacity-20"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -top-16 -right-16 size-56 animate-blob rounded-full bg-mint/40 blur-3xl"
              aria-hidden
            />
            <div className="relative">
              <h3 className="text-2xl font-bold">{t("about.course.title")}</h3>
              <p className="mt-1 text-white/80">{t("about.course.subtitle")}</p>
              <dl className="mt-8 grid grid-cols-2 gap-3 sm:gap-4">
                {facts.map(({ icon: Icon, label, value }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: 0.3 + i * 0.1,
                      type: "spring",
                      stiffness: 200,
                      damping: 18,
                    }}
                    className="rounded-2xl bg-white/12 p-4 ring-1 ring-white/15 backdrop-blur-sm transition-colors hover:bg-white/20"
                  >
                    <Icon className="size-5 text-white/80" aria-hidden />
                    <dt className="mt-3 text-xs tracking-wide text-white/75 uppercase">
                      {label}
                    </dt>
                    <dd className="mt-0.5 text-base font-semibold sm:text-lg">
                      <CountUp value={value} />
                    </dd>
                  </motion.div>
                ))}
              </dl>
              <p className="mt-6 text-sm leading-relaxed text-white/85">
                {t("about.course.note")}
              </p>
              <ExternalLink
                href={siteConfig.courseUrl}
                className="group shine mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 font-semibold text-[#0a47a8] transition-transform hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:outline-none"
              >
                {t("about.course.link")}
                <ArrowUpRight
                  className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden
                />
              </ExternalLink>
            </div>
          </div>
        </motion.aside>
      </div>
    </section>
  );
}
