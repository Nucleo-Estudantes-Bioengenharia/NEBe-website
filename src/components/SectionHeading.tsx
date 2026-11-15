"use client";

import { motion } from "motion/react";

import { easeOut, Reveal } from "./motion";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  id,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  id: string;
  align?: "left" | "center";
}) {
  const centered = align === "center";
  return (
    <Reveal className={`max-w-2xl ${centered ? "mx-auto text-center" : ""}`}>
      <p
        className={`flex items-center gap-3 text-sm font-bold tracking-[0.2em] text-accent uppercase ${
          centered ? "justify-center" : ""
        }`}
      >
        <motion.span
          className="h-0.5 w-8 origin-left rounded-full bg-gradient-to-r from-mint to-accent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: easeOut, delay: 0.2 }}
          aria-hidden
        />
        {eyebrow}
      </p>
      <h2
        id={id}
        className="mt-3 text-3xl leading-tight font-bold tracking-tight text-balance text-ink sm:text-4xl lg:text-5xl"
      >
        {title}
      </h2>
      {intro && <p className="mt-4 text-lg text-pretty text-muted">{intro}</p>}
    </Reveal>
  );
}
