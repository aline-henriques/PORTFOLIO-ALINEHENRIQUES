"use client";

import { useEffect, useRef, useState } from "react";

type Star = {
  x: number;
  y: number;
  r: number;
  a: number;   // alpha
  tw: number;  // twinkle speed
  vx: number;
  vy: number;
};

type ShootingStar = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;   // 1 -> 0
};

const PROJECTS = [
  {
    name: "Dei Tilti",
    url: "https://github.com/aline-henriques/PROJETO-2",
    x: 62, // %
    y: 28, // %
  },
  {
    name: "Gomes Cachaçaria",
    url: "https://github.com/aline-henriques/PROJETO-POO",
    x: 74,
    y: 56,
  },
  {
    name: "Ecommerce Analytics",
    url: "https://github.com/aline-henriques/ECOMMERCE-ANALYTICS",
    x: 40,
    y: 62,
  },
];

export default function BackgroundFX() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  const starsRef = useRef<Star[]>([]);
  const shootersRef = useRef<ShootingStar[]>([]);

  const pointerRef = useRef({ x: 0.5, y: 0.5 });
  const scrollRef = useRef({ y: 0, v: 0 });

  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let lastScrollY = window.scrollY;

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.floor((w * h) / 14000);
      const stars: Star[] = [];

      for (let i = 0; i < count; i++) {
        const r = Math.random() * 1.25 + 0.2;
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r,
          a: Math.random() * 0.55 + 0.2,
          tw: Math.random() * 0.015 + 0.004,
          vx: (Math.random() - 0.5) * 0.06,
          vy: (Math.random() - 0.5) * 0.06,
        });
      }
      starsRef.current = stars;
    };

    const onMove = (e: MouseEvent) => {
      pointerRef.current = {
        x: e.clientX / Math.max(1, window.innerWidth),
        y: e.clientY / Math.max(1, window.innerHeight),
      };
    };

    const onScroll = () => {
      const y = window.scrollY;
      const v = y - lastScrollY; // velocidade aproximada
      lastScrollY = y;
      scrollRef.current = { y, v };
    };

    const maybeSpawnShootingStar = (w: number, h: number) => {
      // spawn “ocasional” e elegante
      // chance baixa por frame -> dá ~1 a cada 8–16s (dependendo de FPS)
      if (Math.random() < 0.003) {
        const startX = Math.random() * w * 0.8;
        const startY = Math.random() * h * 0.35;
        shootersRef.current.push({
          x: startX,
          y: startY,
          vx: 10 + Math.random() * 6,
          vy: 4 + Math.random() * 3,
          life: 1,
        });
      }
    };

    const draw = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      ctx.clearRect(0, 0, w, h);

      // Parallax MUITO sutil por ponteiro
      const px = (pointerRef.current.x - 0.5) * 10;
      const py = (pointerRef.current.y - 0.5) * 10;

      // Reação ao scroll: aumenta levemente o drift quando rola
      const scrollBoost = Math.min(6, Math.abs(scrollRef.current.v) * 0.06);

      // névoa/aurora leve
      const g = ctx.createRadialGradient(w * 0.2 + px, h * 0.2 + py, 50, w * 0.2, h * 0.2, 900);
      g.addColorStop(0, "rgba(255,95,162,0.05)");
      g.addColorStop(0.5, "rgba(199,167,255,0.04)");
      g.addColorStop(1, "rgba(215,180,90,0.03)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      // estrelas
      for (const s of starsRef.current) {
        s.x += s.vx * (1 + scrollBoost * 0.05);
        s.y += s.vy * (1 + scrollBoost * 0.05);

        if (s.x < -5) s.x = w + 5;
        if (s.x > w + 5) s.x = -5;
        if (s.y < -5) s.y = h + 5;
        if (s.y > h + 5) s.y = -5;

        s.a += (Math.random() - 0.5) * s.tw;
        s.a = Math.max(0.12, Math.min(0.95, s.a));

        ctx.beginPath();
        ctx.fillStyle = `rgba(255,255,255,${s.a})`;
        ctx.arc(s.x + px * 0.15, s.y + py * 0.15, s.r, 0, Math.PI * 2);
        ctx.fill();

        if (s.r > 1.15 && Math.random() < 0.02) {
          ctx.beginPath();
          ctx.fillStyle = `rgba(215,180,90,${s.a * 0.12})`;
          ctx.arc(s.x + px * 0.15, s.y + py * 0.15, s.r * 4.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // estrela cadente
      maybeSpawnShootingStar(w, h);
      const shooters = shootersRef.current;

      shootersRef.current = shooters
        .map((sh) => {
          const nx = sh.x + sh.vx;
          const ny = sh.y + sh.vy;
          const nlife = sh.life - 0.02;

          // rastro
          ctx.beginPath();
          ctx.strokeStyle = `rgba(255,255,255,${Math.max(0, nlife) * 0.55})`;
          ctx.lineWidth = 2;
          ctx.lineCap = "round";
          ctx.moveTo(nx + px * 0.08, ny + py * 0.08);
          ctx.lineTo(nx - sh.vx * 1.8 + px * 0.08, ny - sh.vy * 1.8 + py * 0.08);
          ctx.stroke();

          // brilho dourado suave
          ctx.beginPath();
          ctx.strokeStyle = `rgba(215,180,90,${Math.max(0, nlife) * 0.25})`;
          ctx.lineWidth = 5;
          ctx.moveTo(nx + px * 0.08, ny + py * 0.08);
          ctx.lineTo(nx - sh.vx * 1.2 + px * 0.08, ny - sh.vy * 1.2 + py * 0.08);
          ctx.stroke();

          return { ...sh, x: nx, y: ny, life: nlife };
        })
        .filter((sh) => sh.life > 0 && sh.x < w + 120 && sh.y < h + 120);

      rafRef.current = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="bgfx" aria-hidden="true">
      <canvas ref={canvasRef} className="bgfx-canvas" />

      {/* constelação interativa: clicável */}
      <div className="constellation-layer" aria-hidden="false">
        {/* linhas */}
        <svg className="constellation-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path
            d={`M${PROJECTS[0].x} ${PROJECTS[0].y} L${PROJECTS[1].x} ${PROJECTS[1].y} L${PROJECTS[2].x} ${PROJECTS[2].y}`}
            fill="none"
            stroke="rgba(255,255,255,0.14)"
            strokeWidth="0.35"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* nós */}
        {PROJECTS.map((p) => (
          <a
            key={p.name}
            className="constellation-node"
            style={{ left: `${p.x}%`, top: `${p.y}%` }}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setHovered(p.name)}
            onMouseLeave={() => setHovered(null)}
          >
            <span className="node-dot" />
            <span className={`node-tooltip ${hovered === p.name ? "show" : ""}`}>
              {p.name} ↗
            </span>
          </a>
        ))}
      </div>

      {/* doodles gráficos (decor) */}
      <div className="bgfx-doodles">
        <svg className="doodle doodle-1" viewBox="0 0 600 200" fill="none">
          <path
            d="M20 150 C120 20, 260 220, 380 70 C470 -20, 560 160, 590 40"
            stroke="rgba(255,255,255,0.14)"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>

        <svg className="doodle doodle-2" viewBox="0 0 220 220" fill="none">
          <defs>
            <radialGradient id="rg" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(110 110) rotate(90) scale(110)">
              <stop stopColor="rgba(255,95,162,0.22)" />
              <stop offset="0.6" stopColor="rgba(199,167,255,0.16)" />
              <stop offset="1" stopColor="rgba(215,180,90,0.0)" />
            </radialGradient>
          </defs>
          <circle cx="110" cy="110" r="88" stroke="rgba(255,255,255,0.12)" strokeWidth="2" />
          <circle cx="110" cy="110" r="110" fill="url(#rg)" />
        </svg>

        <svg className="doodle doodle-3" viewBox="0 0 300 300" fill="none">
          {Array.from({ length: 6 }).map((_, i) => (
            <path key={i} d={`M${30 + i * 40} 20 V280`} stroke="rgba(255,255,255,0.07)" strokeWidth="2" />
          ))}
          {Array.from({ length: 6 }).map((_, i) => (
            <path key={`h-${i}`} d={`M20 ${30 + i * 40} H280`} stroke="rgba(255,255,255,0.07)" strokeWidth="2" />
          ))}
        </svg>
      </div>
    </div>
  );
}