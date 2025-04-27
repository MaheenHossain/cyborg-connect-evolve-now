
import * as THREE from 'three';

export const CyborgBody = () => {
  return (
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
  );
};
