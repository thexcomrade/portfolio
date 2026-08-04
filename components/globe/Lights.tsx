"use client";

import { memo } from "react";

function Lights() {
  return (
    <>
      {/* Global ambient illumination */}
      <ambientLight intensity={0.35} />

      {/* Simulates sky + ground lighting */}
      <hemisphereLight
        args={["#7dd3fc", "#020617", 0.65]}
      />

      {/* Main purple light */}
      <pointLight
        position={[4, 3, 4]}
        intensity={55}
        color="#8b5cf6"
        distance={25}
        decay={2}
      />

      {/* Cyan rim light */}
      <pointLight
        position={[-4, -2, 5]}
        intensity={40}
        color="#22d3ee"
        distance={25}
        decay={2}
      />

      {/* Soft top fill light */}
      <directionalLight
        position={[0, 6, 2]}
        intensity={1.4}
        color="#ffffff"
      />

      {/* Back light for depth */}
      <directionalLight
        position={[0, -5, -6]}
        intensity={0.35}
        color="#a855f7"
      />
    </>
  );
}

export default memo(Lights);