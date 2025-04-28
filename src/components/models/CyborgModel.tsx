
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
  
  // Optimize animation for mobile
  useFrame((state) => {
    if (!group.current) return;
    
    // Reduce animation complexity on mobile
    const speedFactor = isMobile ? 0.5 : 1;
    
    // Subtle floating motion
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.3 * speedFactor) * 0.1;
    
    // Gentle rotation - reduced on mobile
    group.current.rotation.y += 0.003 * speedFactor;
    
    // Hover effect - lean forward slightly when hovered
    if (hovered) {
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        -0.1,
        0.03 * speedFactor
      );
    } else {
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        0,
        0.03 * speedFactor
      );
    }
  });

  return (
    <group 
      ref={group}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={[1.5, 1.5, 1.5]}
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
