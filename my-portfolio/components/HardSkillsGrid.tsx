"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

type Skill = {
  name: string;
  icon: string;
  pct: number;   // 0-100
  color?: string;
};

const SKILLS: Skill[] = [
  { name: "React / Next.js",        icon: "/skills/React.png",      pct: 88, color: "var(--rose)" },
  { name: "JavaScript",             icon: "/skills/JS.png",         pct: 85, color: "var(--gold)" },
  { name: "TypeScript",             icon: "/skills/TS.png",         pct: 80, color: "var(--lilac)" },
  { name: "Java",                   icon: "/skills/Java.png",       pct: 65, color: "var(--rose)" },
  { name: "Spring Boot",            icon: "/skills/SpringBoot.png", pct: 65, color: "var(--mint)" },
  { name: "Python",                 icon: "/skills/Python.png",     pct: 95, color: "var(--gold)" },
  { name: "Git",                    icon: "/skills/Git.png",        pct: 82, color: "var(--rose)" },
  { name: "Node.js",                icon: "/skills/Node.png",       pct: 70, color: "var(--mint)" },
  { name: "C",                      icon: "/skills/C.png",          pct: 65, color: "var(--lilac)" },
];

const CATEGORIES = [
  { label: "Frontend",   color: "var(--rose)",  chips: ["React", "Next.js", "TypeScript", "Tailwind", "CSS"] },
  { label: "Backend",    color: "var(--lilac)", chips: ["Java", "Spring Boot", "Node.js", "Python", "REST API"] },
  { label: "Ferramentas",color: "var(--gold)",  chips: ["Git", "Figma", "Pandas", "C", "Pacote Office", "Trello", "Google Workspace", "Canva"] },
];

export default function HardSkillsGrid() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const barsRef    = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          barsRef.current.forEach((bar) => {
            if (bar) bar.classList.add("bar-go");
          });
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" className="py-28" ref={sectionRef}>
      <div className="container-padrao">
        <h2 className="section-title">Hard Skills</h2>

        {/* ── grid de ícones ── */}
        <div className="skills-grid">
          {SKILLS.map((s) => (
            <div key={s.name} className="skill-tile">
              <div className="skill-shine" />
              <Image
                src={s.icon}
                alt={s.name}
                width={64}
                height={64}
                className="skill-icon"
                unoptimized
              />
            </div>
          ))}
        </div>

        {/* ── barras + categorias ── */}
        <div className="skills-detail">

          {/* barras de proficiência */}
          <div>
            <p className="skills-col-label">Proficiência</p>
            {SKILLS.map((s, i) => (
              <div key={s.name} className="skill-bar-item">
                <div className="skill-bar-top">
                  <span className="skill-bar-name">{s.name}</span>
                  <span className="skill-bar-pct">{s.pct}%</span>
                </div>
                <div className="skill-bar-track">
                  <div
                    className="skill-bar-fill"
                    ref={(el) => { if (el) barsRef.current[i] = el; }}
                    style={{
                      "--bar-w": `${s.pct}%`,
                      "--bar-color": s.color ?? "var(--gold)",
                      animationDelay: `${i * 0.08}s`,
                    } as React.CSSProperties}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* chips por categoria */}
          <div>
            <p className="skills-col-label">Por categoria</p>
            {CATEGORIES.map((cat) => (
              <div key={cat.label} className="skill-cat">
                <p className="skill-cat-label" style={{ color: cat.color }}>
                  {cat.label}
                </p>
                <div className="skill-chips">
                  {cat.chips.map((chip) => (
                    <span key={chip} className="skill-chip">{chip}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ── estilos internos (scoped) ── */}
      <style jsx>{`
        .skills-detail {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          margin-top: 56px;
        }
        @media (max-width: 720px) {
          .skills-detail { grid-template-columns: 1fr; gap: 36px; }
        }

        .skills-col-label {
          font-family: var(--font-display);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: .14em;
          text-transform: uppercase;
          color: var(--muted);
          margin-bottom: 24px;
          padding-bottom: 10px;
          border-bottom: 1px solid var(--border);
        }

        /* barras */
        .skill-bar-item { margin-bottom: 20px; }
        .skill-bar-top  {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 7px;
        }
        .skill-bar-name {
          font-family: var(--font-display);
          font-size: 13px;
          font-weight: 600;
          color: var(--text);
        }
        .skill-bar-pct {
          font-family: var(--font-body);
          font-size: 11px;
          color: var(--muted);
          font-variant-numeric: tabular-nums;
        }
        .skill-bar-track {
          height: 5px;
          border-radius: 999px;
          background: rgba(255,255,255,.07);
          overflow: hidden;
        }
        .skill-bar-fill {
          height: 100%;
          border-radius: 999px;
          width: 0;
          background: linear-gradient(90deg, var(--bar-color, var(--gold)), var(--rose));
          transition: width 1s cubic-bezier(.2,.8,.2,1);
          transition-delay: var(--bar-delay, 0s);
        }
        .skill-bar-fill.bar-go {
          width: var(--bar-w, 50%);
        }

        /* chips */
        .skill-cat { margin-bottom: 26px; }
        .skill-cat-label {
          font-family: var(--font-display);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: .14em;
          text-transform: uppercase;
          margin-bottom: 10px;
        }
        .skill-chips { display: flex; flex-wrap: wrap; gap: 8px; }
        .skill-chip {
          font-family: var(--font-body);
          font-size: 12px;
          padding: 6px 14px;
          border-radius: 999px;
          border: 1px solid var(--border);
          background: var(--card);
          color: var(--muted);
          cursor: default;
          transition: border-color .2s, background .2s, color .2s;
        }
        .skill-chip:hover {
          border-color: rgba(215,180,90,.4);
          background: rgba(215,180,90,.07);
          color: var(--text);
        }
      `}</style>
    </section>
  );
}