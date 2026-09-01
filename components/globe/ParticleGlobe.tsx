"use client";

import { useEffect, useMemo, useState } from "react";
import * as THREE from "three";

const RADIUS = 1.45;

/**
 * Luminous radial glow texture for dots
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
  gradient.addColorStop(0.35, "rgba(0, 240, 255, 0.95)");
  gradient.addColorStop(0.7, "rgba(168, 85, 247, 0.45)");
  gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

/**
 * Analytical check for world landmasses (Fallback)
 */
function isLandFallback(lat: number, lon: number): { isLand: boolean; isIndia: boolean } {
  const isIndia = lat >= 6 && lat <= 36 && lon >= 68 && lon <= 97;
  if (isIndia) return { isLand: true, isIndia: true };

  if (lat >= -11 && lat <= 72 && lon >= 60 && lon <= 150) return { isLand: true, isIndia: false };
  if (lat >= 12 && lat <= 45 && lon >= 35 && lon <= 60) return { isLand: true, isIndia: false };
  if (lat >= -35 && lat <= 37 && lon >= -18 && lon <= 52) return { isLand: true, isIndia: false };
  if (lat >= 36 && lat <= 71 && lon >= -10 && lon <= 45) return { isLand: true, isIndia: false };
  if (lat >= -47 && lat <= -10 && lon >= 113 && lon <= 178) return { isLand: true, isIndia: false };
  if (lat >= 14 && lat <= 72 && lon >= -168 && lon <= -52) return { isLand: true, isIndia: false };
  if (lat >= -56 && lat <= 13 && lon >= -82 && lon <= -34) return { isLand: true, isIndia: false };

  return { isLand: false, isIndia: false };
}

export default function ParticleGlobe() {
  const pointTexture = useMemo(() => createPointTexture(), []);
  const [sampledLand, setSampledLand] = useState<{
    landPts: number[];
    landCols: number[];
  } | null>(null);

  // Load and sample earth_specular.jpg (In earth_specular.jpg, Land is BLACK < 80, Ocean is WHITE > 180)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const img = new Image();
    img.src = "/earth_specular.jpg";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const w = 512;
      const h = 256;
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.drawImage(img, 0, 0, w, h);
      const imgData = ctx.getImageData(0, 0, w, h).data;

      const pts: number[] = [];
      const cols: number[] = [];

      for (let lat = -60; lat <= 75; lat += 1.1) {
        for (let lon = -180; lon <= 180; lon += 1.1) {
          const u = (lon + 180) / 360;
          const v = (90 - lat) / 180;
          const px = Math.floor(u * w);
          const py = Math.floor(v * h);
          const idx = (py * w + px) * 4;
          const brightness = imgData[idx];

          // Land in specular map is dark (< 90 brightness)
          if (brightness < 90) {
            const phi = (90 - lat) * (Math.PI / 180);
            const theta = lon * (Math.PI / 180);

            const x = RADIUS * Math.sin(phi) * Math.sin(theta);
            const y = RADIUS * Math.cos(phi);
            const z = RADIUS * Math.sin(phi) * Math.cos(theta);

            pts.push(x, y, z);

            const color = new THREE.Color();
            const isIndia = lat >= 6 && lat <= 36 && lon >= 68 && lon <= 97;

            if (isIndia) {
              color.set("#00f0ff"); // Electric Cyan for India
            } else {
              // Color gradient matching reference image: Cyan-Blue bottom-left -> Neon Purple/Magenta top-right
              const t = (y + RADIUS) / (2 * RADIUS);
              color.lerpColors(
                new THREE.Color("#00d2ff"),
                new THREE.Color("#d946ef"),
                t
              );
            }
            cols.push(color.r, color.g, color.b);
          }
        }
      }

      setSampledLand({ landPts: pts, landCols: cols });
    };
  }, []);

  const landGeo = useMemo(() => {
    const pts: number[] = [];
    const cols: number[] = [];

    // Fallback generation while texture loads
    for (let lat = -60; lat <= 75; lat += 1.2) {
      for (let lon = -180; lon <= 180; lon += 1.2) {
        const { isLand, isIndia } = isLandFallback(lat, lon);
        if (isLand) {
          const phi = (90 - lat) * (Math.PI / 180);
          const theta = lon * (Math.PI / 180);

          const x = RADIUS * Math.sin(phi) * Math.sin(theta);
          const y = RADIUS * Math.cos(phi);
          const z = RADIUS * Math.sin(phi) * Math.cos(theta);

          pts.push(x, y, z);

          const color = new THREE.Color();
          if (isIndia) {
            color.set("#00f0ff");
          } else {
            const t = (y + RADIUS) / (2 * RADIUS);
            color.lerpColors(
              new THREE.Color("#00d2ff"),
              new THREE.Color("#d946ef"),
              t
            );
          }
          cols.push(color.r, color.g, color.b);
        }
      }
    }

    const lGeo = new THREE.BufferGeometry();
    const finalLandPts = sampledLand ? sampledLand.landPts : pts;
    const finalLandCols = sampledLand ? sampledLand.landCols : cols;

    lGeo.setAttribute("position", new THREE.Float32BufferAttribute(finalLandPts, 3));
    lGeo.setAttribute("color", new THREE.Float32BufferAttribute(finalLandCols, 3));

    return lGeo;
  }, [sampledLand]);

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

  return (
    <group>
      {/* Semi-transparent dark volume core — matching reference image depth */}
      <mesh>
        <sphereGeometry args={[RADIUS * 0.985, 64, 64]} />
        <meshBasicMaterial
          color="#030514"
          transparent
          opacity={0.88}
        />
      </mesh>

      {/* Luminous Landmass Particles (Geographically exact continents) */}
      <points geometry={landGeo} material={landMat} />

      {/* Top-Right Lens Flare Highlight matching reference image */}
      <mesh position={[0.92, 1.12, 0.5]}>
        <sphereGeometry args={[0.07, 32, 32]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.98} />
      </mesh>
      <mesh position={[0.92, 1.12, 0.5]}>
        <sphereGeometry args={[0.24, 32, 32]} />
        <meshBasicMaterial color="#ec4899" transparent opacity={0.65} />
      </mesh>
      <mesh position={[0.92, 1.12, 0.5]}>
        <sphereGeometry args={[0.48, 32, 32]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.3} />
      </mesh>
    </group>
  );
}