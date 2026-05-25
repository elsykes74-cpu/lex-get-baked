'use client';
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Float, Environment, MeshDistortMaterial } from '@react-three/drei';

function TileBox({ position, size, color, rotY = 0, rotZ = 0 }: {
  position: [number,number,number];
  size: [number,number,number];
  color: string;
  rotY?: number;
  rotZ?: number;
}) {
  return (
    <mesh position={position} rotation={[0.05, rotY, rotZ]}>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} roughness={0.2} metalness={0.05} />
    </mesh>
  );
}

function MetallicOrb({ position, scale, color, speed, distort }: {
  position: [number,number,number];
  scale: number;
  color: string;
  speed: number;
  distort: number;
}) {
  return (
    <Float speed={speed} rotationIntensity={0.4} floatIntensity={1.8}>
      <mesh position={position} scale={scale}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          color={color}
          distort={distort}
          speed={2}
          roughness={0.02}
          metalness={0.98}
          envMapIntensity={4}
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
          <ambientLight intensity={0.9} color="#E8E0F8" />
          <directionalLight position={[5, 8, 4]} intensity={1.4} color="#FFF0F8" />
          <pointLight position={[-3, 4, 4]} intensity={2.2} color="#C9748F" />
          <pointLight position={[5, -2, 3]} intensity={1.6} color="#D4956A" />
          <pointLight position={[0, 8, -2]} intensity={1.0} color="#B0A8D8" />
          <Environment preset="dawn" />

          {/* Soft lavender architectural tile blocks */}
          <TileBox position={[3.6, 0.4, -3.5]}  size={[1.1, 5.8, 0.5]} color="#C8C0DC" rotY={-0.22} />
          <TileBox position={[3.2, -2.8, -2.8]} size={[2.6, 0.28, 0.6]} color="#D0C8E0" rotY={-0.18} />
          <TileBox position={[4.6, 2.4, -4.2]}  size={[0.55, 2.4, 0.45]} color="#C4BCDA" rotY={-0.08} />
          <TileBox position={[2.4, -3.2, -2.4]} size={[1.6, 0.22, 0.7]} color="#D8D0E8" rotY={-0.12} />

          <TileBox position={[-3.8, 0.8, -4.0]} size={[1.0, 6.2, 0.5]} color="#CCC4E0" rotY={0.2} />
          <TileBox position={[-3.4, -2.6, -3.0]}size={[2.4, 0.28, 0.6]} color="#D4CCE4" rotY={0.15} />
          <TileBox position={[-4.6,-1.2, -4.5]} size={[0.45, 2.0, 0.4]} color="#C8C0DC" rotY={0.06} />

          {/* Floor platform */}
          <TileBox position={[0.4, -3.5, -3.8]} size={[7, 0.2, 1.4]} color="#D0CCE4" />

          {/* Back wall */}
          <TileBox position={[0, 0.5, -6.5]} size={[14, 10, 0.12]} color="#E0DCF0" />

          {/* Floating tile accent squares */}
          <TileBox position={[1.2, 2.8, -2.0]}  size={[0.7, 0.7, 0.18]} color="#E4DCEC" rotY={0.4} rotZ={0.3} />
          <TileBox position={[-1.6, -1.8, -1.5]}size={[0.5, 0.5, 0.14]} color="#D8D0EC" rotY={-0.5} rotZ={-0.2} />
          <TileBox position={[2.8, 0.6, -1.2]}  size={[0.4, 0.4, 0.12]} color="#DCCCE8" rotY={0.6} rotZ={0.4} />

          {/* Rose-gold metallic spheres */}
          <MetallicOrb position={[-2.4, -0.3, 1.2]}  scale={0.48} color="#D4956A" speed={0.65} distort={0.16} />
          <MetallicOrb position={[3.0,  2.0, -0.4]}  scale={0.32} color="#E8C0A0" speed={1.05} distort={0.2}  />
          <MetallicOrb position={[-0.8, 2.8,  0.0]}  scale={0.22} color="#C9748F" speed={1.3}  distort={0.14} />
          <MetallicOrb position={[3.4, -1.0,  0.8]}  scale={0.16} color="#F0D0C0" speed={0.85} distort={0.26} />
          <MetallicOrb position={[-2.8, -2.2, 0.4]}  scale={0.14} color="#D4956A" speed={1.15} distort={0.18} />
          <MetallicOrb position={[1.6,  3.4, -0.8]}  scale={0.12} color="#E8A4B8" speed={1.5}  distort={0.22} />
          <MetallicOrb position={[-1.8, 1.2,  1.6]}  scale={0.10} color="#F4E0D0" speed={0.75} distort={0.16} />
          <MetallicOrb position={[0.8, -2.8,  1.0]}  scale={0.09} color="#C9748F" speed={1.2}  distort={0.2}  />
        </Suspense>
      </Canvas>
    </div>
  );
}
