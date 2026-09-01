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
 * Holographic Earth with Kollam, Kerala, India facing front-center
 * Globe group rotation: X=0.15 (slight tilt) Y=-1.25 (India forward-left facing camera)
 */
function StaticGlobeGroup() {
  return (
    <group rotation={[0.15, -1.25, 0]}>
      <ParticleGlobe />
      <KeralaMarker />
    </group>
  );
}

export default function GlobeScene() {
  return (
    <div
      className="globe-container"
      role="img"
      aria-label="3D Interactive Holographic Globe showing Kollam, Kerala, India"
    >
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
          <Atmosphere />
          <StaticGlobeGroup />
          <OrbitRings />
        </Suspense>
      </Canvas>
    </div>
  );
}