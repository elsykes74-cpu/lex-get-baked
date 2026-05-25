'use client';
import { useRef, Suspense, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, MeshDistortMaterial, useTexture } from '@react-three/drei';
import * as THREE from 'three';

// ── Realistic cookie geometry ────────────────────────────────────────────────
function Cookie({ position = [0, 0, 0] as [number,number,number] }) {
  const cookieRef = useRef<THREE.Group>(null);

  // Procedural cookie disc with crinkled edges
  const cookieGeom = useMemo(() => {
    const shape = new THREE.Shape();
    const segments = 48;
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      // Irregular edge radius for realistic cookie shape
      const noise = 1 + Math.sin(angle * 7) * 0.04 + Math.cos(angle * 11) * 0.03;
      const r = 1.05 * noise;
      if (i === 0) shape.moveTo(Math.cos(angle) * r, Math.sin(angle) * r);
      else shape.lineTo(Math.cos(angle) * r, Math.sin(angle) * r);
    }
    shape.closePath();
    return new THREE.ExtrudeGeometry(shape, {
      depth: 0.22,
      bevelEnabled: true,
      bevelThickness: 0.06,
      bevelSize: 0.06,
      bevelSegments: 4,
    });
  }, []);

  // Chocolate chips — random but seeded positions
  const chipPositions = useMemo(() => {
    const positions: [number, number, number][] = [];
    const rng = (seed: number) => {
      let x = Math.sin(seed) * 43758.5453;
      return x - Math.floor(x);
    };
    for (let i = 0; i < 14; i++) {
      const angle  = rng(i * 2.1) * Math.PI * 2;
      const radius = rng(i * 3.7) * 0.72;
      positions.push([
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        0.26,
      ]);
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (!cookieRef.current) return;
    cookieRef.current.rotation.z = state.clock.elapsedTime * 0.18;
    cookieRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.12 + 0.3;
  });

  return (
    <Float speed={1.4} rotationIntensity={0.2} floatIntensity={1.6}>
      <group ref={cookieRef} position={position} rotation={[0.3, 0, 0]}>
        {/* Cookie base */}
        <mesh geometry={cookieGeom} castShadow>
          <meshStandardMaterial
            color="#C4845A"
            roughness={0.82}
            metalness={0.0}
            bumpScale={0.02}
          />
        </mesh>
        {/* Golden top surface highlight */}
        <mesh position={[0, 0, 0.22]} rotation={[0, 0, 0]}>
          <circleGeometry args={[0.98, 48]} />
          <meshStandardMaterial
            color="#D4956A"
            roughness={0.75}
            metalness={0.0}
            transparent
            opacity={0.9}
          />
        </mesh>
        {/* Chocolate chips */}
        {chipPositions.map((pos, i) => (
          <mesh key={i} position={pos} castShadow>
            <sphereGeometry args={[0.095, 12, 10]} />
            <meshStandardMaterial
              color={i % 3 === 0 ? '#3D1A0A' : '#5C2A10'}
              roughness={0.4}
              metalness={0.1}
            />
          </mesh>
        ))}
        {/* Subtle surface crinkle dots */}
        {chipPositions.slice(0, 6).map((pos, i) => (
          <mesh key={`crinkle-${i}`} position={[pos[0] * 0.5, pos[1] * 0.5, 0.235]}>
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshStandardMaterial color="#B87050" roughness={0.9} />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

// ── Metallic accent spheres ──────────────────────────────────────────────────
function AccentSphere({
  position, scale, color, speed, distort,
}: {
  position: [number,number,number]; scale: number; color: string; speed: number; distort: number;
}) {
  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={1.4}>
      <mesh position={position} scale={scale} castShadow>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          color={color}
          distort={distort}
          speed={1.8}
          roughness={0.04}
          metalness={0.92}
          envMapIntensity={2.5}
        />
      </mesh>
    </Float>
  );
}

// ── Mini cookie cluster (background) ────────────────────────────────────────
function MiniCookie({ position, scale, rotSpeed }: {
  position: [number,number,number]; scale: number; rotSpeed: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.z = state.clock.elapsedTime * rotSpeed;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.2;
  });
  return (
    <Float speed={0.8} floatIntensity={1}>
      <mesh ref={ref} position={position} scale={scale} castShadow>
        <cylinderGeometry args={[1, 0.95, 0.22, 32]} />
        <meshStandardMaterial color="#C4845A" roughness={0.85} metalness={0} />
      </mesh>
    </Float>
  );
}

// ── Scene ────────────────────────────────────────────────────────────────────
export default function CookieScene() {
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden>
      <Canvas
        camera={{ position: [0, 0.5, 5.5], fov: 48 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
        shadows
      >
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.5} />
          <directionalLight
            position={[4, 8, 4]}
            intensity={2.2}
            color="#FFE8D0"
            castShadow
            shadow-mapSize={[1024, 1024]}
          />
          <pointLight position={[-4, -2, 3]} intensity={1.8} color="#C9748F" />
          <pointLight position={[3, 4, -1]} intensity={1.2} color="#9B7EBC" />
          <pointLight position={[0, -3, 2]} intensity={0.8} color="#C4965A" />
          <Environment preset="sunset" />

          {/* Hero cookie */}
          <Cookie position={[0.5, 0.1, 0]} />

          {/* Mini background cookies */}
          <MiniCookie position={[-2.6, 1.6, -1.5]} scale={0.45} rotSpeed={0.3} />
          <MiniCookie position={[2.8, -1.4, -1.2]} scale={0.35} rotSpeed={-0.25} />

          {/* Metallic accent spheres */}
          <AccentSphere position={[-2.4, -0.8, 0.5]} scale={0.45} color="#C9748F" speed={0.7} distort={0.3} />
          <AccentSphere position={[2.6,  1.8, -0.8]} scale={0.32} color="#9B7EBC" speed={1.0} distort={0.35} />
          <AccentSphere position={[-1.4, 2.2, -0.5]} scale={0.22} color="#C4965A" speed={1.3} distort={0.25} />
          <AccentSphere position={[3.1, -0.4, 0.2]}  scale={0.18} color="#E8A4B8" speed={0.8} distort={0.4} />
          <AccentSphere position={[-2.9, -2.0, -0.3]} scale={0.15} color="#C4965A" speed={1.2} distort={0.3} />
        </Suspense>
      </Canvas>
    </div>
  );
}
