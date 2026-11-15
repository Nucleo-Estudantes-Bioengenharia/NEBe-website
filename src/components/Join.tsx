"use client";

import {
  CheckCircle2,
  Dna,
  FlaskConical,
  HeartPulse,
  Mail,
  MapPin,
  Microscope,
} from "lucide-react";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";

import { joinSectionId, siteConfig } from "@/config/site";

import { ExternalLink } from "./ExternalLink";
import { easeOut, Reveal, StaggerItem, StaggerList } from "./motion";
import { InstagramIcon, LinkedinIcon } from "./SocialIcons";

const benefits = ["events", "network", "skills", "community"] as const;

/** Ícones decorativos que flutuam no fundo do cartão. */
const floaters = [
  { Icon: Dna, className: "top-8 right-[8%] size-14", delay: "0s" },
  {
    Icon: FlaskConical,
    className: "bottom-10 right-[38%] size-10",
    delay: "-2s",
  },
  { Icon: HeartPulse, className: "top-[45%] left-[46%] size-9", delay: "-4s" },
  { Icon: Microscope, className: "bottom-8 left-[6%] size-12", delay: "-1s" },
];

export function Join() {
  const { t } = useTranslation();

  const socialClass =
    "bg-pill text-primary hover:bg-primary hover:text-on-primary grid size-11 place-items-center rounded-full transition-all duration-300 hover:-translate-y-1";

  return (
    <section
      id={joinSectionId}
      aria-labelledby="junta-te-title"
      className="py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.9, ease: easeOut }}
          className="relative overflow-hidden rounded-[2rem] p-[2px] shadow-2xl shadow-[rgb(10_71_168/0.2)]"
        >
          {/* Borda em gradiente a rodar. */}
          <span
            className="absolute top-1/2 left-1/2 aspect-square w-[250%] -translate-x-1/2 -translate-y-1/2 animate-spin-slow bg-[conic-gradient(from_0deg,var(--mint),var(--accent),var(--primary),transparent_60%,var(--mint))]"
            aria-hidden
          />
          <div className="relative overflow-hidden rounded-[calc(2rem-2px)] bg-hero p-6 sm:p-12 lg:p-16">
            <div
              className="azulejo absolute inset-0 animate-drift opacity-70"
              aria-hidden
            />
            {floaters.map(({ Icon, className, delay }, i) => (
              <Icon
                key={i}
                className={`pointer-events-none absolute hidden animate-float text-primary/15 md:block ${className}`}
                style={{ animationDelay: delay }}
                aria-hidden
              />
            ))}

            <div className="relative grid gap-10 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:items-center lg:gap-12">
              <div>
                <Reveal>
                  <p className="text-sm font-bold tracking-[0.2em] text-accent uppercase">
                    {t("join.eyebrow")}
                  </p>
                  <h2
                    id="junta-te-title"
                    className="mt-3 text-4xl font-bold tracking-tight text-balance text-ink sm:text-5xl lg:text-6xl"
                  >
                    {t("join.title")}
                  </h2>
                  <p className="mt-5 max-w-xl text-lg text-pretty text-text">
                    {t("join.text")}
                  </p>
                </Reveal>
                <StaggerList className="mt-8 grid gap-3 sm:grid-cols-2">
                  {benefits.map((key) => (
                    <StaggerItem
                      key={key}
                      className="flex items-start gap-2.5 text-ink"
                    >
                      <CheckCircle2
                        className="mt-0.5 size-5 shrink-0 text-mint"
                        aria-hidden
                      />
                      {t(`join.benefits.${key}`)}
                    </StaggerItem>
                  ))}
                </StaggerList>
                <Reveal
                  className="mt-10 flex flex-col gap-3 min-[420px]:flex-row min-[420px]:flex-wrap"
                  delay={0.2}
                >
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="group shine inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 font-semibold text-on-primary shadow-lg transition-transform hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:outline-none"
                  >
                    <Mail
                      className="size-5 transition-transform group-hover:-rotate-12"
                      aria-hidden
                    />
                    {t("join.ctaEmail")}
                  </a>
                  <ExternalLink
                    href={siteConfig.instagram}
                    className="group inline-flex items-center justify-center gap-2 rounded-full border border-primary/30 bg-surface/80 px-6 py-3.5 font-medium text-ink backdrop-blur transition-all hover:-translate-y-1 hover:border-primary focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
                  >
                    <InstagramIcon
                      className="size-5 transition-transform group-hover:scale-110"
                      aria-hidden
                    />
                    {t("join.ctaInstagram")}
                  </ExternalLink>
                </Reveal>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: easeOut, delay: 0.25 }}
                className="rounded-3xl border border-line bg-surface/90 p-6 shadow-xl shadow-[rgb(10_71_168/0.1)] backdrop-blur-md sm:p-7"
              >
                <h3 className="text-xl font-semibold text-ink">
                  {t("join.contactTitle")}
                </h3>
                <dl className="mt-6 space-y-5">
                  <div className="flex gap-3">
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-pill text-primary">
                      <Mail className="size-5" aria-hidden />
                    </span>
                    <div className="min-w-0">
                      <dt className="text-sm text-muted">
                        {t("join.emailLabel")}
                      </dt>
                      <dd>
                        <a
                          href={`mailto:${siteConfig.email}`}
                          className="font-medium break-all text-ink underline-offset-4 hover:text-primary hover:underline"
                        >
                          {siteConfig.email}
                        </a>
                      </dd>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-pill text-primary">
                      <MapPin className="size-5" aria-hidden />
                    </span>
                    <div>
                      <dt className="text-sm text-muted">
                        {t("join.addressLabel")}
                      </dt>
                      <dd>
                        <ExternalLink
                          href={siteConfig.mapsUrl}
                          className="font-medium text-ink underline-offset-4 hover:text-primary hover:underline"
                        >
                          {t("join.address")}
                        </ExternalLink>
                      </dd>
                    </div>
                  </div>
                  <div>
                    <dt className="text-sm text-muted">
                      {t("join.socialLabel")}
                    </dt>
                    <dd className="mt-2 flex gap-2">
                      <ExternalLink
                        href={siteConfig.instagram}
                        className={socialClass}
                      >
                        <InstagramIcon className="size-5" aria-hidden />
                        <span className="sr-only">Instagram</span>
                      </ExternalLink>
                      <ExternalLink
                        href={siteConfig.linkedin}
                        className={socialClass}
                      >
                        <LinkedinIcon className="size-5" aria-hidden />
                        <span className="sr-only">LinkedIn</span>
                      </ExternalLink>
                    </dd>
                  </div>
                </dl>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
