"use client";

import { memo } from "react";
import {
  EffectComposer,
  Bloom,
} from "@react-three/postprocessing";

function Effects() {
  return (
    <EffectComposer multisampling={8}>

      {/* Main Bloom */}

      <Bloom
        intensity={1.4}
        luminanceThreshold={0.15}
        luminanceSmoothing={0.95}
        mipmapBlur
      />

    </EffectComposer>
  );
}

export default memo(Effects);