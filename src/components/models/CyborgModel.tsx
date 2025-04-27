
import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Clone, useAnimations } from '@react-three/drei';
import * as THREE from 'three';

export function CyborgModel() {
  const group = useRef<THREE.Group>(null);
  
  // Animation state
  const [hovered, setHovered] = useState(false);
  
  // Rotation animation
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
      {/* Cyborg body */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.25, 0.25, 1.2, 32]} />
        <meshStandardMaterial 
          color={new THREE.Color("#303540")}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      
      {/* Head */}
      <mesh castShadow position={[0, 0.85, 0]}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial 
          color={new THREE.Color("#202530")}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      
      {/* Eyes - glowing blue */}
      <mesh position={[0.1, 0.9, 0.2]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial 
          color={new THREE.Color("#4a9eff")}
          emissive={new THREE.Color("#4a9eff")}
          emissiveIntensity={1}
          toneMapped={false}
        />
      </mesh>
      
      <mesh position={[-0.1, 0.9, 0.2]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial 
          color={new THREE.Color("#4a9eff")}
          emissive={new THREE.Color("#4a9eff")}
          emissiveIntensity={1}
          toneMapped={false}
        />
      </mesh>
      
      {/* Shoulder plates */}
      <mesh position={[0.35, 0.4, 0]} castShadow>
        <boxGeometry args={[0.3, 0.1, 0.2]} />
        <meshStandardMaterial 
          color={new THREE.Color("#4a9eff")} 
          metalness={0.7}
          roughness={0.2}
        />
      </mesh>
      
      <mesh position={[-0.35, 0.4, 0]} castShadow>
        <boxGeometry args={[0.3, 0.1, 0.2]} />
        <meshStandardMaterial 
          color={new THREE.Color("#4a9eff")} 
          metalness={0.7}
          roughness={0.2}
        />
      </mesh>
      
      {/* Arms */}
      <mesh position={[0.35, 0.0, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.08, 0.7, 16]} />
        <meshStandardMaterial 
          color={new THREE.Color("#303540")}
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>
      
      <mesh position={[-0.35, 0.0, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.08, 0.7, 16]} />
        <meshStandardMaterial 
          color={new THREE.Color("#303540")}
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>
      
      {/* Circuit pattern (glowing lines) */}
      <mesh position={[0, 0.4, 0.26]} rotation={[0, 0, 0]}>
        <planeGeometry args={[0.4, 0.02]} />
        <meshStandardMaterial 
          color={new THREE.Color("#00ffff")}
          emissive={new THREE.Color("#00ffff")}
          emissiveIntensity={1}
          toneMapped={false}
        />
      </mesh>
      
      <mesh position={[0, 0.3, 0.26]} rotation={[0, 0, 0]}>
        <planeGeometry args={[0.25, 0.01]} />
        <meshStandardMaterial 
          color={new THREE.Color("#00ffff")}
          emissive={new THREE.Color("#00ffff")}
          emissiveIntensity={1}
          toneMapped={false}
        />
      </mesh>
      
      <mesh position={[0, 0.2, 0.26]} rotation={[0, 0, 0]}>
        <planeGeometry args={[0.4, 0.015]} />
        <meshStandardMaterial 
          color={new THREE.Color("#00ffff")}
          emissive={new THREE.Color("#00ffff")}
          emissiveIntensity={1}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}
