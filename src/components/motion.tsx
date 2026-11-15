"use client";

import { animate, motion, useInView, type Variants } from "motion/react";
import {
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";

/** Curva de animação usada em todo o site (ease-out suave). */
export const easeOut = [0.22, 1, 0.36, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const viewport = { once: true, amount: 0.15 } as const;

/** Faz aparecer o conteúdo (de baixo para cima) quando entra no ecrã. */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={fadeUp}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

/** Lista cujos itens (`StaggerItem`) aparecem uns a seguir aos outros. */
export function StaggerList({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.ul
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={stagger}
    >
      {children}
    </motion.ul>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.li className={className} variants={fadeUp}>
      {children}
    </motion.li>
  );
}

/** Atualiza --x / --y com a posição do rato, para o efeito `.spotlight`. */
export function trackSpotlight(event: MouseEvent<HTMLElement>) {
  const el = event.currentTarget;
  const rect = el.getBoundingClientRect();
  el.style.setProperty("--x", `${event.clientX - rect.left}px`);
  el.style.setProperty("--y", `${event.clientY - rect.top}px`);
}

/**
 * Anima o primeiro número de um texto (ex.: "180 ECTS") de 0 até ao valor,
 * quando fica visível. Texto sem números é mostrado tal como está.
 */
export function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const match = value.match(/^(\D*)(\d+)(.*)$/);
  const target = match ? Number(match[2]) : 0;
  const [current, setCurrent] = useState(target);

  useEffect(() => {
    if (!match || !inView) return;
    const controls = animate(0, target, {
      duration: 1.4,
      ease: easeOut,
      onUpdate: (v) => setCurrent(Math.round(v)),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, target]);

  if (!match) return <span>{value}</span>;
  return (
    <span ref={ref}>
      {match[1]}
      <span className="tabular-nums">{current}</span>
      {match[3]}
    </span>
  );
}
