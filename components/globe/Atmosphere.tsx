"use client";

import { useMemo } from "react";
import * as THREE from "three";

const GLOBE_RADIUS = 1.45;

export default function Atmosphere() {
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          // Fresnel rim calculation
          float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 2.6);
          
          // Color gradient matching reference image: Neon Cyan bottom-left -> Vivid Magenta top-right
          float t = clamp((vPosition.y + ${GLOBE_RADIUS.toFixed(2)}) / (2.0 * ${GLOBE_RADIUS.toFixed(2)}), 0.0, 1.0);
          vec3 cyan   = vec3(0.0, 0.85, 1.0);
          vec3 purple = vec3(0.65, 0.32, 0.96);
          vec3 magenta = vec3(0.92, 0.25, 0.75);
          
          vec3 color = mix(cyan, mix(purple, magenta, t), t);
          float alpha = fresnel * 0.82;
          
          gl_FragColor = vec4(color, alpha);
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
      depthWrite: false,
    });
  }, []);

  return (
    <mesh material={material}>
      <sphereGeometry args={[GLOBE_RADIUS * 1.16, 64, 64]} />
    </mesh>
  );
}
