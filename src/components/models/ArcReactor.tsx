
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function ArcReactor() {
  const groupRef = useRef<THREE.Group>(null);
  
  // Rotation animation
  useFrame((state) => {
    if (!groupRef.current) return;
    
    // Subtle floating rotation
    groupRef.current.rotation.z += 0.001;
    groupRef.current.rotation.y += 0.0005;
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Outer Ring */}
      <mesh castShadow receiveShadow>
        <torusGeometry args={[1.2, 0.2, 32, 100]} />
        <meshStandardMaterial
          color="#403E43"
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Inner Ring */}
      <mesh castShadow receiveShadow>
        <torusGeometry args={[0.8, 0.1, 32, 100]} />
        <meshStandardMaterial
          color="#8A898C"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Core Housing */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.6, 0.6, 0.2, 32]} />
        <meshStandardMaterial
          color="#9F9EA1"
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Core Glow */}
      <mesh position={[0, 0, 0.01]}>
        <circleGeometry args={[0.4, 32]} />
        <meshStandardMaterial
          color="#1EAEDB"
          emissive="#33C3F0"
          emissiveIntensity={2}
          toneMapped={false}
        />
      </mesh>

      {/* Energy Patterns */}
      {[...Array(8)].map((_, i) => (
        <mesh
          key={i}
          rotation={[0, 0, (Math.PI * 2 / 8) * i]}
          position={[0, 0, 0.02]}
        >
          <boxGeometry args={[0.1, 0.4, 0.01]} />
          <meshStandardMaterial
            color="#0FA0CE"
            emissive="#0FA0CE"
            emissiveIntensity={1}
            transparent
            opacity={0.7}
          />
        </mesh>
      ))}
    </group>
  );
}
