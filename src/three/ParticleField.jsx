import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { createParticleMaterial, generateSpherePositions } from "./particleMaterial.js";

const isSmallScreen = typeof window !== "undefined" && window.innerWidth < 768;
const isNarrowLayout = typeof window !== "undefined" && window.innerWidth < 1024;
const PARTICLE_COUNT = isSmallScreen ? 4200 : 9000;
const RADIUS = 1.6;
const CENTER_OFFSET = new THREE.Vector3(isNarrowLayout ? 0 : 1.15, 0.1, -0.3);

const ParticleField = ({ morphTarget = 0 }) => {
  const pointsRef = useRef();
  const groupRef = useRef();
  const materialRef = useRef();
  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const plane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 0, 1), 0), []);
  const mouseWorld = useRef(new THREE.Vector3(999, 999, 999));
  const intersection = useMemo(() => new THREE.Vector3(), []);
  const morphValue = useRef(0);

  const geometry = useMemo(() => {
    const { positions, randoms } = generateSpherePositions(PARTICLE_COUNT, RADIUS);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("aRandom", new THREE.BufferAttribute(randoms, 1));
    return geo;
  }, []);

  const material = useMemo(() => createParticleMaterial(), []);

  useFrame((state, delta) => {
    const { camera, pointer } = state;

    raycaster.setFromCamera(pointer, camera);
    if (raycaster.ray.intersectPlane(plane, intersection)) {
      mouseWorld.current.lerp(intersection, 0.12);
    }

    morphValue.current += (morphTarget - morphValue.current) * 0.06;

    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      materialRef.current.uniforms.uMouse.value.copy(mouseWorld.current);
      materialRef.current.uniforms.uMorph.value = morphValue.current;
      materialRef.current.uniforms.uCenterOffset.value.copy(CENTER_OFFSET);
    }

    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.04;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        pointer.y * 0.15,
        0.04
      );
      groupRef.current.rotation.z = THREE.MathUtils.lerp(
        groupRef.current.rotation.z,
        -pointer.x * 0.1,
        0.04
      );
    }
  });

  return (
    <group ref={groupRef}>
      <points ref={pointsRef} geometry={geometry}>
        <primitive object={material} ref={materialRef} attach="material" />
      </points>
    </group>
  );
};

export default ParticleField;
