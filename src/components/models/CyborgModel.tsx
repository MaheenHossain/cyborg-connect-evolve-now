
import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function CyborgModel() {
  const group = useRef<THREE.Group>(null);
  // Fix the headRef to be a Group instead of a Mesh
  const headRef = useRef<THREE.Group>(null);
  
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
    
    // Animate eyes
    if (headRef.current) {
      // Fixed: Access children of the headRef Group
      headRef.current.children.forEach((child, i) => {
        // Only apply to meshes with materials
        if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
          child.material.emissiveIntensity = 1.5 + Math.sin(state.clock.elapsedTime * 2 + i * 0.5) * 0.5;
        }
      });
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
      {/* Cyborg body - more detailed with segments */}
      <group>
        {/* Main torso */}
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.25, 0.3, 1.2, 32]} />
          <meshStandardMaterial 
            color={new THREE.Color("#303540")}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
        
        {/* Chest plate */}
        <mesh castShadow receiveShadow position={[0, 0.2, 0.15]}>
          <boxGeometry args={[0.4, 0.3, 0.1]} />
          <meshStandardMaterial 
            color={new THREE.Color("#202530")}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
        
        {/* Chest core - like a mini arc reactor */}
        <mesh castShadow receiveShadow position={[0, 0.2, 0.21]}>
          <circleGeometry args={[0.1, 32]} />
          <meshStandardMaterial 
            color={new THREE.Color("#4a9eff")}
            emissive={new THREE.Color("#4a9eff")}
            emissiveIntensity={2}
            toneMapped={false}
          />
        </mesh>
      </group>
      
      {/* Head with glowing details */}
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
      
      {/* Shoulders with more detail */}
      <group>
        {/* Left shoulder */}
        <mesh position={[-0.35, 0.4, 0]} castShadow>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial 
            color={new THREE.Color("#303540")}
            metalness={0.7}
            roughness={0.3}
          />
        </mesh>
        
        {/* Left shoulder plate */}
        <mesh position={[-0.4, 0.45, 0]} castShadow>
          <boxGeometry args={[0.3, 0.1, 0.2]} />
          <meshStandardMaterial 
            color={new THREE.Color("#4a9eff")} 
            metalness={0.7}
            roughness={0.2}
          />
        </mesh>
        
        {/* Right shoulder */}
        <mesh position={[0.35, 0.4, 0]} castShadow>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial 
            color={new THREE.Color("#303540")}
            metalness={0.7}
            roughness={0.3}
          />
        </mesh>
        
        {/* Right shoulder plate */}
        <mesh position={[0.4, 0.45, 0]} castShadow>
          <boxGeometry args={[0.3, 0.1, 0.2]} />
          <meshStandardMaterial 
            color={new THREE.Color("#4a9eff")} 
            metalness={0.7}
            roughness={0.2}
          />
        </mesh>
      </group>
      
      {/* Arms with joints */}
      <group>
        {/* Left upper arm */}
        <mesh position={[-0.35, 0.1, 0]} castShadow>
          <cylinderGeometry args={[0.1, 0.08, 0.5, 16]} />
          <meshStandardMaterial 
            color={new THREE.Color("#303540")}
            metalness={0.7}
            roughness={0.3}
          />
        </mesh>
        
        {/* Left elbow joint */}
        <mesh position={[-0.35, -0.15, 0]} castShadow>
          <sphereGeometry args={[0.09, 16, 16]} />
          <meshStandardMaterial 
            color={new THREE.Color("#404550")}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
        
        {/* Left forearm */}
        <mesh position={[-0.35, -0.4, 0]} castShadow>
          <cylinderGeometry args={[0.08, 0.1, 0.4, 16]} />
          <meshStandardMaterial 
            color={new THREE.Color("#303540")}
            metalness={0.7}
            roughness={0.3}
          />
        </mesh>
        
        {/* Right upper arm */}
        <mesh position={[0.35, 0.1, 0]} castShadow>
          <cylinderGeometry args={[0.1, 0.08, 0.5, 16]} />
          <meshStandardMaterial 
            color={new THREE.Color("#303540")}
            metalness={0.7}
            roughness={0.3}
          />
        </mesh>
        
        {/* Right elbow joint */}
        <mesh position={[0.35, -0.15, 0]} castShadow>
          <sphereGeometry args={[0.09, 16, 16]} />
          <meshStandardMaterial 
            color={new THREE.Color("#404550")}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
        
        {/* Right forearm */}
        <mesh position={[0.35, -0.4, 0]} castShadow>
          <cylinderGeometry args={[0.08, 0.1, 0.4, 16]} />
          <meshStandardMaterial 
            color={new THREE.Color("#303540")}
            metalness={0.7}
            roughness={0.3}
          />
        </mesh>
      </group>
      
      {/* Circuit patterns (glowing lines) - more detailed */}
      <group>
        <mesh position={[0, 0.4, 0.26]} rotation={[0, 0, 0]}>
          <planeGeometry args={[0.4, 0.02]} />
          <meshStandardMaterial 
            color={new THREE.Color("#00ffff")}
            emissive={new THREE.Color("#00ffff")}
            emissiveIntensity={1.5}
            toneMapped={false}
          />
        </mesh>
        
        <mesh position={[0, 0.36, 0.26]} rotation={[0, 0, 0]}>
          <planeGeometry args={[0.3, 0.01]} />
          <meshStandardMaterial 
            color={new THREE.Color("#00ffff")}
            emissive={new THREE.Color("#00ffff")}
            emissiveIntensity={1.5}
            toneMapped={false}
          />
        </mesh>
        
        <mesh position={[0, 0.32, 0.26]} rotation={[0, 0, 0]}>
          <planeGeometry args={[0.35, 0.015]} />
          <meshStandardMaterial 
            color={new THREE.Color("#00ffff")}
            emissive={new THREE.Color("#00ffff")}
            emissiveIntensity={1.5}
            toneMapped={false}
          />
        </mesh>
        
        <mesh position={[-0.1, 0.3, 0.26]} rotation={[0, 0, Math.PI / 4]}>
          <planeGeometry args={[0.1, 0.01]} />
          <meshStandardMaterial 
            color={new THREE.Color("#00ffff")}
            emissive={new THREE.Color("#00ffff")}
            emissiveIntensity={1.5}
            toneMapped={false}
          />
        </mesh>
        
        <mesh position={[0.1, 0.3, 0.26]} rotation={[0, 0, -Math.PI / 4]}>
          <planeGeometry args={[0.1, 0.01]} />
          <meshStandardMaterial 
            color={new THREE.Color("#00ffff")}
            emissive={new THREE.Color("#00ffff")}
            emissiveIntensity={1.5}
            toneMapped={false}
          />
        </mesh>
      </group>
    </group>
  );
}
