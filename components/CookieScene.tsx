'use client';
import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Decorative metallic spheres — stand in for the bakery product 3D models.
// Replace `<MetallicSphere>` with <useGLTF> models when assets are ready.
function MetallicSphere({
  position, scale, color, speed, distort,
}: {
  position: [number, number, number];
  scale: number;
  color: string;
  speed: number;
  distort: number;
}) {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.x = state.clock.elapsedTime * speed * 0.4;
    mesh.current.rotation.y = state.clock.elapsedTime * speed * 0.6;
  });
  return (
    <Float speed={speed} rotationIntensity={0.4} floatIntensity={1.2}>
      <mesh ref={mesh} position={position} scale={scale} castShadow>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          color={color}
          distort={distort}
          speed={1.5}
          roughness={0.05}
          metalness={0.9}
          envMapIntensity={2}
        />
      </mesh>
    </Float>
  );
}

function MainCookieProxy() {
  // Torus knot acts as a stand-in until a real cookie GLB is supplied.
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.y = state.clock.elapsedTime * 0.25;
    mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.15;
  });
  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={1.8}>
      <mesh ref={mesh} position={[0.4, 0.2, 0]} scale={1.4} castShadow>
        <torusKnotGeometry args={[0.9, 0.32, 256, 32]} />
        <MeshDistortMaterial
          color="#C4965A"
          distort={0.18}
          speed={1.8}
          roughness={0.1}
          metalness={0.7}
          envMapIntensity={3}
        />
      </mesh>
    </Float>
  );
}

export default function CookieScene() {
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden>
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[4, 6, 4]} intensity={1.8} color="#E8D4C0" />
          <pointLight position={[-3, -2, 2]} intensity={1.2} color="#C9748F" />
          <pointLight position={[3, 3, -1]} intensity={0.8} color="#9B7EBC" />
          <Environment preset="city" />

          <MainCookieProxy />

          <MetallicSphere position={[-2.8, 1.4, -1]} scale={0.55} color="#C9748F" speed={0.6} distort={0.25} />
          <MetallicSphere position={[2.6, -1.2, -0.5]} scale={0.4}  color="#9B7EBC" speed={0.9} distort={0.3}  />
          <MetallicSphere position={[-1.8, -2,  0.5]} scale={0.3}  color="#C4965A" speed={1.1} distort={0.2}  />
          <MetallicSphere position={[3,    2.2, -1.5]} scale={0.22} color="#E8A4B8" speed={0.7} distort={0.35} />
          <MetallicSphere position={[-3.2,-0.5, -0.8]} scale={0.18} color="#C4965A" speed={1.3} distort={0.4}  />
        </Suspense>
      </Canvas>
    </div>
  );
}
