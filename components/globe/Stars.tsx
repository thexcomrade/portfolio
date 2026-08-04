"use client";

import { memo, useMemo } from "react";
import * as THREE from "three";

const STAR_COUNT = 3500;
const STAR_FIELD_RADIUS = 28;

// Generate positions and colors at module scope
const staticPositions = new Float32Array(STAR_COUNT * 3);
const staticColors = new Float32Array(STAR_COUNT * 3);

for (let i = 0; i < STAR_COUNT; i++) {
  const r = STAR_FIELD_RADIUS + Math.random() * 12;
  const theta = Math.random() * Math.PI * 2;
  const phi = Math.acos(2 * Math.random() - 1);

  staticPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
  staticPositions[i * 3 + 1] = r * Math.cos(phi);
  staticPositions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);

  const rand = Math.random();
  let color: THREE.Color;

  if (rand < 0.7) {
    color = new THREE.Color("#ffffff");
  } else if (rand < 0.9) {
    color = new THREE.Color("#38bdf8");
  } else {
    color = new THREE.Color("#c084fc");
  }

  staticColors[i * 3] = color.r;
  staticColors[i * 3 + 1] = color.g;
  staticColors[i * 3 + 2] = color.b;
}

function Stars() {
  const geometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();

    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(staticPositions, 3)
    );

    geometry.setAttribute(
      "color",
      new THREE.BufferAttribute(staticColors, 3)
    );

    return geometry;
  }, []);

  const material = useMemo(() => {
    return new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
  }, []);

  return (
    <points
      geometry={geometry}
      material={material}
    />
  );
}

export default memo(Stars);