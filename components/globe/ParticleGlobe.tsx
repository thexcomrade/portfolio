"use client";

import { useMemo } from "react";
import * as THREE from "three";

const RADIUS = 1.45;

/**
 * Creates a luminous radial glow texture for dots
 */
function createPointTexture() {
  if (typeof window === "undefined") return null;

  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
  gradient.addColorStop(0.3, "rgba(34, 211, 238, 0.9)");
  gradient.addColorStop(0.7, "rgba(139, 92, 246, 0.4)");
  gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

/**
 * Geographical Landmass Check for precise world continent rendering
 */
function checkLandmass(lat: number, lon: number): { isLand: boolean; isIndia: boolean } {
  // 1. India & Sri Lanka
  const isIndia = lat >= 5 && lat <= 36 && lon >= 68 && lon <= 97;
  if (isIndia) return { isLand: true, isIndia: true };

  // 2. East Asia, Southeast Asia, China, Japan, Indonesia
  if (lat >= -11 && lat <= 55 && lon >= 97 && lon <= 148) return { isLand: true, isIndia: false };

  // 3. Middle East & Arabian Peninsula
  if (lat >= 12 && lat <= 48 && lon >= 35 && lon <= 78) return { isLand: true, isIndia: false };

  // 4. Africa
  if (lat >= -35 && lat <= 37 && lon >= -18 && lon <= 52) return { isLand: true, isIndia: false };

  // 5. Europe
  if (lat >= 36 && lat <= 71 && lon >= -10 && lon <= 45) return { isLand: true, isIndia: false };

  // 6. Russia & Northern Asia
  if (lat >= 48 && lat <= 75 && lon >= 45 && lon <= 180) return { isLand: true, isIndia: false };

  // 7. Australia & New Zealand
  if (lat >= -47 && lat <= -10 && lon >= 113 && lon <= 178) return { isLand: true, isIndia: false };

  // 8. North America
  if (lat >= 14 && lat <= 75 && lon >= -168 && lon <= -52) return { isLand: true, isIndia: false };

  // 9. South America
  if (lat >= -56 && lat <= 13 && lon >= -82 && lon <= -34) return { isLand: true, isIndia: false };

  return { isLand: false, isIndia: false };
}

export default function ParticleGlobe() {
  const pointTexture = useMemo(() => createPointTexture(), []);

  const { landGeo, oceanGeo, gridLinesGeo } = useMemo(() => {
    const landPts: number[] = [];
    const landCols: number[] = [];
    const oceanPts: number[] = [];
    const oceanCols: number[] = [];

    const TOTAL_SAMPLES = 40000;
    const goldenRatio = (1 + Math.sqrt(5)) / 2;

    for (let i = 0; i < TOTAL_SAMPLES; i++) {
      const y = 1 - (i / (TOTAL_SAMPLES - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = (2 * Math.PI * i) / goldenRatio;

      const px = -(RADIUS * radiusAtY * Math.cos(theta));
      const py = RADIUS * y;
      const pz = RADIUS * radiusAtY * Math.sin(theta);

      const lat = Math.asin(y) * (180 / Math.PI);
      let lon = Math.atan2(pz, -px) * (180 / Math.PI) - 180;
      if (lon < -180) lon += 360;

      const { isLand, isIndia } = checkLandmass(lat, lon);

      if (isLand) {
        landPts.push(px, py, pz);

        const color = new THREE.Color();
        if (isIndia) {
          color.set("#00f0ff"); // Brightest Electric Cyan for India
        } else {
          const t = (py + RADIUS) / (2 * RADIUS);
          color.lerpColors(
            new THREE.Color("#00d2ff"), // Cyan bottom
            new THREE.Color("#d946ef"), // Magenta top
            t
          );
        }

        landCols.push(color.r, color.g, color.b);
      } else if (i % 5 === 0) {
        oceanPts.push(px, py, pz);
        const oceanColor = new THREE.Color("#1e293b");
        oceanCols.push(oceanColor.r * 0.4, oceanColor.g * 0.4, oceanColor.b * 0.7);
      }
    }

    // Grid lines
    const gridPts: number[] = [];
    const gridCols: number[] = [];
    const gridColor = new THREE.Color("#a855f7");

    for (let l = -180; l < 180; l += 30) {
      const radLon = (l + 180) * (Math.PI / 180);
      for (let a = 0; a <= 360; a += 4) {
        const radLat = a * (Math.PI / 180);
        const gx = -(RADIUS * 1.002 * Math.sin(radLat) * Math.cos(radLon));
        const gy = RADIUS * 1.002 * Math.cos(radLat);
        const gz = RADIUS * 1.002 * Math.sin(radLat) * Math.sin(radLon);
        gridPts.push(gx, gy, gz);
        gridCols.push(gridColor.r * 0.4, gridColor.g * 0.4, gridColor.b * 0.6);
      }
    }

    const lGeo = new THREE.BufferGeometry();
    lGeo.setAttribute("position", new THREE.Float32BufferAttribute(landPts, 3));
    lGeo.setAttribute("color", new THREE.Float32BufferAttribute(landCols, 3));

    const oGeo = new THREE.BufferGeometry();
    oGeo.setAttribute("position", new THREE.Float32BufferAttribute(oceanPts, 3));
    oGeo.setAttribute("color", new THREE.Float32BufferAttribute(oceanCols, 3));

    const gGeo = new THREE.BufferGeometry();
    gGeo.setAttribute("position", new THREE.Float32BufferAttribute(gridPts, 3));
    gGeo.setAttribute("color", new THREE.Float32BufferAttribute(gridCols, 3));

    return { landGeo: lGeo, oceanGeo: oGeo, gridLinesGeo: gGeo };
  }, []);

  const landMat = useMemo(() => {
    return new THREE.PointsMaterial({
      vertexColors: true,
      size: 0.052,
      map: pointTexture || undefined,
      transparent: true,
      opacity: 1.0,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });
  }, [pointTexture]);

  const oceanMat = useMemo(() => {
    return new THREE.PointsMaterial({
      vertexColors: true,
      size: 0.02,
      map: pointTexture || undefined,
      transparent: true,
      opacity: 0.35,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });
  }, [pointTexture]);

  const gridMat = useMemo(() => {
    return new THREE.PointsMaterial({
      vertexColors: true,
      size: 0.016,
      transparent: true,
      opacity: 0.35,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
  }, []);

  return (
    <group>
      {/* Dark glowing volume core */}
      <mesh>
        <sphereGeometry args={[RADIUS * 0.99, 64, 64]} />
        <meshBasicMaterial
          color="#060919"
          transparent
          opacity={0.82}
        />
      </mesh>

      {/* Luminous Landmass Particles */}
      <points geometry={landGeo} material={landMat} />

      {/* Ocean Particles */}
      <points geometry={oceanGeo} material={oceanMat} />

      {/* Lat/Lon Grid Lines */}
      <points geometry={gridLinesGeo} material={gridMat} />

      {/* Top-Right Lens Flare Highlight */}
      <mesh position={[1.1, 1.1, 0.7]}>
        <sphereGeometry args={[0.12, 32, 32]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.95} />
      </mesh>
      <mesh position={[1.1, 1.1, 0.7]}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshBasicMaterial color="#d946ef" transparent opacity={0.5} />
      </mesh>
    </group>
  );
}