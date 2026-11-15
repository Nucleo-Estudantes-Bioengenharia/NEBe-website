"use client";

import { Check, ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { useTranslation } from "react-i18next";

import {
  isLanguage,
  languageStorageKey,
  languages,
  type Language,
} from "@/i18n";

import { Flag } from "./Flags";

/** Dropdown de idiomas com bandeiras, acessível por teclado. */
export function LanguageSwitcher() {
  const { t, i18n } = useTranslation();
  const current: Language = isLanguage(i18n.language) ? i18n.language : "pt";
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<(HTMLLIElement | null)[]>([]);
  const listId = useId();

  // Fecha ao clicar fora.
  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    return () => document.removeEventListener("pointerdown", onPointer);
  }, [open]);

  useEffect(() => {
    if (open) optionRefs.current[focused]?.focus();
  }, [open, focused]);

  const openMenu = () => {
    setFocused(languages.indexOf(current));
    setOpen(true);
  };

  const choose = (lng: Language) => {
    void i18n.changeLanguage(lng);
    try {
      window.localStorage.setItem(languageStorageKey, lng);
    } catch {
      // Sem localStorage a escolha vale só para esta visita.
    }
    setOpen(false);
    buttonRef.current?.focus();
  };

  const onListKey = (e: KeyboardEvent) => {
    const last = languages.length - 1;
    if (e.key === "ArrowDown") setFocused((i) => (i >= last ? 0 : i + 1));
    else if (e.key === "ArrowUp") setFocused((i) => (i <= 0 ? last : i - 1));
    else if (e.key === "Home") setFocused(0);
    else if (e.key === "End") setFocused(last);
    else if (e.key === "Enter" || e.key === " ") choose(languages[focused]);
    else if (e.key === "Escape" || e.key === "Tab") {
      setOpen(false);
      if (e.key === "Escape") buttonRef.current?.focus();
      return;
    } else return;
    e.preventDefault();
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-label={`${t("language.label")}: ${t(`language.${current}`)}`}
        onClick={() => (open ? setOpen(false) : openMenu())}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown" || e.key === "ArrowUp") {
            e.preventDefault();
            openMenu();
          }
        }}
        className="inline-flex h-10 items-center gap-2 rounded-full px-2.5 text-sm font-semibold text-ink transition-colors hover:bg-pill focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none sm:px-3"
      >
        <Flag language={current} className="h-3.5 w-5" />
        <span className="hidden uppercase sm:inline">{current}</span>
        <ChevronDown
          className={`size-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            id={listId}
            role="listbox"
            aria-label={t("language.label")}
            aria-activedescendant={`${listId}-${languages[focused]}`}
            onKeyDown={onListKey}
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.18 }}
            className="absolute right-0 z-50 mt-2 w-44 origin-top-right overflow-hidden rounded-2xl border border-line bg-surface p-1.5 shadow-2xl shadow-[rgb(10_71_168/0.18)]"
          >
            {languages.map((lng, i) => {
              const selected = lng === current;
              return (
                <li
                  key={lng}
                  id={`${listId}-${lng}`}
                  ref={(el) => {
                    optionRefs.current[i] = el;
                  }}
                  role="option"
                  aria-selected={selected}
                  tabIndex={i === focused ? 0 : -1}
                  lang={lng}
                  onClick={() => choose(lng)}
                  onMouseEnter={() => setFocused(i)}
                  className={`flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm outline-none ${
                    i === focused ? "bg-pill" : ""
                  } ${selected ? "font-semibold text-primary" : "text-ink"}`}
                >
                  <Flag language={lng} className="h-4 w-6" />
                  <span className="flex-1">{t(`language.${lng}`)}</span>
                  {selected && <Check className="size-4" aria-hidden />}
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
