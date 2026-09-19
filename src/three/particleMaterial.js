import * as THREE from "three";
import { simplexNoise3D } from "./noise.glsl.js";

const vertexShader = /* glsl */ `
  attribute float aRandom;

  uniform float uTime;
  uniform vec3 uMouse;
  uniform float uMorph;
  uniform float uSize;
  uniform float uPixelRatio;
  uniform vec3 uCenterOffset;

  varying vec3 vColor;
  varying float vAlpha;

  ${simplexNoise3D}

  void main() {
    vec3 pos = position;
    vec3 dir = normalize(pos);

    float n = snoise(pos * 0.9 + uTime * 0.12);
    float n2 = snoise(pos * 1.8 - uTime * 0.09 + 12.0);
    float displacement = n * 0.35 + n2 * 0.18;

    vec3 morphed = pos + dir * displacement * (0.45 + uMorph * 1.1);
    morphed += uCenterOffset;

    vec3 toParticle = morphed - uMouse;
    float dist = length(toParticle);
    float radius = 2.4;
    float force = smoothstep(radius, 0.0, dist);
    morphed += normalize(toParticle + 0.0001) * force * 1.2;

    vec4 mvPosition = modelViewMatrix * vec4(morphed, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    float sizeAttenuation = (uSize * uPixelRatio) / max(-mvPosition.z, 0.001);
    gl_PointSize = sizeAttenuation * (0.55 + aRandom * 0.9 + force * 1.6);

    vec3 deepBlue = vec3(0.16, 0.32, 0.85);
    vec3 skyCyan = vec3(0.4, 0.8, 1.0);
    vec3 gold = vec3(1.0, 0.72, 0.32);
    vec3 ember = vec3(1.0, 0.42, 0.22);

    float warmth = smoothstep(-0.25, 0.3, n2) * (0.4 + dir.y * 0.5);
    vec3 baseColor = mix(deepBlue, skyCyan, clamp(dir.y * 0.5 + 0.5, 0.0, 1.0));
    baseColor = mix(baseColor, gold, clamp(warmth, 0.0, 1.0));
    vColor = mix(baseColor, ember, force * 0.85);
    vAlpha = 0.5 + force * 0.5;
  }
`;

const fragmentShader = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    float alpha = smoothstep(0.5, 0.05, d) * vAlpha;
    if (alpha < 0.01) discard;
    gl_FragColor = vec4(vColor, alpha);
  }
`;

export function createParticleMaterial() {
  return new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector3(999, 999, 999) },
      uMorph: { value: 0 },
      uSize: { value: 26 },
      uPixelRatio: { value: typeof window !== "undefined" ? Math.min(window.devicePixelRatio, 2) : 1 },
      uCenterOffset: { value: new THREE.Vector3(0, 0, 0) },
    },
  });
}

export function generateSpherePositions(count, radius) {
  const positions = new Float32Array(count * 3);
  const randoms = new Float32Array(count);
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const radiusAtY = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = goldenAngle * i;
    const x = Math.cos(theta) * radiusAtY;
    const z = Math.sin(theta) * radiusAtY;

    positions[i * 3] = x * radius;
    positions[i * 3 + 1] = y * radius;
    positions[i * 3 + 2] = z * radius;
    randoms[i] = Math.random();
  }

  return { positions, randoms };
}
