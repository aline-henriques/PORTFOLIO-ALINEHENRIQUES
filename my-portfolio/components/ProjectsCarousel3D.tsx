"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox, Html } from "@react-three/drei";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";

const PROJECTS = [
  {
    title: "Dei Tilti",
    desc: "Plataforma em React (saúde mental).",
    url: "https://github.com/aline-henriques/PROJETO-2",
    stack: ["React", "Frontend"],
  },
  {
    title: "Gomes Cachaçaria",
    desc: "Ecommerce: Spring Boot + React + DB.",
    url: "https://github.com/aline-henriques/PROJETO-POO",
    stack: ["Spring Boot", "React", "API"],
  },
  {
    title: "Ecommerce Analytics",
    desc: "Análise de dados com Python e Pandas.",
    url: "https://github.com/aline-henriques/ECOMMERCE-ANALYTICS",
    stack: ["Python", "Pandas", "Data"],
  },
];

function Card({
  index,
  total,
  active,
  setActive,
  title,
  desc,
  url,
  stack,
}: any) {
  const ref = useRef<THREE.Mesh>(null!);

  const angle = (index / total) * Math.PI * 2;
  const radius = 3.4;

  const pos = useMemo(() => {
    return new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius);
  }, [angle]);

  useFrame((_, dt) => {
    if (!ref.current) return;

    // suaviza foco
    const targetY = index === active ? 0.1 : 0;
    ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, targetY, 0.06);

    const targetScale = index === active ? 1.08 : 1;
    ref.current.scale.setScalar(THREE.MathUtils.lerp(ref.current.scale.x, targetScale, 0.06));

    // sempre olha pro centro
    ref.current.lookAt(0, 0, 0);
  });

  return (
    <group position={pos}>
      <RoundedBox
        ref={ref}
        args={[2.2, 1.25, 0.18]}
        radius={0.15}
        smoothness={8}
        onPointerOver={() => setActive(index)}
        onClick={() => window.open(url, "_blank")}
      >
        <meshStandardMaterial
          color="#0f0f1f"
          roughness={0.25}
          metalness={0.25}
          emissive={index === active ? "#ff5fa2" : "#000000"}
          emissiveIntensity={index === active ? 0.18 : 0}
        />

        <Html center transform distanceFactor={2.2}>
          <div className={`c3d-card ${index === active ? "is-active" : ""}`}>
            <div className="c3d-kicker">Projeto</div>
            <div className="c3d-title">{title}</div>
            <div className="c3d-desc">{desc}</div>
            <div className="c3d-tags">
              {stack.map((s: string) => (
                <span key={s} className="c3d-tag">{s}</span>
              ))}
            </div>
            <div className="c3d-link">Abrir no GitHub ↗</div>
          </div>
        </Html>
      </RoundedBox>
    </group>
  );
}

function Scene() {
  const [active, setActive] = useState(0);
  const group = useRef<THREE.Group>(null!);

  useFrame((state, dt) => {
    if (!group.current) return;
    // gira devagar
    group.current.rotation.y += dt * 0.18;

    // “puxa” o active pra frente (sensação carrossel)
    const target = -((active / PROJECTS.length) * Math.PI * 2);
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, target, 0.05);
  });

  return (
    <>
      <ambientLight intensity={0.85} />
      <directionalLight position={[6, 6, 6]} intensity={1.2} />
      <group ref={group}>
        {PROJECTS.map((p, i) => (
          <Card
            key={p.title}
            index={i}
            total={PROJECTS.length}
            active={active}
            setActive={setActive}
            {...p}
          />
        ))}
      </group>
    </>
  );
}

export default function ProjectsCarousel3D() {
  return (
    <div className="projects3d-wrap">
      <Canvas camera={{ position: [0, 1.3, 7], fov: 55 }} dpr={[1, 2]}>
        <Scene />
      </Canvas>
    </div>
  );
}