"use client";

import BackgroundFX from "@/components/BackgroundFX";
import MouseGlow from "@/components/MouseGlow";
import Cursor from "@/components/Cursor";
import ScrollProgress from "@/components/ScrollProgress";
import ScrollReveal from "@/components/ScrollReveal";
import HardSkillsGrid from "@/components/HardSkillsGrid";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      {/* fundo animado (sempre atrás) */}
      <BackgroundFX />

      {/* efeitos */}
      <MouseGlow />
      <Cursor />
      <ScrollProgress />
      <ScrollReveal />

      {/* conteúdo */}
      <Navbar />

      <main className="relative z-10">
        <Hero />
        <About />
        <HardSkillsGrid />
        <Projects />
        <Contact />
      </main>

      <Footer />
    </>
  );
}