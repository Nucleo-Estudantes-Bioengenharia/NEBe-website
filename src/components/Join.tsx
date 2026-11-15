"use client";

import { CheckCircle2, Mail, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";

import { joinSectionId, siteConfig } from "@/config/site";

import { InstagramIcon, LinkedinIcon } from "./SocialIcons";

const benefits = ["events", "network", "skills", "community"] as const;

export function Join() {
  const { t } = useTranslation();

  return (
    <section
      id={joinSectionId}
      aria-labelledby="junta-te-title"
      className="py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="azulejo relative overflow-hidden rounded-[2rem] border border-line bg-hero p-8 sm:p-12 lg:p-16">
          <div className="grid gap-12 lg:grid-cols-[3fr_2fr] lg:items-center">
            <div>
              <p className="text-sm font-bold tracking-widest text-accent uppercase">
                {t("join.eyebrow")}
              </p>
              <h2
                id="junta-te-title"
                className="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-5xl"
              >
                {t("join.title")}
              </h2>
              <p className="mt-5 max-w-xl text-lg text-text">
                {t("join.text")}
              </p>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {benefits.map((key) => (
                  <li key={key} className="flex items-start gap-2.5 text-ink">
                    <CheckCircle2
                      className="mt-0.5 size-5 shrink-0 text-mint"
                      aria-hidden
                    />
                    {t(`join.benefits.${key}`)}
                  </li>
                ))}
              </ul>
              <div className="mt-10 flex flex-wrap gap-3">
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-white shadow-lg transition-transform hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:outline-none dark:text-[#061327]"
                >
                  <Mail className="size-5" aria-hidden />
                  {t("join.ctaEmail")}
                </a>
                <a
                  href={siteConfig.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-surface/80 px-6 py-3 font-medium text-ink transition-colors hover:border-primary focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
                >
                  <InstagramIcon className="size-5" aria-hidden />
                  {t("join.ctaInstagram")}
                </a>
              </div>
            </div>

            <div className="rounded-3xl border border-line bg-surface/95 p-7 shadow-xl shadow-[rgb(10_71_168/0.1)]">
              <h3 className="text-xl font-semibold text-ink">
                {t("join.contactTitle")}
              </h3>
              <dl className="mt-6 space-y-5">
                <div className="flex gap-3">
                  <Mail
                    className="mt-0.5 size-5 shrink-0 text-primary"
                    aria-hidden
                  />
                  <div className="min-w-0">
                    <dt className="text-sm text-muted">
                      {t("join.emailLabel")}
                    </dt>
                    <dd className="font-medium break-all text-ink">
                      {siteConfig.email}
                    </dd>
                  </div>
                </div>
                <div className="flex gap-3">
                  <MapPin
                    className="mt-0.5 size-5 shrink-0 text-primary"
                    aria-hidden
                  />
                  <div>
                    <dt className="text-sm text-muted">
                      {t("join.addressLabel")}
                    </dt>
                    <dd>
                      <a
                        href={siteConfig.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-ink underline-offset-4 hover:text-primary hover:underline"
                      >
                        {t("join.address")}
                      </a>
                    </dd>
                  </div>
                </div>
                <div>
                  <dt className="text-sm text-muted">
                    {t("join.socialLabel")}
                  </dt>
                  <dd className="mt-2 flex gap-2">
                    <a
                      href={siteConfig.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                      className="grid size-11 place-items-center rounded-full bg-pill text-primary transition-colors hover:bg-primary hover:text-white dark:hover:text-[#061327]"
                    >
                      <InstagramIcon className="size-5" aria-hidden />
                    </a>
                    <a
                      href={siteConfig.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                      className="grid size-11 place-items-center rounded-full bg-pill text-primary transition-colors hover:bg-primary hover:text-white dark:hover:text-[#061327]"
                    >
                      <LinkedinIcon className="size-5" aria-hidden />
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
