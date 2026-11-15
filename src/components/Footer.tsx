"use client";

import { ArrowUp } from "lucide-react";
import { useSyncExternalStore } from "react";
import { useTranslation } from "react-i18next";

import { joinSectionId, navSections, siteConfig } from "@/config/site";

import { Logo } from "./Logo";
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

export function Footer() {
  const { t } = useTranslation();
  const year = useCurrentYear();

  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[2fr_1fr_1fr] lg:px-8">
        <div>
          <Logo className="h-14" />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
            {t("footer.description")}
          </p>
        </div>
        <nav aria-label={t("footer.sections")}>
          <p className="font-semibold text-ink">{t("footer.sections")}</p>
          <ul className="mt-4 space-y-2 text-sm">
            {navSections.map(({ id, key }) => (
              <li key={id}>
                <a href={`#${id}`} className="text-muted hover:text-primary">
                  {t(`nav.${key}`)}
                </a>
              </li>
            ))}
            <li>
              <a
                href={`#${joinSectionId}`}
                className="text-muted hover:text-primary"
              >
                {t("nav.join")}
              </a>
            </li>
          </ul>
        </nav>
        <div>
          <p className="font-semibold text-ink">{t("footer.follow")}</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a
                href={siteConfig.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-muted hover:text-primary"
              >
                <InstagramIcon className="size-4" aria-hidden /> Instagram
              </a>
            </li>
            <li>
              <a
                href={siteConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-muted hover:text-primary"
              >
                <LinkedinIcon className="size-4" aria-hidden /> LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-3 px-4 py-6 text-xs text-muted sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <p>
            © {year ? `${year} ` : ""}
            {siteConfig.shortName} · AAUAlg. {t("footer.rights")}{" "}
            {t("footer.made")}
          </p>
          <a
            href="#inicio"
            className="inline-flex items-center gap-1.5 hover:text-primary"
          >
            {t("footer.backToTop")}
            <ArrowUp className="size-3.5" aria-hidden />
          </a>
        </div>
      </div>
    </footer>
  );
}
