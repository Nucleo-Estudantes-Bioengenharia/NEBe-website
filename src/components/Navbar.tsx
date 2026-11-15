"use client";

import { ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { joinSectionId, navSections } from "@/config/site";

import { LanguageSwitcher } from "./LanguageSwitcher";
import { Logo } from "./Logo";
import { easeOut } from "./motion";
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
    for (const id of ["inicio", ...ids]) {
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
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Esc fecha o menu; o scroll da página fica bloqueado enquanto está aberto.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);
  const compact = scrolled || open;

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: easeOut }}
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300 ${
        compact
          ? "bg-surface/80 shadow-[0_1px_0_var(--line),0_10px_30px_-15px_rgb(10_71_168/0.3)] backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <nav
        aria-label={t("nav.primary")}
        className={`mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 transition-[height] duration-300 sm:px-6 lg:px-8 ${
          compact ? "h-16" : "h-[4.5rem] lg:h-20"
        }`}
      >
        <a
          href="#inicio"
          onClick={close}
          aria-label={t("nav.home")}
          className="group flex min-w-0 items-center gap-3 rounded-xl focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
        >
          <Logo
            className={`shadow-sm transition-all duration-300 group-hover:scale-105 ${
              compact ? "h-10" : "h-11 lg:h-13"
            }`}
          />
          <span className="hidden text-xs leading-snug font-semibold text-ink sm:block lg:hidden xl:block">
            {t("brand.name")}
            <br />
            <span className="font-medium text-muted">
              {t("brand.university")}
            </span>
          </span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {navSections.map(({ id, key }) => {
            const isActive = active === id;
            return (
              <li key={id} className="relative">
                <a
                  href={`#${id}`}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative block rounded-full px-4 py-2 font-medium transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none ${
                    isActive ? "text-primary" : "text-ink hover:text-primary"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-full bg-pill"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                  {t(`nav.${key}`)}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex shrink-0 items-center gap-0.5 sm:gap-1">
          <LanguageSwitcher />
          <ThemeToggle />
          <a
            href={`#${joinSectionId}`}
            className="shine ml-2 hidden items-center gap-2 rounded-full bg-primary px-5 py-2.5 font-semibold text-on-primary shadow-lg shadow-[rgb(10_71_168/0.25)] transition-transform hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:outline-none md:inline-flex"
          >
            {t("nav.join")}
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t("nav.closeMenu") : t("nav.openMenu")}
            className="relative grid size-10 place-items-center rounded-full text-ink hover:bg-pill focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none lg:hidden"
          >
            {/* Ícone "hambúrguer" que se transforma num X. */}
            <span className="relative block h-3.5 w-5" aria-hidden>
              <span
                className={`absolute left-0 h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${
                  open ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute top-1.5 left-0 h-0.5 w-5 rounded-full bg-current transition-opacity duration-200 ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`absolute left-0 h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${
                  open ? "top-1.5 -rotate-45" : "top-3"
                }`}
              />
            </span>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "calc(100dvh - 4rem)" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: easeOut }}
            className="overflow-y-auto border-t border-line bg-surface/95 backdrop-blur-xl lg:hidden"
          >
            <motion.ul
              className="mx-auto flex max-w-xl flex-col gap-1 px-4 pt-6 sm:px-6"
              initial="hidden"
              animate="show"
              variants={{
                show: {
                  transition: { staggerChildren: 0.06, delayChildren: 0.1 },
                },
              }}
            >
              {navSections.map(({ id, key }, i) => (
                <motion.li
                  key={id}
                  variants={{
                    hidden: { opacity: 0, x: -24 },
                    show: { opacity: 1, x: 0 },
                  }}
                >
                  <a
                    href={`#${id}`}
                    onClick={close}
                    className={`flex items-center justify-between rounded-2xl px-4 py-4 text-2xl font-semibold hover:bg-pill ${
                      active === id ? "text-primary" : "text-ink"
                    }`}
                  >
                    <span>
                      <span
                        className="mr-3 text-sm text-accent tabular-nums"
                        aria-hidden
                      >
                        0{i + 1}
                      </span>
                      {t(`nav.${key}`)}
                    </span>
                    <ArrowRight className="size-5 text-muted" aria-hidden />
                  </a>
                </motion.li>
              ))}
              <motion.li
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  show: { opacity: 1, y: 0 },
                }}
                className="mt-4"
              >
                <a
                  href={`#${joinSectionId}`}
                  onClick={close}
                  className="shine flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-6 py-4 text-lg font-semibold text-on-primary shadow-lg"
                >
                  {t("nav.join")}
                  <ArrowRight className="size-5" aria-hidden />
                </a>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
