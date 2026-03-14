"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [small, setSmall] = useState(false);
  const [open,  setOpen]  = useState(false);

  useEffect(() => {
    const onScroll = () => setSmall(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className={`navbar-blur ${small ? "navbar-small" : ""}`}>
      <div className="container-padrao w-full">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center h-[80px]">

          {/* ── esquerda: logo ── */}
          <div className="flex items-center gap-3 justify-self-start">
            <div className="h-9 w-9 rounded-full border border-white/10 bg-white/5 grid place-items-center shrink-0">
              <span className="gold-gradient font-bold text-sm">AH</span>
            </div>
            <span className="brand-name whitespace-nowrap">Aline Henriques</span>
          </div>

          {/* ── centro: links desktop ── */}
          <nav className="hidden md:flex items-center gap-10 justify-self-center">
            <a href="#sobre">Sobre</a>
            <a href="#projetos">Projetos</a>
            <a href="#contato">Contato</a>
          </nav>

          {/* ── direita: CTA + hamburger ── */}
          <div className="flex items-center justify-self-end gap-3">
            <a href="#contato" className="btn-nav hidden md:inline-flex whitespace-nowrap">
              Contato
            </a>

            <button
              className="md:hidden h-10 w-10 rounded-xl border border-white/10 bg-white/5 grid place-items-center"
              onClick={() => setOpen(v => !v)}
              aria-label="Abrir menu"
            >
              <div className="flex flex-col gap-1.5">
                <span className="block h-[2px] w-5 bg-white/70" />
                <span className="block h-[2px] w-5 bg-white/70" />
                <span className="block h-[2px] w-5 bg-white/70" />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* ── menu mobile ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 z-[60]"
            style={{ background: "rgba(0,0,0,.55)", backdropFilter: "blur(10px)" }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ y: -10, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -10, opacity: 0, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 200, damping: 22 }}
              className="mx-4 mt-[96px] rounded-2xl border border-white/10 bg-[rgba(7,7,17,.85)] p-5"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex flex-col gap-4">
                <button
                  className="text-left py-2"
                  style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
                  onClick={() => go("#sobre")}
                >
                  Sobre
                </button>
                <button
                  className="text-left py-2"
                  style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
                  onClick={() => go("#projetos")}
                >
                  Projetos
                </button>
                <button
                  className="text-left py-2"
                  style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
                  onClick={() => go("#contato")}
                >
                  Contato
                </button>

                <a
                  href="#contato"
                  onClick={() => setOpen(false)}
                  className="btn-modern mt-2 text-center"
                >
                  Fale comigo
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}