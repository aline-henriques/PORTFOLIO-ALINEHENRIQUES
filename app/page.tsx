"use client";

import BackgroundFX from "@/components/BackgroundFX";
import MouseGlow from "@/components/MouseGlow";
import Cursor from "@/components/Cursor";
import ScrollProgress from "@/components/ScrollProgress";
import ScrollReveal from "@/components/ScrollReveal";
<<<<<<< HEAD
=======
import HardSkillsGrid from "@/components/HardSkillsGrid";
>>>>>>> ed3c6234f892404c6ecaba38b8cb84f3c6c6594b
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
<<<<<<< HEAD
=======
        <HardSkillsGrid />
>>>>>>> ed3c6234f892404c6ecaba38b8cb84f3c6c6594b
        <Projects />
        <Contact />
      </main>

      <Footer />
    </>
  );
}