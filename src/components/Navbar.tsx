"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { joinSectionId, navSections } from "@/config/site";

import { LanguageSwitcher } from "./LanguageSwitcher";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";

/** Devolve o id da secção atualmente visível, para destacar o link na navbar. */
function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

const sectionIds = [...navSections.map((s) => s.id), joinSectionId];

export function Navbar() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(sectionIds);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 bg-surface/90 backdrop-blur-md transition-shadow ${
        scrolled || open
          ? "shadow-[0_1px_0_var(--line),0_8px_24px_-12px_rgb(10_71_168/0.25)]"
          : ""
      }`}
    >
      <nav
        aria-label={t("nav.primary")}
        className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-20 lg:px-8"
      >
        <a
          href="#inicio"
          onClick={close}
          aria-label={t("nav.home")}
          className="flex min-w-0 items-center gap-3 rounded-xl focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
        >
          <Logo className="h-11 lg:h-14" />
          <span className="hidden text-xs leading-snug font-semibold text-ink sm:block lg:text-sm">
            {t("brand.name")}
            <br />
            {t("brand.university")}
          </span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {navSections.map(({ id, key }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-current={active === id ? "true" : undefined}
                className={`rounded-full px-4 py-2 transition-colors hover:bg-pill focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none ${
                  active === id ? "font-semibold text-primary" : "text-ink"
                }`}
              >
                {t(`nav.${key}`)}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1">
          <LanguageSwitcher />
          <ThemeToggle />
          <a
            href={`#${joinSectionId}`}
            className="ml-2 hidden rounded-full bg-pill px-6 py-3 font-medium text-ink transition-colors hover:bg-primary hover:text-on-primary focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none md:inline-flex"
          >
            {t("nav.join")}
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t("nav.closeMenu") : t("nav.openMenu")}
            className="grid size-10 place-items-center rounded-full text-ink hover:bg-pill focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none lg:hidden"
          >
            {open ? (
              <X className="size-6" aria-hidden />
            ) : (
              <Menu className="size-6" aria-hidden />
            )}
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        hidden={!open}
        className="border-t border-line bg-surface px-4 pt-2 pb-6 sm:px-6 lg:hidden"
      >
        <ul className="flex flex-col">
          {navSections.map(({ id, key }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={close}
                className={`block rounded-xl px-4 py-3 text-lg hover:bg-pill ${
                  active === id ? "font-semibold text-primary" : "text-ink"
                }`}
              >
                {t(`nav.${key}`)}
              </a>
            </li>
          ))}
        </ul>
        <a
          href={`#${joinSectionId}`}
          onClick={close}
          className="mt-4 flex justify-center rounded-full bg-primary px-6 py-3 font-semibold text-on-primary"
        >
          {t("nav.join")}
        </a>
      </div>
    </header>
  );
}
