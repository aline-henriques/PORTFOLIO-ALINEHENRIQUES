"use client";

import Image from "next/image";

const onCardMove = (e: React.MouseEvent<HTMLDivElement>) => {
  const rect = e.currentTarget.getBoundingClientRect();
  const x = ((e.clientX - rect.left) / rect.width) * 100;
  const y = ((e.clientY - rect.top) / rect.height) * 100;
  e.currentTarget.style.setProperty("--x", `${x}%`);
  e.currentTarget.style.setProperty("--y", `${y}%`);
};

export default function About() {
  return (
    <section id="sobre" className="py-28">
      <div className="container-padrao">

        {/* ── layout foto + texto ── */}
        <div className="about-layout">

          {/* coluna esquerda: foto com blob */}
          <div className="about-photo-wrap">
            <div className="about-blob" />
            <div className="about-frame">
              <Image
                src="/aline.png"
                alt="Aline Henriques"
                width={300}
                height={360}
                priority
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center top",
                }}
              />
            </div>

            {/* badge de disponibilidade */}
            <div className="about-status">
              <span className="about-status-dot" />
              Disponível para Projetos :D
            </div>
          </div>

          {/* coluna direita: texto */}
          <div className="about-text">
            <h2>
              Olá! Eu sou a<br />
              <em>Aline Henriques</em>
            </h2>

            <p className="about-bio">
              Estudante de Ciência da Computação na Universidade Católica de Pernambuco,
              atuando como desenvolvedora Fullstack e Web Designer — criando interfaces
              modernas que unem performance, estética e estratégia.
            </p>

            <p className="about-quote">
              "Código limpo não é só técnica, é respeito por quem vai usar."
            </p>

            {/* facts */}
            <div className="about-facts">
              <div className="about-fact">
                <div className="about-fact-icon">📍</div>
                <div className="about-fact-label">Localização</div>
                <div className="about-fact-value">Recife, PE</div>
              </div>
              <div className="about-fact">
                <div className="about-fact-icon">🎓</div>
                <div className="about-fact-label">Estudando</div>
                <div className="about-fact-value">Ciência da Computação</div>
              </div>
              <div className="about-fact">
                <div className="about-fact-icon">⚡</div>
                <div className="about-fact-label">Foco atual</div>
                <div className="about-fact-value">Fullstack + UI/UX</div>
              </div>
              <div className="about-fact">
                <div className="about-fact-icon">🌙</div>
                <div className="about-fact-label">Resposta</div>
                <div className="about-fact-value">Menos de 24h</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── pilares ── */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="premium-card" onMouseMove={onCardMove}>
            <p className="card-kicker">Pilar</p>
            <h3 className="text-xl font-semibold mt-2 gold-gradient">Performance</h3>
            <p className="mt-3 text-white/65">
              Código limpo, otimização e experiência fluida.
            </p>
          </div>

          <div className="premium-card" onMouseMove={onCardMove}>
            <p className="card-kicker">Pilar</p>
            <h3 className="text-xl font-semibold mt-2 gold-gradient">Design Chic</h3>
            <p className="mt-3 text-white/65">
              UI / UX elegante, moderna e com consistência visual.
            </p>
          </div>

          <div className="premium-card" onMouseMove={onCardMove}>
            <p className="card-kicker">Pilar</p>
            <h3 className="text-xl font-semibold mt-2 gold-gradient">Dados</h3>
            <p className="mt-3 text-white/65">
              Decisões embasadas em métricas, análise e clareza.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}