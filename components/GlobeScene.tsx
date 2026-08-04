"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import ParticleGlobe from "./globe/ParticleGlobe";
import OrbitRings from "./globe/OrbitRings";
import Lights from "./globe/Lights";
import Atmosphere from "./globe/Atmosphere";
import KeralaMarker from "./globe/KeralaMarker";
import Stars from "./globe/Stars";

/**
 * Static Holographic Earth (No rotation!)
 * India facing front-center, Africa on left, Australia on right.
 * Globe group rotation: X=0.18 (slight tilt) Y=Math.PI*0.88 (India forward)
 */
function StaticGlobeGroup() {
  return (
    <group rotation={[0.18, Math.PI * 0.88, 0]}>
      <ParticleGlobe />
      <KeralaMarker />
    </group>
  );
}

export default function GlobeScene() {
  return (
    <div className="globe-container">
      <Canvas
        camera={{
          position: [0, 0, 3.8],
          fov: 52,
          near: 0.1,
          far: 100,
        }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <Suspense fallback={null}>
          <Lights />
          <Stars />
          <Atmosphere />
          <StaticGlobeGroup />
          <OrbitRings />
        </Suspense>
      </Canvas>
    </div>
  );
}