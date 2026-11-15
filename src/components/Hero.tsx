"use client";

import { ArrowRight, ChevronDown } from "lucide-react";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";

import { joinSectionId } from "@/config/site";

import { BioDiagram } from "./BioDiagram";
import { easeOut } from "./motion";

const line = {
  hidden: { y: "110%" },
  show: (i: number) => ({
    y: 0,
    transition: { duration: 0.9, ease: easeOut, delay: 0.2 + i * 0.12 },
  }),
};

const fade = {
  hidden: { opacity: 0, y: 20 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOut, delay },
  }),
};

export function Hero() {
  const { t } = useTranslation();
  const lines = [
    { text: t("hero.line1"), className: "" },
    { text: t("hero.line2"), className: "" },
    {
      text: t("hero.line3"),
      className: "text-gradient animate-shimmer pb-[0.1em]",
    },
  ];

  return (
    <section id="inicio" className="relative isolate overflow-hidden bg-hero">
      {/* Fundo: azulejos em movimento lento e manchas de cor a flutuar. */}
      <div
        className="azulejo absolute inset-0 -z-10 animate-drift opacity-80"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="absolute -top-24 -left-24 size-80 animate-blob rounded-full bg-mint/30 blur-3xl sm:size-[28rem]" />
        <div className="absolute top-1/3 -right-32 size-96 animate-blob rounded-full bg-accent/30 blur-3xl [animation-delay:-6s] sm:size-[32rem]" />
        <div className="absolute -bottom-32 left-1/3 size-80 animate-blob rounded-full bg-primary/20 blur-3xl [animation-delay:-12s]" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pt-28 pb-10 sm:px-6 sm:pt-32 lg:px-8 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] xl:gap-6 xl:pt-36 xl:pb-16">
        {/* @container: o título usa unidades cqw para caber sempre na largura do bloco. */}
        <div className="@container mx-auto w-full max-w-2xl text-center xl:mx-0 xl:text-left">
          <h1 className="text-[clamp(2rem,12cqw,4.75rem)] leading-[1.08] font-bold tracking-tight text-ink">
            {lines.map(({ text, className }, i) => (
              <span key={i} className="block overflow-hidden">
                <motion.span
                  className={`block whitespace-nowrap ${className}`}
                  initial="hidden"
                  animate="show"
                  custom={i}
                  variants={line}
                >
                  {text}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial="hidden"
            animate="show"
            custom={0.6}
            variants={fade}
            className="mx-auto mt-6 max-w-md text-lg font-light text-balance text-ink/90 sm:text-xl xl:mx-0"
          >
            {t("hero.subtitle")}
          </motion.p>

          <motion.div
            initial="hidden"
            animate="show"
            custom={0.75}
            variants={fade}
            className="mt-8 flex flex-col justify-center gap-3 min-[420px]:flex-row xl:justify-start"
          >
            <a
              href={`#${joinSectionId}`}
              className="group shine inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 font-semibold text-on-primary shadow-xl shadow-[rgb(10_71_168/0.3)] transition-transform hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              {t("hero.ctaPrimary")}
              <ArrowRight
                className="size-4 transition-transform group-hover:translate-x-1"
                aria-hidden
              />
            </a>
            <a
              href="#sobre"
              className="inline-flex items-center justify-center rounded-full border border-primary/30 bg-surface/70 px-7 py-3.5 font-medium text-ink backdrop-blur transition-all hover:-translate-y-1 hover:border-primary hover:bg-surface focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
            >
              {t("hero.ctaSecondary")}
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: easeOut, delay: 0.3 }}
        >
          <BioDiagram />
        </motion.div>
      </div>

      <div className="relative pb-8">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, ease: easeOut, delay: 0.8 }}
          className="h-1 w-[min(36rem,70%)] origin-left rounded-r-full bg-gradient-to-r from-white/90 to-white/40 dark:from-white/25 dark:to-white/5"
        />
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 pt-4 sm:px-6 lg:px-8">
          <p className="text-sm font-bold tracking-[0.2em] text-ink uppercase sm:text-base">
            {t("hero.tagline")}
          </p>
          <a
            href="#sobre"
            aria-label={t("hero.scroll")}
            className="hidden size-11 place-items-center rounded-full border border-primary/30 text-primary transition-colors hover:bg-surface/70 md:grid"
          >
            <ChevronDown className="size-5 animate-bounce-soft" aria-hidden />
          </a>
        </div>
      </div>
    </section>
  );
}
