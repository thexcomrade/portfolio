"use client";

import { memo } from "react";
import { Line } from "@react-three/drei";
import * as THREE from "three";

function OrbitRing({
  radius,
  color,
  tiltX = 0,
  tiltY = 0,
  tiltZ = 0,
}: {
  radius: number;
  color: string;
  tiltX?: number;
  tiltY?: number;
  tiltZ?: number;
}) {
  const points = [];
  const segments = 256;

  for (let i = 0; i <= segments; i++) {
    const theta = (i / segments) * Math.PI * 2;
    points.push(
      new THREE.Vector3(
        Math.cos(theta) * radius,
        Math.sin(theta) * radius,
        0
      )
    );
  }

  return (
    <group rotation={[tiltX, tiltY, tiltZ]}>
      <Line
        points={points}
        color={color}
        transparent
        opacity={0.35}
        lineWidth={1.2}
      />
    </group>
  );
}

function OrbitRings() {
  return (
    <group>
      {/* Large Outer Ring */}
      <OrbitRing
        radius={1.98}
        color="#8b5cf6"
        tiltX={0.5}
        tiltY={0.2}
        tiltZ={0.3}
      />

      {/* Middle Ring */}
      <OrbitRing
        radius={1.74}
        color="#38bdf8"
        tiltX={1.1}
        tiltY={0.8}
        tiltZ={-0.2}
      />

      {/* Inner Ring */}
      <OrbitRing
        radius={1.54}
        color="#c084fc"
        tiltX={0.2}
        tiltY={1.4}
        tiltZ={0.5}
      />
    </group>
  );
}

export default memo(OrbitRings);