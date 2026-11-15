"use client";

import { Sparkle } from "lucide-react";
import { useTranslation } from "react-i18next";

import { areas } from "@/config/site";

/** Faixa com as áreas da Bioengenharia a deslizar continuamente. */
export function Marquee() {
  const { t } = useTranslation();
  const items = areas.map(({ key, icon }) => ({
    key,
    icon,
    label: t(`areas.${key}`),
  }));

  return (
    <div className="group relative overflow-hidden bg-gradient-to-r from-primary via-accent to-mint py-4 text-on-primary select-none">
      <p className="sr-only">
        {t("marquee")}: {items.map((i) => i.label).join(", ")}
      </p>
      <div
        className="flex w-max animate-marquee group-hover:[animation-play-state:paused]"
        aria-hidden
      >
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex shrink-0 items-center">
            {items.map(({ key, icon: Icon, label }) => (
              <li
                key={key}
                className="flex items-center gap-3 px-5 text-sm font-semibold whitespace-nowrap sm:text-base"
              >
                <Icon className="size-5 opacity-90" />
                {label}
                <Sparkle className="ml-5 size-3.5 opacity-70" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
