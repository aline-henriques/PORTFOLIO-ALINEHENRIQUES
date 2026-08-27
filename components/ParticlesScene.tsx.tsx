"use client";

import { Canvas } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

export default function ParticlesScene() {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const count = 1800;
    const array = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const r = 1.5 * Math.cbrt(Math.random()); 
      const theta = THREE.MathUtils.randFloat(0, Math.PI * 2);
      const phi = Math.acos(THREE.MathUtils.randFloatSpread(2)); 

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      const idx = i * 3;
      array[idx] = x;
      array[idx + 1] = y;
      array[idx + 2] = z;
    }

    return array;
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 2] }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      <Points ref={ref} positions={positions} stride={3} frustumCulled>
        <PointMaterial
          transparent
          color="#ff5fa2"
          size={0.005}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
    </Canvas>
  );
}