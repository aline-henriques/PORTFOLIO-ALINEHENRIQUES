"use client";

import { motion } from "framer-motion";
import PlanetOrb from "@/components/PlanetOrb";

export default function Hero(){

return(

<section className="relative min-h-screen flex items-center justify-center overflow-hidden">

{/* planeta 3D decorativo */}
<PlanetOrb />

<div className="container-padrao text-center relative z-10">

<motion.h1
className="hero-title gold-gradient text-6xl md:text-7xl"
initial={{opacity:0,y:40}}
animate={{opacity:1,y:0}}
transition={{duration:.8}}
>

Aline Henriques

</motion.h1>

<motion.p
className="hero-subtitle"
initial={{opacity:0,y:30}}
animate={{opacity:1,y:0}}
transition={{delay:.6}}
>

Desenvolvedora Fullstack e Web Designer

</motion.p>

<motion.div
className="mt-14 flex flex-wrap justify-center gap-6"
initial={{opacity:0,y:20}}
animate={{opacity:1,y:0}}
transition={{delay:1}}
>

<a href="#projetos" className="btn-modern">
Ver projetos
</a>

<a href="/curriculo.pdf" download className="btn-outline">
Baixar currículo
</a>

</motion.div>

</div>

</section>

)

}