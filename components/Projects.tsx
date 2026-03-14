"use client";

import { motion } from "framer-motion";
import Image from "next/image";

type Project = {
  title: string;
  desc: string;
  tags: string[];
  link: string;
  accent?: string;
  comingSoon?: boolean;
  image?: string;
};

const PROJECTS: Project[] = [
  {
    title: "Dei Tilti",
    desc: "Projeto acadêmico desenvolvido em React, com foco em saúde mental.",
    tags: ["React", "Frontend"],
    link: "https://github.com/aline-henriques/PROJETO-2",
    accent: "rgba(255,95,162,.18)",
    image: "/deitilti.png",
  },
  {
    title: "Gomes Cachaçaria",
    desc: "Projeto acadêmico de Ecommerce com backend em Java Spring Boot e Frontend em React.",
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
  {
    title: "Lumière Salon",
    desc: "Landing page de salão de beleza premium com Next.js e Tailwind CSS.",
    tags: ["Next.js", "Tailwind", "Frontend"],
    link: "https://github.com/aline-henriques/LUMIERE-SALON",
    accent: "rgba(196,80,58,.18)",
    image: "/lumiere.png",
  },
  {
    title: "Portfólio Cliente",
    desc: "Portfólio pessoal desenvolvido para cliente com design sofisticado.",
    tags: ["Next.js", "UI/UX", "Frontend"],
    link: "#",
    accent: "rgba(184,150,90,.18)",
    image: "/fernando.portfolio.png",
  },
  {
    title: "Em breve...",
    desc: "Novo projeto em desenvolvimento.",
    tags: [],
    link: "#",
    comingSoon: true,
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
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          Projetos
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {PROJECTS.map((p, i) => (
            <motion.div
              key={`${p.title}-${i}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
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

function ProjectCard({ title, desc, tags, link, accent, comingSoon, image }: Project) {
  if (comingSoon) {
    return (
      <div className="project-card block opacity-40 cursor-default select-none">
        <div
          className="project-cover"
          style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <span
            style={{
              fontSize: 13,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.3)",
              fontWeight: 300,
            }}
          >
            Em breve...
          </span>
        </div>
        <div className="project-body">
          <h3 style={{ opacity: 0.4 }}>{title}</h3>
          <p style={{ opacity: 0.4 }}>{desc}</p>
        </div>
      </div>
    );
  }

  return (<a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="project-card block group"
    >
      <div className="project-cover" style={{ position: "relative", overflow: "hidden" }}>

        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            style={{ objectFit: "cover" }}
            className="transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="project-mockup">
            <div className="mock-bar accent" />
            <div className="mock-bar short" />
            <div className="mock-blocks">
              <div className="mock-block" style={{ background: accent }} />
              <div className="mock-block" />
              <div className="mock-block" />
              <div
                className="mock-block"
                style={{ background: accent, opacity: 0.6 }}
              />
            </div>
          </div>
        )}

        <div className="project-overlay">
          <div className="project-cta">Ver projeto ↗</div>
        </div>

      </div>

      <div className="project-body">
        <h3>{title}</h3>
        <p>{desc}</p>
        <div className="project-tags">
          {tags.map((t) => (
            <span key={t} className="tag">
              {t}
            </span>
          ))}
        </div>
      </div>
    </a>
  );
}


