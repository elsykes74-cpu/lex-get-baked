'use client';
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Float, Environment, MeshDistortMaterial } from '@react-three/drei';

function ArchBox({ position, size, color, rotY = 0, rotZ = 0 }: {
  position: [number,number,number];
  size: [number,number,number];
  color: string;
  rotY?: number;
  rotZ?: number;
}) {
  return (
    <mesh position={position} rotation={[0.08, rotY, rotZ]}>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} roughness={0.85} metalness={0.08} />
    </mesh>
  );
}

function AccentSphere({ position, scale, color, speed, distort }: {
  position: [number,number,number];
  scale: number;
  color: string;
  speed: number;
  distort: number;
}) {
  return (
    <Float speed={speed} rotationIntensity={0.4} floatIntensity={1.6}>
      <mesh position={position} scale={scale}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          color={color}
          distort={distort}
          speed={2}
          roughness={0.03}
          metalness={0.97}
          envMapIntensity={3.5}
        />
      </mesh>
    </Float>
  );
}

export default function CookieScene() {
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.25} />
          <directionalLight position={[6, 8, 3]} intensity={1.2} color="#D8C8B0" />
          <pointLight position={[-3, 3, 4]} intensity={2.5} color="#C9748F" />
          <pointLight position={[5, -2, 2]} intensity={1.8} color="#C4965A" />
          <pointLight position={[0, 6, -2]} intensity={0.8} color="#9B7EBC" />
          <Environment preset="city" />

          {/* Architectural background — right column + platform */}
          <ArchBox position={[3.8, 0.2, -3.5]}  size={[1.0, 5.5, 0.5]} color="#22203a" rotY={-0.25} />
          <ArchBox position={[3.4, -2.6, -2.8]} size={[2.4, 0.25, 0.6]} color="#1e1c32" rotY={-0.2} />
          <ArchBox position={[4.6, 2.2, -4]}    size={[0.5, 2.2, 0.4]} color="#272040" rotY={-0.1} />

          {/* Left column + platform */}
          <ArchBox position={[-4.0, 0.8, -4]}   size={[0.9, 6, 0.5]} color="#201e34" rotY={0.2} />
          <ArchBox position={[-3.5, -2.4, -3]}  size={[2.2, 0.25, 0.6]} color="#1c1a2e" rotY={0.15} />
          <ArchBox position={[-4.8, -1.2, -4.5]}size={[0.4, 1.8, 0.4]} color="#252038" rotY={0.08} />

          {/* Floor plane */}
          <ArchBox position={[0.5, -3.4, -3.5]} size={[6, 0.18, 1.2]} color="#1a1828" />

          {/* Background wall hint */}
          <ArchBox position={[0, 0, -6]}         size={[12, 9, 0.15]} color="#0f0e1a" />

          {/* Step detail — right */}
          <ArchBox position={[2.2, -3.0, -2.5]} size={[1.5, 0.18, 0.8]} color="#201e38" rotY={-0.1} />

          {/* Metallic rose-gold spheres */}
          <AccentSphere position={[-2.6, -0.4, 1.0]}  scale={0.46} color="#C9748F" speed={0.65} distort={0.18} />
          <AccentSphere position={[3.2,  1.8, -0.6]}  scale={0.30} color="#E2BA87" speed={1.05} distort={0.22} />
          <AccentSphere position={[-1.0, 2.6, -0.2]}  scale={0.20} color="#D4956A" speed={1.35} distort={0.15} />
          <AccentSphere position={[3.6, -1.0,  0.6]}  scale={0.15} color="#E8A4B8" speed={0.85} distort={0.28} />
          <AccentSphere position={[-3.0, -2.4, 0.3]}  scale={0.13} color="#C4965A" speed={1.15} distort={0.20} />
          <AccentSphere position={[1.8,  3.2, -1.0]}  scale={0.11} color="#C9748F" speed={1.50} distort={0.25} />
          <AccentSphere position={[-2.0,  1.0,  1.4]} scale={0.09} color="#E2BA87" speed={0.75} distort={0.18} />
        </Suspense>
      </Canvas>
    </div>
  );
}
