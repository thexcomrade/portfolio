"use client";

import { useMemo } from "react";
import { Html, Line } from "@react-three/drei";
import * as THREE from "three";

const GLOBE_RADIUS = 1.45;

/**
 * Kollam coordinates (Kerala, India)
 * Latitude : 8.8932° N
 * Longitude: 76.6141° E
 */
const LATITUDE = 8.8932;
const LONGITUDE = 76.6141;

function latLonToVector3(lat: number, lon: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);

  return new THREE.Vector3(
    -(radius * Math.sin(phi) * Math.cos(theta)),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

export default function KeralaMarker() {
  const markerPosition = useMemo(() => {
    return latLonToVector3(LATITUDE, LONGITUDE, GLOBE_RADIUS);
  }, []);

  return (
    <group position={markerPosition}>
      {/* Core Beacon Sphere */}
      <mesh>
        <sphereGeometry args={[0.038, 32, 32]} />
        <meshBasicMaterial color="#38bdf8" />
      </mesh>

      {/* Glow Halo */}
      <mesh>
        <sphereGeometry args={[0.075, 32, 32]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.65} />
      </mesh>

      {/* Pulse Ring 1 */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.08, 0.098, 64]} />
        <meshBasicMaterial
          color="#38bdf8"
          transparent
          opacity={0.8}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Pulse Ring 2 */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.13, 0.148, 64]} />
        <meshBasicMaterial
          color="#c084fc"
          transparent
          opacity={0.45}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Cyan Callout Connection Path matching target image */}
      <Line
        points={[
          [0, 0, 0],
          [0.42, -0.05, 0],
          [0.68, 0.04, 0],
        ]}
        color="#38bdf8"
        lineWidth={2.2}
        transparent
        opacity={0.95}
      />

      {/* Glassmorphic Callout Box matching target image */}
      <Html
        position={[0.72, 0.04, 0]}
        center={false}
        occlude={false}
        style={{
          transform: "translate(0, -50%)",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            width: "220px",
            background: "rgba(8, 14, 30, 0.82)",
            border: "1px solid rgba(56, 189, 248, 0.4)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            borderRadius: "18px",
            padding: "18px",
            boxShadow:
              "0 20px 50px rgba(0, 0, 0, 0.75), 0 0 25px rgba(56, 189, 248, 0.25)",
            color: "#ffffff",
            fontFamily: "var(--font-inter), sans-serif",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "4px",
            }}
          >
            <h3
              style={{
                margin: 0,
                fontSize: "19px",
                fontWeight: 800,
                letterSpacing: "0.04em",
                fontFamily: "var(--font-space), sans-serif",
                color: "#ffffff",
              }}
            >
              KOLLAM
            </h3>
            <div
              style={{
                width: "9px",
                height: "9px",
                borderRadius: "50%",
                background: "#38bdf8",
                boxShadow: "0 0 10px #38bdf8",
              }}
            />
          </div>

          <p
            style={{
              margin: "0 0 12px 0",
              color: "#c084fc",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            KERALA, INDIA
          </p>

          {/* Coordinates */}
          <div
            style={{
              fontSize: "12px",
              color: "#94a3b8",
              borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
              paddingBottom: "10px",
              marginBottom: "10px",
              letterSpacing: "0.02em",
            }}
          >
            8.89° N, 76.61° E
          </div>

          {/* Footer Status */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: "12px",
              color: "#cbd5e1",
              lineHeight: "1.3",
            }}
          >
            <span>Building the future<br />with AI & ML</span>
            <span style={{ fontSize: "15px", color: "#c084fc" }}>💜</span>
          </div>
        </div>
      </Html>
    </group>
  );
}