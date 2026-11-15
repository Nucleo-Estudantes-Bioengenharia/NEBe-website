"use client";

import { ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";

import { resources } from "@/config/site";

import { SectionHeading } from "./SectionHeading";
import { ExternalLink } from "./ExternalLink";

export function Resources() {
  const { t } = useTranslation();

  return (
    <section
      id="recursos"
      aria-labelledby="recursos-title"
      className="bg-surface-soft py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="recursos-title"
          eyebrow={t("resources.eyebrow")}
          title={t("resources.title")}
          intro={t("resources.intro")}
        />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {resources.map(({ key, icon: Icon, href }) => (
            <li key={key}>
              <ExternalLink
                href={href}
                className="group flex h-full gap-4 rounded-3xl border border-line bg-surface p-6 transition-all hover:border-accent hover:shadow-lg focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
              >
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-pill text-primary">
                  <Icon className="size-6" aria-hidden />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center justify-between gap-2 font-semibold text-ink">
                    {t(`resources.items.${key}.title`)}
                    <ArrowUpRight
                      className="size-5 shrink-0 text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                      aria-hidden
                    />
                  </span>
                  <span className="mt-1 block text-sm leading-relaxed text-muted">
                    {t(`resources.items.${key}.text`)}
                  </span>
                </span>
              </ExternalLink>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
