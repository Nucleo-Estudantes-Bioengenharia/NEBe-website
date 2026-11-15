"use client";

import { ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";

import { resources } from "@/config/site";

import { ExternalLink } from "./ExternalLink";
import { StaggerItem, StaggerList, trackSpotlight } from "./motion";
import { SectionHeading } from "./SectionHeading";

export function Resources() {
  const { t } = useTranslation();

  return (
    <section
      id="recursos"
      aria-labelledby="recursos-title"
      className="py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="recursos-title"
          eyebrow={t("resources.eyebrow")}
          title={t("resources.title")}
          intro={t("resources.intro")}
        />
        <StaggerList className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {resources.map(({ key, icon: Icon, href }) => (
            <StaggerItem key={key}>
              <ExternalLink
                href={href}
                onMouseMove={trackSpotlight}
                className="group spotlight flex h-full gap-4 rounded-3xl border border-line bg-surface p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-xl hover:shadow-[rgb(10_71_168/0.12)] focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none sm:p-6"
              >
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-pill text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-on-primary">
                  <Icon className="size-6" aria-hidden />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center justify-between gap-2 font-semibold text-ink">
                    {t(`resources.items.${key}.title`)}
                    <ArrowUpRight
                      className="size-5 shrink-0 text-muted transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent"
                      aria-hidden
                    />
                  </span>
                  <span className="mt-1 block text-sm leading-relaxed text-pretty text-muted">
                    {t(`resources.items.${key}.text`)}
                  </span>
                </span>
              </ExternalLink>
            </StaggerItem>
          ))}
        </StaggerList>
      </div>
    </section>
  );
}
