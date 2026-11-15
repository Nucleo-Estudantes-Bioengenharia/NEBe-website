"use client";

import { Cog, Dna } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useTranslation } from "react-i18next";

import { areas } from "@/config/site";

import { easeOut } from "./motion";

/*
 * Diagrama radial das áreas da Bioengenharia (inspirado no esboço do design).
 * As posições são calculadas em percentagem e os tamanhos em unidades `cqw`
 * (largura do contentor), por isso o diagrama escala com o espaço disponível.
 *
 * - ≥ sm: versão completa, com as etiquetas à volta do anel;
 * - < sm: versão compacta, só com ícones, e a área ativa numa legenda por baixo.
 * As áreas vão sendo destacadas automaticamente; passar o rato ou tocar pausa.
 */

type Layout = {
  w: number;
  h: number;
  ring: number;
  inner: number;
  icon: number; // diâmetro do ícone em cqw
  center: number; // diâmetro do centro em cqw
};

const WIDE: Layout = {
  w: 600,
  h: 500,
  ring: 170,
  inner: 104,
  icon: 10,
  center: 31,
};
const COMPACT: Layout = {
  w: 400,
  h: 400,
  ring: 150,
  inner: 88,
  icon: 14,
  center: 38,
};

const STEP = (Math.PI * 2) / areas.length;
const angleOf = (i: number, offset = 0) => -Math.PI / 2 + STEP * i + offset;

function nodePosition(i: number, l: Layout) {
  const a = angleOf(i);
  return {
    cos: Math.cos(a),
    sin: Math.sin(a),
    left: 50 + ((l.ring * Math.cos(a)) / l.w) * 100,
    top: 50 + ((l.ring * Math.sin(a)) / l.h) * 100,
  };
}

function labelStyle(cos: number, sin: number, l: Layout): CSSProperties {
  const gap = `${l.icon / 2 + 0.8}cqw`;
  if (Math.abs(cos) < 0.01) {
    return sin < 0
      ? {
          transform: `translate(-50%, calc(-100% - ${gap}))`,
          textAlign: "center",
        }
      : { transform: `translate(-50%, ${gap})`, textAlign: "center" };
  }
  return cos > 0
    ? { transform: `translate(${gap}, -50%)`, textAlign: "left" }
    : {
        transform: `translate(calc(-100% - ${gap}), -50%)`,
        textAlign: "right",
      };
}

/** Desenho de fundo: anéis, raios e impulsos que viajam do centro para fora. */
function Rings({ l, animated }: { l: Layout; animated: boolean }) {
  const cx = l.w / 2;
  const cy = l.h / 2;
  return (
    <svg
      viewBox={`0 0 ${l.w} ${l.h}`}
      className="absolute inset-0 size-full overflow-visible text-primary"
      aria-hidden
    >
      <motion.circle
        cx={cx}
        cy={cy}
        r={l.ring}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, ease: easeOut }}
      />
      <g
        className="animate-spin-slower"
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
      >
        <circle
          cx={cx}
          cy={cy}
          r={l.inner}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="4 7"
          opacity="0.55"
        />
      </g>
      {areas.map((_, i) => {
        const a = angleOf(i, STEP / 2);
        const x1 = cx + l.inner * Math.cos(a);
        const y1 = cy + l.inner * Math.sin(a);
        const x2 = cx + l.ring * Math.cos(a);
        const y2 = cy + l.ring * Math.sin(a);
        return (
          <g key={i}>
            <motion.line
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="currentColor"
              strokeWidth="1.2"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 + i * 0.05 }}
            />
            <circle cx={x1} cy={y1} r="3.5" fill="currentColor" />
            <circle cx={x2} cy={y2} r="4" fill="currentColor" />
            {animated && (
              <circle r="3" className="fill-accent">
                <animate
                  attributeName="cx"
                  values={`${x1};${x2}`}
                  dur="2.2s"
                  begin={`${(i * 0.37) % 2.2}s`}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="cy"
                  values={`${y1};${y2}`}
                  dur="2.2s"
                  begin={`${(i * 0.37) % 2.2}s`}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0;1;0"
                  dur="2.2s"
                  begin={`${(i * 0.37) % 2.2}s`}
                  repeatCount="indefinite"
                />
              </circle>
            )}
          </g>
        );
      })}
    </svg>
  );
}

function Center({ l, label }: { l: Layout; label: string }) {
  return (
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      style={{ width: `${l.center}cqw`, height: `${l.center}cqw` }}
      aria-hidden
    >
      <span className="absolute inset-0 animate-pulse-ring rounded-full bg-accent/30" />
      <motion.div
        initial={{ scale: 0, rotate: -90 }}
        whileInView={{ scale: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 120, damping: 14, delay: 0.2 }}
        className="relative size-full rounded-full p-[1.1cqw] shadow-2xl shadow-[rgb(10_71_168/0.3)]"
      >
        <span className="absolute inset-0 animate-spin-slow rounded-full bg-[conic-gradient(from_0deg,var(--mint),var(--accent),var(--primary),var(--accent),var(--mint))]" />
        <div className="relative flex size-full flex-col items-center justify-center gap-[1cqw] rounded-full bg-surface">
          <div className="relative text-primary">
            <Cog
              className="animate-spin-slow opacity-25"
              style={{
                width: `${l.center * 0.38}cqw`,
                height: `${l.center * 0.38}cqw`,
              }}
              strokeWidth={1}
            />
            <Dna
              className="absolute inset-0 m-auto text-primary"
              style={{
                width: `${l.center * 0.24}cqw`,
                height: `${l.center * 0.24}cqw`,
              }}
              strokeWidth={1.5}
            />
          </div>
          <span
            className="rounded-full bg-primary px-[2cqw] py-[0.6cqw] font-semibold whitespace-nowrap text-on-primary"
            style={{ fontSize: `${l.center * 0.078}cqw` }}
          >
            {label}
          </span>
        </div>
      </motion.div>
    </div>
  );
}

export function BioDiagram() {
  const { t } = useTranslation();
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Destaca a área seguinte a cada 2,6 s (pausa fora do ecrã ou com interação).
  useEffect(() => {
    if (paused || reduced || !inView) return;
    const id = setInterval(
      () => setActive((i) => (i + 1) % areas.length),
      2600,
    );
    return () => clearInterval(id);
  }, [paused, reduced, inView]);

  useEffect(
    () => () => {
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
    },
    [],
  );

  const select = (i: number) => {
    setActive(i);
    setPaused(true);
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => setPaused(false), 8000);
  };

  const center = t("areas.center");
  const ActiveIcon = areas[active].icon;

  const nodes = (l: Layout, withLabels: boolean) =>
    areas.map(({ key, icon: Icon }, i) => {
      const { cos, sin, left, top } = nodePosition(i, l);
      const isActive = i === active;
      return (
        <motion.li
          key={key}
          className="absolute"
          style={{ left: `${left}%`, top: `${top}%` }}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 15,
            delay: 0.5 + i * 0.06,
          }}
        >
          <button
            type="button"
            onClick={() => select(i)}
            onMouseEnter={() => withLabels && select(i)}
            aria-pressed={isActive}
            aria-label={t(`areas.${key}`)}
            className={`absolute grid -translate-x-1/2 -translate-y-1/2 cursor-pointer place-items-center rounded-full border-2 shadow-md transition-all duration-500 focus-visible:ring-4 focus-visible:ring-accent focus-visible:outline-none ${
              isActive
                ? "scale-115 border-primary bg-primary text-on-primary shadow-[0_0_0_6px_color-mix(in_oklab,var(--accent)_25%,transparent)]"
                : "border-primary bg-surface text-primary hover:scale-110"
            }`}
            style={{ width: `${l.icon}cqw`, height: `${l.icon}cqw` }}
          >
            <Icon
              style={{ width: `${l.icon / 2}cqw`, height: `${l.icon / 2}cqw` }}
              strokeWidth={1.75}
              aria-hidden
            />
          </button>
          {withLabels && (
            <span
              aria-hidden
              className={`pointer-events-none absolute block w-max max-w-[19cqw] rounded-[1.6cqw] border px-[1.4cqw] py-[0.7cqw] text-[1.85cqw] leading-tight font-semibold text-balance shadow-sm transition-colors duration-500 ${
                isActive
                  ? "border-primary bg-primary text-on-primary"
                  : "border-primary/60 bg-surface/95 text-ink"
              }`}
              style={labelStyle(cos, sin, WIDE)}
            >
              {t(`areas.${key}`)}
            </span>
          )}
        </motion.li>
      );
    });

  return (
    <figure
      ref={ref}
      className="w-full"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <figcaption className="sr-only">{t("hero.diagramTitle")}</figcaption>

      {/* Versão completa (≥ sm) */}
      <div className="@container relative mx-auto hidden aspect-[6/5] w-full max-w-2xl sm:block">
        <Rings l={WIDE} animated={!reduced} />
        <Center l={WIDE} label={center} />
        <ul>{nodes(WIDE, true)}</ul>
      </div>

      {/* Versão compacta (telemóvel) */}
      <div className="sm:hidden">
        <div className="@container relative mx-auto aspect-square w-full max-w-sm">
          <Rings l={COMPACT} animated={!reduced} />
          <Center l={COMPACT} label={center} />
          <ul>{nodes(COMPACT, false)}</ul>
        </div>
        <div
          className="mx-auto mt-4 flex max-w-sm items-center gap-3 rounded-2xl border border-line bg-surface/90 p-3 shadow-lg backdrop-blur"
          aria-live="polite"
        >
          <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary to-accent text-on-primary">
            <ActiveIcon className="size-5" aria-hidden />
          </span>
          <div className="min-w-0 flex-1 overflow-hidden">
            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={active}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="text-sm leading-tight font-semibold text-ink"
              >
                {t(`areas.${areas[active].key}`)}
              </motion.p>
            </AnimatePresence>
            <p className="mt-0.5 text-xs text-muted">{t("hero.tapHint")}</p>
          </div>
        </div>
      </div>
    </figure>
  );
}
