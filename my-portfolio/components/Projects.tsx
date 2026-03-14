"use client";

import { motion } from "framer-motion";

type Project = {
  title: string;
  desc: string;
  tags: string[];
  link: string;
  accent?: string; // cor de destaque do mock
};

const PROJECTS: Project[] = [
  {
    title: "Dei Tilti",
    desc: "Plataforma desenvolvida em React, com foco em saúde mental.",
    tags: ["React", "Frontend"],
    link: "https://github.com/aline-henriques/PROJETO-2",
    accent: "rgba(255,95,162,.18)",
  },
  {
    title: "Gomes Cachaçaria",
    desc: "Ecommerce com backend em Java Spring Boot e Frontend em React.",
    tags: ["Spring Boot", "React", "API"],
    link: "https://github.com/aline-henriques/PROJETO-POO",
    accent: "rgba(199,167,255,.18)",
  },
  {
    title: "E-commerce Analytics",
    desc: "Análise de dados de ecommerce usando Python e Pandas.",
    tags: ["Python", "Data", "Pandas"],
    link: "https://github.com/aline-henriques/ECOMMERCE-ANALYTICS",
    accent: "rgba(124,247,212,.15)",
  },
];

export default function Projects() {
  return (
    <section id="projetos" className="py-32">
      <div className="container-padrao">

        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: .7 }}
          viewport={{ once: true }}
        >
          Projetos
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {PROJECTS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: .6, delay: i * 0.12 }}
              viewport={{ once: true }}
            >
              <ProjectCard {...p} />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

function ProjectCard({ title, desc, tags, link, accent }: Project) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="project-card block"
    >
      {/* ── cover com mock animado ── */}
      <div className="project-cover">

        {/* mock de UI — aparece no hover */}
        <div className="project-mockup">
          <div className="mock-bar accent" />
          <div className="mock-bar short" />
          <div className="mock-blocks">
            <div className="mock-block" style={{ background: accent }} />
            <div className="mock-block" />
            <div className="mock-block" />
            <div className="mock-block" style={{ background: accent, opacity: .6 }} />
          </div>
        </div>

        {/* overlay com CTA */}
        <div className="project-overlay">
          <div className="project-cta">Ver projeto ↗</div>
        </div>

      </div>

      {/* ── corpo do card ── */}
      <div className="project-body">
        <h3>{title}</h3>
        <p>{desc}</p>
        <div className="project-tags">
          {tags.map(t => (
            <span key={t} className="tag">{t}</span>
          ))}
        </div>
      </div>
    </a>
  );
}