"use client";

import { ArrowUp } from "lucide-react";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

/** Barra de progresso de leitura no topo da página. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
    mass: 0.3,
  });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-1 origin-left bg-gradient-to-r from-mint via-accent to-primary"
    />
  );
}

/** Botão flutuante para voltar ao topo, visível depois de algum scroll. */
export function BackToTop() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // O rodapé já tem o seu link "voltar ao topo": aí o botão flutuante esconde-se
    // para não tapar o texto.
    const footer = document.getElementById("rodape");
    const observer = new IntersectionObserver(([entry]) =>
      setFooterVisible(entry.isIntersecting),
    );
    if (footer) observer.observe(footer);

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && !footerVisible && (
        <motion.a
          href="#inicio"
          aria-label={t("footer.backToTop")}
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          whileHover={{ y: -4 }}
          whileTap={{ scale: 0.9 }}
          className="fixed right-4 bottom-[calc(1rem+env(safe-area-inset-bottom))] z-40 grid size-12 place-items-center rounded-full bg-primary text-on-primary shadow-xl shadow-[rgb(10_71_168/0.35)] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:outline-none sm:right-6 sm:bottom-6"
        >
          <ArrowUp className="size-5" aria-hidden />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
