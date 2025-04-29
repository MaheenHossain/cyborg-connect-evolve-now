
import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { CyborgBody } from './parts/CyborgBody';
import { CyborgHead } from './parts/CyborgHead';
import { CyborgShoulders } from './parts/CyborgShoulders';
import { CyborgArms } from './parts/CyborgArms';
import { CircuitPatterns } from './parts/CircuitPatterns';
import { useIsMobile } from '@/hooks/use-mobile';

export function CyborgModel() {
  const group = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const isMobile = useIsMobile();
  
  // Frame counter to reduce animation frequency
  const frameCounter = useRef(0);
  const animationFrequency = isMobile ? 3 : 1; // Update less frequently on mobile
  
  // Optimize animation for mobile and prevent WebGL context loss
  useFrame((state) => {
    if (!group.current) return;
    
    // Only update animation every N frames based on device
    frameCounter.current = (frameCounter.current + 1) % animationFrequency;
    if (frameCounter.current !== 0) return;
    
    // Reduce animation complexity on mobile
    const speedFactor = isMobile ? 0.3 : 0.8;
    
    // Subtle floating motion - reduced on mobile
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.2 * speedFactor) * 0.05;
    
    // Gentle rotation - significantly reduced
    group.current.rotation.y += 0.001 * speedFactor;
    
    // Hover effect - lean forward slightly when hovered
    if (hovered) {
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        -0.05,
        0.01 * speedFactor
      );
    } else {
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        0,
        0.01 * speedFactor
      );
    }
  });

  return (
    <group 
      ref={group}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={isMobile ? [1.2, 1.2, 1.2] : [1.5, 1.5, 1.5]}
      position={[0, -1, 0]}
    >
      <CyborgBody />
      <CyborgHead />
      <CyborgShoulders />
      <CyborgArms />
      <CircuitPatterns />
    </group>
  );
}
