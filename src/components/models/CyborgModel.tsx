
import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { CyborgBody } from './parts/CyborgBody';
import { CyborgHead } from './parts/CyborgHead';
import { CyborgShoulders } from './parts/CyborgShoulders';
import { CyborgArms } from './parts/CyborgArms';
import { CircuitPatterns } from './parts/CircuitPatterns';

export function CyborgModel() {
  const group = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    if (!group.current) return;
    
    // Subtle floating motion
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    
    // Gentle rotation
    group.current.rotation.y += 0.005;
    
    // Hover effect - lean forward slightly when hovered
    if (hovered) {
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        -0.2,
        0.05
      );
    } else {
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        0,
        0.05
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
