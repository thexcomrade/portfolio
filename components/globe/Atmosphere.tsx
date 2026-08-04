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
          float intensity = pow(0.6 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.5);
          vec3 cyan = vec3(0.133, 0.827, 0.933);
          vec3 purple = vec3(0.545, 0.361, 0.965);
          float t = smoothstep(-1.45, 1.45, vPosition.y);
          vec3 color = mix(cyan, purple, t);
          gl_FragColor = vec4(color, intensity * 0.45);
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
      <sphereGeometry args={[GLOBE_RADIUS * 1.15, 64, 64]} />
    </mesh>
  );
}
