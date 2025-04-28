
import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useIsMobile } from '@/hooks/use-mobile';

export function ArcReactor() {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const [pulseState, setPulseState] = useState(0);
  const isMobile = useIsMobile();
  
  // Rotation and pulse animation - optimized for mobile
  useFrame((state) => {
    if (!groupRef.current || !coreRef.current) return;
    
    // Reduce animation complexity on mobile
    const speedFactor = isMobile ? 0.5 : 1;
    
    // Subtle floating rotation
    groupRef.current.rotation.z += 0.0005 * speedFactor;
    groupRef.current.rotation.y += 0.0003 * speedFactor;
    
    // Pulsating core effect
    const pulseFactor = Math.sin(state.clock.elapsedTime * 1.5 * speedFactor) * 0.08 + 1;
    coreRef.current.scale.set(pulseFactor, pulseFactor, pulseFactor);
    
    // Update emissive intensity based on pulse
    const material = coreRef.current.material as THREE.MeshStandardMaterial;
    if (material) {
      material.emissiveIntensity = 1.3 + Math.sin(state.clock.elapsedTime * 1.5 * speedFactor) * 0.3;
    }
    
    // Energy pattern animation
    setPulseState(state.clock.elapsedTime);
  });

  // Create circular energy patterns - reduced for mobile
  const createEnergyPatterns = () => {
    const patterns = [];
    const patternCount = isMobile ? 4 : 8;
    
    for (let i = 0; i < patternCount; i++) {
      const angle = (Math.PI * 2 / patternCount) * i;
      patterns.push(
        <mesh
          key={i}
          rotation={[0, 0, angle]}
          position={[0, 0, 0.02]}
        >
          <boxGeometry args={[0.1, 0.4, 0.01]} />
          <meshStandardMaterial
            color="#0FA0CE"
            emissive="#0FA0CE"
            emissiveIntensity={1.2 + Math.sin(pulseState * 1.5 + i * 0.5) * 0.3}
            transparent
            opacity={0.7}
          />
        </mesh>
      );
    }
    
    return patterns;
  };
  
  // Create circular energy rings - reduced for mobile
  const createEnergyRings = () => {
    const rings = [];
    const ringCount = isMobile ? 2 : 3;
    
    for (let i = 0; i < ringCount; i++) {
      const radius = 0.5 + i * 0.1;
      rings.push(
        <mesh key={i} position={[0, 0, 0.015]}>
          <ringGeometry args={[radius, radius + 0.02, 32]} />
          <meshStandardMaterial
            color="#33C3F0"
            emissive="#33C3F0"
            emissiveIntensity={1 + Math.sin(pulseState * 2 + i) * 0.3}
            transparent
            opacity={0.6}
            side={THREE.DoubleSide}
          />
        </mesh>
      );
    }
    
    return rings;
  };

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Outer Ring */}
      <mesh castShadow receiveShadow>
        <torusGeometry args={[1.2, 0.2, 24, isMobile ? 48 : 100]} />
        <meshStandardMaterial
          color="#403E43"
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Middle Ring */}
      <mesh castShadow receiveShadow>
        <torusGeometry args={[0.8, 0.1, 24, isMobile ? 48 : 100]} />
        <meshStandardMaterial
          color="#8A898C"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Inner Ring */}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <torusGeometry args={[0.6, 0.05, 24, isMobile ? 48 : 100]} />
        <meshStandardMaterial
          color="#C8C8C9"
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>

      {/* Core Housing */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.6, 0.6, 0.2, 24]} />
        <meshStandardMaterial
          color="#9F9EA1"
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Core Glow */}
      <mesh ref={coreRef} position={[0, 0, 0.01]}>
        <circleGeometry args={[0.4, 24]} />
        <meshStandardMaterial
          color="#1EAEDB"
          emissive="#33C3F0"
          emissiveIntensity={2}
          toneMapped={false}
        />
      </mesh>

      {/* Core Center - Extra bright point */}
      <mesh position={[0, 0, 0.02]}>
        <circleGeometry args={[0.2, 24]} />
        <meshStandardMaterial
          color="#FFFFFF"
          emissive="#FFFFFF"
          emissiveIntensity={2}
          toneMapped={false}
        />
      </mesh>
      
      <pointLight
        color="#33C3F0"
        intensity={1.5}
        distance={2}
        position={[0, 0, 0.5]}
        castShadow={false}
      />

      {/* Energy Patterns */}
      {createEnergyPatterns()}
      
      {/* Energy Rings */}
      {createEnergyRings()}
    </group>
  );
}
