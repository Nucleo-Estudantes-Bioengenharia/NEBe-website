"use client";

import { ArrowUp } from "lucide-react";
import { useSyncExternalStore } from "react";
import { useTranslation } from "react-i18next";

import { joinSectionId, navSections, siteConfig } from "@/config/site";

import { ExternalLink } from "./ExternalLink";
import { Logo } from "./Logo";
import { Reveal } from "./motion";
import { InstagramIcon, LinkedinIcon } from "./SocialIcons";

const noopSubscribe = () => () => {};

/** Ano atual, lido só no browser (o site é pré-renderizado no build). */
function useCurrentYear() {
  return useSyncExternalStore(
    noopSubscribe,
    () => new Date().getFullYear(),
    () => null,
  );
}

const linkClass =
  "text-muted hover:text-primary inline-flex items-center gap-2 transition-all duration-200 hover:translate-x-1";

export function Footer() {
  const { t } = useTranslation();
  const year = useCurrentYear();

  return (
    <footer id="rodape" className="relative bg-surface">
      <div
        className="h-1 bg-gradient-to-r from-mint via-accent to-primary"
        aria-hidden
      />
      <Reveal className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-10 px-4 py-12 sm:px-6 sm:py-14 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)] lg:px-8">
        <div className="col-span-2 flex flex-col items-center text-center sm:items-start sm:text-left lg:col-span-1">
          <Logo className="h-14 shadow-sm" />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-pretty text-muted">
            {t("footer.description")}
          </p>
        </div>
        <nav
          aria-label={t("footer.sections")}
          className="text-center sm:text-left"
        >
          <p className="font-semibold text-ink">{t("footer.sections")}</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {navSections.map(({ id, key }) => (
              <li key={id}>
                <a href={`#${id}`} className={linkClass}>
                  {t(`nav.${key}`)}
                </a>
              </li>
            ))}
            <li>
              <a href={`#${joinSectionId}`} className={linkClass}>
                {t("nav.join")}
              </a>
            </li>
          </ul>
        </nav>
        <div className="text-center sm:text-left">
          <p className="font-semibold text-ink">{t("footer.follow")}</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <ExternalLink href={siteConfig.instagram} className={linkClass}>
                <InstagramIcon className="size-4 shrink-0" aria-hidden />{" "}
                Instagram
              </ExternalLink>
            </li>
            <li>
              <ExternalLink href={siteConfig.linkedin} className={linkClass}>
                <LinkedinIcon className="size-4 shrink-0" aria-hidden />{" "}
                LinkedIn
              </ExternalLink>
            </li>
          </ul>
        </div>
      </Reveal>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 pt-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))] text-center text-xs text-muted sm:px-6 md:flex-row md:justify-between md:text-left lg:px-8">
          <div className="space-y-1">
            <p>
              © {year ? `${year} ` : ""}
              {siteConfig.shortName} · AAUAlg. {t("footer.rights")}
            </p>
            <p>{t("footer.made")}</p>
          </div>
          <a
            href="#inicio"
            className="group inline-flex shrink-0 items-center gap-1.5 rounded-full border border-line px-4 py-2 whitespace-nowrap transition-colors hover:border-primary hover:text-primary"
          >
            {t("footer.backToTop")}
            <ArrowUp
              className="size-3.5 transition-transform group-hover:-translate-y-0.5"
              aria-hidden
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
