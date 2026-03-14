"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const LINKS = [
  {
    label: "E-mail",
    value: "alinealbhenriques@gmail.com",
    href: "mailto:alinealbhenriques@gmail.com",
    icon: "✉️",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/aline-henriques",
    href: "https://linkedin.com/in/aline-henriques",
    icon: "💼",
  },
  {
    label: "GitHub",
    value: "github.com/aline-henriques",
    href: "https://github.com/aline-henriques",
    icon: "🐙",
  },
];

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    // troque aqui pela sua lógica real (fetch para API route, Resend, EmailJS…)
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1400);
  };

  return (
    <section id="contato" className="py-28 relative">
      <div className="container-padrao">

        {/* cabeçalho */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: .7 }}
          viewport={{ once: true }}
        >
          <p className="contact-eyebrow">Vamos conversar</p>
          <h2 className="section-title mt-2">Fale Comigo!</h2>
          <p className="contact-sub mt-4">
            Aberta a freelas, projetos e oportunidades.<br />
            Respondo em menos de 24 horas. 🌙
          </p>
        </motion.div>

        {/* grid: links à esquerda · formulário à direita */}
        <div className="contact-grid">

          {/* ── coluna esquerda ── */}
          <motion.div
            className="contact-left"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: .7 }}
            viewport={{ once: true }}
          >
            <p className="contact-left-title">Fale diretamente</p>

            <div className="contact-links">
              {LINKS.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link-card"
                >
                  <span className="contact-link-icon">{l.icon}</span>
                  <div>
                    <p className="contact-link-label">{l.label}</p>
                    <p className="contact-link-value">{l.value}</p>
                  </div>
                  <span className="contact-link-arrow">↗</span>
                </a>
              ))}
            </div>

            {/* disponibilidade */}
            <div className="contact-avail">
              <span className="contact-avail-dot" />
              <span>Disponível para novos projetos</span>
            </div>
          </motion.div>

          {/* ── formulário ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: .7, delay: .1 }}
            viewport={{ once: true }}
          >
            {sent ? (
              <div className="contact-success">
                <span className="contact-success-icon">✓</span>
                <p className="contact-success-title">Mensagem enviada!</p>
                <p className="contact-success-sub">Te respondo em breve. 💛</p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="contact-row">
                  <div className="contact-field">
                    <label className="contact-label">Nome</label>
                    <input
                      className="input-premium"
                      type="text"
                      placeholder="Seu nome"
                      required
                    />
                  </div>
                  <div className="contact-field">
                    <label className="contact-label">E-mail</label>
                    <input
                      className="input-premium"
                      type="email"
                      placeholder="seu@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="contact-field">
                  <label className="contact-label">Assunto</label>
                  <input
                    className="input-premium"
                    type="text"
                    placeholder="Do que se trata?"
                  />
                </div>

                <div className="contact-field">
                  <label className="contact-label">Mensagem</label>
                  <textarea
                    className="input-premium"
                    rows={5}
                    placeholder="Conte um pouco sobre o projeto ou ideia…"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn-modern w-full justify-center"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="contact-spinner" />
                  ) : (
                    "Enviar Mensagem"
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>

      {/* estilos scoped */}
      <style jsx>{`
        .contact-eyebrow {
          font-family: var(--font-display);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: .18em;
          text-transform: uppercase;
          color: var(--rose);
        }
        .contact-sub {
          font-family: var(--font-body);
          font-size: 15px;
          color: var(--muted);
          line-height: 1.7;
          font-weight: 300;
        }

        /* grid */
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1.4fr;
          gap: 56px;
          align-items: start;
        }
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr; gap: 40px; }
        }

        /* coluna esquerda */
        .contact-left-title {
          font-family: var(--font-display);
          font-size: 13px;
          font-weight: 700;
          letter-spacing: .12em;
          text-transform: uppercase;
          color: var(--muted);
          margin-bottom: 20px;
        }
        .contact-links { display: flex; flex-direction: column; gap: 12px; }
        .contact-link-card {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 16px 18px;
          border-radius: 16px;
          border: 1px solid var(--border);
          background: var(--card);
          text-decoration: none;
          transition: border-color .25s, background .25s, transform .25s;
        }
        .contact-link-card:hover {
          border-color: rgba(215,180,90,.45);
          background: rgba(215,180,90,.06);
          transform: translateX(4px);
        }
        .contact-link-icon { font-size: 20px; flex-shrink: 0; }
        .contact-link-label {
          font-family: var(--font-display);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: .1em;
          text-transform: uppercase;
          color: var(--muted);
          margin-bottom: 2px;
        }
        .contact-link-value {
          font-family: var(--font-body);
          font-size: 13px;
          color: var(--text);
        }
        .contact-link-arrow {
          margin-left: auto;
          font-size: 14px;
          color: var(--muted);
          transition: color .2s, transform .2s;
        }
        .contact-link-card:hover .contact-link-arrow {
          color: var(--gold);
          transform: translate(2px, -2px);
        }

        /* disponibilidade */
        .contact-avail {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 24px;
          padding: 12px 16px;
          border-radius: 999px;
          border: 1px solid rgba(74,222,128,.25);
          background: rgba(74,222,128,.06);
          font-family: var(--font-body);
          font-size: 13px;
          color: rgba(74,222,128,.9);
          width: fit-content;
        }
        .contact-avail-dot {
          width: 7px; height: 7px;
          border-radius: 999px;
          background: #4ade80;
          box-shadow: 0 0 8px rgba(74,222,128,.7);
          animation: pulse 2s infinite;
          flex-shrink: 0;
        }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.3} }

        /* formulário */
        .contact-form { display: flex; flex-direction: column; gap: 16px; }
        .contact-row  { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        @media (max-width: 540px) { .contact-row { grid-template-columns: 1fr; } }

        .contact-field { display: flex; flex-direction: column; gap: 6px; }
        .contact-label {
          font-family: var(--font-display);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: .1em;
          text-transform: uppercase;
          color: var(--muted);
        }

        /* spinner */
        .contact-spinner {
          display: inline-block;
          width: 18px; height: 18px;
          border: 2px solid rgba(7,7,17,.3);
          border-top-color: #070711;
          border-radius: 999px;
          animation: spin .7s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* sucesso */
        .contact-success {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 60px 40px;
          border-radius: 20px;
          border: 1px solid rgba(74,222,128,.25);
          background: rgba(74,222,128,.05);
          text-align: center;
        }
        .contact-success-icon {
          width: 52px; height: 52px;
          border-radius: 999px;
          background: rgba(74,222,128,.15);
          border: 1px solid rgba(74,222,128,.35);
          display: flex; align-items: center; justify-content: center;
          font-size: 22px;
          color: #4ade80;
        }
        .contact-success-title {
          font-family: var(--font-display);
          font-size: 20px;
          font-weight: 700;
          color: var(--text);
        }
        .contact-success-sub {
          font-family: var(--font-body);
          font-size: 14px;
          color: var(--muted);
        }
      `}</style>
    </section>
  );
}