import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

const NODE_COUNT = 5;

function AICore() {
  const coreRef = useRef();
  const shellRef = useRef();
  const nodesRef = useRef();
  const pulseRef = useRef();

  const nodeOffsets = useMemo(
    () =>
      Array.from({ length: NODE_COUNT }, (_, i) => ({
        radius: 1.5 + (i % 2) * 0.35,
        speed: 0.4 + i * 0.12,
        tilt: (i / NODE_COUNT) * Math.PI,
        phase: i * 1.3,
      })),
    []
  );

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (coreRef.current) {
      coreRef.current.rotation.x += delta * 0.12;
      coreRef.current.rotation.y += delta * 0.18;
    }
    if (shellRef.current) {
      shellRef.current.rotation.x -= delta * 0.08;
      shellRef.current.rotation.y -= delta * 0.14;
    }
    if (pulseRef.current) {
      const s = 0.55 + Math.sin(t * 1.8) * 0.08;
      pulseRef.current.scale.setScalar(s);
    }
    if (nodesRef.current) {
      nodesRef.current.children.forEach((node, i) => {
        const cfg = nodeOffsets[i];
        const angle = t * cfg.speed + cfg.phase;
        node.position.set(
          Math.cos(angle) * cfg.radius,
          Math.sin(angle * 0.7) * cfg.radius * 0.4,
          Math.sin(angle) * cfg.radius * Math.cos(cfg.tilt)
        );
      });
    }
  });

  return (
    <group>
      <mesh ref={pulseRef}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial color="#fbbf24" transparent opacity={0.35} />
      </mesh>
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[1.15, 1]} />
        <meshBasicMaterial color="#67e8f9" wireframe transparent opacity={0.6} />
      </mesh>
      <mesh ref={shellRef}>
        <icosahedronGeometry args={[1.65, 0]} />
        <meshBasicMaterial color="#a5b4fc" wireframe transparent opacity={0.3} />
      </mesh>
      <group ref={nodesRef}>
        {nodeOffsets.map((_, i) => (
          <mesh key={i}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshBasicMaterial color="#fde68a" />
          </mesh>
        ))}
      </group>
    </group>
  );
}

const OrbAccent = ({ className = "" }) => (
  <div className={`pointer-events-none ${className}`} aria-hidden="true">
    <Canvas
      camera={{ position: [0, 0, 4.2], fov: 42 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
    >
      <Suspense fallback={null}>
        <AICore />
      </Suspense>
    </Canvas>
  </div>
);

export default OrbAccent;
