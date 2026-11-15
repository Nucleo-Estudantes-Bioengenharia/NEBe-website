"use client";

import { Clock, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";

import { events } from "@/config/site";

import { SectionHeading } from "./SectionHeading";

/** Converte "AAAA-MM-DD" numa data local sem desvios de fuso horário. */
function parseDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d, 12));
}

export function Agenda() {
  const { t, i18n } = useTranslation();
  const locale = i18n.language === "en" ? "en-GB" : "pt-PT";
  const fmt = (iso: string, opts: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat(locale, { timeZone: "UTC", ...opts }).format(
      parseDate(iso),
    );

  return (
    <section
      id="agenda"
      aria-labelledby="agenda-title"
      className="py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="agenda-title"
          eyebrow={t("agenda.eyebrow")}
          title={t("agenda.title")}
          intro={t("agenda.intro")}
        />

        <ol className="mt-12 grid gap-4 md:grid-cols-2">
          {events.map((event) => {
            const end = "end" in event ? event.end : undefined;
            const time = "time" in event ? event.time : undefined;
            return (
              <li
                key={event.key}
                className="flex gap-5 rounded-3xl border border-line bg-surface p-5 transition-colors hover:border-accent sm:p-6"
              >
                <time
                  dateTime={event.start}
                  className="flex w-20 shrink-0 flex-col items-center justify-center rounded-2xl bg-gradient-to-b from-primary to-accent py-3 text-white dark:text-[#061327]"
                >
                  <span className="text-3xl leading-none font-bold">
                    {fmt(event.start, { day: "2-digit" })}
                    {end && (
                      <span className="text-lg">
                        –{fmt(end, { day: "2-digit" })}
                      </span>
                    )}
                  </span>
                  <span className="mt-1 text-xs font-semibold tracking-wider uppercase">
                    {fmt(event.start, { month: "short" }).replace(".", "")}
                  </span>
                  <span className="text-[11px] opacity-80">
                    {fmt(event.start, { year: "numeric" })}
                  </span>
                </time>
                <div className="min-w-0 py-1">
                  <span className="inline-block rounded-full bg-pill px-3 py-0.5 text-xs font-semibold text-primary">
                    {t(`agenda.types.${event.type}`)}
                  </span>
                  <h3 className="mt-2 text-lg leading-snug font-semibold text-ink">
                    {t(`agenda.events.${event.key}.title`)}
                  </h3>
                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted">
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="size-4 shrink-0" aria-hidden />
                      {t(`agenda.events.${event.key}.location`)}
                    </span>
                    {time && (
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="size-4 shrink-0" aria-hidden />
                        {time}
                      </span>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
        <p className="mt-6 text-sm text-muted italic">{t("agenda.note")}</p>
      </div>
    </section>
  );
}
