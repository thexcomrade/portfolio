"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import ParticleGlobe from "./globe/ParticleGlobe";
import OrbitRings from "./globe/OrbitRings";
import Lights from "./globe/Lights";
import Atmosphere from "./globe/Atmosphere";
import KeralaMarker from "./globe/KeralaMarker";

/**
 * Static orientation group positioning India & Kerala in front-facing hero view
 * X = 0.18 (slight downward tilt), Y = -1.22 (brings India and Kollam to front-center)
 */
function StaticGlobeGroup() {
  return (
    <group rotation={[0.18, -1.22, 0]}>
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
      aria-label="3D Interactive Holographic Particle Globe showing Kollam, Kerala, India"
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
      }}
    >
      <Canvas
        camera={{
          position: [0, 0, 3.85],
          fov: 50,
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
