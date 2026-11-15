"use client";

import { Cog, Dna } from "lucide-react";
import type { CSSProperties } from "react";
import { useTranslation } from "react-i18next";

import { areas } from "@/config/site";

/*
 * Diagrama radial das áreas da Bioengenharia (inspirado no esboço do design).
 * O contentor tem proporção 6:5; as posições são calculadas em percentagem
 * e os tamanhos em unidades `cqw`, por isso o diagrama escala com a largura.
 */
const VIEW_W = 600;
const VIEW_H = 500;
const RING = 170; // raio do anel onde ficam os ícones (unidades do viewBox)
const INNER = 104; // raio do círculo interior
const ICON_HALF = "5cqw";

function position(index: number, total: number) {
  const angle = (-90 + (360 / total) * index) * (Math.PI / 180);
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return {
    cos,
    sin,
    left: 50 + ((RING * cos) / VIEW_W) * 100,
    top: 50 + ((RING * sin) / VIEW_H) * 100,
  };
}

function labelStyle(cos: number, sin: number): CSSProperties {
  if (Math.abs(cos) < 0.01) {
    return sin < 0
      ? {
          transform: `translate(-50%, calc(-100% - ${ICON_HALF} - 0.5cqw))`,
          textAlign: "center",
        }
      : {
          transform: `translate(-50%, calc(${ICON_HALF} + 0.5cqw))`,
          textAlign: "center",
        };
  }
  return cos > 0
    ? {
        transform: `translate(calc(${ICON_HALF} + 0.8cqw), -50%)`,
        textAlign: "left",
      }
    : {
        transform: `translate(calc(-100% - ${ICON_HALF} - 0.8cqw), -50%)`,
        textAlign: "right",
      };
}

export function BioDiagram() {
  const { t } = useTranslation();
  const cx = VIEW_W / 2;
  const cy = VIEW_H / 2;

  return (
    <figure className="w-full">
      <figcaption className="sr-only">{t("hero.diagramTitle")}</figcaption>

      {/* Versão radial (ecrãs ≥ sm) */}
      <div className="@container relative mx-auto hidden aspect-[6/5] w-full max-w-2xl sm:block">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          className="absolute inset-0 size-full text-primary"
          aria-hidden
        >
          <circle
            cx={cx}
            cy={cy}
            r={RING}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <circle
            cx={cx}
            cy={cy}
            r={INNER}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="4 6"
            opacity="0.6"
          />
          {areas.map((_, i) => {
            const a = ((-90 + 15 + 30 * i) * Math.PI) / 180;
            const x1 = cx + INNER * Math.cos(a);
            const y1 = cy + INNER * Math.sin(a);
            const x2 = cx + RING * Math.cos(a);
            const y2 = cy + RING * Math.sin(a);
            return (
              <g key={i}>
                <line
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="currentColor"
                  strokeWidth="1.2"
                />
                <circle cx={x1} cy={y1} r="4" fill="currentColor" />
                <circle cx={x2} cy={y2} r="4.5" fill="currentColor" />
              </g>
            );
          })}
        </svg>

        {/* Centro */}
        <div
          className="absolute top-1/2 left-1/2 grid aspect-square w-[31cqw] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-gradient-to-br from-primary to-accent p-[1.2cqw] shadow-xl shadow-[rgb(10_71_168/0.25)]"
          aria-hidden
        >
          <div className="flex size-full flex-col items-center justify-center gap-[1cqw] rounded-full bg-surface">
            <div className="relative text-primary">
              <Cog className="size-[12cqw] opacity-25" strokeWidth={1} />
              <Dna
                className="absolute inset-0 m-auto size-[6.5cqw] text-accent"
                strokeWidth={1.75}
              />
            </div>
            <span className="rounded-full bg-primary px-[2cqw] py-[0.6cqw] text-[2.4cqw] font-semibold text-on-primary">
              {t("areas.center")}
            </span>
          </div>
        </div>

        <ul>
          {areas.map(({ key, icon: Icon }, i) => {
            const { cos, sin, left, top } = position(i, areas.length);
            return (
              <li
                key={key}
                className="group absolute"
                style={{ left: `${left}%`, top: `${top}%` }}
              >
                <span className="absolute grid size-[10cqw] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-primary bg-surface text-primary shadow-md transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-on-primary">
                  <Icon
                    className="size-[5cqw]"
                    strokeWidth={1.75}
                    aria-hidden
                  />
                </span>
                <span
                  className="absolute block w-max max-w-[19cqw] rounded-[1.6cqw] border border-primary/70 bg-surface/95 px-[1.4cqw] py-[0.7cqw] text-[1.85cqw] leading-tight font-semibold text-balance text-ink shadow-sm"
                  style={labelStyle(cos, sin)}
                >
                  {t(`areas.${key}`)}
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Versão compacta (telemóvel) */}
      <div className="sm:hidden">
        <div className="mx-auto mb-5 flex w-fit items-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-5 py-2.5 font-semibold text-on-primary shadow-lg">
          <Dna className="size-5" aria-hidden />
          {t("areas.center")}
        </div>
        <ul className="grid grid-cols-2 gap-2">
          {areas.map(({ key, icon: Icon }) => (
            <li
              key={key}
              className="flex items-center gap-2 rounded-2xl border border-line bg-surface/90 p-2.5 text-xs leading-tight font-medium text-ink"
            >
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-pill text-primary">
                <Icon className="size-4" aria-hidden />
              </span>
              {t(`areas.${key}`)}
            </li>
          ))}
        </ul>
      </div>
    </figure>
  );
}
