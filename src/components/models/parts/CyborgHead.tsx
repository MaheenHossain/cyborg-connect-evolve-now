
import * as THREE from 'three';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export const CyborgHead = () => {
  const headRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (headRef.current) {
      headRef.current.children.forEach((child, i) => {
        if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
          child.material.emissiveIntensity = 1.5 + Math.sin(state.clock.elapsedTime * 2 + i * 0.5) * 0.5;
        }
      });
    }
  });

  return (
    <group ref={headRef}>
      {/* Head base */}
      <mesh castShadow position={[0, 0.85, 0]}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial 
          color={new THREE.Color("#202530")}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      
      {/* Face plate */}
      <mesh castShadow position={[0, 0.85, 0.15]}>
        <cylinderGeometry args={[0.25, 0.25, 0.1, 32, 1, false, Math.PI * 0.25, Math.PI * 1.5]} />
        <meshStandardMaterial 
          color={new THREE.Color("#404550")}
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>
      
      {/* Eyes - glowing blue */}
      <mesh position={[0.1, 0.9, 0.2]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial 
          color={new THREE.Color("#4a9eff")}
          emissive={new THREE.Color("#4a9eff")}
          emissiveIntensity={2}
          toneMapped={false}
        />
      </mesh>
      
      <mesh position={[-0.1, 0.9, 0.2]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial 
          color={new THREE.Color("#4a9eff")}
          emissive={new THREE.Color("#4a9eff")}
          emissiveIntensity={2}
          toneMapped={false}
        />
      </mesh>
      
      {/* Antenna or sensor */}
      <mesh position={[0, 1.15, 0]}>
        <cylinderGeometry args={[0.01, 0.01, 0.2, 8]} />
        <meshStandardMaterial 
          color={new THREE.Color("#8A898C")}
          metalness={0.8}
        />
      </mesh>
      
      <mesh position={[0, 1.25, 0]}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshStandardMaterial 
          color={new THREE.Color("#ff3333")}
          emissive={new THREE.Color("#ff3333")}
          emissiveIntensity={2}
        />
      </mesh>
    </group>
  );
};
