import { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import ParticleField from "./ParticleField.jsx";

const Hero3D = ({ morphTarget = 0, className = "" }) => {
  const containerRef = useRef(null);

  return (
    <div ref={containerRef} className={`pointer-events-auto ${className}`} aria-hidden="true">
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 4.2], fov: 45 }}
        eventSource={containerRef}
        eventPrefix="client"
        style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      >
        <Suspense fallback={null}>
          <ParticleField morphTarget={morphTarget} />
          <EffectComposer multisampling={0}>
            <Bloom
              intensity={0.9}
              luminanceThreshold={0.15}
              luminanceSmoothing={0.4}
              mipmapBlur
            />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Hero3D;
