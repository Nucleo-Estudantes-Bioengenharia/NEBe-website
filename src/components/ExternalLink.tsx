"use client";

import type { AnchorHTMLAttributes } from "react";
import { useTranslation } from "react-i18next";

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "target" | "rel"> & {
  href: string;
};

/** Link externo que abre num novo separador e avisa os leitores de ecrã. */
export function ExternalLink({ children, ...props }: Props) {
  const { t } = useTranslation();
  return (
    <a {...props} target="_blank" rel="noopener noreferrer">
      {children}
      <span className="sr-only"> {t("common.newTab")}</span>
    </a>
  );
}
