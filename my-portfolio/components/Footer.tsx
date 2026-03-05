export default function Footer() {
  const year = new Date().getFullYear();

  const NAV = [
    { label: "Sobre",    href: "#sobre"    },
    { label: "Skills",   href: "#skills"   },
    { label: "Projetos", href: "#projetos" },
    { label: "Contato",  href: "#contato"  },
  ];

  const SOCIAL = [
    { label: "GitHub",   href: "https://github.com/aline-henriques"           },
    { label: "LinkedIn", href: "https://linkedin.com/in/aline-henriques"       },
    { label: "E-mail",   href: "mailto:alinealbhenriques@gmail.com"            },
  ];

  return (
    <footer className="footer">
      <div className="container-padrao">

        {/* ── topo ── */}
        <div className="footer-top">

          {/* identidade */}
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="gold-gradient font-bold text-sm">AH</span>
            </div>
            <div>
              <p className="footer-name gold-gradient">Aline Henriques</p>
              <p className="footer-role">Desenvolvedora Fullstack & Web Designer</p>
            </div>
          </div>

          {/* nav links */}
          <nav className="footer-nav">
            <p className="footer-col-title">Navegação</p>
            {NAV.map(l => (
              <a key={l.label} href={l.href} className="footer-link">{l.label}</a>
            ))}
          </nav>

          {/* social */}
          <div className="footer-social-col">
            <p className="footer-col-title">Redes</p>
            {SOCIAL.map(l => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
              >
                {l.label} ↗
              </a>
            ))}
          </div>

        </div>

        {/* ── divisor ── */}
        <div className="footer-divider" />

        {/* ── rodapé final ── */}
        <div className="footer-bottom">
          <p className="footer-copy">
            © {year} Aline Henriques — Feito com 💛 em Recife, PE
          </p>
          <p className="footer-copy">Licença MIT</p>
        </div>

      </div>

      <style jsx>{`
        .footer {
          border-top: 1px solid var(--border);
          background: rgba(7,7,17,.6);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          transition: background .4s ease;
        }

        /* topo */
        .footer-top {
          display: grid;
          grid-template-columns: 1.6fr 1fr 1fr;
          gap: 48px;
          padding: 64px 0 48px;
        }
        @media (max-width: 640px) {
          .footer-top { grid-template-columns: 1fr; gap: 32px; padding: 48px 0 36px; }
        }

        /* brand */
        .footer-brand {
          display: flex;
          align-items: flex-start;
          gap: 14px;
        }
        .footer-logo {
          width: 40px; height: 40px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,.10);
          background: rgba(255,255,255,.05);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .footer-name {
          font-family: var(--font-display);
          font-size: 17px;
          font-weight: 700;
          letter-spacing: -.2px;
          line-height: 1.2;
        }
        .footer-role {
          font-family: var(--font-body);
          font-size: 12px;
          color: var(--muted);
          margin-top: 4px;
          font-weight: 300;
          line-height: 1.5;
        }

        /* colunas */
        .footer-col-title {
          font-family: var(--font-display);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: .14em;
          text-transform: uppercase;
          color: var(--muted);
          margin-bottom: 16px;
        }
        .footer-nav,
        .footer-social-col {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .footer-link {
          font-family: var(--font-body);
          font-size: 14px;
          color: rgba(255,255,255,.55);
          text-decoration: none;
          width: fit-content;
          transition: color .2s, transform .2s;
        }
        .footer-link:hover {
          color: var(--text);
          transform: translateX(3px);
        }

        /* divisor */
        .footer-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--border), transparent);
        }

        /* rodapé */
        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 24px 0;
          gap: 12px;
          flex-wrap: wrap;
        }
        .footer-copy {
          font-family: var(--font-body);
          font-size: 12px;
          color: rgba(255,255,255,.35);
          font-weight: 300;
        }
        [data-theme="light"] .footer-copy { color: rgba(10,8,20,.35); }
        [data-theme="light"] .footer-link { color: rgba(10,8,20,.50); }
        [data-theme="light"] .footer-link:hover { color: rgba(10,8,20,.85); }
      `}</style>
    </footer>
  );
}