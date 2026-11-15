import { useId } from "react";

import type { Language } from "@/i18n";

/* Bandeiras em SVG (os emojis de bandeiras não aparecem no Windows). */

function PortugalFlag() {
  return (
    <svg
      viewBox="0 0 30 20"
      preserveAspectRatio="xMidYMid slice"
      className="size-full"
    >
      <rect width="12" height="20" fill="#046a38" />
      <rect x="12" width="18" height="20" fill="#da291c" />
      <circle
        cx="12"
        cy="10"
        r="4.6"
        fill="none"
        stroke="#ffe900"
        strokeWidth="1.4"
      />
      <path
        d="M10 7.4h4v3.6a2 2 0 0 1-4 0z"
        fill="#fff"
        stroke="#da291c"
        strokeWidth="0.8"
      />
    </svg>
  );
}

function UkFlag() {
  const id = useId();
  return (
    <svg
      viewBox="0 0 60 30"
      preserveAspectRatio="xMidYMid slice"
      className="size-full"
    >
      <clipPath id={`${id}t`}>
        <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
      </clipPath>
      <rect width="60" height="30" fill="#012169" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
      <path
        d="M0,0 L60,30 M60,0 L0,30"
        clipPath={`url(#${id}t)`}
        stroke="#c8102e"
        strokeWidth="4"
      />
      <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
      <path d="M30,0 v30 M0,15 h60" stroke="#c8102e" strokeWidth="6" />
    </svg>
  );
}

export function Flag({
  language,
  className = "",
}: {
  language: Language;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={`inline-block shrink-0 overflow-hidden rounded-[3px] shadow-[0_0_0_1px_rgb(0_0_0/0.12)] ${className}`}
    >
      {language === "pt" ? <PortugalFlag /> : <UkFlag />}
    </span>
  );
}
